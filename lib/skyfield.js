// The deep sky behind the Wall of Light, drawn on a single <canvas>.
//
// Replaces ~700 animated DOM nodes (background stars, nebulae, Milky Way) with
// one GPU-friendly surface: three parallax star layers, a painted Milky Way
// with dust lanes, the lighthouse's sweeping beam, the glow and twinkle of
// every named star, shooting stars, and the "kindling" reveal when the sky
// opens. The named stars themselves stay as real <button>s for taps, focus
// and screen readers; this canvas only paints their light.
//
// View mapping (matches the DOM .sky-canvas transform exactly):
//   screen = stageCentre + off * p + (world - worldCentre) * (1 + (zoom - 1) * p)
// where p is the layer depth (1 = the named stars, < 1 = further away).

const WCX = 1600, WCY = 1100; // world centre of the 3200x2200 star canvas
const TAU = Math.PI * 2;

// deterministic PRNG so the sky is identical on every visit
function prng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gauss(r) { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); }
function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
function makeCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

// star colour temperatures, cool blue-white through to lamp-gold
const TINT = {
  cool: [196, 214, 255], white: [236, 242, 252], warm: [255, 228, 190],
  gold: [240, 185, 95], champagne: [243, 218, 166], ember: [228, 162, 68],
};

function glowSprite(c) {
  const S = 64, cv = makeCanvas(S, S), x = cv.getContext('2d');
  const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.08, rgba(c, 0.95));
  g.addColorStop(0.28, rgba(c, 0.32));
  g.addColorStop(0.6, rgba(c, 0.07));
  g.addColorStop(1, rgba(c, 0));
  x.fillStyle = g; x.fillRect(0, 0, S, S);
  return cv;
}
// soft diffraction cross, the "real telescope" sparkle on bright stars
function spikeSprite(c) {
  const S = 128, h = S / 2, cv = makeCanvas(S, S), x = cv.getContext('2d');
  const lg = x.createLinearGradient(0, 0, S, 0);
  lg.addColorStop(0, rgba(c, 0)); lg.addColorStop(0.5, rgba(c, 0.95)); lg.addColorStop(1, rgba(c, 0));
  x.fillStyle = lg; x.fillRect(0, h - 0.7, S, 1.4);
  const vg = x.createLinearGradient(0, 0, 0, S);
  vg.addColorStop(0, rgba(c, 0)); vg.addColorStop(0.5, rgba(c, 0.95)); vg.addColorStop(1, rgba(c, 0));
  x.fillStyle = vg; x.fillRect(h - 0.7, 0, 1.4, S);
  x.globalCompositeOperation = 'destination-in';
  const m = x.createRadialGradient(h, h, 0, h, h, h);
  m.addColorStop(0, 'rgba(0,0,0,1)'); m.addColorStop(0.18, 'rgba(0,0,0,.5)'); m.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = m; x.fillRect(0, 0, S, S);
  return cv;
}

// The Milky Way: painted once into a quarter-resolution texture, then drawn
// scaled up every frame (it is meant to be soft, so the upscale is free blur).
const MW = { x0: -700, y0: -600, w: 4600, h: 3400, s: 0.25, ang: -19 * Math.PI / 180 };
function paintMilkyWay(lite) {
  const r = prng(20240115);
  const W = Math.round(MW.w * MW.s), H = Math.round(MW.h * MW.s);
  const cv = makeCanvas(W, H), x = cv.getContext('2d');
  const ca = Math.cos(MW.ang), sa = Math.sin(MW.ang);
  function band(t, off) { // world point along the band: t along, off across
    return [WCX + ca * t - sa * off, WCY + 120 + sa * t + ca * off];
  }
  function blob(wx, wy, rad, col, a) {
    const px = (wx - MW.x0) * MW.s, py = (wy - MW.y0) * MW.s, pr = rad * MW.s;
    const g = x.createRadialGradient(px, py, 0, px, py, pr);
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.55, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0));
    x.fillStyle = g; x.beginPath(); x.arc(px, py, pr, 0, TAU); x.fill();
  }
  x.globalCompositeOperation = 'lighter';
  // the glowing river of the galaxy, warmer near the lighthouse
  const N = lite ? 170 : 260;
  for (let i = 0; i < N; i++) {
    const t = (r() - 0.5) * 4400, off = gauss(r) * 150;
    const p = band(t, off), near = Math.max(0, 1 - Math.abs(t) / 1500);
    const col = r() < 0.35 + near * 0.45 ? TINT.warm : (r() < 0.5 ? TINT.white : TINT.cool);
    blob(p[0], p[1], 140 + r() * 320, col, 0.012 + r() * 0.014 + near * 0.01);
  }
  // a few nebulae with real colour: lamp-gold, sea-blue, a rose ember
  [[TINT.gold, 1020, 760, 520, 0.07], [[232, 156, 90], 2380, 1500, 420, 0.05], [[92, 134, 200], 2300, 600, 560, 0.08],
   [TINT.gold, 1500, 1640, 380, 0.04], [[127, 168, 216], 640, 1380, 420, 0.06], [[196, 120, 150], 2780, 980, 300, 0.04]]
    .forEach(function (n) { blob(n[1], n[2], n[3], n[0], n[4]); blob(n[1] + 60, n[2] - 40, n[3] * 0.55, n[0], n[4] * 0.8); });
  // the lighthouse's own warmth at the heart of the sky
  blob(WCX, WCY, 720, TINT.gold, 0.06);
  blob(WCX, WCY, 260, [255, 232, 180], 0.06);
  // dark dust lanes: the rift that makes a galaxy look real
  x.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 46; i++) {
    const t = (r() - 0.5) * 3800, off = gauss(r) * 34 + 18, p = band(t, off);
    const px = (p[0] - MW.x0) * MW.s, py = (p[1] - MW.y0) * MW.s;
    x.save(); x.translate(px, py); x.rotate(MW.ang + (r() - 0.5) * 0.4); x.scale(2.6 + r() * 2, 1);
    const rad = (30 + r() * 60) * MW.s, g = x.createRadialGradient(0, 0, 0, 0, 0, rad);
    g.addColorStop(0, 'rgba(0,0,0,' + (0.22 + r() * 0.2).toFixed(2) + ')'); g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.beginPath(); x.arc(0, 0, rad, 0, TAU); x.fill(); x.restore();
  }
  return cv;
}

function buildLayers(lite) {
  const r = prng(77031);
  const ca = Math.cos(MW.ang), sa = Math.sin(MW.ang);
  // depth p, count, radius range, alpha range, share of stars on the band
  const spec = [
    { p: 0.22, n: lite ? 1100 : 1900, r0: 0.5, r1: 1.0, a0: 0.25, a1: 0.75, band: 0.55 },
    { p: 0.48, n: lite ? 460 : 760, r0: 0.6, r1: 1.25, a0: 0.3, a1: 0.85, band: 0.4 },
    { p: 0.74, n: lite ? 90 : 150, r0: 1.1, r1: 2.1, a0: 0.5, a1: 1, band: 0.3 },
  ];
  return spec.map(function (s, li) {
    const stars = [];
    for (let i = 0; i < s.n; i++) {
      let wx, wy;
      if (r() < s.band) { const t = (r() - 0.5) * 4800, off = gauss(r) * 230; wx = WCX + ca * t - sa * off; wy = WCY + 120 + sa * t + ca * off; }
      else { wx = -700 + r() * 4600; wy = -600 + r() * 3400; }
      const tr = r(), tint = tr < 0.16 ? 'warm' : tr < 0.36 ? 'cool' : 'white';
      // power-law sizes: lots of faint pinpricks, a few bright stars
      const k = Math.pow(r(), 2.4);
      const twk = r() < 0.55;
      stars.push({
        x: wx, y: wy, tint: tint, r: s.r0 + (s.r1 - s.r0) * k, a: s.a0 + (s.a1 - s.a0) * (0.35 + 0.65 * r()),
        ph: r() * TAU, sp: 0.6 + r() * 1.8, tw: twk ? 0.25 + r() * 0.5 : 0.08,
        spike: li === 2 && k > 0.55, d: Math.hypot(wx - WCX, wy - WCY),
      });
    }
    // group by colour so each frame changes fillStyle three times, not thousands
    stars.sort(function (a, b) { return a.tint < b.tint ? -1 : a.tint > b.tint ? 1 : 0; });
    return { p: s.p, stars: stars, sprites: li === 2 };
  });
}

export function createSkyField(stage, before) {
  const coarse = window.matchMedia && window.matchMedia('(pointer:coarse)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  const lite = coarse || cores <= 4;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cv = document.createElement('canvas');
  cv.className = 'sky-gl'; cv.setAttribute('aria-hidden', 'true');
  stage.insertBefore(cv, before || stage.firstChild);
  const ctx = cv.getContext('2d', { alpha: true });

  let W = 0, H = 0, dpr = 1;
  const mw = paintMilkyWay(lite);
  const layers = buildLayers(lite);
  const glow = {}, spike = {};
  Object.keys(TINT).forEach(function (k) { glow[k] = glowSprite(TINT[k]); spike[k] = spikeSprite(TINT[k]); });
  const spikeGold = spikeSprite([255, 240, 205]);

  let kindleAt = -1, meteors = [], nextMeteor = 0;

  function resize() {
    const r = stage.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.75 : 2);
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
  }
  resize();

  // the reveal: light spreads outward from the lighthouse when the sky opens
  function kindleF(d, now) {
    if (kindleAt < 0) return 1;
    const k = (now - kindleAt) / 1900;
    if (k >= 1.25) { kindleAt = -1; return 1; }
    const e = 1 - Math.pow(1 - Math.min(1, k), 3), R = e * 2300;
    return Math.max(0, Math.min(1, (R - d) / 260));
  }

  function draw(view, now, named) {
    const t = now / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, zoom = view.zoom;
    const tt = reduce ? 0 : t;
    const kAll = kindleAt < 0 ? 1 : Math.min(1, (now - kindleAt) / 1300);

    // Milky Way (very far, barely moves, drifts imperceptibly)
    const pm = 0.3, zm = 1 + (zoom - 1) * pm;
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = (0.25 + 0.75 * kAll) * 0.8;
    const dx = reduce ? 0 : Math.sin(t / 60) * 18;
    ctx.drawImage(mw, cx + view.offX * pm + (MW.x0 - WCX + dx) * zm, cy + view.offY * pm + (MW.y0 - WCY) * zm, MW.w * zm, MW.h * zm);

    // the three parallax star layers
    for (let li = 0; li < layers.length; li++) {
      const L = layers[li], p = L.p, zp = 1 + (zoom - 1) * p;
      const ox = cx + view.offX * p - WCX * zp, oy = cy + view.offY * p - WCY * zp;
      let tint = null;
      const st = L.stars;
      for (let i = 0; i < st.length; i++) {
        const s = st[i];
        const x = ox + s.x * zp, y = oy + s.y * zp;
        if (x < -20 || y < -20 || x > W + 20 || y > H + 20) continue;
        let a = s.a * (1 - s.tw * 0.5 + s.tw * 0.5 * Math.sin(tt * s.sp + s.ph));
        if (kindleAt >= 0) a *= 0.2 + 0.8 * kindleF(s.d, now);
        if (a < 0.02) continue;
        const rr = s.r * Math.min(1.6, Math.max(0.8, zp));
        if (L.sprites) {
          const sz = rr * 9;
          ctx.globalAlpha = a; ctx.drawImage(glow[s.tint], x - sz / 2, y - sz / 2, sz, sz);
          if (s.spike) { const ss = rr * 18; ctx.globalAlpha = a * 0.55; ctx.drawImage(spike[s.tint], x - ss / 2, y - ss / 2, ss, ss); }
        } else {
          if (s.tint !== tint) { tint = s.tint; ctx.fillStyle = rgba(TINT[tint], 1); }
          ctx.globalAlpha = a;
          const q = rr * 1.6; ctx.fillRect(x - q / 2, y - q / 2, q, q);
        }
      }
    }

    // the lighthouse beam, sweeping the whole sky (same turn as the hero)
    const hx = cx + view.offX + (view.heartX - WCX) * zoom, hy = cy + view.offY + (view.heartY - WCY) * zoom;
    const beamA = reduce ? -0.6 : (t / 17) * TAU;
    const reach = Math.max(W, H) * 1.3;
    for (let b = 0; b < 2; b++) {
      const ang = beamA + b * Math.PI;
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang);
      const g = ctx.createRadialGradient(0, 0, 8 * zoom, 0, 0, reach);
      const pk = b ? 0.035 : 0.06;
      g.addColorStop(0, 'rgba(255,231,170,' + (pk * kAll).toFixed(3) + ')');
      g.addColorStop(0.35, 'rgba(240,185,95,' + (pk * 0.35 * kAll).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(240,185,95,0)');
      ctx.fillStyle = g; ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, reach, -0.06, 0.06); ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    // the named stars' light: halo, twinkle, sparkle, and a lift as the beam passes
    for (let i = 0; i < named.length; i++) {
      const l = named[i];
      if (!l.el || l.unborn) continue;
      const x = cx + view.offX + (l.x - WCX) * zoom, y = cy + view.offY + (l.y - WCY) * zoom;
      const sz0 = (l.size || 14) * zoom;
      if (x < -sz0 * 6 || y < -sz0 * 6 || x > W + sz0 * 6 || y > H + sz0 * 6) continue;
      const cls = l.el.classList;
      const dim = cls.contains('dim'), hit = cls.contains('hit');
      const tier = l.tier;
      const ph = l._ph || (l._ph = (l.x * 0.013 + l.y * 0.007) % TAU);
      let a = 0.62 + 0.38 * Math.sin(tt * (tier === 'beacon' ? 1.65 : 1.25) + ph);
      let scale = 1;
      if (tier === 'beacon') scale = 1.15 + 0.15 * Math.sin(tt * 1.65 + ph);
      if (l.anniv) { a = Math.min(1, a + 0.35); scale *= 1.25 + 0.2 * Math.sin(tt * 2.4); }
      if (l.mine || l.tonight) { a = Math.min(1, a + 0.2); scale *= 1.12; }
      // the beam touches every star as it turns
      const sa = Math.atan2(l.y - view.heartY, l.x - view.heartX);
      let dd = ((sa - beamA) % TAU + TAU) % TAU; if (dd > Math.PI) dd -= Math.PI; dd = Math.min(dd, Math.PI - dd);
      const lift = reduce ? 0 : Math.pow(Math.max(0, 1 - dd / 0.16), 2);
      a = Math.min(1, a + lift * 0.6); scale *= 1 + lift * 0.4;
      if (hit) { a = 1; scale *= 1.45; }
      if (dim) a *= 0.12;
      if (l.bornAt) { const bk = (now - l.bornAt) / 1300; if (bk < 1) { const pk = bk < 0.4 ? bk / 0.4 : 1 - (bk - 0.4) / 0.6; scale *= 1 + pk * 0.9; a = 1; } else l.bornAt = 0; }
      if (kindleAt >= 0) a *= kindleF(Math.hypot(l.x - view.heartX, l.y - view.heartY), now);
      if (a < 0.02) continue;
      const tint = l.tint || 'gold';
      const halo = Math.min(Math.max(W, H) * 0.42, sz0 * (tier === 'spark' ? 3.2 : tier === 'member' ? 3.4 : 4.2) * scale);
      ctx.globalAlpha = a * (tier === 'spark' ? 0.55 : 0.8);
      ctx.drawImage(glow[tint], x - halo / 2, y - halo / 2, halo, halo);
      if (tier !== 'spark') {
        const sp = sz0 * (tier === 'beacon' ? 5 : tier === 'member' ? 3.4 : 4) * scale;
        ctx.globalAlpha = a * (tier === 'member' ? 0.35 : 0.5);
        ctx.drawImage(spikeGold, x - sp / 2, y - sp / 2, sp, sp);
      }
    }

    // shooting stars, now and then (one in four is a golden one)
    if (!reduce) {
      if (!nextMeteor) nextMeteor = now + 1400;
      if (now > nextMeteor) {
        const ang = (14 + Math.random() * 22) * Math.PI / 180, spd = (0.55 + Math.random() * 0.4) * Math.max(W, 700) / 1000;
        meteors.push({ x: W * (0.05 + Math.random() * 0.6), y: H * (0.04 + Math.random() * 0.32), vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, t0: now, life: 900 + Math.random() * 600, gold: Math.random() < 0.25 });
        nextMeteor = now + 2600 + Math.random() * 4200;
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i], k = (now - m.t0) / m.life;
        if (k >= 1) { meteors.splice(i, 1); continue; }
        const dt = now - m.t0, hx2 = m.x + m.vx * dt, hy2 = m.y + m.vy * dt, len = 150 + 60 * Math.sin(k * Math.PI);
        const tx = hx2 - m.vx / Math.hypot(m.vx, m.vy) * len, ty = hy2 - m.vy / Math.hypot(m.vx, m.vy) * len;
        const fade = Math.sin(k * Math.PI);
        const col = m.gold ? [255, 220, 150] : [236, 243, 255];
        const g = ctx.createLinearGradient(tx, ty, hx2, hy2);
        g.addColorStop(0, rgba(col, 0)); g.addColorStop(1, rgba(col, 0.9 * fade));
        ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx2, hy2); ctx.stroke();
        const hs = 14; ctx.globalAlpha = fade; ctx.drawImage(glow[m.gold ? 'gold' : 'white'], hx2 - hs / 2, hy2 - hs / 2, hs, hs);
      }
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  return {
    canvas: cv,
    resize: resize,
    draw: draw,
    animated: !reduce,
    kindle: function (now) { if (!reduce) kindleAt = now; },
    kindling: function () { return kindleAt >= 0; },
    clearMeteors: function () { meteors = []; nextMeteor = 0; },
  };
}

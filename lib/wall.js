// The Wall of Light: inline teaser, tier + gift form, mock checkout (wire to
// Stripe in production), the immersive pan/zoom sky, the share deed, the
// arrival experience, and the keepsake certificate canvas.
// Ported beat-for-beat from the design prototype; the seed registry moved to
// lib/registry.js so the server share pages read the same sky.

import {
  TIER, IMPACT, CX, CY, SEED_COUNT,
  buildSeedLights, placeStar, skyRegion, regionPhrase, starName, displayName, memberSlots,
} from './registry';

export function initWall(opts) {
  const starId = (opts && opts.starId) || null;

  const field = document.getElementById('lightsField');
  if (!field || window.__wallBuilt) return; window.__wallBuilt = true;

  // ambient lights in the teaser field
  (function buildTeaser() {
    const f = document.getElementById('lightsField'); if (!f || f.querySelector('.light')) return;
    for (let i = 0; i < 150; i++) { const d = document.createElement('span'); const lit = Math.random() < 0.34; let cls = 'light' + (lit ? ' lit' : ''); if (lit && Math.random() < 0.25) cls += ' tw'; if (lit && Math.random() < 0.18) cls += ' float'; d.className = cls; const sz = lit ? (3 + Math.random() * 4.5) : (2.5 + Math.random() * 2.5); d.style.width = sz.toFixed(1) + 'px'; d.style.height = sz.toFixed(1) + 'px'; if (Math.random() < 0.3) d.style.filter = 'blur(' + (Math.random() * 1.4).toFixed(1) + 'px)'; d.style.left = (1.5 + Math.random() * 97) + '%'; d.style.top = (7 + Math.random() * 86) + '%'; d.style.animationDelay = (Math.random() * 4).toFixed(2) + 's,' + (Math.random() * 4).toFixed(2) + 's'; f.appendChild(d); }
  })();

  // seed data — the existing community of lights
  const lights = buildSeedLights();
  const memberStars = [];
  let selectedTier = 'star';

  // anniversaries: a star flares brighter on the night it was lit, every year
  const todayMD = new Date().toISOString().slice(5, 10);
  const annivSeed = new Date(); annivSeed.setFullYear(annivSeed.getFullYear() - 1);
  lights[2].date = annivSeed.toISOString().slice(0, 10);
  lights.forEach(function (l) {
    if (l.date.slice(5) === todayMD) { const yrs = new Date().getFullYear() - parseInt(l.date.slice(0, 4), 10); if (yrs > 0) l.anniv = yrs; }
  });
  // tonight's light: the sky holds one dedication a little closer each night
  const doy = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const featured = lights[doy % lights.length]; featured.tonight = true;

  // a bell for every birth
  let chimeCtx = null;
  function chime() {
    if (document.body.classList.contains('calm')) return;
    try {
      chimeCtx = chimeCtx || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = chimeCtx.currentTime;
      [[659.25, 0, 0.5], [987.77, 0.12, 0.4]].forEach(function (n) {
        const o = chimeCtx.createOscillator(), g = chimeCtx.createGain();
        o.type = 'sine'; o.frequency.value = n[0];
        g.gain.setValueAtTime(0, t0 + n[1]);
        g.gain.linearRampToValueAtTime(n[2] * 0.09, t0 + n[1] + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + n[1] + 1.6);
        o.connect(g); g.connect(chimeCtx.destination);
        o.start(t0 + n[1]); o.stop(t0 + n[1] + 1.7);
      });
    } catch (e) {}
  }

  let count = SEED_COUNT, session = 0;
  const fmt = { day: 'numeric', month: 'short', year: 'numeric' };
  function prettyDate(iso) { try { return new Date(iso).toLocaleDateString('en-IE', fmt); } catch (e) { return iso; } }
  function nights(iso) { const n = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000); return Math.max(1, n); }
  function syncCounts() {
    ['lightCount', 'heroCount', 'dockCount', 'skyCount'].forEach(function (id) { const el = document.getElementById(id); if (el) el.textContent = count; });
    const pill = document.getElementById('countPill'); if (pill) { pill.classList.remove('pop'); void pill.offsetWidth; pill.classList.add('pop'); }
  }

  // ---- immersive sky ----
  let ov = document.getElementById('skyOv'), stage = document.getElementById('skyStage'), canvas = document.getElementById('skyCanvas'), bg = document.getElementById('skyBg');
  let card = document.getElementById('skyCard');
  let offX = 0, offY = 0, zoom = 1, flyRAF = null, deepLayer = null;
  const ZMIN = 0.6, ZMAX = 3.2;
  function applyOffset() { canvas.style.transform = 'translate(' + offX + 'px,' + offY + 'px) scale(' + zoom + ')'; canvas.classList.toggle('names', zoom >= 1.3); if (deepLayer) deepLayer.style.transform = 'translate(' + (offX * 0.45).toFixed(1) + 'px,' + (offY * 0.45).toFixed(1) + 'px) scale(' + (1 + (zoom - 1) * 0.5).toFixed(3) + ')'; }
  function clamp() {
    const maxX = Math.max(120, (3200 * zoom - stage.clientWidth) / 2 + 140), maxY = Math.max(120, (2200 * zoom - stage.clientHeight) / 2 + 140);
    offX = Math.max(-maxX, Math.min(maxX, offX)); offY = Math.max(-maxY, Math.min(maxY, offY));
  }
  // zoom toward a stage-centre-relative point (fx,fy); default centre
  function setZoom(nz, fx, fy) {
    nz = Math.max(ZMIN, Math.min(ZMAX, nz)); fx = fx || 0; fy = fy || 0;
    const px = (fx - offX) / zoom, py = (fy - offY) / zoom;
    offX += px * (zoom - nz); offY += py * (zoom - nz);
    zoom = nz; clamp(); applyOffset();
  }
  function buildSky() {
    canvas = document.getElementById('skyCanvas'); bg = document.getElementById('skyBg'); stage = document.getElementById('skyStage');
    if (canvas.querySelector('.sky-star')) return;
    // parallax deep layer (sits behind the stars, drifts slower for real depth)
    deepLayer = document.createElement('div'); deepLayer.className = 'sky-deep'; deepLayer.id = 'skyDeep';
    stage.insertBefore(deepLayer, canvas);
    deepLayer.appendChild(bg);
    // soft Milky Way band
    const mw = document.createElement('div'); mw.className = 'sky-milkyway'; deepLayer.appendChild(mw);
    // nebula glow clouds for depth (gold-forward with cool accents, screen-blended)
    const nebs = [['#F0B95F', 760, 24, 26, .16], ['#E89C5A', 560, 60, 22, .13], ['#5C86C8', 680, 70, 66, .12], ['#F0B95F', 520, 44, 70, .12], ['#7FA8D8', 440, 18, 60, .1]];
    nebs.forEach(function (n, ni) { const d = document.createElement('div'); d.className = 'sky-neb'; d.style.width = n[1] + 'px'; d.style.height = n[1] + 'px'; d.style.left = n[2] + '%'; d.style.top = n[3] + '%'; d.style.background = 'radial-gradient(circle,' + hexA(n[0], n[4]) + ',transparent 70%)'; d.style.animationDuration = (15 + ni * 3) + 's'; d.style.animationDelay = '-' + (ni * 2.5) + 's'; deepLayer.appendChild(d); });
    // the six named skies of Ballymun
    const REGIONS = [
      { a: -90, name: 'Poppintree' }, { a: -30, name: 'Santry' }, { a: 30, name: 'Coultry' },
      { a: 90, name: 'Shangan' }, { a: 150, name: 'Sillogue' }, { a: -150, name: 'Balcurris' }
    ];
    REGIONS.forEach(function (r) {
      const e = document.createElement('span'); e.className = 'sky-region'; e.textContent = 'The ' + r.name + ' sky';
      const aa = r.a * Math.PI / 180;
      e.style.left = (CX + Math.cos(aa) * 690).toFixed(0) + 'px'; e.style.top = (CY + Math.sin(aa) * 690 * 0.72).toFixed(0) + 'px';
      canvas.appendChild(e);
    });
    // the lighthouse at the heart of the sky, the point every star gathers round
    const heart = document.createElement('div'); heart.className = 'sky-heart';
    heart.innerHTML = '<span class="sh-halo"></span><span class="sh-beam"></span><svg viewBox="0 0 26 30" width="26" height="30"><path d="M9 28 L11 9 L15 9 L17 28 Z" fill="#F0B95F"></path><rect x="10.2" y="4.6" width="5.6" height="4" rx="1" fill="#FFE3A3"></rect><path d="M9.6 4.6 L13 1.4 L16.4 4.6 Z" fill="#F0B95F"></path><path d="M7 6.5 L3 5" stroke="#F0B95F" stroke-width="1.4" stroke-linecap="round"></path><path d="M19 6.5 L23 5" stroke="#F0B95F" stroke-width="1.4" stroke-linecap="round"></path></svg><b>The Lighthouse</b><span>Every star gathers here</span>';
    heart.style.left = CX + 'px'; heart.style.top = CY + 'px';
    canvas.appendChild(heart);
    // bg depth stars — varied size, brightness and colour temperature
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 680; i++) {
      const s = document.createElement('span'); const cls = [];
      const r = Math.random(); if (r < 0.14) cls.push('warm'); else if (r < 0.30) cls.push('cool');
      if (Math.random() < 0.32) cls.push('tw');
      const big = Math.random() < 0.07; if (big) cls.push('big');
      if (cls.length) s.className = cls.join(' ');
      const sz = big ? (2.6 + Math.random() * 1.4) : (Math.random() < 0.5 ? 1 : 1.7);
      s.style.width = sz.toFixed(1) + 'px'; s.style.height = sz.toFixed(1) + 'px';
      s.style.left = (Math.random() * 3600) + 'px'; s.style.top = (Math.random() * 2600) + 'px';
      s.style.opacity = (0.16 + Math.random() * 0.7).toFixed(2);
      s.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
      frag.appendChild(s);
    }
    bg.appendChild(frag);
    // constellation threads following the cluster spiral
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'sky-threads'); svg.setAttribute('viewBox', '0 0 3200 2200');
    let dpath = ''; lights.forEach(function (l, i) { dpath += (i ? ' L' : 'M') + l.x.toFixed(0) + ' ' + l.y.toFixed(0); });
    const pth = document.createElementNS('http://www.w3.org/2000/svg', 'path'); pth.setAttribute('d', dpath); svg.appendChild(pth);
    canvas.insertBefore(svg, canvas.firstChild);
    lights.forEach(renderStar);
    applyOffset();
  }
  function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'; }
  function renderStar(l) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'sky-star tier-' + (l.tier || 'star') + (l.mine ? ' mine' : '');
    b.setAttribute('aria-label', (TIER[l.tier] ? TIER[l.tier].label : 'Star') + ' No. ' + l.no + ', named ' + displayName(l) + ': ' + l.msg);
    if (!l.mine && l.tier !== 'beacon') { const tr = Math.random(); if (tr < 0.24) b.classList.add('t-champagne'); else if (tr < 0.38) b.classList.add('t-ember'); }
    if (l.anniv) b.classList.add('anniv');
    if (l.tonight) b.classList.add('tonight');
    const base = TIER[l.tier] ? TIER[l.tier].size : 16; let sz = base + (l.tier === 'beacon' ? 0 : Math.random() * 4); if (l.mine) sz += 3; b.style.width = sz.toFixed(1) + 'px'; b.style.height = sz.toFixed(1) + 'px';
    b.style.left = l.x + 'px'; b.style.top = l.y + 'px';
    b.dataset.id = l.id; l.el = b;
    if (l.tier === 'constellation') renderConstellation(l);
    canvas.appendChild(b);
    if (l.tier !== 'constellation') {
      const lab = document.createElement('span'); lab.className = 'sky-name';
      let sub = 'No. ' + l.no;
      if (l.anniv) sub = (l.anniv === 1 ? 'One year' : l.anniv + ' years') + ' tonight';
      else if (l.tonight) sub = 'Tonight’s light';
      lab.innerHTML = '<b>' + esc(displayName(l)) + '</b><span>' + sub + '</span>';
      lab.style.left = l.x + 'px'; lab.style.top = (l.y + sz / 2 + 8) + 'px';
      l.lab = lab; canvas.appendChild(lab);
    }
    return b;
  }
  function renderConstellation(l) {
    // derive satellite slots from the named members (fall back to a small ring)
    if (!l.sat) l.sat = memberSlots(l.members);
    // connecting lines from the central star to each member
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'sky-constline'); svg.setAttribute('viewBox', '0 0 3200 2200');
    let d = ''; l.sat.forEach(function (s) { d += 'M' + l.x.toFixed(0) + ' ' + l.y.toFixed(0) + ' L' + (l.x + s.dx).toFixed(0) + ' ' + (l.y + s.dy).toFixed(0) + ' '; });
    const pth = document.createElementNS('http://www.w3.org/2000/svg', 'path'); pth.setAttribute('d', d); svg.appendChild(pth); canvas.appendChild(svg);
    // each member is its own clickable star with its own dedication
    l.sat.forEach(function (s, k) {
      const ms = { msg: l.msg, name: l.name, date: l.date, mine: l.mine, gift: l.gift, tier: 'member', forName: s.name || null, parent: l, no: l.no, region: l.region, constellation: l.label || l.forName || l.name, id: l.id + '-m' + k, x: l.x + s.dx, y: l.y + s.dy };
      memberStars.push(ms);
      const b = document.createElement('button'); b.type = 'button'; b.className = 'sky-star sky-member'; b.setAttribute('aria-label', (s.name ? s.name + ', ' : '') + 'a named star in ' + ms.constellation);
      const ss = 11 + Math.random() * 3; b.style.width = ss.toFixed(1) + 'px'; b.style.height = ss.toFixed(1) + 'px';
      b.style.left = ms.x + 'px'; b.style.top = ms.y + 'px'; b.dataset.id = ms.id; ms.el = b;
      canvas.appendChild(b);
      if (s.name) { const ml = document.createElement('span'); ml.className = 'sky-name mem'; ml.innerHTML = '<b>' + esc(s.name) + '</b>'; ml.style.left = ms.x + 'px'; ml.style.top = (ms.y + ss / 2 + 6) + 'px'; ms.lab = ml; canvas.appendChild(ml); }
    });
    const lab = document.createElement('span'); lab.className = 'sky-constlabel'; lab.textContent = l.label || l.forName || l.name; lab.style.left = l.x + 'px'; lab.style.top = (l.y + 92) + 'px'; canvas.appendChild(lab);
  }
  function openCard(l) {
    const TIER_TITLE = { spark: 'A Spark', star: 'A Guiding Star', beacon: 'A Beacon', constellation: 'A Constellation', member: 'A Star in the Constellation' };
    document.getElementById('skyCardTier').textContent = (TIER_TITLE[l.tier] || 'A Light') + ' · Star No. ' + (l.no || '—');
    const note = document.getElementById('skyCardNote');
    if (l.anniv) { note.textContent = (l.anniv === 1 ? 'One year ago tonight' : l.anniv + ' years ago tonight') + ' this star was first lit. It flares brighter until morning.'; note.hidden = false; }
    else if (l.tonight) { note.textContent = 'Tonight’s light. Each night the sky holds one dedication a little closer.'; note.hidden = false; }
    else if (l.tier === 'beacon') { note.textContent = 'This beacon shines among the brightest lights on the Wall.'; note.hidden = false; }
    else if (l.tier === 'constellation') { note.textContent = 'Linked lights, shining together on the Wall of Light.'; note.hidden = false; }
    else { note.hidden = true; }
    document.getElementById('skyCardMsg').textContent = '“' + l.msg + '”';
    const who = document.getElementById('skyCardWho');
    if (l.tier === 'member') {
      who.innerHTML = '<b>' + (l.forName ? 'Named ' + esc(l.forName) : 'A star in this constellation') + '</b>' + esc('In ' + l.constellation + ' · named by ' + l.name);
    } else if (l.tier === 'constellation') {
      const cnt = (l.members && l.members.length) ? l.members.length + ' linked stars · ' : '';
      who.innerHTML = '<b>' + esc(l.label || l.forName || l.name) + '</b>' + esc(cnt + 'named by ' + l.name);
    } else if (l.forName) {
      who.innerHTML = '<b>' + esc('Named ' + l.forName) + '</b>' + esc('by ' + l.name);
    } else {
      who.innerHTML = '<b>' + esc(l.name) + '</b>' + (l.place ? esc(l.place) : '');
    }
    document.getElementById('skyCardDate').innerHTML = '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="rgba(240,185,95,.8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3Z"></path></svg>Lit ' + prettyDate(l.date);
    const nn = nights(l.date);
    document.getElementById('skyCardPlace').innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 21s-6.5-5.2-6.5-10a6.5 6.5 0 0 1 13 0c0 4.8-6.5 10-6.5 10Z"></path><circle cx="12" cy="10.6" r="2.3"></circle></svg>In ' + regionPhrase(l) + ' · burning <b>' + nn.toLocaleString('en-IE') + '</b> night' + (nn === 1 ? '' : 's') + ' and counting';
    card.classList.add('show');
    card._light = l;
  }
  function closeCard() { card.classList.remove('show'); card._light = null; lights.concat(memberStars).forEach(function (x) { if (x.el) x.el.classList.remove('dim', 'hit'); }); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function flyTo(l, andOpen, targetZoom) {
    if (flyRAF) cancelAnimationFrame(flyRAF);
    const tz = targetZoom || zoom;
    const tx = -(l.x - 1600) * tz, ty = -(l.y - 1100) * tz;
    const sx = offX, sy = offY, sz = zoom, t0 = performance.now(), dur = 950;
    function step(t) {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      zoom = sz + (tz - sz) * e; offX = sx + (tx - sx) * e; offY = sy + (ty - sy) * e; clamp(); applyOffset();
      if (k < 1) flyRAF = requestAnimationFrame(step); else if (andOpen) openCard(l);
    }
    flyRAF = requestAnimationFrame(step);
  }

  function openSky(focusLight, targetZoom) {
    ov = document.getElementById('skyOv'); stage = document.getElementById('skyStage'); card = document.getElementById('skyCard');
    buildSky();
    document.documentElement.classList.add('lock-scroll');
    ov.classList.add('open');
    const st = document.getElementById('skyTitle');
    if (st) { st.classList.remove('show'); if (!focusLight) { void st.offsetWidth; st.classList.add('show'); } }
    startShooting();
    requestAnimationFrame(function () {
      if (focusLight) { zoom = 0.85; offX = 0; offY = 0; applyOffset(); flyTo(focusLight, false, targetZoom || 1.7); }
      else { zoom = 1; offX = 0; offY = 0; applyOffset(); }
    });
  }
  function closeSky() { ov.classList.remove('open'); document.documentElement.classList.remove('lock-scroll'); closeCard(); if (shootTimer) { clearTimeout(shootTimer); shootTimer = null; } }

  // occasional shooting stars while the sky is open
  let shootTimer = null;
  function startShooting() {
    if (shootTimer || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    function spawn() {
      if (!ov.classList.contains('open')) { shootTimer = null; return; }
      const st = document.getElementById('skyStage'); if (st) {
        const sh = document.createElement('span'); sh.className = 'sky-shoot';
        sh.style.left = (5 + Math.random() * 55) + '%'; sh.style.top = (6 + Math.random() * 30) + '%';
        st.appendChild(sh); requestAnimationFrame(function () { sh.classList.add('go'); });
        setTimeout(function () { sh.remove(); }, 1700);
      }
      shootTimer = setTimeout(spawn, 2600 + Math.random() * 4200);
    }
    shootTimer = setTimeout(spawn, 1400);
  }

  // ignite: fly to the new star (zoomed in), let it burst, then open the gift note
  function burstAt(l) {
    if (!canvas) return;
    [0, 1].forEach(function (k) { const s = document.createElement('span'); s.className = 'sky-burst' + (k ? ' b2' : ''); s.style.left = l.x + 'px'; s.style.top = l.y + 'px'; canvas.appendChild(s); setTimeout(function () { s.remove(); }, 2400); });
  }
  function igniteAt(l) {
    openSky(l, 1.7);
    setTimeout(function () { if (l.el) { l.el.classList.add('born'); } burstAt(l); chime(); }, 1000);
    setTimeout(function () { openCard(l); }, 1350);
    setTimeout(function () { openShare(l); }, 2700);
  }

  // pan (1 finger / drag) + pinch (2 fingers) + wheel zoom
  const pointers = {}; let dragging = false, lastX = 0, lastY = 0, moved = 0, pinchDist = 0, pinchZoom = 1;
  function stageCentreRel(cx, cy) { const r = stage.getBoundingClientRect(); return { x: cx - r.left - r.width / 2, y: cy - r.top - r.height / 2 }; }
  document.addEventListener('pointerdown', function (e) {
    if (!ov.classList.contains('open')) return;
    if (!(e.target.closest && e.target.closest('#skyStage'))) return;
    if (e.target.closest('.sky-card') || e.target.closest('.zoom-ctl')) return;
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    const ids = Object.keys(pointers);
    if (ids.length === 1) { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; stage.classList.add('grab'); }
    else if (ids.length === 2) { dragging = false; const a = pointers[ids[0]], b = pointers[ids[1]]; pinchDist = Math.hypot(a.x - b.x, a.y - b.y); pinchZoom = zoom; }
  });
  document.addEventListener('pointermove', function (e) {
    if (!(e.pointerId in pointers)) { if (dragging && Object.keys(pointers).length === 1) {} else return; }
    if (e.pointerId in pointers) pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    const ids = Object.keys(pointers);
    if (ids.length >= 2) {
      const a = pointers[ids[0]], b = pointers[ids[1]];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = stageCentreRel((a.x + b.x) / 2, (a.y + b.y) / 2);
      if (pinchDist) setZoom(pinchZoom * (d / pinchDist), mid.x, mid.y);
      return;
    }
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY; moved += Math.abs(dx) + Math.abs(dy);
    offX += dx; offY += dy; lastX = e.clientX; lastY = e.clientY; clamp(); applyOffset();
  });
  function endPointer(e) {
    if (e.pointerId in pointers) delete pointers[e.pointerId];
    if (Object.keys(pointers).length < 2) pinchDist = 0;
    if (Object.keys(pointers).length === 0) { if (dragging && moved < 6) closeCard(); dragging = false; stage.classList.remove('grab'); }
  }
  document.addEventListener('pointerup', endPointer); document.addEventListener('pointercancel', endPointer);
  document.addEventListener('wheel', function (e) {
    if (!ov.classList.contains('open')) return;
    if (!(e.target.closest && e.target.closest('#skyStage'))) return;
    e.preventDefault();
    const p = stageCentreRel(e.clientX, e.clientY);
    setZoom(zoom * (e.deltaY < 0 ? 1.12 : 0.89), p.x, p.y);
  }, { passive: false });

  // search (delegated)
  function runSearch(fly) {
    const search = document.getElementById('skySearch'); if (!search) return;
    const q = search.value.trim().toLowerCase(); let firstHit = null;
    lights.concat(memberStars).forEach(function (l) {
      if (!l.el) return;
      if (!q) { l.el.classList.remove('dim', 'hit'); return; }
      const hay = (l.msg + ' ' + l.name + ' ' + (l.place || '') + ' ' + (l.forName || '') + ' ' + (l.label || '') + ' ' + (l.constellation || '') + ' no. ' + l.no + ' ' + (l.region || '')).toLowerCase();
      const m = hay.indexOf(q) !== -1;
      l.el.classList.toggle('hit', m); l.el.classList.toggle('dim', !m);
      if (m && !firstHit) firstHit = l;
    });
    if (firstHit && fly) flyTo(firstHit, fly === 'open');
  }

  // ---- gift flow state + helpers ----
  let giftIntent = 'gift', draft = null;
  function tierMeta() { return TIER[selectedTier] || TIER.star; }
  function updateAmounts() { const a = '€' + tierMeta().amt; const l1 = document.getElementById('lightAmt'); if (l1) l1.textContent = a; const l2 = document.getElementById('coAmt'); if (l2) l2.textContent = a; }
  function selectTier(btn) {
    selectedTier = btn.dataset.tier;
    document.querySelectorAll('#tiers .tier').forEach(function (b) { const on = b === btn; b.classList.toggle('on', on); b.setAttribute('aria-checked', on ? 'true' : 'false'); });
    const isConst = selectedTier === 'constellation';
    const fm = document.getElementById('fldMembers'); if (fm) fm.hidden = !isConst;
    if (isConst && document.querySelectorAll('#members .member-row').length === 0) { addMemberRow(); addMemberRow(); addMemberRow(); }
    const rl = document.getElementById('recipientLbl'); if (rl) rl.textContent = isConst ? 'Name your constellation (a family, team or business)' : (giftIntent === 'gift' ? 'Who is it for? The star takes their name.' : 'Name the star (optional)');
    const rin = document.getElementById('recipientInput'); if (rin) rin.placeholder = isConst ? 'e.g. The Murphy Family, or Team Sales' : (giftIntent === 'gift' ? 'e.g. Mam, or Granny May' : 'e.g. John, or Granny May');
    updateAmounts();
  }
  function setIntent(which) {
    giftIntent = which;
    document.querySelectorAll('#giftIntent .gi').forEach(function (b) { const on = b.dataset.intent === which; b.classList.toggle('on', on); b.setAttribute('aria-checked', on ? 'true' : 'false'); });
    const fr = document.getElementById('fldRecipient'); if (fr) fr.style.display = '';
    selectTier(document.querySelector('#tiers .tier.on') || document.querySelector('#tiers .tier'));
  }
  function addMemberRow(val) {
    const wrap = document.getElementById('members'); if (!wrap) return;
    if (wrap.querySelectorAll('.member-row').length >= 8) { toast('Up to 8 names in a constellation.'); return; }
    const row = document.createElement('div'); row.className = 'member-row';
    const inp = document.createElement('input'); inp.maxLength = 28; inp.placeholder = 'A name'; if (val) inp.value = val;
    const rm = document.createElement('button'); rm.type = 'button'; rm.className = 'rm-member'; rm.setAttribute('aria-label', 'Remove'); rm.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"></path></svg>';
    row.appendChild(inp); row.appendChild(rm); wrap.appendChild(row);
  }
  function collectDraft() {
    const rec = (document.getElementById('recipientInput').value || '').trim();
    const msg = (document.getElementById('msgInput').value || '').trim();
    const from = (document.getElementById('whoInput').value || '').trim() || 'A friend';
    const members = [].map.call(document.querySelectorAll('#members .member-row input'), function (i) { return i.value.trim(); }).filter(Boolean);
    if (!msg) { const f = document.getElementById('giftForm'); f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake'); document.getElementById('msgInput').focus(); return null; }
    const d = { msg: msg, name: from, place: '', date: new Date().toISOString().slice(0, 10), mine: true, tier: selectedTier, gift: giftIntent === 'gift', forName: rec || null };
    if (selectedTier === 'constellation') { d.label = rec || from; d.members = members; }
    const p = placeStar(lights.length); d.x = p.x; d.y = p.y; d.region = skyRegion(p.x, p.y); d.no = count + 1;
    return d;
  }
  function openCheckout(d) {
    const m = tierMeta();
    document.getElementById('coTitle').textContent = 'Name your ' + m.label;
    const nm = d.forName || d.label;
    const rt = document.getElementById('coReserveTxt');
    if (rt) rt.innerHTML = '<b>Star No. ' + d.no + '</b> is being held for you in ' + regionPhrase(d) + (nm ? '. It will be named <b>' + esc(nm) + '</b>.' : '.');
    let rows = '<div class="co-line"><span>' + m.label + (nm ? ' · named ' + esc(nm) : '') + '</span><b>€' + m.amt + '</b></div>';
    if (d.members && d.members.length) rows += '<div class="co-line"><span>' + d.members.length + ' linked stars, one for each name</span><b>included</b></div>';
    rows += '<div class="co-line"><span>Gift note + a link to visit the star</span><b>included</b></div>';
    rows += '<div class="co-line co-total"><span>Total today</span><b>€' + m.amt + '</b></div>';
    document.getElementById('coSummary').innerHTML = rows;
    const imp = document.getElementById('coImpact');
    if (imp) imp.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3Z"></path><path d="M9 19h6M10 22h4"></path></svg><span>What it keeps lit: <b>' + IMPACT[selectedTier] + '</b>, or wherever Ballymun needs it most.</span>';
    document.getElementById('coAmt').textContent = '€' + m.amt;
    document.documentElement.classList.add('lock-scroll');
    document.getElementById('checkoutOv').classList.add('open');
  }
  function closeCheckout() { document.getElementById('checkoutOv').classList.remove('open'); if (!document.getElementById('skyOv').classList.contains('open')) document.documentElement.classList.remove('lock-scroll'); }
  function lightDraft(d) {
    d.id = 'mine' + (session++);
    if (typeof d.x !== 'number') { const p = placeStar(lights.length); d.x = p.x; d.y = p.y; d.region = skyRegion(p.x, p.y); }
    if (d.members && d.members.length) { d.sat = d.members.map(function (nm, k) { const a = (k / d.members.length) * Math.PI * 2 + 0.4, rr = 42 + (k % 3) * 12; return { dx: Math.cos(a) * rr, dy: Math.sin(a) * rr * 0.8, name: nm }; }); }
    count++; d.no = d.no || count;
    lights.push(d); syncCounts(); addRecent(d);
    if (document.getElementById('skyCanvas').querySelector('.sky-star')) renderStar(d);
    igniteAt(d);
  }
  // production share pages live at /star/[id]
  function giftLink(l) { return location.origin + '/star/' + encodeURIComponent(l.id); }

  // the arrival: what the recipient sees when they open their link
  let arriveTarget = null;
  function playDelivery(l, isPreview) {
    closeShare(); closeSky(); arriveTarget = l;
    const nm = starName(l);
    const tag = document.getElementById('avPreviewTag'); if (tag) tag.hidden = !isPreview;
    document.getElementById('avEye').textContent = l.tier === 'constellation' ? 'A constellation has been named' : 'A star has been named';
    document.getElementById('avName').textContent = nm ? 'Hello, ' + nm + '.' : 'Hello.';
    document.getElementById('avLine').innerHTML = '<b>' + esc(l.name) + '</b> has named ' + (l.tier === 'constellation' ? 'a constellation of stars' : 'Star No. ' + l.no) + ' for you on the Wall of Light. It is burning in the Ballymun sky right now, and it always will be.';
    const gt = document.getElementById('avGoTxt'); if (gt) gt.textContent = l.tier === 'constellation' ? 'Show me our stars' : 'Show me my star';
    document.documentElement.classList.add('lock-scroll');
    document.getElementById('arriveOv').classList.add('open');
  }
  function revealArrival() {
    let l = arriveTarget; if (!l) return;
    document.getElementById('arriveOv').classList.remove('open');
    const b = document.getElementById('deliveryBanner');
    document.getElementById('dbName').textContent = displayName(l);
    document.getElementById('dbMsg').textContent = '“' + l.msg + '”';
    document.getElementById('dbBy').textContent = 'Star No. ' + l.no + ' · named by ' + l.name + ' · in ' + regionPhrase(l);
    openSky(l, 1.9);
    // deep-linked member stars only get their live element once the sky is built
    const live = lights.concat(memberStars).find(function (x) { return x.id === l.id; });
    if (live) l = live;
    setTimeout(function () { if (l.el) { l.el.classList.remove('born'); void l.el.offsetWidth; l.el.classList.add('born'); } burstAt(l); chime(); }, 1100);
    setTimeout(function () { b.classList.add('show'); }, 1450);
    setTimeout(function () { openCard(l); }, 2100);
    setTimeout(function () { b.classList.remove('show'); }, 6600);
  }

  document.addEventListener('input', function (e) { if (e.target && e.target.id === 'skySearch') runSearch(true); });
  document.addEventListener('keydown', function (e) { if (e.target && e.target.id === 'skySearch' && e.key === 'Enter') runSearch('open'); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (document.getElementById('checkoutOv').classList.contains('open')) closeCheckout();
    else if (document.getElementById('arriveOv').classList.contains('open')) { document.getElementById('arriveOv').classList.remove('open'); if (!document.getElementById('skyOv').classList.contains('open')) document.documentElement.classList.remove('lock-scroll'); }
    else if (document.getElementById('shareOv').classList.contains('open')) closeShare();
    else if (document.getElementById('skyOv').classList.contains('open')) closeSky();
  });

  // delegated clicks for the whole wall experience
  document.addEventListener('click', function (e) {
    const t = e.target;
    const tierBtn = t.closest('.tier'); if (tierBtn) { selectTier(tierBtn); return; }
    const giBtn = t.closest('.gi'); if (giBtn) { setIntent(giBtn.dataset.intent); return; }
    if (t.closest('#addMember')) { addMemberRow(); return; }
    if (t.closest('.rm-member')) { const row = t.closest('.member-row'); if (row) row.remove(); return; }
    if (t.closest('#toCheckout')) { draft = collectDraft(); if (draft) openCheckout(draft); return; }
    if (t.closest('#checkoutClose') || t === document.getElementById('checkoutOv')) { closeCheckout(); return; }
    if (t.closest('#coPay')) {
      const num = (document.getElementById('coCard').value || '').replace(/\s/g, '');
      if (num.length < 12) { const cc = document.getElementById('coCard'); cc.focus(); const card2 = document.querySelector('.checkout-card'); card2.classList.remove('shake'); void card2.offsetWidth; card2.classList.add('shake'); return; }
      closeCheckout(); if (draft) lightDraft(draft); return;
    }
    if (t.closest('#exploreBtn') || t.closest('#heroExplore')) { openSky(); return; }
    if (t.closest('#lightsField')) { openSky(); return; }
    if (t.closest('#skyDrift')) { const pool = lights.concat(memberStars).filter(function (x) { return x.el; }); if (pool.length) { const pick = pool[Math.floor(Math.random() * pool.length)]; closeCard(); flyTo(pick, true, 1.45 + Math.random() * 0.5); } return; }
    if (t.closest('#zoomIn')) { setZoom(zoom * 1.25); return; }
    if (t.closest('#zoomOut')) { setZoom(zoom * 0.8); return; }
    if (t.closest('#zoomReset')) { zoom = 1; offX = 0; offY = 0; applyOffset(); return; }
    if (t.closest('#skyClose')) { closeSky(); return; }
    if (t.closest('#skyLight')) { closeSky(); document.getElementById('recipientInput').focus(); window.scrollTo({ top: document.getElementById('wall').offsetTop - 30, behavior: 'smooth' }); return; }
    if (t.closest('#skyCardShare')) { if (card._light) openShare(card._light); return; }
    const starEl = t.closest('.sky-star');
    if (starEl) { e.stopPropagation(); const l = lights.concat(memberStars).filter(function (x) { return x.id === starEl.dataset.id; })[0]; if (l) { lights.concat(memberStars).forEach(function (x) { if (x.el) { x.el.classList.toggle('hit', x === l); x.el.classList.toggle('dim', x !== l); } }); openCard(l); if (typeof l.x === 'number') flyTo(l); } return; }
    if (t.closest('#avGo')) { revealArrival(); return; }
    if (t === document.getElementById('arriveOv')) { document.getElementById('arriveOv').classList.remove('open'); if (!document.getElementById('skyOv').classList.contains('open')) document.documentElement.classList.remove('lock-scroll'); return; }
    if (t.closest('#previewArrival')) { if (current) playDelivery(current, true); return; }
    if (t.closest('#shareClose')) { closeShare(); return; }
    if (t === document.getElementById('shareOv')) { closeShare(); return; }
    if (t.closest('#saCopy')) { const txt = current ? giftLink(current) : location.origin; if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () { toast(current ? 'Link copied. It opens straight onto Star No. ' + current.no + '.' : 'Link copied.'); }, function () { toast(txt); }); else toast(txt); return; }
    if (t.closest('#saNative')) { const tx = current ? shareText(current) : 'The Wall of Light'; if (navigator.share) navigator.share({ title: 'A gift of light', text: tx, url: current ? giftLink(current) : location.origin }).catch(function () {}); return; }
    if (t.closest('#saDownload')) { if (current) downloadCard(current); return; }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.target && e.target.id === 'lightsField') && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openSky(); }
  });

  // ---- recent rail ----
  function addRecent(l) {
    const rail = document.getElementById('recentRail'); if (!rail) return;
    const chip = document.createElement('span'); chip.className = 'recent-chip';
    chip.innerHTML = '<span class="sp"></span><b>' + esc(l.name) + '</b> · ' + esc(l.msg.length > 30 ? l.msg.slice(0, 30) + '…' : l.msg);
    if (rail.children.length > 1) rail.insertBefore(chip, rail.children[1]); else rail.appendChild(chip);
    while (rail.querySelectorAll('.recent-chip').length > 4) rail.removeChild(rail.lastChild);
  }
  // seed the rail with the latest few
  (function seedRail() { const rail = document.getElementById('recentRail'); if (rail && rail.querySelectorAll('.recent-chip').length === 0) lights.slice(-4).reverse().forEach(addRecent); })();

  // ---- share card ----
  let current = null;
  function buildShareStars() { const shareStars = document.getElementById('shareStars'); if (!shareStars || shareStars.children.length) return; const f = document.createDocumentFragment(); for (let i = 0; i < 70; i++) { const s = document.createElement('span'); if (Math.random() < 0.4) s.className = 'tw'; const sz = Math.random() < 0.18 ? 2.4 : 1.3; s.style.width = sz + 'px'; s.style.height = sz + 'px'; s.style.left = (Math.random() * 100) + '%'; s.style.top = (Math.random() * 64) + '%'; s.style.opacity = (0.2 + Math.random() * 0.6).toFixed(2); s.style.animationDelay = (Math.random() * 4).toFixed(2) + 's'; f.appendChild(s); } shareStars.appendChild(f); }
  function shareText(l) {
    const what = (l.tier === 'beacon') ? 'a Beacon' : (l.tier === 'spark') ? 'a star' : (l.tier === 'constellation') ? 'a Constellation' : 'a Guiding Star';
    if (l.mine && l.forName) return 'I named a star for ' + l.forName + ' on the Wall of Light. Star No. ' + l.no + ', burning forever for Ballymun. Go and see it:';
    if (l.mine) return 'I lit ' + what + ' on the Wall of Light. Star No. ' + l.no + ', burning forever for Ballymun. Light one too:';
    return '“' + l.msg + '” · Star No. ' + l.no + ' on the Wall of Light, burning forever for Ballymun. Light one too:';
  }
  function openShare(l) {
    current = l; buildShareStars(); buildShareMap();
    const label = (l.tier === 'beacon') ? 'beacon' : (l.tier === 'spark') ? 'spark' : (l.tier === 'constellation') ? 'constellation' : 'guiding star';
    const nm = starName(l);
    const head = document.getElementById('shareHead'); if (head) head.textContent = l.gift ? (nm ? nm + '’s star is lit. Now send it.' : 'Their star is lit. Now send it.') : 'Your star is lit. Share it.';
    const no = document.getElementById('shareNo'); if (no) no.textContent = 'Star No. ' + (l.no || '—');
    const eye = document.querySelector('#shareCard .sc-eye'); if (eye) eye.textContent = nm ? (l.tier === 'constellation' ? 'This constellation is named' : 'This star is named') : ('A ' + label + ' on the wall');
    const hero = document.querySelector('#shareCard .sc-hero'); if (hero) hero.style.transform = 'translate(-50%,-50%) scale(' + (l.tier === 'beacon' ? 1.5 : l.tier === 'constellation' ? 1.7 : l.tier === 'spark' ? 0.78 : 1) + ')';
    const toEl = document.getElementById('shareTo');
    if (nm) { toEl.style.display = ''; toEl.innerHTML = '<b>' + esc(nm) + '</b>'; }
    else toEl.style.display = 'none';
    document.getElementById('shareLine').textContent = '“' + l.msg + '”';
    document.getElementById('shareBy').textContent = 'Named by ' + l.name + ' · lit ' + prettyDate(l.date) + ' · forever';
    const you = document.getElementById('shareMapYou'), ring = document.getElementById('shareMapRing');
    const xp = Math.max(9, Math.min(91, (l.x / 3200) * 100)), yp = Math.max(14, Math.min(86, (l.y / 2200) * 100));
    if (you) { you.style.left = xp.toFixed(1) + '%'; you.style.top = yp.toFixed(1) + '%'; }
    if (ring) { ring.style.left = xp.toFixed(1) + '%'; ring.style.top = yp.toFixed(1) + '%'; }
    const mt = document.getElementById('shareMapTitle'); if (mt) mt.textContent = 'In ' + regionPhrase(l);
    const link = giftLink(l), txt = shareText(l), u = encodeURIComponent(link), t = encodeURIComponent(txt);
    document.getElementById('saWa').href = 'https://wa.me/?text=' + encodeURIComponent(txt + ' ' + link);
    document.getElementById('saFb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + u + '&quote=' + t;
    const em = document.getElementById('saEmail'); if (em) em.href = 'mailto:?subject=' + encodeURIComponent(nm ? 'A star has been named for you, ' + nm : 'A light for you on the Wall of Light') + '&body=' + encodeURIComponent(txt + '\n\n' + link);
    const prev = document.getElementById('previewArrival'); if (prev) prev.style.display = l.gift ? '' : 'none';
    const na = document.getElementById('saNative'); if (na) na.hidden = !navigator.share;
    document.documentElement.classList.add('lock-scroll');
    document.getElementById('shareOv').classList.add('open');
    spawnMotes();
  }
  function buildShareMap() {
    const box = document.getElementById('shareMapBox'); if (!box || box.querySelector('i')) return;
    for (let i = 0; i < 18; i++) { const d = document.createElement('i'); d.style.left = (4 + Math.random() * 92) + '%'; d.style.top = (8 + Math.random() * 84) + '%'; d.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2); box.appendChild(d); }
  }
  function spawnMotes() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.body.classList.contains('calm')) return;
    const m = document.getElementById('shareMotes'); if (!m) return; m.innerHTML = '';
    for (let i = 0; i < 11; i++) {
      const s = document.createElement('i'); const sz = 2 + Math.random() * 3;
      s.style.width = sz.toFixed(1) + 'px'; s.style.height = sz.toFixed(1) + 'px';
      s.style.left = (12 + Math.random() * 76) + '%'; s.style.bottom = (4 + Math.random() * 16) + '%';
      s.style.animationDelay = (Math.random() * 1.4).toFixed(2) + 's';
      s.style.animationDuration = (2.6 + Math.random() * 1.6).toFixed(2) + 's';
      m.appendChild(s);
    }
    clearTimeout(spawnMotes._t); spawnMotes._t = setTimeout(function () { m.innerHTML = ''; }, 5500);
  }
  function closeShare() { document.getElementById('shareOv').classList.remove('open'); if (!document.getElementById('skyOv').classList.contains('open')) document.documentElement.classList.remove('lock-scroll'); }
  function toast(msg) { const t = document.getElementById('shareToast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('show'); }, 2600); }

  // draw the keepsake certificate on a canvas for download
  function downloadCard(l) {
    const W = 720, H = 900, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const c = cv.getContext('2d');
    const serif = '"Source Serif 4", Georgia, serif';
    const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#182842'); g.addColorStop(0.45, '#0A1320'); g.addColorStop(1, '#070E19'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    const neb = c.createRadialGradient(W * 0.5, H * 0.27, 0, W * 0.5, H * 0.27, 330); neb.addColorStop(0, 'rgba(240,185,95,.18)'); neb.addColorStop(1, 'rgba(240,185,95,0)'); c.fillStyle = neb; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 110; i++) { c.globalAlpha = 0.16 + Math.random() * 0.6; c.fillStyle = Math.random() < 0.2 ? '#FFE9C6' : '#CBD8EC'; const r = Math.random() < 0.18 ? 1.7 : 1; c.beginPath(); c.arc(Math.random() * W, Math.random() * H * 0.58, r, 0, 7); c.fill(); }
    c.globalAlpha = 1;
    function rr(x, y, w, h, rad) { c.beginPath(); c.moveTo(x + rad, y); c.arcTo(x + w, y, x + w, y + h, rad); c.arcTo(x + w, y + h, x, y + h, rad); c.arcTo(x, y + h, x, y, rad); c.arcTo(x, y, x + w, y, rad); c.closePath(); }
    c.strokeStyle = 'rgba(240,185,95,.4)'; c.lineWidth = 1.5; rr(26, 26, W - 52, H - 52, 18); c.stroke();
    c.strokeStyle = 'rgba(240,185,95,.16)'; c.lineWidth = 1; rr(34, 34, W - 68, H - 68, 14); c.stroke();
    c.textAlign = 'center';
    c.fillStyle = 'rgba(159,176,198,.9)'; c.font = '600 12px Inter, sans-serif';
    c.fillText('T H E   W A L L   O F   L I G H T   ·   B A L L Y M U N', W / 2, 76);
    const pillW = 180; c.strokeStyle = 'rgba(240,185,95,.5)'; c.lineWidth = 1.4; rr(W / 2 - pillW / 2, 94, pillW, 34, 17); c.stroke();
    c.fillStyle = '#FFE3A3'; c.font = '700 13px Inter, sans-serif'; c.fillText('S T A R   N o .  ' + (l.no || '—'), W / 2, 116);
    // the star itself
    const hx = W / 2, hy = 252;
    const rg = c.createRadialGradient(hx, hy, 0, hx, hy, 140); rg.addColorStop(0, 'rgba(255,247,220,1)'); rg.addColorStop(0.16, 'rgba(255,227,163,.92)'); rg.addColorStop(0.5, 'rgba(240,185,95,.3)'); rg.addColorStop(1, 'rgba(240,185,95,0)');
    c.fillStyle = rg; c.beginPath(); c.arc(hx, hy, 140, 0, 7); c.fill();
    c.strokeStyle = 'rgba(255,231,170,.65)'; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(hx, hy - 126); c.lineTo(hx, hy + 126); c.moveTo(hx - 126, hy); c.lineTo(hx + 126, hy); c.stroke();
    c.strokeStyle = 'rgba(255,231,170,.28)';
    c.beginPath(); c.moveTo(hx - 60, hy - 60); c.lineTo(hx + 60, hy + 60); c.moveTo(hx + 60, hy - 60); c.lineTo(hx - 60, hy + 60); c.stroke();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(hx, hy, 10, 0, 7); c.fill();
    // the name it carries
    const nm = starName(l); let y = 428;
    if (nm) {
      c.fillStyle = '#F0B95F'; c.font = '600 13px Inter, sans-serif';
      c.fillText(l.tier === 'constellation' ? 'T H I S   C O N S T E L L A T I O N   I S   N A M E D' : 'T H I S   S T A R   I S   N A M E D', W / 2, y); y += 54;
      let fs = 44; c.font = '600 ' + fs + 'px ' + serif;
      while (c.measureText(nm).width > W - 150 && fs > 24) { fs -= 2; c.font = '600 ' + fs + 'px ' + serif; }
      c.fillStyle = '#FBF3E2'; c.fillText(nm, W / 2, y); y += 50;
    } else {
      c.fillStyle = '#F0B95F'; c.font = '600 13px Inter, sans-serif'; c.fillText('A   L I G H T   O N   T H E   W A L L', W / 2, y); y += 48;
    }
    c.fillStyle = '#E4DAC6';
    wrapText(c, '“' + l.msg + '”', W / 2, y, W - 170, 38, 'italic 500 27px ' + serif); y = wrapText._y + 46;
    c.fillStyle = '#9FB0C6'; c.font = '400 17px Inter, sans-serif';
    c.fillText('Named by ' + l.name + ' · lit ' + prettyDate(l.date), W / 2, y); y += 27;
    c.fillText('In ' + regionPhrase(l) + ' · it burns forever', W / 2, y);
    // footer
    c.strokeStyle = 'rgba(240,185,95,.4)'; c.lineWidth = 1; c.beginPath(); c.moveTo(W / 2 - 120, H - 108); c.lineTo(W / 2 + 120, H - 108); c.stroke();
    c.fillStyle = '#F5F1E7'; c.font = '600 23px ' + serif; c.fillText('The Light House Project', W / 2, H - 70);
    c.fillStyle = '#F0B95F'; c.font = '600 12px Inter, sans-serif'; c.fillText('E V E R Y   L I G H T   B U R N S   F O R E V E R', W / 2, H - 44);
    cv.toBlob(function (blob) {
      const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'star-no-' + (l.no || 'x') + '-wall-of-light.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast('Keepsake saved. Frame it, post it, or send it on.');
    }, 'image/png');
  }
  function wrapText(c, text, x, y, maxW, lh, font) {
    c.font = font; const words = text.split(' '); let line = '', yy = y;
    for (let n = 0; n < words.length; n++) { const test = line + words[n] + ' '; if (c.measureText(test).width > maxW && n > 0) { c.fillText(line.trim(), x, yy); line = words[n] + ' '; yy += lh; } else line = test; }
    c.fillText(line.trim(), x, yy); wrapText._y = yy;
  }

  // ---- light a light (compose) ----
  setIntent('gift');

  // deep link: a recipient opening /star/[id] (or ?star=ID) flies straight to their star
  (function () {
    try {
      let id = starId;
      if (!id) {
        const m = (location.search || '').match(/[?&]star=([^&]+)/);
        if (m) id = decodeURIComponent(m[1]);
      }
      if (!id) return;
      let target = lights.find(function (x) { return x.id === id; });
      // member stars ('l8-m2') are minted during buildSky; derive a descriptor for the arrival
      if (!target) {
        const mm = /^(l\d+|mine\d+)-m(\d+)$/.exec(id);
        if (mm) {
          const parent = lights.find(function (x) { return x.id === mm[1]; });
          if (parent && parent.tier === 'constellation') {
            const sat = memberSlots(parent.members)[+mm[2]];
            if (sat) target = { msg: parent.msg, name: parent.name, date: parent.date, mine: false, gift: true, tier: 'member', forName: sat.name || null, no: parent.no, region: parent.region, constellation: parent.label || parent.forName || parent.name, id: id, x: parent.x + sat.dx, y: parent.y + sat.dy };
          }
        }
      }
      if (target) setTimeout(function () { target.gift = true; current = target; playDelivery(target, false); }, 900);
    } catch (e) {}
  })();
}

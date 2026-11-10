// Hero night scene: time-of-day palette, cursor light + parallax, "on tonight"
// pill, named supporter stars, drifting verses, days-lit counter, star field
// and city windows. Ported beat-for-beat from the design prototype.

export function initHero() {
  // the living sky
  (function () {
    const panel = document.getElementById('heroPanel');
    const btns = panel.querySelectorAll('.skybar button');
    function setSky(state) {
      panel.classList.remove('sky-dawn', 'sky-day', 'sky-dusk', 'sky-night');
      panel.classList.add(state);
      btns.forEach(function (b) { b.classList.toggle('on', b.dataset.sky === state); b.setAttribute('aria-pressed', String(b.dataset.sky === state)); });
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { setSky(b.dataset.sky); }); });
    setSky('sky-night');
  })();

  // the visitor is a light + gentle parallax depth
  (function () {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const panel = document.getElementById('heroPanel'), glow = document.getElementById('cursorGlow');
    const stars = document.getElementById('stars'), moon = panel.querySelector('.moon'), lh = panel.querySelector('.lh-wrap');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = null, mx = 0, my = 0;
    function apply() {
      raf = null;
      if (stars) stars.style.transform = 'translate(' + (mx * 9).toFixed(1) + 'px,' + (my * 6).toFixed(1) + 'px)';
      if (moon) moon.style.transform = 'translate(' + (mx * 14).toFixed(1) + 'px,' + (my * 9).toFixed(1) + 'px)';
      if (lh) lh.style.transform = 'translate(' + (mx * -6).toFixed(1) + 'px,' + (my * -4).toFixed(1) + 'px)';
    }
    panel.addEventListener('mousemove', function (e) {
      const r = panel.getBoundingClientRect();
      glow.style.left = (e.clientX - r.left) + 'px'; glow.style.top = (e.clientY - r.top) + 'px'; glow.style.opacity = 1;
      if (reduce || document.body.classList.contains('calm')) return;
      mx = (e.clientX - r.left) / r.width - 0.5; my = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    panel.addEventListener('mouseleave', function () {
      glow.style.opacity = 0; mx = 0; my = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    });
  })();

  // named stars
  (function () {
    const wrap = document.getElementById('stars'), tip = document.getElementById('starTip');
    const names = [['In memory of John', 57, 14], ['The Kelly family · Coultry', 66, 24], ['Class of 2025 · Be The Light', 74, 10], ['A friend in Santry', 82, 20], ['For all the nanas', 88, 32], ['Lit by a local business', 62, 36]];
    names.forEach(function (n) {
      const b = document.createElement('span'); b.className = 'star named';
      b.style.left = n[1] + '%'; b.style.top = n[2] + '%'; b.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
      function show() { tip.textContent = n[0]; tip.style.left = n[1] + '%'; tip.style.top = n[2] + '%'; tip.classList.add('show'); }
      function hide() { tip.classList.remove('show'); }
      b.addEventListener('mouseenter', show); b.addEventListener('mouseleave', hide); b.addEventListener('focus', show); b.addEventListener('blur', hide);
      wrap.appendChild(b);
    });
  })();

  // verses in the dark
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const v = document.getElementById('verse'), panel = document.getElementById('heroPanel');
    const lines = ['the dark is just the light, resting', 'we sang until the night felt small', 'hope is a window left open'];
    let i = 0;
    const token = (window.__verseToken = (window.__verseToken || 0) + 1);
    function drift() {
      if (window.__verseToken !== token) return;
      if (document.hidden || document.body.classList.contains('calm')) { setTimeout(drift, 8000); return; }
      if (panel.classList.contains('sky-day')) { setTimeout(drift, 8000); return; }
      v.innerHTML = ''; const t = document.createTextNode(lines[i % lines.length]); const s = document.createElement('small'); s.textContent = 'Teens Poetry Club'; v.appendChild(t); v.appendChild(s); i++;
      v.style.top = (10 + Math.random() * 15) + '%'; v.style.left = '0';
      const w = panel.clientWidth;
      const anim = v.animate([{ transform: 'translateX(' + (w * 0.52) + 'px)', opacity: 0 }, { opacity: 0.92, offset: 0.15 }, { opacity: 0.92, offset: 0.78 }, { transform: 'translateX(' + (w * 0.9) + 'px)', opacity: 0 }], { duration: 16000, easing: 'linear' });
      anim.onfinish = function () { setTimeout(drift, 9000); };
    }
    setTimeout(drift, 5000);
  })();

  // stars
  (function () {
    const wrap = document.getElementById('stars');
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 165; i++) {
      const s = document.createElement('span'); const cls = ['star'];
      const t = Math.random(); if (t < 0.16) cls.push('warm'); else if (t < 0.34) cls.push('cool');
      const bright = Math.random() < 0.18; if (bright) cls.push('bright');
      if (Math.random() < 0.42) cls.push('tw');
      s.className = cls.join(' ');
      s.style.left = (Math.random() * 100) + '%'; s.style.top = (Math.random() * 64) + '%';
      s.style.opacity = (0.18 + Math.random() * 0.7).toFixed(2);
      s.style.animationDuration = (3.6 + Math.random() * 4).toFixed(1) + 's';
      s.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
      const sz = bright ? (2.3 + Math.random() * 1.4) : (Math.random() < 0.5 ? 1.3 : 1.9);
      s.style.width = sz.toFixed(1) + 'px'; s.style.height = sz.toFixed(1) + 'px';
      frag.appendChild(s);
    }
    // a few brighter feature stars with a soft diffraction cross
    [[20, 15], [78, 11], [57, 27], [89, 31], [40, 8], [9, 9]].forEach(function (g) {
      const s = document.createElement('span');
      s.className = 'star gem tw' + (Math.random() < 0.4 ? ' warm' : '');
      s.style.left = g[0] + '%'; s.style.top = g[1] + '%';
      const sz = 2.6 + Math.random() * 1.1; s.style.width = sz.toFixed(1) + 'px'; s.style.height = sz.toFixed(1) + 'px';
      s.style.opacity = '.95';
      s.style.animationDuration = (5 + Math.random() * 3).toFixed(1) + 's';
      s.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
      frag.appendChild(s);
    });
    wrap.appendChild(frag);
  })();

  // city windows
  (function () {
    const c = document.getElementById('cityLights'); if (!c) return;
    c.style.cssText = 'position:absolute;left:5%;bottom:21%;width:230px;height:30px;z-index:1;pointer-events:none;transition:opacity 1.4s ease';
    for (let i = 0; i < 11; i++) { const w = document.createElement('span'); w.style.cssText = 'position:absolute;width:1.6px;height:1.6px;border-radius:99px;background:#E8B96B;opacity:' + (0.4 + Math.random() * 0.5).toFixed(2) + ';left:' + (4 + Math.random() * 92) + '%;top:' + (35 + Math.random() * 48) + '%'; c.appendChild(w); }
  })();
}

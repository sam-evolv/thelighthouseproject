// Page-level interactions outside the hero and the Wall: the deed-card tilt,
// the L.I.G.H.T. lamps, the programme ticker, the floating dock and the
// scroll reveals. Ported beat-for-beat from the design prototype.

export function initSections() {
  // team medallions: fall back to gold initials if a photo fails to load
  (function () {
    document.querySelectorAll('.tm-ava img').forEach(function (img) {
      img.addEventListener('error', function () { img.remove(); });
      if (img.complete && img.naturalWidth === 0) img.remove();
    });
  })();

  // the note is an object: it tilts and catches the light in your hand
  (function () {
    const cardEl = document.getElementById('shareCard'); if (!cardEl) return;
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sheen = cardEl.querySelector('.sc-sheen');
    cardEl.addEventListener('pointermove', function (e) {
      if (document.body.classList.contains('calm')) return;
      const r = cardEl.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      cardEl.style.transition = 'transform .12s ease-out';
      cardEl.style.transform = 'rotateX(' + (-py * 7).toFixed(2) + 'deg) rotateY(' + (px * 8).toFixed(2) + 'deg)';
      if (sheen) sheen.style.background = 'radial-gradient(360px circle at ' + ((px + 0.5) * 100).toFixed(1) + '% ' + ((py + 0.5) * 100).toFixed(1) + '%, rgba(255,238,198,.15), rgba(255,238,198,.05) 42%, transparent 66%)';
    });
    cardEl.addEventListener('pointerleave', function () {
      cardEl.style.transition = ''; cardEl.style.transform = ''; if (sheen) sheen.style.background = '';
    });
  })();

  // L.I.G.H.T. lamps: ignite in sequence, tap to reveal meaning
  (function () {
    const lamps = document.getElementById('lamps');
    if (!lamps) return;
    const items = lamps.querySelectorAll('.lamp');
    const detail = document.getElementById('vdetail'), wEl = document.getElementById('vdWord'), dEl = document.getElementById('vdDesc');
    function select(item) {
      items.forEach(function (l) { const a = (l === item); l.classList.toggle('active', a); l.setAttribute('aria-selected', a ? 'true' : 'false'); });
      if (detail && wEl && dEl) {
        detail.classList.add('swap');
        setTimeout(function () { wEl.textContent = item.dataset.word; dEl.textContent = item.dataset.desc; detail.classList.remove('swap'); }, 190);
      }
    }
    items.forEach(function (item, idx) {
      item.addEventListener('click', function () { select(item); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const next = (idx + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length;
          items[next].focus(); select(items[next]);
        }
      });
    });
    let done = false;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !done) {
          done = true;
          items.forEach(function (item, i) { setTimeout(function () { item.classList.add('on'); if (i === 0) select(item); }, 260 + i * 240); });
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(lamps);
  })();

  // ticker loop
  (function () { const t = document.getElementById('tickerTrack'); t.innerHTML += t.innerHTML; })();

  // floating "light a light" dock: appears after the hero, hides while the wall is in view
  (function () {
    const dock = document.getElementById('dock'), hero = document.getElementById('top'), wall = document.getElementById('wall');
    if (!dock || !hero) return;
    let pastHero = false, atWall = false;
    function update() { dock.classList.toggle('show', pastHero && !atWall); }
    new IntersectionObserver(function (es) { es.forEach(function (e) { pastHero = !e.isIntersecting; update(); }); }, { rootMargin: '-72px 0px 0px 0px' }).observe(hero);
    if (wall) new IntersectionObserver(function (es) { es.forEach(function (e) { atWall = e.isIntersecting; update(); }); }, { threshold: 0.18 }).observe(wall);
  })();

  // scroll reveals
  (function () {
    const io = new IntersectionObserver(function (entries) { entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  })();
}

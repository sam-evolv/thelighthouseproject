export function initAccessibility() {
  const dialogs = [...document.querySelectorAll('[role="dialog"]')];
  let active = null;
  const origins = new WeakMap();
  let previouslyOpen = new Set();
  const focusable = dialog => [...dialog.querySelectorAll('a[href], button, input, textarea, select, [tabindex="0"]')]
    .filter(el => !el.disabled && !el.hidden && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden');
  function syncDialogs() {
    const open = dialogs.filter(d => d.classList.contains('open'));
    const top = open.sort((a, b) => Number(getComputedStyle(b).zIndex) - Number(getComputedStyle(a).zIndex))[0] || null;
    for (const dialog of open) if (!previouslyOpen.has(dialog)) origins.set(dialog, document.activeElement);
    previouslyOpen = new Set(open);
    if (top === active) return;
    const previous = active;
    active = top;
    for (const child of document.body.children) {
      if (child.matches('script, style, #shareToast')) continue;
      child.inert = Boolean(top && child !== top && !child.contains(top));
    }
    dialogs.forEach(d => {
      d.inert = d !== top;
      d.setAttribute('aria-hidden', String(d !== top));
    });
    if (top) {
      top.tabIndex = -1;
      const origin = previous ? origins.get(previous) : null;
      const target = origin?.isConnected && top.contains(origin) ? origin : focusable(top)[0] || top;
      target.focus({ preventScroll: true });
    } else if (previous) {
      const origin = origins.get(previous);
      if (origin?.isConnected && !origin.closest('[inert]')) origin.focus({ preventScroll: true });
    }
    document.documentElement.classList.toggle('lock-scroll', Boolean(top));
  }
  dialogs.forEach(d => { d.inert = true; d.setAttribute('aria-hidden', 'true'); });
  new MutationObserver(records => {
    if (records.some(r => dialogs.includes(r.target))) syncDialogs();
  }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !active) return;
    const items = focusable(active), first = items[0], last = items.at(-1);
    if (!first) { event.preventDefault(); active.focus(); return; }
    if (event.shiftKey && (document.activeElement === first || document.activeElement === active)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}

// Preview dedications travel in their link. They are never payment records or
// entries in a public registry. A fresh browser can reconstruct the same gift.
const TIERS = new Set(['spark', 'star', 'beacon', 'constellation']);
const clean = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';

function normalise(value) {
  if (!value || typeof value !== 'object' || !TIERS.has(value.t)) return null;
  const message = clean(value.m, 80);
  const date = clean(value.d, 10);
  if (!message || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) return null;
  return {
    t: value.t, m: message, n: clean(value.n, 30) || 'A friend',
    f: clean(value.f, 40), d: date,
    s: value.t === 'constellation' && Array.isArray(value.s)
      ? value.s.slice(0, 8).map(name => clean(name, 28)).filter(Boolean) : [],
  };
}

export function encodePreview(star) {
  const value = normalise({ t: star.tier, m: star.msg, n: star.name, f: star.forName || star.label, d: star.date, s: star.members });
  if (!value) throw new Error('This dedication needs a message and a valid date.');
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return 'p_' + btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodePreview(id) {
  if (typeof id !== 'string' || id.length > 2400 || !/^p_[A-Za-z0-9_-]+$/.test(id)) return null;
  try {
    const binary = atob(id.slice(2).replace(/-/g, '+').replace(/_/g, '/'));
    return normalise(JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(binary, char => char.charCodeAt(0)))));
  } catch { return null; }
}

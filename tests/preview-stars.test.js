import test from 'node:test';
import assert from 'node:assert/strict';
import { encodePreview, decodePreview } from '../lib/preview-stars.js';
import { getStarById, buildSeedLights, SEED_COUNT } from '../lib/registry.js';

const dedication = { tier: 'star', msg: 'Grá agus solas ✨ — you’re loved.', name: 'Aoife & Cian', forName: 'Granny May 💛', date: '2026-11-10' };
test('a unicode dedication survives its share link in an independent reader', () => {
  const id = encodePreview(dedication), star = getStarById(id);
  assert.match(id, /^p_[A-Za-z0-9_-]+$/);
  for (const key of ['tier', 'msg', 'name', 'forName', 'date']) assert.equal(star[key], dedication[key]);
  assert.equal(star.preview, true);
  assert.deepEqual(getStarById(id), star);
});
test('constellation member links reconstruct each person and preserve preview status', () => {
  const id = encodePreview({ ...dedication, tier: 'constellation', members: ['Mam', 'Dad', 'Éabha'] });
  const member = getStarById(id + '-m2');
  assert.equal(member.forName, 'Éabha'); assert.equal(member.preview, true);
  assert.equal(member.tier, 'member'); assert.equal(getStarById(id + '-m9'), null);
});
test('invalid, oversized and malformed links fail closed', () => {
  for (const id of [null, '', 'mine0', 'p_invalid', 'p_' + 'a'.repeat(2500), 'p_💛', 'l9999', 'l8-m99']) assert.equal(getStarById(id), null);
  for (const value of [{}, { t: '__proto__', m: 'x', d: '2026-11-10' }, { t: 'star', m: 'x', d: '2026-02-30' }, { t: 'star', m: '', d: '2026-11-10' }]) {
    assert.equal(decodePreview('p_' + Buffer.from(JSON.stringify(value)).toString('base64url')), null);
  }
});
test('untrusted link fields are bounded and unknown fields never become star properties', () => {
  const id = encodePreview({ ...dedication, msg: 'x'.repeat(500), name: 'n'.repeat(500), forName: 'f'.repeat(500), tier: 'constellation', members: Array(20).fill('z'.repeat(100)), paid: true });
  const star = getStarById(id);
  assert.equal(star.msg.length, 80); assert.equal(star.name.length, 30); assert.equal(star.forName.length, 40);
  assert.equal(star.members.length, 8); assert.equal(star.members[0].length, 28); assert.equal(star.paid, undefined);
});
test('example registry count and star positions are deterministic', () => {
  assert.equal(SEED_COUNT, buildSeedLights().length);
  assert.deepEqual(buildSeedLights(), buildSeedLights());
  assert.equal(getStarById('l8-m0').forName, 'Aoife');
});

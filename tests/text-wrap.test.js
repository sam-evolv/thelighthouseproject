import test from 'node:test';
import assert from 'node:assert/strict';
import { wrapMeasuredText } from '../lib/text-wrap.js';

test('Story messages wrap at word boundaries without breaking a normal word', () => {
  const text = 'Different stars. The same sky. Always together.';
  const rows = wrapMeasuredText(text, value => value.length, 28);
  assert.deepEqual(rows, ['Different stars. The same', 'sky. Always together.']);
  assert.equal(rows.join(' '), text);
});
test('a long unbroken message still fits the available width', () => {
  const rows = wrapMeasuredText('W'.repeat(80), value => value.length, 18);
  assert.ok(rows.every(row => row.length <= 18));
  assert.equal(rows.join(''), 'W'.repeat(80));
});
test('emoji families stay intact when an unbroken message needs wrapping', () => {
  const family = '👩‍👩‍👦‍👦', segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  const rows = wrapMeasuredText(family.repeat(12), value => [...segmenter.segment(value)].length, 4);
  assert.deepEqual(rows, [family.repeat(4), family.repeat(4), family.repeat(4)]);
});

// Prefer word boundaries; only split a word when it cannot fit on one line.
export function wrapMeasuredText(text, measure, maxWidth) {
  const rows = [];
  let line = '';
  const graphemes = value => typeof Intl.Segmenter === 'function'
    ? [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(value)].map(s => s.segment)
    : Array.from(value);
  for (const token of text.split(/(\s+)/u).filter(Boolean)) {
    if (/^\s+$/u.test(token)) { if (line) line += ' '; continue; }
    if (measure(line + token) <= maxWidth) { line += token; continue; }
    if (line.trim()) { rows.push(line.trim()); line = ''; }
    if (measure(token) <= maxWidth) { line = token; continue; }
    for (const ch of graphemes(token)) {
      if (line && measure(line + ch) > maxWidth) { rows.push(line); line = ''; }
      line += ch;
    }
  }
  if (line.trim()) rows.push(line.trim());
  return rows;
}

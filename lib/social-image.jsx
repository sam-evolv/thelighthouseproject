import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { starName, mulberry32 } from './registry';

const font = readFile(join(process.cwd(), 'public/fonts/source-serif-4-regular.ttf'));

// Keep link crawler images self-contained. Original Unicode stays untouched on
// the actual star and in the Story; unsupported image glyphs get a calm fallback.
function previewText(value, fallback) {
  const text = String(value || '').replace(/[\p{Extended_Pictographic}\p{Emoji_Modifier}\u200d\ufe0f]/gu, '').trim();
  return text && /^[\u0020-\u024f\u2000-\u206f]*$/.test(text) ? text : fallback;
}

export async function createSocialImage(star = null) {
  const random = mulberry32(2771);
  const dots = Array.from({ length: 75 }, () => ({ x: random() * 1200, y: random() * 630, r: .5 + random() * 1.5, opacity: .2 + random() * .6 }));
  const name = star ? previewText(starName(star) || star.name, 'Someone special') : null;
  const message = star ? previewText(star.msg, 'A little love, written in light.') : 'For someone you love. For a community that cares.';
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', background: '#071020', color: '#f6eddb', display: 'flex', fontFamily: 'Source Serif', position: 'relative' }}>
      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', inset: 0 }}>
        <defs><radialGradient id="sky"><stop stopColor="#24375c" stopOpacity=".8"/><stop offset="1" stopColor="#071020" stopOpacity="0"/></radialGradient><radialGradient id="gold"><stop stopColor="#f5cf88" stopOpacity=".4"/><stop offset=".18" stopColor="#e7b165" stopOpacity=".15"/><stop offset="1" stopColor="#e7b165" stopOpacity="0"/></radialGradient></defs>
        <ellipse cx="1000" cy="130" rx="780" ry="650" fill="url(#sky)" />
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#d7e5ff" opacity={d.opacity} />)}
        <ellipse cx="935" cy="300" rx="182" ry="83" stroke="#e4c589" strokeOpacity=".28" fill="none" transform="rotate(-26 935 300)" />
        <ellipse cx="935" cy="300" rx="154" ry="116" stroke="#c9daef" strokeOpacity=".15" fill="none" transform="rotate(29 935 300)" />
        <circle cx="935" cy="300" r="200" fill="url(#gold)" />
        <path d="M935 199 C939 288 945 295 1007 300 C945 305 939 312 935 401 C931 312 925 305 863 300 C925 295 931 288 935 199Z" fill="#fff2cc" />
        <circle cx="773" cy="374" r="3" fill="#f7dba7"/><circle cx="1068" cy="219" r="2" fill="#f7dba7"/><circle cx="1037" cy="401" r="2" fill="#d9e9ff"/>
      </svg>
      <div style={{ position: 'absolute', inset: 28, border: '1px solid #ddc59540', borderRadius: 14, display: 'flex' }} />
      <div style={{ display: 'flex', flexDirection: 'column', width: 760, padding: '65px 0 55px 85px', position: 'relative' }}>
        <div style={{ display: 'flex', fontSize: 15, color: '#daba84', letterSpacing: 5 }}>THE WALL OF LIGHT · BALLYMUN</div>
        <div style={{ display: 'flex', marginTop: 49, color: '#b9c6da', fontSize: 21 }}>{star ? 'Of all the stars, this one is for' : 'A little love, written in light.'}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 12, fontSize: name ? (name.length > 22 ? 47 : 75) : 77, lineHeight: 1.05, letterSpacing: -2, color: '#f5deb0', maxWidth: 650, wordBreak: 'break-word' }}>{name || 'Some people are your light.'}</div>
        <div style={{ display: 'flex', fontSize: star ? 25 : 22, lineHeight: 1.4, color: '#d3d9e2', marginTop: 27, maxWidth: 630, wordBreak: 'break-word' }}>{star ? '“' + message + '”' : message}</div>
        <div style={{ display: 'flex', marginTop: 'auto', paddingTop: 24, fontSize: 17, color: '#afbdd2' }}>{star ? 'With love, ' + previewText(star.name, 'someone who cares') + ' · a preview gift of light' : 'The Light House Project · discover our preview sky'}</div>
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [{ name: 'Source Serif', data: await font, weight: 400, style: 'normal' }] },
  );
}

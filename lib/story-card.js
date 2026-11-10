import QRCode from 'qrcode';
import { paintSky } from './starlight';
import { starName, regionPhrase, memberSlots } from './registry';

function fitText(c, text, x, y, maxWidth, size, family, colour) {
  let fontSize = size;
  c.font = `${fontSize}px ${family}`;
  while (c.measureText(text).width > maxWidth && fontSize > 25) {
    fontSize -= 2; c.font = `${fontSize}px ${family}`;
  }
  c.fillStyle = colour; c.fillText(text, x, y);
}

function lines(c, text, x, y, maxWidth, lineHeight, draw = true) {
  // Segment graphemes so even an unbroken name or emoji message wraps safely.
  const segments = typeof Intl.Segmenter === 'function'
    ? [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)].map(s => s.segment)
    : Array.from(text);
  let line = '', row = y;
  for (const ch of segments) {
    if (c.measureText(line + ch).width > maxWidth && line) { if (draw) c.fillText(line.trim(), x, row); line = ''; row += lineHeight; }
    line += ch;
  }
  if (line && draw) c.fillText(line.trim(), x, row);
  return row;
}

function drawStar(c, x, y, scale = 1) {
  const glow = c.createRadialGradient(x, y, 0, x, y, 170 * scale);
  glow.addColorStop(0, 'rgba(255,238,184,.45)'); glow.addColorStop(.2, 'rgba(239,187,105,.16)'); glow.addColorStop(1, 'transparent');
  c.fillStyle = glow; c.fillRect(x - 170 * scale, y - 170 * scale, 340 * scale, 340 * scale);
  c.save(); c.translate(x, y); c.scale(scale, scale);
  c.shadowColor = '#f6cc85'; c.shadowBlur = 15;
  c.fillStyle = '#fff9e7'; c.beginPath();
  c.moveTo(0, -95); c.bezierCurveTo(4, -11, 8, -5, 72, 0); c.bezierCurveTo(8, 5, 4, 11, 0, 95);
  c.bezierCurveTo(-4, 11, -8, 5, -72, 0); c.bezierCurveTo(-8, -5, -4, -11, 0, -95); c.fill();
  c.rotate(Math.PI / 4); c.globalAlpha = .55; c.scale(.45, .45);
  c.fillRect(-1, -85, 2, 170); c.fillRect(-85, -1, 170, 2);
  c.restore();
}

export async function renderStory(canvas, star, link) {
  await document.fonts.ready;
  const c = canvas.getContext('2d'), W = 1080, H = 1920;
  canvas.width = W; canvas.height = H;
  paintSky(c, W, H, 1947);
  const serif = getComputedStyle(document.body).getPropertyValue('--font-display').trim() || 'Georgia, serif';
  const sans = getComputedStyle(document.body).fontFamily;
  const golden = c.createRadialGradient(W * .5, H * .32, 10, W * .5, H * .32, 470);
  golden.addColorStop(0, 'rgba(206,154,87,.17)'); golden.addColorStop(1, 'transparent');
  c.fillStyle = golden; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(229,200,146,.35)'; c.lineWidth = 1;
  c.strokeRect(48, 130, W - 96, H - 260);
  c.textAlign = 'center';
  fitText(c, 'THE WALL OF LIGHT', W / 2, 224, 850, 24, sans, '#e7cca0');
  fitText(c, 'B A L L Y M U N', W / 2, 267, 850, 16, sans, '#a6b5d0');
  // Orbit lines make the constellation a distinct keepsake.
  c.save(); c.translate(W / 2, 600); c.rotate(-.4); c.strokeStyle = 'rgba(239,203,145,.2)';
  c.beginPath(); c.ellipse(0, 0, 295, 125, 0, 0, Math.PI * 2); c.stroke();
  c.rotate(.7); c.beginPath(); c.ellipse(0, 0, 250, 190, 0, 0, Math.PI * 2); c.stroke(); c.restore();
  if (star.tier === 'constellation') {
    const slots = memberSlots(star.members);
    c.strokeStyle = 'rgba(240,211,158,.4)';
    slots.forEach(s => { const x = W / 2 + s.dx * 3, y = 600 + s.dy * 3; c.beginPath(); c.moveTo(W / 2, 600); c.lineTo(x, y); c.stroke(); drawStar(c, x, y, .2); });
  }
  drawStar(c, W / 2, 600, star.tier === 'beacon' ? 1.45 : star.tier === 'spark' ? .7 : 1.1);
  fitText(c, star.tier === 'constellation' ? 'OUR PEOPLE. OUR OWN LITTLE UNIVERSE.' : 'SOME PEOPLE ARE YOUR LIGHT.', W / 2, 913, 850, 22, sans, '#d8b785');
  fitText(c, starName(star) || star.name, W / 2, 1037, 870, 100, serif, '#fff5e3');
  const quoted = '“' + star.msg + '”';
  let messageSize = 46;
  while (messageSize > 26) {
    c.font = `italic ${messageSize}px ${serif}`;
    if (lines(c, quoted, W / 2, 1135, 800, messageSize * 1.35, false) <= 1285) break;
    messageSize -= 2;
  }
  c.fillStyle = '#e4ddcf';
  const messageEnd = lines(c, quoted, W / 2, 1135, 800, messageSize * 1.35);
  fitText(c, 'With love, ' + star.name, W / 2, Math.max(1345, messageEnd + 80), 850, 25, sans, '#adbcd2');
  fitText(c, 'In ' + regionPhrase(star), W / 2, 1422, 850, 21, sans, '#d8b785');
  const qr = document.createElement('canvas');
  await QRCode.toCanvas(qr, link, { width: 224, margin: 4, errorCorrectionLevel: 'L', color: { dark: '#0b1526', light: '#fff6e2' } });
  c.drawImage(qr, 125, 1492, 224, 224);
  c.textAlign = 'left';
  fitText(c, 'There’s a light for you.', 365, 1578, 520, 36, serif, '#fff5e3');
  fitText(c, 'Scan to find your star ↗', 365, 1629, 520, 22, sans, '#adbcd2');
  c.textAlign = 'center';
  fitText(c, 'THE LIGHT HOUSE PROJECT', W / 2, 1744, 850, 20, sans, '#e7cca0');
  fitText(c, 'A preview gift of light · donations opening soon', W / 2, 1783, 850, 18, sans, '#a6b5d0');
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Your image could not be created. Please try again.')), 'image/png'));
}

export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

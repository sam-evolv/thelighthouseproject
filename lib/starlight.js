// A lightweight, deterministic painted sky: no remote images or animation loop.
import { mulberry32 } from './registry';

export function paintSky(context, width, height, seed = 1088) {
  const random = mulberry32(seed);
  context.clearRect(0, 0, width, height);
  context.fillStyle = '#050c1b';
  context.fillRect(0, 0, width, height);
  const cloud = (x, y, radius, colour) => {
    const g = context.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, colour); g.addColorStop(1, 'transparent');
    context.fillStyle = g; context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  };
  cloud(width * .72, height * .22, width * .65, 'rgba(41,64,129,.38)');
  cloud(width * .2, height * .85, width * .48, 'rgba(29,76,95,.24)');
  cloud(width * .54, height * .56, width * .3, 'rgba(120,87,67,.12)');
  // Fine dust along an irregular galactic ribbon, rather than a flat gradient.
  context.globalCompositeOperation = 'screen';
  for (let i = 0; i < 5400; i++) {
    const t = random();
    const spread = (random() + random() + random() - 1.5) * height * .28;
    const x = t * width;
    const y = height * (.92 - .82 * t + Math.sin(t * 8) * .045) + spread;
    const warm = random() > .78;
    context.fillStyle = warm ? 'rgba(216,175,122,.15)' : 'rgba(145,171,225,.12)';
    context.beginPath(); context.arc(x, y, random() * 1.4 + .15, 0, Math.PI * 2); context.fill();
  }
  for (let i = 0; i < 450; i++) {
    const x = random() * width, y = random() * height;
    const radius = .3 + random() * .9;
    context.fillStyle = `rgba(225,232,255,${.18 + random() * .6})`;
    context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill();
    if (i % 38 === 0) {
      cloud(x, y, 12, 'rgba(187,209,255,.15)');
      context.strokeStyle = 'rgba(209,224,255,.35)'; context.lineWidth = .55;
      context.beginPath(); context.moveTo(x - 6, y); context.lineTo(x + 6, y);
      context.moveTo(x, y - 8); context.lineTo(x, y + 8); context.stroke();
    }
  }
  context.globalCompositeOperation = 'source-over';
}

export function mountAtmosphere(element, seed = 1088) {
  if (!element || element.querySelector('.painted-sky')) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'painted-sky'; canvas.setAttribute('aria-hidden', 'true');
  canvas.width = 1600; canvas.height = 1000;
  paintSky(canvas.getContext('2d'), canvas.width, canvas.height, seed);
  element.prepend(canvas);
}

export function deferAtmosphere(element, seed = 1088) {
  if (!element) return;
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    mountAtmosphere(element, seed); observer.disconnect();
  }, { rootMargin: '150px' });
  observer.observe(element);
}

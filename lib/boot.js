// Single entry point for the page engine. The experience is deliberately
// imperative (canvas-scale DOM work, Web Animations, Web Audio) and lives
// outside React's render cycle: React owns the static markup, this engine
// owns everything that moves. Runs once per page load; guarded so React
// StrictMode's double-effect in development can't double-build the scene.

import { initHero } from './hero';
import { initWall } from './wall';
import { initSections } from './sections';

export function initSite(opts) {
  if (typeof window === 'undefined') return;
  if (window.__lhBooted) return;
  window.__lhBooted = true;
  initHero();
  initWall(opts || {});
  initSections();
}

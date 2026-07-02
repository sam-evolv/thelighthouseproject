# The Light House Project — website & The Wall of Light

Production build of the marketing + fundraising website for **The Light House
Project Foundation** (Ballymun, Dublin), recreated from the high-fidelity
design handoff. The centrepiece is **The Wall of Light**: supporters pay
€5–€150 to name a permanent star in a shared night sky over Ballymun. Every
star gets a name, a registry number and a place in one of six named sky
regions; buyers get a shareable deed, a gift link that plays a cinematic
arrival experience, and a downloadable keepsake certificate.

## Stack

- **Next.js (App Router) + React** — static marketing sections are server
  components; `/star/[id]` share pages are server-rendered with per-star
  Open Graph metadata and a generated deed-style OG image (`next/og`).
- **Global CSS** ported verbatim from the design handoff (single
  custom-property-themed stylesheet — colors, type, spacing and every
  animation are design-final and intentionally untouched).
- **Imperative page engine** (`lib/`) — the hero night scene, the pan/zoom
  sky, checkout, share deed, arrival experience, certificate canvas and chime
  are deliberately imperative (canvas-scale DOM work, Web Animations, Web
  Audio) and run outside React's render cycle. React owns the markup; the
  engine owns everything that moves. Booted once by `components/Boot.jsx`.
- **Fonts** via `next/font` (Source Serif 4 + Inter), self-hosted at build.

## Run it

```bash
npm install
npm run dev    # http://localhost:3000
npm run build && npm start
```

## Layout

```
app/
  layout.jsx                    fonts + site metadata
  page.jsx                      the one-page site
  globals.css                   the design system, ported verbatim
  star/[id]/page.jsx            gift-link share page (server-rendered arrival)
  star/[id]/opengraph-image.jsx deed-style link preview
components/                     one component per screen section + overlays
lib/
  registry.js                   the star registry: seed data, phyllotaxis
                                placement, sky regions (seeded PRNG so server
                                and client agree on every star)
  hero.js                       hero night scene, time-of-day, parallax
  wall.js                       wall, sky engine, checkout, share, arrival,
                                keepsake certificate
  sections.js                   lamps, ticker, dock, reveals, deed tilt
  boot.js                       single engine entry point
public/assets/                  imagery from the handoff
```

## What's real vs. mock

- **Checkout is a visual mock** (as designed in the prototype). Wire
  `openCheckout`/`lightDraft` in `lib/wall.js` to Stripe Checkout or Payment
  Element for the €5/€15/€50/€150 tiers.
- **The registry is seeded in code** (`lib/registry.js`). Production needs a
  stars table + payment reference; new dedications should enter a moderation
  queue before public display ("gently reviewed" is promised in the UI).
  Freshly minted stars (`mine0`, …) currently live only in the buyer's
  session.
- **Counters** ("412 lights", "burning N nights") should come from the DB.
- **Emails** (receipt + gift link with the deed attached) are not built.

## Before launch (flagged in the handoff)

1. **Team photos are hotlinked from the charity's Wix CDN** with face-crop
   params (`components/Team.jsx`) and fall back to gold initials if they
   fail. Download and self-host before launch (the CDN was unreachable from
   the build environment).
2. **Founding date**: the strategic plan PDF says 2022, the website homepage
   says January 2024. The site follows the homepage — align the hero, story
   and days counter once confirmed.
3. **Impact equivalences** at checkout ("a month of choir for one young
   voice") are placeholders — replace with figures the charity can stand
   over (`IMPACT` in `lib/registry.js`).
4. **Charity registration number** for the footer.
5. Set `NEXT_PUBLIC_SITE_URL` to the production origin for correct OG URLs.

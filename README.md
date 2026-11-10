# The Light House Project — The Wall of Light

A Next.js website for the Ballymun community organisation, with an immersive
Wall of Light, personal star dedications, a gift arrival experience and
Instagram Story keepsakes.

**Current release: a working preview. Donations are closed.** No card details,
emails or payments are collected. Example stars are labelled as examples.
Payment setup and charity registration details were explicitly deferred.

## Run and verify

Requires Node.js 24 and npm.

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite starts a development server when needed. To verify a built
release, run `npm start` first, or set `TEST_SERVER_COMMAND="npm start"`.
The optional `PLAYWRIGHT_CHROMIUM_EXECUTABLE` variable selects an installed
Chromium executable. `TEST_WEBKIT_EXECUTABLE` adds the WebKit mobile project.

GitHub Actions runs lint, registry/link tests, a production dependency audit,
the production build and the browser suite on pushes and pull requests.
No deployment credentials are needed for these checks.

Verified on 10 November 2026: production build, lint, 8 registry/text tests and
33 browser checks across desktop, phone and tablet passed. Automated axe
scans across the homepage, sky, confirmation, share card and Story reported
no WCAG A/AA violations in the tested states. The dependency audit reported
zero known vulnerabilities, including development dependencies.

A Lighthouse mobile simulation against the local production build scored
100 for performance, accessibility, best practices and SEO: LCP 1.2 seconds,
total blocking time 70 ms, and layout shift 0. These are lab measurements,
not a guarantee of scores on every device, network or deployment.

## The supporter experience

1. Discover the charity and explore a layered night sky.
2. Choose a Spark, Guiding Star, Beacon or Constellation. Amounts are suggested
   future donation tiers; today's preview is free.
3. Write a dedication and see it appear in the live artwork. Constellations
   accept two to eight names.
4. Confirm the preview, then watch the star appear in the Wall of Light.
5. Share a personal gift link through WhatsApp, email, Facebook, copy link or
   the device's native share menu where available.
6. Open the gift on another device to see its arrival and find it in the sky.
7. Save a keepsake or create a 1080 × 1920 Instagram Story, with a QR code
   pointing to the same star. Instagram posting is manual: save the image,
   upload it in Instagram and optionally add the star URL with the Link sticker.

Reduced motion, a persisted pause control, touch targets, keyboard navigation,
modal focus management and no-JavaScript access to charity information are
included. The sky supports drag, pinch, wheel and button zoom, plus search.

## Preview links and privacy

`/star/p_…` links contain a bounded, validated, base64url-encoded dedication.
They reproduce the same star without a database or browser storage, so a
recipient can open a link in a fresh browser. They are **not payment records**
and never write to a public registry. Never treat a preview link as proof of a
donation or as approved public content.

Anyone with the link can read its name and message. The data is not encrypted.
The privacy page explains this and the hosting and sharing boundaries. Star
pages have `noindex, nofollow`; they are excluded from the sitemap and robots
allowlist. Names and messages are rendered as text, not HTML.

Social previews use a bundled, licensed serif font and local artwork. Emoji
are omitted from link-preview images; text outside that font's supported
range receives a generic image caption. The actual star page, metadata and
Story retain the original dedication.

Vercel-protected previews still require a Vercel login or a deliberately shared
review link. When opened through a public Vercel review link, new gift links
retain that same time-limited review grant. They do not forward other query
parameters. Production gift links need a public production domain.

## Implementation

- `app/`: pages, metadata images, privacy, safeguarding, robots and sitemap.
- `components/`: server-rendered sections, dialogs and the small client boot.
- `lib/registry.js`: deterministic example stars and preview reconstruction.
- `lib/preview-stars.js`: bounded preview-link encoding and validation.
- `lib/wall.js`: sky exploration, dedication, reveal and sharing interactions.
- `lib/starlight.js`: locally painted sky textures, deferred until visible.
- `lib/story-card.js`: dynamically loaded Story artwork, QR and image export.
- `lib/social-image.jsx`: self-contained Open Graph image generation.
- `lib/accessibility.js`: dialog focus, focus restoration and inert backgrounds.
- `app/experience.css`: the refined star and sharing experience.
- `tests/`: registry tests and browser journeys, including axe accessibility
  scans and decoding the QR code from the actual exported PNG.

Team portraits are self-hosted. Community images use compressed WebP variants,
explicit dimensions, lazy loading and asynchronous decoding. Original source
assets remain available in the repository. Story/QR code is loaded on demand.
The production build's initial JavaScript is approximately 121 KB.

Set `NEXT_PUBLIC_SITE_URL` to the final canonical origin before release.
The current fallback is `https://thelighthouseproject.vercel.app`.

## Before accepting real donations

The visual preview is complete; these are release gates for fundraising:

- Connect the charity's approved payment account. Use hosted checkout; verify
  amounts server-side and verify webhook signatures, retries and idempotency.
  Test successful, declined, cancelled and delayed payments in provider test
  mode. Never publish a star based only on a client redirect.
- Add a durable star registry and a moderation process. Allocate stable star
  identifiers and constellation member records after verified payment. Build
  receipt/recovery delivery and an edit/removal process, with appropriate
  privacy and retention information.
- Confirm the registered legal name and charity registration number, the
  founding date, programme details, quotations, team permissions, donation
  language and suggested amounts with the charity. Avoid financial impact
  equivalences or claims about all proceeds until approved.
- Publish the approved Child Safeguarding Statement. The current safeguarding
  page offers the charity's contact details; it is not a substitute for the
  statement. Verify the externally hosted strategic-plan PDF; this environment
  could not access that host. Social and WhatsApp destinations returned HTTP 200.
- Confirm the final domain and canonical URL, sender details for real receipts,
  production error reporting and backups. Check sharing from physical iPhone
  and Android devices, including Instagram's native upload and Link sticker.
- Test the final production payment and registry journey before opening
  donations. The current browser suite intentionally verifies the free preview.

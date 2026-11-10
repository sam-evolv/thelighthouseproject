import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

async function createStar(page, tier = 'star', entry = '/') {
  await page.goto(entry);
  await page.locator(`.tier[data-tier="${tier}"]`).click();
  await page.locator('#recipientInput').fill('Granny May 💛');
  await page.locator('#msgInput').fill('Grá agus solas. You make our world brighter. ✨');
  await page.locator('#whoInput').fill('Aoife & Cian');
  if (tier === 'constellation') {
    for (const [index, name] of ['Mam', 'Dad', 'Éabha'].entries()) await page.locator('#members input').nth(index).fill(name);
  }
  await page.locator('#toCheckout').click();
  await expect(page.locator('#checkoutOv')).toHaveAttribute('aria-hidden', 'false');
  await page.locator('#coPay').click();
  await expect(page.locator('#shareOv')).toHaveAttribute('aria-hidden', 'false');
}

test('homepage, internal links, navigation, images and privacy routes work', async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Some people are');
  const invalidAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(href.slice(1))));
  expect(invalidAnchors).toEqual([]);
  if (await page.locator('#menuToggle').isVisible()) {
    await page.locator('#menuToggle').click();
    await expect(page.locator('#mobileMenu')).toBeVisible();
    await page.locator('#mobileMenu a[href="#story"]').click();
    await expect(page.locator('#mobileMenu')).toBeHidden();
  }
  await page.locator('#team').scrollIntoViewIfNeeded();
  await page.locator('#gallery').scrollIntoViewIfNeeded();
  for (const image of await page.locator('img[loading="lazy"]').all()) await image.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.images].every(img => img.complete));
  expect(await page.locator('img').evaluateAll(images => images.filter(img => !img.naturalWidth).map(img => img.src))).toEqual([]);
  for (const route of ['/privacy', '/safeguarding']) { const response = await page.goto(route); expect(response.status()).toBe(200); await expect(page.locator('h1')).toBeVisible(); }
  expect(errors).toEqual([]);
});

test('dedication validation, keyboard tier selection, and truthful preview confirmation', async ({ page }) => {
  await page.goto('/');
  await page.locator('#toCheckout').click();
  await expect(page.locator('#formError')).toContainText('message');
  await expect(page.locator('#msgInput')).toBeFocused();
  await page.locator('#msgInput').fill('You are so loved.');
  await page.locator('#recipientInput').fill('Mam');
  await expect(page.locator('#dpName')).toHaveText('Mam');
  await expect(page.locator('#dpMessage')).toContainText('You are so loved.');
  await page.locator('.tier[data-tier="star"]').focus(); await page.keyboard.press('ArrowRight');
  await expect(page.locator('.tier[data-tier="beacon"]')).toHaveAttribute('aria-checked', 'true');
  await page.locator('#toCheckout').click();
  await expect(page.locator('#coSummary')).toContainText('Free');
  await expect(page.locator('#checkoutOv')).toContainText('No payment taken');
  await expect(page.locator('#checkoutOv input')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(page.locator('#toCheckout')).toBeFocused();
});

test('constellation requires names and all four tier previews can be created', async ({ page }) => {
  await page.goto('/');
  await page.locator('.tier[data-tier="constellation"]').click();
  await page.locator('#msgInput').fill('Together, always.');
  await page.locator('#toCheckout').click();
  await expect(page.locator('#formError')).toContainText('at least two names');
  for (let i = 0; i < 6; i++) await page.locator('#addMember').click();
  await expect(page.locator('#members input')).toHaveCount(8);
  await page.locator('.rm-member').last().click();
  await expect(page.locator('#members input')).toHaveCount(7);
  for (const tier of ['spark', 'star', 'beacon', 'constellation']) {
    await createStar(page, tier);
    await expect(page.locator('#shareTo')).toContainText('Granny May');
    await expect(page.locator('#shareBy')).toContainText('Aoife & Cian');
  }
});

test('shared dedication opens in a clean context with its arrival, metadata and OG image', async ({ page, browser, baseURL }) => {
  await createStar(page, 'constellation');
  const wa = new URL(await page.locator('#saWa').getAttribute('href'));
  const link = wa.searchParams.get('text').match(/https?:\/\/\S+$/)[0];
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const recipient = await context.newPage();
  const response = await recipient.goto(link); expect(response.status()).toBe(200);
  await expect(recipient.locator('#arriveOv')).toHaveAttribute('aria-hidden', 'false');
  await expect(recipient.locator('#avName')).toContainText('Granny May');
  await expect(recipient.locator('#avMessage')).toContainText('Grá agus solas');
  await expect(recipient.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  const ogPath = new URL(link).pathname + '/opengraph-image';
  const og = await recipient.request.get(ogPath); expect(og.status()).toBe(200); expect(og.headers()['content-type']).toContain('image/png');
  await recipient.locator('#avGo').click();
  await expect(recipient.locator('#skyCardMsg')).toContainText('Grá agus solas');
  await recipient.reload(); await expect(recipient.locator('#avName')).toContainText('Granny May');
  const invalid = await recipient.goto(baseURL + '/star/this-does-not-exist'); expect(invalid.status()).toBe(404);
  await expect(recipient.locator('h1')).toContainText('couldn’t be found');
  await context.close();
});

test('Story and keepsake downloads are real PNGs, with no console errors', async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await createStar(page);
  const keepsakeWait = page.waitForEvent('download'); await page.locator('#saDownload').click();
  const keepsake = await keepsakeWait; expect(keepsake.suggestedFilename()).toMatch(/\.png$/);
  await page.locator('#saStory').click();
  await expect(page.locator('#storySave')).toBeEnabled();
  await expect(page.locator('#storyStatus')).toContainText('1080 × 1920');
  const downloadWait = page.waitForEvent('download'); await page.locator('#storySave').click();
  const download = await downloadWait, data = await readFile(await download.path());
  expect(data.subarray(1, 4).toString()).toBe('PNG');
  expect(data.readUInt32BE(16)).toBe(1080); expect(data.readUInt32BE(20)).toBe(1920);
  const png = PNG.sync.read(data);
  const qr = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  const wa = new URL(await page.locator('#saWa').getAttribute('href'));
  expect(qr?.data).toBe(wa.searchParams.get('text').match(/https?:\/\/\S+$/)[0]);
  await page.keyboard.press('Escape'); await expect(page.locator('#saStory')).toBeFocused();
  await page.keyboard.press('Escape'); await expect(page.locator('#skyOv')).toHaveAttribute('aria-hidden', 'false');
  expect(errors).toEqual([]);
});

test('sky search, zoom, reading a dedication and modal focus all work', async ({ page }) => {
  await page.goto('/'); await page.locator('#heroExplore').click();
  await page.locator('#skySearch').fill('not-a-real-person-123');
  await expect(page.locator('#skySearchFeedback')).toContainText('No lights found');
  await page.locator('#skySearch').fill('Nana Rose'); await page.locator('#skySearch').press('Enter');
  await expect(page.locator('#skyCard')).toHaveClass(/show/); await expect(page.locator('#skyCardWho')).toContainText('Nana Rose');
  await page.locator('#skyCardClose').click(); await page.locator('#skySearch').fill('');
  const before = await page.locator('#skyCanvas').getAttribute('style'); await page.locator('#zoomIn').click();
  expect(await page.locator('#skyCanvas').getAttribute('style')).not.toBe(before);
  await page.locator('#zoomOut').click(); await page.locator('#zoomReset').click();
  await page.locator('#skyClose').focus();
  for (let i = 0; i < 50; i++) { await page.keyboard.press('Tab'); expect(await page.evaluate(() => !!document.activeElement.closest('#skyOv'))).toBe(true); }
  await page.keyboard.press('Escape'); await expect(page.locator('#heroExplore')).toBeFocused();
});

test('long text, malicious-looking text and the narrowest supported layout stay usable', async ({ page }) => {
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 }); await page.goto('/');
    await page.locator('#recipientInput').fill('W'.repeat(40));
    await page.locator('#msgInput').fill('W'.repeat(80));
    await page.locator('#whoInput').fill('W'.repeat(30));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.locator('#recipientInput').fill('<img src=x onerror=alert(1)>');
  await page.locator('#msgInput').fill('<script>alert("x")</script>');
  await expect(page.locator('#dpName')).toHaveText('<img src=x onerror=alert(1)>');
  await expect(page.locator('#dpName img, #dpMessage script')).toHaveCount(0);
  await page.locator('#toCheckout').click(); await page.locator('#coPay').click();
  await expect(page.locator('#shareLine')).toContainText('<script>');
});

test('WCAG checks on home, sky, confirmation, share and Story find no serious violations', async ({ page }) => {
  const check = async () => {
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  };
  await page.goto('/'); await check();
  await page.locator('#heroExplore').click(); await check(); await page.keyboard.press('Escape');
  await page.locator('#msgInput').fill('A little love for you.'); await page.locator('#toCheckout').click(); await check();
  await page.locator('#coPay').click(); await expect(page.locator('#shareOv')).toHaveAttribute('aria-hidden', 'false'); await check();
  await page.locator('#saStory').click(); await expect(page.locator('#storySave')).toBeEnabled(); await check();
});

test('sky stars respond to a real pointer, and the view pans and zooms', async ({ page, browserName }) => {
  await page.goto('/'); await page.locator('#heroExplore').click();
  const stage = await page.locator('#skyStage').boundingBox();
  const start = await page.locator('#skyCanvas').getAttribute('style');
  await page.mouse.move(stage.x + 20, stage.y + 25); await page.mouse.down();
  await page.mouse.move(stage.x + 110, stage.y + 65, { steps: 12 }); await page.mouse.up();
  expect(await page.locator('#skyCanvas').getAttribute('style')).not.toBe(start);
  const beforeZoom = await page.locator('#skyCanvas').getAttribute('style');
  if (browserName === 'webkit') await page.locator('#zoomIn').click();
  else { await page.mouse.move(stage.x + stage.width / 2, stage.y + stage.height / 2); await page.mouse.wheel(0, -200); }
  await expect(page.locator('#skyCanvas')).not.toHaveAttribute('style', beforeZoom);
  const id = await page.locator('.sky-star').evaluateAll(stars => stars.find(star => {
    const r = star.getBoundingClientRect(), stage = document.getElementById('skyStage').getBoundingClientRect();
    return r.x > 50 && r.right < innerWidth - 70 && r.y > stage.y + 40 && r.bottom < stage.bottom - 100;
  })?.dataset.id);
  expect(id).toBeTruthy(); await page.locator(`.sky-star[data-id="${id}"]`).click();
  await expect(page.locator('#skyCard')).toHaveClass(/show/);
});

test('motion preference persists and dismissing an ignition cancels its delayed share', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/'); await page.locator('#motionToggle').click();
  await expect(page.locator('body')).toHaveClass(/calm/);
  await page.reload(); await expect(page.locator('#motionToggle')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#motionToggle').click(); await expect(page.locator('body')).not.toHaveClass(/calm/);
  await page.locator('#msgInput').fill('A little love for you.'); await page.locator('#toCheckout').click(); await page.locator('#coPay').click();
  await page.locator('#skyClose').click();
  // The original experience reopened the share modal after someone left.
  await page.waitForTimeout(3500);
  await expect(page.locator('#shareOv')).not.toHaveClass(/open/);
});

test('public information stays readable when JavaScript is unavailable', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage(); await page.goto(baseURL);
  await expect(page.locator('.noscript-note')).toBeVisible();
  await expect(page.locator('#programmes h2')).toBeVisible();
  await expect(page.locator('footer a[href^="mailto"]')).toBeVisible();
  await context.close();
});

test('gift links preserve an explicitly shared preview grant without forwarding other URL data', async ({ page }) => {
  const review = 'a-public-review-grant-for-testing';
  await createStar(page, 'star', '/?review_access=' + review + '&private=do-not-share');
  const wa = new URL(await page.locator('#saWa').getAttribute('href'));
  const gift = new URL(wa.searchParams.get('text').match(/https?:\/\/\S+$/)[0]);
  expect(gift.searchParams.get('_vercel_share')).toBe(review);
  expect(gift.searchParams.get('review_access')).toBe(review);
  expect(gift.searchParams.has('private')).toBe(false);
});

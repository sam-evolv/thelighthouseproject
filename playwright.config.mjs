import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://127.0.0.1:3000',
    trace: 'retain-on-failure', screenshot: 'only-on-failure',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE, args: ['--no-sandbox'] } : {},
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
    ...(process.env.TEST_WEBKIT_EXECUTABLE ? [{ name: 'webkit-mobile', use: {
      browserName: 'webkit', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
      launchOptions: { executablePath: process.env.TEST_WEBKIT_EXECUTABLE },
    } }] : []),
  ],
  webServer: {
    command: process.env.TEST_SERVER_COMMAND || 'npm run dev -- --hostname 127.0.0.1',
    url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI, timeout: 120000,
  },
});

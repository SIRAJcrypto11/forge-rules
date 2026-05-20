/**
 * PLAYWRIGHT CONFIG TEMPLATE — Forge Rules v2.2.0
 * Copy to: playwright.config.ts
 * Docs: https://playwright.dev/docs/test-configuration
 */

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // ── Test directory ────────────────────────────────────────
  testDir: './src/__tests__/e2e',
  testMatch: '**/*.spec.ts',

  // ── Parallelism ───────────────────────────────────────────
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,  // Limit workers in CI

  // ── Retries ───────────────────────────────────────────────
  retries: process.env.CI ? 2 : 0,  // Retry flaky tests in CI

  // ── Reporter ─────────────────────────────────────────────
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['html', { open: 'on-failure' }]],

  // ── Global settings ───────────────────────────────────────
  use: {
    // Base URL — set in .env or CI environment
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5173',

    // Trace on first retry (for debugging CI failures)
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Viewport
    viewport: { width: 1280, height: 720 },

    // Timeout per action
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 30000,
  },

  // ── Test timeout ─────────────────────────────────────────
  timeout: 60000,  // 60 seconds per test

  // ── Browsers to test ─────────────────────────────────────
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
    },

    // Tablet
    {
      name: 'tablet',
      use: { ...devices['iPad Pro 11'] },
    },
  ],

  // ── Dev server ────────────────────────────────────────────
  // Automatically start dev server before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})

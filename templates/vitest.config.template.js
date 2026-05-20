/**
 * VITEST CONFIG TEMPLATE — Forge Rules v2.2.0
 * Copy to: vitest.config.js (or vitest.config.ts for TypeScript)
 * Docs: https://vitest.dev/config/
 */

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  test: {
    // ── Environment ──────────────────────────────────────────
    environment: 'jsdom',  // Simulate browser environment

    // ── Setup files ──────────────────────────────────────────
    setupFiles: ['./src/__tests__/setup.js'],

    // ── Global test utilities (no need to import in every file) ──
    globals: true,

    // ── Coverage ─────────────────────────────────────────────
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',

      // Coverage thresholds — CI fails if below these
      thresholds: {
        lines:      80,
        functions:  80,
        branches:   75,
        statements: 80,
      },

      // Include/exclude patterns
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/__tests__/**',
        'src/data/**',          // Sample data — not executable logic
        'src/types/**',         // Type definitions — not executable
        'src/config/**',        // Config constants — not executable
        'src/main.{jsx,tsx}',   // Entry point
        'src/App.{jsx,tsx}',    // Router setup
      ],
    },

    // ── Test file patterns ───────────────────────────────────
    include: [
      'src/**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}',
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],
    exclude: [
      'node_modules',
      'dist',
      'src/__tests__/e2e/**',  // E2E tests run separately with Playwright
    ],

    // ── Timeout ──────────────────────────────────────────────
    testTimeout: 10000,   // 10 seconds per test
    hookTimeout: 10000,   // 10 seconds for beforeAll/afterAll

    // ── Reporter ─────────────────────────────────────────────
    reporter: process.env.CI ? 'verbose' : 'default',

    // ── Watch mode ───────────────────────────────────────────
    // Run: npm run test (watch mode)
    // Run: npm run test -- --run (single run, for CI)
  },
})

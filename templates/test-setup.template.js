/**
 * TEST SETUP TEMPLATE — Forge Rules v2.2.0
 * Copy to: src/__tests__/setup.js
 * This file runs before every test file.
 */

// ── Testing Library setup ─────────────────────────────────────
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll, vi } from 'vitest'

// ── Cleanup after each test ───────────────────────────────────
// Prevents memory leaks and test pollution
afterEach(() => {
  cleanup()
})

// ── Mock browser APIs not available in jsdom ─────────────────

// matchMedia (used by useMediaQuery hook)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// ResizeObserver (used by Recharts and other components)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// IntersectionObserver (used by useIntersection hook)
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// scrollTo (used by pagination)
window.scrollTo = vi.fn()

// URL.createObjectURL (used by file downloads/exports)
URL.createObjectURL = vi.fn(() => 'blob:mock-url')
URL.revokeObjectURL = vi.fn()

// ── Mock environment variables ────────────────────────────────
// Set test environment variables
vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:3000')
vi.stubEnv('VITE_APP_NAME', 'Test App')
vi.stubEnv('VITE_APP_VERSION', '0.0.0-test')

// ── Suppress known console warnings ──────────────────────────
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    // Suppress React act() warnings (handled by testing-library)
    if (typeof args[0] === 'string' && args[0].includes('act(')) return
    // Suppress React 18 createRoot warnings in tests
    if (typeof args[0] === 'string' && args[0].includes('ReactDOM.render')) return
    originalConsoleError(...args)
  }

  console.warn = (...args) => {
    // Suppress known non-critical warnings
    if (typeof args[0] === 'string' && args[0].includes('componentWillReceiveProps')) return
    originalConsoleWarn(...args)
  }
})

afterAll(() => {
  console.error = originalConsoleError
  console.warn = originalConsoleWarn
})

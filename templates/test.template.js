/**
 * TEST TEMPLATE — Forge Rules v2.2.0
 * Three sections: Unit tests, Hook tests, Component tests.
 * Copy the relevant section for your file type.
 *
 * Stack: Vitest + @testing-library/react + MSW
 * Run: npm run test -- --run
 */

// ═══════════════════════════════════════════════════════════════
// SECTION A — UNIT TEST TEMPLATE (for src/utils/*.js)
// ═══════════════════════════════════════════════════════════════
import { describe, it, expect } from 'vitest'
import { functionName } from '../functionFile'

describe('functionName', () => {
  // ── Happy path ──────────────────────────────────────────────
  it('[does X] with valid input', () => {
    expect(functionName(validInput)).toBe(expectedOutput)
  })

  it('[does X] with another valid case', () => {
    expect(functionName(anotherInput)).toBe(anotherExpected)
  })

  // ── Null safety (required for every function) ───────────────
  it('returns fallback for null', () => {
    expect(functionName(null)).toBe(fallbackValue)
  })

  it('returns fallback for undefined', () => {
    expect(functionName(undefined)).toBe(fallbackValue)
  })

  it('returns fallback for NaN', () => {
    expect(functionName(NaN)).toBe(fallbackValue)
  })

  // ── Edge cases ───────────────────────────────────────────────
  it('handles zero correctly', () => {
    expect(functionName(0)).toBe(expectedForZero)
  })

  it('handles empty string', () => {
    expect(functionName('')).toBe(expectedForEmpty)
  })

  it('handles empty array', () => {
    expect(functionName([])).toEqual([])
  })

  it('handles negative numbers', () => {
    expect(functionName(-100)).toBe(expectedForNegative)
  })

  // ── Boundary values ──────────────────────────────────────────
  it('handles maximum valid value', () => {
    expect(functionName(MAX_VALUE)).toBe(expectedForMax)
  })

  it('handles minimum valid value', () => {
    expect(functionName(MIN_VALUE)).toBe(expectedForMin)
  })

  // ── Invalid types ────────────────────────────────────────────
  it('handles non-number input gracefully', () => {
    expect(functionName('not a number')).toBe(fallbackValue)
  })

  it('handles object input gracefully', () => {
    expect(functionName({})).toBe(fallbackValue)
  })
})


// ═══════════════════════════════════════════════════════════════
// SECTION B — HOOK TEST TEMPLATE (for src/hooks/*.js)
// ═══════════════════════════════════════════════════════════════
import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { useHookName } from '../useHookName'

// ── MSW server setup ─────────────────────────────────────────
const MOCK_DATA = [
  { id: 'uuid-1', name: 'Item One', status: 'active' },
  { id: 'uuid-2', name: 'Item Two', status: 'inactive' },
]

const server = setupServer(
  http.get('/api/items', () => {
    return HttpResponse.json({ data: MOCK_DATA })
  })
)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('useHookName', () => {
  // ── Initial state ────────────────────────────────────────────
  it('returns correct initial state', () => {
    const { result } = renderHook(() => useHookName())
    expect(result.current.items).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBeNull()
    expect(result.current.count).toBe(0)
    expect(result.current.isEmpty).toBe(false) // still loading
  })

  // ── After data loads ─────────────────────────────────────────
  it('fetches and returns data on mount', async () => {
    const { result } = renderHook(() => useHookName())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.items).toHaveLength(2)
    expect(result.current.error).toBeNull()
    expect(result.current.isEmpty).toBe(false)
  })

  // ── Empty state ──────────────────────────────────────────────
  it('shows isEmpty when no data returned', async () => {
    server.use(
      http.get('/api/items', () => HttpResponse.json({ data: [] }))
    )
    const { result } = renderHook(() => useHookName())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.isEmpty).toBe(true)
    expect(result.current.items).toHaveLength(0)
  })

  // ── Error state ──────────────────────────────────────────────
  it('handles API error gracefully', async () => {
    server.use(
      http.get('/api/items', () =>
        HttpResponse.json({ message: 'Server error' }, { status: 500 })
      )
    )
    const { result } = renderHook(() => useHookName())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.error).not.toBeNull()
    expect(result.current.items).toHaveLength(0)
  })

  // ── Handler behavior ─────────────────────────────────────────
  it('filters items when handleSearch is called', async () => {
    const { result } = renderHook(() => useHookName())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    act(() => {
      result.current.handleSearch('Item One')
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].name).toBe('Item One')
  })

  it('resets to page 1 when search changes', async () => {
    const { result } = renderHook(() => useHookName())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    // Go to page 2 first
    act(() => result.current.handlePageChange(2))
    expect(result.current.pagination.currentPage).toBe(2)

    // Search should reset to page 1
    act(() => result.current.handleSearch('query'))
    expect(result.current.pagination.currentPage).toBe(1)
  })

  // ── Edge cases ───────────────────────────────────────────────
  it('handles empty items array gracefully', () => {
    const { result } = renderHook(() => useHookName([]))
    expect(result.current.items).toHaveLength(0)
    expect(result.current.count).toBe(0)
  })
})


// ═══════════════════════════════════════════════════════════════
// SECTION C — COMPONENT TEST TEMPLATE (for src/components/**/*.jsx)
// ═══════════════════════════════════════════════════════════════
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentName } from '../ComponentName'

// ── Test fixtures ────────────────────────────────────────────
const MOCK_ITEMS = [
  { id: 'uuid-1', name: 'Item One', status: 'active', price: 150000 },
  { id: 'uuid-2', name: 'Item Two', status: 'inactive', price: 200000 },
]

describe('ComponentName', () => {
  // ── REQUIRED: All 4 rendering states ────────────────────────

  it('shows skeleton when isLoading is true', () => {
    render(<ComponentName isLoading items={[]} />)
    // Skeleton should be present and announce loading
    expect(screen.getByRole('status')).toBeInTheDocument()
    // No actual data should be visible
    expect(screen.queryByText('Item One')).not.toBeInTheDocument()
  })

  it('shows empty state when items array is empty', () => {
    render(<ComponentName isLoading={false} items={[]} />)
    expect(screen.getByText(/no items yet/i)).toBeInTheDocument()
    // Empty state should have a CTA if actionable
    // expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument()
  })

  it('shows error state when error prop is set', () => {
    render(<ComponentName isLoading={false} items={[]} error="Failed to load" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('renders items when data is provided', () => {
    render(<ComponentName isLoading={false} items={MOCK_ITEMS} />)
    expect(screen.getByText('Item One')).toBeInTheDocument()
    expect(screen.getByText('Item Two')).toBeInTheDocument()
  })

  // ── User interactions ────────────────────────────────────────

  it('calls onSelect when item is clicked', async () => {
    const handleSelect = vi.fn()
    render(
      <ComponentName
        isLoading={false}
        items={MOCK_ITEMS}
        onSelect={handleSelect}
      />
    )

    await userEvent.click(screen.getByText('Item One'))

    expect(handleSelect).toHaveBeenCalledTimes(1)
    expect(handleSelect).toHaveBeenCalledWith(MOCK_ITEMS[0].id)
  })

  it('calls onRetry when retry button is clicked', async () => {
    const handleRetry = vi.fn()
    render(
      <ComponentName
        isLoading={false}
        items={[]}
        error="Error"
        onRetry={handleRetry}
      />
    )

    await userEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(handleRetry).toHaveBeenCalledTimes(1)
  })

  // ── Accessibility ────────────────────────────────────────────

  it('is keyboard navigable', async () => {
    render(<ComponentName isLoading={false} items={MOCK_ITEMS} />)
    await userEvent.tab()
    expect(document.activeElement).not.toBe(document.body)
  })

  // ── Edge cases ───────────────────────────────────────────────

  it('handles single item correctly', () => {
    render(<ComponentName isLoading={false} items={[MOCK_ITEMS[0]]} />)
    expect(screen.getByText('Item One')).toBeInTheDocument()
    expect(screen.queryByText('Item Two')).not.toBeInTheDocument()
  })

  it('handles items with missing optional fields without crashing', () => {
    const minimalItem = { id: 'uuid-3', name: 'Minimal Item' }
    render(<ComponentName isLoading={false} items={[minimalItem]} />)
    expect(screen.getByText('Minimal Item')).toBeInTheDocument()
  })

  it('does not call onSelect when disabled', async () => {
    const handleSelect = vi.fn()
    render(
      <ComponentName
        isLoading={false}
        items={MOCK_ITEMS}
        onSelect={handleSelect}
        disabled
      />
    )
    await userEvent.click(screen.getByText('Item One'))
    expect(handleSelect).not.toHaveBeenCalled()
  })
})

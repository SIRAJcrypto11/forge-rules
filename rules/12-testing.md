# Chapter 12 — Testing Strategy & Standards

> Tests are not optional. They are the proof that your code does what you claim.  
> Untested code is a liability, not an asset.

---

## Testing Philosophy

**Test behavior, not implementation.**  
Tests should verify what the code does, not how it does it.  
If you can refactor internals without changing tests, your tests are correct.

**The Testing Trophy (not pyramid):**
```
        ╱‾‾‾‾‾‾‾‾‾‾‾‾╲
       ╱   E2E (10%)   ╲        ← Critical user journeys only
      ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
     ╱  Integration (30%) ╲     ← Hooks + services + data flow
    ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
   ╱    Component (40%)    ╲    ← UI behavior and rendering
  ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
 ╱       Unit (20%)         ╲   ← Pure utils and calculators
╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
```

---

## Test Stack

| Type | Tool | Config |
|------|------|--------|
| Unit + Integration | Vitest | `vitest.config.js` |
| Component | @testing-library/react | with Vitest |
| Hooks | @testing-library/react (renderHook) | with Vitest |
| E2E | Playwright | `playwright.config.js` |
| Coverage | @vitest/coverage-v8 | threshold: 80% |
| Mocking | MSW (Mock Service Worker) | `src/__mocks__/` |

---

## File Naming & Location

```
src/
├── utils/
│   ├── formatters.js
│   └── __tests__/
│       └── formatters.test.js      ← Unit tests co-located
├── hooks/
│   ├── useFilter.js
│   └── __tests__/
│       └── useFilter.test.js
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   └── __tests__/
│   │       └── Button.test.jsx
│   └── shared/
│       ├── DataTable.jsx
│       └── __tests__/
│           └── DataTable.test.jsx
├── features/
│   └── inventory/
│       ├── components/
│       │   └── __tests__/
│       │       └── ProductList.test.jsx
│       └── hooks/
│           └── __tests__/
│               └── useInventory.test.js
└── __tests__/
    ├── setup.js                    ← Global test setup
    └── e2e/
        ├── auth.spec.ts
        └── inventory.spec.ts
```

**Naming rules:**
- Unit/component tests: `[filename].test.js` or `[filename].test.jsx`
- E2E tests: `[feature].spec.ts`
- Test helpers/fixtures: `[name].fixture.js`
- MSW handlers: `[domain].handlers.js`

---

## 12.1 — Unit Tests (Layer 4: Utils)

**What to test:** Every exported function in `utils/`.  
**Coverage target:** 100% of utils functions.  
**Rule:** Pure functions are the easiest to test. No excuses for missing coverage.

```js
// src/utils/__tests__/formatters.test.js
import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate, formatPercent } from '../formatters'

describe('formatCurrency', () => {
  it('formats positive IDR amount correctly', () => {
    expect(formatCurrency(1250000)).toBe('Rp 1.250.000')
  })

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('Rp 0')
  })

  it('returns em dash for null', () => {
    expect(formatCurrency(null)).toBe('—')
  })

  it('returns em dash for undefined', () => {
    expect(formatCurrency(undefined)).toBe('—')
  })

  it('returns em dash for NaN', () => {
    expect(formatCurrency(NaN)).toBe('—')
  })

  it('formats compact notation correctly', () => {
    expect(formatCurrency(1250000, { compact: true })).toBe('Rp 1,25jt')
  })

  it('hides symbol when showSymbol is false', () => {
    expect(formatCurrency(1250000, { showSymbol: false })).toBe('1.250.000')
  })
})

describe('formatPercent', () => {
  it('formats decimal as percentage', () => {
    expect(formatPercent(0.1234)).toBe('12.34%')
  })

  it('handles negative values', () => {
    expect(formatPercent(-0.05)).toBe('-5.00%')
  })

  it('returns em dash for null', () => {
    expect(formatPercent(null)).toBe('—')
  })
})
```

---

## 12.2 — Hook Tests (Layer 5: Hooks)

**What to test:** State changes, derived values, handler behavior.  
**Rule:** Test the hook's public API (what it returns), not its internals.

```js
// src/hooks/__tests__/useFilter.test.js
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFilter } from '../useFilter'

const MOCK_PRODUCTS = [
  { id: '1', name: 'Kemeja Biru', category: 'tops', price: 150000 },
  { id: '2', name: 'Celana Hitam', category: 'bottoms', price: 200000 },
  { id: '3', name: 'Kemeja Putih', category: 'tops', price: 175000 },
]

describe('useFilter', () => {
  it('returns all items when query is empty', () => {
    const { result } = renderHook(() => useFilter(MOCK_PRODUCTS))
    expect(result.current.filtered).toHaveLength(3)
    expect(result.current.count).toBe(3)
  })

  it('filters items by search query', () => {
    const { result } = renderHook(() => useFilter(MOCK_PRODUCTS))

    act(() => {
      result.current.handleSearch('kemeja')
    })

    expect(result.current.filtered).toHaveLength(2)
    expect(result.current.query).toBe('kemeja')
  })

  it('returns empty array when no items match', () => {
    const { result } = renderHook(() => useFilter(MOCK_PRODUCTS))

    act(() => {
      result.current.handleSearch('xyz-no-match')
    })

    expect(result.current.filtered).toHaveLength(0)
    expect(result.current.count).toBe(0)
  })

  it('handles empty items array gracefully', () => {
    const { result } = renderHook(() => useFilter([]))
    expect(result.current.filtered).toHaveLength(0)
    expect(result.current.count).toBe(0)
  })

  it('is case-insensitive', () => {
    const { result } = renderHook(() => useFilter(MOCK_PRODUCTS))

    act(() => {
      result.current.handleSearch('KEMEJA')
    })

    expect(result.current.filtered).toHaveLength(2)
  })
})
```

---

## 12.3 — Component Tests (Layer 7: Components)

**What to test:** Rendering, user interactions, state changes, accessibility.  
**Rule:** Test what the user sees and does, not implementation details.  
**Rule:** Never test internal state directly. Test rendered output.

```jsx
// src/components/ui/__tests__/Button.test.jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with label text', () => {
    render(<Button>Save Changes</Button>)
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Click Me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('shows spinner when isLoading is true', () => {
    render(<Button isLoading>Save</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('is disabled when isLoading is true', () => {
    render(<Button isLoading>Save</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('has correct aria-label for icon-only buttons', () => {
    render(<Button iconOnly aria-label="Delete item" />)
    expect(screen.getByRole('button', { name: 'Delete item' })).toBeInTheDocument()
  })

  it('applies variant class correctly', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-danger')
  })
})
```

**Testing loading, empty, and error states:**
```jsx
// src/features/inventory/components/__tests__/ProductList.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductList } from '../ProductList'

describe('ProductList', () => {
  it('shows skeleton when loading', () => {
    render(<ProductList isLoading items={[]} />)
    expect(screen.getAllByTestId('skeleton-row')).toHaveLength(5)
  })

  it('shows empty state when no items', () => {
    render(<ProductList isLoading={false} items={[]} />)
    expect(screen.getByText('No products yet')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument()
  })

  it('shows error state when error prop is set', () => {
    render(<ProductList isLoading={false} items={[]} error="Failed to load" />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })

  it('renders product rows when items provided', () => {
    const items = [
      { id: '1', name: 'Kemeja Biru', price: 150000, status: 'active' },
      { id: '2', name: 'Celana Hitam', price: 200000, status: 'active' }
    ]
    render(<ProductList isLoading={false} items={items} />)
    expect(screen.getByText('Kemeja Biru')).toBeInTheDocument()
    expect(screen.getByText('Celana Hitam')).toBeInTheDocument()
  })
})
```

---

## 12.4 — Integration Tests (Hooks + Services)

**What to test:** Data flow from service → hook → component.  
**Tool:** MSW (Mock Service Worker) to intercept API calls.

```js
// src/__mocks__/handlers/products.handlers.js
import { http, HttpResponse } from 'msw'
import { PRODUCTS } from '@/data/products.data'

export const productHandlers = [
  http.get('/api/products', () => {
    return HttpResponse.json({ data: PRODUCTS, total: PRODUCTS.length })
  }),

  http.post('/api/products', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ data: { id: 'new-id', ...body } }, { status: 201 })
  }),

  http.delete('/api/products/:id', ({ params }) => {
    return HttpResponse.json({ success: true })
  })
]
```

```js
// src/features/inventory/hooks/__tests__/useInventory.test.js
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { productHandlers } from '@/__mocks__/handlers/products.handlers'
import { useInventory } from '../useInventory'

const server = setupServer(...productHandlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('useInventory', () => {
  it('fetches and returns products', async () => {
    const { result } = renderHook(() => useInventory())

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.products.length).toBeGreaterThan(0)
    expect(result.current.error).toBeNull()
  })

  it('handles API error gracefully', async () => {
    server.use(
      http.get('/api/products', () => {
        return HttpResponse.json({ message: 'Server error' }, { status: 500 })
      })
    )

    const { result } = renderHook(() => useInventory())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).not.toBeNull()
    expect(result.current.products).toHaveLength(0)
  })
})
```

---

## 12.5 — E2E Tests (Critical User Journeys)

**What to test:** The 5-10 most critical user flows only.  
**Tool:** Playwright  
**Rule:** E2E tests are expensive. Only test what unit/component tests cannot.

**Critical journeys to always test:**
1. User can log in and see the dashboard
2. User can create a new [primary entity]
3. User can edit an existing [primary entity]
4. User can delete with confirmation dialog
5. User can search and filter the main list
6. User can export data (if applicable)

```ts
// src/__tests__/e2e/inventory.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Inventory Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('user can view product list', async ({ page }) => {
    await page.goto('/inventory')
    await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible()
    await expect(page.getByRole('table')).toBeVisible()
  })

  test('user can create a new product', async ({ page }) => {
    await page.goto('/inventory')
    await page.click('button:has-text("Add Product")')
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.fill('[name="name"]', 'Test Product E2E')
    await page.fill('[name="price"]', '150000')
    await page.fill('[name="stock"]', '50')
    await page.click('button:has-text("Save Product")')

    await expect(page.getByText('Product created successfully')).toBeVisible()
    await expect(page.getByText('Test Product E2E')).toBeVisible()
  })

  test('user can search products', async ({ page }) => {
    await page.goto('/inventory')
    await page.fill('[placeholder="Search products..."]', 'Kemeja')
    await expect(page.getByRole('row')).toHaveCount({ min: 1 })
    // All visible rows should contain "Kemeja"
    const rows = page.getByRole('row').filter({ hasText: 'Kemeja' })
    await expect(rows).toHaveCount({ min: 1 })
  })

  test('delete requires confirmation', async ({ page }) => {
    await page.goto('/inventory')
    await page.hover('tr:first-child')
    await page.click('button[aria-label="Delete product"]')

    // Confirmation dialog must appear
    await expect(page.getByRole('dialog', { name: /confirm/i })).toBeVisible()
    await expect(page.getByText('This action cannot be undone')).toBeVisible()

    // Cancel should close dialog without deleting
    await page.click('button:has-text("Cancel")')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
})
```

---

## 12.6 — Coverage Requirements

```js
// vitest.config.js
export default {
  test: {
    coverage: {
      provider: 'v8',
      thresholds: {
        lines:      80,
        functions:  80,
        branches:   75,
        statements: 80
      },
      // 100% required for pure utils
      perFile: true,
      include: ['src/utils/**'],
      exclude: ['src/data/**', 'src/types/**', 'src/config/**']
    }
  }
}
```

**Coverage targets by layer:**

| Layer | Target | Reason |
|-------|--------|--------|
| `utils/` | 100% | Pure functions, no excuses |
| `hooks/` | 90% | Core business logic |
| `components/ui/` | 85% | Primitives used everywhere |
| `components/shared/` | 80% | Business-aware components |
| `features/` | 75% | Integration-heavy |
| `services/` | 70% | Mocked in most tests |
| `config/`, `types/`, `data/` | 0% | Not executable logic |

---

## 12.7 — Test Quality Rules

```
✓ Each test has ONE assertion focus (can have multiple expects for one behavior)
✓ Test names describe behavior: "does X when Y" or "shows X when Y is Z"
✓ Use userEvent over fireEvent for user interactions
✓ Mock at the service layer, not inside components
✓ Tests are independent — no shared mutable state between tests
✓ Use data-testid sparingly — prefer accessible queries (role, label, text)
✓ Test edge cases: null, empty, error, boundary values

✗ Never test implementation details (internal state, private methods)
✗ Never use snapshot tests for logic (only for stable UI primitives)
✗ Never mock what you're testing
✗ Never write tests that always pass
✗ Never skip tests with .skip without a comment explaining why
```

**Query priority (most to least preferred):**
```
1. getByRole          ← Best: tests accessibility too
2. getByLabelText     ← Good: form elements
3. getByPlaceholderText ← OK: inputs
4. getByText          ← OK: visible text
5. getByDisplayValue  ← OK: form values
6. getByTestId        ← Last resort: use sparingly
```

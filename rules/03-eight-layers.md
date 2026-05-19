# Chapter 3 — The 8 Layers (Detailed Specification)

> Each layer has a strict purpose. Layers only import from layers below them.  
> Layer 8 can import from 1-7. Layer 1 imports from nothing.

---

```
Layer 8 → features/        (imports from 1-7)
Layer 7 → components/      (imports from 1-6)
Layer 6 → services/        (imports from 1-5)
Layer 5 → hooks/           (imports from 1-4)
Layer 4 → utils/           (imports from 1-3)
Layer 3 → data/            (imports from 1-2)
Layer 2 → types/           (imports from 1)
Layer 1 → config/          (imports from nothing)
```

---

## Layer 1 — Config (`src/config/`)

**Purpose:** Application-wide constants and configuration.

**Rules:**
- Pure declarations only. No functions. No computations.
- EVERY value used in the app traces back here.
- No imports from any other `src/` layer.
- Hardcoding ANY value outside `config/` = hard error.

**Required files:**

```
src/config/
├── constants.js    ← App name, version, limits, magic numbers, enums
├── routes.js       ← Every route path string defined once
├── permissions.js  ← Role definitions, feature flags
├── theme.js        ← Design tokens (colors, spacing, typography)
├── api.js          ← API base URLs, endpoints, timeouts
└── features.js     ← Feature flags per environment (on/off)
```

**`constants.js` example:**
```js
export const APP_NAME = 'Inventra'
export const APP_VERSION = '2.0.0'

export const PAGINATION = Object.freeze({
  DEFAULT_PAGE_SIZE: 25,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
})

export const FILE_UPLOAD = Object.freeze({
  MAX_SIZE_MB: 10,
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
})

export const DEBOUNCE_MS = Object.freeze({
  SEARCH: 300,
  AUTOSAVE: 1000,
  RESIZE: 150
})
```

**`routes.js` example:**
```js
export const ROUTES = Object.freeze({
  HOME:           '/',
  DASHBOARD:      '/dashboard',
  INVENTORY:      '/inventory',
  INVENTORY_NEW:  '/inventory/new',
  INVENTORY_EDIT: '/inventory/:id/edit',
  ORDERS:         '/orders',
  REPORTS:        '/reports',
  SETTINGS:       '/settings',
  LOGIN:          '/login',
  NOT_FOUND:      '*'
})
```

---

## Layer 2 — Types (`src/types/`)

**Purpose:** Define the shape of every data entity.

**Rules:**
- One file per domain. Not one global `types.js`.
- All status/type enums are `const` objects, not raw strings.
- No React, no functions, no computations.
- Every type has JSDoc documentation.

**Required files:** One file per domain entity group.

```
src/types/
├── common.types.js    ← Shared enums, base types
├── user.types.js
├── product.types.js
├── order.types.js
├── finance.types.js
└── content.types.js
```

**Type definition standard:**
```js
// src/types/product.types.js

/**
 * @typedef {Object} Product
 * @property {string}        id          - UUID v4
 * @property {string}        name        - Display name (max 120 chars)
 * @property {string}        sku         - Stock Keeping Unit code
 * @property {number}        price       - In smallest currency unit (e.g., cents/rupiah)
 * @property {number}        stock       - Current quantity in stock
 * @property {ProductStatus} status      - Current product status
 * @property {string}        categoryId  - Reference to Category.id
 * @property {string}        createdAt   - ISO 8601 full datetime
 * @property {string}        updatedAt   - ISO 8601 full datetime
 */

export const ProductStatus = Object.freeze({
  ACTIVE:   'active',
  INACTIVE: 'inactive',
  DRAFT:    'draft',
  ARCHIVED: 'archived'
})

export const StockStatus = Object.freeze({
  IN_STOCK:    'in_stock',
  LOW_STOCK:   'low_stock',    // < reorder point
  OUT_OF_STOCK:'out_of_stock',
  DISCONTINUED:'discontinued'
})
```

---

## Layer 3 — Data (`src/data/`)

**Purpose:** Realistic sample/mock data for development and demo.

**Rules:**
- All data must conform 100% to Layer 2 types.
- Must tell a coherent, realistic business story.
- IDs are UUID v4 strings. Never `1`, `2`, `3`.
- Include edge cases (~10% of records).
- Zero "Product 1", "User Name", "Lorem ipsum" anywhere.
- Currency: integers in smallest unit (IDR: no decimals).
- Dates: ISO 8601 strings.

**Required files:**
```
src/data/
├── index.js           ← Re-exports everything
├── users.data.js
├── products.data.js
├── orders.data.js
└── categories.data.js
```

**Data quality standard:**
```js
// src/data/products.data.js
import { ProductStatus, StockStatus } from '@/types/product.types'

export const PRODUCTS = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Kemeja Oxford Slim Fit Navy',
    sku: 'KEM-OXF-NVY-M',
    price: 285000,          // IDR, no decimals
    stock: 47,
    status: ProductStatus.ACTIVE,
    categoryId: 'cat-001',
    createdAt: '2026-01-15T08:30:00.000Z',
    updatedAt: '2026-04-20T14:22:00.000Z'
  },
  // Edge case: out of stock
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    name: 'Celana Chino Khaki 32',
    sku: 'CEL-CHN-KHK-32',
    price: 320000,
    stock: 0,               // Edge case: zero stock
    status: ProductStatus.ACTIVE,
    categoryId: 'cat-002',
    createdAt: '2026-02-01T10:00:00.000Z',
    updatedAt: '2026-05-01T09:15:00.000Z'
  }
  // ... minimum 20 records, ~2 edge cases
]
```

---

## Layer 4 — Utils (`src/utils/`)

**Purpose:** Pure functions. Zero side effects. Zero state.

**Rules:**
- Same input always produces same output.
- Handles `null`/`undefined` gracefully on every function.
- Every exported function has JSDoc.
- No React. No `fetch`. No `setState`. No DOM.

**Required files:**
```
src/utils/
├── formatters.js     ← All display formatting (currency, date, %)
├── calculators.js    ← All mathematical/business calculations
├── validators.js     ← All form validation rules
├── dateHelpers.js    ← Date manipulation and comparison
├── arrayHelpers.js   ← Sort, filter, group, paginate, deduplicate
├── stringHelpers.js  ← Truncate, slugify, capitalize, parse
└── colorHelpers.js   ← Map status/value to semantic color tokens
```

**Standard function signature:**
```js
/**
 * Formats a number as Indonesian Rupiah currency string.
 * @param {number|null|undefined} amount - Amount in smallest unit (rupiah)
 * @param {Object} [options]
 * @param {boolean} [options.compact=false] - Use compact notation (1.2jt)
 * @param {boolean} [options.showSymbol=true] - Show Rp prefix
 * @returns {string} Formatted currency string, or '—' if invalid
 * @example
 * formatCurrency(1250000)          // → 'Rp 1.250.000'
 * formatCurrency(1250000, { compact: true }) // → 'Rp 1,25jt'
 * formatCurrency(null)             // → '—'
 */
export function formatCurrency(amount, options = {}) {
  if (amount == null || isNaN(amount)) return '—'
  const { compact = false, showSymbol = true } = options
  // implementation
}
```

---

## Layer 5 — Hooks (`src/hooks/`)

**Purpose:** Stateful logic. Bridge between data and UI.

**Rules:**
- Hook names always start with `use`.
- Return plain objects, not arrays (except single values).
- All math delegated to Layer 4 utils.
- No JSX. No direct DOM manipulation.
- One hook = one clear responsibility.

**Required hooks (universal):**
```
src/hooks/
├── useFilter.js         ← Filter + search + sort any list
├── usePagination.js     ← Paginate any list
├── useDebounce.js       ← Debounce any fast-changing value
├── useLocalStorage.js   ← Persist any state key to localStorage
├── useMediaQuery.js     ← Detect responsive breakpoints
├── useToast.js          ← Toast notification state management
├── useModal.js          ← Modal open/close/payload state
├── useForm.js           ← Form state + field validation
├── useAsync.js          ← Async operation state (loading/data/error)
├── useClickOutside.js   ← Detect click outside a ref
├── useKeyboard.js       ← Keyboard shortcut registration
└── useIntersection.js   ← Intersection Observer wrapper
```

**Hook anatomy (standard):**
```js
// src/hooks/useFilter.js
import { useState, useMemo, useCallback } from 'react'
import { filterByQuery, sortArray } from '@/utils/arrayHelpers'

/**
 * Provides filter, search, and sort state for any list.
 * @param {Array} items - The full list to filter
 * @param {Object} [config]
 * @param {string[]} [config.searchFields] - Fields to search in
 * @param {string} [config.defaultSortKey] - Default sort field
 * @returns {{ filtered, query, sortKey, handleSearch, handleSort, count }}
 */
export function useFilter(items = [], config = {}) {
  const { searchFields = ['name'], defaultSortKey = 'createdAt' } = config

  // 1. State declarations
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState(defaultSortKey)
  const [sortDir, setSortDir] = useState('desc')

  // 2. Derived/computed (useMemo — never useState for derived)
  const filtered = useMemo(() => {
    const searched = filterByQuery(items, query, searchFields)
    return sortArray(searched, sortKey, sortDir)
  }, [items, query, sortKey, sortDir, searchFields])

  // 3. Handlers
  const handleSearch = useCallback((value) => setQuery(value), [])
  const handleSort = useCallback((key) => {
    setSortKey(prev => {
      if (prev === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
      return key
    })
  }, [])

  // 4. Return plain object
  return { filtered, query, sortKey, sortDir, handleSearch, handleSort, count: filtered.length }
}
```

---

## Layer 6 — Services (`src/services/`)

**Purpose:** External world integration. API. SDKs. Storage.

**Rules:**
- ONLY layer that talks to the outside world.
- Never import from `components/` or `features/`.
- All calls: `try/catch` + timeout + retry (max 3).
- Consistent response shape: `{ data, error, status }`.
- API keys from environment variables ONLY.
- UI never imports services directly → always via hooks.

**Required files:**
```
src/services/
├── api.service.js      ← Base fetch wrapper with auth, retry, timeout
├── auth.service.js     ← Authentication operations
├── storage.service.js  ← localStorage/sessionStorage abstraction
├── export.service.js   ← PDF/CSV generation
└── notify.service.js   ← Push notification management
```

**Service standard:**
```js
// src/services/api.service.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT) || 10000
const MAX_RETRIES = 3

async function request(endpoint, options = {}, retryCount = 0) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
        ...options.headers
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return { data, error: null, status: response.status }

  } catch (err) {
    clearTimeout(timeoutId)

    // Retry on network errors (not on 4xx)
    if (retryCount < MAX_RETRIES && err.name !== 'AbortError') {
      await delay(Math.pow(2, retryCount) * 1000) // exponential backoff
      return request(endpoint, options, retryCount + 1)
    }

    return { data: null, error: err.message, status: null }
  }
}

export const apiService = {
  get:    (endpoint, params) => request(endpoint, { method: 'GET', params }),
  post:   (endpoint, body)   => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put:    (endpoint, body)   => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch:  (endpoint, body)   => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint)         => request(endpoint, { method: 'DELETE' })
}
```

---

## Layer 7 — Components (`src/components/`)

See **Chapter 4** for full component architecture laws.

**Three tiers:**

### Tier A — `src/components/ui/`
Absolute primitives. No business knowledge. Must work in any project.

```
Button.jsx    Input.jsx     Textarea.jsx   Select.jsx
Checkbox.jsx  Radio.jsx     Switch.jsx     Badge.jsx
Tag.jsx       Card.jsx      Avatar.jsx     Divider.jsx
Modal.jsx     Drawer.jsx    Popover.jsx    Tooltip.jsx
Dropdown.jsx  ContextMenu.jsx Tabs.jsx     Accordion.jsx
Stepper.jsx   Table.jsx     Pagination.jsx Progress.jsx
Skeleton.jsx  Spinner.jsx   Alert.jsx      Toast.jsx
EmptyState.jsx ErrorState.jsx DatePicker.jsx TimePicker.jsx
```

### Tier B — `src/components/layout/`
Structural scaffolding. Imports from `ui/` only.

```
AppShell.jsx      Sidebar.jsx        SidebarGroup.jsx
SidebarItem.jsx   SidebarSubItem.jsx TopBar.jsx
MobileNav.jsx     PageHeader.jsx     PageContainer.jsx
SplitLayout.jsx   GridLayout.jsx     CommandPalette.jsx
NotificationPanel.jsx
```

### Tier C — `src/components/shared/`
Business-aware reusable. Imports from `ui/` and `layout/`. Never from `features/`.

```
KPICard.jsx       MetricCard.jsx    StatCard.jsx
TrendBadge.jsx    DataTable.jsx     FilterBar.jsx
SearchInput.jsx   StatusBadge.jsx   PriorityBadge.jsx
ChartWrapper.jsx  ChartLine.jsx     ChartBar.jsx
ChartDonut.jsx    ConfirmDialog.jsx DeleteDialog.jsx
FormModal.jsx     ExportButton.jsx  DateRangePicker.jsx
LoadingOverlay.jsx AICard.jsx       InsightBadge.jsx
```

---

## Layer 8 — Features (`src/features/`)

**Purpose:** Self-contained modules. Mini-apps within the app.

**Rules:**
- Features import from Layers 1-7. Never from each other.
- Only `src/features/[module]/index.js` is the public API.
- Internal components stay internal.

**Feature module anatomy:**
```
src/features/[module]/
├── index.js                  ← Public API (export contract)
├── [Module]Page.jsx          ← Orchestrator. Wires everything.
├── components/
│   ├── [Entity]List.jsx      ← Table/list of entities
│   ├── [Entity]Card.jsx      ← Card representation
│   ├── [Entity]Form.jsx      ← Create/edit form
│   ├── [Entity]Detail.jsx    ← Full detail view
│   ├── [Entity]Summary.jsx   ← Summary widget
│   └── [Entity]Filters.jsx   ← Filter controls
├── hooks/
│   ├── use[Module].js        ← Primary data and state hook
│   ├── use[Module]Form.js    ← Form state and validation
│   └── use[Module]Filter.js  ← Filter and search logic
└── utils/
    └── [module].utils.js     ← Module-specific pure functions
```

**`index.js` public API contract:**
```js
// src/features/inventory/index.js
// RULE: Only export what other parts of the app need.
// Internal components are NOT exported.

export { default } from './InventoryPage'
export { useInventorySummary } from './hooks/useInventory'
// That's it. Nothing else is public.
```

# Chapter 4 — Component Architecture Laws

> Every JSX file follows the same anatomy. No exceptions.  
> Consistency means any developer can navigate any component instantly.

---

## Component Anatomy (9-Block Structure)

Every JSX file, same order, every time:

```jsx
// ─────────────────────────────────────────────────────────────
// BLOCK 1: External imports
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useMemo, useCallback } from 'react'
import { TrendingUp, AlertCircle } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// BLOCK 2: Internal config / utils / hooks
// ─────────────────────────────────────────────────────────────
import { PAGINATION } from '@/config/constants'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { useFilter } from '@/hooks/useFilter'

// ─────────────────────────────────────────────────────────────
// BLOCK 3: Sub-components (shared)
// ─────────────────────────────────────────────────────────────
import { StatusBadge } from '@/components/shared/StatusBadge'
import { EmptyState } from '@/components/ui/EmptyState'

// ─────────────────────────────────────────────────────────────
// BLOCK 4: Local constants (this file only)
// ─────────────────────────────────────────────────────────────
const VARIANT_STYLES = {
  primary:   'bg-accent text-accent-text hover:bg-accent-hover',
  secondary: 'bg-surface border border-border text-text-1 hover:bg-sunken',
  ghost:     'text-accent hover:bg-accent-light',
  danger:    'bg-danger text-white hover:bg-danger/90'
}

const TABLE_COLUMNS = [
  { key: 'name',      label: 'Product Name', sortable: true },
  { key: 'price',     label: 'Price',        sortable: true },
  { key: 'stock',     label: 'Stock',        sortable: true },
  { key: 'status',    label: 'Status',       sortable: false },
]

// ─────────────────────────────────────────────────────────────
// BLOCK 5: Internal sub-components (tiny, local only)
// ─────────────────────────────────────────────────────────────
// Keep these under 20 lines. If larger, extract to own file.
function TableRow({ item, onSelect, isActive }) {
  return (
    <tr
      className={`border-b border-border hover:bg-sunken transition-colors duration-150 ${
        isActive ? 'bg-accent-light' : ''
      }`}
    >
      <td className="px-4 py-3 text-body text-text-1">{item.name}</td>
      <td className="px-4 py-3 text-body text-text-2">{formatCurrency(item.price)}</td>
    </tr>
  )
}

// ─────────────────────────────────────────────────────────────
// BLOCK 6: Main component
// ─────────────────────────────────────────────────────────────

/**
 * Displays a filterable, sortable list of products.
 * @param {Object}   props
 * @param {Array}    props.items      - Product array from useInventory hook
 * @param {Function} props.onSelect   - Called with product ID when row clicked
 * @param {boolean}  [props.isLoading=false]
 * @param {string}   [props.error=null]
 * @param {string}   [props.className='']
 */
export function ProductList({
  // Required props first
  items,
  onSelect,
  // Optional props with defaults
  isLoading = false,
  error = null,
  className = ''
}) {
  // ── 6a. State (only non-derived, non-server state) ──────────
  const [activeId, setActiveId] = useState(null)

  // ── 6b. Derived state (ALWAYS useMemo, NEVER useState) ──────
  const sortedItems = useMemo(() => {
    if (!items) return []
    return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [items])

  // ── 6c. Side effects ────────────────────────────────────────
  // Only for true side effects: subscriptions, DOM sync, external.
  // NOT for derived data (use useMemo).

  // ── 6d. Handlers (ALWAYS useCallback) ───────────────────────
  const handleSelect = useCallback((id) => {
    setActiveId(id)
    onSelect?.(id)
  }, [onSelect])

  // ── 6e. Early returns for special states ────────────────────
  if (isLoading) return <ProductListSkeleton />
  if (error)     return <ProductListError error={error} />
  if (!sortedItems.length) return <ProductListEmpty />

  // ── 6f. Main render ─────────────────────────────────────────
  return (
    <div className={`overflow-hidden rounded-xl border border-border ${className}`}>
      <table className="w-full" role="table">
        <caption className="sr-only">Product inventory list</caption>
        <thead className="bg-sunken">
          <tr>
            {TABLE_COLUMNS.map(col => (
              <th
                key={col.key}
                scope="col"
                className="px-4 py-3 text-left text-label text-text-2 uppercase tracking-wide"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map(item => (
            <TableRow
              key={item.id}
              item={item}
              onSelect={handleSelect}
              isActive={activeId === item.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BLOCK 7: Skeleton state
// ─────────────────────────────────────────────────────────────
function ProductListSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-border"
      aria-busy="true"
      aria-label="Loading products..."
    >
      {/* Skeleton header */}
      <div className="bg-sunken px-4 py-3 flex gap-8">
        {[120, 80, 60, 80].map((w, i) => (
          <div key={i} className={`h-4 w-${w} rounded bg-border animate-shimmer`} aria-hidden="true" />
        ))}
      </div>
      {/* Skeleton rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="px-4 py-4 border-b border-border flex gap-8">
          <div className="h-4 w-48 rounded bg-sunken animate-shimmer" aria-hidden="true" />
          <div className="h-4 w-24 rounded bg-sunken animate-shimmer" aria-hidden="true" />
          <div className="h-4 w-16 rounded bg-sunken animate-shimmer" aria-hidden="true" />
          <div className="h-5 w-20 rounded-full bg-sunken animate-shimmer" aria-hidden="true" />
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BLOCK 8: Empty state
// ─────────────────────────────────────────────────────────────
function ProductListEmpty() {
  return (
    <EmptyState
      icon={<TrendingUp size={48} aria-hidden="true" />}
      title="No products yet"
      description="Add your first product to start tracking inventory."
      action={{ label: 'Add Product', onClick: () => {} }}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// BLOCK 9: Error state
// ─────────────────────────────────────────────────────────────
function ProductListError({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle size={48} className="text-danger mb-4" aria-hidden="true" />
      <h3 className="text-h4 text-text-1 mb-2">Failed to load products</h3>
      <p className="text-body text-text-2 mb-6 max-w-sm">
        {error || 'Something went wrong. Please try again.'}
      </p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn btn-secondary">
          Try again
        </button>
      )}
    </div>
  )
}

export default ProductList
```

---

## Component Size Limits (Hard Caps)

| Component Type | Max Lines |
|----------------|-----------|
| Page components | 200 lines |
| Feature components | 150 lines |
| UI primitives | 120 lines |
| Hooks | 100 lines |
| Utils (per function) | 30 lines |

**If any file exceeds its limit: SPLIT IMMEDIATELY.**

Signs you need to split:
- The file has multiple distinct sections of logic
- You're scrolling to find things
- The component renders more than 2 distinct "areas"
- A sub-component is > 20 lines (extract to own file)

---

## Component Rules

```
✓ Every component handles loading, empty, and error states
✓ All props are explicitly named (no ...props spread abuse)
✓ Optional props always have default values
✓ Event handlers are always useCallback
✓ Derived values are always useMemo
✓ All interactive elements have aria-* attributes
✓ All images have alt text
✓ Touch targets minimum 44×44px
✓ Works at 375px width without horizontal scroll
✓ Uses CSS tokens for all colors (no hardcoded hex)
✓ Works in dark mode

✗ No inline style={{ }}
✗ No business logic (math, filtering, sorting in JSX)
✗ No API calls
✗ No magic numbers
✗ No more than 3 levels of JSX nesting without extraction
✗ No anonymous functions in JSX (use useCallback)
✗ No cross-feature imports
✗ No direct service imports (always via hooks)
```

---

## Props Discipline

```jsx
// ❌ VIOLATION — spread abuse hides what the component accepts
function Button({ ...props }) {
  return <button {...props} />
}

// ✅ CORRECT — explicit props, clear contract
function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  'aria-label': ariaLabel
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {isLoading ? <Spinner size={16} /> : children}
    </button>
  )
}
```

---

## Derived State Rule

```jsx
// ❌ VIOLATION — storing derived data in useState
function ProductList({ products }) {
  const [filtered, setFiltered] = useState(products)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const result = products.filter(p => p.status === 'active')
    setFiltered(result)
    setTotal(result.reduce((sum, p) => sum + p.price, 0))
  }, [products])
}

// ✅ CORRECT — derived data computed with useMemo
function ProductList({ products }) {
  const filtered = useMemo(
    () => products.filter(p => p.status === 'active'),
    [products]
  )

  const total = useMemo(
    () => calcTotalValue(filtered),  // delegated to utils
    [filtered]
  )
}
```

---

## JSX Nesting Rule

Maximum 3 levels of nesting. Extract when deeper.

```jsx
// ❌ VIOLATION — 5 levels deep
return (
  <div>           {/* level 1 */}
    <div>         {/* level 2 */}
      <div>       {/* level 3 */}
        <div>     {/* level 4 — EXTRACT */}
          <div>   {/* level 5 — EXTRACT */}
            content
          </div>
        </div>
      </div>
    </div>
  </div>
)

// ✅ CORRECT — extract inner content
function InnerContent() {
  return (
    <div>
      <div>
        content
      </div>
    </div>
  )
}

return (
  <div>
    <div>
      <div>
        <InnerContent />
      </div>
    </div>
  </div>
)
```

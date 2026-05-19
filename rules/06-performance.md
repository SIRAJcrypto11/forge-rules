# Chapter 6 — Performance & Zero-Loading Architecture

> The perceived performance contract:  
> < 100ms: instant — user feels direct control  
> < 300ms: fast — user barely notices delay  
> < 1000ms: acceptable — user aware but not frustrated  
> > 1000ms: FAILURE — show skeleton, not blank screen

---

## 6.1 — Skeleton Screen Laws

```
RULE: Skeleton must match the EXACT shape of loaded content.
RULE: Skeleton shows within 100ms of navigation.
RULE: Skeleton uses shimmer animation (not opacity pulse).
RULE: Each component owns its skeleton variant.
RULE: Page-level skeleton = collection of component skeletons.
RULE: NEVER a full-page spinner as the only loading state.
```

**Shimmer animation (required in every project):**

```css
/* src/styles/global.css */

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-sunken) 25%,
    var(--color-border)  50%,
    var(--color-sunken) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

/* Dark mode variant */
[data-theme="dark"] .animate-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-sunken)          25%,
    rgba(255, 255, 255, 0.05)    50%,
    var(--color-sunken)          75%
  );
  background-size: 200% 100%;
}
```

**Skeleton shape rules:**

```jsx
// ✅ CORRECT: Skeleton matches exact content shape
function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border p-6" aria-hidden="true">
      {/* Image placeholder — same size as real image */}
      <div className="h-48 w-full rounded-lg bg-sunken animate-shimmer mb-4" />
      {/* Title — same height as h4 text */}
      <div className="h-5 w-3/4 rounded bg-sunken animate-shimmer mb-2" />
      {/* Subtitle — same height as body text */}
      <div className="h-4 w-1/2 rounded bg-sunken animate-shimmer mb-4" />
      {/* Price — same height as price display */}
      <div className="h-6 w-24 rounded bg-sunken animate-shimmer" />
    </div>
  )
}

// ❌ WRONG: Generic skeleton that doesn't match content
function BadSkeleton() {
  return <div className="h-32 w-full bg-gray-200 animate-pulse" />
}
```

---

## 6.2 — Code Splitting

```
RULE: Every feature module uses React.lazy().
RULE: Suspense wraps each lazy route with matching skeleton.
RULE: Initial bundle target: < 100KB gzipped.
RULE: Each feature chunk target: < 50KB gzipped.
RULE: No eager imports of rarely used features.
```

```jsx
// src/App.jsx — correct code splitting setup

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/config/routes'

// ✅ Lazy load every feature page
const DashboardPage  = lazy(() => import('@/features/dashboard'))
const InventoryPage  = lazy(() => import('@/features/inventory'))
const OrdersPage     = lazy(() => import('@/features/orders'))
const ReportsPage    = lazy(() => import('@/features/reports'))
const SettingsPage   = lazy(() => import('@/features/settings'))

// ✅ Each route has its own skeleton fallback
export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.DASHBOARD} element={
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardPage />
        </Suspense>
      } />
      <Route path={ROUTES.INVENTORY} element={
        <Suspense fallback={<InventorySkeleton />}>
          <InventoryPage />
        </Suspense>
      } />
      {/* ... */}
    </Routes>
  )
}

// ✅ Heavy libraries loaded on demand (not on page load)
async function handleExportPDF() {
  const { jsPDF } = await import('jspdf')  // Only loaded when export clicked
  // ... generate PDF
}

// ❌ WRONG: Eager import of heavy library
import jsPDF from 'jspdf'  // Loaded on every page, even if never used
```

---

## 6.3 — Memoization Rules

```
RULE: ALL derived data = useMemo
RULE: ALL event handlers passed to children = useCallback
RULE: Components receiving objects/arrays as props = React.memo
RULE: Never useMemo for primitive values (strings, numbers, booleans)
RULE: Never useMemo for cheap computations (simple string concat, boolean)
```

**When to use useMemo:**

```js
// ✅ USE useMemo: Filtering/sorting arrays (O(n) or worse)
const filtered = useMemo(
  () => products.filter(p => p.status === 'active').sort(...),
  [products]
)

// ✅ USE useMemo: Complex business metric calculations
const metrics = useMemo(() => ({
  totalRevenue: calcTotalRevenue(orders),
  avgOrderValue: calcAvgOrderValue(orders),
  topProducts: calcTopProducts(orders, 5),
}), [orders])

// ✅ USE useMemo: Objects/arrays passed as props to memoized children
const tableConfig = useMemo(() => ({
  columns: COLUMNS,
  pageSize: 25,
  sortable: true,
}), []) // stable reference

// ❌ DON'T use useMemo: Simple string concatenation
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])
// Just do: const fullName = `${firstName} ${lastName}`

// ❌ DON'T use useMemo: Boolean derivations
const isAdmin = useMemo(() => user?.role === 'admin', [user])
// Just do: const isAdmin = user?.role === 'admin'

// ❌ DON'T use useMemo: Single array lookup
const selectedItem = useMemo(() => items.find(i => i.id === selectedId), [items, selectedId])
// This IS appropriate for large arrays, but not for small ones
```

**React.memo usage:**

```jsx
// ✅ USE React.memo: Component receives objects/arrays as props
const ProductRow = React.memo(function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{formatCurrency(product.price)}</td>
      <td>
        <button onClick={() => onEdit(product)}>Edit</button>
        <button onClick={() => onDelete(product.id)}>Delete</button>
      </td>
    </tr>
  )
})

// ✅ USE React.memo: Expensive component that renders frequently
const ChartComponent = React.memo(function ChartComponent({ data, config }) {
  // Expensive chart rendering
  return <ResponsiveContainer>...</ResponsiveContainer>
})

// ❌ DON'T use React.memo: Simple components that rarely re-render
// The memo overhead isn't worth it for trivial components
```

---

## 6.4 — Optimistic Updates

```
RULE: UI updates BEFORE server confirms.
RULE: On success: no visible change (already updated).
RULE: On error: revert + show error toast + log.
RULE: Apply to: create, update, delete, like, toggle, reorder.
```

**Complete optimistic update pattern:**

```js
// Pattern: Optimistic → API → Success (no change) / Error (revert)

const updateItemStatus = useCallback(async (id, newStatus) => {
  // 1. Find original for potential revert
  const original = items.find(item => item.id === id)
  if (!original) return

  // 2. Optimistic update — immediate UI change
  setItems(prev => prev.map(item =>
    item.id === id ? { ...item, status: newStatus } : item
  ))

  // 3. API call in background
  const { error } = await itemService.updateStatus(id, newStatus)

  if (error) {
    // 4a. Error: revert to original
    setItems(prev => prev.map(item =>
      item.id === id ? original : item
    ))
    addToast(`Failed to update status: ${error}`, 'error')
    return { success: false }
  }

  // 4b. Success: no UI change needed (already updated)
  return { success: true }
}, [items, addToast])
```

---

## 6.5 — List Virtualization

```
RULE: Lists > 100 items MUST use virtualization.
RULE: Tables > 200 rows MUST be virtualized.
RULE: Use @tanstack/react-virtual (lightweight, framework-agnostic).
RULE: Never render 1000 DOM nodes for a list.
```

```jsx
// src/components/shared/VirtualList.jsx
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

/**
 * Virtualized list for large datasets.
 * Only renders items visible in the viewport + overscan buffer.
 *
 * @param {Object} props
 * @param {Array}    props.items        - Full list of items
 * @param {number}   props.itemHeight   - Estimated height per item (px)
 * @param {number}   [props.overscan=5] - Extra items to render above/below
 * @param {Function} props.renderItem   - Render function: (item, index) => JSX
 * @param {string}   [props.className]
 */
export function VirtualList({
  items,
  itemHeight = 52,
  overscan = 5,
  renderItem,
  className = ''
}) {
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan,
  })

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${className}`}
      style={{ height: '600px' }}
    >
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualItem.size,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 6.6 — Image Performance

```
RULE: Always specify width + height to prevent layout shift (CLS).
RULE: Use loading="lazy" for below-fold images.
RULE: Use srcset for responsive images.
RULE: Use WebP format when possible (25-35% smaller than JPEG).
RULE: Blur placeholder while loading (base64 blurred thumbnail).
RULE: Preload hero/LCP images with <link rel="preload">.
```

```jsx
// ✅ Optimized image component
function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,  // true for above-fold/LCP images
  className = ''
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`${className} transition-opacity duration-300`}
      style={{ aspectRatio: `${width}/${height}` }}
    />
  )
}

// In HTML head (for LCP image):
// <link rel="preload" as="image" href="/hero.webp" />
```

---

## 6.7 — Bundle Discipline

```
RULE: Lucide Icons → named imports only
  ✓ import { TrendingUp, AlertCircle } from 'lucide-react'
  ✗ import * as Icons from 'lucide-react'  ← kills tree-shaking

RULE: Date library → date-fns (tree-shakeable)
  ✓ import { format, differenceInDays } from 'date-fns'
  ✗ import moment from 'moment'  ← 300KB+ bundle

RULE: No lodash → use native JS
  ✓ items.filter(Boolean)
  ✓ Object.entries(obj).reduce(...)
  ✗ import _ from 'lodash'  ← 70KB+ bundle

RULE: Charts → Recharts (lightweight, composable)
RULE: Animations → CSS transitions first, Framer Motion only if needed
RULE: All dependencies pinned to exact versions
```

**Bundle size monitoring:**

```js
// vite.config.js — bundle size analysis
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'ui-vendor': ['lucide-react'],
        }
      }
    }
  }
})
```

---

## 6.8 — Performance Measurement

**Core Web Vitals targets:**

| Metric | Target | Measurement |
|--------|--------|-------------|
| FCP (First Contentful Paint) | < 1.5s | Lighthouse |
| LCP (Largest Contentful Paint) | < 2.5s | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| TBT (Total Blocking Time) | < 200ms | Lighthouse |
| TTI (Time to Interactive) | < 3.5s | Lighthouse |

**Lighthouse CI configuration:**

```js
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
  },
}
```

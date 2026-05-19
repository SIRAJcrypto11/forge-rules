# Phase Validation Checklist

> Run this after completing each build phase.  
> Do NOT proceed to the next phase until all boxes are checked.  
> These gates exist because skipping them creates invisible debt.

---

## Phase 0 — Foundation Validation

**Complete before starting Phase 1.**

### Config Layer
```
□ src/config/constants.js
  □ APP_NAME defined
  □ APP_VERSION defined
  □ PAGINATION constants defined (DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)
  □ DEBOUNCE_MS constants defined (SEARCH, AUTOSAVE)
  □ FILE_UPLOAD limits defined (MAX_SIZE_MB, ALLOWED_TYPES)
  □ No functions, no computations — pure declarations only

□ src/config/routes.js
  □ Every route path defined as constant
  □ All routes use Object.freeze()
  □ No route string hardcoded anywhere else in the codebase
  → Test: grep -r "'/inventory'" src/ (should return 0 results)

□ src/config/theme.js
  □ All background tokens defined (bg, surface, sunken)
  □ All border tokens defined
  □ All text tokens defined (text-1, text-2, text-3, inverse)
  □ All accent tokens defined (accent, hover, active, light, text)
  □ All semantic tokens defined (success, warning, danger, info — each with base, light, text)
  □ All spacing values defined (4px grid)
  □ All typography scale defined
  □ All border radius values defined
  □ All shadow values defined
  □ All animation timing tokens defined

□ src/config/permissions.js
  □ All user roles defined
  □ All permission keys defined

□ src/config/api.js
  □ API base URL from env var (not hardcoded)
  □ All endpoints defined as constants
  □ Timeout value defined

□ src/config/env.js
  □ validateEnv() function implemented
  □ All required env vars listed
  □ Throws clear error message for missing vars

□ .env.example
  □ All env vars documented with comments
  □ No real values (structure only)
  □ Committed to git
```

### Types Layer
```
□ src/types/common.types.js
  □ Shared enums defined (SortDirection, etc.)

□ src/types/[domain].types.js (one per domain)
  □ All entity types documented with JSDoc
  □ All status enums as Object.freeze()
  □ No React imports, no functions, no computations
```

### Utils Layer (basic)
```
□ src/utils/formatters.js
  □ formatCurrency(null) returns '—' (not crash)
  □ formatCurrency(undefined) returns '—'
  □ formatCurrency(NaN) returns '—'
  □ formatCurrency(0) returns correct zero value
  □ formatCurrency(1250000) returns correct formatted string
  □ All functions have JSDoc with @example

□ src/utils/validators.js
  □ All validators return { valid: boolean, error: string|null }
  □ validateEmail handles null/undefined gracefully
  □ validateRequired handles empty string
```

### Styles Layer
```
□ src/styles/tokens.css
  □ All CSS custom properties defined under :root
  □ All dark mode tokens defined under [data-theme="dark"]
  □ Light and dark values are visually distinct (not just slightly different)

□ src/styles/global.css
  □ CSS reset/normalize included
  □ Font imports (self-hosted, not CDN)
  □ Base typography styles
  □ Shimmer animation keyframes defined
  □ .sr-only utility class defined
  □ prefers-reduced-motion rule present:
    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  □ Theme transition rule (200ms ease on bg/border/color)
```

### Phase 0 Gate Test
```bash
# Run these — all should pass with no errors
node -e "import('./src/config/constants.js').then(m => console.log('✓ constants'))"
node -e "import('./src/config/routes.js').then(m => console.log('✓ routes'))"
# Open browser: tokens.css should render correctly in light AND dark mode
# Toggle dark mode: all colors should change appropriately
```

---

## Phase 1 — Data Layer Validation

**Complete before starting Phase 2.**

```
□ src/utils/calculators.js
  □ All business metric calculations implemented
  □ All functions handle null/undefined inputs
  □ All functions have JSDoc with @example
  □ Unit tests pass: npm run test src/utils/__tests__/calculators.test.js

□ src/utils/dateHelpers.js
  □ Date formatting functions implemented
  □ Relative time functions ("3 days ago") implemented
  □ All handle null/undefined gracefully

□ src/utils/arrayHelpers.js
  □ filterByQuery() implemented and tested
  □ sortArray() implemented and tested
  □ paginate() implemented and tested
  □ groupBy() implemented and tested

□ src/data/[domain].data.js (one per domain)
  □ Minimum 20 records per domain
  □ ~10% edge case records (zero stock, overdue, etc.)
  □ All IDs are UUID v4 format strings (not 1, 2, 3)
  □ All dates are ISO 8601 strings
  □ All names are realistic (no "Product 1", "User Name")
  □ No "Lorem ipsum" anywhere
  □ Data conforms to Layer 2 type definitions
  □ Currency values are integers (no decimals for IDR)

□ src/data/index.js
  □ Re-exports all data files
```

### Phase 1 Gate Test
```bash
# All utils tests pass
npm run test src/utils/ -- --run

# Verify data quality
node -e "
  import('./src/data/index.js').then(({ PRODUCTS }) => {
    const hasLoremIpsum = PRODUCTS.some(p => p.name.includes('Lorem') || p.name.includes('Product 1'))
    const hasUUIDs = PRODUCTS.every(p => p.id.includes('-'))
    console.log('No lorem ipsum:', !hasLoremIpsum)
    console.log('All UUIDs:', hasUUIDs)
    console.log('Count:', PRODUCTS.length, '(min 20)')
  })
"
```

---

## Phase 2 — UI Primitives Validation

**Complete before starting Phase 3.**

```
□ src/components/ui/Button.jsx
  □ All variants render: primary, secondary, ghost, danger
  □ All sizes render: sm, md, lg
  □ Loading state: spinner appears, width locked, aria-busy="true"
  □ Disabled state: prevents click, opacity 50%, cursor not-allowed
  □ Icon-only variant: requires aria-label
  □ Focus ring visible on keyboard focus
  □ Under 120 lines

□ src/components/ui/Input.jsx
  □ Label above input (not placeholder-only)
  □ Error state: red border + error message + aria-invalid
  □ Helper text support
  □ aria-describedby set correctly
  □ Under 120 lines

□ src/components/ui/Modal.jsx
  □ Focus moves inside on open
  □ Escape key closes modal
  □ Backdrop click closes modal
  □ Focus returns to trigger on close
  □ Focus trap: Tab stays inside modal
  □ aria-modal, aria-labelledby set
  □ Under 120 lines

□ src/components/ui/Skeleton.jsx
  □ Shimmer animation plays
  □ Uses animate-shimmer class
  □ aria-hidden="true" on skeleton elements

□ src/components/ui/Toast.jsx
  □ role="alert" for errors
  □ aria-live="polite" for success/info
  □ Auto-dismiss timer works
  □ Hover pauses timer

□ src/components/ui/EmptyState.jsx
  □ Icon + title + description + optional CTA
  □ CTA is optional (not all empty states have actions)
```

### Phase 2 Gate Test
```bash
# Component tests pass
npm run test src/components/ui/ -- --run

# Visual check: open Storybook or test page
# Verify each component in: default, hover, focus, active, disabled, loading states
# Verify in light mode AND dark mode
# Verify at 375px width (no horizontal scroll)
```

---

## Phase 3 — Layout Validation

**Complete before starting Phase 4.**

```
□ src/context/ThemeContext.jsx
  □ Reads system preference on first load
  □ Persists to localStorage
  □ Applies data-theme to document.documentElement
  □ Theme toggle works

□ src/context/AuthContext.jsx
  □ User state managed
  □ Login/logout functions work
  □ hasPermission() function works
  □ isLoading state during auth check

□ src/components/layout/AppShell.jsx
  □ Skip-to-content link is FIRST element in DOM
  □ main element has id="main-content"
  □ Sidebar + TopBar + main content layout correct
  □ Responsive: sidebar collapses on mobile

□ src/components/layout/Sidebar.jsx
  □ Active nav item has visible active state
  □ aria-current="page" on active item
  □ Collapsed state shows icons only with tooltips
  □ Keyboard navigable

□ src/App.jsx
  □ All feature pages use React.lazy()
  □ All routes wrapped in Suspense with skeleton fallback
  □ Context providers in correct order
```

### Phase 3 Gate Test
```bash
# App renders without errors
npm run dev
# Open browser: no console errors
# Test: theme toggle switches light/dark
# Test: theme persists after page refresh
# Test: system dark mode preference respected on first load
# Test: Tab key → skip-to-content link appears
# Test: sidebar navigation works
# Test: active nav item highlighted correctly
```

---

## Phase 4 — Shared Components Validation

**Complete before starting Phase 5.**

```
□ src/components/shared/DataTable.jsx
  □ Loading state: skeleton rows (5 rows matching header)
  □ Empty state: EmptyState component
  □ Error state: ErrorState component
  □ Filled state: data renders correctly
  □ Row hover: actions appear
  □ Sortable columns work
  □ aria-label on table

□ src/components/shared/StatusBadge.jsx
  □ All status variants render with correct colors
  □ Pattern: dot + label + tinted-bg (never color-only)
  □ 22px height, 12px/500 font

□ src/components/shared/KPICard.jsx
  □ Loading skeleton renders
  □ Value, label, trend all display
  □ Number counting animation works

□ src/components/shared/ConfirmDialog.jsx
  □ Shows item name in confirmation text
  □ Cancel is default focus (not Confirm)
  □ Confirm button is danger variant
  □ Escape closes dialog
```

### Phase 4 Gate Test
```bash
# Shared component tests pass
npm run test src/components/shared/ -- --run

# Visual check with real data:
# DataTable: loading → empty → error → filled states
# StatusBadge: all status variants
# KPICard: with real metric values
```

---

## Phase 5+ — Feature Module Validation

**Run for EACH feature module before starting the next.**

```
□ No imports from other feature modules
  → grep -r "from '../[other-feature]" src/features/[this-feature]/

□ index.js only exports page + necessary hooks
  → Internal components NOT exported

□ All components under line limits
  → Page: ≤ 200, Feature component: ≤ 150

□ All states handled
  □ Loading state (skeleton)
  □ Empty state (with CTA)
  □ Error state (with retry)
  □ Filtered empty state (with clear search)
  □ Filled state

□ Form has inline validation (not just on submit)
□ Delete action has ConfirmDialog
□ Create/edit uses FormModal
□ Search debounced at 300ms
□ Pagination works correctly
□ All data comes from hook (no direct service imports in components)

□ Feature works in demo mode (static data, no API)
□ Feature works in dark mode
□ Feature keyboard navigable
□ Feature tests pass: npm run test src/features/[module]/ -- --run
```

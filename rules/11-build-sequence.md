# Chapter 11 — Build Sequence Protocol

> This is the mandatory build order. Never skip a phase. Never reverse the order.  
> Each phase builds on the previous. Skipping creates invisible dependencies and hidden bugs.

---

```
╔═══════════════════════════════════════════════════╗
║  PHASE 0 — FOUNDATION                             ║
║  config/ + types/ + utils/formatters + styles/    ║
╚═══════════════════════════════════════════════════╝
            ↓
╔═══════════════════════════════════════════════════╗
║  PHASE 1 — DATA LAYER                             ║
║  utils/calculators + dateHelpers + data/*.data    ║
╚═══════════════════════════════════════════════════╝
            ↓
╔═══════════════════════════════════════════════════╗
║  PHASE 2 — UI PRIMITIVES                          ║
║  components/ui/* (all primitive components)       ║
╚═══════════════════════════════════════════════════╝
            ↓
╔═══════════════════════════════════════════════════╗
║  PHASE 3 — LAYOUT LAYER                           ║
║  context/ + components/layout/*                   ║
╚═══════════════════════════════════════════════════╝
            ↓
╔═══════════════════════════════════════════════════╗
║  PHASE 4 — SHARED COMPONENTS                      ║
║  components/shared/* (KPICard, DataTable, etc.)   ║
╚═══════════════════════════════════════════════════╝
            ↓
╔═══════════════════════════════════════════════════╗
║  PHASE 5+ — FEATURES (one module at a time)       ║
║  hooks → components → Page → route                ║
╚═══════════════════════════════════════════════════╝
```

---

## Phase 0 — Foundation

**What:** All configuration, type definitions, basic utilities, and CSS tokens.  
**Why first:** Everything else depends on these. A missing token or undefined constant breaks everything above it.

**Files to build:**
```
src/config/constants.js
src/config/routes.js
src/config/theme.js
src/config/permissions.js
src/config/api.js
src/config/features.js
src/config/env.js          ← validateEnv() function

src/types/common.types.js
src/types/[domain].types.js  (one per domain)

src/utils/formatters.js
src/utils/validators.js

src/styles/tokens.css      ← All CSS custom properties (light + dark)
src/styles/global.css      ← Reset, base styles, shimmer, sr-only
```

**Phase 0 validation checklist:**
```
□ Every color used in the app has a CSS token in tokens.css
□ Every route string is defined in routes.js
□ Every magic number is defined in constants.js
□ formatCurrency(null) returns '—' (not crash)
□ formatCurrency(undefined) returns '—'
□ formatCurrency(NaN) returns '—'
□ formatCurrency(0) returns 'Rp 0' (or equivalent)
□ All validators return { valid: boolean, error: string|null }
□ Dark mode tokens defined under [data-theme="dark"]
□ prefers-reduced-motion rule in global.css
□ .sr-only class defined in global.css
□ validateEnv() throws clear error for missing vars
```

---

## Phase 1 — Data Layer

**What:** Business calculations, date helpers, array utilities, and realistic sample data.  
**Why second:** Data must exist before UI can render it. Calculations must work before hooks use them.

**Files to build:**
```
src/utils/calculators.js
src/utils/dateHelpers.js
src/utils/arrayHelpers.js
src/utils/stringHelpers.js
src/utils/colorHelpers.js

src/data/[domain].data.js  (one per domain, minimum 20 records each)
src/data/index.js
```

**Phase 1 validation checklist:**
```
□ All business metrics compute correctly with sample data
□ calcRevenue(orders) returns correct total
□ filterByQuery(items, 'test', ['name']) returns matching items
□ sortArray(items, 'createdAt', 'desc') returns newest first
□ paginate(items, 1, 25) returns first 25 items
□ No "Product 1", "User Name", "Lorem ipsum" in any data file
□ All IDs are UUID v4 format strings
□ All dates are ISO 8601 strings
□ ~10% of records are edge cases (zero stock, overdue, etc.)
□ All data conforms to Layer 2 type definitions
□ Unit tests pass for all utils functions
```

---

## Phase 2 — UI Primitives

**What:** All atomic UI components. No business knowledge.  
**Why third:** Layout and shared components depend on these. Build them once, use everywhere.

**Files to build (minimum required set):**
```
src/components/ui/Button.jsx
src/components/ui/Input.jsx
src/components/ui/Textarea.jsx
src/components/ui/Select.jsx
src/components/ui/Checkbox.jsx
src/components/ui/Switch.jsx
src/components/ui/Badge.jsx
src/components/ui/Card.jsx
src/components/ui/Avatar.jsx
src/components/ui/Modal.jsx
src/components/ui/Drawer.jsx
src/components/ui/Tooltip.jsx
src/components/ui/Dropdown.jsx
src/components/ui/Tabs.jsx
src/components/ui/Accordion.jsx
src/components/ui/Table.jsx
src/components/ui/Pagination.jsx
src/components/ui/Progress.jsx
src/components/ui/Skeleton.jsx
src/components/ui/Spinner.jsx
src/components/ui/Alert.jsx
src/components/ui/Toast.jsx
src/components/ui/EmptyState.jsx
src/components/ui/ErrorState.jsx
```

**Phase 2 validation checklist:**
```
□ Button: all variants render (primary, secondary, ghost, danger)
□ Button: all sizes render (sm, md, lg)
□ Button: loading state shows spinner, locks width
□ Button: disabled state prevents click
□ Button: aria-busy="true" when loading
□ Input: label above input (not placeholder-only)
□ Input: error state shows red border + error message
□ Input: aria-invalid and aria-describedby set on error
□ Modal: focus moves inside on open
□ Modal: Escape key closes modal
□ Modal: focus returns to trigger on close
□ Modal: focus trap prevents Tab from leaving
□ Skeleton: shimmer animation plays
□ Toast: role="alert" or aria-live set
□ EmptyState: icon + title + description + optional CTA
□ All components use CSS tokens (no hardcoded colors)
□ All components work in dark mode
□ All components work at 375px width
□ Component tests pass for Button, Input, Modal
```

---

## Phase 3 — Layout Layer

**What:** App shell, navigation, contexts.  
**Why fourth:** Features need the shell to exist before they can be placed inside it.

**Files to build:**
```
src/context/ThemeContext.jsx
src/context/AuthContext.jsx
src/context/NotificationContext.jsx

src/components/layout/AppShell.jsx
src/components/layout/Sidebar.jsx
src/components/layout/SidebarGroup.jsx
src/components/layout/SidebarItem.jsx
src/components/layout/TopBar.jsx
src/components/layout/MobileNav.jsx
src/components/layout/PageHeader.jsx
src/components/layout/PageContainer.jsx
src/components/layout/CommandPalette.jsx

src/App.jsx  (router + providers)
src/main.jsx (entry point)
```

**Phase 3 validation checklist:**
```
□ App renders without errors
□ Sidebar shows navigation items
□ Active nav item has visible active state (accent border + bg)
□ Theme toggle switches between light and dark mode
□ Dark mode persists after page refresh
□ System dark mode preference respected on first load
□ Skip-to-content link appears on first Tab press
□ Mobile nav renders below 768px breakpoint
□ Sidebar collapses to icon-only mode
□ Command Palette opens with Cmd+K
□ AppShell has id="main-content" on main element
□ Page title updates on navigation
```

---

## Phase 4 — Shared Components

**What:** Business-aware reusable components used across multiple features.  
**Why fifth:** Features will use these. Build them once with real data.

**Files to build:**
```
src/components/shared/KPICard.jsx
src/components/shared/MetricCard.jsx
src/components/shared/TrendBadge.jsx
src/components/shared/DataTable.jsx
src/components/shared/FilterBar.jsx
src/components/shared/SearchInput.jsx
src/components/shared/StatusBadge.jsx
src/components/shared/PriorityBadge.jsx
src/components/shared/ChartWrapper.jsx
src/components/shared/ChartLine.jsx
src/components/shared/ChartBar.jsx
src/components/shared/ChartDonut.jsx
src/components/shared/ConfirmDialog.jsx
src/components/shared/DeleteDialog.jsx
src/components/shared/FormModal.jsx
src/components/shared/ExportButton.jsx
src/components/shared/DateRangePicker.jsx
src/components/shared/LoadingOverlay.jsx
```

**Phase 4 validation checklist:**
```
□ KPICard renders with value, label, trend
□ KPICard skeleton renders correctly
□ DataTable renders with columns and rows
□ DataTable shows skeleton (5 rows) when loading
□ DataTable shows EmptyState when no data
□ DataTable shows ErrorState when error prop set
□ DataTable row actions appear on hover
□ FilterBar search debounces correctly (300ms)
□ StatusBadge renders all status variants with correct colors
□ ConfirmDialog requires explicit confirmation before action
□ DeleteDialog shows item name in confirmation text
□ All charts render with sample data
□ All shared components work in dark mode
```

---

## Phase 5+ — Features (One Module at a Time)

**What:** Self-contained feature modules.  
**Rule:** Build ONE feature completely before starting the next.

**Feature build order (within each module):**

```
Step 1: hooks/use[Module].js
  → Primary data and state hook
  → CRUD operations
  → Filter and pagination state

Step 2: [Entity]List.jsx
  → Table/list of entities
  → Uses DataTable from shared/
  → Handles loading, empty, error, filtered-empty

Step 3: [Entity]Card.jsx
  → Card representation for grid view
  → Handles loading skeleton

Step 4: [Entity]Form.jsx
  → Create + edit form
  → Inline validation
  → Loading state on submit

Step 5: [Entity]Detail.jsx
  → Full detail view
  → All entity fields displayed

Step 6: [Module]Page.jsx
  → Orchestrator — wires everything together
  → Uses PageHeader, PageContainer
  → Calls use[Module] hook
  → Passes data down as props

Step 7: Register route in App.jsx
Step 8: Add nav item to Sidebar
Step 9: Update index.js public API
```

**Feature validation checklist (per module):**
```
□ No imports from other feature modules
□ index.js only exports page + necessary hooks
□ All components under line limits
□ All states handled (loading, empty, error, filled)
□ Form has inline validation (not just on submit)
□ Delete action has ConfirmDialog
□ Create/edit uses FormModal
□ Search debounced at 300ms
□ Pagination works correctly
□ All data comes from hook (no direct service imports in components)
□ Feature works in demo mode (static data, no API)
□ Feature works in dark mode
□ Feature keyboard navigable
□ Feature tests pass
```

# New Project Checklist

> Complete this checklist before writing a single line of feature code.  
> Phase 0 is not optional. Skipping it creates debt from day one.

---

## Step 1 — Repository Setup

```
□ Create GitHub repository
□ Initialize with README.md
□ Add .gitignore (use template from Chapter 16)
□ Create main branch protection rules:
    - Require PR before merging
    - Require at least 1 approval
    - Require status checks to pass
□ Set up branch naming convention (feat/, fix/, chore/, etc.)
```

---

## Step 2 — Project Scaffold

```
□ Initialize project (Vite + React recommended)
    npx create-vite@latest my-app --template react
□ Install core dependencies (exact versions):
    npm install react-router-dom@6.26.0
    npm install lucide-react@0.400.0
    npm install date-fns@3.6.0
    npm install clsx@2.1.1
□ Install dev dependencies:
    npm install -D tailwindcss@3.4.0 postcss autoprefixer
    npm install -D vitest @testing-library/react @testing-library/user-event
    npm install -D @vitest/coverage-v8
    npm install -D eslint prettier
    npm install -D playwright
□ Configure Tailwind (tailwind.config.js)
□ Configure path alias (@/) in vite.config.js
□ Configure ESLint with no-console rule for production
□ Configure Prettier
```

---

## Step 3 — Folder Structure

```
□ Create all 8 layer directories:
    mkdir -p src/config src/types src/data src/utils
    mkdir -p src/hooks src/services
    mkdir -p src/components/ui src/components/layout src/components/shared
    mkdir -p src/features src/context src/styles
□ Create src/__tests__/setup.js
□ Create src/__tests__/e2e/ directory
□ Create public/fonts/ directory
□ Create public/images/ directory
```

---

## Step 4 — Phase 0: Foundation (Layer 1 + 2 + 4 basics)

```
□ src/config/constants.js
    □ APP_NAME defined
    □ APP_VERSION defined
    □ PAGINATION constants defined
    □ DEBOUNCE_MS constants defined
    □ FILE_UPLOAD limits defined

□ src/config/routes.js
    □ Every route path defined as constant
    □ No route string hardcoded anywhere else

□ src/config/theme.js
    □ All color tokens defined (bg, surface, text-1/2/3, accent, semantic)
    □ All spacing values defined (4px grid)
    □ All typography scale defined
    □ All border radius values defined
    □ All shadow values defined
    □ All animation timing tokens defined

□ src/config/permissions.js
    □ All user roles defined
    □ All permission keys defined

□ src/config/api.js
    □ API base URL from env var
    □ All endpoints defined as constants
    □ Timeout value defined

□ src/config/features.js
    □ Feature flags defined per environment

□ src/config/env.js
    □ validateEnv() function implemented
    □ All required env vars listed

□ .env.example
    □ All env vars documented with comments
    □ No real values

□ src/types/common.types.js
    □ Shared enums defined (SortDirection, etc.)

□ src/types/[domain].types.js (one per domain)
    □ All entity types documented with JSDoc
    □ All status enums as Object.freeze()

□ src/utils/formatters.js
    □ formatCurrency() — handles null/undefined/NaN
    □ formatDate() — handles null/undefined
    □ formatPercent() — handles null/undefined
    □ formatNumber() — handles null/undefined
    □ All functions have JSDoc

□ src/utils/validators.js
    □ validateEmail()
    □ validateRequired()
    □ validateMinLength()
    □ validateMaxLength()
    □ validateNumber()
    □ All return { valid, error } shape

□ src/styles/tokens.css
    □ All CSS custom properties defined
    □ Dark mode tokens defined under [data-theme="dark"]
    □ prefers-reduced-motion rule added

□ src/styles/global.css
    □ CSS reset/normalize
    □ Font imports (self-hosted)
    □ Base typography styles
    □ Shimmer animation keyframes
    □ .sr-only utility class
    □ Theme transition rule
```

---

## Step 5 — Phase 1: Data Layer

```
□ src/utils/calculators.js
    □ All business metric calculations
    □ All functions have JSDoc
    □ All handle null/undefined inputs

□ src/utils/dateHelpers.js
    □ Date formatting functions
    □ Date comparison functions
    □ Relative time functions ("3 days ago")

□ src/utils/arrayHelpers.js
    □ filterByQuery()
    □ sortArray()
    □ groupBy()
    □ paginate()
    □ deduplicate()

□ src/data/[domain].data.js (one per domain)
    □ Minimum 20 records per domain
    □ ~10% edge case records
    □ All IDs are UUID v4 strings
    □ All dates are ISO 8601 strings
    □ All names are realistic (no "Product 1")
    □ Data conforms to Layer 2 types

□ src/data/index.js
    □ Re-exports all data files
```

---

## Step 6 — Phase 2: UI Primitives

```
□ src/components/ui/Button.jsx
    □ Variants: primary, secondary, ghost, danger
    □ Sizes: sm, md, lg
    □ States: default, hover, active, disabled, loading
    □ Icon-only variant with aria-label
    □ aria-busy when loading
    □ Under 120 lines

□ src/components/ui/Input.jsx
    □ Label above input
    □ Error state with message
    □ Helper text support
    □ aria-invalid, aria-describedby
    □ Under 120 lines

□ src/components/ui/Modal.jsx
    □ Focus trap implemented
    □ Escape key closes
    □ Backdrop click closes
    □ Focus returns to trigger on close
    □ aria-modal, aria-labelledby
    □ Under 120 lines

□ src/components/ui/EmptyState.jsx
□ src/components/ui/Skeleton.jsx (shimmer animation)
□ src/components/ui/Toast.jsx (aria-live="assertive")
□ src/components/ui/Badge.jsx
□ src/components/ui/Spinner.jsx
```

---

## Step 7 — Phase 3: Layout

```
□ src/components/layout/AppShell.jsx
    □ Skip-to-content link (first element)
    □ Sidebar + TopBar + main content
    □ main has id="main-content"

□ src/components/layout/Sidebar.jsx
    □ Active state visible
    □ Collapsed state (icons only)
    □ aria-current="page" on active item

□ src/components/layout/TopBar.jsx
    □ Theme toggle included
    □ User menu accessible

□ src/context/ThemeContext.jsx
    □ Reads system preference
    □ Persists to localStorage
    □ Applies data-theme to document root

□ src/context/AuthContext.jsx
□ src/context/NotificationContext.jsx
```

---

## Step 8 — Pre-Feature Validation

Before building any feature, confirm:

```
□ App runs without errors: npm run dev
□ All config values are defined (no undefined tokens)
□ All CSS tokens render correctly in light mode
□ All CSS tokens render correctly in dark mode
□ Theme toggle works
□ Navigation renders with correct active states
□ Skeleton shimmer animation works
□ Toast notification appears and dismisses
□ Modal opens, traps focus, closes with Escape
□ All formatters handle null/undefined without crashing
□ npm run test passes (even if no tests yet)
□ npm run build succeeds
□ npm audit shows no CRITICAL/HIGH vulnerabilities
```

---

## Step 9 — CI/CD Setup

```
□ GitHub Actions workflow created (.github/workflows/ci.yml)
    □ Runs on: push to main, all PRs
    □ Steps: install → lint → test → build
    □ Coverage report uploaded
    □ npm audit check included

□ Deployment configured (Vercel/Netlify/etc.)
    □ Environment variables set in deployment platform
    □ Preview deployments for PRs enabled
    □ Production deployment only from main branch
```

---

**Only after ALL boxes above are checked: start building features.**

# Chapter 2 — Project Anatomy (Universal Structure)

> This structure applies to EVERY project. Always.  
> Adapt names to the domain. **Never adapt the structure.**

---

## Root Structure

```
ROOT/
├── README.md                   ← Project overview, setup, conventions
├── ARCHITECTURE.md             ← Module map, data flow diagram
├── CONVENTIONS.md              ← Naming rules, code standards
├── CHANGELOG.md                ← Version history
├── .env.example                ← All env vars documented (no values)
├── .gitignore
├── package.json
├── vite.config.js / next.config.js
├── tailwind.config.js
├── eslint.config.js
├── prettier.config.js
│
├── public/
│   ├── favicon.ico
│   ├── fonts/                  ← Self-hosted fonts ONLY (no Google Fonts CDN)
│   └── images/                 ← Static images only (not imported in JS)
│
└── src/
    ├── main.jsx                ← Entry point ONLY. Nothing else.
    ├── App.jsx                 ← Router + context providers ONLY
    │
    ├── config/                 ← Layer 1: App configuration
    ├── types/                  ← Layer 2: Data shape definitions
    ├── data/                   ← Layer 3: Mock/sample/seed data
    ├── utils/                  ← Layer 4: Pure utility functions
    ├── hooks/                  ← Layer 5: Reusable stateful logic
    ├── services/               ← Layer 6: External integrations
    ├── components/             ← Layer 7: UI building blocks
    │   ├── ui/                 ←   Tier A: Pure primitives
    │   ├── layout/             ←   Tier B: Structural wrappers
    │   └── shared/             ←   Tier C: Business-aware shared
    ├── features/               ← Layer 8: Self-contained modules
    ├── context/                ← Global React contexts
    ├── styles/                 ← Global CSS, animations, tokens
    └── __tests__/              ← Integration & E2E test setup
```

---

## Required Root Documentation Files

### `README.md`
Must contain:
- Project name and one-sentence description
- Tech stack list with versions
- Setup instructions (clone → install → run in 3 commands)
- Environment variables reference (point to `.env.example`)
- Available scripts (`dev`, `build`, `test`, `lint`)
- Folder structure overview

### `ARCHITECTURE.md`
Must contain:
- Module map (which features exist)
- Data flow diagram (how data moves from API → hooks → components)
- Key architectural decisions and why they were made
- External service integrations list

### `CONVENTIONS.md`
Must contain:
- Naming rules (reference Chapter 10)
- Import path conventions (`@/` alias setup)
- Component file structure (reference Chapter 4)
- Git commit format (reference Chapter 16)

### `.env.example`
```bash
# App
VITE_APP_NAME=MyApp
VITE_APP_VERSION=1.0.0

# API
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=10000

# Auth
VITE_AUTH_DOMAIN=
VITE_AUTH_CLIENT_ID=

# Feature Flags
VITE_FEATURE_AI_INSIGHTS=false
VITE_FEATURE_EXPORT_PDF=true
```

**Rules for `.env.example`:**
- Every env var the app uses must be listed here
- No real values — only structure and comments
- Committed to git (unlike `.env`)
- Updated whenever a new env var is added

---

## `src/main.jsx` — Entry Point Contract

```jsx
// src/main.jsx
// RULE: This file does NOTHING except mount the app.
// No providers. No logic. No imports except App and React.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## `src/App.jsx` — App Shell Contract

```jsx
// src/App.jsx
// RULE: This file does NOTHING except:
//   1. Wrap with context providers
//   2. Define routes
// No business logic. No data fetching. No UI components.

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { NotificationProvider } from '@/context/NotificationContext'
import { AppShell } from '@/components/layout/AppShell'
import { ROUTES } from '@/config/routes'
import { lazy, Suspense } from 'react'

// Lazy-loaded feature pages
const DashboardPage = lazy(() => import('@/features/dashboard'))
const InventoryPage = lazy(() => import('@/features/inventory'))
// ... etc

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <AppShell>
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                  <Route path={ROUTES.INVENTORY} element={<InventoryPage />} />
                </Routes>
              </Suspense>
            </AppShell>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
```

---

## Import Path Convention

Always use the `@/` alias for internal imports. Never use relative paths that go up more than one level.

```js
// ✅ CORRECT
import { formatCurrency } from '@/utils/formatters'
import { useFilter } from '@/hooks/useFilter'
import { Button } from '@/components/ui/Button'

// ❌ VIOLATION — relative paths going up multiple levels
import { formatCurrency } from '../../../utils/formatters'
import { Button } from '../../components/ui/Button'
```

Configure in `vite.config.js`:
```js
resolve: {
  alias: { '@': path.resolve(__dirname, './src') }
}
```

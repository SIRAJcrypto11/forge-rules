# Forge Rules v2.0
## Universal System Architecture & UI/UX Constitution
**Standard: Silicon Valley Senior Engineer Level**
**Author: Siraj Nur Ihrom | Version: 2.0.0 — May 2026**
**Applies to: ANY complex web application**

> Paste this entire file as your AI system instruction. It applies to every project, every time.

---

## PREAMBLE

These rules enforce:
- Structure so clear, a new developer understands it in 5 minutes
- Performance so fast, users never see a loading screen
- UI so polished, it feels alive with micro-interactions
- Code so modular, any feature can be changed without fear
- UX so thoughtful, users never feel lost or confused

These rules apply to EVERY project, EVERY time. No exceptions. No "just this once."

**Rule Priority (when conflicts arise):**
1. Security — Never compromise user data
2. Accessibility — Every user must be able to use the product
3. Iron Laws — The 5 supreme architectural laws
4. Performance — Users must see content instantly
5. Everything else

---

## CHAPTER 1 — THE IRON LAWS

These are supreme. They override all other decisions.

**IRON LAW #1: ONE FILE = ONE RESPONSIBILITY. ALWAYS.**
Each file does exactly one thing. If you can't describe a file's purpose in 5 words, split it.
- ✓ "Formats currency values for display" → formatters.js
- ✓ "Renders a single product card" → ProductCard.jsx
- ✗ "Does all the product stuff" → SPLIT IT

**IRON LAW #2: UI RENDERS DATA. IT NEVER CREATES IT.**
Components receive data as props or from hooks. Components never compute business logic, call APIs, or transform raw data. If a component is doing math: MOVE IT to utils/ or hooks/.

**IRON LAW #3: MODULES ARE ISLANDS. THEY DON'T TALK.**
A feature module (features/inventory/) never imports directly from another feature module (features/sales/). Share via: global context, shared hooks in src/hooks/, or event bus.

**IRON LAW #4: SHOW SOMETHING INSTANTLY. ALWAYS.**
The user must see content within 100ms of navigation. No blank white screens. No full-page spinners. Every loading state uses skeleton screens matching the exact shape of real content.

**IRON LAW #5: EVERY INTERACTION HAS A RESPONSE.**
Every button click, hover, focus, form submission must have visual feedback. Silent UI is broken UI.

---

## CHAPTER 2 — PROJECT ANATOMY

This structure applies to EVERY project. Adapt names to the domain. Never adapt the structure.

```
src/
├── main.jsx          ← Entry point ONLY. Nothing else.
├── App.jsx           ← Router + context providers ONLY
├── config/           ← Layer 1: App configuration
├── types/            ← Layer 2: Data shape definitions
├── data/             ← Layer 3: Mock/sample/seed data
├── utils/            ← Layer 4: Pure utility functions
├── hooks/            ← Layer 5: Reusable stateful logic
├── services/         ← Layer 6: External integrations
├── components/
│   ├── ui/           ← Tier A: Pure primitives
│   ├── layout/       ← Tier B: Structural wrappers
│   └── shared/       ← Tier C: Business-aware shared
├── features/         ← Layer 8: Self-contained modules
├── context/          ← Global React contexts
└── styles/           ← Global CSS, tokens
```

**Layer import rules:** Layer N can only import from layers below it. Layer 1 imports nothing.

---

## CHAPTER 3 — THE 8 LAYERS

**LAYER 1 — CONFIG (src/config/)**
Pure declarations only. No functions. No computations. No imports from other src/ layers.
Required: constants.js, routes.js, permissions.js, theme.js, api.js, features.js, env.js

**LAYER 2 — TYPES (src/types/)**
One file per domain. All status enums are Object.freeze() const objects. No React, no functions.
Every type has JSDoc. Example: user.types.js, product.types.js, order.types.js

**LAYER 3 — DATA (src/data/)**
Realistic sample data. Conforms 100% to Layer 2 types. IDs are UUID v4 strings (never 1,2,3).
Include ~10% edge cases. Zero "Product 1" or "Lorem ipsum". Dates are ISO 8601 strings.

**LAYER 4 — UTILS (src/utils/)**
Pure functions. Zero side effects. Zero state. Same input = same output. Handles null/undefined gracefully. Every exported function has JSDoc. No React, no fetch, no setState, no DOM.
Required: formatters.js, calculators.js, validators.js, dateHelpers.js, arrayHelpers.js, stringHelpers.js, colorHelpers.js

**LAYER 5 — HOOKS (src/hooks/)**
Stateful logic. Bridge between data and UI. Names start with "use". Return plain objects. All math delegated to Layer 4. No JSX. No direct DOM manipulation. One hook = one responsibility.
Required: useFilter.js, usePagination.js, useDebounce.js, useLocalStorage.js, useMediaQuery.js, useToast.js, useModal.js, useForm.js, useAsync.js, useClickOutside.js, useKeyboard.js, useIntersection.js

**LAYER 6 — SERVICES (src/services/)**
ONLY layer that talks to the outside world. Never import from components/ or features/. All calls: try/catch + timeout + retry (max 3). Response shape: { data, error, status }. API keys from env vars ONLY. UI never imports services directly — always via hooks.
Required: api.service.js, auth.service.js, storage.service.js, export.service.js

**LAYER 7 — COMPONENTS (src/components/)**
Three tiers. Tier A (ui/): absolute primitives, no business knowledge. Tier B (layout/): structural scaffolding. Tier C (shared/): business-aware, never imports from features/.

**LAYER 8 — FEATURES (src/features/)**
Self-contained modules. Import from Layers 1-7 only. Never from each other. Only index.js is public API.
Anatomy: index.js, [Module]Page.jsx, components/, hooks/, utils/

---

## CHAPTER 4 — COMPONENT ARCHITECTURE

**Component anatomy (every JSX file, same order):**
1. External imports (React, Lucide icons)
2. Internal config/utils/hooks imports
3. Shared component imports
4. Local constants (this file only)
5. Internal sub-components (tiny, local)
6. Main component (state → derived → effects → handlers → early returns → render)
7. Skeleton state component
8. Empty state component
9. Error state component
10. Default export

**Component size limits (hard caps):**
- Page components: 200 lines max
- Feature components: 150 lines max
- UI primitives: 120 lines max
- Hooks: 100 lines max
- Utils (per function): 30 lines max

**Component rules:**
- ✓ Every component handles loading, empty, and error states
- ✓ All props explicitly named (no ...props spread abuse)
- ✓ Optional props always have default values
- ✓ Event handlers are always useCallback
- ✓ Derived values are always useMemo
- ✓ All interactive elements have aria-* attributes
- ✓ All images have alt text
- ✓ Touch targets minimum 44×44px
- ✓ Works at 375px width without horizontal scroll
- ✗ No inline style={{ }}
- ✗ No business logic
- ✗ No API calls
- ✗ No magic numbers
- ✗ No more than 3 levels of JSX nesting without extraction
- ✗ No anonymous functions in JSX (use useCallback)

---

## CHAPTER 5 — ANIMATION & MICRO-INTERACTIONS

**Philosophy:** Animation communicates state changes. It is NOT decoration. Every animation must answer: "What just happened?"

**Timing tokens:**
- instant: 80ms (button press)
- fast: 150ms (hover states)
- normal: 250ms (standard transitions)
- slow: 400ms (page transitions, modals)
- slower: 600ms (charts, complex reveals)
- deliberate: 800ms (onboarding, celebrations)

**Easing:**
- standard: cubic-bezier(0.4, 0.0, 0.2, 1) — most UI
- decelerate: cubic-bezier(0.0, 0.0, 0.2, 1) — enter
- accelerate: cubic-bezier(0.4, 0.0, 1.0, 1) — exit
- spring: cubic-bezier(0.34, 1.56, 0.64, 1) — bounce

**Required interaction responses:**
- Hover: background 150ms, shadow lift 150ms
- Click: scale 98% at 80ms, release 100% at 150ms
- Focus: ring appear 100ms, accent color, 2px ring + 2px offset
- Disabled: opacity 50%, cursor not-allowed, no hover effects
- Loading: spinner rotate 1s linear infinite, width preserved

**State transitions:**
- Modal appear: fade + scale(0.95→1) 300ms spring
- Drawer: slide from edge 350ms decelerate
- Toast: slide up + fade 300ms spring, exit 200ms accelerate
- Dropdown: scale(0.95→1) + fade 150ms
- Skeleton→content: skeleton fade out 200ms, content fade in 250ms with 50ms delay
- List stagger: 30ms per item, max 200ms total

**Page transitions:**
- Shell (sidebar, topbar) NEVER animates on navigation
- Only content area transitions
- Exit: opacity 0 + y:8 at 150ms accelerate
- Enter: opacity 1 + y:0 from y:-8 at 250ms decelerate

**Animation forbidden list:**
- ✗ Animations > 800ms on interactions
- ✗ Animating non-GPU properties (top, left, margin, padding) — use transform
- ✗ Looping animations on static content
- ✗ No prefers-reduced-motion support
- ✗ Multiple competing animations simultaneously

**REQUIRED in every project's global CSS:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## CHAPTER 6 — PERFORMANCE

**Perceived performance contract:**
- < 100ms: instant
- < 300ms: fast
- < 1000ms: acceptable
- > 1000ms: FAILURE — show skeleton

**Skeleton rules:**
- Must match EXACT shape of loaded content
- Shows within 100ms of navigation
- Uses shimmer animation (not opacity pulse)
- Each component owns its skeleton variant
- Never a full-page spinner as only loading state

**Code splitting:**
- Every feature page uses React.lazy()
- Suspense wraps each lazy route with matching skeleton
- Initial bundle target: < 100KB gzipped
- Each feature chunk target: < 50KB gzipped

**Memoization:**
- ALL derived data = useMemo
- ALL event handlers passed to children = useCallback
- Components receiving objects/arrays as props = React.memo
- Never useMemo for primitive values or cheap computations

**Optimistic updates:**
- UI updates BEFORE server confirms
- On error: revert + show error toast

**Virtualization:**
- Lists > 100 items MUST use virtualization (@tanstack/virtual)
- Tables > 200 rows MUST be virtualized

**Bundle discipline:**
- Lucide Icons: named imports only (never import *)
- Date library: date-fns (never moment.js)
- No lodash — use native JS
- Charts: Recharts

---

## CHAPTER 7 — DESIGN SYSTEM

**Color system — ALL colors from tokens. ZERO hardcoded hex in components.**

Semantic tokens (define values per project brand):
- --color-bg, --color-surface, --color-sunken (backgrounds)
- --color-border, --color-border-strong
- --color-text-1, --color-text-2, --color-text-3, --color-text-inverse
- --color-accent, --color-accent-hover, --color-accent-active, --color-accent-light
- --color-success/warning/danger/info (each needs base, light, text variants)

Never use: pure #000000 or #FFFFFF, more than 1 accent color, gradients on backgrounds, low contrast (WCAG AA minimum 4.5:1)

**Typography:**
- Max 2 fonts per project (1 preferred). Recommended: Inter or Plus Jakarta Sans
- Scale: display(48/700), h1(32/700), h2(24/600), h3(20/600), h4(16/600), body-lg(16/400), body(14/400), caption(12/400), label(12/500/UPPERCASE)
- Only 3 font weights: 400, 500/600, 700
- Font sizes only from the scale (no 13px, 15px, 17px)

**Spacing:** Base 4px. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px. Use ONLY these values.

**Border radius:** sm(4px), md(6px), lg(8px), xl(12px), 2xl(16px), full(9999px). Nested elements have smaller radius than parent.

**Shadows:** Use to convey elevation. subtle, sm, md, lg, xl, modal. Never for decoration.

**Icons:** Lucide React ONLY. Sizes: 12, 16, 20, 24, 32, 48px. Icon + text gap: 8px always. Never custom SVG inline.

**Component visual standards:**
- Buttons: height sm=32px, md=40px, lg=48px
- Inputs: height 40px default, focus ring 3px accent-light
- Cards: surface bg, xl radius, md shadow, 24px padding
- Tables: 52px row height, horizontal borders only, actions hidden until row hover
- Status badges: colored-dot + label + tinted-bg, 22px height, 12px/500 font
- Modals: backdrop rgba(0,0,0,0.4), mobile = full-screen bottom sheet below 480px

---

## CHAPTER 8 — UX & INFORMATION ARCHITECTURE

**Information hierarchy:**
- Most important = largest and boldest
- Users understand page purpose in < 3 seconds
- One primary action per view
- Progressive disclosure: summary first, detail on demand
- Whitespace is information

**Navigation:**
- User always knows where they are (active state visible)
- Max 3 levels of navigation depth
- Command Palette (Cmd+K) for power users — always
- Active: left-border 3px accent + accent-light bg + bold label
- Mobile: bottom tabs, max 5 items

**Form UX:**
- One column layout
- Labels always above fields (never inside, except search)
- Validate inline, not only on submit
- Autofocus on first field when form opens
- Primary button right-aligned, Cancel left
- Destructive actions require confirmation

**Error messages:**
- ✓ Specific: "Email must include @ symbol"
- ✓ Helpful: "Password must be at least 8 characters"
- ✗ Vague: "Invalid input"
- ✗ Technical: "Validation failed"

**Empty & error states — EVERY list/table needs:**
- Loading state (skeleton)
- Empty state (no data, with CTA)
- Error state (failed to load, with retry)
- Filtered empty (no results for current filters)

**UX writing:**
- ✓ Specific: "3 invoices overdue totaling $4,200"
- ✗ Generic: "You have pending items"
- ✓ Active voice: "Save your changes"
- ✗ Passive: "Changes will be saved"
- ✓ CTAs are actions: "Create Invoice", "Add Product"
- ✗ Generic CTAs: "OK", "Submit", "Confirm", "Yes"

---

## CHAPTER 9 — STATE MANAGEMENT

**State hierarchy (use lowest level that works):**
1. LOCAL (useState) — UI state, toggles, form inputs. Default choice.
2. DERIVED (useMemo) — Computed values. NEVER store derived data in useState.
3. MODULE (custom hook) — Shared within feature. Page calls hook, children receive props.
4. CROSS-MODULE (React Context) — Auth, theme, notifications. Separate context per concern.
5. SERVER (React Query/SWR) — Remote data with caching.

**Forbidden:**
- ✗ Redux without justification
- ✗ Prop drilling more than 3 levels
- ✗ Duplicate state (same data in 2 useStates)
- ✗ Storing derived data in state

---

## CHAPTER 10 — NAMING CONVENTIONS

**Files:**
- Pages: PascalCase + Page → ProductPage.jsx
- Components: PascalCase → ProductCard.jsx
- Hooks: camelCase + use → useProducts.js
- Utils: camelCase → formatters.js
- Services: camelCase + Service → productService.js
- Types: camelCase + .types → product.types.js
- Data: camelCase + .data → products.data.js

**Variables:**
- Constants: SCREAMING_SNAKE_CASE → MAX_FILE_SIZE
- Variables: camelCase → grossMarginPct
- Functions: camelCase (verb+noun) → calcGrossMargin
- CSS vars: --kebab-case → --color-accent

**Props:**
- Booleans: is/has/can/show → isLoading, hasError, canEdit
- Handlers: on+Verb → onClick, onChange, onSubmit
- Internal handlers: handle+Noun+Verb → handleProductDelete

---

## CHAPTER 11 — BUILD SEQUENCE

**MANDATORY ORDER. Never skip. Never reverse.**

```
PHASE 0 — FOUNDATION
  config/theme.js + constants.js + routes.js
  types/*.types.js
  utils/formatters.js + validators.js
  styles/tokens.css (light + dark mode tokens)
  ↓ VALIDATE: all tokens defined, formatters handle null/undefined

PHASE 1 — DATA LAYER
  utils/calculators.js + dateHelpers.js + arrayHelpers.js
  data/*.data.js (realistic sample data)
  ↓ VALIDATE: all metrics compute correctly, no "Product 1" in data

PHASE 2 — UI PRIMITIVES
  components/ui/* (Button, Input, Modal, Skeleton, Toast, EmptyState)
  ↓ VALIDATE: each component renders in isolation, all states work

PHASE 3 — LAYOUT LAYER
  context/ThemeContext.jsx + AuthContext.jsx
  components/layout/* (AppShell, Sidebar, TopBar)
  ↓ VALIDATE: full shell renders, nav works, theme toggle works

PHASE 4 — SHARED COMPONENTS
  components/shared/* (KPICard, DataTable, StatusBadge, ChartWrapper)
  ↓ VALIDATE: shared components render with real data

PHASE 5+ — FEATURES (one module at a time)
  For each: hooks → components → Page → route
  Step 1: hooks/use[Module].js
  Step 2: [Entity]List.jsx
  Step 3: [Entity]Card.jsx
  Step 4: [Entity]Form.jsx
  Step 5: [Entity]Detail.jsx
  Step 6: [Module]Page.jsx
  Step 7: Register route + nav item
```

---

## CHAPTER 12 — TESTING

**Testing trophy (not pyramid):**
- Unit (20%): Pure utils — 100% coverage required
- Component (40%): UI behavior and rendering
- Integration (30%): Hooks + services + data flow
- E2E (10%): Critical user journeys only

**Stack:** Vitest + @testing-library/react + MSW + Playwright

**Rules:**
- Test behavior, not implementation
- Test names: "shows X when Y" or "does X when Y is Z"
- Use userEvent over fireEvent
- Mock at service layer, not inside components
- Tests are independent (no shared mutable state)
- Use getByRole first (tests accessibility too)
- Coverage targets: utils 100%, hooks 90%, ui components 85%

**Every component test must cover:**
- Loading state (skeleton appears)
- Empty state (empty component appears with CTA)
- Error state (error component appears with retry)
- Filled state (data renders correctly)

---

## CHAPTER 13 — SECURITY

**Critical rules:**
- API keys NEVER in client-side code — use environment variables
- Validate all required env vars on app startup
- Never use dangerouslySetInnerHTML without DOMPurify sanitization
- Validate all external URLs for safe protocols (http/https only)
- Never store auth tokens or sensitive data in localStorage
- Include CSRF tokens in all state-changing requests
- Run npm audit before every release — no CRITICAL/HIGH in production
- Remove all console.log before production
- Mask sensitive data in logs (emails, tokens, PII)

**Input validation:** All user inputs validated before processing. Validators return { valid, error } shape.

**Route protection:** ProtectedRoute component redirects unauthenticated users. Role-based access checked before rendering.

---

## CHAPTER 14 — ACCESSIBILITY (WCAG 2.1 AA)

**Color & contrast:**
- Normal text: minimum 4.5:1 contrast ratio
- Large text (≥18px): minimum 3:1
- Never convey information through color alone

**Keyboard navigation:**
- Every interactive element reachable by keyboard
- Tab order follows visual reading order
- Never use tabIndex > 0
- Focus ring always visible (never outline: none without replacement)
- Modal opens → focus moves inside → Escape closes → focus returns to trigger
- Focus trap in all modals and drawers

**Required ARIA patterns:**
- Buttons: aria-label (when no visible text), aria-pressed (toggles), aria-busy (loading)
- Inputs: aria-required, aria-invalid, aria-describedby (for errors)
- Navigation: aria-label, aria-current="page" on active item
- Dynamic content: aria-live="polite" for non-critical, aria-live="assertive" for errors
- Tables: caption, scope="col" on headers

**Screen reader support:**
- .sr-only class for visually hidden but accessible text
- Page title updates on navigation (document.title)
- Loading states announced via aria-live
- Toast notifications use role="alert"

**Required in every app:**
- Skip-to-content link (first element, visible on focus)
- All images have alt text (empty string for decorative)
- All form inputs have visible labels (not just placeholder)
- Touch targets minimum 44×44px
- No user-scalable=no in viewport meta

---

## CHAPTER 15 — DARK MODE

**Architecture:** Token-based. All colors use CSS custom properties. Zero hardcoded hex in components.

**Implementation:**
- :root defines light theme tokens
- [data-theme="dark"] defines dark theme tokens
- ThemeContext reads system preference, persists to localStorage
- Tailwind configured with selector strategy: [data-theme="dark"]

**Dark mode color rules:**
- Never pure black (#000000) as background — use #0F1117 or similar
- Never pure white (#FFFFFF) as text — use #E8EAF0 or similar
- Shadows more prominent in dark mode (higher opacity)
- Semantic colors: muted backgrounds, brighter text in dark mode

**Theme transition:** 200ms ease on background-color, border-color, color (global CSS rule)

---

## CHAPTER 16 — GIT WORKFLOW

**Branch naming:** feat/, fix/, chore/, refactor/, docs/, test/, hotfix/
**Format:** feat/inventory-search (kebab-case, 2-4 words)

**Commit format (Conventional Commits):**
`<type>(<scope>): <short description>`
Types: feat, fix, docs, style, refactor, test, chore, perf, ci, revert
Example: `feat(inventory): add bulk export to CSV`

**PR rules:**
- Ideal size: < 400 lines. Maximum: 800 lines.
- Requires: 1 approval, CI passing, no [BLOCKING] comments
- Title follows Conventional Commits format
- Description: what, why, how, testing, screenshots (if UI)

**Git hygiene:**
- Pull before starting work
- Stage specific files (not git add .)
- Review staged changes before committing
- Never force push to shared branches
- Never commit .env files
- Never commit console.log statements

---

## CHAPTER 17 — AI PROMPTING PROTOCOL

**One file per prompt. Always.**

**Prompt template:**
```
Build [exact/path/to/File.jsx]
Phase: [0-5]
Purpose: [one sentence]
Imports from: [list]
Exports: [names]
Props: [list with types and defaults]
States to handle: loading (skeleton N rows), empty (CTA: "[label]"), error (retry), filled
Max lines: [limit]
Mobile: yes | Dark mode: yes | Accessibility: yes
```

**After each Phase, validate:**
```
Review files built in Phase [N] against Forge Rules v2.0.
Check: Iron Law violations, layer boundary violations, business logic in components,
missing states, hardcoded values, line limit violations, missing aria attributes.
For each violation: state file + line + rule violated + corrected code.
```

---

## CHAPTER 18 — ABSOLUTE FORBIDDEN LIST

**Architecture:** Cross-feature imports, business logic in JSX, API calls in components, circular imports, magic numbers outside config/, hardcoded colors outside theme.js, hardcoded routes outside routes.js, files over line limits, useState for derived data, useEffect for derived data, prop drilling > 3 levels.

**Visual:** Pure #000000/#FFFFFF as main colors, inline SVG icons, style={{ }}, tables without states, forms without validation, buttons without all states, horizontal scroll, blank white screens, full-page spinners, "Lorem ipsum"/"Product 1" in data, > 1 accent color, gradients on backgrounds, > 3 font weights, font sizes outside scale, spacing outside 4px grid.

**Animation:** > 800ms on interactions, animating non-GPU properties (top/left/margin/padding), looping on static content, no prefers-reduced-motion support, multiple competing animations, shell animating on navigation.

**Performance:** > 100 list items without virtualization, import * from any library, moment.js, lodash, API keys in client code, console.log in production.

**Security:** Hardcoded secrets, .env committed, dangerouslySetInnerHTML without sanitization, user-controlled href without validation, sensitive data in localStorage, CRITICAL/HIGH npm audit vulnerabilities.

**Accessibility:** Non-keyboard-accessible interactive elements, missing focus rings, images without alt, inputs without labels, color as only information conveyor, touch targets < 44px, modal without focus trap, dynamic content not announced, user-scalable=no.

**UX Writing:** Vague errors, generic CTAs (OK/Submit/Yes/Confirm), unformatted numbers, empty states without CTA.

**Git:** Direct commits to main, .env committed, force push to shared branches, bad commit messages (fix stuff/update/WIP), PRs > 800 lines, merging without approval, merging with failing CI.

---

*"Structure is freedom. Chaos is the real constraint."*
*Forge Rules v2.0 — Apply to every project, every time.*

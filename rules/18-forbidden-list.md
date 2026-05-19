# Chapter 18 — Absolute Forbidden List

> These are not suggestions. These are hard stops.  
> Any of these in a PR = immediate block. Fix before merge.

---

## Architecture Violations

```
✗ One file containing the entire application
✗ Feature importing from another feature directly
  → features/sales importing from features/inventory
✗ Business logic / calculations inside JSX render
  → Math, filtering, sorting inside component return
✗ API calls inside component bodies
  → fetch() or axios inside a component
✗ Circular imports between files
  → A imports B, B imports A
✗ Magic numbers anywhere except config/
  → if (stock < 10) — where does 10 come from?
✗ Hardcoded colors except config/theme.js
  → style={{ color: '#3B82F6' }} or className="text-[#3B82F6]"
✗ Hardcoded route strings except config/routes.js
  → navigate('/inventory/new') — use ROUTES.INVENTORY_NEW
✗ Any file exceeding its line limit without splitting
  → Page > 200, Feature component > 150, UI primitive > 120
✗ useState for derived data
  → const [total, setTotal] = useState(items.reduce(...))
✗ useEffect for derived data
  → useEffect(() => setTotal(items.reduce(...)), [items])
✗ Props drilling beyond 3 levels
  → A → B → C → D passing the same prop
✗ Components importing from services directly
  → import { fetchProducts } from '@/services/api.service'
✗ Relative imports going up more than one level
  → import { x } from '../../../utils/formatters'
```

---

## Visual / UI Violations

```
✗ Pure #000000 or #FFFFFF as main UI colors
  → Use near-black (#1A1D23) and near-white (#F8F9FA)
✗ Custom SVG icons drawn inline in JSX
  → Use Lucide React named imports only
✗ style={{ }} inline styles in JSX
  → Use Tailwind classes or CSS tokens
✗ Tables without empty + loading states
  → Every table needs skeleton rows and empty state component
✗ Forms without validation feedback
  → Every form field needs error message display
✗ Buttons without hover + active + loading states
  → All three states are required
✗ Horizontal scroll on any viewport
  → Test at 375px width
✗ Full-page blank white screen at any point
  → Skeleton must appear within 100ms
✗ Full-page spinner as primary loading state
  → Use skeleton screens, not spinners
✗ "Lorem ipsum" or "Product 1" or "User Name" in data
  → Use realistic, locale-appropriate sample data
✗ Charts with hardcoded (non-computed) data
  → All chart data must come from real data layer
✗ More than 1 accent color in one project
  → One brand color, semantic colors for status only
✗ Gradients on main backgrounds
  → Solid colors only for backgrounds
✗ More than 3 font weights
  → 400, 500/600, 700 only
✗ Font sizes outside the defined scale
  → No 13px, 15px, 17px, 18px, 22px
✗ Spacing values outside the 4px grid
  → No 10px, 18px, 22px, 36px
```

---

## Animation Violations

```
✗ Animations > 800ms on any interaction
  → Feels laggy, breaks the "instant" contract
✗ Bouncing that has no semantic meaning
  → Animation must communicate state, not decorate
✗ Animating on every re-render
  → Performance killer
✗ CSS transitions on layout properties
  → No transitions on: width, height, top, left, margin, padding
  → Use transform and opacity ONLY for 60fps
✗ Animating non-GPU properties
  → top, left, margin, padding → use transform: translate() instead
✗ Multiple animations competing for attention simultaneously
  → One animation at a time per viewport area
✗ Looping animations on static content
  → Only for intentional loading states
✗ No prefers-reduced-motion support
  → This CSS rule must exist in every project's global CSS:
     @media (prefers-reduced-motion: reduce) {
       * { animation-duration: 0.01ms !important;
           transition-duration: 0.01ms !important; }
     }
✗ Page animations that include the navigation shell
  → Only the content area transitions on navigation
```

---

## Performance Violations

```
✗ Rendering > 100 list items without virtualization
  → Use @tanstack/virtual for lists > 100 items
✗ Rendering > 200 table rows without virtualization
  → Use @tanstack/virtual for tables > 200 rows
✗ import * as from any library
  → import * as Icons from 'lucide-react' — kills tree-shaking
✗ Using moment.js
  → Use date-fns (tree-shakeable, smaller)
✗ Using lodash
  → Use native JavaScript array/object methods
✗ API keys in client-side code
  → All secrets in environment variables
✗ console.log in production code
  → Remove all console.log before shipping
✗ No React.memo on components receiving objects/arrays as props
  → Causes unnecessary re-renders
✗ Anonymous functions in JSX
  → onClick={() => handleDelete(id)} → use useCallback
✗ Eager imports of rarely used features
  → Use React.lazy() for all feature pages
```

---

## Security Violations

```
✗ Hardcoded API keys, passwords, or secrets in code
  → CRITICAL: rotate the key immediately if this happens
✗ .env file committed to git
  → CRITICAL: remove from history with git filter-branch
✗ dangerouslySetInnerHTML without DOMPurify sanitization
  → XSS vulnerability
✗ User-controlled href without URL validation
  → javascript: protocol attack
✗ Sensitive data (passwords, tokens, PII) in localStorage
  → Use httpOnly cookies for auth tokens
✗ npm audit showing CRITICAL or HIGH vulnerabilities
  → Block deployment until resolved
✗ No input validation on user-submitted data
  → Validate all inputs before processing
```

---

## Accessibility Violations

```
✗ Interactive elements not reachable by keyboard
  → div with onClick but no tabIndex or role
✗ Missing focus ring on interactive elements
  → Never use outline: none without a replacement
✗ Images without alt text
  → All <img> must have alt attribute (empty string for decorative)
✗ Form inputs without labels
  → Every input needs a <label> with htmlFor
✗ Color as the only way to convey information
  → Always pair color with text, icon, or pattern
✗ Touch targets smaller than 44×44px
  → Minimum size for all interactive elements
✗ Modal without focus trap
  → Tab must stay inside open modal
✗ Dynamic content changes not announced
  → Use aria-live for toasts, status updates, loading states
✗ user-scalable=no in viewport meta
  → Never disable pinch-to-zoom
✗ Missing skip-to-content link
  → Required for keyboard users
```

---

## UX Writing Violations

```
✗ Vague error messages
  → "Something went wrong" → "Connection failed. Check your internet and try again."
✗ Generic CTAs
  → "OK", "Submit", "Yes", "Confirm" → "Save Product", "Delete Order", "Send Invoice"
✗ Unformatted numbers
  → 1234567 → 1,234,567 or Rp 1.234.567
✗ Technical jargon in user-facing messages
  → "Error 503" → "Our servers are temporarily unavailable"
✗ Empty states without a call to action
  → Every empty state needs a next step for the user
✗ Passive voice in CTAs
  → "Changes will be saved" → "Save changes"
✗ Vague empty state titles
  → "No data" → "No products yet"
```

---

## Git Violations

```
✗ Direct commits to main branch
  → All changes go through PR
✗ Committing .env files
  → Immediate security incident
✗ Committing node_modules
  → Add to .gitignore
✗ Force pushing to shared branches
  → Destroys other people's work
✗ Commit messages like "fix stuff", "update", "WIP", "asdf"
  → Follow Conventional Commits format
✗ PRs with > 800 lines changed
  → Split into smaller PRs
✗ Merging without at least 1 approval
  → All PRs need review
✗ Merging with failing CI
  → Fix tests and lint before merging
```

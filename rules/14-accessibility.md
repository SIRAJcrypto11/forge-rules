# Chapter 14 — Accessibility (A11y) Deep Specification

> Accessibility is not a feature for "disabled users."  
> It is the baseline quality standard for all users.  
> A keyboard-navigable app is faster for power users.  
> A screen-reader-compatible app is better structured for everyone.

---

## Standard: WCAG 2.1 Level AA

All applications must meet WCAG 2.1 AA compliance.  
This is not optional. It is a legal requirement in many jurisdictions.

---

## 14.1 — Color & Contrast

**Minimum contrast ratios (WCAG AA):**

| Text Type | Minimum Ratio |
|-----------|---------------|
| Normal text (< 18px) | 4.5:1 |
| Large text (≥ 18px or ≥ 14px bold) | 3:1 |
| UI components (buttons, inputs, icons) | 3:1 |
| Decorative elements | No requirement |

**Rules:**
- Never convey information through color alone
- Always pair color with text, icon, or pattern
- Test with a color blindness simulator before shipping

```jsx
// ❌ VIOLATION — color only conveys status
<div style={{ color: 'red' }}>Error</div>

// ✅ CORRECT — color + icon + text
<div className="text-danger flex items-center gap-2">
  <AlertCircle size={16} aria-hidden="true" />
  <span>Payment failed</span>
</div>
```

---

## 14.2 — Keyboard Navigation

**Rule: Every interactive element must be reachable and operable via keyboard.**

**Tab order rules:**
- Tab order must follow visual reading order (top-left to bottom-right)
- Never use `tabIndex > 0` (breaks natural tab order)
- Use `tabIndex="0"` only for custom interactive elements
- Use `tabIndex="-1"` for programmatic focus only

```jsx
// ❌ VIOLATION — removes keyboard access
<div onClick={handleClick} style={{ cursor: 'pointer' }}>
  Click me
</div>

// ✅ CORRECT — proper interactive element
<button onClick={handleClick} type="button">
  Click me
</button>

// ✅ CORRECT — custom interactive element
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  aria-label="Click me"
>
  Click me
</div>
```

**Focus management rules:**
```jsx
// When a modal opens: focus moves to modal
// When a modal closes: focus returns to trigger element

function Modal({ isOpen, onClose, triggerRef, children }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Focus first focusable element in modal
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    } else {
      // Return focus to trigger
      triggerRef?.current?.focus()
    }
  }, [isOpen])

  // Focus trap: keep focus inside modal while open
  // ... (see useFocusTrap hook)
}
```

**Focus trap for modals and drawers:**
```js
// src/hooks/useFocusTrap.js
export function useFocusTrap(containerRef, isActive) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ')

    const focusableElements = containerRef.current.querySelectorAll(focusableSelectors)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    function handleKeyDown(e) {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isActive, containerRef])
}
```

---

## 14.3 — ARIA Attributes

**Rule: Use semantic HTML first. ARIA only when semantic HTML is insufficient.**

**ARIA usage hierarchy:**
1. Use native HTML elements (`<button>`, `<nav>`, `<main>`, `<header>`)
2. Use HTML attributes (`disabled`, `required`, `type`)
3. Use ARIA roles and attributes only when #1 and #2 are insufficient

**Required ARIA patterns:**

```jsx
// Buttons
<button
  type="button"
  aria-label="Delete product Kemeja Biru"  // When label isn't visible
  aria-pressed={isActive}                  // Toggle buttons
  aria-expanded={isOpen}                   // Disclosure buttons
  aria-busy={isLoading}                    // Loading state
  disabled={isDisabled}
>

// Form inputs
<div>
  <label htmlFor="email-input">Email address</label>
  <input
    id="email-input"
    type="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : undefined}
  />
  {hasError && (
    <span id="email-error" role="alert">
      Enter a valid email address
    </span>
  )}
</div>

// Navigation
<nav aria-label="Main navigation">
  <ul>
    <li>
      <a href="/dashboard" aria-current={isActive ? 'page' : undefined}>
        Dashboard
      </a>
    </li>
  </ul>
</nav>

// Live regions (dynamic content)
<div aria-live="polite" aria-atomic="true">
  {statusMessage}  {/* Screen reader announces changes */}
</div>

// Loading states
<div aria-live="polite">
  {isLoading ? (
    <span className="sr-only">Loading products...</span>
  ) : (
    <span className="sr-only">{products.length} products loaded</span>
  )}
</div>

// Tables
<table>
  <caption className="sr-only">Product inventory list</caption>
  <thead>
    <tr>
      <th scope="col">Product Name</th>
      <th scope="col">Price</th>
      <th scope="col">
        <span className="sr-only">Actions</span>
      </th>
    </tr>
  </thead>
</table>

// Icons (decorative vs informative)
<TrendingUp aria-hidden="true" />                    // Decorative: hide from screen reader
<AlertCircle aria-label="Warning: low stock" />      // Informative: describe it
```

---

## 14.4 — Screen Reader Support

**Rule: Every dynamic content change must be announced.**

```jsx
// Toast notifications
function Toast({ message, type }) {
  return (
    <div
      role="alert"           // Announces immediately (for errors)
      aria-live="assertive"  // Use "polite" for non-critical messages
      aria-atomic="true"
      className={`toast toast-${type}`}
    >
      {message}
    </div>
  )
}

// Page title updates on navigation
function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} — ${APP_NAME}`
    // Screen readers announce page title on navigation
  }, [title])
}

// Loading announcements
function DataTable({ isLoading, items }) {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        {isLoading ? 'Loading data...' : `${items.length} items loaded`}
      </div>
      {/* table content */}
    </>
  )
}
```

**Screen-reader-only utility class:**
```css
/* In global.css — visually hidden but accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 14.5 — Images & Media

```jsx
// Informative images — describe the content
<img src={product.image} alt={`Product photo of ${product.name}`} />

// Decorative images — hide from screen readers
<img src={decorativeBanner} alt="" role="presentation" />

// Icons with text — icon is decorative
<button>
  <PlusIcon aria-hidden="true" />
  Add Product
</button>

// Icon-only buttons — must have accessible label
<button aria-label="Add new product">
  <PlusIcon aria-hidden="true" />
</button>

// Charts — provide text alternative
<div role="img" aria-label="Revenue chart showing 23% growth from January to May 2026">
  <ChartLine data={revenueData} />
</div>
```

---

## 14.6 — Forms Accessibility

```jsx
// Every input must have a visible label
// Never use placeholder as the only label

// ❌ VIOLATION
<input placeholder="Enter your email" />

// ✅ CORRECT
<div>
  <label htmlFor="email">Email address</label>
  <input
    id="email"
    type="email"
    placeholder="you@example.com"  // Supplementary hint only
    aria-required="true"
  />
</div>

// Required fields
<label htmlFor="name">
  Full name
  <span aria-hidden="true" className="text-danger ml-1">*</span>
  <span className="sr-only">(required)</span>
</label>

// Error messages
<input
  id="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : 'email-hint'}
/>
{errors.email && (
  <p id="email-error" role="alert" className="text-danger text-sm mt-1">
    {errors.email}
  </p>
)}
{!errors.email && (
  <p id="email-hint" className="text-text-3 text-sm mt-1">
    We'll never share your email
  </p>
)}
```

---

## 14.7 — Skip Navigation

**Rule: Every app must have a skip-to-content link.**

```jsx
// src/components/layout/AppShell.jsx
// First element in the DOM — visible on focus

function AppShell({ children }) {
  return (
    <>
      {/* Skip link — visible only on keyboard focus */}
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only
          focus:fixed focus:top-4 focus:left-4 focus:z-50
          focus:px-4 focus:py-2 focus:bg-accent focus:text-white
          focus:rounded-lg focus:shadow-lg
        "
      >
        Skip to main content
      </a>

      <Sidebar />
      <TopBar />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  )
}
```

---

## 14.8 — Touch & Mobile Accessibility

```
✓ Touch targets minimum 44×44px (Apple HIG) / 48×48dp (Material)
✓ Adequate spacing between touch targets (minimum 8px)
✓ No hover-only interactions (touch devices have no hover)
✓ Swipe gestures have button alternatives
✓ Pinch-to-zoom not disabled (no user-scalable=no in viewport meta)
```

```html
<!-- ❌ VIOLATION — disables zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

<!-- ✅ CORRECT — allows zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## 14.9 — Accessibility Testing Checklist

**Automated (run in CI):**
```bash
# Install axe-core for automated a11y testing
npm install --save-dev @axe-core/react

# In development: shows a11y violations in console
import React from 'react'
if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react')
  axe(React, ReactDOM, 1000)
}
```

**Manual testing checklist:**
```
□ Tab through entire app — every interactive element is reachable
□ All interactive elements show visible focus ring
□ Modal opens → focus moves inside → Escape closes → focus returns
□ Screen reader (NVDA/VoiceOver) can navigate all content
□ All images have appropriate alt text
□ All form inputs have visible labels
□ Error messages are announced by screen reader
□ Color contrast passes 4.5:1 for normal text
□ App works at 200% browser zoom without horizontal scroll
□ No content is lost when CSS is disabled
□ Skip-to-content link appears on first Tab press
□ Page title updates on navigation
□ Dynamic content changes are announced (aria-live)
```

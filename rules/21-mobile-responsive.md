# Chapter 21 — Mobile-First & Responsive Design

> Mobile is not a reduced version of desktop. It is a different context.  
> Users on mobile are often distracted, in motion, using one thumb, on a slow network.  
> Design for that user first. Desktop is the enhancement.

---

## 21.1 — Mobile-First Philosophy

**Rule: Write mobile styles first. Add desktop styles with `min-width` breakpoints.**

```css
/* ❌ WRONG: Desktop-first (overrides for mobile) */
.container {
  display: grid;
  grid-template-columns: 240px 1fr;  /* Desktop layout */
}
@media (max-width: 768px) {
  .container { grid-template-columns: 1fr; }  /* Override for mobile */
}

/* ✅ CORRECT: Mobile-first (enhances for desktop) */
.container {
  display: grid;
  grid-template-columns: 1fr;  /* Mobile: single column */
}
@media (min-width: 768px) {
  .container { grid-template-columns: 240px 1fr; }  /* Desktop: sidebar + content */
}
```

---

## 21.2 — Breakpoint System

**Rule: Use ONLY these breakpoints. Never invent custom breakpoints.**

```css
/* Tailwind default breakpoints — use these */
/* sm:  640px  — Large phones, small tablets */
/* md:  768px  — Tablets */
/* lg:  1024px — Small laptops */
/* xl:  1280px — Desktops */
/* 2xl: 1536px — Large desktops */

/* Custom additions for this system */
/* xs:  375px  — Minimum supported width (iPhone SE) */
/* 3xl: 1920px — Ultra-wide (rarely needed) */
```

**Tailwind config:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs':  '375px',
      'sm':  '640px',
      'md':  '768px',
      'lg':  '1024px',
      'xl':  '1280px',
      '2xl': '1536px',
    },
  },
}
```

**Breakpoint usage rules:**
```
✓ Test at 375px (iPhone SE) — minimum supported width
✓ Test at 390px (iPhone 14)
✓ Test at 768px (iPad)
✓ Test at 1280px (standard desktop)
✗ NEVER use arbitrary breakpoints like 600px, 900px, 1100px
✗ NEVER use max-width breakpoints (use min-width only)
✗ NEVER hardcode pixel values in JS for breakpoints (use useMediaQuery hook)
```

---

## 21.3 — Touch Target Standards

**Rule: Every interactive element must be at minimum 44×44px (Apple HIG) / 48×48dp (Material Design).**

```jsx
/* ✅ CORRECT: Adequate touch target */
<button
  type="button"
  className="min-h-[44px] min-w-[44px] px-4 py-3 flex items-center justify-center"
>
  Action
</button>

/* ✅ CORRECT: Small visual element with large touch area */
<button
  type="button"
  className="relative p-3"  /* 12px padding = 44px total with 20px icon */
  aria-label="Delete item"
>
  <TrashIcon size={20} aria-hidden="true" />
</button>

/* ❌ WRONG: Touch target too small */
<button className="p-1">  {/* Only 24px total with 16px icon */}
  <TrashIcon size={16} />
</button>
```

**Touch target spacing:**
```
✓ Minimum 8px gap between adjacent touch targets
✓ List items: minimum 52px height on mobile
✓ Navigation tabs: minimum 48px height
✓ Form inputs: minimum 44px height (already in design system)
✓ Floating action buttons: 56px diameter
```

---

## 21.4 — Viewport & Safe Areas

```html
<!-- ✅ CORRECT: Allows zoom, respects safe areas -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

<!-- ❌ WRONG: Disables zoom (accessibility violation) -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```

**Safe area insets (iPhone notch/Dynamic Island):**
```css
/* src/styles/global.css */

/* Bottom navigation: account for home indicator */
.mobile-nav {
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}

/* Fixed bottom elements */
.fixed-bottom {
  bottom: env(safe-area-inset-bottom);
  padding-bottom: 16px;
}

/* Full-screen modals */
.modal-fullscreen {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

---

## 21.5 — Mobile Navigation Patterns

### Bottom Tab Navigation
```jsx
// src/components/layout/MobileNav.jsx
// Rule: Bottom tabs on mobile (< 768px), sidebar on desktop

const TABS = [
  { route: ROUTES.DASHBOARD,  icon: LayoutDashboard, label: 'Dashboard' },
  { route: ROUTES.INVENTORY,  icon: Package,         label: 'Inventory' },
  { route: ROUTES.ORDERS,     icon: ShoppingCart,    label: 'Orders'    },
  { route: ROUTES.REPORTS,    icon: BarChart2,       label: 'Reports'   },
  { route: ROUTES.MORE,       icon: MoreHorizontal,  label: 'More'      },
]
// Rule: Maximum 5 tabs. "More" opens bottom sheet with full nav.

export function MobileNav() {
  const location = useLocation()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border md:hidden"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-14">
        {TABS.map(tab => {
          const isActive = location.pathname.startsWith(tab.route)
          return (
            <Link
              key={tab.route}
              to={tab.route}
              aria-current={isActive ? 'page' : undefined}
              className={`
                flex flex-col items-center justify-center gap-0.5
                min-w-[44px] min-h-[44px] px-3 py-1
                transition-colors duration-150
                ${isActive ? 'text-accent' : 'text-text-3 hover:text-text-2'}
              `}
            >
              <tab.icon
                size={22}
                aria-hidden="true"
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium leading-none">
                {tab.label}
              </span>
              {isActive && (
                <span className="sr-only">(current page)</span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

### Bottom Sheet (Mobile Modal)
```jsx
// src/components/ui/BottomSheet.jsx
// Rule: Modals become bottom sheets below 480px

export function BottomSheet({ isOpen, onClose, title, children }) {
  const sheetRef = useRef(null)
  useFocusTrap(sheetRef, isOpen)

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose()
    if (isOpen) document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-surface rounded-t-2xl
          animate-slide-up
          max-h-[90vh] overflow-y-auto
        "
        style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border">
          <h2 id="sheet-title" className="text-h4 text-text-1">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-lg hover:bg-sunken text-text-2 transition-colors"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </>
  )
}
```

---

## 21.6 — Mobile Form Patterns

```jsx
// Rule: Correct input types prevent wrong keyboard on mobile

// Phone number → numeric keypad
<input type="tel" inputMode="tel" autoComplete="tel" />

// Email → shows @ key
<input type="email" inputMode="email" autoComplete="email" />

// Number (no spinner arrows) → numeric keypad
<input type="text" inputMode="numeric" pattern="[0-9]*" />

// Currency → decimal keypad
<input type="text" inputMode="decimal" pattern="[0-9]*\.?[0-9]*" />

// Search → shows search key
<input type="search" inputMode="search" />

// URL → shows .com key
<input type="url" inputMode="url" autoComplete="url" />

// Autocomplete attributes (improves mobile UX significantly)
<input autoComplete="given-name" />    // First name
<input autoComplete="family-name" />   // Last name
<input autoComplete="email" />         // Email
<input autoComplete="tel" />           // Phone
<input autoComplete="street-address" /> // Address
<input autoComplete="postal-code" />   // ZIP/postal code
<input autoComplete="new-password" />  // New password (prevents autofill)
<input autoComplete="current-password" /> // Login password
```

**Mobile form layout rules:**
```
✓ Single column always on mobile
✓ Labels above inputs (never floating labels on mobile — too small)
✓ Input height minimum 44px (already in design system)
✓ Font size minimum 16px on inputs (prevents iOS auto-zoom)
✓ Submit button full-width on mobile
✓ Keyboard-aware scrolling (form scrolls above keyboard)
```

---

## 21.7 — Responsive Layout Patterns

### Responsive Grid
```jsx
// KPI cards: auto-fit, minimum 160px on mobile
<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
  {kpiCards.map(card => <KPICard key={card.id} {...card} />)}
</div>

// Feature cards: 1 col mobile, 2 col tablet, 3 col desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {features.map(f => <FeatureCard key={f.id} {...f} />)}
</div>

// Data table: horizontal scroll on mobile
<div className="overflow-x-auto -mx-4 sm:mx-0">
  <div className="min-w-[600px] px-4 sm:px-0">
    <DataTable columns={COLUMNS} rows={rows} />
  </div>
</div>
```

### Responsive Typography
```jsx
// Page title: smaller on mobile
<h1 className="text-2xl sm:text-3xl lg:text-h1 font-bold text-text-1">
  {title}
</h1>

// KPI value: scales with screen
<span className="text-2xl sm:text-3xl font-bold text-text-1 tabular-nums">
  {formatCurrency(value)}
</span>
```

### Responsive Spacing
```jsx
// Page container: tighter on mobile
<div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
  {children}
</div>

// Section spacing: tighter on mobile
<div className="space-y-4 sm:space-y-6 lg:space-y-8">
  {sections.map(s => <Section key={s.id} {...s} />)}
</div>
```

---

## 21.8 — PWA Considerations

```json
// public/manifest.json
{
  "name": "[App Name]",
  "short_name": "[Short Name]",
  "description": "[App description]",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F8F9FA",
  "theme_color": "#3B82F6",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

```html
<!-- index.html -->
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#3B82F6" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<link rel="apple-touch-icon" href="/icons/icon-192.png" />
```

---

## 21.9 — Mobile Performance

```
✓ Images: use WebP, specify width/height, lazy load below fold
✓ Fonts: self-hosted, preload critical fonts, font-display: swap
✓ Bundle: < 100KB initial gzipped (critical for 4G Indonesia)
✓ Touch: no 300ms click delay (use touch-action: manipulation)
✓ Scroll: use -webkit-overflow-scrolling: touch for smooth scroll
✓ Animations: reduce or disable on low-end devices

/* Prevent 300ms click delay */
* { touch-action: manipulation; }

/* Smooth momentum scrolling on iOS */
.scroll-container { -webkit-overflow-scrolling: touch; }
```

---

## 21.10 — Mobile Testing Checklist

```
□ Works at 375px width (iPhone SE) — minimum supported
□ Works at 390px (iPhone 14)
□ Works at 768px (iPad)
□ No horizontal scroll at any breakpoint
□ All touch targets ≥ 44×44px
□ Minimum 8px gap between touch targets
□ Input font size ≥ 16px (no iOS auto-zoom)
□ Correct keyboard type per input field
□ Bottom navigation visible and functional
□ Modals become bottom sheets below 480px
□ Safe area insets respected (iPhone notch)
□ Pinch-to-zoom not disabled
□ Tested on real device (not just browser DevTools)
□ Tested on Android Chrome
□ Tested on iOS Safari
□ Performance: LCP < 2.5s on 4G
```

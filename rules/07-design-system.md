# Chapter 7 — Design System (Silicon Valley Standard)

> ALL colors from tokens. ZERO hardcoded hex in components.  
> ALL spacing from the 4px grid. ZERO arbitrary values.  
> ALL font sizes from the defined scale. ZERO intermediate sizes.  
> Consistency is not a constraint — it is the product.

---

## 7.1 — Color System

**Rule: Every color in the app traces back to a CSS custom property. No exceptions.**

```css
/* src/styles/tokens.css */

:root {
  /* ── BACKGROUND LAYERS ─────────────────────────────────── */
  --color-bg:              #F8F9FA;   /* Page background */
  --color-surface:         #FFFFFF;   /* Cards, panels, modals */
  --color-sunken:          #F1F3F5;   /* Input bg, table header, code blocks */
  --color-surface-hover:   #F8F9FA;   /* Hover state for surface elements */
  --color-overlay:         rgba(0, 0, 0, 0.4); /* Modal backdrop */

  /* ── BORDERS ───────────────────────────────────────────── */
  --color-border:          #E9ECEF;   /* Default dividers, card borders */
  --color-border-strong:   #CED4DA;   /* Emphasized borders, active states */
  --color-border-focus:    var(--color-accent); /* Focus ring border */

  /* ── TEXT ──────────────────────────────────────────────── */
  --color-text-1:          #1A1D23;   /* Primary: headings, key values */
  --color-text-2:          #495057;   /* Secondary: labels, descriptions */
  --color-text-3:          #868E96;   /* Tertiary: placeholders, metadata */
  --color-text-disabled:   #ADB5BD;   /* Disabled text */
  --color-text-inverse:    #FFFFFF;   /* Text on dark backgrounds */
  --color-text-link:       var(--color-accent); /* Hyperlinks */

  /* ── BRAND / ACCENT ────────────────────────────────────── */
  --color-accent:          #3B82F6;   /* Primary action color */
  --color-accent-hover:    #2563EB;   /* Hover state */
  --color-accent-active:   #1D4ED8;   /* Active/pressed state */
  --color-accent-light:    #EFF6FF;   /* Tinted background */
  --color-accent-text:     #FFFFFF;   /* Text on accent background */

  /* ── SEMANTIC: SUCCESS ─────────────────────────────────── */
  --color-success:         #10B981;
  --color-success-hover:   #059669;
  --color-success-light:   #ECFDF5;
  --color-success-text:    #065F46;

  /* ── SEMANTIC: WARNING ─────────────────────────────────── */
  --color-warning:         #F59E0B;
  --color-warning-hover:   #D97706;
  --color-warning-light:   #FFFBEB;
  --color-warning-text:    #92400E;

  /* ── SEMANTIC: DANGER ──────────────────────────────────── */
  --color-danger:          #EF4444;
  --color-danger-hover:    #DC2626;
  --color-danger-light:    #FEF2F2;
  --color-danger-text:     #991B1B;

  /* ── SEMANTIC: INFO ────────────────────────────────────── */
  --color-info:            #3B82F6;
  --color-info-hover:      #2563EB;
  --color-info-light:      #EFF6FF;
  --color-info-text:       #1E40AF;

  /* ── SHADOWS ───────────────────────────────────────────── */
  --shadow-subtle: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm:     0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:     0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg:     0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04);
  --shadow-xl:     0 20px 25px rgba(0,0,0,0.10), 0 8px 10px rgba(0,0,0,0.04);
  --shadow-modal:  0 25px 50px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.08);
  --shadow-focus:  0 0 0 3px var(--color-accent-light);
}

/* ── DARK MODE ─────────────────────────────────────────────── */
[data-theme="dark"] {
  --color-bg:              #0F1117;
  --color-surface:         #1A1D27;
  --color-sunken:          #13151E;
  --color-surface-hover:   #22263A;

  --color-border:          #2A2D3E;
  --color-border-strong:   #3D4166;

  --color-text-1:          #E8EAF0;
  --color-text-2:          #9BA3C0;
  --color-text-3:          #5C6480;
  --color-text-disabled:   #3D4166;
  --color-text-inverse:    #0F1117;

  --color-accent:          #60A5FA;
  --color-accent-hover:    #93C5FD;
  --color-accent-active:   #BFDBFE;
  --color-accent-light:    #1E3A5F;
  --color-accent-text:     #0F1117;

  --color-success:         #34D399;
  --color-success-light:   #064E3B;
  --color-success-text:    #A7F3D0;

  --color-warning:         #FBBF24;
  --color-warning-light:   #451A03;
  --color-warning-text:    #FDE68A;

  --color-danger:          #F87171;
  --color-danger-light:    #450A0A;
  --color-danger-text:     #FECACA;

  --color-info:            #60A5FA;
  --color-info-light:      #1E3A5F;
  --color-info-text:       #BFDBFE;

  --shadow-subtle: 0 1px 2px rgba(0,0,0,0.20);
  --shadow-sm:     0 1px 3px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.20);
  --shadow-md:     0 4px 6px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.20);
  --shadow-lg:     0 10px 15px rgba(0,0,0,0.40), 0 4px 6px rgba(0,0,0,0.25);
  --shadow-xl:     0 20px 25px rgba(0,0,0,0.50), 0 8px 10px rgba(0,0,0,0.30);
  --shadow-modal:  0 25px 50px rgba(0,0,0,0.60), 0 10px 20px rgba(0,0,0,0.40);
}
```

**Color rules:**
```
✗ NEVER use pure #000000 or #FFFFFF as main UI colors
✗ NEVER hardcode hex values in components
✗ NEVER use more than 1 accent color per project
✗ NEVER use gradients on backgrounds (solid colors only)
✗ NEVER use low contrast combinations (WCAG AA: 4.5:1 minimum)
✓ ALWAYS use semantic tokens (--color-danger, not --color-red)
✓ ALWAYS test in both light and dark mode
```

---

## 7.2 — Typography System

```
RULE: Maximum 2 fonts per project (1 preferred).
RULE: Only 3 font weights: 400, 500/600, 700. Nothing else.
RULE: Font sizes only from the defined scale.
RULE: No 13px, 15px, 17px, 18px, 22px anywhere.
```

**Recommended fonts:**
- UI: `Inter` or `Plus Jakarta Sans` (both excellent for data-dense UIs)
- Mono: `JetBrains Mono` or `Fira Code` (for code, IDs, technical values)

**Type scale:**

```css
/* src/styles/tokens.css */

/* Font families */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

/* Type scale — 8 levels, no intermediate sizes */
--text-display: 48px;  /* Hero headlines, dashboard titles */
--text-h1:      32px;  /* Page titles */
--text-h2:      24px;  /* Section headings */
--text-h3:      20px;  /* Sub-section headings */
--text-h4:      16px;  /* Card titles, widget headings */
--text-body-lg: 16px;  /* Large body text, introductions */
--text-body:    14px;  /* Default body text */
--text-caption: 12px;  /* Captions, helper text, metadata */
--text-label:   12px;  /* Labels (uppercase + tracking) */

/* Font weights — only 3 */
--weight-regular: 400;
--weight-medium:  500;  /* or 600 — pick one per project */
--weight-bold:    700;

/* Line heights */
--leading-tight:  1.1;  /* Display, h1 */
--leading-snug:   1.3;  /* h2, h3 */
--leading-normal: 1.4;  /* h4, labels */
--leading-relaxed:1.5;  /* Body text */
--leading-loose:  1.6;  /* Long-form content */

/* Letter spacing */
--tracking-tight:  -0.03em;  /* Display text */
--tracking-normal:  0em;     /* Body text */
--tracking-wide:    0.05em;  /* UPPERCASE labels */
--tracking-wider:   0.1em;   /* Small caps */
```

**Tailwind typography config:**

```js
// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      'display': ['48px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
      'h1':      ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
      'h2':      ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      'h3':      ['20px', { lineHeight: '1.4', letterSpacing: '0',       fontWeight: '600' }],
      'h4':      ['16px', { lineHeight: '1.4', letterSpacing: '0',       fontWeight: '600' }],
      'body-lg': ['16px', { lineHeight: '1.6', letterSpacing: '0',       fontWeight: '400' }],
      'body':    ['14px', { lineHeight: '1.5', letterSpacing: '0',       fontWeight: '400' }],
      'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0',       fontWeight: '400' }],
      'label':   ['12px', { lineHeight: '1.4', letterSpacing: '0.05em',  fontWeight: '500' }],
    },
  },
}
```

---

## 7.3 — Spacing System

```
RULE: Base unit = 4px.
RULE: Use ONLY these values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px.
RULE: NEVER use 10px, 14px, 18px, 22px, 36px, or any non-grid value.
RULE: Padding inside cards: 24px default, 16px compact, 32px large.
RULE: Gap between sibling components: 16px default.
RULE: Section spacing: 48-64px between major sections.
RULE: Icon + text gap: always 8px.
```

```css
/* Spacing scale reference */
/* 1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 5 = 20px, 6 = 24px */
/* 8 = 32px, 10 = 40px, 12 = 48px, 16 = 64px, 20 = 80px, 24 = 96px, 32 = 128px */

/* Common patterns */
.card-default  { padding: 24px; }  /* p-6 */
.card-compact  { padding: 16px; }  /* p-4 */
.card-large    { padding: 32px; }  /* p-8 */

.section-gap   { gap: 48px; }      /* gap-12 */
.component-gap { gap: 16px; }      /* gap-4 */
.icon-text-gap { gap: 8px; }       /* gap-2 */
```

---

## 7.4 — Border Radius System

```
RULE: Consistent within a project. Pick ONE card radius and use it everywhere.
RULE: Nested elements should have smaller radius than parent.
```

```css
/* Border radius scale */
--radius-sm:   4px;     /* Badges, tags, small elements */
--radius-md:   6px;     /* Buttons (small), inputs */
--radius-lg:   8px;     /* Buttons (default), form elements */
--radius-xl:   12px;    /* Cards, panels, modals */
--radius-2xl:  16px;    /* Large panels, feature cards */
--radius-full: 9999px;  /* Pills, avatar circles, tags */

/* Nesting rule example */
.card {
  border-radius: var(--radius-xl);  /* 12px */
}
.card .inner-element {
  border-radius: var(--radius-lg);  /* 8px — smaller than parent */
}
.card .inner-element .badge {
  border-radius: var(--radius-sm);  /* 4px — smaller than inner */
}
```

---

## 7.5 — Shadow System

```
RULE: Use shadow to convey elevation, not decoration.
RULE: Higher elevation = more prominent shadow.
RULE: Dark mode shadows are more prominent (higher opacity).
```

**Elevation levels:**

| Level | Shadow | Use for |
|-------|--------|---------|
| 0 (flat) | none | Backgrounds, disabled elements |
| 1 (raised) | sm | Cards, inputs, default elements |
| 2 (floating) | md | Dropdowns, tooltips, hover cards |
| 3 (overlay) | lg | Sticky headers, floating buttons |
| 4 (modal) | xl + modal | Modals, drawers, command palette |

```css
/* Interactive card hover pattern */
.card-interactive {
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--duration-fast) var(--ease-standard),
              transform var(--duration-fast) var(--ease-standard);
}
.card-interactive:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.card-interactive:active {
  box-shadow: var(--shadow-sm);
  transform: translateY(0);
}
```

---

## 7.6 — Icon System

```
RULE: Lucide React ONLY. Consistent, tree-shakeable, 1000+ icons.
RULE: Named imports only — never import *.
RULE: Icon must always be accompanied by label (accessible).
      Exception: icon buttons with aria-label.
RULE: Icon color inherits from text color by default.
RULE: Never custom-draw SVG icons inline in JSX.
RULE: Icon + text gap: 8px always.
```

**Icon sizes:**

| Size | Use for |
|------|---------|
| 12px | Micro indicators, status dots |
| 16px | Inline with text, table actions, badges |
| 20px | Buttons, form elements, nav sub-items |
| 24px | Navigation items, section headers |
| 32px | Feature icons, empty states |
| 48px | Hero/illustration icons, large empty states |

```jsx
// ✅ CORRECT: Named import, aria-hidden on decorative
import { TrendingUp, AlertCircle, Plus } from 'lucide-react'

// Decorative icon (has text label)
<button className="flex items-center gap-2">
  <Plus size={20} aria-hidden="true" />
  Add Product
</button>

// Informative icon (no text label)
<button aria-label="Add new product">
  <Plus size={20} aria-hidden="true" />
</button>

// Status icon with semantic meaning
<div className="flex items-center gap-2 text-danger">
  <AlertCircle size={16} aria-hidden="true" />
  <span>Payment failed</span>
</div>

// ❌ WRONG: Import all icons
import * as Icons from 'lucide-react'

// ❌ WRONG: Inline SVG
<svg viewBox="0 0 24 24">...</svg>
```

---

## 7.7 — Layout & Grid

```
RULE: Sidebar width: 240px (expanded), 64px (collapsed).
RULE: Content max-width: 1280px centered.
RULE: Gutter (page padding): 16px mobile, 24px tablet, 32px desktop.
RULE: Column grid: 12-column, 24px gap.
RULE: No fixed pixel widths for content areas.
RULE: No horizontal scroll anywhere, any screen size.
```

**Responsive grid patterns:**

```css
/* KPI cards: auto-fit, minimum 200px */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* Feature cards: 3-col desktop, 2-col tablet, 1-col mobile */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 1024px) {
  .feature-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .feature-grid { grid-template-columns: 1fr; }
}

/* Page container */
.page-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}
@media (max-width: 1024px) {
  .page-container { padding: 0 24px; }
}
@media (max-width: 640px) {
  .page-container { padding: 0 16px; }
}
```

---

## 7.8 — Component Visual Standards

### Buttons

```
Height:  sm=32px (h-8), md=40px (h-10), lg=48px (h-12)
Padding: sm=px-3, md=px-4, lg=px-5
Font:    sm=13px/500, md=14px/500, lg=15px/500
Radius:  sm=md(6px), md=lg(8px), lg=lg(8px)

States:
  default  → base styles
  hover    → bg-8% darker, 150ms
  active   → bg-16% darker + scale(0.98), 80ms
  focus    → 2px ring + 2px offset, accent color
  disabled → opacity-50, cursor-not-allowed
  loading  → spinner replaces text, width locked, aria-busy="true"
```

### Inputs

```
Height:  default=40px (h-10), compact=36px (h-9), large=48px (h-12)
Padding: px-3 py-2
Border:  1px solid --color-border
Radius:  lg (8px)
Font:    14px/400

States:
  default → border-border
  focus   → border-accent + ring-3 accent-light, 150ms
  error   → border-danger + ring-3 danger-light
  success → border-success + ring-3 success-light
  disabled → opacity-50, cursor-not-allowed, bg-sunken

Label:   14px/500, 6px gap below label
Helper:  12px/400, text-3, 4px gap above
Error:   12px/400, text-danger, role="alert"
```

### Cards

```
Background: --color-surface
Border:     1px solid --color-border (optional)
Radius:     xl (12px)
Shadow:     sm (default), md (hover)
Padding:    24px default, 16px compact, 32px large

Interactive card hover:
  shadow: sm → md
  transform: translateY(-2px)
  transition: 150ms ease
```

### Data Tables

```
Header:  12px/500/UPPERCASE, bg-sunken, 52px height, border-b
Row:     52px min-height, hover bg-surface-hover
Border:  horizontal only (no vertical lines)
Cell:    px-4 py-3
Actions: right-aligned, hidden by default, show on row hover
Empty:   centered EmptyState component
Loading: skeleton matching header + 5 rows
```

### Status Badges

```
Pattern: colored-dot + label + tinted-background
         NEVER color-only (accessibility requirement)
Height:  22px
Padding: px-2 py-0.5
Radius:  md (6px)
Font:    12px/500
Dot:     6px circle, 4px gap to text

Colors per status:
  active/completed → success (green)
  pending/draft    → warning (yellow)
  error/cancelled  → danger (red)
  inactive/archived → text-3 (gray)
  processing/info  → info (blue)
```

### Modals

```
Widths:   sm=400px, md=560px, lg=720px, xl=900px
Backdrop: rgba(0,0,0,0.4), 250ms fade
Animation: scale(0.95→1) + fade, 300ms spring
Header:   24px title + optional description + close button (top-right)
Footer:   right-aligned actions, Cancel on left
Scroll:   modal content scrolls, not the page
Mobile:   full-screen bottom sheet below 480px
          drag handle at top, swipe down to dismiss
```

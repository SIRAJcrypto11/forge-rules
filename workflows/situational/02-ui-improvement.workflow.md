# Workflow: UI Improvement
**ID:** WF-02  
**Trigger Keywords:** UI, design, visual, layout, styling, colors, typography, component, interface, look, appearance, theme, spacing, responsive, mobile, dark mode  
**Primary Agent:** UI  
**Support Agents:** UX, Coder, A11y, Performance  
**Estimated Time:** 2 hours – 4 weeks (scope-dependent)  

---

## Overview

This workflow covers all UI improvement scenarios from tweaking a single component to full design system overhauls. Scale determines which phases apply.

---

## Scope Classification

| Scope | Description | Phases Required | Time Estimate |
|-------|-------------|-----------------|---------------|
| S1 – Micro | Single element (button, icon, color) | 1, 3, 5 | 1–4 hours |
| S2 – Component | Single component redesign | 1, 2, 3, 4, 5 | 1–3 days |
| S3 – Feature | Multiple related components | 1, 2, 3, 4, 5, 6 | 1–2 weeks |
| S4 – System | Design system / full redesign | All phases | 2–8 weeks |

---

## Phase 1: Discovery & Audit (UI Agent)

### 1.1 Current State Audit
```
Document existing state:
- [ ] Screenshot all affected screens/components
- [ ] List all components involved
- [ ] Identify design inconsistencies
- [ ] Note accessibility issues
- [ ] Measure current performance (LCP, CLS)
- [ ] Check cross-browser rendering
- [ ] Check mobile/tablet rendering
```

### 1.2 Design System Inventory
```
Check existing tokens:
- [ ] Color palette (primary, secondary, semantic, neutral)
- [ ] Typography scale (font families, sizes, weights, line heights)
- [ ] Spacing scale (4px/8px grid system)
- [ ] Border radius tokens
- [ ] Shadow/elevation tokens
- [ ] Animation/transition tokens
- [ ] Breakpoints
```

### 1.3 Competitive & Reference Analysis
```
Gather inspiration:
- [ ] 3-5 reference designs from similar products
- [ ] Note specific patterns to adopt
- [ ] Identify what NOT to do
- [ ] Check Dribbble/Behance/Mobbin for patterns
```

---

## Phase 2: Design Planning (UI + UX Agents)

### 2.1 Define Design Goals
```
For each improvement, define:
- Primary goal: [e.g., "Increase visual hierarchy clarity"]
- Success metric: [e.g., "User can identify CTA in < 2 seconds"]
- Constraints: [e.g., "Must work with existing color tokens"]
- Non-goals: [e.g., "Not changing layout structure"]
```

### 2.2 Component Specification

**Color System:**
```css
/* Semantic color tokens - always use these, never raw hex */
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-500: #3b82f6;  /* Main brand */
--color-primary-600: #2563eb;  /* Hover state */
--color-primary-700: #1d4ed8;  /* Active state */

--color-semantic-success: #22c55e;
--color-semantic-warning: #f59e0b;
--color-semantic-error: #ef4444;
--color-semantic-info: #3b82f6;

/* Surface tokens */
--color-surface-primary: #ffffff;
--color-surface-secondary: #f8fafc;
--color-surface-tertiary: #f1f5f9;

/* Text tokens */
--color-text-primary: #0f172a;
--color-text-secondary: #475569;
--color-text-disabled: #94a3b8;
--color-text-inverse: #ffffff;
```

**Typography System:**
```css
/* Type scale - modular scale 1.25 */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */

/* Font weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line heights */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

**Spacing System:**
```css
/* 4px base grid */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### 2.3 Component Anatomy
```
For each component being redesigned, document:

COMPONENT: [Name]
├── States: default, hover, focus, active, disabled, loading, error
├── Variants: primary, secondary, ghost, destructive
├── Sizes: sm, md, lg
├── Props: [list all configurable props]
├── Accessibility: role, aria-label, keyboard nav
└── Responsive: mobile, tablet, desktop behavior
```

---

## Phase 3: Implementation (Coder + UI Agent)

### 3.1 File Structure
```
src/
├── design-system/
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── typography.css
│   │   ├── spacing.css
│   │   └── index.css
│   └── components/
│       └── [ComponentName]/
│           ├── [ComponentName].jsx
│           ├── [ComponentName].module.css
│           ├── [ComponentName].stories.jsx
│           └── index.js
```

### 3.2 Component Implementation Standards

**React Component Template:**
```jsx
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Button.module.css';

/**
 * Button component
 * @param {Object} props
 * @param {'primary'|'secondary'|'ghost'|'destructive'} props.variant
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.isLoading
 * @param {boolean} props.disabled
 */
const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  className,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        isLoading && styles.loading,
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={isLoading ? styles.hiddenText : undefined}>
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
```

**CSS Module Template:**
```css
/* Button.module.css */
.button {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  
  /* Focus visible - accessibility */
  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Variants */
.primary {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  
  &:hover:not(:disabled) { background: var(--color-primary-600); }
  &:active:not(:disabled) { background: var(--color-primary-700); }
}

.secondary {
  background: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
  
  &:hover:not(:disabled) { background: var(--color-primary-50); }
}

.ghost {
  background: transparent;
  color: var(--color-text-secondary);
  
  &:hover:not(:disabled) { background: var(--color-surface-secondary); }
}

.destructive {
  background: var(--color-semantic-error);
  color: var(--color-text-inverse);
  
  &:hover:not(:disabled) { filter: brightness(0.9); }
}

/* Sizes */
.sm { padding: var(--space-1) var(--space-3); font-size: var(--font-size-sm); }
.md { padding: var(--space-2) var(--space-4); font-size: var(--font-size-base); }
.lg { padding: var(--space-3) var(--space-6); font-size: var(--font-size-lg); }
```

### 3.3 Responsive Implementation
```css
/* Mobile-first breakpoints */
/* xs: 0px (default) */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */

.container {
  width: 100%;
  padding: var(--space-4);
  
  @media (min-width: 640px) {
    padding: var(--space-6);
  }
  
  @media (min-width: 1024px) {
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--space-8);
  }
}
```

### 3.4 Dark Mode Implementation
```css
/* Use CSS custom properties for automatic dark mode */
:root {
  --color-bg: #ffffff;
  --color-text: #0f172a;
  --color-border: #e2e8f0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #f8fafc;
    --color-border: #334155;
  }
}

/* Or with data attribute for manual toggle */
[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-text: #f8fafc;
}
```

### 3.5 Animation Standards
```css
/* Micro-interactions */
.interactive {
  transition: transform 150ms ease, opacity 150ms ease;
  
  &:hover { transform: translateY(-1px); }
  &:active { transform: translateY(0); }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Entrance animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fadeIn {
  animation: fadeIn 200ms ease forwards;
}
```

---

## Phase 4: Accessibility Review (A11y Agent)

### 4.1 WCAG 2.1 AA Checklist
```
Color & Contrast:
- [ ] Text contrast ratio >= 4.5:1 (normal text)
- [ ] Text contrast ratio >= 3:1 (large text, 18px+)
- [ ] UI component contrast >= 3:1
- [ ] Color is not the only means of conveying information

Keyboard Navigation:
- [ ] All interactive elements reachable via Tab
- [ ] Focus indicator visible (not just outline: none)
- [ ] Logical tab order
- [ ] No keyboard traps

Screen Reader:
- [ ] All images have alt text
- [ ] Icons have aria-label or aria-hidden
- [ ] Form inputs have associated labels
- [ ] Error messages linked to inputs via aria-describedby
- [ ] Dynamic content announced via aria-live

Semantic HTML:
- [ ] Headings in logical order (h1 > h2 > h3)
- [ ] Lists use ul/ol/li
- [ ] Buttons are <button>, links are <a>
- [ ] Landmarks: header, main, nav, footer
```

### 4.2 Automated Testing
```bash
# Run axe-core
npm run test:a11y

# Lighthouse accessibility audit
npx lighthouse http://localhost:3000 --only-categories=accessibility

# Check color contrast
npx color-contrast-checker
```

---

## Phase 5: Performance Check (Performance Agent)

### 5.1 CSS Performance
```
Checklist:
- [ ] No unused CSS (PurgeCSS or CSS Modules)
- [ ] Critical CSS inlined
- [ ] Non-critical CSS deferred
- [ ] Images optimized (WebP, correct sizes)
- [ ] Fonts: font-display: swap, preload critical fonts
- [ ] No layout shifts (CLS < 0.1)
```

### 5.2 Component Performance
```javascript
// Memoize expensive components
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* render */}</div>;
});

// Lazy load non-critical UI
const HeavyModal = lazy(() => import('./HeavyModal'));

// Virtualize long lists
import { VirtualList } from 'react-virtual';
```

---

## Phase 6: Quality Assurance (Tester)

### 6.1 Visual Regression Testing
```bash
# Capture baseline screenshots
npx playwright test --update-snapshots

# Run visual diff
npx playwright test visual.spec.ts
```

### 6.2 Cross-Browser Testing Matrix
```
Required browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Mobile (iOS + Android)
- [ ] Safari Mobile (iOS)
```

### 6.3 Responsive Testing
```
Breakpoints to test:
- [ ] 320px (small mobile)
- [ ] 375px (iPhone)
- [ ] 768px (tablet)
- [ ] 1024px (laptop)
- [ ] 1440px (desktop)
- [ ] 1920px (large desktop)
```

---

## Phase 7: Documentation & Handoff

### 7.1 Component Documentation
```markdown
## ComponentName

### Usage
\`\`\`jsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
\`\`\`

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Visual style |
| size | string | 'md' | Component size |

### Accessibility
- Keyboard: Enter/Space to activate
- Screen reader: Announces button label
```

### 7.2 Design Token Documentation
```
Update design-system/README.md with:
- New tokens added
- Deprecated tokens
- Migration guide for old values
```

---

## Quick Reference: UI Anti-Patterns to Avoid

| Anti-Pattern | Problem | Solution |
|-------------|---------|----------|
| Magic numbers | `margin: 13px` | Use spacing tokens |
| Hardcoded colors | `color: #3b82f6` | Use color tokens |
| Pixel-perfect obsession | Breaks on different screens | Use relative units |
| Hover-only interactions | Fails on touch | Add touch alternatives |
| `!important` overuse | Specificity wars | Refactor CSS architecture |
| Inline styles | Hard to maintain | CSS Modules or tokens |
| Missing loading states | Jarring UX | Always show loading feedback |
| No empty states | Confusing blank screens | Design empty state UI |

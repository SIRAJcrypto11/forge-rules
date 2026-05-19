# Chapter 5 — Animation & Micro-Interaction Laws

> Animation has ONE job: communicate state changes to users.  
> Animation is NOT decoration. It is functional.  
> Every animation must answer: "What just happened?"  
> Overuse = noise. Underuse = confusion.  
> The best animations feel inevitable, not surprising.

---

## 5.1 — Timing Tokens

**Rule: Use ONLY these values. Never invent new durations.**

```css
/* src/styles/tokens.css */

/* Duration tokens */
--duration-instant:    80ms;   /* micro feedback: button press, checkbox */
--duration-fast:      150ms;   /* hover states, small transitions */
--duration-normal:    250ms;   /* standard UI transitions */
--duration-slow:      400ms;   /* page transitions, modals, drawers */
--duration-slower:    600ms;   /* complex reveals, charts, counters */
--duration-deliberate:800ms;   /* onboarding, celebrations, first-run */

/* Easing tokens */
--ease-standard:   cubic-bezier(0.4, 0.0, 0.2, 1);   /* most UI — balanced */
--ease-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);   /* enter — starts fast */
--ease-accelerate: cubic-bezier(0.4, 0.0, 1.0, 1);   /* exit — ends fast */
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1); /* bounce — overshoot */
--ease-sharp:      cubic-bezier(0.4, 0.0, 0.6, 1);   /* tooltips, snappy */
```

**When to use each easing:**

| Easing | Use for | Why |
|--------|---------|-----|
| standard | Most UI transitions | Balanced feel |
| decelerate | Elements entering the screen | Starts fast (responsive), slows to rest |
| accelerate | Elements leaving the screen | Starts slow, exits quickly |
| spring | Toggles, notifications, likes | Feels alive, tactile |
| sharp | Tooltips, context menus | Snappy, no lingering |

---

## 5.2 — Interaction Response Map

**Every interaction type has a required visual response. No exceptions.**

### Hover
```css
/* Background color shift */
transition: background-color var(--duration-fast) var(--ease-standard);

/* Shadow lift (for cards) */
transition: box-shadow var(--duration-fast) var(--ease-standard),
            transform var(--duration-fast) var(--ease-standard);

/* Rules */
/* ✓ Background: 150ms ease-standard */
/* ✓ Shadow: lift with 150ms ease */
/* ✓ Border: color shift 150ms */
/* ✗ NEVER scale on hover in tables (causes layout shift) */
/* ✓ Cursor: pointer for ALL clickable elements */
```

### Press / Click
```css
/* Tactile press feel */
.button:active {
  transform: scale(0.98);
  transition: transform var(--duration-instant) var(--ease-standard);
}

/* Release */
.button:not(:active) {
  transform: scale(1);
  transition: transform var(--duration-fast) var(--ease-standard);
}

/* Rules */
/* ✓ Scale down: 98% at 80ms — "tactile press" */
/* ✓ Scale up: 100% at 150ms — release */
/* ✓ Background: darken 80ms */
/* Optional: Ripple effect 400ms from click origin */
```

### Focus (Keyboard)
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  transition: outline-color var(--duration-instant) var(--ease-standard);
}

/* Remove for mouse, keep for keyboard */
:focus:not(:focus-visible) {
  outline: none;
}

/* Rules */
/* ✓ Ring appear: 100ms */
/* ✓ Ring color: accent color */
/* ✓ Ring width: 2px ring + 2px offset */
/* ✗ NEVER remove focus ring for keyboard users */
/* ✗ NEVER use outline: none without a replacement */
```

### Disabled State
```css
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Rules */
/* ✓ Opacity: 50% */
/* ✓ Cursor: not-allowed */
/* ✗ No hover effects on disabled elements */
/* ✗ No click handlers on disabled elements */
```

### Loading State
```css
/* Spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Rules */
/* ✓ Transition: 150ms fade from default to loading state */
/* ✓ Width: preserved (no layout shift) */
/* ✓ aria-busy="true" on the loading element */
/* ✓ Spinner: rotate 1s linear infinite */
```

---

## 5.3 — State Transition Animations

### Elements Entering (Appear)

```css
/* Default enter */
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.enter-default {
  animation: fadeSlideIn var(--duration-normal) var(--ease-decelerate);
}

/* Card enter */
@keyframes cardEnter {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}
.enter-card {
  animation: cardEnter var(--duration-normal) var(--ease-decelerate);
}

/* Modal enter */
@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
.enter-modal {
  animation: modalEnter var(--duration-slow) var(--ease-spring);
}

/* Drawer enter (from right) */
@keyframes drawerEnterRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
.enter-drawer-right {
  animation: drawerEnterRight 350ms var(--ease-decelerate);
}

/* Toast enter */
@keyframes toastEnter {
  from { opacity: 0; transform: translateY(8px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.enter-toast {
  animation: toastEnter var(--duration-slow) var(--ease-spring);
}

/* Dropdown enter */
@keyframes dropdownEnter {
  from { opacity: 0; transform: scale(0.95) translateY(-4px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.enter-dropdown {
  animation: dropdownEnter var(--duration-fast) var(--ease-sharp);
}

/* Tooltip enter */
@keyframes tooltipEnter {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}
.enter-tooltip {
  animation: tooltipEnter 100ms var(--ease-sharp);
}
```

### Elements Exiting (Disappear)

```css
/* Default exit */
@keyframes fadeSlideOut {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(4px); }
}
.exit-default {
  animation: fadeSlideOut 200ms var(--ease-accelerate);
}

/* Modal exit */
@keyframes modalExit {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.97); }
}
.exit-modal {
  animation: modalExit 200ms var(--ease-accelerate);
}

/* Toast exit */
@keyframes toastExit {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(8px); }
}
.exit-toast {
  animation: toastExit 200ms var(--ease-accelerate);
}
```

### Skeleton → Content Transition

```css
/* Rule: Skeleton fades out, content fades in at same position */
/* Rule: No layout shift during transition */

.skeleton-exit {
  animation: fadeOut 200ms var(--ease-standard) forwards;
}

.content-enter {
  animation: fadeIn 250ms var(--ease-decelerate) 50ms both;
  /* 50ms delay: wait for skeleton to start fading */
}

@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

### Number Counting (KPI Cards, Metrics)

```js
// When a KPI value changes, count from old to new
// Duration: 600ms ease-decelerate
// Highlight: bg flash (accent-light pulse) 300ms on change

function useCountUp(target, duration = 600) {
  const [count, setCount] = useState(target)
  const prevTarget = useRef(target)

  useEffect(() => {
    if (prevTarget.current === target) return

    const start = prevTarget.current
    const end = target
    const startTime = performance.now()

    function update(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-decelerate approximation
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(start + (end - start) * eased))

      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
    prevTarget.current = target
  }, [target, duration])

  return count
}
```

### List Items Stagger

```js
// Items entering a list: stagger 30ms per item
// Max stagger: 200ms total (cap at ~6 items)
// Animation: fade + translateY(-6px → 0)

function StaggeredList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item.id}
          style={{
            animationDelay: `${Math.min(index * 30, 200)}ms`,
            animationFillMode: 'both'
          }}
          className="animate-stagger-item"
        >
          <ItemComponent item={item} />
        </li>
      ))}
    </ul>
  )
}

/* CSS */
@keyframes staggerItem {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-stagger-item {
  animation: staggerItem var(--duration-normal) var(--ease-decelerate);
}
```

---

## 5.4 — Page Transitions

```
RULE: The shell (sidebar, topbar) NEVER animates on navigation.
RULE: Only the content area transitions.
RULE: Content fades out 150ms, new content fades in 250ms.
RULE: No slide transitions between pages (too heavy, disorienting).
RULE: Total page transition budget: ≤ 400ms perceived.
```

**React implementation with Framer Motion:**

```jsx
// src/components/layout/PageTransition.jsx
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: -8 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.25, ease: [0.0, 0.0, 0.2, 1] } },
  exit:    { opacity: 0, y: 8,  transition: { duration: 0.15, ease: [0.4, 0.0, 1.0, 1] } }
}

export function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

**CSS-only alternative (no Framer Motion):**

```css
/* Content area only */
.page-content {
  animation: pageEnter var(--duration-normal) var(--ease-decelerate);
}

@keyframes pageEnter {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 5.5 — Micro-Interaction Patterns

### Form Field Focus
```css
/* Label floats up when field is focused or has value */
.field-label {
  transition: transform var(--duration-normal) var(--ease-standard),
              font-size var(--duration-normal) var(--ease-standard),
              color var(--duration-fast) var(--ease-standard);
}

.field-input:focus ~ .field-label,
.field-input:not(:placeholder-shown) ~ .field-label {
  transform: translateY(-100%) scale(0.875);
  color: var(--color-accent);
}

/* Border animates to accent on focus */
.field-input {
  transition: border-color var(--duration-fast) var(--ease-standard),
              box-shadow var(--duration-fast) var(--ease-standard);
}
.field-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-light);
}
```

### Form Validation Feedback
```css
/* Error: shake animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}

.field-error {
  animation: shake 400ms var(--ease-standard);
  border-color: var(--color-danger) !important;
  box-shadow: 0 0 0 3px var(--color-danger-light) !important;
}

/* Error message slides down */
@keyframes errorSlideDown {
  from { opacity: 0; transform: translateY(-4px); max-height: 0; }
  to   { opacity: 1; transform: translateY(0); max-height: 40px; }
}
.error-message {
  animation: errorSlideDown var(--duration-fast) var(--ease-decelerate);
}

/* Success: border turns green + checkmark fades in */
.field-success {
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px var(--color-success-light);
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
}
```

### Toggle / Switch
```css
.switch-thumb {
  transition: transform 200ms var(--ease-spring);
}
.switch-track {
  transition: background-color 200ms var(--ease-standard);
}
.switch:checked .switch-thumb {
  transform: translateX(20px); /* adjust to switch width */
}
.switch:checked .switch-track {
  background-color: var(--color-accent);
  /* Optional: subtle glow */
  box-shadow: 0 0 0 2px var(--color-accent-light);
}
```

### Checkbox
```css
/* Check mark draws with stroke-dashoffset */
.checkbox-check {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  transition: stroke-dashoffset 200ms var(--ease-standard) 50ms;
}
.checkbox:checked .checkbox-check {
  stroke-dashoffset: 0;
}

/* Background fill */
.checkbox-bg {
  transition: background-color 150ms var(--ease-standard),
              border-color 150ms var(--ease-standard);
}
.checkbox:checked .checkbox-bg {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}
```

### Accordion / Collapse
```css
/* Use CSS grid trick for smooth height animation */
/* This avoids animating height directly (layout property) */

.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-slow) var(--ease-standard);
}
.accordion-content.open {
  grid-template-rows: 1fr;
}
.accordion-inner {
  overflow: hidden;
}

/* Chevron rotation */
.accordion-chevron {
  transition: transform 250ms var(--ease-standard);
}
.accordion.open .accordion-chevron {
  transform: rotate(180deg);
}
```

### Progress Bar
```css
/* Fill animates from 0 to value on mount */
@keyframes progressFill {
  from { width: 0%; }
  to   { width: var(--progress-value); }
}
.progress-fill {
  animation: progressFill var(--duration-slower) var(--ease-decelerate);
  animation-fill-mode: both;
}

/* Loading stripes */
@keyframes progressStripes {
  from { background-position: 0 0; }
  to   { background-position: 40px 0; }
}
.progress-loading {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255,255,255,0.15) 10px,
    rgba(255,255,255,0.15) 20px
  );
  animation: progressStripes 1s linear infinite;
}
```

### Notification Dot
```css
/* Appear with spring bounce */
@keyframes dotAppear {
  from { transform: scale(0); }
  to   { transform: scale(1); }
}
.notification-dot {
  animation: dotAppear 400ms var(--ease-spring);
}

/* Pulse for urgent notifications */
@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.3); opacity: 0.7; }
}
.notification-dot.urgent {
  animation: dotPulse 1.5s ease-in-out infinite;
}

/* Disappear */
.notification-dot.removing {
  animation: dotAppear 200ms var(--ease-accelerate) reverse;
}
```

### Drag and Drop
```css
/* Dragging item */
.dragging {
  transform: scale(1.02);
  box-shadow: var(--shadow-xl);
  opacity: 0.9;
  transition: transform 100ms, box-shadow 100ms;
  cursor: grabbing;
  z-index: 1000;
}

/* Drop target highlight */
.drop-target {
  background-color: var(--color-accent-light);
  border: 2px dashed var(--color-accent);
  transition: background-color 100ms, border-color 100ms;
}

/* Drop success: item snaps to position */
.drop-success {
  animation: snapToPosition 300ms var(--ease-spring);
}
@keyframes snapToPosition {
  from { transform: scale(1.02); }
  to   { transform: scale(1); }
}
```

### Like / Heart / Star
```css
/* Activate: scale up with spring + color fill */
@keyframes heartActivate {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.4); }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}
.heart.active {
  animation: heartActivate 400ms var(--ease-spring);
  color: var(--color-danger);
}

/* Particle burst (CSS only approximation) */
/* For full particle effect, use a JS library */
```

### Button Loading State
```css
/* Spinner replaces text with cross-fade */
.button-text {
  transition: opacity var(--duration-fast) var(--ease-standard);
}
.button.loading .button-text {
  opacity: 0;
}
.button-spinner {
  position: absolute;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-standard);
}
.button.loading .button-spinner {
  opacity: 1;
}

/* Width locked to prevent layout shift */
.button.loading {
  width: var(--button-width); /* set via JS on first render */
}

/* Success state: checkmark scales in */
@keyframes checkmarkIn {
  from { transform: scale(0) rotate(-45deg); opacity: 0; }
  to   { transform: scale(1) rotate(0deg); opacity: 1; }
}
.button-checkmark {
  animation: checkmarkIn 250ms var(--ease-spring);
}
```

### Delete Animation
```css
/* Row/card fades out + collapses */
@keyframes deleteRow {
  0%   { opacity: 1; transform: scale(1); max-height: 100px; }
  50%  { opacity: 0; transform: scale(0.95); }
  100% { opacity: 0; max-height: 0; padding: 0; margin: 0; }
}
.row.deleting {
  animation: deleteRow 300ms var(--ease-accelerate) forwards;
  overflow: hidden;
}
```

---

## 5.6 — Scroll Animations

```
RULE: Use IntersectionObserver, NEVER scroll events.
RULE: Animation trigger: 80% of element visible.
RULE: Animation plays ONCE only (no repeat on re-scroll).
RULE: Stagger sections on the page: 60ms per section.
```

```js
// src/hooks/useIntersection.js
export function useIntersection(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // Play once only
        }
      },
      {
        threshold: options.threshold ?? 0.8, // 80% visible
        rootMargin: options.rootMargin ?? '0px'
      }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options.threshold, options.rootMargin])

  return isVisible
}

// Usage:
function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const isVisible = useIntersection(ref)

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={isVisible ? 'animate-section-enter' : 'opacity-0'}
    >
      {children}
    </div>
  )
}
```

```css
/* On-enter animation */
@keyframes sectionEnter {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-section-enter {
  animation: sectionEnter 400ms var(--ease-decelerate) both;
}

/* Chart bars grow from bottom */
@keyframes barGrow {
  from { transform: scaleY(0); transform-origin: bottom; }
  to   { transform: scaleY(1); transform-origin: bottom; }
}
.chart-bar {
  animation: barGrow var(--duration-slower) var(--ease-decelerate) 100ms both;
}
```

---

## 5.7 — Animation Anti-Patterns (Forbidden)

```
✗ Animations > 800ms on any interaction
  → Feels laggy, breaks the "instant" contract

✗ Bouncing that has no semantic meaning
  → Animation must communicate state, not decorate

✗ Animating on every re-render
  → Performance killer — use animation-fill-mode: both

✗ CSS transitions on layout properties
  → NEVER animate: width, height, top, left, margin, padding
  → ALWAYS use: transform and opacity (GPU-composited)

✗ Animating non-GPU properties
  → top, left → use transform: translate()
  → width, height → use transform: scale() or grid-template-rows trick

✗ Multiple animations competing for attention simultaneously
  → One animation at a time per viewport area

✗ Looping animations on static content
  → Only for intentional loading states (shimmer, spinner)

✗ Animation that can't be turned off
  → prefers-reduced-motion MUST be respected
```

---

## 5.8 — Accessibility: prefers-reduced-motion

**This rule MUST exist in every project's global CSS. Non-negotiable.**

```css
/* src/styles/global.css */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* For components that need to know about reduced motion in JS */
/* src/hooks/useReducedMotion.js */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
```

---

## 5.9 — Tailwind Animation Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        'instant': '80ms',
        'fast':    '150ms',
        'normal':  '250ms',
        'slow':    '400ms',
        'slower':  '600ms',
      },
      transitionTimingFunction: {
        'standard':   'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'decelerate': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'accelerate': 'cubic-bezier(0.4, 0.0, 1.0, 1)',
        'spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'sharp':      'cubic-bezier(0.4, 0.0, 0.6, 1)',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'shimmer':   'shimmer 1.5s ease-in-out infinite',
        'fade-in':   'fadeIn 250ms ease-decelerate both',
        'slide-up':  'slideUp 300ms ease-spring both',
        'scale-in':  'scaleIn 250ms ease-decelerate both',
      },
    },
  },
}
```

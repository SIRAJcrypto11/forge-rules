# Code Review Checklist

> Use this checklist when reviewing any PR.  
> Mark `[BLOCKING]` issues that must be fixed before merge.  
> Mark `[SUGGESTION]` for improvements that are recommended but not required.

---

## Architecture

```
□ No cross-feature imports (features/ never imports from features/)
□ No business logic in components (math, filtering, sorting in JSX)
□ No API calls in components (only in services/, called via hooks)
□ No circular imports
□ No magic numbers outside config/
□ No hardcoded route strings outside config/routes.js
□ No hardcoded colors outside config/theme.js
□ Import paths use @/ alias (no ../../.. relative paths)
□ Files are within line limits:
    Page: ≤ 200 lines
    Feature component: ≤ 150 lines
    UI primitive: ≤ 120 lines
    Hook: ≤ 100 lines
    Util function: ≤ 30 lines
□ No useState for derived data (should be useMemo)
□ No useEffect for derived data (should be useMemo)
□ Props not drilled more than 3 levels
```

---

## Component Quality

```
□ Loading state handled (skeleton, not spinner)
□ Empty state handled (with CTA if actionable)
□ Error state handled (with retry button)
□ All props explicitly named (no ...props spread abuse)
□ Optional props have default values
□ Event handlers use useCallback
□ Derived values use useMemo
□ No anonymous functions in JSX (onClick={() => fn(id)} → useCallback)
□ No inline style={{ }} (use Tailwind classes)
□ No more than 3 levels of JSX nesting without extraction
□ Component anatomy follows the 9-block structure
```

---

## Design System

```
□ All colors use CSS tokens (no hardcoded hex)
□ All spacing uses 4px grid values
□ All font sizes from the defined scale
□ Only 3 font weights used (400, 500/600, 700)
□ Icons from Lucide React only (named imports)
□ Icon + text gap is 8px
□ Touch targets ≥ 44×44px
□ No horizontal scroll at 375px viewport
```

---

## Animation

```
□ No animations > 800ms on interactions
□ Only transform and opacity animated (not layout properties)
□ prefers-reduced-motion respected
□ No looping animations on static content
□ Page transitions only animate content area (not shell)
```

---

## Performance

```
□ Lists > 100 items use virtualization
□ No import * from any library
□ No moment.js (use date-fns)
□ No lodash (use native JS)
□ Feature pages use React.lazy()
□ Images have width + height attributes
□ Images below fold use loading="lazy"
```

---

## Security

```
□ No hardcoded API keys or secrets
□ dangerouslySetInnerHTML uses DOMPurify sanitization
□ External URLs validated for safe protocols
□ No sensitive data in localStorage
□ No console.log statements
□ npm audit passes (no CRITICAL/HIGH)
```

---

## Accessibility

```
□ All interactive elements keyboard accessible
□ Focus ring visible on all interactive elements
□ All images have alt text (empty string for decorative)
□ All form inputs have visible labels (not just placeholder)
□ Error messages use role="alert" or aria-live
□ Buttons have descriptive text or aria-label
□ Color not the only way to convey information
□ Dynamic content changes announced (aria-live)
□ Modal has focus trap
```

---

## Dark Mode

```
□ All colors use CSS tokens (works in both themes)
□ No hardcoded colors that would break in dark mode
□ Tested visually in dark mode
```

---

## Testing

```
□ New utils functions have unit tests
□ New hooks have hook tests
□ New components have component tests
□ Tests cover: happy path, empty state, error state
□ No tests that always pass (testing nothing)
□ Test names describe behavior ("shows X when Y")
```

---

## UX Writing

```
□ No vague error messages ("Something went wrong" alone)
□ No generic CTAs ("OK", "Submit", "Yes")
□ Numbers are formatted (not raw integers)
□ Empty states have a call to action
□ Error messages explain what happened + what to do
```

---

## Git

```
□ Commit messages follow Conventional Commits format
□ PR title follows Conventional Commits format
□ PR description filled out (what, why, how, testing)
□ PR size ≤ 800 lines changed
□ No .env files committed
□ No node_modules committed
□ No commented-out code
```

---

## Review Comment Format

When leaving feedback, use these prefixes:

```
[BLOCKING]   — Must fix before merge
[SUGGESTION] — Recommended but not required
[QUESTION]   — Needs clarification
[NITPICK]    — Minor style, author's discretion
[PRAISE]     — Good pattern worth noting
```

Example:
```
[BLOCKING] This violates Iron Law #2 — business logic in component.
The `calcTotalRevenue` call on line 34 should be in `useRevenue` hook.

[SUGGESTION] Consider adding useMemo here since `filteredItems` 
filters a potentially large array on every render.

[NITPICK] Variable name `d` on line 67 is unclear. 
Consider `discountRate` for readability.
```

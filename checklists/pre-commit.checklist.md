# Pre-Commit Checklist

> Run this before EVERY commit. Takes 2 minutes. Saves hours of review back-and-forth.

---

## Code Quality

```
□ No console.log statements in any changed file
  → Search: grep -r "console.log" src/
  → Exception: intentional debug logs with // DEBUG comment (remove before PR)

□ No TODO comments without a ticket reference
  → ✓ // TODO [INV-142]: Add pagination when list > 100 items
  → ✗ // TODO: fix this later

□ No commented-out code
  → If you're keeping it "just in case": delete it. Git history has it.

□ No hardcoded values outside config/
  → No magic numbers in components or hooks
  → No hardcoded colors (hex values) in JSX or CSS
  → No hardcoded route strings outside config/routes.js

□ No inline style={{ }} in JSX
  → Use Tailwind classes or CSS tokens

□ All files within line limits
  → Page: ≤ 200 lines
  → Feature component: ≤ 150 lines
  → UI primitive: ≤ 120 lines
  → Hook: ≤ 100 lines
```

---

## Architecture

```
□ No cross-feature imports
  → features/X never imports from features/Y

□ No business logic in components
  → No .filter(), .reduce(), .sort() in JSX render
  → No calculations in component body

□ No API calls in components
  → No fetch() or axios in component files
  → All API calls go through services/ → hooks/ → components

□ No useState for derived data
  → If it can be computed: use useMemo

□ No useEffect for derived data
  → useEffect is for side effects only
```

---

## Component Completeness

```
□ Loading state implemented (skeleton, not spinner)
□ Empty state implemented (with CTA if actionable)
□ Error state implemented (with retry button)
□ All event handlers use useCallback
□ All derived values use useMemo
□ All interactive elements have aria attributes
□ Optional props have default values
```

---

## Security

```
□ No API keys or secrets in code
□ No sensitive data in console.log
□ dangerouslySetInnerHTML uses DOMPurify (if used at all)
□ User-supplied URLs validated before use
□ .env file not staged (check: git status)
```

---

## Tests

```
□ New utils functions have unit tests
□ New hooks have hook tests
□ New components have component tests (all 4 states)
□ All existing tests still pass: npm run test
```

---

## Git

```
□ Staged only the files you intended to change
  → Review: git diff --staged
  → Never: git add . without reviewing

□ Commit message follows Conventional Commits format
  → feat(scope): description
  → fix(scope): description
  → chore(scope): description

□ Commit message subject line ≤ 72 characters
□ No merge commits (use rebase if needed)
```

---

## Quick Commands

```bash
# Check for console.log
grep -r "console.log" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"

# Check for hardcoded colors
grep -r "#[0-9a-fA-F]\{3,6\}" src/ --include="*.jsx" --include="*.tsx"

# Run tests
npm run test -- --run

# Run lint
npm run lint

# Check what's staged
git diff --staged --stat
```

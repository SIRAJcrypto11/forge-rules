# FORGE WORKFLOW: DEBUG & INVESTIGATE
**Systematic root-cause debugging. No guessing. No random fixes.**

---

## THE IRON LAW OF DEBUGGING

**NEVER fix a bug without first understanding its root cause.**

A fix without understanding is a guess. Guesses create new bugs.
Every bug has a root cause. Find it. Fix it. Prevent it from happening again.

---

## DEBUG PROTOCOL (5 Phases)

### PHASE 1 — REPRODUCE

```
Before touching any code:

□ Can you reproduce the bug consistently?
  → If no: gather more information. Don't fix what you can't reproduce.

□ What are the exact steps to reproduce?
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
  Expected: [what should happen]
  Actual: [what actually happens]

□ What is the environment?
  → Browser + version
  → OS + version
  → Screen size
  → Network speed
  → User role/permissions
  → Data state (what data exists when bug occurs)

□ When did it start?
  → Was it always broken, or did it regress?
  → If regression: what changed? (git log --since="[date]")
```

---

### PHASE 2 — ISOLATE

```
Narrow down WHERE the bug lives:

□ Is it a UI bug (wrong display) or a logic bug (wrong data)?
  → UI bug: check component rendering, CSS, state
  → Logic bug: check utils, hooks, services

□ Is it a data bug (wrong data) or a rendering bug (right data, wrong display)?
  → Add console.log(data) temporarily to verify data shape
  → If data is correct: bug is in rendering
  → If data is wrong: bug is in data layer

□ Which layer is the bug in?
  Layer 1 (config): wrong constant value
  Layer 2 (types): wrong type definition
  Layer 3 (data): wrong sample data
  Layer 4 (utils): wrong calculation or formatting
  Layer 5 (hooks): wrong state management
  Layer 6 (services): wrong API call or response handling
  Layer 7 (components): wrong rendering or event handling
  Layer 8 (features): wrong orchestration

□ Can you reproduce in isolation?
  → Create a minimal reproduction (remove everything unrelated)
  → If bug disappears in isolation: it's an interaction bug
```

---

### PHASE 3 — HYPOTHESIZE

```
Form exactly 3 hypotheses. No more, no less.

HYPOTHESIS 1: [Most likely cause]
  Evidence for: [why you think this]
  Evidence against: [why it might not be this]
  Test: [how to verify]

HYPOTHESIS 2: [Second most likely cause]
  Evidence for: [why you think this]
  Evidence against: [why it might not be this]
  Test: [how to verify]

HYPOTHESIS 3: [Third most likely cause]
  Evidence for: [why you think this]
  Evidence against: [why it might not be this]
  Test: [how to verify]

TEST EACH HYPOTHESIS:
  → Test H1 first (most likely)
  → If H1 is wrong: test H2
  → If H2 is wrong: test H3
  → If all 3 are wrong: go back to Phase 2 (you missed something)

STOP RULE: If you've tried 3 fixes and the bug persists,
           STOP. You don't understand the root cause.
           Go back to Phase 1 and start over.
```

---

### PHASE 4 — FIX

```
Once root cause is confirmed:

□ Write the fix
□ Verify the fix resolves the bug
□ Verify the fix doesn't break anything else (run tests)
□ Write a regression test that would have caught this bug

REGRESSION TEST TEMPLATE:
  it('does not [reproduce the bug]', () => {
    // Setup: the exact conditions that caused the bug
    // Action: the exact action that triggered the bug
    // Assert: the bug does not occur
  })

□ Document the root cause in the commit message:
  fix(inventory): prevent crash when product has no category
  
  Root cause: ProductCard.jsx assumed product.category was always
  defined. When importing products from CSV, category field was
  optional and could be null.
  
  Fix: Added null check in formatCategory() util.
  Added regression test for null category.
  
  Closes #142
```

---

### PHASE 5 — PREVENT

```
After fixing, ask: "How do we prevent this class of bug?"

□ Is this a null safety issue?
  → Add null guards to all similar functions
  → Add TypeScript or JSDoc types

□ Is this a missing test?
  → Add the test that would have caught it
  → Add similar tests for related functions

□ Is this an architecture issue?
  → Was business logic in the wrong layer?
  → Was data transformed in the wrong place?

□ Is this a type issue?
  → Was the data shape not documented?
  → Add JSDoc or TypeScript types

□ Document in ARCHITECTURE.md if it reveals a design gap
```

---

## COMMON BUG PATTERNS & FIXES

```
BUG: "Cannot read property 'X' of null/undefined"
ROOT CAUSE: Missing null check
FIX: Add guard: if (!data) return fallback
PREVENT: Add null guards to all util functions

BUG: "State is stale in event handler"
ROOT CAUSE: Missing dependency in useCallback
FIX: Add missing dependency to useCallback deps array
PREVENT: Use ESLint exhaustive-deps rule

BUG: "Component re-renders infinitely"
ROOT CAUSE: Object/array created in render passed as prop/dependency
FIX: Move to useMemo or outside component
PREVENT: Never create objects/arrays inline in JSX

BUG: "API called twice on mount"
ROOT CAUSE: React StrictMode double-invokes effects in development
FIX: This is expected in dev. Add cleanup function to useEffect.
PREVENT: Always return cleanup from useEffect

BUG: "Old data shown after update"
ROOT CAUSE: Optimistic update not applied, or cache not invalidated
FIX: Apply optimistic update immediately, or refetch after mutation
PREVENT: Use React Query for server state management

BUG: "Form submits multiple times"
ROOT CAUSE: No isSubmitting guard on submit button
FIX: Disable button during submission
PREVENT: Always use isSubmitting state in form hooks

BUG: "Race condition: wrong data shown"
ROOT CAUSE: Multiple requests in flight, responses arrive out of order
FIX: Cancel previous request with AbortController
PREVENT: Always use AbortController in useEffect data fetching

BUG: "Memory leak: setState on unmounted component"
ROOT CAUSE: Async operation completes after component unmounts
FIX: Use cancelled flag or AbortController
PREVENT: Always clean up async operations in useEffect return

BUG: "Dark mode: element looks wrong"
ROOT CAUSE: Hardcoded color instead of CSS token
FIX: Replace with CSS token
PREVENT: Lint rule to ban hardcoded colors in components

BUG: "Layout shift when content loads"
ROOT CAUSE: Image without width/height, or skeleton wrong size
FIX: Add width/height to images, fix skeleton dimensions
PREVENT: Always specify image dimensions, match skeleton to content
```

---

## DEBUG PROMPT TEMPLATE

When asking AI to help debug:

```
"I have a bug. Help me find the root cause using the Forge Debug Protocol.

BUG DESCRIPTION:
[What is happening vs what should happen]

REPRODUCTION STEPS:
1. [Step 1]
2. [Step 2]
Expected: [expected]
Actual: [actual]

ENVIRONMENT:
Browser: [browser + version]
When it started: [always / after commit X / after change Y]

RELEVANT CODE:
[paste the relevant files or sections]

WHAT I'VE TRIED:
[list any fixes already attempted]

Run Phase 1-3 of the Debug Protocol.
Form 3 hypotheses. Test each one.
Do NOT suggest a fix until you've identified the root cause."
```

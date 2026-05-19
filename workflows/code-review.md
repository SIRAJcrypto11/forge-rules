# FORGE WORKFLOW: CODE REVIEW
**The complete review pipeline before any code merges.**

---

## WHEN TO USE

Run this workflow on every PR before merging.
Scale depth to PR size:
- Tiny fix (< 20 lines): Reviewer Agent only
- Feature (< 400 lines): Reviewer + Tester
- Major feature (> 400 lines): Full pipeline

---

## REVIEW PIPELINE

```
CODE CHANGES
     ↓
[Reviewer Agent]     → Architecture + Correctness + Performance
     ↓
[Security Agent]     → OWASP + STRIDE (for auth/data/API changes)
     ↓
[A11y Agent]         → WCAG AA (for UI changes)
     ↓
[Tester Agent]       → Coverage verification + missing tests
     ↓
[Performance Agent]  → Bundle size + render performance (for large changes)
     ↓
MERGE DECISION
```

---

## STEP 1 — REVIEWER AGENT

```
Activate: "Act as Forge Reviewer Agent"

Prompt: "Review this PR against Forge Rules v2.0.

Changed files:
[list all changed files]

Diff summary:
[paste git diff --stat output]

Run the full 6-phase review protocol:
1. Architecture compliance scan
2. Correctness review (null safety, race conditions, edge cases)
3. Performance review (re-renders, bundle, virtualization)
4. Security review (XSS, auth, input validation)
5. Accessibility review (keyboard, ARIA, contrast)
6. Test coverage review"

EXPECTED OUTPUT:
- Review report with BLOCKING/HIGH/MEDIUM/LOW issues
- Verdict: APPROVE / REQUEST CHANGES / NEEDS DISCUSSION
```

**Gate:** No BLOCKING issues. If BLOCKING issues found → fix → re-run.

---

## STEP 2 — SECURITY AGENT (conditional)

Run when PR touches: authentication, authorization, API endpoints, user input, file uploads, payments, or any data that could be sensitive.

```
Activate: "Act as Forge Security Agent"

Prompt: "Security audit for this PR.

Changed files: [list]
Feature description: [what this PR does]

Run:
1. OWASP Top 10 audit on changed code
2. STRIDE threat model for new features
3. Client-side security checklist
4. Dependency audit (any new packages added?)"

EXPECTED OUTPUT:
- Security audit report
- CRITICAL/HIGH/MEDIUM/LOW findings
- Verdict: SECURE / CONDITIONAL / BLOCKED
```

**Gate:** No CRITICAL or HIGH security findings.

---

## STEP 3 — A11Y AGENT (conditional)

Run when PR touches: any UI component, any form, any interactive element, any navigation.

```
Activate: "Act as Forge A11y Agent"

Prompt: "Accessibility audit for these UI changes.

Changed components: [list]

Run:
1. Automated scan checklist
2. Keyboard navigation verification
3. Screen reader announcement verification
4. Color contrast verification
5. Motion/animation verification"

EXPECTED OUTPUT:
- A11y audit report
- WCAG 2.1 AA compliance status
- Issues with fixes
```

**Gate:** No Critical or Serious a11y violations.

---

## STEP 4 — TESTER AGENT

```
Activate: "Act as Forge Tester Agent"

Prompt: "Verify test coverage for this PR.

Changed files: [list]

Check:
1. Do all new utils have unit tests? (100% required)
2. Do all new hooks have hook tests? (90% required)
3. Do all new components have component tests? (85% required)
4. Are all 4 states tested? (loading, empty, error, filled)
5. Is the critical user journey covered by E2E?

If tests are missing: write them."

EXPECTED OUTPUT:
- Test coverage report
- New tests written (if any were missing)
- All tests passing
```

**Gate:** Coverage targets met. All tests pass.

---

## STEP 5 — PERFORMANCE AGENT (conditional)

Run when PR: adds new dependencies, changes bundle structure, adds new lists/tables, or changes critical rendering paths.

```
Activate: "Act as Forge Performance Agent"

Prompt: "Performance audit for this PR.

Changed files: [list]
New dependencies added: [list or 'none']

Check:
1. Bundle size impact (before/after)
2. Any new re-render issues?
3. Any lists > 100 items without virtualization?
4. Any images without optimization?
5. Any expensive computations without useMemo?"

EXPECTED OUTPUT:
- Performance audit report
- Bundle size delta
- Issues with fixes
```

**Gate:** No performance regressions. Bundle within budget.

---

## MERGE DECISION

```
APPROVE if:
  □ Reviewer: No BLOCKING issues
  □ Security: No CRITICAL/HIGH findings (if applicable)
  □ A11y: No Critical/Serious violations (if applicable)
  □ Tester: Coverage targets met, all tests pass
  □ Performance: No regressions (if applicable)
  □ CI: All checks green (lint + test + build)

REQUEST CHANGES if:
  □ Any BLOCKING issue from Reviewer
  □ Any CRITICAL/HIGH from Security
  □ Any Critical/Serious from A11y
  □ Tests failing or coverage below target

NEEDS DISCUSSION if:
  □ Architecture decision that affects other modules
  □ Breaking change to public API
  □ Performance tradeoff that needs team input
```

---

## REVIEW COMMENT STANDARDS

```
[BLOCKING] src/features/inventory/components/ProductList.jsx, Line 34
Issue: Business logic (calcTotalValue) inside component render
Rule: Iron Law #2 — UI renders data, never creates it
Risk: Re-runs expensive calculation on every render
Fix:
  // Move to hook:
  const totalValue = useMemo(() => calcInventoryValue(products), [products])
  // Pass as prop to component

[HIGH] src/services/product.service.js, Line 12
Issue: API key hardcoded in service file
Rule: Chapter 13 — Security, env vars
Risk: Key exposed in git history, can be used by attackers
Fix:
  const API_KEY = import.meta.env.VITE_API_KEY

[SUGGESTION] src/hooks/useFilter.js, Line 45
Consider adding a debounce to the search handler.
Currently fires on every keystroke which may cause performance issues
with large datasets. See useDebounce hook in src/hooks/useDebounce.js.

[PRAISE] src/components/ui/Button.jsx
Excellent handling of all button states including the loading state
with locked width. This is exactly the pattern we want everywhere.
```

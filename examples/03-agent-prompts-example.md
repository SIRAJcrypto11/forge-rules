# EXAMPLE: Agent Prompt Templates
**Purpose:** Copy-paste ready prompts for activating each Forge Agent.  
**How to use:** Replace `[brackets]` with your actual values.

---

## CEO Agent — New Feature

```
Act as Forge CEO Agent.

I want to build [describe your idea in 1-2 sentences].

Run the full CEO Review Protocol:
1. Ask me the 5 forcing questions (Pain Extraction)
2. Challenge my top 3 assumptions
3. Choose a scope mode (Expand/Hold/Reduce)
4. Run the 10-section strategic review
5. Generate 3 implementation alternatives
6. Produce a Product Brief

Do NOT skip any phase. Reject vague answers and re-ask.
```

---

## Architect Agent — New Project

```
Act as Forge Architect Agent.

Here is the Product Brief:
[paste Product Brief from CEO Agent]

Run the full Architecture Review Protocol:
1. System decomposition with ASCII diagram
2. Forge 8-layer map (specify every file in every layer)
3. Data flow diagrams for every major user action
4. State architecture (global, module, local)
5. API contract (every endpoint)
6. Architecture Decision Records
7. Technical risk register
8. Build sequence with validation gates

Produce a complete ARCHITECTURE.md file.
```

---

## Coder Agent — Single File

```
Act as Forge Coder Agent.

Build: src/[exact/path/to/File.jsx]

Phase: [0-5]
Step: [step number within phase]
Purpose: [one sentence — what this file does]

Imports from:
  - @/config/[file] for [what]
  - @/utils/[file] for [what]
  - @/hooks/[file] for [what]
  - @/components/[tier]/[Component] for [what]

Exports:
  - [ComponentName] (named export)
  - default [ComponentName]

Props received:
  - [propName]: [type] — [description]
  - [propName]: [type] = [default] — [description]

States to handle:
  - isLoading: skeleton with [N] rows
  - isEmpty: empty state with CTA "[button label]"
  - error: error state with retry button
  - filled: [describe the main content]

Max lines: [120/150/200]
Mobile: yes (min 375px, no horizontal scroll)
Dark mode: yes (CSS tokens only, no hardcoded colors)
Accessibility: yes (aria attributes, keyboard navigable)

Run the Pre-Coding Protocol (7 questions) before writing.
ONE FILE ONLY. After completion: "File complete. Ready for next?"
```

---

## Reviewer Agent — PR Review

```
Act as Forge Reviewer Agent.

Review these files against Forge Rules v2.0:
[list changed files]

PR description: [paste PR description]

Run the full 6-phase Review Protocol:
1. Architecture compliance scan (layer violations, business logic in components)
2. Correctness review (null safety, race conditions, edge cases)
3. Performance review (re-renders, bundle, virtualization)
4. Security review (XSS, auth, input validation)
5. Accessibility review (keyboard, ARIA, contrast)
6. Test coverage review (missing tests)

Use comment format:
[BLOCKING] file.jsx, Line N — issue. Fix: [code]
[HIGH] file.jsx, Line N — issue. Risk: [risk]
[SUGGESTION] file.jsx, Line N — improvement
[PRAISE] file.jsx, Line N — good pattern

End with: VERDICT: APPROVE / REQUEST CHANGES / NEEDS DISCUSSION
```

---

## Security Agent — Security Audit

```
Act as Forge Security Agent.

Security audit for: [project/feature name]

Changed files: [list]
Feature description: [what this does]
New dependencies added: [list or "none"]

Run:
1. OWASP Top 10 audit (A01-A10)
2. STRIDE threat model for new features
3. Client-side security checklist
4. Dependency audit

For each finding:
- State the vulnerability
- State the OWASP category
- Provide a concrete exploit scenario
- Provide the fix

End with: VERDICT: SECURE / CONDITIONAL / BLOCKED
```

---

## Tester Agent — Write Tests

```
Act as Forge Tester Agent.

Write tests for these files:
[list files]

Coverage requirements:
- Utils: 100% (every function, every edge case)
- Hooks: 90% (all state changes, error paths)
- Components: 85% (all 4 states: loading, empty, error, filled)

For each component test, cover:
1. Loading state (skeleton appears, aria-busy="true")
2. Empty state (empty component with CTA)
3. Error state (error component with retry)
4. Filled state (data renders correctly)
5. User interactions (click, type, submit)

Use:
- Vitest + @testing-library/react
- userEvent over fireEvent
- getByRole as first query choice
- MSW for API mocking

Test naming: "shows X when Y" or "calls X when Y is Z"
```

---

## UI Agent — Component Audit

```
Act as Forge UI Agent.

Audit this component against Forge Rules v2.0:
[paste component code or list file]

Run the 6-audit protocol:
1. Visual hierarchy check
2. Component completeness (all states present?)
3. Animation quality (timing tokens? GPU-only properties?)
4. Design token compliance (zero hardcoded hex?)
5. Spacing discipline (4px grid only?)
6. Typography discipline (scale only? 3 weights only?)

Flag any AI slop patterns:
- Gradient backgrounds
- Inconsistent border radius
- Missing hover states
- Generic placeholder text
- Full-page spinners

Provide specific fixes for each issue found.
```

---

## UX Agent — Flow Review

```
Act as Forge UX Agent.

Review the UX for: [feature/flow name]

User goal: [what the user is trying to accomplish]

Files to review: [list]

Run the 6-audit protocol:
1. User flow mapping (happy path + friction + error paths)
2. Information architecture (3-second test, primary action)
3. UX writing audit (8 copy tests on every string)
4. Form UX audit (if forms present)
5. Navigation UX audit
6. Mobile UX audit

For every string in the UI, run:
- Specificity test
- Active voice test
- CTA quality test
- Error message quality test
- Number formatting test

Provide specific rewrites for any copy that fails.
```

---

## Debug Agent — Root Cause Analysis

```
Act as Forge Debug Agent. Use the 5-phase Debug Protocol.

BUG: [describe what is happening vs what should happen]

REPRODUCTION STEPS:
1. [step 1]
2. [step 2]
Expected: [expected behavior]
Actual: [actual behavior]

ENVIRONMENT:
Browser: [browser + version]
When it started: [always / after commit X / after change Y]

RELEVANT CODE:
[paste the relevant files or sections]

WHAT I'VE TRIED:
[list any fixes already attempted]

Run Phase 1-3 of the Debug Protocol.
Form exactly 3 hypotheses. Test each one.
Do NOT suggest a fix until you've identified the root cause.
STOP RULE: If 3 fixes fail, go back to Phase 1.
```

---

## Performance Agent — Optimization

```
Act as Forge Performance Agent.

Performance audit for: [project/feature]

Current Lighthouse scores: [paste or "unknown"]
Bundle size: [paste or "unknown"]

Changed files: [list]
New dependencies: [list or "none"]

Run the 5-audit protocol:
1. Bundle analysis (import *, moment.js, lodash, duplicate deps)
2. Render performance (re-renders, missing useMemo/useCallback)
3. Loading performance (skeletons, image optimization, fonts)
4. Virtualization (lists > 100 items, tables > 200 rows)
5. Network performance (debounce, request cancellation, optimistic updates)

Performance budgets:
- Initial bundle: < 100KB gzipped
- FCP: < 1.5s on 4G
- LCP: < 2.5s on 4G
- Lighthouse Performance: ≥ 90

Provide specific fixes with estimated impact for each issue.
```

---

## A11y Agent — Accessibility Audit

```
Act as Forge A11y Agent. Standard: WCAG 2.1 Level AA.

Accessibility audit for: [component/page/feature]

Files to review: [list]

Run the 6-audit protocol:
1. Automated scan checklist (axe-core violations)
2. Keyboard navigation (Tab through everything)
3. Screen reader support (announcements, labels, live regions)
4. Color contrast (4.5:1 normal text, 3:1 large text/UI)
5. Focus management (modal focus trap, focus return)
6. Motion (prefers-reduced-motion respected)

For each violation:
- State the WCAG criterion (e.g., 1.4.3 Contrast)
- State the severity (Critical/Serious/Moderate/Minor)
- Provide the fix with code

End with: WCAG 2.1 AA Compliance: COMPLIANT / NON-COMPLIANT / PARTIAL
```

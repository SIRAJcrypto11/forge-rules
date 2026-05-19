# FORGE WORKFLOW: NEW FEATURE
**The complete sprint from idea to shipped code.**

---

## WHEN TO USE THIS WORKFLOW

Use this workflow for every new feature, no matter how small.
The workflow scales — a small feature takes 2 hours, a large feature takes 2 weeks.
The steps are the same. The depth varies.

---

## THE SPRINT

```
THINK → PLAN → BUILD → REVIEW → TEST → SHIP
```

---

## STEP 1 — THINK (CEO Agent)

**Agent:** `agents/ceo.md`
**Input:** Feature idea or user request
**Output:** Product Brief

```
Activate: "Act as Forge CEO Agent"

Prompt: "I want to build [feature description]. 
         Run the full CEO Review Protocol."

The CEO Agent will:
1. Ask 5 forcing questions about the real pain
2. Challenge your assumptions
3. Choose a scope mode (Expand/Hold/Reduce)
4. Run the 10-section strategic review
5. Generate 3 implementation alternatives
6. Produce a Product Brief

DO NOT PROCEED until you have a Product Brief.
```

**Gate:** Product Brief exists with all 5 sections filled.

---

## STEP 2 — PLAN (Architect Agent)

**Agent:** `agents/architect.md`
**Input:** Product Brief from Step 1
**Output:** ARCHITECTURE.md

```
Activate: "Act as Forge Architect Agent"

Prompt: "Here is the Product Brief: [paste Product Brief]
         Run the full Architecture Review Protocol."

The Architect Agent will:
1. Map the system decomposition
2. Define the Forge 8-layer structure for this feature
3. Draw data flow diagrams for every major action
4. Define the state architecture
5. Define the API contract
6. Write Architecture Decision Records
7. Identify technical risks
8. Produce the build sequence plan

DO NOT PROCEED until you have ARCHITECTURE.md.
```

**Gate:** ARCHITECTURE.md exists with all 8 sections filled.

---

## STEP 3 — BUILD (Coder Agent)

**Agent:** `agents/coder.md`
**Input:** ARCHITECTURE.md from Step 2
**Output:** Working code

```
Activate: "Act as Forge Coder Agent"

Prompt: "Here is ARCHITECTURE.md: [paste or reference file]
         Build [specific file] following the build sequence.
         
         Current phase: [Phase N]
         Current step: [Step N]
         File to build: [exact/path/to/file.jsx]"

The Coder Agent will:
1. Run the Pre-Coding Protocol (7 questions)
2. Write the file with all required blocks
3. Handle all states (loading, empty, error, filled)
4. Follow all Forge Rules
5. Stay within line limits

BUILD ONE FILE AT A TIME.
After each file: "File complete. Ready for next?"
```

**Build sequence (from ARCHITECTURE.md):**
```
Phase 0: Foundation (config, types, utils, styles)
Phase 1: Data layer (calculators, sample data)
Phase 2: UI primitives (Button, Input, Modal, etc.)
Phase 3: Layout (AppShell, Sidebar, contexts)
Phase 4: Shared components (KPICard, DataTable, etc.)
Phase 5+: Feature modules (one at a time)
```

**Gate:** All files built, app runs without errors.

---

## STEP 4 — REVIEW (Reviewer Agent)

**Agent:** `agents/reviewer.md`
**Input:** All changed files
**Output:** Review report with issues

```
Activate: "Act as Forge Reviewer Agent"

Prompt: "Review these files against Forge Rules v2.0:
         [list changed files]
         
         Run the full Review Protocol:
         1. Architecture compliance scan
         2. Correctness review
         3. Performance review
         4. Security review
         5. Accessibility review
         6. Test coverage review"

The Reviewer Agent will:
1. Find all BLOCKING issues (must fix before merge)
2. Find all HIGH issues (should fix before merge)
3. Find MEDIUM and LOW issues
4. Produce a review report with verdict

FIX ALL BLOCKING ISSUES before proceeding.
```

**Gate:** Review report shows APPROVE or no BLOCKING issues.

---

## STEP 5 — TEST (Tester Agent)

**Agent:** `agents/tester.md`
**Input:** All changed files + review report
**Output:** Test suite + test report

```
Activate: "Act as Forge Tester Agent"

Prompt: "Write tests for these files:
         [list changed files]
         
         Coverage requirements:
         - Utils: 100%
         - Hooks: 90%
         - Components: 85%
         
         Include:
         - Unit tests for all utils
         - Hook tests for all hooks
         - Component tests for all components (all 4 states)
         - E2E test for the critical user journey"

The Tester Agent will:
1. Write unit tests for all utils
2. Write hook tests for all hooks
3. Write component tests (loading, empty, error, filled)
4. Write E2E test for the critical journey
5. Produce a test report

ALL TESTS MUST PASS before proceeding.
```

**Gate:** All tests pass, coverage meets targets.

---

## STEP 6 — SHIP (Git Workflow)

**Input:** Passing tests + approved review
**Output:** Merged PR

```
1. COMMIT:
   git add [specific files — not git add .]
   git commit -m "feat([scope]): [description]"
   
   Commit message format:
   feat(inventory): add bulk export to CSV
   fix(cart): prevent negative quantity on decrement

2. PUSH:
   git push -u origin feat/[feature-name]

3. PR:
   - Title: same as commit message
   - Description: use templates/PR-description.template.md
   - Assign reviewer
   - Link to Product Brief and ARCHITECTURE.md

4. MERGE:
   - After 1 approval
   - After CI passes (lint + tests + build)
   - After all BLOCKING review comments resolved
   - Delete branch after merge
```

**Gate:** PR merged to main, CI green.

---

## WORKFLOW CHECKLIST

```
□ Step 1: Product Brief exists (CEO Agent)
□ Step 2: ARCHITECTURE.md exists (Architect Agent)
□ Step 3: All files built, app runs (Coder Agent)
□ Step 4: No BLOCKING review issues (Reviewer Agent)
□ Step 5: All tests pass, coverage met (Tester Agent)
□ Step 6: PR merged, CI green (Git)

OPTIONAL (for significant features):
□ Security audit (Security Agent)
□ Performance audit (Performance Agent)
□ UX audit (UX Agent)
□ UI audit (UI Agent)
```

---

## WORKFLOW SHORTCUTS

**For tiny bug fixes (< 10 lines changed):**
```
Skip: CEO Agent, Architect Agent
Run: Coder Agent → Reviewer Agent → Ship
Minimum: 1 unit test for the fix
```

**For UI-only changes:**
```
Skip: CEO Agent, Architect Agent
Run: UI Agent → Coder Agent → Reviewer Agent → Ship
Minimum: Component test for changed component
```

**For new features (standard):**
```
Run all 6 steps in order.
```

**For major features (new module):**
```
Run all 6 steps + Security Agent + Performance Agent
```

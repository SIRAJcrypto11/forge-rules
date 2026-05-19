# FORGE WORKFLOW: DEVELOPER ONBOARDING
**Getting a new developer productive on a Forge Rules project in under 2 hours.**

---

## OVERVIEW

A new developer should be able to:
- Understand the project architecture in 30 minutes
- Make their first contribution in 2 hours
- Be fully productive in 1 week

This workflow makes that happen systematically.

---

## DAY 1 — ORIENTATION (2 hours)

### Hour 1: Read the Docs (30 min each)

```
STEP 1: Read ARCHITECTURE.md (30 min)
  □ Understand the system overview diagram
  □ Understand the 8-layer structure
  □ Understand the data models
  □ Understand the API contract
  □ Understand the build sequence
  □ Ask: "What is the most important thing to understand about this codebase?"

STEP 2: Read CONVENTIONS.md (15 min)
  □ Understand file naming rules
  □ Understand import order
  □ Understand naming conventions
  □ Understand git commit format

STEP 3: Read Forge Rules quick reference (15 min)
  □ Read rules/01-iron-laws.md (5 Iron Laws)
  □ Read rules/18-forbidden-list.md (what NOT to do)
  □ Skim full-rules-single-file.md headers
```

### Hour 2: Setup & First Run

```
STEP 4: Environment setup
  □ Clone repository
  □ Copy .env.example to .env
  □ Fill in .env values (get from team lead)
  □ npm install
  □ npm run dev → app runs without errors
  □ npm run test → all tests pass
  □ npm run lint → no lint errors

STEP 5: Codebase tour (with team lead or via self-guided)
  □ Open src/config/ — understand all constants and routes
  □ Open src/types/ — understand all data entities
  □ Open src/features/ — understand what modules exist
  □ Open one feature module — trace the data flow:
      [Module]Page.jsx → use[Module].js → [entity].service.js
  □ Open one component — identify all 9 blocks
  □ Open one test file — understand the test patterns

STEP 6: First task
  □ Pick a "good first issue" (labeled in GitHub)
  □ Read the issue completely
  □ Ask: "Which layer does this change belong to?"
  □ Ask: "Which files will I need to create or modify?"
  □ Ask: "What tests will I need to write?"
```

---

## WEEK 1 — RAMP UP

### Day 2-3: First PR

```
□ Work on the first issue
□ Follow the build sequence (don't skip layers)
□ Run pre-commit checklist before committing
□ Open PR using the PR template
□ Request review from team lead
□ Address all [BLOCKING] and [HIGH] review comments
□ Merge first PR
```

### Day 4-5: Forge Agent Familiarization

```
□ Use Coder Agent for one file:
  "Act as Forge Coder Agent. Build [file]."
  → Compare output to what you would have written
  → Note the differences

□ Use Reviewer Agent on your own code:
  "Act as Forge Reviewer Agent. Review [your file]."
  → Fix any BLOCKING issues found
  → Learn from the feedback

□ Use Tester Agent:
  "Act as Forge Tester Agent. Write tests for [your file]."
  → Review the generated tests
  → Understand the patterns
```

---

## ONBOARDING CHECKLIST (For Team Lead)

```
Before developer starts:
  □ GitHub access granted
  □ .env values prepared and ready to share
  □ "Good first issue" labeled and assigned
  □ Slack/communication channel access granted
  □ Staging environment access granted

Day 1:
  □ Walk through ARCHITECTURE.md together (30 min)
  □ Pair on environment setup if needed
  □ Answer questions about the codebase

Week 1:
  □ Review first PR within 24 hours
  □ Provide detailed feedback using [BLOCKING]/[HIGH]/[SUGGESTION] format
  □ Check in daily (5 min standup)

Week 2:
  □ Developer works independently
  □ Review PRs within 24 hours
  □ Introduce to Forge Agent system if not already done
```

---

## ONBOARDING CHECKLIST (For New Developer)

```
□ I can explain the 5 Iron Laws from memory
□ I can explain the 8-layer architecture
□ I know which layer a new file belongs to before creating it
□ I know the 9-block component anatomy
□ I know the naming conventions for files, variables, and functions
□ I know the git commit format
□ I know how to run tests and what coverage targets are
□ I know how to use at least 3 Forge Agents
□ I have merged at least 1 PR
□ I know who to ask when I'm stuck
□ I know where to find the Forge Rules documentation
```

---

## COMMON FIRST-WEEK MISTAKES

```
MISTAKE 1: Writing business logic in a component
  → Iron Law #2: UI renders data, never creates it
  → Fix: Move to hook or utils

MISTAKE 2: Importing from another feature module
  → Iron Law #3: Modules are islands
  → Fix: Create shared hook in src/hooks/ or shared component in src/components/shared/

MISTAKE 3: Using useState for derived data
  → Chapter 9: State Management
  → Fix: Use useMemo

MISTAKE 4: Skipping loading/empty/error states
  → Chapter 4: Component Architecture
  → Fix: Add all 3 states before marking component complete

MISTAKE 5: Hardcoding values
  → Chapter 18: Forbidden List
  → Fix: Add to src/config/constants.js

MISTAKE 6: Writing a test that always passes
  → Chapter 12: Testing
  → Fix: Test should fail when the behavior is broken

MISTAKE 7: Committing without running tests
  → checklists/pre-commit.checklist.md
  → Fix: npm run test -- --run before every commit
```

---

## FORGE RULES QUICK REFERENCE CARD

Print this and keep it visible:

```
┌─────────────────────────────────────────────────────────┐
│  FORGE RULES — QUICK REFERENCE                          │
│                                                         │
│  5 IRON LAWS:                                           │
│  1. One file = one responsibility                       │
│  2. UI renders data, never creates it                   │
│  3. Modules are islands (no cross-feature imports)      │
│  4. Show something instantly (skeleton in 100ms)        │
│  5. Every interaction has a response                    │
│                                                         │
│  8 LAYERS (import only from layers below):              │
│  8. features/    7. components/    6. services/         │
│  5. hooks/       4. utils/         3. data/             │
│  2. types/       1. config/                             │
│                                                         │
│  COMPONENT ANATOMY (9 blocks):                          │
│  1. External imports    6. Main component               │
│  2. Internal imports    7. Skeleton state               │
│  3. Shared components   8. Empty state                  │
│  4. Local constants     9. Default export               │
│  5. Sub-components                                      │
│                                                         │
│  LINE LIMITS:                                           │
│  Page: 200  Feature: 150  UI: 120  Hook: 100  Fn: 30   │
│                                                         │
│  NEVER:                                                 │
│  - useState for derived data (use useMemo)              │
│  - Hardcoded colors (use CSS tokens)                    │
│  - console.log in production                            │
│  - Anonymous functions in JSX (use useCallback)         │
└─────────────────────────────────────────────────────────┘
```

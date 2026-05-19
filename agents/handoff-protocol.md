# FORGE AGENT HANDOFF PROTOCOL
**How agent outputs feed into the next agent's inputs.**

---

## The Chain

```
CEO Agent
  ↓ produces: Product Brief
  ↓ input to: Architect Agent

Architect Agent
  ↓ produces: ARCHITECTURE.md
  ↓ input to: Coder Agent

Coder Agent
  ↓ produces: Source code files (one at a time)
  ↓ input to: Reviewer Agent

Reviewer Agent
  ↓ produces: Review report (APPROVE / REQUEST CHANGES)
  ↓ if APPROVE → input to: Tester Agent
  ↓ if REQUEST CHANGES → back to: Coder Agent

Tester Agent
  ↓ produces: Test suite + test report
  ↓ if PASS → input to: Ship workflow
  ↓ if FAIL → back to: Coder Agent

[Optional parallel agents — run alongside Coder/Reviewer]
UI Agent      → visual quality check
UX Agent      → user experience check
Security Agent → security audit
Performance Agent → performance audit
A11y Agent    → accessibility audit
```

---

## Handoff 1: CEO → Architect

**What CEO produces:**
```markdown
# PRODUCT BRIEF: [Name]
## The Real Problem
## The User
## The Solution
## What We're NOT Building
## Success Metrics (90 days)
## The Biggest Risk
## First 2-Week Milestone
## Handoff to Architect
```

**What Architect needs from it:**
- Domain entities and their relationships
- Key user flows (for data flow diagrams)
- Scope boundaries (what's NOT being built)
- Performance requirements
- Auth requirements

**Handoff prompt:**
```
Act as Forge Architect Agent.

Here is the Product Brief:
[paste entire Product Brief]

Build the complete ARCHITECTURE.md following the 8-phase protocol.
```

---

## Handoff 2: Architect → Coder

**What Architect produces:**
```
ARCHITECTURE.md containing:
- 8-layer file map (every file to create)
- Data models (all entities)
- API contract (all endpoints)
- State architecture
- Build sequence (Phase 0 → Phase N)
```

**What Coder needs from it:**
- Exact file path to build
- Which layer it belongs to
- What it imports from
- What it exports
- The build sequence order

**Handoff prompt:**
```
Act as Forge Coder Agent.

ARCHITECTURE.md is at: [path or paste content]

I am at: Phase [N], Step [N]
Build: [exact/path/to/file.jsx]

[paste the relevant section from ARCHITECTURE.md for this file]
```

---

## Handoff 3: Coder → Reviewer

**What Coder produces:**
- Source code files (one per session)
- File header with layer, purpose, imports, exports

**What Reviewer needs:**
- List of all changed files
- What the feature does (context)
- Any known tradeoffs made

**Handoff prompt:**
```
Act as Forge Reviewer Agent.

Review these files for Phase [N] completion:
[list all files built in this phase]

Feature context: [brief description]
Known tradeoffs: [any deliberate shortcuts]

Run the full 6-phase review protocol.
```

---

## Handoff 4: Reviewer → Coder (if changes needed)

**What Reviewer produces:**
```
[BLOCKING] file.jsx, Line N — issue. Fix: [code]
[HIGH] file.jsx, Line N — issue. Risk: [risk]
VERDICT: REQUEST CHANGES
```

**Handoff prompt:**
```
Act as Forge Coder Agent.

Fix these review issues in [file.jsx]:

[BLOCKING] Line 34: [issue description]
Required fix: [paste the fix from reviewer]

[HIGH] Line 67: [issue description]
Required fix: [paste the fix from reviewer]

Apply fixes one at a time. Confirm each fix before proceeding.
```

---

## Handoff 5: Reviewer → Tester (if approved)

**What Reviewer produces:**
```
VERDICT: APPROVE
[list of files reviewed]
[any notes for tester]
```

**Handoff prompt:**
```
Act as Forge Tester Agent.

These files were approved by the Reviewer Agent:
[list files]

Write tests for all of them.
Coverage requirements: utils 100%, hooks 90%, components 85%.
Every component test must cover all 4 states.
```

---

## Handoff 6: Tester → Ship

**What Tester produces:**
```
All tests passing: ✓
Coverage: utils 100%, hooks 92%, components 87%
VERDICT: PASS
```

**Handoff to ship workflow:**
```
Follow workflows/ship.md
Run pre-ship checklist
Commit with: feat([scope]): [description]
Push and open PR
```

---

## Parallel Agent Handoffs

These agents can run in parallel with the Coder/Reviewer:

### UI Agent (run after Coder, before Reviewer)
```
Act as Forge UI Agent.
Review the visual quality of: [list component files]
Flag any AI slop patterns.
```

### UX Agent (run after Coder, before Reviewer)
```
Act as Forge UX Agent.
Review the UX of: [feature name]
Focus on: [user flow, copy quality, form UX]
```

### Security Agent (run after Reviewer approves)
```
Act as Forge Security Agent.
Security audit for: [feature]
Changed files: [list]
```

### A11y Agent (run after Reviewer approves)
```
Act as Forge A11y Agent.
Accessibility audit for: [list UI files]
```

---

## Output Document Naming Convention

```
Product Brief:    PRODUCT_BRIEF_[ProjectName]_[Date].md
Architecture:     ARCHITECTURE.md (in project root)
Review Report:    REVIEW_[PRNumber]_[Date].md
Test Report:      TEST_REPORT_[Feature]_[Date].md
Security Audit:   SECURITY_AUDIT_[Feature]_[Date].md
A11y Audit:       A11Y_AUDIT_[Feature]_[Date].md
```

Store these in: `docs/` folder in your project repository.

# FORGE WORKFLOW: HOTFIX
**Emergency production fix. Fast but not reckless.**

---

## WHEN TO USE THIS WORKFLOW

Use hotfix workflow when:
- A bug is affecting production users RIGHT NOW
- The bug cannot wait for the normal sprint cycle
- The fix is small and well-understood

**Do NOT use hotfix for:**
- New features (use new-feature workflow)
- Large refactors (use normal PR process)
- "Nice to have" improvements
- Bugs that only affect < 1% of users and have a workaround

---

## HOTFIX DECISION TREE

```
Is production broken?
  ↓
How many users affected?
  ├── > 10% → ROLLBACK immediately, then hotfix
  ├── 1-10% → Hotfix (this workflow)
  └── < 1%  → Normal PR process (next sprint)

Is the fix well-understood?
  ├── YES → Proceed with hotfix
  └── NO  → STOP. Investigate first (workflows/debug.md)
             A wrong hotfix is worse than no hotfix.
```

---

## HOTFIX PROTOCOL

### STEP 1 — ASSESS (< 5 minutes)

```
□ What exactly is broken? (specific behavior, not "it's broken")
□ How many users are affected? (check error tracking)
□ When did it start? (check deployment history)
□ What changed recently? (git log --since="24 hours ago")
□ Is there a workaround users can use while we fix it?
□ Is rollback faster than a hotfix? (if yes: rollback first)
```

**Post in team channel immediately:**
```
🚨 PRODUCTION ISSUE
What: [specific description]
Affected: [N users / X% of traffic]
Started: [time]
Investigating: [your name]
ETA: [estimated fix time]
```

---

### STEP 2 — BRANCH

```bash
# Always branch from main (not from a feature branch)
git checkout main
git pull origin main
git checkout -b hotfix/[short-description]

# Examples:
# hotfix/payment-crash-on-null-price
# hotfix/login-redirect-loop
# hotfix/export-csv-encoding
```

---

### STEP 3 — FIX

**Rules for hotfix code:**
```
✓ Fix ONLY the specific bug. Nothing else.
✓ Minimum viable fix — not a refactor
✓ Add a regression test that would have caught this bug
✓ Run the full test suite before opening PR
✓ No new dependencies
✓ No style changes
✓ No "while I'm here" improvements
```

**Use Forge Debug Protocol if root cause is unclear:**
```
Act as Forge Debug Agent.
[Describe the bug with reproduction steps]
Run Phase 1-3 of the Debug Protocol.
Do NOT suggest a fix until root cause is confirmed.
```

---

### STEP 4 — EXPEDITED REVIEW

Hotfix PRs get expedited review — but they still get reviewed.

```
PR title format: hotfix([scope]): [description]
Example: hotfix(payment): prevent crash when price is null

PR description must include:
  □ What is broken (specific)
  □ Root cause (confirmed, not guessed)
  □ What the fix does
  □ Regression test added
  □ Tested on: [browsers/devices]
  □ Risk of fix: [Low/Medium/High]
  □ Rollback plan if fix makes things worse
```

**Review requirements (expedited):**
```
□ 1 approval (not 2 — speed matters)
□ CI must pass (no exceptions)
□ Reviewer must verify the fix addresses root cause
□ Reviewer must verify no unintended side effects
```

**Reviewer checklist for hotfixes:**
```
□ Does the fix address the ROOT CAUSE (not just the symptom)?
□ Could this fix break anything else?
□ Is the regression test actually testing the right thing?
□ Is the fix minimal (no scope creep)?
□ Is the PR description complete?
```

---

### STEP 5 — DEPLOY

```bash
# After PR is approved and CI passes:

# 1. Merge to main
git checkout main
git merge hotfix/[description] --no-ff
git push origin main

# 2. Tag the hotfix release
git tag -a v[X.Y.Z+1] -m "hotfix: [description]"
git push origin v[X.Y.Z+1]

# 3. Deploy (CI/CD deploys automatically on push to main)
# Monitor deployment in CI/CD dashboard

# 4. Verify in production (within 5 minutes of deploy)
# Check: error tracking, user reports, key metrics
```

---

### STEP 6 — VERIFY & MONITOR

```
Immediately after deploy:
  □ Verify the specific bug is fixed in production
  □ Verify no new errors appeared in error tracking
  □ Verify key metrics are normal (error rate, response time)
  □ Monitor for 30 minutes

Post in team channel:
  ✅ HOTFIX DEPLOYED
  Fix: [what was fixed]
  Deployed: [time]
  Verified: [how you verified it's fixed]
  Monitoring: [will monitor for 30 min]
```

---

### STEP 7 — POST-MORTEM (within 24 hours)

Every hotfix gets a post-mortem. Not to blame — to prevent recurrence.

```markdown
## Hotfix Post-Mortem: [Description]
Date: [Date]
Duration: [Time from detection to fix]

### What happened
[Specific description of the bug and its impact]

### Root cause
[The actual root cause, not the symptom]

### Why it wasn't caught earlier
[Which test/review/process should have caught this?]

### Fix applied
[What was changed and why]

### Prevention
[What will prevent this class of bug in the future?]
Action items:
1. [Specific action] — Owner: [name] — Due: [date]
2. [Specific action] — Owner: [name] — Due: [date]
```

---

## HOTFIX ANTI-PATTERNS

```
✗ Hotfixing without understanding the root cause
  → A wrong hotfix can make things worse
  → Use debug protocol first

✗ Skipping the regression test
  → The same bug will come back
  → "I'll add it later" = never

✗ Scope creep in hotfix
  → "While I'm here, I'll also fix X"
  → Increases risk, slows review

✗ Skipping CI
  → "It's urgent, CI takes too long"
  → A broken hotfix is worse than a delayed one

✗ No post-mortem
  → The same bug will come back
  → Post-mortems are how teams get better

✗ Deploying without monitoring
  → You won't know if the fix worked
  → Or if it caused new problems

✗ Hotfixing a bug that should be rolled back
  → If > 10% users affected: rollback first
  → Hotfix after rollback, not instead of rollback
```

---

## ROLLBACK PROCEDURE

If the hotfix makes things worse, or if the bug is too complex to fix quickly:

```bash
# Vercel rollback (instant)
vercel rollback [previous-deployment-url]

# Git revert (creates a new commit that undoes the hotfix)
git revert HEAD --no-edit
git push origin main
# CI/CD deploys the revert automatically

# Emergency: revert to specific known-good commit
git revert [bad-commit-hash] --no-edit
git push origin main
```

Post in team channel:
```
⏪ ROLLING BACK
Reason: [why the hotfix didn't work / made things worse]
Rolling back to: [version/commit]
ETA: [time]
```

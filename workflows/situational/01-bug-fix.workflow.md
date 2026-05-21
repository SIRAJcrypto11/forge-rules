# Workflow: Bug Fix
**ID:** WF-01  
**Trigger Keywords:** bug, broken, not working, error, crash, issue, fails, exception, undefined, null, TypeError, 500, 404  
**Primary Agent:** Coder  
**Support Agents:** Tester, Reviewer, Security (if security-related)  
**Estimated Time:** 30 min – 4 hours  

---

## Overview

This workflow handles all bug fix scenarios from minor UI glitches to critical production crashes. It follows a structured Diagnose → Isolate → Fix → Verify → Document cycle.

---

## Severity Classification

| Level | Description | Response Time | Example |
|-------|-------------|---------------|---------|
| P0 – Critical | Production down, data loss, security breach | Immediate | App crashes on load, auth bypass |
| P1 – High | Major feature broken, affects many users | < 2 hours | Payment fails, login broken |
| P2 – Medium | Feature degraded, workaround exists | < 24 hours | Filter not working, slow query |
| P3 – Low | Minor issue, cosmetic, edge case | Next sprint | Tooltip misaligned, typo |

---

## Phase 1: Triage & Reproduction (Coder)

### 1.1 Gather Information
```
REQUIRED before touching any code:
- [ ] Exact error message / stack trace
- [ ] Steps to reproduce (STR)
- [ ] Expected vs actual behavior
- [ ] Environment (browser, OS, Node version, env: dev/staging/prod)
- [ ] When did it start? (last working commit)
- [ ] Frequency: always / intermittent / specific conditions
- [ ] Affected users: all / subset / specific account
```

### 1.2 Reproduce Locally
```bash
# Checkout the affected branch
git checkout <branch>
git pull origin <branch>

# Install dependencies (in case something changed)
npm install

# Run in the same environment as the bug
NODE_ENV=<env> npm run dev

# Reproduce the exact steps
```

### 1.3 Isolate the Scope
```
Questions to narrow down:
- Is it frontend or backend?
- Is it data-related (bad input, bad state)?
- Is it environment-specific (only prod, only Safari)?
- Is it a regression? (git bisect if needed)
- Is it a race condition / timing issue?
```

---

## Phase 2: Root Cause Analysis (Coder)

### 2.1 Code Investigation
```
Tools to use:
- Browser DevTools (Console, Network, Sources)
- Node.js debugger / VS Code debugger
- git log --oneline -20 (recent changes)
- git blame <file> (who changed what)
- git bisect (find the breaking commit)
```

### 2.2 Common Root Causes Checklist
```
State Management:
- [ ] Stale state / stale closure
- [ ] Race condition in async operations
- [ ] Missing dependency in useEffect
- [ ] Mutating state directly

Data Issues:
- [ ] Null/undefined not handled
- [ ] Wrong data type assumption
- [ ] API response shape changed
- [ ] Missing validation

Logic Errors:
- [ ] Off-by-one error
- [ ] Wrong comparison operator (= vs ==)
- [ ] Missing edge case (empty array, 0, negative)
- [ ] Incorrect boolean logic

Environment:
- [ ] Missing env variable
- [ ] Different Node/package version
- [ ] CORS issue
- [ ] Cache not cleared
```

### 2.3 Document Root Cause
```
Before writing any fix, document:
ROOT CAUSE: [one clear sentence]
AFFECTED FILES: [list]
RISK LEVEL: [low/medium/high - could fix break other things?]
```

---

## Phase 3: Fix Implementation (Coder)

### 3.1 Create Fix Branch
```bash
# Branch naming convention
git checkout -b fix/<ticket-id>-<short-description>
# Example: fix/BUG-123-login-null-pointer
```

### 3.2 Minimal Fix Principle
```
Rules:
- Fix ONLY what is broken — do not refactor unrelated code
- One fix per commit
- If fix requires refactor, create separate PR
- Prefer explicit over clever
```

### 3.3 Fix Patterns by Category

**Null/Undefined Guard:**
```javascript
// Before (broken)
const name = user.profile.name;

// After (fixed)
const name = user?.profile?.name ?? 'Unknown';
```

**Async Race Condition:**
```javascript
// Before (broken - state update after unmount)
useEffect(() => {
  fetchData().then(data => setState(data));
}, []);

// After (fixed)
useEffect(() => {
  let cancelled = false;
  fetchData().then(data => {
    if (!cancelled) setState(data);
  });
  return () => { cancelled = true; };
}, []);
```

**Missing Error Boundary:**
```javascript
// Wrap risky components
<ErrorBoundary fallback={<ErrorFallback />}>
  <RiskyComponent />
</ErrorBoundary>
```

**API Error Handling:**
```javascript
// Before (broken)
const data = await api.get('/users');
setUsers(data);

// After (fixed)
try {
  const data = await api.get('/users');
  setUsers(data ?? []);
} catch (error) {
  logger.error('Failed to fetch users', { error });
  setError('Failed to load users. Please try again.');
}
```

### 3.4 Write the Fix
```
Checklist while coding:
- [ ] Fix addresses root cause (not just symptom)
- [ ] No new console.log left in code
- [ ] No commented-out code
- [ ] Error messages are user-friendly
- [ ] Logging added for future debugging
- [ ] TypeScript types updated if needed
```

---

## Phase 4: Testing (Tester)

### 4.1 Unit Test for the Bug
```javascript
// Always write a test that FAILS before the fix, PASSES after
describe('Bug fix: BUG-123 login null pointer', () => {
  it('should handle missing user profile gracefully', () => {
    const user = { id: 1 }; // no profile
    expect(() => getUserName(user)).not.toThrow();
    expect(getUserName(user)).toBe('Unknown');
  });
});
```

### 4.2 Regression Test Suite
```bash
# Run full test suite to ensure nothing else broke
npm run test

# Run specific test file
npm run test -- --testPathPattern=<filename>

# Run with coverage
npm run test:coverage
```

### 4.3 Manual Verification
```
Test matrix:
- [ ] Bug is fixed in the original scenario
- [ ] Related features still work
- [ ] Edge cases covered (empty, null, max values)
- [ ] Works in all target browsers (if frontend)
- [ ] Works in all target environments (dev, staging)
- [ ] Performance not degraded
```

---

## Phase 5: Code Review (Reviewer)

### 5.1 Self-Review Checklist
```
Before requesting review:
- [ ] Diff is minimal and focused
- [ ] Commit message follows Conventional Commits
- [ ] Tests pass locally
- [ ] No debug code left
- [ ] PR description explains: what broke, why, how fixed
```

### 5.2 PR Template for Bug Fix
```markdown
## Bug Fix: [Short Description]

### Problem
[What was broken and how it manifested]

### Root Cause
[Why it was broken - the actual cause]

### Solution
[What was changed and why this approach]

### Testing
- [ ] Unit test added that covers the bug
- [ ] Regression tests pass
- [ ] Manual testing completed

### Risk Assessment
- Impact: [Low/Medium/High]
- Rollback plan: [How to revert if needed]
```

---

## Phase 6: Deploy & Monitor (DevOps)

### 6.1 Deployment Checklist
```
- [ ] Staging deployment successful
- [ ] Smoke test on staging
- [ ] Production deployment (with rollback plan ready)
- [ ] Monitor error rates for 30 min post-deploy
- [ ] Verify fix in production
```

### 6.2 Post-Fix Monitoring
```
Watch for 24 hours:
- Error rate in Sentry/logging
- Performance metrics
- User reports
- Related error patterns
```

---

## Phase 7: Documentation

### 7.1 Update CHANGELOG
```markdown
## [Unreleased]
### Fixed
- [BUG-123] Login fails when user has no profile set (#PR-number)
```

### 7.2 Post-Mortem (P0/P1 only)
```
Template:
- Timeline of events
- Root cause
- Impact (users affected, duration)
- Fix applied
- Prevention measures
- Action items
```

---

## Quick Reference: Common Bug Patterns

| Symptom | Likely Cause | First Check |
|---------|-------------|-------------|
| `Cannot read property of undefined` | Missing null check | Optional chaining `?.` |
| `Maximum update depth exceeded` | Infinite re-render | useEffect dependencies |
| `Network Error` / CORS | API config | Check headers, proxy |
| `Hydration mismatch` | SSR/CSR difference | Check server vs client state |
| `Memory leak` | Uncleared subscription | Cleanup in useEffect |
| `Stale data` | Cache not invalidated | Check cache strategy |
| `Works locally, fails in prod` | Env variable missing | Check `.env.production` |

---

## Handoff Protocol

When handing off to another agent:
```
HANDOFF from Coder to Tester:
- Bug: [description]
- Root cause: [identified]
- Fix location: [file:line]
- Test scenario: [exact steps to verify]
- Edge cases to test: [list]
```

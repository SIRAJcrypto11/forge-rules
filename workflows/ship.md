# FORGE WORKFLOW: SHIP
**From approved PR to verified production.**

---

## PRE-SHIP CHECKLIST

Run this before every production deployment:

```
CODE QUALITY:
  □ All tests pass (npm run test)
  □ No lint errors (npm run lint)
  □ Build succeeds (npm run build)
  □ No console.log in production code
  □ No TODO without ticket reference

SECURITY:
  □ npm audit: zero CRITICAL or HIGH
  □ No secrets in code (git grep for common patterns)
  □ .env not committed

PERFORMANCE:
  □ Bundle size within budget (< 100KB initial gzipped)
  □ Lighthouse score ≥ 90

ACCESSIBILITY:
  □ axe-core: zero critical violations
  □ Keyboard navigation tested

DOCUMENTATION:
  □ CHANGELOG.md updated
  □ README.md updated (if setup changed)
  □ ARCHITECTURE.md updated (if architecture changed)
```

---

## SHIP SEQUENCE

```
STEP 1: Final verification
  git pull origin main
  npm ci
  npm run test
  npm run build
  npm audit --audit-level=high

STEP 2: Version bump
  # Patch: bug fixes
  npm version patch -m "chore: bump to v%s"
  
  # Minor: new features
  npm version minor -m "chore: bump to v%s"
  
  # Major: breaking changes
  npm version major -m "chore: bump to v%s"

STEP 3: Tag release
  git tag -a v[version] -m "Release v[version]: [brief description]"
  git push origin main --tags

STEP 4: Deploy
  # Vercel
  vercel --prod
  
  # Netlify
  netlify deploy --prod
  
  # Custom
  [your deploy command]

STEP 5: Verify production
  □ Open production URL
  □ Check browser console: no errors
  □ Test critical user journey manually
  □ Check Sentry/error tracking: no new errors
  □ Check performance: Lighthouse score still ≥ 90

STEP 6: Update CHANGELOG.md
  ## [version] — [date]
  
  ### Added
  - [new features]
  
  ### Fixed
  - [bug fixes]
  
  ### Changed
  - [changes to existing functionality]
  
  ### Security
  - [security fixes]
```

---

## POST-SHIP MONITORING (First 30 minutes)

```
□ Monitor error tracking (Sentry/equivalent)
  → Alert threshold: > 5 new errors in 5 minutes

□ Monitor performance metrics
  → Alert threshold: LCP > 3s or FCP > 2s

□ Monitor API error rates
  → Alert threshold: > 1% error rate

□ Check user feedback channels
  → Slack, email, support tickets

IF CRITICAL BUG FOUND:
  1. Assess impact (how many users affected?)
  2. If > 10% users affected: rollback immediately
  3. If < 10%: hotfix branch → expedited review → ship
  4. Post incident report within 24 hours
```

---

## ROLLBACK PROCEDURE

```
WHEN TO ROLLBACK:
  - Critical bug affecting > 10% of users
  - Security vulnerability discovered post-deploy
  - Data corruption risk
  - Complete feature failure

HOW TO ROLLBACK:
  # Vercel
  vercel rollback [deployment-url]
  
  # Netlify
  netlify rollback
  
  # Git-based
  git revert HEAD
  git push origin main
  # Then redeploy

AFTER ROLLBACK:
  □ Notify team immediately
  □ Document what went wrong
  □ Fix the issue in a hotfix branch
  □ Add regression test
  □ Re-ship with fix
```

# 🎯 COMMON DEVELOPMENT SCENARIOS
## Practical Guide: What to Do When...

**Purpose:** Quick reference for common development scenarios  
**Audience:** Developers using Forge Rules  
**Version:** 3.0.0

---

## 📖 How to Use This Guide

1. Find your scenario below
2. See which agents to activate
3. Follow the recommended workflow
4. Get production-grade output

**Format:**
```
Scenario: [What you want to do]
Intent: [Classification]
Agents: [Which agents to use]
Time: [How long it takes]
Workflow: [Link to detailed workflow]
Steps: [Quick steps]
```

---

## 🐛 Bug Fixing Scenarios

### Scenario 1: Production is Down (P0)
**User says:** "Users can't access the site", "500 error on homepage", "app is completely broken"

**Intent:** CRITICAL_BUG  
**Severity:** P0 - CRITICAL  
**Agents:** Coder → Tester → Reviewer (expedited)  
**Time:** 1 hour (SLA)  
**Workflow:** `workflows/situational/01-bug-fix.workflow.md` (Critical section)

**Quick Steps:**
```
1. Activate Coder Agent: "Production is down, 500 error on homepage"
2. Check error logs (Sentry, CloudWatch)
3. Reproduce locally if possible
4. Implement minimal fix (no refactoring)
5. Test locally
6. Deploy to staging → verify → deploy to production
7. Monitor for 1 hour
8. Schedule post-mortem
```

**Success Criteria:**
- Production restored within 1 hour
- No data loss
- Regression test added
- Post-mortem scheduled

---

### Scenario 2: Feature is Broken (P1)
**User says:** "Login doesn't work", "Can't submit form", "Button does nothing"

**Intent:** BUG_FIX  
**Severity:** P1 - HIGH  
**Agents:** Coder → Tester → Reviewer  
**Time:** 2-4 hours  
**Workflow:** `workflows/situational/01-bug-fix.workflow.md`

**Quick Steps:**
```
1. Activate Coder Agent: "Login button doesn't work on mobile"
2. Reproduce bug locally
3. Debug with DevTools
4. Identify root cause
5. Implement fix
6. Write regression test
7. Get code review
8. Deploy
```

**Success Criteria:**
- Bug no longer reproducible
- Regression test added (80%+ coverage)
- No side effects
- Code review approved

---

### Scenario 3: Visual Bug (P2)
**User says:** "Button looks wrong", "Text is cut off", "Layout is broken on mobile"

**Intent:** UI_BUG_FIX  
**Severity:** P2 - MEDIUM  
**Agents:** UI → Coder  
**Time:** 1-2 hours  
**Workflow:** `workflows/situational/02-ui-improvement.workflow.md` (Bug Fix section)

**Quick Steps:**
```
1. Activate UI Agent: "Button is misaligned on mobile"
2. Screenshot current state
3. Identify CSS issue
4. Fix with design tokens
5. Test on all breakpoints
6. Verify accessibility
```

**Success Criteria:**
- Visual issue resolved
- Works on all breakpoints
- Design system compliant
- No accessibility regressions

---

## 🎨 UI/UX Improvement Scenarios

### Scenario 4: Full UI Redesign
**User says:** "Modernize the dashboard", "Rebrand the app", "Make it look professional"

**Intent:** UI_IMPROVEMENT (Large-Scale)  
**Agents:** UI → UX → Coder → A11y → Performance → Reviewer  
**Time:** 2-4 weeks  
**Workflow:** `workflows/situational/02-ui-improvement.workflow.md` (Large-Scale section)

**Quick Steps:**
```
Week 1: Discovery & Design
1. Activate UI Agent: "Audit current dashboard design"
2. Review audit report (50-100 issues)
3. Define new design system
4. Create component inventory
5. Prioritize by impact

Week 2: Foundation
6. Update Tailwind config with new tokens
7. Redesign core primitives (Button, Input, etc.)
8. Test all variants

Week 3: Components
9. Redesign composite components (Card, Modal, etc.)
10. Apply to all pages
11. Fix layout issues

Week 4: QA & Launch
12. Activate A11y Agent: "WCAG 2.1 AA audit"
13. Activate Performance Agent: "Lighthouse audit"
14. Fix all issues
15. Deploy
```

**Success Criteria:**
- All components follow new design system
- WCAG 2.1 AA compliant
- Lighthouse score 90+
- User feedback positive (> 4/5)

---

### Scenario 5: Single Component Improvement
**User says:** "Make the button look better", "Improve the card design"

**Intent:** UI_IMPROVEMENT (Small-Scale)  
**Agents:** UI → Coder → A11y  
**Time:** 2-4 hours  
**Workflow:** `workflows/situational/02-ui-improvement.workflow.md` (Single Component section)

**Quick Steps:**
```
1. Activate UI Agent: "Improve button component design"
2. Specify exact changes (colors, spacing, shadows)
3. Activate Coder Agent: "Implement button improvements"
4. Test on all breakpoints
5. Activate A11y Agent: "Check button accessibility"
6. Deploy
```

**Success Criteria:**
- Visual improvement achieved
- Design system compliant
- Accessibility maintained
- Works on all breakpoints

---

### Scenario 6: UX Flow Improvement
**User says:** "Checkout is confusing", "Too many steps", "Users are getting lost"

**Intent:** UX_IMPROVEMENT  
**Agents:** UX → UI → Coder → A11y → QA Manual  
**Time:** 1-2 weeks  
**Workflow:** `workflows/situational/03-ux-improvement.workflow.md`

**Quick Steps:**
```
1. Activate UX Agent: "Analyze checkout flow"
2. Map current user journey
3. Identify friction points
4. Propose improved flow (reduce steps by 50%)
5. Activate UI Agent: "Design new checkout UI"
6. Activate Coder Agent: "Implement new checkout flow"
7. Activate A11y Agent: "Accessibility audit"
8. Activate QA Manual Agent: "Usability testing"
9. Deploy
```

**Success Criteria:**
- Steps reduced by 50%
- Task completion time reduced
- User satisfaction improved
- Accessibility maintained

---

## ⚡ Performance Optimization Scenarios

### Scenario 7: Slow Page Load
**User says:** "Page takes forever to load", "FCP > 3s", "Lighthouse score < 50"

**Intent:** PERFORMANCE_OPTIMIZATION (Page Load)  
**Agents:** Performance → Coder → Reviewer  
**Time:** 1-2 days  
**Workflow:** `workflows/situational/04-performance-optimization.workflow.md` (Page Load section)

**Quick Steps:**
```
Day 1: Audit & Quick Wins
1. Activate Performance Agent: "Lighthouse audit for homepage"
2. Review metrics (FCP, LCP, CLS, TBT)
3. Identify bottlenecks
4. Implement quick wins:
   - Enable compression
   - Lazy load images
   - Defer non-critical scripts
   - Preload critical resources
5. Measure improvement

Day 2: Code Splitting & Optimization
6. Activate Coder Agent: "Implement code splitting"
7. Split routes with React.lazy()
8. Optimize vendor bundle
9. Convert images to WebP
10. Final Lighthouse audit
```

**Success Criteria:**
- FCP < 1.5s (was > 3s)
- LCP < 2.5s (was > 4s)
- Lighthouse score > 90 (was < 50)
- Bundle size reduced by 30%+

---

### Scenario 8: Laggy Interactions
**User says:** "App feels slow", "Scrolling is janky", "Animations stutter"

**Intent:** PERFORMANCE_OPTIMIZATION (Runtime)  
**Agents:** Performance → Coder → Reviewer  
**Time:** 1-2 days  
**Workflow:** `workflows/situational/04-performance-optimization.workflow.md` (Runtime section)

**Quick Steps:**
```
1. Activate Performance Agent: "Profile runtime performance"
2. Use React DevTools Profiler
3. Identify slow components (> 16ms render)
4. Activate Coder Agent: "Optimize component performance"
5. Add React.memo to expensive components
6. Add useMemo for expensive computations
7. Implement virtualization for long lists (react-window)
8. Optimize animations (use transform, not top/left)
9. Re-profile and verify 60fps
```

**Success Criteria:**
- All interactions < 100ms
- All animations 60fps
- Re-renders reduced by 50%+
- No janky scrolling

---

## 🔒 Security Scenarios

### Scenario 9: Security Vulnerability Found
**User says:** "npm audit found vulnerabilities", "Snyk alert", "XSS vulnerability"

**Intent:** SECURITY_FIX  
**Agents:** Security → Coder → Tester → Reviewer  
**Time:** 2 hours to 2 days (depends on severity)  
**Workflow:** `workflows/situational/05-security-fix.workflow.md`

**Quick Steps:**
```
1. Activate Security Agent: "Audit security vulnerabilities"
2. Classify by severity (CRITICAL/HIGH/MEDIUM/LOW)
3. For each vulnerability:
   - Describe exploit scenario
   - Show proof-of-concept
   - Estimate risk
4. Activate Coder Agent: "Fix [specific vulnerability]"
5. Implement fix
6. Activate Tester Agent: "Write security tests"
7. Verify exploit no longer works
8. Deploy
```

**Success Criteria:**
- All CRITICAL/HIGH vulnerabilities fixed
- Security scans pass
- Penetration tests pass
- No new vulnerabilities introduced

---

### Scenario 10: Make Site Accessible
**User says:** "Need WCAG compliance", "Screen reader doesn't work", "Keyboard navigation broken"

**Intent:** ACCESSIBILITY_FIX  
**Agents:** A11y → UI → Coder → QA Manual → Reviewer  
**Time:** 1-2 weeks (full site)  
**Workflow:** `workflows/situational/06-accessibility-fix.workflow.md`

**Quick Steps:**
```
Week 1: Audit & Planning
1. Activate A11y Agent: "WCAG 2.1 AA audit"
2. Run automated tests (axe, WAVE, Lighthouse)
3. Manual testing (keyboard, screen reader, zoom)
4. Categorize issues (CRITICAL/HIGH/MEDIUM/LOW)
5. Prioritize fixes

Week 2: Implementation
6. Activate Coder Agent: "Fix accessibility issues"
7. Add missing alt text and labels
8. Fix color contrast
9. Fix keyboard navigation
10. Add ARIA labels
11. Test with screen reader
12. Final audit
```

**Success Criteria:**
- WCAG 2.1 Level AA compliant
- Lighthouse accessibility score 100
- axe DevTools: 0 violations
- Keyboard navigation: 100% functional

---

## 🏗️ Architecture & Refactoring Scenarios

### Scenario 11: Code is Messy
**User says:** "Too much technical debt", "Hard to maintain", "Code quality is poor"

**Intent:** REFACTORING (Large-Scale)  
**Agents:** Architect → Reviewer → Coder → Tester  
**Time:** 1-4 weeks  
**Workflow:** `workflows/situational/07-refactoring.workflow.md`

**Quick Steps:**
```
Week 1: Assessment
1. Activate Architect Agent: "Audit codebase quality"
2. Check 8-layer compliance
3. Identify god components (> 300 lines)
4. Check state management
5. Create refactoring plan

Week 2-3: Implementation
6. Activate Coder Agent: "Refactor [specific area]"
7. Fix layer violations
8. Split god components
9. Migrate to React Query
10. Add TypeScript types
11. Fix ESLint violations

Week 4: Testing & QA
12. Activate Tester Agent: "Add missing tests"
13. Verify 80%+ coverage
14. Activate Reviewer Agent: "Review refactoring"
15. Deploy
```

**Success Criteria:**
- 100% 8-layer compliance
- 0 god components
- 80%+ test coverage
- 0 ESLint errors

---

### Scenario 12: Split God Component
**User says:** "Component is too large", "File has 500+ lines", "Hard to understand"

**Intent:** REFACTORING (Component)  
**Agents:** Coder → Reviewer  
**Time:** 4-8 hours  
**Workflow:** `workflows/situational/07-refactoring.workflow.md` (Component section)

**Quick Steps:**
```
1. Activate Coder Agent: "Split [ComponentName] into smaller components"
2. Identify sub-components
3. Extract sub-components
4. Extract custom hooks
5. Extract utilities
6. Test after each extraction
7. Verify no functionality broken
8. Get code review
```

**Success Criteria:**
- Main component < 150 lines
- All sub-components < 120 lines
- All hooks < 100 lines
- Tests still pass

---

## 🧪 Testing Scenarios

### Scenario 13: No Tests Exist
**User says:** "Add tests", "Need test coverage", "No tests written yet"

**Intent:** TESTING (Full Suite)  
**Agents:** Tester → Coder → QA Manual → Reviewer  
**Time:** 1-2 weeks  
**Workflow:** `workflows/situational/08-testing.workflow.md`

**Quick Steps:**
```
Week 1: Setup & Unit Tests
1. Activate Tester Agent: "Set up testing infrastructure"
2. Install Vitest + Playwright
3. Configure test setup
4. Write service tests (80%+ coverage)
5. Write util tests (80%+ coverage)

Week 2: Component & E2E Tests
6. Write hook tests (80%+ coverage)
7. Write component tests (60%+ coverage, 4 states)
8. Write E2E tests (10-20 critical flows)
9. Run coverage report
10. Fill gaps
```

**Success Criteria:**
- 80%+ coverage for services/hooks
- 60%+ coverage for components
- 10-20 E2E tests
- All tests passing
- CI/CD integration complete

---

### Scenario 14: Improve Test Coverage
**User says:** "Coverage is too low", "Add missing tests", "Fill test gaps"

**Intent:** TESTING (Coverage Improvement)  
**Agents:** Tester → Coder  
**Time:** 2-3 days  
**Workflow:** `workflows/situational/08-testing.workflow.md` (Coverage section)

**Quick Steps:**
```
1. Activate Tester Agent: "Analyze test coverage"
2. Run coverage report
3. Identify untested files
4. Prioritize by criticality
5. Write missing tests
6. Verify coverage thresholds met
```

**Success Criteria:**
- Coverage meets thresholds (80% services, 60% components)
- All critical paths tested
- All edge cases covered

---

## 🖥️ Backend & API Scenarios

### Scenario 15: Design New API
**User says:** "Need API for products", "Design REST API", "Create backend endpoints"

**Intent:** API_DESIGN  
**Agents:** Backend → Security → Coder → Tester  
**Time:** 1-2 weeks  
**Workflow:** `workflows/situational/11-api-design.workflow.md`

**Quick Steps:**
```
1. Activate Backend Agent: "Design API for product management"
2. Define endpoints (GET, POST, PUT, DELETE)
3. Define request/response schemas
4. Define validation rules (Zod)
5. Design database schema
6. Plan query optimization (N+1 prevention)
7. Activate Security Agent: "Security review for API"
8. Activate Coder Agent: "Implement API"
9. Activate Tester Agent: "Write API tests"
10. Deploy
```

**Success Criteria:**
- All endpoints documented
- Input validation complete
- No N+1 queries
- Security audit passed
- 80%+ test coverage

---

### Scenario 16: Optimize Database Queries
**User says:** "Queries are slow", "N+1 problem", "Database performance issues"

**Intent:** DATABASE_OPTIMIZATION  
**Agents:** Backend → Performance → Coder  
**Time:** 2-3 days  
**Workflow:** `workflows/situational/12-database-optimization.workflow.md`

**Quick Steps:**
```
1. Activate Backend Agent: "Analyze database performance"
2. Identify slow queries (> 100ms)
3. Identify N+1 queries
4. Identify missing indexes
5. Activate Coder Agent: "Optimize database queries"
6. Add indexes
7. Fix N+1 with eager loading
8. Add query caching
9. Measure improvement
```

**Success Criteria:**
- All queries < 100ms
- No N+1 queries
- Proper indexes added
- 50%+ query time reduction

---

## 🚀 DevOps & Deployment Scenarios

### Scenario 17: Set Up CI/CD
**User says:** "Need automated deployment", "Set up GitHub Actions", "Configure CI/CD"

**Intent:** DEPLOYMENT_SETUP  
**Agents:** DevOps → Security → Tester  
**Time:** 1-2 days  
**Workflow:** `workflows/situational/13-deployment-setup.workflow.md`

**Quick Steps:**
```
1. Activate DevOps Agent: "Set up CI/CD pipeline"
2. Create .github/workflows/ci.yml
3. Add jobs:
   - Lint & Type Check
   - Unit Tests
   - E2E Tests
   - Bundle Analysis
   - Lighthouse CI
   - Secret Scanning
4. Configure deployment (staging + production)
5. Add Slack notifications
6. Test pipeline
```

**Success Criteria:**
- All checks automated
- Deployment automated
- Rollback procedure documented
- Monitoring configured

---

### Scenario 18: Deploy to Production
**User says:** "Ready to deploy", "Ship to production", "Go live"

**Intent:** DEPLOYMENT  
**Agents:** DevOps → QA Manual → Reviewer  
**Time:** 1 day  
**Workflow:** `workflows/ship.md`

**Quick Steps:**
```
1. Run pre-ship checklist
2. Deploy to staging
3. Activate QA Manual Agent: "Final QA on staging"
4. Fix any issues
5. Deploy to production (10% traffic)
6. Monitor for 1 hour
7. Gradually increase to 100%
8. Monitor for 24 hours
```

**Success Criteria:**
- All checks passed
- Staging deployment successful
- Production deployment successful
- No errors in monitoring
- Rollback plan ready

---

## 📱 Mobile & Internationalization Scenarios

### Scenario 19: Optimize for Mobile
**User says:** "Site doesn't work on mobile", "Make it responsive", "Mobile experience is poor"

**Intent:** MOBILE_OPTIMIZATION  
**Agents:** UI → UX → Performance → A11y  
**Time:** 1 week  
**Workflow:** `workflows/situational/14-mobile-optimization.workflow.md`

**Quick Steps:**
```
1. Activate UI Agent: "Audit mobile experience"
2. Test on real devices (iPhone, Android)
3. Identify issues:
   - Layout breaks
   - Touch targets too small
   - Text too small
   - Images not optimized
4. Activate Coder Agent: "Fix mobile issues"
5. Implement mobile-first design
6. Ensure touch targets 44×44px
7. Optimize images for mobile
8. Test on all devices
```

**Success Criteria:**
- Works on all mobile devices
- Touch targets 44×44px minimum
- Lighthouse mobile score 90+
- No horizontal scrolling

---

### Scenario 20: Add Multi-Language Support
**User says:** "Need internationalization", "Support multiple languages", "Add translations"

**Intent:** INTERNATIONALIZATION  
**Agents:** Coder → UX → Tester  
**Time:** 1 week  
**Workflow:** `workflows/situational/15-internationalization.workflow.md`

**Quick Steps:**
```
1. Activate Coder Agent: "Set up i18n with react-i18next"
2. Install dependencies
3. Configure i18next
4. Extract all text to locale files
5. Implement language switcher
6. Add locale-aware formatters (dates, numbers, currency)
7. Test all languages
8. Activate UX Agent: "Review translations"
```

**Success Criteria:**
- All text translatable
- Language switcher works
- Dates/numbers formatted correctly
- No hardcoded text
- RTL support (if needed)

---

## 📊 Quick Reference Table

| Scenario | Intent | Primary Agent | Time | Priority |
|----------|--------|---------------|------|----------|
| Production Down | CRITICAL_BUG | Coder | 1 hour | P0 |
| Feature Broken | BUG_FIX | Coder | 2-4 hours | P1 |
| Visual Bug | UI_BUG_FIX | UI | 1-2 hours | P2 |
| Full Redesign | UI_IMPROVEMENT | UI | 2-4 weeks | - |
| Component Improvement | UI_IMPROVEMENT | UI | 2-4 hours | - |
| UX Flow | UX_IMPROVEMENT | UX | 1-2 weeks | - |
| Slow Page Load | PERFORMANCE | Performance | 1-2 days | - |
| Laggy Interactions | PERFORMANCE | Performance | 1-2 days | - |
| Security Vulnerability | SECURITY_FIX | Security | Varies | P0-P2 |
| Accessibility | ACCESSIBILITY_FIX | A11y | 1-2 weeks | - |
| Code Messy | REFACTORING | Architect | 1-4 weeks | - |
| God Component | REFACTORING | Coder | 4-8 hours | - |
| No Tests | TESTING | Tester | 1-2 weeks | - |
| Low Coverage | TESTING | Tester | 2-3 days | - |
| Design API | API_DESIGN | Backend | 1-2 weeks | - |
| Slow Queries | DATABASE_OPT | Backend | 2-3 days | - |
| Set Up CI/CD | DEPLOYMENT | DevOps | 1-2 days | - |
| Deploy | DEPLOYMENT | DevOps | 1 day | - |
| Mobile Issues | MOBILE_OPT | UI | 1 week | - |
| Multi-Language | I18N | Coder | 1 week | - |

---

**Pro Tip:** When in doubt, describe your scenario to the Agent Router and it will automatically route you to the right workflow!

**Example:**
```
User: "The product list page is slow and looks outdated"
Agent Router: 
  ✅ Detected 2 intents: PERFORMANCE + UI_IMPROVEMENT
  ✅ Recommended sequence: Fix performance first, then UI
  ✅ Agents: Performance → Coder → UI → Coder
  ✅ Time: 2-3 days total
```

---

**Version:** 3.0.0  
**Last Updated:** May 21, 2026  
**Author:** Siraj Nur Ihrom

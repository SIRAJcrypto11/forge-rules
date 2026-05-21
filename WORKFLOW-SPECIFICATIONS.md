# 📋 DETAILED WORKFLOW SPECIFICATIONS
## Forge Rules v3.0 - Complete Situational Workflows

**Purpose:** Comprehensive specifications for all 20 situational workflows  
**Audience:** Developers, AI agents, system implementers  
**Status:** Planning Phase

---

## 🎯 Workflow Design Principles

### 1. Specificity Over Generality
- Each workflow targets ONE specific scenario
- No generic "improve code" workflows
- Clear input/output specifications

### 2. Production-Grade Standards
- All outputs must be production-ready
- No placeholders or "TODO" comments
- Complete error handling
- Full test coverage

### 3. Time-Boxed Phases
- Each phase has estimated duration
- Clear exit criteria
- No open-ended tasks

### 4. Agent Chaining
- Primary agent always runs first
- Secondary agents run if complexity threshold met
- Tertiary agents run on user request

### 5. Measurable Outcomes
- Every workflow has success metrics
- Before/after comparisons
- Quantifiable improvements

---

## 📚 Complete Workflow Catalog

### Category 1: Maintenance & Bug Fixes

#### Workflow 1.1: Critical Production Bug
**Trigger:** "Production is down", "users can't access", "500 error"
**Severity:** CRITICAL
**SLA:** Fix within 1 hour
**Agent Chain:** Coder → Tester → Reviewer (expedited)

**Detailed Steps:**
```
00:00 - TRIAGE (5 minutes)
├─ Assess impact
│  ├─ How many users affected?
│  ├─ What functionality is broken?
│  ├─ Is data at risk?
│  └─ Can we rollback?
├─ Classify severity
│  ├─ P0: Complete outage → Fix immediately
│  ├─ P1: Major feature broken → Fix within 4 hours
│  └─ P2: Minor issue → Fix in next sprint
└─ Decision: Fix forward or rollback?

00:05 - REPRODUCE (10 minutes)
├─ Coder Agent: Bug Reproduction
│  ├─ Check error logs (Sentry, CloudWatch)
│  ├─ Identify error message and stack trace
│  ├─ Find affected file and line number
│  ├─ Reproduce locally (if possible)
│  └─ Document exact reproduction steps

00:15 - DIAGNOSE (15 minutes)
├─ Coder Agent: Root Cause Analysis
│  ├─ Read affected code
│  ├─ Identify the exact cause
│  │  ├─ Null/undefined access?
│  │  ├─ Logic error?
│  │  ├─ Race condition?
│  │  ├─ Dependency issue?
│  │  └─ Configuration error?
│  ├─ Determine blast radius
│  └─ Plan minimal fix (no refactoring)

00:30 - FIX (20 minutes)
├─ Coder Agent: Implementation
│  ├─ Implement minimal fix
│  ├─ Add null guards
│  ├─ Add error handling
│  ├─ Test locally
│  └─ Verify fix resolves issue

00:50 - TEST (5 minutes)
├─ Tester Agent: Quick Verification
│  ├─ Write regression test
│  ├─ Verify test fails before fix
│  ├─ Verify test passes after fix
│  └─ Run full test suite (if time permits)

00:55 - REVIEW (5 minutes)
└─ Reviewer Agent: Expedited Review
   ├─ Verify fix is minimal
   ├─ Check for obvious issues
   ├─ Approve for emergency deploy
   └─ Note: Full review post-deploy
```

**Output Artifacts:**
- Fixed file(s)
- Regression test
- Incident report
- Post-mortem action items

**Success Criteria:**
- Production restored within 1 hour
- No data loss
- Regression test added
- Post-mortem scheduled

---

#### Workflow 1.2: Non-Critical Bug Fix
**Trigger:** "Bug in feature X", "not working as expected"
**Severity:** MEDIUM
**SLA:** Fix within 1-2 days
**Agent Chain:** Coder → Tester → Reviewer

**Detailed Steps:**
```
Phase 1: UNDERSTAND (30 minutes)
├─ Coder Agent: Bug Analysis
│  ├─ Read bug report
│  ├─ Understand expected behavior
│  ├─ Understand actual behavior
│  ├─ Identify affected users
│  └─ Assess business impact

Phase 2: REPRODUCE (30 minutes)
├─ Coder Agent: Local Reproduction
│  ├─ Set up test environment
│  ├─ Follow reproduction steps
│  ├─ Confirm bug exists
│  ├─ Try edge cases
│  └─ Document findings

Phase 3: DEBUG (1-2 hours)
├─ Coder Agent: Root Cause Investigation
│  ├─ Add console.log / debugger
│  ├─ Trace execution flow
│  ├─ Identify exact failure point
│  ├─ Understand why it fails
│  └─ Propose fix strategy

Phase 4: FIX (1-3 hours)
├─ Coder Agent: Implementation
│  ├─ Implement fix
│  ├─ Handle edge cases
│  ├─ Add error handling
│  ├─ Update related code if needed
│  └─ Test locally (all scenarios)

Phase 5: TEST (1-2 hours)
├─ Tester Agent: Comprehensive Testing
│  ├─ Write unit tests
│  ├─ Write integration tests
│  ├─ Test happy path
│  ├─ Test edge cases
│  ├─ Test error scenarios
│  └─ Verify 80%+ coverage

Phase 6: REVIEW (30 minutes)
└─ Reviewer Agent: Code Review
   ├─ Verify fix correctness
   ├─ Check for side effects
   ├─ Verify test coverage
   ├─ Check code quality
   └─ Approve or request changes
```

**Output Artifacts:**
- Fixed file(s)
- Test file(s)
- Bug fix documentation
- PR description

**Success Criteria:**
- Bug no longer reproducible
- Tests added (80%+ coverage)
- No regressions introduced
- Code review approved

---

### Category 2: UI/UX Improvements

#### Workflow 2.1: Large-Scale UI Overhaul
**Trigger:** "Redesign dashboard", "modernize UI", "rebrand"
**Scope:** Multiple components, design system changes
**Duration:** 2-4 weeks
**Agent Chain:** UI → UX → Coder → A11y → Performance → Reviewer

**Detailed Steps:**

```
Week 1: DISCOVERY & DESIGN
├─ Day 1-2: Current State Analysis
│  ├─ UI Agent: Visual Audit
│  │  ├─ Screenshot all pages/components
│  │  ├─ Identify design inconsistencies
│  │  ├─ List color token violations
│  │  ├─ List typography issues
│  │  ├─ List spacing violations
│  │  └─ Create audit report (50-100 issues)
│  └─ UX Agent: User Flow Analysis
│     ├─ Map all user journeys
│     ├─ Identify UX pain points
│     ├─ Analyze user feedback
│     └─ Create UX audit report
│
├─ Day 3-4: Design System Definition
│  ├─ UI Agent: New Design System
│  │  ├─ Define color palette
│  │  │  ├─ Primary colors (3-5)
│  │  │  ├─ Semantic colors (success, warning, error, info)
│  │  │  ├─ Neutral colors (10 shades)
│  │  │  └─ Dark mode variants
│  │  ├─ Define typography scale
│  │  │  ├─ Font families (heading, body, mono)
│  │  │  ├─ Font sizes (8 sizes)
│  │  │  ├─ Line heights
│  │  │  └─ Font weights
│  │  ├─ Define spacing system
│  │  │  ├─ Base unit (4px or 8px)
│  │  │  ├─ Spacing scale (0-96)
│  │  │  └─ Component spacing rules
│  │  ├─ Define border radius scale
│  │  ├─ Define shadow elevation system
│  │  └─ Define animation timing tokens
│  └─ Create design system documentation
│
└─ Day 5: Component Inventory & Prioritization
   ├─ List all components to redesign (50-200)
   ├─ Categorize by complexity
   │  ├─ Simple (buttons, inputs, badges)
   │  ├─ Medium (cards, modals, forms)
   │  └─ Complex (tables, charts, dashboards)
   ├─ Prioritize by impact × usage
   └─ Create implementation roadmap

Week 2: FOUNDATION COMPONENTS
├─ Day 1-2: Design Tokens Implementation
│  ├─ Coder Agent: Tailwind Config
│  │  ├─ Update tailwind.config.js
│  │  ├─ Add custom colors
│  │  ├─ Add custom spacing
│  │  ├─ Add custom typography
│  │  ├─ Add custom shadows
│  │  └─ Add custom animations
│  └─ Test token system
│
├─ Day 3-5: Core UI Primitives
│  ├─ Redesign Button component
│  │  ├─ Variants: primary, secondary, tertiary, ghost, danger
│  │  ├─ Sizes: xs, sm, md, lg, xl
│  │  ├─ States: default, hover, active, disabled, loading
│  │  ├─ Icons: left, right, icon-only
│  │  └─ Accessibility: focus, keyboard, screen reader
│  ├─ Redesign Input component
│  ├─ Redesign Select component
│  ├─ Redesign Checkbox component
│  ├─ Redesign Radio component
│  └─ Test all primitives

Week 3: COMPOSITE COMPONENTS
├─ Day 1-2: Form Components
│  ├─ Redesign FormField wrapper
│  ├─ Redesign FormLabel
│  ├─ Redesign FormError
│  ├─ Redesign FormHelp
│  └─ Test form components
│
├─ Day 3-4: Layout Components
│  ├─ Redesign Card component
│  ├─ Redesign Modal component
│  ├─ Redesign Drawer component
│  ├─ Redesign Tabs component
│  └─ Test layout components
│
└─ Day 5: Feedback Components
   ├─ Redesign Toast component
   ├─ Redesign Alert component
   ├─ Redesign Badge component
   └─ Test feedback components

Week 4: INTEGRATION & QA
├─ Day 1-2: Page-Level Integration
│  ├─ Apply new components to all pages
│  ├─ Fix layout issues
│  ├─ Verify visual consistency
│  └─ Test all user flows
│
├─ Day 3: Accessibility Audit
│  ├─ A11y Agent: WCAG 2.1 AA Compliance
│  │  ├─ Color contrast check (all combinations)
│  │  ├─ Keyboard navigation test (all components)
│  │  ├─ Screen reader test (NVDA, JAWS)
│  │  ├─ Focus indicator check
│  │  └─ Touch target size check (44×44px)
│  └─ Fix all A11y issues
│
├─ Day 4: Performance Audit
│  ├─ Performance Agent: Render Optimization
│  │  ├─ Lighthouse audit (target: 90+)
│  │  ├─ Bundle size check (target: < 10% increase)
│  │  ├─ Animation performance (target: 60fps)
│  │  ├─ CLS check (target: < 0.1)
│  │  └─ LCP check (target: < 2.5s)
│  └─ Optimize if needed
│
└─ Day 5: Final Review & Launch
   ├─ Reviewer Agent: Comprehensive Review
   │  ├─ Visual consistency check
   │  ├─ Code quality check
   │  ├─ Test coverage check
   │  └─ Documentation check
   ├─ QA Manual Agent: User Acceptance Testing
   │  ├─ Test all user flows
   │  ├─ Test on all browsers
   │  ├─ Test on all devices
   │  └─ Collect feedback
   └─ Deploy to production
```

**Output Artifacts:**
- New design system documentation
- Updated Tailwind config
- 50-200 redesigned components
- Accessibility audit report
- Performance audit report
- Before/after screenshots
- Migration guide

**Success Criteria:**
- All components follow new design system
- WCAG 2.1 AA compliant
- Lighthouse score 90+
- No performance regressions
- User feedback positive (> 4/5)

---

#### Workflow 2.2: Single Component UI Fix
**Trigger:** "Button looks wrong on mobile", "Card shadow is too dark"
**Scope:** 1-3 components
**Duration:** 2-4 hours
**Agent Chain:** UI → Coder → A11y

**Detailed Steps:**
```
Phase 1: VISUAL ANALYSIS (15 minutes)
├─ UI Agent: Issue Identification
│  ├─ Screenshot current state
│  ├─ Identify specific issues
│  │  ├─ Wrong color token?
│  │  ├─ Wrong spacing?
│  │  ├─ Wrong typography?
│  │  ├─ Wrong shadow?
│  │  ├─ Responsive issue?
│  │  └─ Dark mode issue?
│  ├─ Check design system compliance
│  └─ Propose fix

Phase 2: DESIGN SPECIFICATION (15 minutes)
├─ UI Agent: Fix Specification
│  ├─ Specify exact CSS changes
│  │  ├─ Which properties to change
│  │  ├─ Which tokens to use
│  │  ├─ Which breakpoints to target
│  │  └─ Which states to update
│  ├─ Create before/after mockup (text)
│  └─ List affected files

Phase 3: IMPLEMENTATION (1-2 hours)
├─ Coder Agent: CSS Updates
│  ├─ Update component styles
│  ├─ Replace hardcoded values with tokens
│  ├─ Fix responsive issues
│  ├─ Fix dark mode issues
│  └─ Test on all breakpoints

Phase 4: ACCESSIBILITY CHECK (30 minutes)
├─ A11y Agent: Quick A11y Audit
│  ├─ Check color contrast (if colors changed)
│  ├─ Check focus indicator (if interactive)
│  ├─ Check touch target size (if mobile)
│  └─ Fix if needed

Phase 5: VISUAL QA (15 minutes)
└─ UI Agent: Final Check
   ├─ Compare with design spec
   ├─ Test light/dark mode
   ├─ Test all breakpoints
   └─ Approve or request changes
```

**Output Artifacts:**
- Updated component file
- Before/after screenshots
- A11y check report

**Success Criteria:**
- Visual issue resolved
- Design system compliant
- No A11y regressions
- Works on all breakpoints

---

### Category 3: Performance Optimization

#### Workflow 3.1: Page Load Optimization
**Trigger:** "Page loads slowly", "FCP > 3s", "Lighthouse score < 50"
**Scope:** Initial page load performance
**Duration:** 1-2 days
**Agent Chain:** Performance → Coder → Reviewer

**Detailed Steps:**
```
Phase 1: BASELINE MEASUREMENT (30 minutes)
├─ Performance Agent: Current Metrics
│  ├─ Run Lighthouse (3 times, take median)
│  │  ├─ FCP (First Contentful Paint)
│  │  ├─ LCP (Largest Contentful Paint)
│  │  ├─ CLS (Cumulative Layout Shift)
│  │  ├─ TBT (Total Blocking Time)
│  │  ├─ SI (Speed Index)
│  │  └─ Overall Performance Score
│  ├─ Analyze network waterfall
│  │  ├─ Number of requests
│  │  ├─ Total transfer size
│  │  ├─ Blocking resources
│  │  └─ Critical path
│  ├─ Analyze bundle size
│  │  ├─ Main bundle size
│  │  ├─ Vendor bundle size
│  │  ├─ CSS bundle size
│  │  └─ Largest dependencies
│  └─ Document baseline metrics

Phase 2: ISSUE IDENTIFICATION (1 hour)
├─ Performance Agent: Bottleneck Analysis
│  ├─ Identify render-blocking resources
│  │  ├─ Synchronous scripts
│  │  ├─ Render-blocking CSS
│  │  └─ Large fonts
│  ├─ Identify large dependencies
│  │  ├─ Moment.js (use date-fns instead)
│  │  ├─ Lodash (use lodash-es + tree-shaking)
│  │  ├─ Large icon libraries (use selective imports)
│  │  └─ Unused dependencies
│  ├─ Identify code splitting opportunities
│  │  ├─ Route-based splitting
│  │  ├─ Component-based splitting
│  │  └─ Vendor splitting
│  ├─ Identify image optimization opportunities
│  │  ├─ Unoptimized images
│  │  ├─ Wrong formats (use WebP)
│  │  ├─ Missing lazy loading
│  │  └─ Missing responsive images
│  └─ Prioritize fixes (impact × effort)

Phase 3: QUICK WINS (2-4 hours)
├─ Coder Agent: Low-Hanging Fruit
│  ├─ Enable compression (gzip/brotli)
│  ├─ Add cache headers
│  ├─ Lazy load images
│  │  ├─ Add loading="lazy" attribute
│  │  ├─ Use next/image (if Next.js)
│  │  └─ Add blur placeholders
│  ├─ Defer non-critical scripts
│  │  ├─ Add defer attribute
│  │  ├─ Move scripts to end of body
│  │  └─ Use dynamic imports
│  ├─ Preload critical resources
│  │  ├─ Preload fonts
│  │  ├─ Preload hero images
│  │  └─ Preconnect to APIs
│  └─ Measure improvement

Phase 4: CODE SPLITTING (4-6 hours)
├─ Coder Agent: Bundle Optimization
│  ├─ Implement route-based code splitting
│  │  ├─ Use React.lazy() for routes
│  │  ├─ Add Suspense boundaries
│  │  └─ Add loading states
│  ├─ Implement component-based splitting
│  │  ├─ Lazy load modals
│  │  ├─ Lazy load charts
│  │  ├─ Lazy load heavy components
│  │  └─ Add loading states
│  ├─ Optimize vendor bundle
│  │  ├─ Split vendor chunks
│  │  ├─ Remove unused dependencies
│  │  ├─ Replace large dependencies
│  │  └─ Use tree-shaking
│  └─ Measure improvement

Phase 5: IMAGE OPTIMIZATION (2-3 hours)
├─ Coder Agent: Image Performance
│  ├─ Convert images to WebP
│  ├─ Generate responsive images
│  │  ├─ Multiple sizes (320w, 640w, 1024w, 1920w)
│  │  ├─ Use srcset attribute
│  │  └─ Use sizes attribute
│  ├─ Add blur placeholders
│  ├─ Implement lazy loading
│  └─ Measure improvement

Phase 6: FINAL MEASUREMENT (30 minutes)
└─ Performance Agent: After Metrics
   ├─ Run Lighthouse again (3 times)
   ├─ Compare before/after
   │  ├─ FCP improvement
   │  ├─ LCP improvement
   │  ├─ CLS improvement
   │  ├─ TBT improvement
   │  ├─ Bundle size reduction
   │  └─ Score improvement
   ├─ Document improvements
   └─ Create performance report
```

**Output Artifacts:**
- Performance audit report (before)
- Optimized code files
- Optimized images
- Performance audit report (after)
- Improvement metrics document

**Success Criteria:**
- FCP < 1.5s (was > 3s)
- LCP < 2.5s (was > 4s)
- Lighthouse score > 90 (was < 50)
- Bundle size reduced by 30%+

---

#### Workflow 3.2: Runtime Performance Optimization
**Trigger:** "App feels laggy", "animations are janky", "list scrolling is slow"
**Scope:** Runtime render performance
**Duration:** 1-2 days
**Agent Chain:** Performance → Coder → Reviewer

**Detailed Steps:**

```
Phase 1: PROFILING (1-2 hours)
├─ Performance Agent: React DevTools Profiler
│  ├─ Record user interactions
│  │  ├─ Page navigation
│  │  ├─ Form interactions
│  │  ├─ List scrolling
│  │  ├─ Modal opening
│  │  └─ Data filtering
│  ├─ Identify slow components
│  │  ├─ Components with > 16ms render time
│  │  ├─ Components that re-render unnecessarily
│  │  ├─ Components with expensive computations
│  │  └─ Components with large render trees
│  ├─ Analyze re-render patterns
│  │  ├─ Which components re-render together?
│  │  ├─ What triggers re-renders?
│  │  ├─ Are re-renders necessary?
│  │  └─ Can we prevent them?
│  └─ Create profiling report

Phase 2: MEMOIZATION (2-4 hours)
├─ Coder Agent: React.memo & useMemo
│  ├─ Wrap expensive components with React.memo
│  │  ├─ List items
│  │  ├─ Cards
│  │  ├─ Complex forms
│  │  └─ Charts
│  ├─ Memoize expensive computations
│  │  ├─ Filtering large arrays
│  │  ├─ Sorting large arrays
│  │  ├─ Complex calculations
│  │  └─ Data transformations
│  ├─ Memoize callback functions
│  │  ├─ Event handlers
│  │  ├─ API calls
│  │  └─ Form submissions
│  └─ Test improvements

Phase 3: VIRTUALIZATION (3-5 hours)
├─ Coder Agent: react-window Implementation
│  ├─ Identify long lists (> 100 items)
│  ├─ Install react-window
│  ├─ Replace list rendering
│  │  ├─ FixedSizeList for uniform items
│  │  ├─ VariableSizeList for dynamic items
│  │  └─ Add proper styling
│  ├─ Handle scrolling behavior
│  │  ├─ Scroll to top on filter
│  │  ├─ Preserve scroll position
│  │  └─ Smooth scrolling
│  └─ Test with large datasets (1000+ items)

Phase 4: ANIMATION OPTIMIZATION (2-3 hours)
├─ Performance Agent: 60fps Verification
│  ├─ Profile animations with Chrome DevTools
│  ├─ Identify janky animations (< 60fps)
│  ├─ Fix animation performance
│  │  ├─ Use transform instead of top/left
│  │  ├─ Use opacity instead of visibility
│  │  ├─ Use will-change for complex animations
│  │  ├─ Avoid animating layout properties
│  │  └─ Use CSS animations over JS
│  └─ Verify 60fps with DevTools

Phase 5: STATE MANAGEMENT OPTIMIZATION (2-4 hours)
├─ Coder Agent: Context & State Optimization
│  ├─ Split large contexts
│  │  ├─ Separate read/write contexts
│  │  ├─ Split by domain
│  │  └─ Use multiple providers
│  ├─ Optimize React Query
│  │  ├─ Adjust staleTime
│  │  ├─ Adjust cacheTime
│  │  ├─ Use select for derived data
│  │  └─ Disable unnecessary refetches
│  ├─ Move state down
│  │  ├─ Colocate state with usage
│  │  ├─ Remove unnecessary global state
│  │  └─ Use local state when possible
│  └─ Test improvements

Phase 6: FINAL VERIFICATION (1 hour)
└─ Performance Agent: Performance Metrics
   ├─ Re-profile with React DevTools
   ├─ Measure frame rate (target: 60fps)
   ├─ Measure interaction latency (target: < 100ms)
   ├─ Compare before/after
   │  ├─ Render time reduction
   │  ├─ Re-render count reduction
   │  ├─ Frame rate improvement
   │  └─ Interaction latency improvement
   └─ Create performance report
```

**Output Artifacts:**
- Profiling report (before)
- Optimized component files
- Profiling report (after)
- Performance improvement metrics

**Success Criteria:**
- All interactions < 100ms
- All animations 60fps
- Re-renders reduced by 50%+
- No janky scrolling

---

### Category 4: Security & Compliance

#### Workflow 4.1: Security Vulnerability Remediation
**Trigger:** "npm audit found vulnerabilities", "Snyk alert", "security scan failed"
**Severity:** Varies (CRITICAL to LOW)
**Duration:** 2 hours to 2 days (depends on severity)
**Agent Chain:** Security → Coder → Tester → Reviewer

**Detailed Steps:**
```
Phase 1: VULNERABILITY ASSESSMENT (30-60 minutes)
├─ Security Agent: Threat Analysis
│  ├─ Run security scans
│  │  ├─ npm audit
│  │  ├─ Snyk scan
│  │  ├─ OWASP ZAP scan
│  │  └─ Manual code review
│  ├─ Classify vulnerabilities
│  │  ├─ CRITICAL (CVSS 9.0-10.0)
│  │  │  ├─ Remote code execution
│  │  │  ├─ SQL injection
│  │  │  ├─ Authentication bypass
│  │  │  └─ Sensitive data exposure
│  │  ├─ HIGH (CVSS 7.0-8.9)
│  │  │  ├─ XSS vulnerabilities
│  │  │  ├─ CSRF vulnerabilities
│  │  │  ├─ Insecure dependencies
│  │  │  └─ Broken access control
│  │  ├─ MEDIUM (CVSS 4.0-6.9)
│  │  │  ├─ Information disclosure
│  │  │  ├─ Weak encryption
│  │  │  └─ Security misconfiguration
│  │  └─ LOW (CVSS 0.1-3.9)
│  │     ├─ Minor info leaks
│  │     └─ Low-impact issues
│  ├─ Assess exploitability
│  │  ├─ Is exploit publicly available?
│  │  ├─ Is it being actively exploited?
│  │  ├─ What's the attack complexity?
│  │  └─ What's the required privilege level?
│  ├─ Assess business impact
│  │  ├─ Data at risk
│  │  ├─ Users affected
│  │  ├─ Compliance implications
│  │  └─ Reputation damage
│  └─ Prioritize fixes (severity × exploitability × impact)

Phase 2: EXPLOIT SCENARIO (30 minutes per vulnerability)
├─ Security Agent: Attack Simulation
│  ├─ For each CRITICAL/HIGH vulnerability:
│  │  ├─ Describe attack vector
│  │  ├─ Show proof-of-concept exploit
│  │  ├─ Demonstrate impact
│  │  ├─ Estimate likelihood
│  │  └─ Calculate risk score
│  └─ Document all scenarios

Phase 3: REMEDIATION PLANNING (1-2 hours)
├─ Security Agent: Fix Strategy
│  ├─ For dependency vulnerabilities:
│  │  ├─ Check if patch available
│  │  ├─ Check if breaking changes
│  │  ├─ Check if alternative exists
│  │  └─ Plan upgrade path
│  ├─ For code vulnerabilities:
│  │  ├─ Identify vulnerable code
│  │  ├─ Propose secure alternative
│  │  ├─ List affected files
│  │  └─ Estimate effort
│  └─ Create remediation roadmap

Phase 4: IMPLEMENTATION (varies by severity)
├─ CRITICAL Vulnerabilities (fix immediately)
│  ├─ Coder Agent: Emergency Fix
│  │  ├─ Implement fix
│  │  ├─ Test locally
│  │  ├─ Deploy to staging
│  │  ├─ Verify fix
│  │  └─ Deploy to production
│  └─ Timeline: 2-4 hours
│
├─ HIGH Vulnerabilities (fix within 24 hours)
│  ├─ Coder Agent: Priority Fix
│  │  ├─ Update dependencies
│  │  ├─ Refactor vulnerable code
│  │  ├─ Add input validation
│  │  ├─ Add output encoding
│  │  └─ Test thoroughly
│  └─ Timeline: 4-8 hours
│
└─ MEDIUM/LOW Vulnerabilities (fix in next sprint)
   ├─ Coder Agent: Scheduled Fix
   │  ├─ Plan fix with other work
   │  ├─ Implement fix
   │  └─ Test normally
   └─ Timeline: 1-2 days

Phase 5: SECURITY TESTING (1-2 hours per fix)
├─ Tester Agent: Penetration Testing
│  ├─ Attempt original exploit
│  ├─ Verify exploit fails
│  ├─ Try bypass techniques
│  ├─ Test edge cases
│  └─ Write security tests

Phase 6: VERIFICATION (30-60 minutes)
├─ Security Agent: Post-Fix Audit
│  ├─ Re-run security scans
│  ├─ Verify all vulnerabilities fixed
│  ├─ Check for new vulnerabilities
│  └─ Create security report

Phase 7: REVIEW & DEPLOY (30 minutes)
└─ Reviewer Agent: Security Review
   ├─ Verify fix completeness
   ├─ Check for side effects
   ├─ Verify test coverage
   └─ Approve for deployment
```

**Output Artifacts:**
- Security audit report (before)
- Vulnerability assessment document
- Exploit scenario documentation
- Fixed code files
- Security test suite
- Security audit report (after)
- Incident report (if production)

**Success Criteria:**
- All CRITICAL/HIGH vulnerabilities fixed
- Security scans pass
- Penetration tests pass
- No new vulnerabilities introduced

---

#### Workflow 4.2: Accessibility Compliance Audit
**Trigger:** "Make site accessible", "WCAG compliance needed", "screen reader issues"
**Standard:** WCAG 2.1 Level AA
**Duration:** 1-2 weeks (full site)
**Agent Chain:** A11y → UI → Coder → QA Manual → Reviewer

**Detailed Steps:**
```
Week 1: AUDIT & PLANNING

Day 1-2: Automated Audit (8-16 hours)
├─ A11y Agent: Automated Testing
│  ├─ Run axe DevTools on all pages
│  ├─ Run WAVE on all pages
│  ├─ Run Lighthouse accessibility audit
│  ├─ Categorize issues
│  │  ├─ CRITICAL (blocks screen reader users)
│  │  │  ├─ Missing alt text on images
│  │  │  ├─ Missing form labels
│  │  │  ├─ Broken keyboard navigation
│  │  │  └─ Missing ARIA labels
│  │  ├─ HIGH (major usability issues)
│  │  │  ├─ Low color contrast
│  │  │  ├─ Missing focus indicators
│  │  │  ├─ Incorrect heading hierarchy
│  │  │  └─ Missing landmark regions
│  │  ├─ MEDIUM (moderate issues)
│  │  │  ├─ Missing skip links
│  │  │  ├─ Redundant ARIA
│  │  │  └─ Unclear link text
│  │  └─ LOW (minor improvements)
│  │     ├─ Missing lang attribute
│  │     └─ Minor ARIA improvements
│  └─ Create audit report (100-500 issues)

Day 3: Manual Testing (4-8 hours)
├─ A11y Agent: Manual Audit
│  ├─ Keyboard navigation test
│  │  ├─ Tab through all interactive elements
│  │  ├─ Test all keyboard shortcuts
│  │  ├─ Test focus trapping in modals
│  │  └─ Test skip links
│  ├─ Screen reader test (NVDA/JAWS)
│  │  ├─ Navigate with screen reader
│  │  ├─ Test form interactions
│  │  ├─ Test dynamic content
│  │  └─ Test error messages
│  ├─ Zoom test (200%, 400%)
│  │  ├─ Test layout at 200% zoom
│  │  ├─ Test layout at 400% zoom
│  │  └─ Verify no content loss
│  └─ Document manual findings

Day 4: Prioritization (2-4 hours)
├─ A11y Agent: Remediation Plan
│  ├─ Group issues by component
│  ├─ Estimate effort per issue
│  ├─ Prioritize by impact × effort
│  └─ Create implementation roadmap

Day 5: Quick Wins (4-8 hours)
└─ Coder Agent: Low-Hanging Fruit
   ├─ Add missing alt text
   ├─ Add missing form labels
   ├─ Fix color contrast issues
   ├─ Add focus indicators
   └─ Test improvements

Week 2: IMPLEMENTATION & VERIFICATION

Day 1-2: Keyboard Navigation (8-16 hours)
├─ Coder Agent: Keyboard Accessibility
│  ├─ Fix tab order
│  ├─ Add keyboard shortcuts
│  ├─ Implement focus trapping
│  ├─ Add skip links
│  └─ Test all interactions

Day 3: Screen Reader Support (8-16 hours)
├─ Coder Agent: ARIA Implementation
│  ├─ Add ARIA labels
│  ├─ Add ARIA live regions
│  ├─ Add ARIA descriptions
│  ├─ Fix heading hierarchy
│  └─ Test with screen reader

Day 4: Visual Accessibility (4-8 hours)
├─ UI Agent: Visual Improvements
│  ├─ Fix all color contrast issues
│  ├─ Improve focus indicators
│  ├─ Add visual feedback
│  └─ Test at 200% zoom

Day 5: Final Testing & Certification (8 hours)
├─ QA Manual Agent: Comprehensive Testing
│  ├─ Re-run automated tests
│  ├─ Re-test keyboard navigation
│  ├─ Re-test screen reader
│  ├─ Test with real users (if possible)
│  └─ Create compliance report
│
└─ Reviewer Agent: Final Review
   ├─ Verify all issues fixed
   ├─ Check WCAG 2.1 AA compliance
   ├─ Review test results
   └─ Approve for production
```

**Output Artifacts:**
- Accessibility audit report (before)
- Issue categorization document
- Fixed code files
- ARIA implementation guide
- Accessibility audit report (after)
- WCAG 2.1 AA compliance certificate

**Success Criteria:**
- WCAG 2.1 Level AA compliant
- Lighthouse accessibility score 100
- axe DevTools: 0 violations
- Keyboard navigation: 100% functional
- Screen reader: 100% usable

---

### Category 5: Architecture & Refactoring

#### Workflow 5.1: Large-Scale Refactoring
**Trigger:** "Code is messy", "too much technical debt", "hard to maintain"
**Scope:** Multiple files, architectural changes
**Duration:** 1-4 weeks
**Agent Chain:** Architect → Reviewer → Coder → Tester

**Detailed Steps:**
```
Week 1: ASSESSMENT & PLANNING

Phase 1: Code Quality Audit (2-3 days)
├─ Architect Agent: Codebase Analysis
│  ├─ Analyze project structure
│  │  ├─ Check 8-layer compliance
│  │  ├─ Identify layer violations
│  │  ├─ Check module boundaries
│  │  └─ Identify circular dependencies
│  ├─ Analyze component quality
│  │  ├─ Identify god components (> 300 lines)
│  │  ├─ Check 9-block anatomy compliance
│  │  ├─ Identify prop drilling
│  │  └─ Identify duplicate code
│  ├─ Analyze state management
│  │  ├─ Check state hierarchy compliance
│  │  ├─ Identify useState for server data
│  │  ├─ Identify useEffect for derived data
│  │  └─ Identify unnecessary global state
│  ├─ Analyze code quality
│  │  ├─ Run ESLint
│  │  ├─ Check TypeScript coverage
│  │  ├─ Check test coverage
│  │  └─ Identify code smells
│  └─ Create audit report (50-200 issues)

Phase 2: Refactoring Strategy (1-2 days)
├─ Architect Agent: Refactoring Plan
│  ├─ Categorize issues
│  │  ├─ Architecture violations
│  │  ├─ Component quality issues
│  │  ├─ State management issues
│  │  ├─ Code quality issues
│  │  └─ Missing tests
│  ├─ Estimate effort
│  │  ├─ Quick fixes (< 1 hour)
│  │  ├─ Medium fixes (1-4 hours)
│  │  ├─ Large fixes (4-16 hours)
│  │  └─ Architectural changes (16+ hours)
│  ├─ Prioritize by impact × effort
│  ├─ Create refactoring roadmap
│  └─ Define success criteria

Phase 3: Risk Assessment (1 day)
└─ Reviewer Agent: Risk Analysis
   ├─ Identify high-risk changes
   ├─ Plan mitigation strategies
   ├─ Define rollback procedures
   └─ Create risk register

Week 2-3: IMPLEMENTATION

Phase 4: Architecture Fixes (1-2 weeks)
├─ Coder Agent: Structural Refactoring
│  ├─ Fix layer violations
│  │  ├─ Move misplaced files
│  │  ├─ Fix import paths
│  │  ├─ Remove circular dependencies
│  │  └─ Test after each move
│  ├─ Split god components
│  │  ├─ Extract sub-components
│  │  ├─ Extract custom hooks
│  │  ├─ Extract utilities
│  │  └─ Test after each split
│  ├─ Fix state management
│  │  ├─ Migrate to React Query
│  │  ├─ Remove unnecessary useState
│  │  ├─ Replace useEffect with useMemo
│  │  └─ Test after each change
│  └─ Verify no functionality broken

Phase 5: Code Quality Improvements (3-5 days)
├─ Coder Agent: Quality Refactoring
│  ├─ Add TypeScript types
│  ├─ Fix ESLint violations
│  ├─ Remove duplicate code
│  ├─ Improve naming
│  ├─ Add JSDoc comments
│  └─ Test after each change

Phase 6: Test Coverage (3-5 days)
└─ Tester Agent: Test Suite
   ├─ Add missing unit tests
   ├─ Add missing component tests
   ├─ Add missing integration tests
   └─ Verify 80%+ coverage

Week 4: VERIFICATION & DEPLOYMENT

Phase 7: Comprehensive Review (2-3 days)
├─ Reviewer Agent: Code Review
│  ├─ Review all changes
│  ├─ Verify architecture compliance
│  ├─ Verify code quality
│  ├─ Verify test coverage
│  └─ Request changes or approve

Phase 8: QA Testing (2-3 days)
├─ QA Manual Agent: Regression Testing
│  ├─ Test all user flows
│  ├─ Test edge cases
│  ├─ Test on all browsers
│  ├─ Test on all devices
│  └─ Report any regressions

Phase 9: Deployment (1 day)
└─ DevOps Agent: Staged Rollout
   ├─ Deploy to staging
   ├─ Run smoke tests
   ├─ Deploy to production (10% traffic)
   ├─ Monitor for issues
   ├─ Gradually increase to 100%
   └─ Monitor for 24 hours
```

**Output Artifacts:**
- Code quality audit report (before)
- Refactoring plan document
- Risk register
- Refactored code files
- New test files
- Code quality audit report (after)
- Migration guide

**Success Criteria:**
- 100% 8-layer compliance
- 100% 9-block anatomy compliance
- 0 god components (> 300 lines)
- 80%+ test coverage
- 0 ESLint errors
- 0 TypeScript errors

---

### Category 6: Testing & Quality Assurance

#### Workflow 6.1: Comprehensive Test Suite Creation
**Trigger:** "Add tests", "improve test coverage", "no tests exist"
**Scope:** Full test suite (unit + integration + E2E)
**Duration:** 1-2 weeks
**Agent Chain:** Tester → Coder → QA Manual → Reviewer

**Detailed Steps:**

```
Week 1: SETUP & UNIT TESTS

Day 1: Test Infrastructure (4-8 hours)
├─ Tester Agent: Test Setup
│  ├─ Install testing dependencies
│  │  ├─ Vitest (unit/component tests)
│  │  ├─ @testing-library/react
│  │  ├─ @testing-library/user-event
│  │  ├─ @testing-library/jest-dom
│  │  └─ Playwright (E2E tests)
│  ├─ Configure Vitest
│  │  ├─ vitest.config.js
│  │  ├─ Coverage thresholds (80% services, 60% components)
│  │  ├─ Test patterns
│  │  └─ Setup files
│  ├─ Configure Playwright
│  │  ├─ playwright.config.ts
│  │  ├─ All browsers (Chromium, Firefox, WebKit)
│  │  ├─ Mobile devices
│  │  └─ Base URL
│  ├─ Create test utilities
│  │  ├─ Custom render function
│  │  ├─ Mock providers
│  │  ├─ Test data factories
│  │  └─ Helper functions
│  └─ Verify setup works

Day 2-3: Service Layer Tests (8-16 hours)
├─ Tester Agent: Unit Tests for Services
│  ├─ For each service file:
│  │  ├─ Test happy path
│  │  ├─ Test error cases
│  │  ├─ Test edge cases
│  │  ├─ Test null/undefined inputs
│  │  └─ Mock API calls
│  ├─ Target: 80%+ coverage
│  └─ Example test structure:
│     ```javascript
│     describe('productService', () => {
│       describe('getProducts', () => {
│         it('returns products on success', async () => {
│           // Arrange
│           const mockProducts = [{ id: 1, name: 'Product 1' }]
│           vi.spyOn(apiClient, 'get').mockResolvedValue({ data: mockProducts })
│           
│           // Act
│           const result = await productService.getProducts()
│           
│           // Assert
│           expect(result.data).toEqual(mockProducts)
│           expect(result.error).toBeNull()
│         })
│         
│         it('returns error on failure', async () => {
│           // Arrange
│           vi.spyOn(apiClient, 'get').mockRejectedValue(new Error('Network error'))
│           
│           // Act
│           const result = await productService.getProducts()
│           
│           // Assert
│           expect(result.data).toEqual([])
│           expect(result.error).toBe('Network error')
│         })
│         
│         it('handles null response', async () => {
│           // Arrange
│           vi.spyOn(apiClient, 'get').mockResolvedValue({ data: null })
│           
│           // Act
│           const result = await productService.getProducts()
│           
│           // Assert
│           expect(result.data).toEqual([])
│           expect(result.error).toBeNull()
│         })
│       })
│     })
│     ```

Day 4-5: Utility Function Tests (8-16 hours)
└─ Tester Agent: Unit Tests for Utils
   ├─ For each util file:
   │  ├─ Test all exported functions
   │  ├─ Test edge cases
   │  ├─ Test null/undefined
   │  ├─ Test boundary values
   │  └─ Test error conditions
   ├─ Target: 80%+ coverage
   └─ Example test structure:
      ```javascript
      describe('formatCurrency', () => {
        it('formats positive numbers', () => {
          expect(formatCurrency(150000)).toBe('Rp 150,000')
        })
        
        it('formats negative numbers', () => {
          expect(formatCurrency(-150000)).toBe('-Rp 150,000')
        })
        
        it('handles zero', () => {
          expect(formatCurrency(0)).toBe('Rp 0')
        })
        
        it('handles null', () => {
          expect(formatCurrency(null)).toBe('—')
        })
        
        it('handles undefined', () => {
          expect(formatCurrency(undefined)).toBe('—')
        })
        
        it('handles NaN', () => {
          expect(formatCurrency(NaN)).toBe('—')
        })
      })
      ```

Week 2: COMPONENT & INTEGRATION TESTS

Day 1-2: Hook Tests (8-16 hours)
├─ Tester Agent: Custom Hook Tests
│  ├─ For each custom hook:
│  │  ├─ Test initial state
│  │  ├─ Test state updates
│  │  ├─ Test side effects
│  │  ├─ Test cleanup
│  │  └─ Test error handling
│  ├─ Use @testing-library/react-hooks
│  ├─ Target: 80%+ coverage
│  └─ Example test structure:
│     ```javascript
│     describe('useProducts', () => {
│       it('fetches products on mount', async () => {
│         // Arrange
│         const mockProducts = [{ id: 1, name: 'Product 1' }]
│         vi.spyOn(productService, 'fetchAll').mockResolvedValue({ data: mockProducts })
│         
│         // Act
│         const { result, waitForNextUpdate } = renderHook(() => useProducts())
│         
│         // Assert - initial state
│         expect(result.current.isLoading).toBe(true)
│         expect(result.current.products).toEqual([])
│         
│         // Wait for data
│         await waitForNextUpdate()
│         
│         // Assert - loaded state
│         expect(result.current.isLoading).toBe(false)
│         expect(result.current.products).toEqual(mockProducts)
│       })
│       
│       it('handles fetch error', async () => {
│         // Arrange
│         vi.spyOn(productService, 'fetchAll').mockResolvedValue({ 
│           data: [], 
│           error: 'Network error' 
│         })
│         
│         // Act
│         const { result, waitForNextUpdate } = renderHook(() => useProducts())
│         await waitForNextUpdate()
│         
│         // Assert
│         expect(result.current.error).toBe('Network error')
│         expect(result.current.products).toEqual([])
│       })
│     })
│     ```

Day 3-5: Component Tests (12-24 hours)
├─ Tester Agent: Component Tests (4 States)
│  ├─ For each component:
│  │  ├─ Test loading state
│  │  ├─ Test error state
│  │  ├─ Test empty state
│  │  ├─ Test success state
│  │  ├─ Test user interactions
│  │  ├─ Test accessibility
│  │  └─ Test edge cases
│  ├─ Use @testing-library/react
│  ├─ Target: 60%+ coverage
│  └─ Example test structure:
│     ```javascript
│     describe('ProductList', () => {
│       it('renders loading state', () => {
│         render(<ProductList isLoading={true} products={[]} />)
│         expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
│         expect(screen.getByLabelText('Loading products')).toBeInTheDocument()
│       })
│       
│       it('renders error state', () => {
│         render(<ProductList error="Failed to load" products={[]} />)
│         expect(screen.getByRole('alert')).toBeInTheDocument()
│         expect(screen.getByText('Failed to load products')).toBeInTheDocument()
│       })
│       
│       it('renders empty state', () => {
│         render(<ProductList products={[]} />)
│         expect(screen.getByText('No products yet')).toBeInTheDocument()
│         expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument()
│       })
│       
│       it('renders products', () => {
│         const products = [
│           { id: 1, name: 'Product 1', price: 100000, stock: 10 },
│           { id: 2, name: 'Product 2', price: 200000, stock: 5 }
│         ]
│         render(<ProductList products={products} />)
│         
│         expect(screen.getByText('Product 1')).toBeInTheDocument()
│         expect(screen.getByText('Product 2')).toBeInTheDocument()
│         expect(screen.getByText('Rp 100,000')).toBeInTheDocument()
│         expect(screen.getByText('Rp 200,000')).toBeInTheDocument()
│       })
│       
│       it('calls onEdit when edit button clicked', async () => {
│         const onEdit = vi.fn()
│         const products = [{ id: 1, name: 'Product 1', price: 100000, stock: 10 }]
│         
│         render(<ProductList products={products} onEdit={onEdit} />)
│         
│         const editButton = screen.getByLabelText('Edit Product 1')
│         await userEvent.click(editButton)
│         
│         expect(onEdit).toHaveBeenCalledWith(products[0])
│       })
│       
│       it('is keyboard accessible', async () => {
│         const onEdit = vi.fn()
│         const products = [{ id: 1, name: 'Product 1', price: 100000, stock: 10 }]
│         
│         render(<ProductList products={products} onEdit={onEdit} />)
│         
│         const editButton = screen.getByLabelText('Edit Product 1')
│         editButton.focus()
│         await userEvent.keyboard('{Enter}')
│         
│         expect(onEdit).toHaveBeenCalled()
│       })
│     })
│     ```

Week 3: E2E TESTS

Day 1: E2E Test Planning (4 hours)
├─ Tester Agent: Test Scenario Definition
│  ├─ Identify critical user flows
│  │  ├─ Authentication flow
│  │  ├─ Main feature flows
│  │  ├─ Purchase/checkout flow
│  │  └─ Admin flows
│  ├─ Define test scenarios
│  ├─ Define test data
│  └─ Create test plan

Day 2-5: E2E Test Implementation (16-32 hours)
└─ Tester Agent: Playwright Tests
   ├─ For each critical flow:
   │  ├─ Write E2E test
   │  ├─ Test happy path
   │  ├─ Test error cases
   │  ├─ Test on all browsers
   │  └─ Test on mobile devices
   ├─ Example test structure:
   │  ```javascript
   │  test.describe('Product Management', () => {
   │    test('user can create a product', async ({ page }) => {
   │      // Navigate to products page
   │      await page.goto('/products')
   │      
   │      // Click "Add Product" button
   │      await page.click('button:has-text("Add Product")')
   │      
   │      // Fill form
   │      await page.fill('input[name="name"]', 'Test Product')
   │      await page.fill('input[name="sku"]', 'TEST-001')
   │      await page.fill('input[name="price"]', '150000')
   │      await page.fill('input[name="stock"]', '10')
   │      await page.selectOption('select[name="category"]', 'Electronics')
   │      
   │      // Submit form
   │      await page.click('button:has-text("Save")')
   │      
   │      // Verify success
   │      await expect(page.locator('text=Test Product')).toBeVisible()
   │      await expect(page.locator('text=Product added successfully')).toBeVisible()
   │    })
   │    
   │    test('user can edit a product', async ({ page }) => {
   │      // ... similar structure
   │    })
   │    
   │    test('user can delete a product', async ({ page }) => {
   │      // ... similar structure
   │    })
   │    
   │    test('form validation works', async ({ page }) => {
   │      await page.goto('/products')
   │      await page.click('button:has-text("Add Product")')
   │      
   │      // Submit empty form
   │      await page.click('button:has-text("Save")')
   │      
   │      // Verify validation errors
   │      await expect(page.locator('text=Name is required')).toBeVisible()
   │      await expect(page.locator('text=Price is required')).toBeVisible()
   │    })
   │  })
   │  ```
   └─ Target: 10-20 critical flows covered

Week 4: VERIFICATION & DOCUMENTATION

Day 1-2: Coverage Analysis (8 hours)
├─ Tester Agent: Coverage Report
│  ├─ Run coverage report
│  ├─ Identify gaps
│  ├─ Add missing tests
│  └─ Verify thresholds met

Day 3: Manual QA (8 hours)
├─ QA Manual Agent: Exploratory Testing
│  ├─ Test all features manually
│  ├─ Try to break the app
│  ├─ Test edge cases
│  └─ Report any issues

Day 4: Documentation (4 hours)
├─ Tester Agent: Test Documentation
│  ├─ Document test structure
│  ├─ Document how to run tests
│  ├─ Document how to add tests
│  └─ Create testing guide

Day 5: Review & CI Integration (4 hours)
└─ Reviewer Agent: Final Review
   ├─ Review all tests
   ├─ Verify coverage
   ├─ Integrate with CI/CD
   └─ Approve test suite
```

**Output Artifacts:**
- Test configuration files
- Unit test files (services, utils)
- Hook test files
- Component test files
- E2E test files
- Coverage report
- Testing documentation

**Success Criteria:**
- 80%+ coverage for services/hooks
- 60%+ coverage for components
- 10-20 E2E tests for critical flows
- All tests passing
- CI/CD integration complete

---

## 🎯 AGENT ROUTER IMPLEMENTATION

Now let's create the actual Agent Router that will intelligently route user requests:

### Agent Router Specification

**File:** `agents/router.md`

```markdown
# FORGE AGENT: INTELLIGENT ROUTER
**Role:** Master agent that analyzes user intent and routes to appropriate specialized agents
**Activation:** Always active as first point of contact

---

## YOUR MISSION

You are the traffic controller of the Forge Agent System. Your job is to:
1. Understand what the user wants to accomplish
2. Classify their intent into one of 20 categories
3. Route them to the right agent(s) with the right workflow
4. Provide clear next steps

You are NOT a general-purpose assistant. You are a specialized router.

---

## ROUTING PROTOCOL

### Step 1: INTENT CLASSIFICATION (30 seconds)

Analyze the user's request and classify into ONE primary intent:

**Keywords → Intent Mapping:**
```
Bug/Error Keywords:
- "bug", "broken", "not working", "error", "crash", "issue", "fails"
→ Intent: BUG_FIX

Performance Keywords:
- "slow", "performance", "optimize", "faster", "lag", "loading"
→ Intent: PERFORMANCE_OPTIMIZATION

UI Keywords:
- "UI", "design", "visual", "layout", "styling", "colors", "typography"
→ Intent: UI_IMPROVEMENT

UX Keywords:
- "UX", "user experience", "flow", "navigation", "usability", "confusing"
→ Intent: UX_IMPROVEMENT

Security Keywords:
- "security", "vulnerability", "XSS", "CSRF", "injection", "exploit"
→ Intent: SECURITY_FIX

Accessibility Keywords:
- "accessibility", "a11y", "screen reader", "keyboard", "WCAG"
→ Intent: ACCESSIBILITY_FIX

Testing Keywords:
- "test", "testing", "coverage", "unit test", "E2E"
→ Intent: TESTING

Refactoring Keywords:
- "refactor", "clean up", "improve code", "technical debt"
→ Intent: REFACTORING

... (continue for all 20 intents)
```

### Step 2: AGENT SELECTION

Based on intent, select agents from routing table:

| Intent | Primary Agent | Secondary Agents | Workflow |
|--------|---------------|------------------|----------|
| BUG_FIX | Coder | Tester, Reviewer | workflows/situational/01-bug-fix.workflow.md |
| UI_IMPROVEMENT | UI | Coder, A11y, Performance | workflows/situational/02-ui-improvement.workflow.md |
| ... | ... | ... | ... |

### Step 3: CONTEXT GATHERING

Ask clarifying questions if needed:
- Severity? (CRITICAL/HIGH/MEDIUM/LOW)
- Scope? (single file / multiple files / full system)
- Timeline? (immediate / this week / next sprint)
- Environment? (production / staging / development)

### Step 4: ROUTING OUTPUT

Provide clear routing instructions:

```
🎯 INTENT DETECTED: [Intent Name]
📋 WORKFLOW: [Workflow Name]
👥 AGENTS NEEDED:
   1. [Primary Agent] (primary)
   2. [Secondary Agent] (if needed)
   3. [Tertiary Agent] (optional)

⏱️ ESTIMATED TIME: [duration]

📖 NEXT STEPS:
1. [First step]
2. [Second step]
3. [Third step]

🔗 DETAILED WORKFLOW: [link to workflow file]
```

---

## EXAMPLE ROUTING SCENARIOS

### Example 1: Bug Fix Request
**User:** "The login button doesn't work on mobile"

**Your Response:**
```
🎯 INTENT DETECTED: BUG_FIX
📋 WORKFLOW: Bug Fix Workflow
👥 AGENTS NEEDED:
   1. Coder Agent (primary) - Debug and fix the issue
   2. Tester Agent - Write regression test
   3. Reviewer Agent - Review the fix

⏱️ ESTIMATED TIME: 1-2 hours

📖 NEXT STEPS:
1. Activate Coder Agent with: "Debug login button on mobile"
2. Reproduce the bug locally
3. Implement minimal fix
4. Write regression test
5. Get code review

🔗 DETAILED WORKFLOW: workflows/situational/01-bug-fix.workflow.md
```

### Example 2: UI Improvement Request
**User:** "Make the dashboard look more modern"

**Your Response:**
```
🎯 INTENT DETECTED: UI_IMPROVEMENT (Large-Scale)
📋 WORKFLOW: Large-Scale UI Overhaul
👥 AGENTS NEEDED:
   1. UI Agent (primary) - Design system and visual audit
   2. UX Agent - User flow analysis
   3. Coder Agent - Implementation
   4. A11y Agent - Accessibility compliance
   5. Performance Agent - Performance impact

⏱️ ESTIMATED TIME: 2-4 weeks

📖 NEXT STEPS:
1. Activate UI Agent with: "Audit current dashboard design"
2. Review audit report
3. Define new design system
4. Implement component by component
5. Run accessibility and performance audits

🔗 DETAILED WORKFLOW: workflows/situational/02-ui-improvement.workflow.md

⚠️ NOTE: This is a large project. Consider breaking it into smaller phases.
```

---

## AMBIGUITY HANDLING

If the user's request is ambiguous, ask clarifying questions:

**User:** "Improve the app"

**Your Response:**
```
I need more specifics to route you correctly. What aspect would you like to improve?

1. 🐛 Fix bugs or errors
2. 🎨 Improve visual design (UI)
3. 🧭 Improve user experience (UX)
4. ⚡ Improve performance (speed)
5. 🔒 Improve security
6. ♿ Improve accessibility
7. 🧪 Add/improve tests
8. 🏗️ Refactor code quality
9. 📱 Optimize for mobile
10. 🌍 Add internationalization

Please specify, or describe what's not working well.
```

---

## MULTI-INTENT HANDLING

If the user has multiple intents, prioritize and sequence:

**User:** "Fix the slow product list and make it look better"

**Your Response:**
```
I detected TWO intents:
1. PERFORMANCE_OPTIMIZATION (slow product list)
2. UI_IMPROVEMENT (make it look better)

RECOMMENDED SEQUENCE:
1. Fix performance FIRST (slow list)
   - Agent: Performance + Coder
   - Time: 4-8 hours
   - Workflow: workflows/situational/04-performance-optimization.workflow.md

2. Then improve UI (visual design)
   - Agent: UI + Coder
   - Time: 2-4 hours
   - Workflow: workflows/situational/02-ui-improvement.workflow.md

REASON: Performance fixes may require structural changes that affect UI.
Better to optimize first, then polish visuals.

Proceed with performance optimization?
```

---

## ERROR HANDLING

If you cannot classify the intent:

```
❌ I couldn't determine the best workflow for your request.

Your request: "[user's request]"

Could you rephrase using one of these patterns?
- "Fix [specific bug]"
- "Improve [specific aspect]"
- "Add [specific feature]"
- "Optimize [specific area]"
- "Review [specific code]"

Or choose from common scenarios:
1. Fix a bug
2. Improve UI/UX
3. Optimize performance
4. Add security
5. Write tests
6. Refactor code
7. Review code
8. Deploy changes
```

---

## ROUTING TABLE (Complete)

[Include full routing table with all 20 intents]

---

## SUCCESS CRITERIA

You've done your job well if:
- User knows exactly which agent to activate
- User knows which workflow to follow
- User has realistic time expectations
- User has clear next steps
- No ambiguity remains
```

---

**Status:** Planning complete, ready for implementation
**Next Action:** Review and approve, then begin implementation

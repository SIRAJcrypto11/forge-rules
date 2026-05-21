# 🔥 Forge Rules v2.4
### Universal System Architecture & UI/UX Constitution + AI Agent System
**Standard: Silicon Valley Senior Engineer Level**

> *"Structure is freedom. Chaos is the real constraint."*

[![Version](https://img.shields.io/badge/version-2.4.0-blue.svg)](https://github.com/SIRAJcrypto11/forge-rules)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![AI Compatible](https://img.shields.io/badge/AI-Claude%20%7C%20GPT%20%7C%20Gemini%20%7C%20Kiro-purple.svg)]()

---

## 📖 Table of Contents

- [What Is Forge Rules?](#what-is-forge-rules)
- [Why Use This System?](#why-use-this-system)
- [Quick Start Guide](#quick-start-guide)
- [The 16 AI Agents](#the-16-ai-agents)
  - [How to Activate Agents](#how-to-activate-agents)
  - [Agent Usage Guide](#agent-usage-guide)
- [The 25 Rules Chapters](#the-25-rules-chapters)
- [Complete Workflows](#complete-workflows)
- [Templates & Scaffolding](#templates--scaffolding)
- [Checklists](#checklists)
- [Kiro Integration](#kiro-integration)
- [CI/CD Integration](#cicd-integration)
- [Real-World Examples](#real-world-examples)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## What Is Forge Rules?

**Forge Rules** is a comprehensive engineering system that combines:

1. **An engineering rulebook** — 25 chapters covering every aspect of building production-grade web applications: architecture, UI/UX, animation, performance, design system, testing, security, accessibility, TypeScript, error handling, mobile, i18n, API design, monitoring, and data visualization.

2. **An AI agent system** — 16 specialized agents that enforce these rules and push any AI model to its highest output quality. Zero AI slop. Every output is production-grade.

3. **Complete workflows** — Battle-tested processes for new features, code reviews, debugging, hotfixes, and team onboarding.

4. **Production templates** — Ready-to-use code scaffolds for components, hooks, services, tests, and entire feature modules.

5. **Quality gates** — Checklists and validation criteria that ensure nothing ships without meeting standards.

---

## Why Use This System?

### The Problem with Traditional AI-Assisted Development

When developers use AI without constraints:
- **Generic, mediocre code** (AI slop) that looks auto-generated
- **No architectural consistency** across files
- **Missing error handling, accessibility, and security**
- **No testing strategy** or quality gates
- **Endless back-and-forth** trying to explain what "good" looks like

### The Forge Rules Solution

```
Traditional AI Development:
Developer → Vague Prompt → AI → Generic Code → Manual Cleanup → Rework
(High cost, medium quality, slow iteration)

Forge Rules Development:
Developer → Specific Agent → Enforced Standards → Production Code → Ship
(Low-medium cost, high quality, fast iteration)
```

### Key Benefits

| Benefit | Description |
|---------|-------------|
| **🎯 Enforced Quality** | Every agent has specific rules. No more "make it better" prompts. |
| **⚡ Faster Development** | One developer with agents moves faster than a team of five. |
| **💰 Cost Efficient** | Focused agents = shorter context = cheaper API calls. |
| **🔄 Consistent Output** | Same standards across all files, all features, all developers. |
| **📚 Self-Documenting** | Product Briefs, Architecture docs, Review Reports auto-generated. |
| **🛡️ Built-in Safety** | Security, accessibility, and performance enforced by default. |
| **🔧 Platform Agnostic** | Works with Claude, GPT, Gemini, Kiro, or any AI model. |

---

## Quick Start Guide

### For Complete Beginners

**Step 1: Choose Your Use Case**

```bash
# New Project from Scratch
→ Follow: "New Project Workflow" (see below)

# Existing Project Audit
→ Follow: "Existing Project Workflow" (see below)

# Single Feature Development
→ Follow: "Feature Development Workflow" (see below)

# Code Review
→ Follow: "Code Review Workflow" (see below)
```

**Step 2: Install (Optional)**

```bash
# Clone the repository
git clone https://github.com/SIRAJcrypto11/forge-rules.git
cd forge-rules

# For Kiro users: Install all 16 agents as skills
cp -r kiro-skills/forge-* ~/.kiro/skills/

# For other AI platforms: Use agents via copy-paste (see below)
```

**Step 3: Activate Your First Agent**

See [How to Activate Agents](#how-to-activate-agents) section below.

---

### New Project Workflow

**Complete process for starting a new project from scratch:**

```
┌─────────────────────────────────────────────────────────────┐
│ PHASE 0: STRATEGY (Before Any Code)                        │
├─────────────────────────────────────────────────────────────┤
│ 1. Read: checklists/new-project.checklist.md               │
│ 2. Activate: CEO Agent                                     │
│    Prompt: "I want to build [describe your idea]"          │
│    Output: Product Brief (save to docs/product-brief.md)   │
│                                                             │
│ 3. Activate: Architect Agent                               │
│    Prompt: "Design the system architecture"                │
│    Input: Paste the Product Brief                          │
│    Output: ARCHITECTURE.md (save to project root)          │
│                                                             │
│ 4. Activate: Planner Agent                                 │
│    Prompt: "Create sprint plan for Phase 1"                │
│    Input: Paste ARCHITECTURE.md                            │
│    Output: Sprint task list with estimates                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PHASE 1: FOUNDATION (Week 1)                               │
├─────────────────────────────────────────────────────────────┤
│ 5. Activate: DevOps Agent                                  │
│    Prompt: "Set up CI/CD pipeline"                         │
│    Output: .github/workflows/ci.yml + deployment config    │
│                                                             │
│ 6. Activate: Coder Agent                                   │
│    Prompt: "Build [specific file from task list]"          │
│    Rule: ONE FILE PER PROMPT                               │
│    Output: Production-ready code file                      │
│                                                             │
│ 7. Activate: Tester Agent                                  │
│    Prompt: "Write tests for [file]"                        │
│    Output: Complete test suite                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PHASE 2: REVIEW & SHIP                                     │
├─────────────────────────────────────────────────────────────┤
│ 8. Activate: Reviewer Agent                                │
│    Prompt: "Review this PR"                                │
│    Output: Review report with BLOCKING/HIGH/MEDIUM/LOW     │
│                                                             │
│ 9. Activate: Security Agent (if auth/data/API changes)     │
│    Prompt: "Security audit for [feature]"                  │
│    Output: Security audit report                           │
│                                                             │
│ 10. Activate: QA Manual Agent (before release)             │
│     Prompt: "Manual QA for [feature] at [staging URL]"     │
│     Output: QA test report                                 │
│                                                             │
│ 11. Follow: workflows/ship.md                              │
│     → Deploy to production                                 │
└─────────────────────────────────────────────────────────────┘
```

**Time Estimate:** 
- Phase 0 (Strategy): 2-4 hours
- Phase 1 (Foundation): 1-2 weeks
- Phase 2 (Review & Ship): 1-2 days

---

### Existing Project Workflow

**Audit and improve an existing codebase:**

```bash
# Step 1: Architecture Audit
Activate: Architect Agent
Prompt: "Audit this codebase against Forge Rules v2.4. 
         Focus on: [specific area like state management, component structure, etc.]"
Output: Audit report with violations and recommendations

# Step 2: Prioritize Fixes
Read the audit report
Sort violations: BLOCKING → HIGH → MEDIUM → LOW
Create task list for fixes

# Step 3: Fix One File at a Time
Activate: Coder Agent
Prompt: "Refactor [specific file] to comply with Forge Rules"
Input: Paste the relevant rule chapter (e.g., rules/04-component-architecture.md)
Output: Refactored file

# Step 4: Add Missing Tests
Activate: Tester Agent
Prompt: "Write tests for [refactored file]"
Output: Test suite

# Step 5: Verify Improvements
Activate: Performance Agent (for performance issues)
Activate: A11y Agent (for accessibility issues)
Activate: Security Agent (for security issues)
```

---

### Feature Development Workflow

**Build a single new feature:**

```bash
# Step 1: Plan the Feature
Activate: Planner Agent
Prompt: "Plan implementation for [feature description]"
Output: Task breakdown with file list

# Step 2: Build Each File
Activate: Coder Agent
Prompt: "Build [specific file from plan]"
Rule: ONE FILE PER PROMPT
Repeat for each file in the plan

# Step 3: Add Tests
Activate: Tester Agent
Prompt: "Write tests for [feature]"
Output: Test suite

# Step 4: Review
Activate: Reviewer Agent
Prompt: "Review [feature] implementation"
Output: Review report

# Step 5: Ship
Follow: workflows/ship.md
```

---

### Code Review Workflow

**Review a pull request:**

```bash
# Step 1: Determine PR Type
Read the PR description
Identify: Frontend? Backend? Security-sensitive? Performance-critical?

# Step 2: Activate Relevant Agents
For Frontend PR:
  → Reviewer Agent (always)
  → UI Agent (if visual changes)
  → UX Agent (if user flow changes)
  → A11y Agent (if new interactive elements)

For Backend PR:
  → Reviewer Agent (always)
  → Backend Agent (API/DB changes)
  → Security Agent (auth/data handling)

For Performance PR:
  → Reviewer Agent (always)
  → Performance Agent (bundle/render changes)

# Step 3: Consolidate Feedback
Combine all agent reports
Remove duplicates
Sort by severity: BLOCKING → HIGH → MEDIUM → LOW

# Step 4: Request Changes or Approve
If BLOCKING issues exist → Request Changes
If only MEDIUM/LOW → Approve with suggestions
```

---

## 🤖 The 16 AI Agents

```
┌─────────────────────────────────────────────────────────────────┐
│                    FORGE AGENT SYSTEM v2.4                      │
│                                                                 │
│  🎯 CEO        🏗️ Architect   📋 Planner    💻 Coder           │
│  Strategy      Systems        Sprint Plan   Implement          │
│                                                                 │
│  🎨 UI         🧭 UX          🔍 Reviewer   🔒 Security        │
│  Visual        Experience     Quality       Safety             │
│                                                                 │
│  🧪 Tester     🔬 QA Manual   ⚡ Performance  ♿ A11y           │
│  Automated     Manual         Speed          Accessible        │
│                                                                 │
│  🌐 Browser    🖥️ Backend     🚀 DevOps     🔁 Retro           │
│  Research      API/DB         CI/CD         Retrospective      │
└─────────────────────────────────────────────────────────────────┘
```

| Agent | File | Role |
|-------|------|------|
| 🎯 CEO | `agents/ceo.md` | 5-phase product strategy, 10-section review, Product Brief |
| 🏗️ Architect | `agents/architect.md` | 8-phase system design, ADRs, risk register, build sequence |
| 📋 Planner | `agents/planner.md` | Sprint planning, task estimates, dependency map ✨NEW |
| 💻 Coder | `agents/coder.md` | Pre-coding protocol, 9-block anatomy, React Query patterns |
| 🎨 UI | `agents/ui.md` | 6-audit visual system, anti-slop detection, component specs |
| 🧭 UX | `agents/ux.md` | 6-audit UX protocol, 8 copy tests, form/nav/mobile audits |
| 🔍 Reviewer | `agents/reviewer.md` | 6-phase review, BLOCKING/HIGH/MEDIUM/LOW format |
| 🔒 Security | `agents/security.md` | OWASP Top 10 + STRIDE threat modeling |
| 🧪 Tester | `agents/tester.md` | Unit/hook/component/E2E templates, coverage requirements |
| 🔬 QA Manual | `agents/qa-manual.md` | Manual QA: exploratory, cross-browser, mobile, a11y ✨NEW |
| ⚡ Performance | `agents/performance.md` | Bundle analysis, render audit, Lighthouse budgets |
| ♿ A11y | `agents/a11y.md` | WCAG 2.1 AA, keyboard nav, screen reader, contrast |
| 🌐 Browser | `agents/browser.md` | 5 research protocols, competitor + tech analysis |
| 🖥️ Backend | `agents/backend.md` | API contracts, DB schema, validation, N+1 prevention |
| 🚀 DevOps | `agents/devops.md` | CI/CD pipeline, secrets, monitoring, rollback |
| 🔁 Retro | `agents/retro.md` | Weekly retrospective, 5-why root cause, 3 action items |
| 🔗 Handoff | `agents/handoff-protocol.md` | How agent outputs feed into next agent's inputs |

### How to Activate Any Agent

**Method 1 — System Instruction (Recommended):**
Copy the agent file content → paste as AI system instruction → active for entire session.

**Method 2 — Inline:**
```
"Act as Forge CEO Agent. I want to build [idea]."
"Act as Forge Planner Agent. Plan the sprint for [project]."
"Act as Forge QA Agent. Test [feature] at [staging URL]."
```

**Method 3 — Kiro Skills (all 16 agents):**
```bash
cp -r kiro-skills/forge-* ~/.kiro/skills/
```

---

### Agent Usage Guide

#### 🎯 CEO Agent — Product Strategy
**When to use:** Before any feature is designed or coded.

**Input:** Your product idea or feature description.

**Process:**
1. 5-phase product strategy protocol
2. 10-section comprehensive review
3. Risk assessment and mitigation

**Output:** Product Brief with:
- Problem statement
- Target users
- Core features
- Success metrics
- Technical constraints
- Timeline estimates

**Example Prompt:**
```
Act as Forge CEO Agent.

I want to build an inventory management system for small retail businesses.
They need to track products, manage stock levels, and generate reports.
```

**Expected Output:** Complete Product Brief saved to `docs/product-brief.md`

---

#### 🏗️ Architect Agent — System Design
**When to use:** After Product Brief is complete, before any code.

**Input:** Product Brief from CEO Agent.

**Process:**
1. 8-phase system design protocol
2. Architecture Decision Records (ADRs)
3. Risk register creation
4. Build sequence planning

**Output:** ARCHITECTURE.md with:
- System architecture diagram
- Technology stack decisions
- Data model design
- API contracts
- Security considerations
- Performance requirements

**Example Prompt:**
```
Act as Forge Architect Agent.

Design the system architecture for this Product Brief:
[paste Product Brief content]
```

**Expected Output:** Complete ARCHITECTURE.md saved to project root.

---

#### 📋 Planner Agent — Sprint Planning ✨NEW
**When to use:** After architecture is defined, before coding starts.

**Input:** ARCHITECTURE.md and feature requirements.

**Process:**
1. Task decomposition (one task = one file)
2. Time estimation with guidelines
3. Dependency mapping
4. Critical path analysis
5. Risk assessment
6. Definition of done for each task

**Output:** Sprint task list with:
- Prioritized task breakdown
- Time estimates (hours/days)
- Dependencies between tasks
- Risk level per task
- Acceptance criteria

**Example Prompt:**
```
Act as Forge Planner Agent.

Create a sprint plan for Phase 1 (Foundation) based on this architecture:
[paste ARCHITECTURE.md content]

Focus on: Authentication, product CRUD, and basic dashboard.
```

**Expected Output:** Detailed sprint plan with 15-30 tasks.

---

#### 💻 Coder Agent — Implementation
**When to use:** For every single file you need to build.

**Input:** Specific file requirement from sprint plan.

**Process:**
1. Pre-coding protocol (verify architecture alignment)
2. 9-block component anatomy enforcement
3. React Query patterns for server state
4. Error handling implementation
5. Accessibility considerations

**Output:** Production-ready code file with:
- Proper imports and structure
- Type definitions (TypeScript)
- Error handling
- Loading states
- Accessibility attributes

**Example Prompt:**
```
Act as Forge Coder Agent.

Build: src/features/products/components/ProductList.jsx

Requirements:
- Display products in a grid
- Show product image, name, price, stock level
- Filter by category
- Search by name
- Pagination (20 items per page)
- Loading skeleton
- Empty state when no products

Use React Query for data fetching.
```

**Expected Output:** Complete ProductList.jsx file (200-300 lines).

**CRITICAL RULE:** ONE FILE PER PROMPT. Never ask for multiple files at once.

---

#### 🎨 UI Agent — Visual System
**When to use:** When building UI components or reviewing visual consistency.

**Input:** Component code or design requirements.

**Process:**
1. 6-audit visual system check
2. Anti-slop detection (generic UI patterns)
3. Design token enforcement
4. Component specification

**Output:** UI audit report or component specs with:
- Color token usage
- Typography scale compliance
- Spacing grid adherence
- Shadow elevation correctness
- Icon system usage
- Dark mode support

**Example Prompt:**
```
Act as Forge UI Agent.

Audit this component for visual consistency:
[paste component code]

Check against Forge Rules design system (Chapter 7).
```

**Expected Output:** Audit report with violations and fixes.

---

#### 🧭 UX Agent — User Experience
**When to use:** When designing user flows or reviewing UX patterns.

**Input:** User flow description or component code.

**Process:**
1. 6-audit UX protocol
2. 8 copy tests (clarity, brevity, tone)
3. Form UX audit
4. Navigation audit
5. Mobile UX audit

**Output:** UX audit report with:
- Information hierarchy issues
- Navigation problems
- Form UX violations
- Copy improvements
- Empty/error state recommendations
- Mobile UX issues

**Example Prompt:**
```
Act as Forge UX Agent.

Review the user flow for product creation:
1. User clicks "Add Product"
2. Modal opens with form
3. User fills: name, price, category, image
4. User clicks "Save"
5. Product appears in list

Audit against Forge Rules UX standards (Chapter 8).
```

**Expected Output:** UX audit with specific improvements.

---

#### 🔍 Reviewer Agent — Code Quality
**When to use:** Before any PR merges.

**Input:** PR diff or file(s) to review.

**Process:**
1. 6-phase review protocol
2. Architecture compliance check
3. Code quality assessment
4. Security scan
5. Performance review
6. Accessibility check

**Output:** Review report with:
- BLOCKING issues (must fix before merge)
- HIGH priority issues (fix before release)
- MEDIUM priority issues (fix in next sprint)
- LOW priority suggestions
- PRAISE for good patterns

**Example Prompt:**
```
Act as Forge Reviewer Agent.

Review this PR:
Title: Add product filtering and search
Files changed: 3
[paste git diff or file contents]

Check against all Forge Rules v2.4.
```

**Expected Output:** Structured review report with severity levels.

---

#### 🔒 Security Agent — Security Audit
**When to use:** For auth, data handling, or API changes.

**Input:** Code files or architecture design.

**Process:**
1. OWASP Top 10 check
2. STRIDE threat modeling
3. Client-side security audit
4. Dependency vulnerability scan
5. Environment variable validation

**Output:** Security audit report with:
- CRITICAL vulnerabilities (immediate fix)
- HIGH risk issues (fix before release)
- MEDIUM risk issues (fix in next sprint)
- Exploit scenarios
- Remediation steps

**Example Prompt:**
```
Act as Forge Security Agent.

Security audit for authentication system:
[paste auth-related files]

Focus on: JWT handling, password storage, session management, XSS/CSRF protection.
```

**Expected Output:** Security audit with threat scenarios and fixes.

---

#### 🧪 Tester Agent — Automated Testing
**When to use:** When writing or reviewing tests.

**Input:** Code file(s) to test.

**Process:**
1. Unit test generation
2. Hook test generation (for custom hooks)
3. Component test generation (4 states: loading, error, empty, success)
4. E2E test scenarios
5. Coverage requirements check

**Output:** Complete test suite with:
- Unit tests for utilities/services
- Hook tests with React Testing Library
- Component tests (all states)
- E2E tests with Playwright
- Coverage report

**Example Prompt:**
```
Act as Forge Tester Agent.

Write tests for: src/features/products/hooks/useProducts.js

The hook:
- Fetches products with React Query
- Supports filtering by category
- Supports search by name
- Handles pagination

Generate: unit tests + hook tests + coverage requirements.
```

**Expected Output:** Complete test file with 80%+ coverage.

---

#### 🔬 QA Manual Agent — Manual Testing ✨NEW
**When to use:** Before release to production.

**Input:** Staging URL and feature description.

**Process:**
1. 6-phase QA protocol
2. Exploratory testing (boundary, special chars, rapid clicks, concurrent)
3. Regression checklist
4. Cross-browser testing (Chrome, Firefox, Safari, Edge)
5. Mobile testing (iOS, Android)
6. Accessibility testing (keyboard, screen reader)

**Output:** QA test report with:
- Test scenarios executed
- Bugs found (with severity)
- Browser compatibility matrix
- Mobile device test results
- Accessibility issues
- Regression test results

**Example Prompt:**
```
Act as Forge QA Manual Agent.

Manual QA for product management feature:
Staging URL: https://staging.example.com
Feature: Add, edit, delete products with image upload

Test on:
- Chrome, Firefox, Safari
- iPhone 13, Samsung Galaxy S21
- Keyboard navigation
- Screen reader (NVDA)
```

**Expected Output:** Comprehensive QA report with bug list.

---

#### ⚡ Performance Agent — Speed Optimization
**When to use:** For optimization work or performance audits.

**Input:** Application URL or code files.

**Process:**
1. Bundle size analysis
2. Render performance audit
3. Lighthouse CI check
4. Virtualization opportunities
5. Image optimization review
6. Code splitting assessment

**Output:** Performance audit with:
- Lighthouse scores (target: 90+)
- Bundle size breakdown
- Render bottlenecks
- Optimization recommendations
- Before/after metrics

**Example Prompt:**
```
Act as Forge Performance Agent.

Performance audit for: https://staging.example.com

Focus on:
- Initial load time
- Time to Interactive
- Largest Contentful Paint
- Bundle size
- Render performance for product list (1000+ items)
```

**Expected Output:** Performance report with specific optimizations.

---

#### ♿ A11y Agent — Accessibility
**When to use:** For UI accessibility review.

**Input:** Component code or application URL.

**Process:**
1. WCAG 2.1 AA compliance check
2. Keyboard navigation audit
3. Screen reader compatibility
4. Color contrast verification
5. Motion/animation accessibility
6. Focus management review

**Output:** Accessibility audit with:
- WCAG violations (with severity)
- Keyboard navigation issues
- Screen reader problems
- Color contrast failures
- Focus management issues
- Remediation steps

**Example Prompt:**
```
Act as Forge A11y Agent.

Accessibility audit for product form:
[paste component code]

Check:
- Keyboard navigation
- Screen reader announcements
- Form labels and errors
- Color contrast
- Focus indicators
```

**Expected Output:** A11y audit with WCAG compliance report.

---

#### 🌐 Browser Agent — Research
**When to use:** For competitor analysis or technology research.

**Input:** Research topic or competitor URLs.

**Process:**
1. 5 research protocols
2. Competitor feature analysis
3. Technology stack investigation
4. UX pattern documentation
5. Best practices compilation

**Output:** Research report with:
- Competitor feature comparison
- Technology recommendations
- UX pattern library
- Implementation examples
- Decision matrix

**Example Prompt:**
```
Act as Forge Browser Agent.

Research: Inventory management systems

Competitors:
- Zoho Inventory
- Cin7
- Fishbowl

Focus on:
- Product management features
- Reporting capabilities
- Mobile experience
- Pricing models
```

**Expected Output:** Comprehensive research report.

---

#### 🖥️ Backend Agent — API & Database
**When to use:** For API design and backend code.

**Input:** API requirements or database schema needs.

**Process:**
1. API contract design
2. Database schema design
3. Input validation (Zod)
4. Query optimization (N+1 prevention)
5. Auth/authorization implementation
6. Error handling

**Output:** Backend design with:
- API endpoint specifications
- Request/response schemas
- Database schema (SQL/migrations)
- Validation rules
- Query optimization strategies
- Auth middleware

**Example Prompt:**
```
Act as Forge Backend Agent.

Design API for product management:

Endpoints needed:
- GET /api/products (list with filters)
- GET /api/products/:id (single product)
- POST /api/products (create)
- PUT /api/products/:id (update)
- DELETE /api/products/:id (delete)

Include: validation, auth, pagination, error handling.
```

**Expected Output:** Complete API design document.

---

#### 🚀 DevOps Agent — CI/CD & Deployment
**When to use:** For CI/CD setup or deployment configuration.

**Input:** Project requirements and hosting platform.

**Process:**
1. CI/CD pipeline design
2. Environment strategy (dev/staging/prod)
3. Secrets management
4. Monitoring setup
5. Rollback procedures
6. Deployment automation

**Output:** DevOps configuration with:
- GitHub Actions workflow
- Environment variables setup
- Deployment scripts
- Monitoring configuration (Sentry, etc.)
- Rollback procedures
- Infrastructure as Code

**Example Prompt:**
```
Act as Forge DevOps Agent.

Set up CI/CD for React + Node.js app:

Requirements:
- GitHub Actions
- Deploy to Vercel (frontend) + Railway (backend)
- Run tests before deploy
- Lighthouse CI checks
- Sentry error tracking
- Staging + Production environments
```

**Expected Output:** Complete CI/CD configuration files.

---

#### 🔁 Retro Agent — Retrospective
**When to use:** Weekly or after major milestones.

**Input:** Sprint summary and team feedback.

**Process:**
1. 6-phase retro protocol
2. 5-why root cause analysis
3. Pattern analysis across 4 weeks
4. Action item generation (exactly 3)
5. Zombie action item check

**Output:** Retrospective report with:
- What went well
- What didn't go well
- Root cause analysis (5-why)
- Exactly 3 action items (assigned, with deadline)
- Pattern trends over time

**Example Prompt:**
```
Act as Forge Retro Agent.

Weekly retrospective for Sprint 3:

Completed:
- Product CRUD (8 tasks)
- Authentication (3 tasks)
- Dashboard layout (2 tasks)

Issues:
- 2 tasks carried over (image upload, bulk import)
- 3 bugs found in production
- Performance issues on product list

Team feedback:
- "Too many meetings"
- "Unclear requirements for bulk import"
- "Need better error handling patterns"
```

**Expected Output:** Structured retro with 3 action items.

---

## � The 25 Rules Chapters

Complete engineering standards covering every aspect of production-grade web development.

### Foundation (Chapters 0-4)

| Chapter | File | What It Covers |
|---------|------|----------------|
| **00** | `rules/00-preamble.md` | Philosophy, principles, how to use this system |
| **01** | `rules/01-iron-laws.md` | The 5 non-negotiable laws that govern everything |
| **02** | `rules/02-project-anatomy.md` | Standard folder structure, file organization |
| **03** | `rules/03-eight-layers.md` | The 8-layer architecture (Routes → Pages → Features → Components → Hooks → Services → Utils → Config) |
| **04** | `rules/04-component-architecture.md` | 9-block component anatomy, component types, composition patterns |

**Key Concepts:**
- **Iron Law #1:** ONE FILE = ONE RESPONSIBILITY
- **Iron Law #2:** UI RENDERS DATA, NEVER CREATES IT
- **Iron Law #3:** MODULES ARE ISLANDS
- **8-Layer Architecture:** Strict separation of concerns
- **9-Block Anatomy:** Every component follows the same structure

---

### UI/UX & Design (Chapters 5-8, 15)

| Chapter | File | What It Covers |
|---------|------|----------------|
| **05** | `rules/05-animation-microinteraction.md` | Timing tokens, easing system, micro-interaction patterns |
| **06** | `rules/06-performance.md` | Skeleton laws, code splitting, memoization, virtualization, image optimization |
| **07** | `rules/07-design-system.md` | Color tokens, typography scale, spacing grid, shadows, icons |
| **08** | `rules/08-ux-information-architecture.md` | Information hierarchy, navigation, forms, empty states, UX writing |
| **15** | `rules/15-dark-mode.md` | Token-based theming, dark mode implementation |

**Key Concepts:**
- **Animation Timing:** 100ms (instant), 200ms (quick), 300ms (standard), 500ms (deliberate)
- **Performance Budget:** FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- **Design Tokens:** Centralized color/spacing/typography system
- **UX Writing:** 6 laws for clear, concise copy
- **Dark Mode:** CSS variables + theme context

---

### State & Data (Chapters 9, 19, 23)

| Chapter | File | What It Covers |
|---------|------|----------------|
| **09** | `rules/09-state-management.md` | 5-level state hierarchy, React Query patterns, form state |
| **19** | `rules/19-typescript.md` | TypeScript standards, type definitions, component props typing |
| **23** | `rules/23-api-design-frontend.md` | API client architecture, service layer, React Query integration ✨NEW |

**Key Concepts:**
- **State Hierarchy:** Server → URL → Context → Local → Ref
- **React Query:** Mandatory for all server state
- **TypeScript:** Strict mode, no `any`, proper type inference
- **Service Layer:** All API calls go through services, never direct in components

---

### Quality & Testing (Chapters 12, 20)

| Chapter | File | What It Covers |
|---------|------|----------------|
| **12** | `rules/12-testing.md` | Unit/integration/component/E2E testing strategy, coverage requirements |
| **20** | `rules/20-error-handling.md` | Error handling patterns, ErrorBoundary, form validation, logging |

**Key Concepts:**
- **Test Coverage:** 80% minimum for services/hooks, 60% for components
- **4-State Testing:** Loading, Error, Empty, Success
- **Error Handling:** Service layer never throws, hook layer translates, component layer displays
- **ErrorBoundary:** Catch React errors, show fallback UI

---

### Security & Accessibility (Chapters 13, 14)

| Chapter | File | What It Covers |
|---------|------|----------------|
| **13** | `rules/13-security.md` | XSS, CSRF, input sanitization, env validation, OWASP Top 10 |
| **14** | `rules/14-accessibility.md` | WCAG 2.1 AA, keyboard nav, screen readers, color contrast, ARIA |

**Key Concepts:**
- **XSS Prevention:** Sanitize all user input, use DOMPurify
- **CSRF Protection:** CSRF tokens for state-changing requests
- **WCAG AA:** Minimum accessibility standard
- **Keyboard Navigation:** All interactive elements must be keyboard accessible
- **Screen Readers:** Proper ARIA labels and live regions

---

### Mobile & Internationalization (Chapters 21, 22) ✨NEW

| Chapter | File | What It Covers |
|---------|------|----------------|
| **21** | `rules/21-mobile-responsive.md` | Mobile-first, breakpoints, touch targets, safe areas, PWA |
| **22** | `rules/22-internationalization.md` | i18n architecture, react-i18next, Intl API, locale management |

**Key Concepts:**
- **Mobile-First:** Design for mobile, enhance for desktop
- **Touch Targets:** Minimum 44×44px for all interactive elements
- **Breakpoints:** 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **i18n:** react-i18next for translations, Intl API for dates/numbers/currency
- **Locale Management:** Centralized locale files, language switcher

---

### Monitoring & Visualization (Chapters 24, 25) ✨NEW

| Chapter | File | What It Covers |
|---------|------|----------------|
| **24** | `rules/24-monitoring-observability.md` | Sentry setup, Web Vitals, logging standards, alert thresholds |
| **25** | `rules/25-data-visualization.md` | Chart selection, ChartWrapper component, Recharts patterns, accessibility |

**Key Concepts:**
- **Sentry:** Error tracking with PII redaction
- **Web Vitals:** Monitor FCP, LCP, CLS, FID, TTFB
- **Logging:** Structured logs with context
- **Charts:** Choose right chart type, make accessible, optimize performance

---

### Process & Workflow (Chapters 10, 11, 16, 17, 18)

| Chapter | File | What It Covers |
|---------|------|----------------|
| **10** | `rules/10-naming-conventions.md` | Files, variables, components, hooks, props, handlers, CSS, tests, git, API |
| **11** | `rules/11-build-sequence.md` | Phase-by-phase build protocol with validation gates |
| **16** | `rules/16-git-workflow.md` | Commit conventions, branch naming, PR standards |
| **17** | `rules/17-ai-prompting-protocol.md` | How to use AI effectively with these rules |
| **18** | `rules/18-forbidden-list.md` | Anti-patterns and forbidden practices |

**Key Concepts:**
- **Naming:** Consistent conventions across all code
- **Build Sequence:** 6 phases (Strategy → Foundation → Core → Features → Polish → Launch)
- **Git Commits:** Conventional commits (feat:, fix:, refactor:, etc.)
- **AI Prompting:** One file per prompt, paste relevant rules
- **Forbidden:** No inline styles, no god components, no prop drilling

---

### How to Use the Rules

**For New Projects:**
```bash
# Read in order:
1. rules/00-preamble.md (philosophy)
2. rules/01-iron-laws.md (non-negotiables)
3. rules/02-project-anatomy.md (structure)
4. rules/03-eight-layers.md (architecture)
5. rules/11-build-sequence.md (process)

# Then reference specific chapters as needed
```

**For Existing Projects:**
```bash
# Audit against specific chapters:
- Architecture issues? → Read Chapter 3, 4
- Performance problems? → Read Chapter 6
- Accessibility gaps? → Read Chapter 14
- Security concerns? → Read Chapter 13
- State management mess? → Read Chapter 9
```

**For AI System Instruction:**
```bash
# Option 1: Paste all rules (comprehensive)
Copy: full-rules-single-file.md

# Option 2: Paste specific chapters (focused)
Copy: rules/04-component-architecture.md + rules/09-state-management.md
```

---

## �🔄 Complete Workflows

Battle-tested processes for common development scenarios.

### 1. New Feature Workflow
**File:** `workflows/new-feature.md`

**Process:**
```
THINK → PLAN → BUILD → REVIEW → TEST → QA → SHIP

Phase 1: THINK (2-4 hours)
- CEO Agent → Product Brief
- Architect Agent → Technical design
- Planner Agent → Sprint plan

Phase 2: BUILD (1-2 weeks)
- Coder Agent → Implement files (one at a time)
- Backend Agent → API + DB (parallel)
- DevOps Agent → CI/CD setup (once)

Phase 3: REVIEW (1-2 days)
- Reviewer Agent → Code review
- UI/UX Agents → Design review
- Security Agent → Security audit (if needed)

Phase 4: TEST (1-2 days)
- Tester Agent → Automated tests
- QA Agent → Manual testing

Phase 5: SHIP (1 day)
- Pre-ship checklist
- Deploy to staging
- Final QA
- Deploy to production
- Monitor
```

**When to use:** Every new feature, every sprint.

---

### 2. Code Review Workflow
**File:** `workflows/code-review.md`

**Process:**
```
1. Determine PR Type
   - Frontend? Backend? Full-stack?
   - Security-sensitive? Performance-critical?

2. Activate Relevant Agents
   Frontend PR:
   → Reviewer Agent (always)
   → UI Agent (visual changes)
   → UX Agent (user flow changes)
   → A11y Agent (interactive elements)
   → Performance Agent (bundle impact)

   Backend PR:
   → Reviewer Agent (always)
   → Backend Agent (API/DB changes)
   → Security Agent (auth/data handling)

3. Consolidate Feedback
   - Combine all agent reports
   - Remove duplicates
   - Sort by severity: BLOCKING → HIGH → MEDIUM → LOW

4. Decision
   - BLOCKING issues? → Request Changes
   - Only MEDIUM/LOW? → Approve with suggestions
```

**When to use:** Every pull request before merge.

---

### 3. Ship Workflow
**File:** `workflows/ship.md`

**Process:**
```
Pre-Ship Checklist:
□ All tests passing
□ Code review approved
□ Security audit passed (if applicable)
□ Performance budget met (Lighthouse 90+)
□ Accessibility audit passed (WCAG AA)
□ Manual QA completed
□ Staging deployment successful
□ Rollback plan documented

Deploy Sequence:
1. Merge PR to main
2. CI/CD builds production bundle
3. Deploy to production
4. Smoke test critical paths
5. Monitor error rates (Sentry)
6. Monitor performance (Web Vitals)

Post-Deploy:
- Monitor for 1 hour
- Check error rates
- Verify key metrics
- If issues: rollback immediately
```

**When to use:** Every production deployment.

---

### 4. Debug Workflow
**File:** `workflows/debug.md`

**Process:**
```
5-Phase Debug Protocol:

Phase 1: REPRODUCE
- Can you reproduce it consistently?
- What are the exact steps?
- What's the expected vs actual behavior?

Phase 2: ISOLATE
- Where does the error occur? (component, hook, service)
- What's the error message?
- What's the stack trace?

Phase 3: HYPOTHESIZE
- What could cause this?
- List 3-5 possible causes
- Rank by likelihood

Phase 4: TEST
- Test each hypothesis
- Use console.log, debugger, React DevTools
- Eliminate causes one by one

Phase 5: FIX
- Implement fix
- Add test to prevent regression
- Document root cause
```

**When to use:** When debugging production issues or complex bugs.

---

### 5. Hotfix Workflow ✨NEW
**File:** `workflows/hotfix.md`

**Process:**
```
Emergency Production Fix Protocol:

Decision Tree:
- Is production down? → CRITICAL (fix immediately)
- Is a feature broken? → HIGH (fix within 4 hours)
- Is it a minor bug? → MEDIUM (fix in next sprint)

7-Step Hotfix Protocol:

1. ASSESS (5 minutes)
   - Severity? Impact? Users affected?
   - Can we rollback? Or must we fix forward?

2. BRANCH (1 minute)
   - Create: hotfix/[issue-description]
   - Branch from: main (or last stable tag)

3. FIX (30-60 minutes)
   - Minimal change to fix the issue
   - No refactoring, no "while we're here"
   - Add test to prevent regression

4. EXPEDITED REVIEW (15 minutes)
   - Reviewer Agent (fast review)
   - Security Agent (if auth/data related)
   - One human reviewer approval

5. DEPLOY (10 minutes)
   - Deploy to staging
   - Quick smoke test
   - Deploy to production

6. VERIFY (15 minutes)
   - Test the fix in production
   - Monitor error rates
   - Verify metrics

7. POST-MORTEM (1 hour, within 24 hours)
   - What happened?
   - Why did it happen?
   - How do we prevent it?
   - Action items (assigned, with deadline)
```

**When to use:** Production emergencies only.

---

### 6. Onboarding Workflow
**File:** `workflows/onboarding.md`

**Process:**
```
New Developer Onboarding:

Day 1: Orientation (2 hours)
□ Read: rules/00-preamble.md
□ Read: rules/01-iron-laws.md
□ Read: rules/02-project-anatomy.md
□ Read: ARCHITECTURE.md (project-specific)
□ Setup: dev environment, run project locally

Week 1: Ramp-Up
□ Read: rules/03-eight-layers.md
□ Read: rules/04-component-architecture.md
□ Read: rules/09-state-management.md
□ First task: Fix a small bug (with mentor)
□ Second task: Build a simple component (with review)

Week 2-4: Full Speed
□ Read remaining rules (as needed)
□ Take on regular sprint tasks
□ Participate in code reviews
□ Attend retrospectives
```

**When to use:** Every new team member.

---

## 📦 Templates & Scaffolding

```
THINK → PLAN → BUILD → REVIEW → TEST → QA → SHIP

1. CEO Agent       → Product Brief        (before any code)
2. Architect Agent → ARCHITECTURE.md      (before any code)
3. Planner Agent   → Sprint task list     (before coding starts)
4. Coder Agent     → Frontend code        (one file at a time)
5. Backend Agent   → API + DB code        (parallel with Coder)
6. DevOps Agent    → CI/CD setup          (once per project)
7. Reviewer Agent  → Review report        (before merge)
8. Tester Agent    → Automated tests      (before merge)
9. QA Agent        → Manual QA report     (before release)
10. Git workflow   → Merged PR → Deploy
```

---

## 📁 Repository Structure

```
forge-rules/
├── README.md
├── CHANGELOG.md
├── FORGE_AGENT_SYSTEM.md
├── full-rules-single-file.md    ← ALL rules (paste to AI)
├── lighthouserc.json            ← NEW: Lighthouse CI config
│
├── agents/                      ← 16 specialized AI agents
│   ├── ceo.md
│   ├── architect.md
│   ├── planner.md               ← NEW: Sprint planning
│   ├── coder.md
│   ├── ui.md
│   ├── ux.md
│   ├── reviewer.md
│   ├── security.md
│   ├── tester.md
│   ├── qa-manual.md             ← NEW: Manual QA
│   ├── performance.md
│   ├── a11y.md
│   ├── browser.md
│   ├── backend.md
│   ├── devops.md
│   ├── retro.md
│   └── handoff-protocol.md
│
├── workflows/
│   ├── new-feature.md
│   ├── code-review.md
│   ├── ship.md
│   ├── debug.md
│   ├── onboarding.md
│   └── hotfix.md                ← NEW: Emergency production fix
│
├── rules/                       ← 25 chapters (all complete)
│   ├── 00-preamble.md
│   ├── 01-iron-laws.md
│   ├── 02-project-anatomy.md
│   ├── 03-eight-layers.md
│   ├── 04-component-architecture.md
│   ├── 05-animation-microinteraction.md
│   ├── 06-performance.md
│   ├── 07-design-system.md
│   ├── 08-ux-information-architecture.md
│   ├── 09-state-management.md
│   ├── 10-naming-conventions.md
│   ├── 11-build-sequence.md
│   ├── 12-testing.md
│   ├── 13-security.md
│   ├── 14-accessibility.md
│   ├── 15-dark-mode.md
│   ├── 16-git-workflow.md
│   ├── 17-ai-prompting-protocol.md
│   ├── 18-forbidden-list.md
│   ├── 19-typescript.md
│   ├── 20-error-handling.md
│   ├── 21-mobile-responsive.md  ← NEW
│   ├── 22-internationalization.md ← NEW
│   ├── 23-api-design-frontend.md  ← NEW
│   ├── 24-monitoring-observability.md ← NEW
│   └── 25-data-visualization.md   ← NEW
│
├── kiro-skills/                 ← 16 Kiro-native skill files
│   ├── forge-ceo/
│   ├── forge-architect/
│   ├── forge-planner/           ← NEW
│   ├── forge-coder/
│   ├── forge-reviewer/
│   ├── forge-security/
│   ├── forge-ui/
│   ├── forge-ux/
│   ├── forge-tester/
│   ├── forge-qa/                ← NEW
│   ├── forge-performance/
│   ├── forge-a11y/
│   ├── forge-browser/
│   ├── forge-backend/
│   ├── forge-devops/
│   └── forge-retro/
│
├── templates/
│   ├── component.template.jsx
│   ├── hook.template.js
│   ├── service.template.js
│   ├── context.template.jsx
│   ├── test.template.js
│   ├── vitest.config.template.js    ← NEW
│   ├── playwright.config.template.ts ← NEW
│   ├── test-setup.template.js       ← NEW
│   ├── PR-description.template.md
│   ├── ARCHITECTURE.template.md
│   ├── CONVENTIONS.template.md
│   └── feature-module.template/
│       ├── index.js
│       ├── [Module]Page.jsx
│       ├── hooks/use[Module].js
│       └── components/
│           ├── [Entity]List.jsx
│           └── [Entity]Form.jsx
│
├── checklists/
│   ├── new-project.checklist.md
│   ├── pre-commit.checklist.md
│   ├── phase-validation.checklist.md
│   ├── code-review.checklist.md
│   └── launch-readiness.checklist.md
│
├── examples/
│   ├── 01-product-brief-example.md
│   ├── 02-architecture-example.md
│   ├── 03-agent-prompts-example.md
│   ├── 04-review-report-example.md
│   ├── 05-backend-design-example.md
│   └── 06-security-audit-example.md ← NEW
│
├── docs/
│   └── README.md
│
└── .github/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/
        └── ci.yml               ← UPGRADED: Lighthouse CI, secret scanning, better bundle check
```

---

## ⚡ Quick Start

### New Project (from scratch)
```
1. Read: checklists/new-project.checklist.md
2. Activate CEO Agent → describe your idea
3. Activate Architect Agent → paste Product Brief
4. Activate Planner Agent → get sprint task list
5. Follow: workflows/new-feature.md
```

### Production Bug (hotfix)
```
Follow: workflows/hotfix.md
```

### New Developer Onboarding
```
Follow: workflows/onboarding.md
```

### AI System Instruction (paste-and-go)
```
Copy full-rules-single-file.md → paste as system instruction
```

---

## 🏛️ The 5 Iron Laws

| # | Law | Meaning |
|---|-----|---------|
| 1 | ONE FILE = ONE RESPONSIBILITY | If you can't describe it in 5 words, split it |
| 2 | UI RENDERS DATA, NEVER CREATES IT | No business logic in components |
| 3 | MODULES ARE ISLANDS | Features never import from each other |
| 4 | SHOW SOMETHING INSTANTLY | Content visible within 100ms, always |
| 5 | EVERY INTERACTION HAS A RESPONSE | Silent UI is broken UI |

---

## 🆕 What's New in v2.4

| Addition | Description |
|----------|-------------|
| **New Agent** | `agents/planner.md` — Sprint planning: task decomposition, estimates, dependency map |
| **New Agent** | `agents/qa-manual.md` — Manual QA: exploratory, cross-browser, mobile, accessibility |
| **New Rules** | Chapters 21-25: Mobile, i18n, API Design, Monitoring, Data Visualization |
| **New Workflow** | `workflows/hotfix.md` — Emergency production fix protocol |
| **New Templates** | vitest.config, playwright.config, test-setup |
| **New Example** | `06-security-audit-example.md` — Real Security Agent output |
| **New Kiro Skills** | forge-planner, forge-qa |
| **Upgraded CI** | Lighthouse CI, secret scanning, better bundle analysis |
| **Lighthouse Config** | `lighthouserc.json` — Performance budgets enforced in CI |

---

## 🤝 Contributing

This is a living document. To propose changes:
1. Open an issue describing the problem or gap
2. Reference the specific chapter or agent
3. Provide a concrete example of the violation and the fix

**Repository:** [github.com/SIRAJcrypto11/forge-rules](https://github.com/SIRAJcrypto11/forge-rules)

---

## 📄 License

MIT — Use freely, adapt to your team, keep the attribution.

**Author:** Siraj Nur Ihrom  
**GitHub:** [@SIRAJcrypto11](https://github.com/SIRAJcrypto11)  
**Version:** 2.4.0 — May 2026

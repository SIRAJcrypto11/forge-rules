# FORGE AGENT ROUTER
**Version:** 2.4.0  
**Purpose:** Intelligent agent selection system that automatically routes user requests to the right agent(s)

---

## What Is This?

The **Agent Router** is a meta-agent that analyzes user requests and automatically activates the appropriate Forge agent(s). Instead of manually choosing which agent to use, the router detects the context and intent, then delegates to the right specialist.

**Problem it solves:**
- User doesn't know which agent to use
- User has multiple needs in one request
- User wants quick help without reading 16 agent descriptions

---

## How It Works

```
User Request → Agent Router → Intent Detection → Agent Selection → Execution
```

### Step 1: Intent Detection
Router analyzes the request for keywords, context, and intent.

### Step 2: Agent Selection
Router selects 1-3 agents based on detected intent.

### Step 3: Execution
Router activates agents in the correct sequence.

---

## Intent Detection Matrix

| User Intent | Keywords | Primary Agent | Secondary Agents | Workflow |
|-------------|----------|---------------|------------------|----------|
| **Bug Fix** | "bug", "error", "broken", "not working", "crash", "fix" | Coder | Reviewer, Tester | Debug → Fix → Test → Review |
| **New Feature** | "add", "create", "build", "new feature", "implement" | Planner | Coder, Tester, Reviewer | Plan → Build → Test → Review |
| **Code Review** | "review", "check", "audit", "feedback", "PR" | Reviewer | Security, A11y, Performance | Review → Specialized audits |
| **Testing** | "test", "coverage", "unit test", "e2e", "playwright" | Tester | QA Manual | Write tests → Manual QA |
| **Performance** | "slow", "optimize", "performance", "bundle", "lighthouse" | Performance | Coder | Audit → Fix → Verify |
| **Security** | "security", "vulnerability", "auth", "XSS", "CSRF" | Security | Reviewer | Audit → Fix → Review |
| **Accessibility** | "a11y", "accessibility", "screen reader", "keyboard", "WCAG" | A11y | Reviewer | Audit → Fix → Review |
| **UI/UX** | "design", "layout", "user experience", "visual", "styling" | UI, UX | Coder | Audit → Fix → Review |
| **Architecture** | "architecture", "structure", "refactor", "organize" | Architect | Coder, Reviewer | Design → Refactor → Review |
| **API/Backend** | "API", "endpoint", "database", "backend", "server" | Backend | Security, Coder | Design → Implement → Audit |
| **Deployment** | "deploy", "CI/CD", "pipeline", "production", "staging" | DevOps | Security | Setup → Test → Deploy |
| **Planning** | "plan", "estimate", "sprint", "roadmap", "tasks" | Planner | Architect | Analyze → Plan → Estimate |
| **Research** | "research", "competitor", "analyze", "investigate" | Browser | Architect | Research → Analyze → Report |
| **Retrospective** | "retro", "retrospective", "what went wrong", "improve" | Retro | Planner | Analyze → Action items |
| **New Project** | "new project", "start from scratch", "initialize" | CEO | Architect, Planner | Strategy → Design → Plan |
| **Documentation** | "document", "README", "docs", "explain" | Reviewer | Architect | Analyze → Document |

---

## Router Decision Tree

```
START: Analyze user request
│
├─ Contains "bug" OR "error" OR "broken"?
│  ├─ YES → BUG FIX WORKFLOW
│  │  ├─ Is it production? → Add DevOps (rollback plan)
│  │  ├─ Is it security-related? → Add Security
│  │  └─ Execute: Debug → Coder → Tester → Reviewer
│  │
│  └─ NO → Continue
│
├─ Contains "new" OR "add" OR "create" OR "build"?
│  ├─ YES → NEW FEATURE WORKFLOW
│  │  ├─ Is it from scratch? → Start with CEO
│  │  ├─ Is it a component? → Planner → Coder
│  │  ├─ Is it an API? → Backend → Coder
│  │  └─ Execute: Plan → Build → Test → Review
│  │
│  └─ NO → Continue
│
├─ Contains "review" OR "audit" OR "check"?
│  ├─ YES → REVIEW WORKFLOW
│  │  ├─ What type?
│  │  │  ├─ Code → Reviewer
│  │  │  ├─ Security → Security
│  │  │  ├─ Performance → Performance
│  │  │  ├─ Accessibility → A11y
│  │  │  ├─ UI/UX → UI + UX
│  │  │  └─ Architecture → Architect
│  │  └─ Execute: Specialized audit(s)
│  │
│  └─ NO → Continue
│
├─ Contains "test" OR "coverage"?
│  ├─ YES → TESTING WORKFLOW
│  │  ├─ Automated? → Tester
│  │  ├─ Manual? → QA Manual
│  │  └─ Execute: Write tests → Run tests → Report
│  │
│  └─ NO → Continue
│
├─ Contains "slow" OR "optimize" OR "performance"?
│  ├─ YES → PERFORMANCE WORKFLOW
│  │  └─ Execute: Performance → Coder → Tester
│  │
│  └─ NO → Continue
│
├─ Contains "deploy" OR "CI/CD" OR "production"?
│  ├─ YES → DEPLOYMENT WORKFLOW
│  │  └─ Execute: DevOps → Security → Reviewer
│  │
│  └─ NO → Continue
│
├─ Contains "plan" OR "estimate" OR "sprint"?
│  ├─ YES → PLANNING WORKFLOW
│  │  └─ Execute: Planner → (optional) Architect
│  │
│  └─ NO → Continue
│
├─ Contains "research" OR "competitor" OR "analyze"?
│  ├─ YES → RESEARCH WORKFLOW
│  │  └─ Execute: Browser → Architect
│  │
│  └─ NO → Continue
│
└─ UNCLEAR INTENT
   └─ Ask clarifying questions
```

---

## Workflow Templates

### 1. BUG FIX WORKFLOW

**Trigger Keywords:** bug, error, broken, not working, crash, issue, problem

**Agent Sequence:**
```
1. Coder Agent (Debug mode)
   → Analyze error
   → Identify root cause
   → Propose fix

2. Coder Agent (Fix mode)
   → Implement fix
   → Handle edge cases

3. Tester Agent
   → Write regression test
   → Verify fix

4. Reviewer Agent
   → Review fix quality
   → Check for side effects
```

**Example Prompts:**
```
User: "The login button is not working"
Router: → Coder (Debug) → Coder (Fix) → Tester → Reviewer

User: "Getting 500 error on /api/products"
Router: → Backend → Coder → Security → Tester

User: "App crashes when clicking export"
Router: → Coder (Debug) → Coder (Fix) → Tester → Reviewer
```

**Output:**
- Root cause analysis
- Fixed code
- Regression test
- Review report

---

### 2. NEW FEATURE WORKFLOW

**Trigger Keywords:** add, create, build, new, implement, feature

**Agent Sequence:**
```
Small Feature (1-3 files):
1. Planner Agent
   → Break down into tasks
   → Estimate time

2. Coder Agent (per file)
   → Implement file 1
   → Implement file 2
   → Implement file 3

3. Tester Agent
   → Write tests

4. Reviewer Agent
   → Review implementation

Large Feature (4+ files):
1. Architect Agent
   → Design architecture
   → Define contracts

2. Planner Agent
   → Create sprint plan

3. Coder Agent (iterative)
   → Implement files one by one

4. Tester Agent
   → Write test suite

5. Reviewer Agent
   → Final review
```

**Example Prompts:**
```
User: "Add a search bar to the product list"
Router: → Planner → Coder → Tester → Reviewer

User: "Build a complete user management system"
Router: → Architect → Planner → Coder (x10) → Backend → Tester → Security → Reviewer

User: "Create a CSV export button"
Router: → Planner → Coder → Tester → Reviewer
```

**Output:**
- Task breakdown
- Implementation code
- Test suite
- Review report

---

### 3. CODE REVIEW WORKFLOW

**Trigger Keywords:** review, check, audit, feedback, PR, pull request

**Agent Sequence:**
```
Basic Review:
1. Reviewer Agent
   → Architecture check
   → Code quality
   → Best practices

Comprehensive Review:
1. Reviewer Agent (always)
2. Security Agent (if auth/data/API)
3. Performance Agent (if bundle/render impact)
4. A11y Agent (if UI changes)
5. UI/UX Agents (if visual changes)
```

**Example Prompts:**
```
User: "Review this PR"
Router: → Reviewer → (detect changes) → Security/Performance/A11y as needed

User: "Check if this code is secure"
Router: → Security → Reviewer

User: "Audit accessibility of this form"
Router: → A11y → Reviewer
```

**Output:**
- Review report with severity levels
- Specialized audit reports
- Consolidated feedback

---

### 4. TESTING WORKFLOW

**Trigger Keywords:** test, coverage, unit test, integration test, e2e, playwright, vitest

**Agent Sequence:**
```
Automated Testing:
1. Tester Agent
   → Write unit tests
   → Write component tests
   → Write E2E tests
   → Check coverage

Manual Testing:
1. QA Manual Agent
   → Create test plan
   → Execute manual tests
   → Report bugs
```

**Example Prompts:**
```
User: "Write tests for ProductList component"
Router: → Tester

User: "Manual QA for checkout flow"
Router: → QA Manual

User: "Check test coverage"
Router: → Tester (coverage analysis)
```

**Output:**
- Test files
- Coverage report
- QA test report

---

### 5. PERFORMANCE OPTIMIZATION WORKFLOW

**Trigger Keywords:** slow, optimize, performance, bundle, lighthouse, speed

**Agent Sequence:**
```
1. Performance Agent
   → Audit current performance
   → Identify bottlenecks
   → Recommend optimizations

2. Coder Agent
   → Implement optimizations
   → Code splitting
   → Lazy loading

3. Performance Agent
   → Verify improvements
   → Run Lighthouse
   → Compare before/after
```

**Example Prompts:**
```
User: "The app is slow"
Router: → Performance → Coder → Performance (verify)

User: "Optimize bundle size"
Router: → Performance → Coder → Performance (verify)

User: "Improve Lighthouse score"
Router: → Performance → Coder → Performance (verify)
```

**Output:**
- Performance audit
- Optimized code
- Before/after metrics

---

### 6. SECURITY AUDIT WORKFLOW

**Trigger Keywords:** security, vulnerability, auth, XSS, CSRF, SQL injection, secure

**Agent Sequence:**
```
1. Security Agent
   → OWASP Top 10 check
   → STRIDE threat modeling
   → Identify vulnerabilities

2. Coder Agent (if fixes needed)
   → Implement security fixes

3. Security Agent
   → Verify fixes

4. Reviewer Agent
   → Final review
```

**Example Prompts:**
```
User: "Security audit for login system"
Router: → Security → Coder (if issues) → Security (verify)

User: "Check for XSS vulnerabilities"
Router: → Security

User: "Is this auth implementation secure?"
Router: → Security → Reviewer
```

**Output:**
- Security audit report
- Fixed code (if needed)
- Verification report

---

### 7. ACCESSIBILITY AUDIT WORKFLOW

**Trigger Keywords:** a11y, accessibility, screen reader, keyboard, WCAG, contrast

**Agent Sequence:**
```
1. A11y Agent
   → WCAG 2.1 AA check
   → Keyboard navigation test
   → Screen reader test
   → Color contrast check

2. Coder Agent (if fixes needed)
   → Implement a11y fixes

3. A11y Agent
   → Verify fixes
```

**Example Prompts:**
```
User: "Check accessibility of this form"
Router: → A11y → Coder (if issues) → A11y (verify)

User: "Is this keyboard accessible?"
Router: → A11y

User: "WCAG audit for dashboard"
Router: → A11y → Coder (if issues) → A11y (verify)
```

**Output:**
- A11y audit report
- Fixed code (if needed)
- WCAG compliance report

---

### 8. UI/UX REVIEW WORKFLOW

**Trigger Keywords:** design, layout, user experience, visual, styling, UX, UI

**Agent Sequence:**
```
1. UI Agent
   → Visual system audit
   → Design token compliance
   → Component specs

2. UX Agent
   → User flow audit
   → Copy review
   → Form/navigation audit

3. Coder Agent (if changes needed)
   → Implement improvements

4. UI/UX Agents
   → Verify improvements
```

**Example Prompts:**
```
User: "Review the design of this page"
Router: → UI → UX → Coder (if issues) → UI/UX (verify)

User: "Improve the user experience of checkout"
Router: → UX → Coder → UX (verify)

User: "Check if colors match design system"
Router: → UI
```

**Output:**
- UI audit report
- UX audit report
- Improved code (if needed)

---

### 9. ARCHITECTURE REFACTOR WORKFLOW

**Trigger Keywords:** architecture, structure, refactor, organize, clean up, technical debt

**Agent Sequence:**
```
1. Architect Agent
   → Audit current architecture
   → Identify violations
   → Propose refactor plan

2. Planner Agent
   → Break down refactor into tasks
   → Estimate effort

3. Coder Agent (iterative)
   → Refactor file by file

4. Reviewer Agent
   → Verify improvements
```

**Example Prompts:**
```
User: "Refactor this messy codebase"
Router: → Architect → Planner → Coder (x N) → Reviewer

User: "Organize project structure"
Router: → Architect → Coder → Reviewer

User: "Fix architecture violations"
Router: → Architect → Planner → Coder (x N) → Reviewer
```

**Output:**
- Architecture audit
- Refactor plan
- Refactored code
- Review report

---

### 10. API/BACKEND DEVELOPMENT WORKFLOW

**Trigger Keywords:** API, endpoint, database, backend, server, REST, GraphQL

**Agent Sequence:**
```
1. Backend Agent
   → Design API contract
   → Design database schema
   → Define validation rules

2. Coder Agent
   → Implement API endpoints
   → Implement database queries

3. Security Agent
   → Security audit

4. Tester Agent
   → Write API tests

5. Reviewer Agent
   → Final review
```

**Example Prompts:**
```
User: "Build a products API"
Router: → Backend → Coder → Security → Tester → Reviewer

User: "Design database schema for users"
Router: → Backend

User: "Add authentication to API"
Router: → Backend → Security → Coder → Tester
```

**Output:**
- API contract
- Database schema
- Implementation code
- Security audit
- Tests

---

### 11. DEPLOYMENT WORKFLOW

**Trigger Keywords:** deploy, CI/CD, pipeline, production, staging, release

**Agent Sequence:**
```
1. DevOps Agent
   → Setup CI/CD pipeline
   → Configure environments
   → Setup monitoring

2. Security Agent
   → Secrets management audit
   → Environment security check

3. Reviewer Agent
   → Review deployment config

4. DevOps Agent
   → Execute deployment
```

**Example Prompts:**
```
User: "Setup CI/CD for this project"
Router: → DevOps → Security → Reviewer

User: "Deploy to production"
Router: → DevOps → Security → DevOps (execute)

User: "Configure staging environment"
Router: → DevOps
```

**Output:**
- CI/CD configuration
- Deployment scripts
- Security audit
- Deployment report

---

### 12. PLANNING WORKFLOW

**Trigger Keywords:** plan, estimate, sprint, roadmap, tasks, breakdown

**Agent Sequence:**
```
1. Planner Agent
   → Analyze requirements
   → Break down into tasks
   → Estimate time
   → Identify dependencies

2. Architect Agent (optional, for large features)
   → Validate technical approach
```

**Example Prompts:**
```
User: "Plan the next sprint"
Router: → Planner

User: "Estimate time for user management feature"
Router: → Planner → Architect (if complex)

User: "Break down this feature into tasks"
Router: → Planner
```

**Output:**
- Task breakdown
- Time estimates
- Dependency map
- Sprint plan

---

### 13. RESEARCH WORKFLOW

**Trigger Keywords:** research, competitor, analyze, investigate, compare

**Agent Sequence:**
```
1. Browser Agent
   → Research competitors
   → Analyze features
   → Document findings

2. Architect Agent (optional)
   → Technical recommendations
```

**Example Prompts:**
```
User: "Research inventory management apps"
Router: → Browser → Architect

User: "Analyze competitor features"
Router: → Browser

User: "What tech stack should we use?"
Router: → Browser → Architect
```

**Output:**
- Research report
- Competitor analysis
- Technical recommendations

---

### 14. RETROSPECTIVE WORKFLOW

**Trigger Keywords:** retro, retrospective, what went wrong, improve, post-mortem

**Agent Sequence:**
```
1. Retro Agent
   → Analyze sprint/project
   → 5-why root cause analysis
   → Generate action items

2. Planner Agent (optional)
   → Plan action items
```

**Example Prompts:**
```
User: "Sprint retrospective"
Router: → Retro → Planner (for action items)

User: "What went wrong with this release?"
Router: → Retro

User: "Post-mortem for production incident"
Router: → Retro → DevOps (prevention plan)
```

**Output:**
- Retrospective report
- Root cause analysis
- 3 action items (assigned)

---

### 15. NEW PROJECT WORKFLOW

**Trigger Keywords:** new project, start from scratch, initialize, bootstrap

**Agent Sequence:**
```
1. CEO Agent
   → Product strategy
   → Product Brief

2. Architect Agent
   → System architecture
   → ARCHITECTURE.md

3. Planner Agent
   → Sprint plan
   → Phase breakdown

4. DevOps Agent
   → Project setup
   → CI/CD pipeline

5. Coder Agent (iterative)
   → Implement foundation
```

**Example Prompts:**
```
User: "Start a new e-commerce project"
Router: → CEO → Architect → Planner → DevOps → Coder

User: "Initialize project structure"
Router: → Architect → DevOps → Coder

User: "New project from scratch"
Router: → CEO → Architect → Planner → DevOps
```

**Output:**
- Product Brief
- ARCHITECTURE.md
- Sprint plan
- Project scaffold
- CI/CD setup

---

## Router Implementation

### As a Standalone Agent

```markdown
# FORGE AGENT ROUTER
**Role:** Meta-agent that analyzes requests and delegates to specialist agents

## Your Job

1. Read the user's request carefully
2. Detect the primary intent using the Intent Detection Matrix
3. Select the appropriate workflow
4. Activate agents in the correct sequence
5. Coordinate outputs between agents

## Decision Process

For every request, ask:
1. What is the user trying to achieve?
2. Which workflow matches this intent?
3. Which agents are needed?
4. In what order should they run?
5. Are there any special considerations?

## Output Format

```
🎯 DETECTED INTENT: [Intent Name]
📋 SELECTED WORKFLOW: [Workflow Name]
🤖 AGENTS ACTIVATED: [Agent 1] → [Agent 2] → [Agent 3]

---

[Execute agents in sequence]

---

✅ WORKFLOW COMPLETE
📊 SUMMARY: [Brief summary of what was accomplished]
```

## Example

User: "The login button is broken"

```
🎯 DETECTED INTENT: Bug Fix
📋 SELECTED WORKFLOW: Bug Fix Workflow
🤖 AGENTS ACTIVATED: Coder (Debug) → Coder (Fix) → Tester → Reviewer

---

[Coder Agent - Debug Mode]
Analyzing the login button issue...
[Output]

[Coder Agent - Fix Mode]
Implementing fix...
[Output]

[Tester Agent]
Writing regression test...
[Output]

[Reviewer Agent]
Reviewing fix quality...
[Output]

---

✅ WORKFLOW COMPLETE
📊 SUMMARY: Fixed login button click handler, added null check, 
           wrote regression test, passed review with 0 issues.
```
```

---

## Integration with Kiro

For Kiro users, the router can be implemented as a skill that automatically activates other skills:

```markdown
# kiro-skills/forge-router/SKILL.md

**Skill Name:** forge-router
**Purpose:** Intelligent agent routing system
**Auto-Activate:** On every user message

## Behavior

1. Analyze user message
2. Detect intent
3. Activate appropriate forge-* skills
4. Coordinate execution
5. Present consolidated output

## Configuration

```json
{
  "autoActivate": true,
  "priority": 1,
  "dependencies": [
    "forge-ceo",
    "forge-architect",
    "forge-planner",
    "forge-coder",
    "forge-reviewer",
    "forge-security",
    "forge-tester",
    "forge-qa",
    "forge-performance",
    "forge-a11y",
    "forge-ui",
    "forge-ux",
    "forge-browser",
    "forge-backend",
    "forge-devops",
    "forge-retro"
  ]
}
```
```

---

## Quick Reference Card

Print this and keep it handy:

```
┌─────────────────────────────────────────────────────────────┐
│              FORGE AGENT ROUTER QUICK REFERENCE             │
├─────────────────────────────────────────────────────────────┤
│ USER SAYS...              │ ROUTER ACTIVATES...             │
├───────────────────────────┼─────────────────────────────────┤
│ "Fix this bug"            │ Coder → Tester → Reviewer       │
│ "Add new feature"         │ Planner → Coder → Tester        │
│ "Review this PR"          │ Reviewer → (+ specialists)      │
│ "Write tests"             │ Tester                          │
│ "App is slow"             │ Performance → Coder             │
│ "Security audit"          │ Security → Reviewer             │
│ "Check accessibility"     │ A11y → Coder                    │
│ "Review design"           │ UI → UX → Coder                 │
│ "Refactor code"           │ Architect → Planner → Coder     │
│ "Build API"               │ Backend → Coder → Security      │
│ "Setup CI/CD"             │ DevOps → Security               │
│ "Plan sprint"             │ Planner                         │
│ "Research competitors"    │ Browser → Architect             │
│ "Sprint retro"            │ Retro → Planner                 │
│ "New project"             │ CEO → Architect → Planner       │
└─────────────────────────────────────────────────────────────┘
```

---

## Benefits of Using the Router

| Benefit | Description |
|---------|-------------|
| **No Decision Fatigue** | Don't waste time choosing which agent to use |
| **Correct Sequence** | Agents run in the right order automatically |
| **Complete Coverage** | Router ensures no step is skipped |
| **Faster Workflow** | One prompt instead of multiple agent activations |
| **Better Results** | Agents work together, not in isolation |
| **Learning Tool** | See which agents are used for which tasks |

---

## Next Steps

1. **Copy this file** to your project
2. **Use the router** as your primary interface
3. **Let it delegate** to specialist agents
4. **Review outputs** from each agent
5. **Iterate** as needed

The router makes Forge Rules accessible to everyone, regardless of experience level.

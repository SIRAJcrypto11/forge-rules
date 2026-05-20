# 🔥 Forge Rules v2.4
### Universal System Architecture & UI/UX Constitution + AI Agent System
**Standard: Silicon Valley Senior Engineer Level**

> *"Structure is freedom. Chaos is the real constraint."*

---

## What Is This?

**Forge Rules** is two things in one:

1. **An engineering rulebook** — 25 chapters covering every aspect of building production-grade web applications: architecture, UI/UX, animation, performance, design system, testing, security, accessibility, TypeScript, error handling, mobile, i18n, API design, monitoring, and data visualization.

2. **An AI agent system** — 16 specialized agents that enforce these rules and push any AI model to its highest output quality. Zero AI slop. Every output is production-grade.

---

## 🤖 The Agent System (16 Agents)

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

## 🔄 The Complete Sprint Workflow

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

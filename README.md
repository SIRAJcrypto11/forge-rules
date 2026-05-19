# 🔥 Forge Rules v2.2
### Universal System Architecture & UI/UX Constitution + AI Agent System
**Standard: Silicon Valley Senior Engineer Level**

> *"Structure is freedom. Chaos is the real constraint."*

---

## What Is This?

**Forge Rules** is two things in one:

1. **An engineering rulebook** — 19 chapters covering architecture, UI/UX, animation, performance, design system, testing, security, accessibility, Git workflow, and TypeScript for any web application.

2. **An AI agent system** — 13 specialized agents that enforce these rules and push any AI model to its highest output quality. Zero AI slop. Every output is production-grade.

---

## 🤖 The Agent System (13 Agents)

```
┌─────────────────────────────────────────────────────────────────┐
│                    FORGE AGENT SYSTEM v2.2                      │
│                                                                 │
│  🎯 CEO        🏗️ Architect   💻 Coder      🎨 UI              │
│  Strategy      Systems        Implement     Visual             │
│                                                                 │
│  🧭 UX         🔍 Reviewer    🔒 Security   🧪 Tester          │
│  Experience    Quality        Safety        Coverage           │
│                                                                 │
│  ⚡ Performance  ♿ A11y       🌐 Browser                       │
│  Speed          Accessible    Research                         │
│                                                                 │
│  🖥️ Backend     🚀 DevOps     🔗 Handoff                       │
│  API/DB         CI/CD         Protocol                         │
└─────────────────────────────────────────────────────────────────┘
```

| Agent | File | Role |
|-------|------|------|
| 🎯 CEO | `agents/ceo.md` | 5-phase product strategy, 10-section review, Product Brief |
| 🏗️ Architect | `agents/architect.md` | 8-phase system design, ADRs, risk register, build sequence |
| 💻 Coder | `agents/coder.md` | Pre-coding protocol, 9-block anatomy, React Query patterns |
| 🎨 UI | `agents/ui.md` | 6-audit visual system, anti-slop detection, component specs |
| 🧭 UX | `agents/ux.md` | 6-audit UX protocol, 8 copy tests, form/nav/mobile audits |
| 🔍 Reviewer | `agents/reviewer.md` | 6-phase review, BLOCKING/HIGH/MEDIUM/LOW format |
| 🔒 Security | `agents/security.md` | OWASP Top 10 + STRIDE threat modeling |
| 🧪 Tester | `agents/tester.md` | Unit/hook/component/E2E templates, coverage requirements |
| ⚡ Performance | `agents/performance.md` | Bundle analysis, render audit, Lighthouse budgets |
| ♿ A11y | `agents/a11y.md` | WCAG 2.1 AA, keyboard nav, screen reader, contrast |
| 🌐 Browser | `agents/browser.md` | 5 research protocols, competitor + tech analysis |
| 🖥️ Backend | `agents/backend.md` | API contracts, DB schema, validation, N+1 prevention ✨NEW |
| 🚀 DevOps | `agents/devops.md` | CI/CD pipeline, secrets, monitoring, rollback ✨NEW |
| 🔗 Handoff | `agents/handoff-protocol.md` | How agent outputs feed into next agent's inputs |

### How to Activate Any Agent

**Method 1 — System Instruction (Recommended):**
Copy the agent file content → paste as AI system instruction → active for entire session.

**Method 2 — Inline:**
```
"Act as Forge CEO Agent. I want to build [idea]."
"Act as Forge Backend Agent. Design the API for [feature]."
"Act as Forge DevOps Agent. Set up CI/CD for [project]."
```

**Method 3 — Kiro Skills (all 13 agents):**
```bash
cp -r kiro-skills/forge-* ~/.kiro/skills/
```

---

## 🔄 The Sprint Workflow

```
THINK → PLAN → BUILD → REVIEW → TEST → SHIP

1. CEO Agent       → Product Brief        (before any code)
2. Architect Agent → ARCHITECTURE.md      (before any code)
3. Coder Agent     → Frontend code        (one file at a time)
4. Backend Agent   → API + DB code        (parallel with Coder)
5. DevOps Agent    → CI/CD setup          (once per project)
6. Reviewer Agent  → Review report        (before merge)
7. Tester Agent    → Test suite           (before merge)
8. Git workflow    → Merged PR
```

See `workflows/new-feature.md` for the complete sprint guide.  
See `examples/03-agent-prompts-example.md` for copy-paste prompts.

---

## 📁 Repository Structure

```
forge-rules/
├── README.md
├── CHANGELOG.md
├── FORGE_AGENT_SYSTEM.md        ← Agent system overview (13 agents)
├── full-rules-single-file.md    ← ALL rules in one file (paste to AI)
│
├── agents/                      ← 13 specialized AI agents
│   ├── ceo.md
│   ├── architect.md
│   ├── coder.md                 ← Fixed: React Query hook pattern
│   ├── ui.md
│   ├── ux.md
│   ├── reviewer.md
│   ├── security.md
│   ├── tester.md
│   ├── performance.md
│   ├── a11y.md
│   ├── browser.md
│   ├── backend.md               ← NEW: API design, DB schema, validation
│   ├── devops.md                ← NEW: CI/CD, secrets, monitoring
│   └── handoff-protocol.md
│
├── workflows/
│   ├── new-feature.md
│   ├── code-review.md
│   ├── ship.md
│   └── debug.md
│
├── rules/                       ← 19 chapters (all complete)
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
│   └── 19-typescript.md         ← NEW: TypeScript standards
│
├── kiro-skills/                 ← 13 Kiro-native skill files
│   ├── forge-ceo/
│   ├── forge-architect/
│   ├── forge-coder/
│   ├── forge-reviewer/
│   ├── forge-security/
│   ├── forge-ui/
│   ├── forge-ux/
│   ├── forge-tester/
│   ├── forge-performance/
│   ├── forge-a11y/
│   ├── forge-browser/
│   ├── forge-backend/           ← NEW
│   └── forge-devops/            ← NEW
│
├── templates/
│   ├── component.template.jsx   ← Fixed: 9 blocks (was 10)
│   ├── hook.template.js
│   ├── service.template.js
│   ├── context.template.jsx     ← NEW: Context with split read/write
│   ├── test.template.js         ← NEW: Unit + Hook + Component tests
│   ├── PR-description.template.md
│   ├── ARCHITECTURE.template.md
│   ├── CONVENTIONS.template.md
│   └── feature-module.template/
│       ├── index.js
│       ├── [Module]Page.jsx
│       ├── hooks/use[Module].js
│       └── components/
│           ├── [Entity]List.jsx ← NEW
│           └── [Entity]Form.jsx ← NEW
│
├── checklists/
│   ├── new-project.checklist.md
│   ├── pre-commit.checklist.md  ← Fixed: PowerShell commands
│   ├── phase-validation.checklist.md
│   ├── code-review.checklist.md
│   └── launch-readiness.checklist.md
│
├── examples/
│   ├── 01-product-brief-example.md
│   ├── 02-architecture-example.md
│   └── 03-agent-prompts-example.md
│
├── docs/                        ← NEW: Agent output documents folder
│   └── README.md
│
└── .github/
    ├── PULL_REQUEST_TEMPLATE.md ← Auto-loaded by GitHub on PR creation
    └── workflows/ci.yml
```

> **PR Templates:** `.github/PULL_REQUEST_TEMPLATE.md` is auto-loaded by GitHub. `templates/PR-description.template.md` is the extended version for major features.

---

## ⚡ Quick Start

### New Project (from scratch)
```
1. Read: checklists/new-project.checklist.md
2. Activate CEO Agent → describe your idea
3. Activate Architect Agent → paste Product Brief
4. Follow: workflows/new-feature.md
```

### Existing Project Audit
```
"Act as Forge Reviewer Agent. Audit [file] against Forge Rules v2.2."
```

### AI System Instruction (paste-and-go)
```
Copy full-rules-single-file.md → paste as system instruction
Every AI response will follow Forge Rules automatically.
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

## 🆕 What's New in v2.2

| Fix/Addition | Description |
|-------------|-------------|
| **Bug Fix** | `agents/coder.md` hook example now uses React Query (was contradicting rules/09) |
| **Bug Fix** | `templates/component.template.jsx` fixed to 9 blocks (was 10) |
| **Bug Fix** | `checklists/pre-commit.checklist.md` now has PowerShell commands for Windows |
| **Bug Fix** | All version numbers updated to v2.2.0 (were stale at v2.0.0) |
| **New Agent** | `agents/backend.md` — API contracts, DB schema, validation, N+1 prevention |
| **New Agent** | `agents/devops.md` — CI/CD pipeline, secrets management, monitoring, rollback |
| **New Rule** | `rules/19-typescript.md` — TypeScript standards, tsconfig, type patterns |
| **New Template** | `templates/context.template.jsx` — Context with split read/write pattern |
| **New Template** | `templates/test.template.js` — Unit + Hook + Component test templates |
| **New Templates** | `[Entity]List.jsx` and `[Entity]Form.jsx` in feature-module.template |
| **New Folder** | `docs/` — For storing agent output documents |
| **New Kiro Skills** | forge-backend, forge-devops |
| **Clarification** | PR template usage explained (GitHub auto-load vs extended version) |

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
**Version:** 2.2.0 — May 2026

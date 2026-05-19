# 🔥 Forge Rules v2.1
### Universal System Architecture & UI/UX Constitution + AI Agent System
**Standard: Silicon Valley Senior Engineer Level**

> *"Structure is freedom. Chaos is the real constraint."*

---

## What Is This?

**Forge Rules** is two things in one:

1. **An engineering rulebook** — 18 chapters covering architecture, UI/UX, animation, performance, design system, testing, security, accessibility, and Git workflow for any web application.

2. **An AI agent system** — 11 specialized agents (CEO, Architect, Coder, UI, UX, Reviewer, Security, Tester, Performance, A11y, Browser) that enforce these rules and push any AI model to its highest output quality.

**Zero AI slop. Every output is production-grade.**

---

## 🤖 The Agent System

```
┌─────────────────────────────────────────────────────────────────┐
│                    FORGE AGENT SYSTEM                           │
│                                                                 │
│  🎯 CEO        🏗️ Architect   💻 Coder      🎨 UI              │
│  Strategy      Systems        Implement     Visual             │
│                                                                 │
│  🧭 UX         🔍 Reviewer    🔒 Security   🧪 Tester          │
│  Experience    Quality        Safety        Coverage           │
│                                                                 │
│  ⚡ Performance  ♿ A11y       🌐 Browser    🔗 Handoff         │
│  Speed          Accessible    Research      Protocol           │
└─────────────────────────────────────────────────────────────────┘
```

| Agent | File | Role |
|-------|------|------|
| 🎯 CEO | `agents/ceo.md` | 5-phase product strategy, 10-section review, Product Brief |
| 🏗️ Architect | `agents/architect.md` | 8-phase system design, ADRs, risk register, build sequence |
| 💻 Coder | `agents/coder.md` | Pre-coding protocol, 9-block anatomy, one file at a time |
| 🎨 UI | `agents/ui.md` | 6-audit visual system, anti-slop detection, component specs |
| 🧭 UX | `agents/ux.md` | 6-audit UX protocol, 8 copy tests, form/nav/mobile audits |
| 🔍 Reviewer | `agents/reviewer.md` | 6-phase review, BLOCKING/HIGH/MEDIUM/LOW format |
| 🔒 Security | `agents/security.md` | OWASP Top 10 + STRIDE threat modeling |
| 🧪 Tester | `agents/tester.md` | Unit/hook/component/E2E templates, coverage requirements |
| ⚡ Performance | `agents/performance.md` | Bundle analysis, render audit, Lighthouse budgets |
| ♿ A11y | `agents/a11y.md` | WCAG 2.1 AA, keyboard nav, screen reader, contrast |
| 🌐 Browser | `agents/browser.md` | 5 research protocols, competitor + tech analysis |
| 🔗 Handoff | `agents/handoff-protocol.md` | How agent outputs feed into next agent's inputs |

### How to Activate Any Agent

**Method 1 — System Instruction (Recommended):**
Copy the agent file content → paste as AI system instruction → active for entire session.

**Method 2 — Inline:**
```
"Act as Forge CEO Agent. I want to build [idea]."
"Act as Forge Reviewer Agent. Review these files: [files]"
"Act as Forge Coder Agent. Build src/utils/formatters.js"
```

**Method 3 — Kiro Skills:**
Copy `kiro-skills/forge-[agent]/` folders to `~/.kiro/skills/`

---

## 🔄 The Sprint Workflow

```
THINK → PLAN → BUILD → REVIEW → TEST → SHIP

1. CEO Agent       → Product Brief        (before any code)
2. Architect Agent → ARCHITECTURE.md      (before any code)
3. Coder Agent     → Working code         (one file at a time)
4. Reviewer Agent  → Review report        (before merge)
5. Tester Agent    → Test suite           (before merge)
6. Git workflow    → Merged PR
```

See `workflows/new-feature.md` for the complete sprint guide.  
See `examples/03-agent-prompts-example.md` for copy-paste prompts.

---

## 📁 Repository Structure

```
forge-rules/
├── README.md
├── CHANGELOG.md
├── FORGE_AGENT_SYSTEM.md        ← Agent system overview
├── full-rules-single-file.md    ← ALL rules in one file (paste to AI)
│
├── agents/                      ← 11 specialized AI agents + handoff protocol
│   ├── ceo.md
│   ├── architect.md
│   ├── coder.md
│   ├── ui.md
│   ├── ux.md
│   ├── reviewer.md
│   ├── security.md
│   ├── tester.md
│   ├── performance.md
│   ├── a11y.md
│   ├── browser.md
│   └── handoff-protocol.md      ← How agents hand off to each other
│
├── workflows/                   ← Sprint workflows
│   ├── new-feature.md           ← Full sprint: Think→Plan→Build→Review→Test→Ship
│   ├── code-review.md           ← Multi-agent review pipeline
│   ├── ship.md                  ← Deployment workflow + rollback
│   └── debug.md                 ← 5-phase root-cause debug protocol
│
├── rules/                       ← 18 chapters of Forge Rules (ALL present)
│   ├── 00-preamble.md
│   ├── 01-iron-laws.md
│   ├── 02-project-anatomy.md
│   ├── 03-eight-layers.md
│   ├── 04-component-architecture.md
│   ├── 05-animation-microinteraction.md  ← timing tokens, micro-interactions
│   ├── 06-performance.md                 ← skeleton laws, code splitting, virtualization
│   ├── 07-design-system.md               ← color system, typography, spacing, shadows
│   ├── 08-ux-information-architecture.md ← UX laws, form UX, empty states, copy
│   ├── 09-state-management.md            ← state hierarchy, form state pattern
│   ├── 10-naming-conventions.md          ← files, variables, components, git
│   ├── 11-build-sequence.md
│   ├── 12-testing.md
│   ├── 13-security.md
│   ├── 14-accessibility.md
│   ├── 15-dark-mode.md
│   ├── 16-git-workflow.md
│   ├── 17-ai-prompting-protocol.md
│   └── 18-forbidden-list.md
│
├── kiro-skills/                 ← Kiro-native skill files (all 11 agents)
│   ├── forge-ceo/SKILL.md
│   ├── forge-architect/SKILL.md
│   ├── forge-coder/SKILL.md
│   ├── forge-reviewer/SKILL.md
│   ├── forge-security/SKILL.md
│   ├── forge-ui/SKILL.md
│   ├── forge-ux/SKILL.md
│   ├── forge-tester/SKILL.md
│   ├── forge-performance/SKILL.md
│   ├── forge-a11y/SKILL.md
│   └── forge-browser/SKILL.md
│
├── templates/                   ← Copy-paste code templates
│   ├── component.template.jsx
│   ├── hook.template.js
│   ├── service.template.js
│   ├── PR-description.template.md
│   ├── ARCHITECTURE.template.md ← Template for new project ARCHITECTURE.md
│   ├── CONVENTIONS.template.md  ← Template for new project CONVENTIONS.md
│   └── feature-module.template/ ← Complete feature module scaffold
│       ├── index.js
│       ├── [Module]Page.jsx
│       └── hooks/use[Module].js
│
├── checklists/                  ← All 5 project checklists
│   ├── new-project.checklist.md
│   ├── pre-commit.checklist.md
│   ├── phase-validation.checklist.md
│   ├── code-review.checklist.md
│   └── launch-readiness.checklist.md
│
├── examples/                    ← Real end-to-end examples
│   ├── 01-product-brief-example.md    ← CEO Agent output example
│   ├── 02-architecture-example.md     ← Architect Agent output example
│   └── 03-agent-prompts-example.md    ← Copy-paste prompts for all agents
│
└── .github/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/ci.yml
```

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
Activate Reviewer Agent:
"Act as Forge Reviewer Agent. Audit [file] against Forge Rules v2.1."
```

### AI System Instruction (paste-and-go)
```
Copy full-rules-single-file.md → paste as system instruction
Every AI response will follow Forge Rules automatically.
```

### Kiro Skills Install
```bash
# Copy all skills to Kiro
cp -r kiro-skills/forge-* ~/.kiro/skills/
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

## 🆕 What's New in v2.1

| Addition | Description |
|----------|-------------|
| **Rules 05-10** | Animation, Performance, Design System, UX/IA, State Management, Naming — all 18 chapters now complete |
| **Handoff Protocol** | `agents/handoff-protocol.md` — explicit chain between all agents |
| **6 New Kiro Skills** | forge-ui, forge-ux, forge-tester, forge-performance, forge-a11y, forge-browser |
| **2 New Checklists** | pre-commit.checklist.md, phase-validation.checklist.md |
| **3 New Templates** | ARCHITECTURE.template.md, CONVENTIONS.template.md, feature-module.template/ |
| **Examples Folder** | Product Brief example, Architecture example, Agent prompts example |
| **full-rules-single-file.md** | Updated with agent system reference and v2.1 version |

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
**Version:** 2.1.0 — May 2026

# 🔥 Forge Rules v2.0
### Universal System Architecture & UI/UX Constitution + AI Agent System
**Standard: Silicon Valley Senior Engineer Level**

> *"Structure is freedom. Chaos is the real constraint."*

---

## What Is This?

**Forge Rules** is two things in one:

1. **An engineering rulebook** — 18 chapters covering architecture, UI/UX, animation, performance, design system, testing, security, accessibility, and Git workflow for any web application.

2. **An AI agent system** — 11 specialized agents (CEO, Architect, Coder, UI, UX, Reviewer, Security, Tester, Performance, A11y, Browser) that enforce these rules and push any AI model to its highest output quality.

These are designed to be:
- **Pasted into any AI** (Kiro, Claude, Gemini, GPT) as system instructions
- **Used as a team standard** for onboarding and code review
- **Applied to every project** — adapt the domain, never the structure
- **Model-agnostic** — works with any AI, any platform, zero dependencies

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
│  ⚡ Performance  ♿ A11y       🌐 Browser                       │
│  Speed          Accessible    Research                         │
└─────────────────────────────────────────────────────────────────┘
```

| Agent | File | Role |
|-------|------|------|
| 🎯 CEO | `agents/ceo.md` | Challenges assumptions, defines scope, produces Product Brief |
| 🏗️ Architect | `agents/architect.md` | 8-layer system design, data flows, API contracts |
| 💻 Coder | `agents/coder.md` | Production-grade implementation, one file at a time |
| 🎨 UI | `agents/ui.md` | Design system enforcement, anti-slop visual quality |
| 🧭 UX | `agents/ux.md` | User flows, copy quality, form UX, empty states |
| 🔍 Reviewer | `agents/reviewer.md` | Architecture + correctness + performance + security |
| 🔒 Security | `agents/security.md` | OWASP Top 10 + STRIDE threat modeling |
| 🧪 Tester | `agents/tester.md` | Unit, hook, component, E2E test strategy |
| ⚡ Performance | `agents/performance.md` | Bundle analysis, render optimization, Lighthouse |
| ♿ A11y | `agents/a11y.md` | WCAG 2.1 AA compliance, keyboard nav, screen readers |
| 🌐 Browser | `agents/browser.md` | Competitor analysis, technical research, documentation |

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

Every feature follows this sequence:

```
THINK → PLAN → BUILD → REVIEW → TEST → SHIP

1. CEO Agent      → Product Brief (before any code)
2. Architect Agent → ARCHITECTURE.md (before any code)
3. Coder Agent    → Working code (one file at a time)
4. Reviewer Agent → Review report (before merge)
5. Tester Agent   → Test suite (before merge)
6. Git workflow   → Merged PR
```

See `workflows/new-feature.md` for the complete sprint guide.

---

## 📁 Repository Structure

```
forge-rules/
├── README.md
├── CHANGELOG.md
├── FORGE_AGENT_SYSTEM.md        ← Agent system overview
├── full-rules-single-file.md    ← ALL rules in one file (paste to AI)
│
├── agents/                      ← 11 specialized AI agents
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
│   └── browser.md
│
├── workflows/                   ← Sprint workflows
│   ├── new-feature.md           ← Full sprint: Think→Plan→Build→Review→Test→Ship
│   ├── code-review.md           ← Review pipeline
│   ├── ship.md                  ← Deployment workflow
│   └── debug.md                 ← Root-cause debug protocol
│
├── rules/                       ← 18 chapters of Forge Rules
│   ├── 00-preamble.md
│   ├── 01-iron-laws.md
│   ├── 02-project-anatomy.md
│   ├── 03-eight-layers.md
│   ├── 04-component-architecture.md
│   ├── 11-build-sequence.md
│   ├── 12-testing.md
│   ├── 13-security.md
│   ├── 14-accessibility.md
│   ├── 15-dark-mode.md
│   ├── 16-git-workflow.md
│   ├── 17-ai-prompting-protocol.md
│   └── 18-forbidden-list.md
│
├── kiro-skills/                 ← Kiro-native skill files
│   ├── forge-ceo/SKILL.md
│   ├── forge-architect/SKILL.md
│   ├── forge-coder/SKILL.md
│   ├── forge-reviewer/SKILL.md
│   └── forge-security/SKILL.md
│
├── templates/                   ← Copy-paste code templates
│   ├── component.template.jsx
│   ├── hook.template.js
│   ├── service.template.js
│   └── PR-description.template.md
│
└── checklists/                  ← Project checklists
    ├── new-project.checklist.md
    ├── code-review.checklist.md
    └── launch-readiness.checklist.md
```

---

## ⚡ Quick Start

### New Project
```
1. Read checklists/new-project.checklist.md
2. Activate CEO Agent → describe your idea
3. Activate Architect Agent → paste Product Brief
4. Follow workflows/new-feature.md
```

### Existing Project Audit
```
Activate Reviewer Agent:
"Act as Forge Reviewer Agent. Audit [file] against Forge Rules v2.0."
```

### AI System Instruction
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

## 🆕 What's New in v2.0

| Addition | Description |
|----------|-------------|
| **11 AI Agents** | CEO, Architect, Coder, UI, UX, Reviewer, Security, Tester, Performance, A11y, Browser |
| **4 Workflows** | New Feature, Code Review, Ship, Debug |
| **Kiro Skills** | Native Kiro skill files for 5 agents |
| **Chapter 12** | Testing — Unit, integration, component, E2E |
| **Chapter 13** | Security — OWASP, XSS, CSRF, env vars |
| **Chapter 14** | Accessibility — WCAG 2.1 AA deep spec |
| **Chapter 15** | Dark Mode — Token-based theming |
| **Chapter 16** | Git Workflow — Conventional Commits, PRs |
| **Chapter 17** | AI Prompting — AI-agnostic protocol |

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
**Version:** 2.0.0 — May 2026

# 🏛️ Master Rules v2.0
### Universal System Architecture & UI/UX Constitution
**Standard: Silicon Valley Senior Engineer Level**

> *"Structure is freedom. Chaos is the real constraint."*

---

## What Is This?

This is a **complete, opinionated engineering rulebook** for building production-grade web applications. It covers architecture, component design, animation, performance, design system, UX, testing, security, accessibility, and Git workflow — all in one place.

These rules are designed to be:
- **Pasted into any AI assistant** (Kiro, Claude, Gemini, GPT) as a system instruction
- **Used as a team standard** for onboarding and code review
- **Applied to every project** — adapt the domain, never the structure

---

## 📁 Repository Structure

```
master-rules/
├── README.md                        ← You are here
├── CHANGELOG.md                     ← Version history
│
├── rules/
│   ├── 00-preamble.md               ← Why these rules exist
│   ├── 01-iron-laws.md              ← The 5 supreme laws
│   ├── 02-project-anatomy.md        ← Universal folder structure
│   ├── 03-eight-layers.md           ← Layer-by-layer specification
│   ├── 04-component-architecture.md ← Component anatomy & laws
│   ├── 05-animation-microinteraction.md ← Motion design system
│   ├── 06-performance.md            ← Zero-loading architecture
│   ├── 07-design-system.md          ← Colors, type, spacing, shadows
│   ├── 08-ux-information-architecture.md ← UX & IA laws
│   ├── 09-state-management.md       ← State hierarchy
│   ├── 10-naming-conventions.md     ← Naming standards
│   ├── 11-build-sequence.md         ← Mandatory build order
│   ├── 12-testing.md                ← Testing strategy & standards ✨NEW
│   ├── 13-security.md               ← Security laws ✨NEW
│   ├── 14-accessibility.md          ← A11y deep spec ✨NEW
│   ├── 15-dark-mode.md              ← Dark mode implementation ✨NEW
│   ├── 16-git-workflow.md           ← Git, commits, PRs ✨NEW
│   ├── 17-ai-prompting-protocol.md  ← AI-agnostic prompting guide
│   └── 18-forbidden-list.md         ← Absolute forbidden patterns
│
├── templates/
│   ├── component.template.jsx       ← Copy-paste component scaffold
│   ├── hook.template.js             ← Copy-paste hook scaffold
│   ├── service.template.js          ← Copy-paste service scaffold
│   ├── feature-module.template/     ← Full feature module scaffold
│   ├── ARCHITECTURE.template.md     ← Project ARCHITECTURE.md template
│   ├── CONVENTIONS.template.md      ← Project CONVENTIONS.md template
│   └── PR-description.template.md  ← Pull request template
│
├── checklists/
│   ├── new-project.checklist.md     ← Before you write a single line
│   ├── pre-commit.checklist.md      ← Before every commit
│   ├── code-review.checklist.md     ← For reviewers
│   ├── phase-validation.checklist.md ← After each build phase
│   └── launch-readiness.checklist.md ← Before going live
│
└── full-rules-single-file.md        ← All rules in ONE file (for AI paste)
```

---

## 🚀 Quick Start

### For AI Assistants
Copy the contents of `full-rules-single-file.md` and paste it as your AI system instruction or custom instructions. Every response will follow these rules automatically.

### For a New Project
1. Read `checklists/new-project.checklist.md`
2. Copy templates from `templates/`
3. Follow `rules/11-build-sequence.md` — Phase 0 first, always

### For Code Review
Use `checklists/code-review.checklist.md` as your review guide.

---

## 📖 The 5 Iron Laws (Quick Reference)

| # | Law | Meaning |
|---|-----|---------|
| 1 | ONE FILE = ONE RESPONSIBILITY | If you can't describe it in 5 words, split it |
| 2 | UI RENDERS DATA, NEVER CREATES IT | No business logic in components |
| 3 | MODULES ARE ISLANDS | Features never import from each other |
| 4 | SHOW SOMETHING INSTANTLY | Content visible within 100ms, always |
| 5 | EVERY INTERACTION HAS A RESPONSE | Silent UI is broken UI |

---

## 🆕 What's New in v2.0

| Chapter | Addition |
|---------|----------|
| Chapter 12 | **Testing** — Unit, integration, component, E2E strategy |
| Chapter 13 | **Security** — XSS, CSRF, input sanitization, env vars |
| Chapter 14 | **Accessibility** — WCAG AA, keyboard nav, screen readers |
| Chapter 15 | **Dark Mode** — Token-based theming implementation |
| Chapter 16 | **Git Workflow** — Commits, branches, PRs, versioning |
| Chapter 17 | **AI Prompting** — AI-agnostic (was Gemini-only in v1) |
| All | Improved specificity, concrete checklists, code examples |

---

## 🤝 Contributing

This is a living document. To propose changes:
1. Open an issue describing the problem or gap
2. Reference the specific chapter and rule number
3. Provide a concrete example of the violation and the fix

---

## 📄 License

MIT — Use freely, adapt to your team, keep the attribution.

**Author:** Siraj Nur Ihrom  
**Version:** 2.0.0 — May 2026

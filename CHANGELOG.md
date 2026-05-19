# Changelog

All notable changes to Forge Rules are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.2.0] — May 2026

### Fixed (Bugs)
- `agents/coder.md` — Hook example now uses React Query (was using manual useState+useEffect, contradicting rules/09 which mandates React Query for server state)
- `templates/component.template.jsx` — Fixed to 9 blocks (was incorrectly labeled Block 10 for default export)
- `checklists/pre-commit.checklist.md` — Added PowerShell commands for Windows users (was Linux-only grep syntax)
- All version numbers updated to v2.2.0 (SKILL.md files and FORGE_AGENT_SYSTEM.md were stale at v2.0.0)

### Added — New Agents
- `agents/backend.md` — Backend Engineer: API contract design, database schema, input validation (Zod), query optimization (N+1 prevention), auth/authorization, error handling
- `agents/devops.md` — DevOps Engineer: CI/CD pipeline (GitHub Actions), environment strategy, secrets management, monitoring, rollback procedures

### Added — New Rules
- `rules/19-typescript.md` — TypeScript standards: tsconfig.json, type definitions, component props typing, hook return types, service typing, anti-patterns, migration guide

### Added — New Templates
- `templates/context.template.jsx` — React Context with split read/write pattern for optimal re-renders
- `templates/test.template.js` — Three sections: Unit tests, Hook tests, Component tests (all 4 states)
- `templates/feature-module.template/components/[Entity]List.jsx` — Complete list component template
- `templates/feature-module.template/components/[Entity]Form.jsx` — Complete form component template

### Added — New Kiro Skills
- `kiro-skills/forge-backend/SKILL.md`
- `kiro-skills/forge-devops/SKILL.md`

### Added — New Folder
- `docs/README.md` — Folder for storing agent output documents (Product Briefs, Review Reports, Audit Reports)

### Changed
- `FORGE_AGENT_SYSTEM.md` — Updated to v2.2.0, added Backend and DevOps agents, added PR template clarification
- `README.md` — Complete rewrite: 13 agents, 19 rules, all fixes documented
- `CHANGELOG.md` — v2.2.0 entry

---

## [2.1.1] — May 2026

### Added — Missing Rules (Chapters 05-10)
- `rules/05-animation-microinteraction.md` — Complete timing tokens, easing system, all micro-interaction patterns, Tailwind animation config
- `rules/06-performance.md` — Skeleton laws, code splitting, memoization rules, virtualization, image optimization, bundle discipline, Lighthouse CI config
- `rules/07-design-system.md` — Full color token system (light+dark), typography scale, spacing grid, border radius, shadow elevation, icon system, component visual standards
- `rules/08-ux-information-architecture.md` — Information hierarchy, navigation laws, form UX laws, empty/error state templates, UX writing 6 laws, mobile UX laws
- `rules/09-state-management.md` — 5-level state hierarchy with code examples, form state pattern, anti-patterns
- `rules/10-naming-conventions.md` — Files, variables, components, hooks, props, handlers, CSS, tests, git, API naming

### Added — Agent Handoff Protocol
- `agents/handoff-protocol.md` — Explicit chain: CEO→Architect→Coder→Reviewer→Tester→Ship with handoff prompts

### Added — 6 Missing Kiro Skills
- `kiro-skills/forge-ui/SKILL.md`
- `kiro-skills/forge-ux/SKILL.md`
- `kiro-skills/forge-tester/SKILL.md`
- `kiro-skills/forge-performance/SKILL.md`
- `kiro-skills/forge-a11y/SKILL.md`
- `kiro-skills/forge-browser/SKILL.md`

### Added — 2 Missing Checklists
- `checklists/pre-commit.checklist.md` — Code quality, architecture, security, tests, git checks
- `checklists/phase-validation.checklist.md` — Concrete validation gates for Phase 0-5+

### Added — 3 New Templates
- `templates/ARCHITECTURE.template.md` — Complete ARCHITECTURE.md template for new projects
- `templates/CONVENTIONS.template.md` — Complete CONVENTIONS.md template
- `templates/feature-module.template/` — Full feature module scaffold (index.js, Page, hook)

### Added — Examples Folder
- `examples/01-product-brief-example.md` — Real CEO Agent output for an inventory app
- `examples/02-architecture-example.md` — Real Architect Agent output for the same app
- `examples/03-agent-prompts-example.md` — Copy-paste prompts for all 11 agents

### Changed
- `full-rules-single-file.md` — Updated to v2.2.0, added agent system reference and usage guide
- `README.md` — Complete rewrite with all 18 rules, all 11 agents, all 5 checklists, examples

---

## [2.1.0] — May 2026

### Added — Agent System
- `agents/ceo.md` — CEO Agent: 5-phase product strategy protocol, 10-section review, Product Brief output
- `agents/architect.md` — Architect Agent: 8-phase system design, ADRs, risk register, build sequence
- `agents/coder.md` — Coder Agent: Pre-coding protocol, 9-block anatomy enforcement, full code examples
- `agents/ui.md` — UI Agent: 6-audit visual system, anti-slop detection, complete component specs
- `agents/ux.md` — UX Agent: 6-audit UX protocol, 8 copy tests, form/nav/mobile audits, patterns library
- `agents/reviewer.md` — Reviewer Agent: 6-phase review, comment format, verdict system
- `agents/security.md` — Security Agent: OWASP Top 10 + STRIDE, client-side checklist, dependency protocol
- `agents/tester.md` — Tester Agent: Unit/hook/component/E2E templates, coverage requirements
- `agents/performance.md` — Performance Agent: Bundle analysis, render audit, virtualization, Lighthouse
- `agents/a11y.md` — A11y Agent: WCAG 2.1 AA, keyboard nav, screen reader, contrast, motion
- `agents/browser.md` — Browser Agent: 5 research protocols, competitor analysis, tech research

### Added — Workflows
- `workflows/new-feature.md` — Full sprint: Think→Plan→Build→Review→Test→Ship
- `workflows/code-review.md` — Multi-agent review pipeline
- `workflows/ship.md` — Pre-ship checklist, deploy sequence, rollback procedure
- `workflows/debug.md` — 5-phase root-cause debug protocol, common bug patterns

### Added — Kiro Skills
- `kiro-skills/forge-ceo/SKILL.md`
- `kiro-skills/forge-architect/SKILL.md`
- `kiro-skills/forge-coder/SKILL.md`
- `kiro-skills/forge-reviewer/SKILL.md`
- `kiro-skills/forge-security/SKILL.md`

### Added — Documentation
- `FORGE_AGENT_SYSTEM.md` — Complete agent system overview and quick reference

---

## [2.0.0] — May 2026

### Added
- Chapter 12: Testing Strategy & Standards (unit, integration, component, E2E)
- Chapter 13: Security Laws (XSS, CSRF, input sanitization, env validation)
- Chapter 14: Accessibility Deep Specification (WCAG AA, keyboard, screen readers)
- Chapter 15: Dark Mode Implementation (token-based theming)
- Chapter 16: Git Workflow (commit conventions, branch naming, PR standards)
- Chapter 17: AI Prompting Protocol (AI-agnostic, replaces Gemini-specific chapter)
- Templates directory: component, hook, service, feature module scaffolds
- Checklists directory: new project, pre-commit, code review, phase validation, launch
- `full-rules-single-file.md` for single-paste AI instruction use
- Phase validation checklists with concrete criteria (replaces vague "VALIDATE" notes)

### Changed
- Chapter 12 (was AI Prompting) → moved to Chapter 17, made AI-agnostic
- Chapter 13 (was Forbidden List) → moved to Chapter 18
- File format changed from `.ini` to `.md` for proper rendering and linking
- Repository split into individual chapter files for easier navigation
- All "VALIDATE" steps in Chapter 11 now have concrete checklists

### Fixed
- Missing `prefers-reduced-motion` implementation details
- Vague error state descriptions now have concrete templates
- Security gap: no mention of XSS/CSRF in v1.0

---

## [1.0.0] — January 2026

### Initial Release
- 13 chapters covering architecture, UI/UX, animation, performance, design system
- Iron Laws, 8-layer architecture, component anatomy
- Animation timing tokens and micro-interaction patterns
- Design system: colors, typography, spacing, shadows, icons
- State management hierarchy
- Naming conventions
- Build sequence protocol

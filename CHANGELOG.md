# Changelog

All notable changes to Master Rules are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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

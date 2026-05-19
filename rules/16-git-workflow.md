# Chapter 16 — Git Workflow

> Git history is documentation. A clean history tells the story of how the software evolved.  
> A messy history is a liability during debugging, rollbacks, and code review.

---

## 16.1 — Branch Strategy

**Model: GitHub Flow** (simple, effective for most teams)

```
main ──────────────────────────────────────────────────────► (production)
       │                    │                    │
       ├─ feat/inventory-search                  │
       │         └──────────► PR → merge → delete
       │
       ├─ fix/cart-quantity-overflow
       │         └──────────► PR → merge → delete
       │
       └─ chore/update-dependencies
                 └──────────► PR → merge → delete
```

**Rules:**
- `main` is always deployable. Never commit broken code to `main`.
- Every change goes through a branch + PR. No direct commits to `main`.
- Branches are short-lived. Merge within 1-3 days.
- Delete branches after merging.

---

## 16.2 — Branch Naming Convention

**Format:** `<type>/<short-description>`

| Type | When to Use | Example |
|------|-------------|---------|
| `feat/` | New feature | `feat/inventory-search` |
| `fix/` | Bug fix | `fix/cart-quantity-overflow` |
| `chore/` | Maintenance, deps, config | `chore/update-react-19` |
| `refactor/` | Code restructure (no behavior change) | `refactor/extract-useFilter` |
| `docs/` | Documentation only | `docs/update-api-readme` |
| `test/` | Tests only | `test/add-formatter-coverage` |
| `hotfix/` | Urgent production fix | `hotfix/payment-crash` |
| `release/` | Release preparation | `release/v2.2.0` |

**Rules:**
- Use kebab-case. No spaces, no underscores.
- Keep it short but descriptive (2-4 words).
- Reference ticket number if applicable: `feat/INV-123-bulk-export`

---

## 16.3 — Commit Message Convention

**Format:** [Conventional Commits](https://www.conventionalcommits.org/)

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types:**

| Type | When to Use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, no logic change |
| `refactor` | Code restructure, no behavior change |
| `test` | Adding or fixing tests |
| `chore` | Build process, dependencies, config |
| `perf` | Performance improvement |
| `ci` | CI/CD configuration |
| `revert` | Reverting a previous commit |

**Scope:** The module or layer affected (optional but recommended).

**Examples:**

```bash
# ✅ Good commits
feat(inventory): add bulk export to CSV
fix(cart): prevent negative quantity on decrement
refactor(useFilter): extract search logic to arrayHelpers
test(formatters): add edge cases for formatCurrency
chore(deps): update react-router-dom to 6.26.0
docs(readme): add environment setup instructions
perf(ProductList): virtualize rows for lists > 100 items

# ❌ Bad commits
fix stuff
update
WIP
asdfgh
fixed the bug
changes
```

**Commit message rules:**
- Subject line: max 72 characters
- Subject line: imperative mood ("add feature" not "added feature")
- Subject line: no period at the end
- Body: explain WHY, not WHAT (the diff shows what)
- Body: wrap at 72 characters

**Body example:**
```
fix(auth): redirect to login on 401 response

Previously, expired tokens caused an infinite loading state
because the API error was silently swallowed. Now we intercept
401 responses in the API service and redirect to /login,
preserving the intended destination for post-login redirect.

Closes #142
```

---

## 16.4 — Pull Request Standards

**PR title:** Same format as commit message.  
`feat(inventory): add bulk export to CSV`

**PR size rules:**
- Ideal: < 400 lines changed
- Maximum: 800 lines changed
- If larger: split into multiple PRs

**PR description template:**
```markdown
## What

Brief description of what this PR does (1-3 sentences).

## Why

Why this change is needed. Link to issue/ticket if applicable.
Closes #[issue number]

## How

Key implementation decisions. Anything non-obvious.
- Used X approach instead of Y because Z
- Added new hook `useExport` to keep component clean

## Testing

How was this tested?
- [ ] Unit tests added/updated
- [ ] Component tests added/updated
- [ ] Manually tested on Chrome, Firefox
- [ ] Tested on mobile (375px)
- [ ] Dark mode tested

## Screenshots (if UI change)

| Before | After |
|--------|-------|
| [screenshot] | [screenshot] |

## Checklist

- [ ] Follows Forge Rules architecture
- [ ] No console.log statements
- [ ] No hardcoded values (all in config/)
- [ ] Loading, empty, and error states handled
- [ ] Accessible (keyboard navigable, aria attributes)
- [ ] Works in dark mode
- [ ] No new security vulnerabilities
```

---

## 16.5 — Code Review Standards

**Reviewer responsibilities:**
- Review within 24 hours of PR opening
- Approve only code you understand
- Be specific in feedback — reference the rule being violated

**Review comment format:**
```
[BLOCKING] This violates Iron Law #2 — business logic in component.
Move the calculation to useInventory hook.

[SUGGESTION] Consider using useMemo here since this filters a large array.

[QUESTION] Why is this using useEffect instead of useMemo for derived data?

[NITPICK] Variable name `d` is unclear. Consider `discountRate`.
```

**Labels:**
- `[BLOCKING]` — Must fix before merge
- `[SUGGESTION]` — Recommended but not required
- `[QUESTION]` — Needs clarification
- `[NITPICK]` — Minor style issue, author's discretion

**Merge requirements:**
- At least 1 approval from a team member
- All `[BLOCKING]` comments resolved
- CI passes (lint, tests, build)
- No merge conflicts

---

## 16.6 — Versioning (Semantic Versioning)

**Format:** `MAJOR.MINOR.PATCH`

| Version | When to Bump | Example |
|---------|-------------|---------|
| MAJOR | Breaking changes, major redesign | `1.0.0 → 2.0.0` |
| MINOR | New features, backward compatible | `1.0.0 → 1.1.0` |
| PATCH | Bug fixes, small improvements | `1.0.0 → 1.0.1` |

**Tagging releases:**
```bash
git tag -a v2.2.0 -m "Release v2.2.0: Add bulk export and dark mode"
git push origin v2.2.0
```

---

## 16.7 — Git Hygiene Rules

```bash
# Before starting work: always pull latest
git pull origin main

# Stage specific files, not everything
git add src/features/inventory/hooks/useInventory.js
git add src/features/inventory/components/ProductList.jsx
# NOT: git add .  (unless you've reviewed every change)

# Review what you're committing
git diff --staged

# Commit with message
git commit -m "feat(inventory): add search by SKU"

# Push with upstream tracking
git push -u origin feat/inventory-search
```

**Rules:**
```
✓ Pull before starting any new work
✓ Commit frequently (every logical unit of work)
✓ Each commit should leave the codebase in a working state
✓ Review staged changes before committing
✓ Write commit messages as you go, not at the end of the day

✗ Never force push to main or shared branches
✗ Never commit .env files
✗ Never commit node_modules
✗ Never use git add . without reviewing changes first
✗ Never commit commented-out code ("just in case")
✗ Never commit console.log statements
✗ Never squash commits that have already been pushed to shared branches
```

---

## 16.8 — `.gitignore` Standard

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
build/
.next/
out/

# Environment variables — NEVER commit these
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/settings.json
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# Testing
coverage/
.nyc_output/
playwright-report/
test-results/

# Misc
*.pem
.vercel
```

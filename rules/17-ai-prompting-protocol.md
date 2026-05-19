# Chapter 17 — AI Prompting Protocol

> This protocol works with any AI assistant: Kiro, Claude, Gemini, GPT, or any future model.  
> The goal is to get consistent, rule-compliant output every time.

---

## 17.1 — System Instruction Setup

**One-time setup:** Paste the contents of `full-rules-single-file.md` as your AI's system instruction or custom instructions.

After setup, the AI will:
- Follow the 8-layer architecture automatically
- Use correct naming conventions
- Generate components with proper anatomy (loading, empty, error states)
- Apply design tokens instead of hardcoded values
- Respect line limits and split files when needed

---

## 17.2 — Pre-Prompt Checklist

Before every AI request, confirm:

```
□ Which Phase are you in? (0-5 from Chapter 11)
□ Which Step within that Phase?
□ What is the exact filename to generate?
□ What does it import from?
□ What does it export?
□ What is the line limit for this file type?
□ Does it need loading, empty, and error states?
□ Does it need mobile responsiveness?
```

---

## 17.3 — Prompt Templates

### Template A — Generate a Single File

```
Build [exact/path/to/File.jsx]

Phase: [0-5]
Step: [step number within phase]
Purpose: [one sentence — what this file does]

Imports from:
  - @/config/[file] for [what]
  - @/utils/[file] for [what]
  - @/hooks/[file] for [what]
  - @/components/[tier]/[Component] for [what]

Exports:
  - [ComponentName] (named export)
  - default [ComponentName]

Props received:
  - [propName]: [type] — [description]
  - [propName]: [type] = [default] — [description]

States to handle:
  - isLoading: skeleton with [N] rows
  - isEmpty: empty state with CTA "[button label]"
  - error: error state with retry button
  - filled: [describe the main content]

Max lines: [limit from Chapter 4]
Mobile: yes (min 375px, no horizontal scroll)
Dark mode: yes (use CSS tokens only)
Accessibility: yes (aria attributes, keyboard nav)
```

### Template B — Generate a Hook

```
Build [exact/path/to/useHookName.js]

Phase: [phase]
Purpose: [one sentence]

Manages state for: [what data/UI state]

Imports from:
  - @/utils/[file] for [calculations/formatting]
  - @/services/[file] for [API calls, if any]

Returns object with:
  - [name]: [type] — [description]
  - [handlerName]: function — [what it does]

Max lines: 100
No JSX. No DOM manipulation.
```

### Template C — Generate a Feature Module

```
Build the complete [module-name] feature module.

Domain entity: [EntityName]
Fields: [list all fields with types]

Required components:
  - [Entity]List.jsx    (table with search + filter + pagination)
  - [Entity]Card.jsx    (card for grid view)
  - [Entity]Form.jsx    (create + edit form)
  - [Entity]Detail.jsx  (full detail view)

Required hooks:
  - use[Module].js      (data + CRUD operations)
  - use[Module]Form.js  (form state + validation)

Build ONE FILE AT A TIME.
After each file, confirm: "File complete. Ready for next?"
```

### Template D — Review & Validate

```
Review the files built in Phase [N] against Master Rules v2.0.

Files to review:
  - [list files]

Check for:
  1. Iron Law violations
  2. Layer boundary violations (wrong imports)
  3. Business logic in components
  4. Missing loading/empty/error states
  5. Hardcoded values (should be in config/)
  6. Line limit violations
  7. Missing aria attributes
  8. Missing dark mode token usage

For each violation found:
  - State the file and line
  - State which rule is violated
  - Provide the corrected code
```

---

## 17.4 — One File Per Output Rule

**Never ask for 2 files in one prompt.**

```
✅ "Build src/utils/formatters.js"
✅ "Build src/hooks/useFilter.js"
✅ "Build src/components/ui/Button.jsx"

❌ "Build all the utility files"
❌ "Build the entire inventory feature"
❌ "Build the layout components"
```

**Why:** One file per output ensures:
- You can review before proceeding
- The AI stays focused on one responsibility
- Errors are caught early, not after 10 files are wrong

---

## 17.5 — Validation Prompts

Use these after completing each Phase:

**After Phase 0 (Foundation):**
```
Review src/config/ and src/utils/formatters.js + validators.js.
Confirm:
- All design tokens are defined in theme.js
- All route strings are in routes.js
- All magic numbers are in constants.js
- formatCurrency handles null, undefined, NaN
- All validators return { valid, error } shape
```

**After Phase 2 (UI Primitives):**
```
Review src/components/ui/Button.jsx.
Confirm:
- Handles: default, hover, active, disabled, loading states
- Has aria-busy when loading
- Has aria-label support for icon-only variant
- Uses CSS tokens (no hardcoded colors)
- Under 120 lines
- Works in dark mode
```

**After Phase 5 (Feature):**
```
Review the [module] feature.
Confirm:
- No cross-feature imports
- index.js only exports the page and necessary hooks
- All components under line limits
- All states handled (loading, empty, error, filled)
- Form has inline validation
- Delete has confirmation dialog
```

---

## 17.6 — Effective Prompting Tips

**Be specific about what you DON'T want:**
```
Build ProductCard.jsx.
Do NOT include:
- Business logic or calculations
- Direct API calls
- Hardcoded colors
- More than 3 levels of JSX nesting
```

**Provide context about the domain:**
```
This is an inventory management app for a clothing retailer.
Products have: name, SKU, price (IDR), stock quantity, category, status.
Status values: active, inactive, draft, archived.
```

**Reference existing files:**
```
Build useInventory.js following the same pattern as useOrders.js.
The hook should manage the same CRUD operations but for products.
```

**Ask for explanation when needed:**
```
Build the file, then explain:
1. Why you chose this state structure
2. What would cause this component to re-render
3. What edge cases are handled
```

# Chapter 8 — UX & Information Architecture Laws

> Users don't read. They scan.  
> Users don't think. They react.  
> Users don't remember. They recognize.  
> Design for the user who is distracted, in a hurry, and slightly confused.

---

## 8.1 — Information Hierarchy

```
RULE: The most important information is the largest and boldest.
RULE: Users must understand the page's purpose in < 3 seconds.
RULE: One primary action per view. Supporting actions are secondary.
RULE: Critical alerts float above content, never buried.
RULE: Progressive disclosure: summary first, detail on demand.
RULE: Whitespace is information — it groups and separates.
```

**Visual weight hierarchy (largest to smallest):**

```
1. Primary metric / page title     → display or h1, highest contrast
2. Key status indicators           → alert badges, KPI values, h2
3. Section headings                → h3, h4
4. Primary body content            → body text, table data
5. Secondary/supporting info       → labels, descriptions, body-sm
6. Metadata                        → timestamps, IDs, captions
```

**The 3-second test:**
Show the page to someone for 3 seconds. Ask: "What is this page for?"
If they can't answer: the hierarchy is wrong. Fix it before shipping.

---

## 8.2 — Navigation Laws

```
RULE: User always knows where they are (active state visible).
RULE: User can always navigate back (breadcrumb or back button).
RULE: Max 3 levels of navigation depth.
RULE: Command Palette (Cmd+K) for power users — always.
RULE: Navigation never changes based on content (only on auth/role).
```

**Sidebar grouping:**
```
Group related items under labeled sections.
Max 7 items per group (Miller's Law — cognitive limit).
Active: left-border 3px accent + accent-light bg + bold label.
Sub-items: indent 16px, smaller font (13px).
Collapsed state: icons only, tooltip on hover.
```

**Active state implementation:**
```jsx
<a
  href={route}
  aria-current={isActive ? 'page' : undefined}
  className={cn(
    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
    isActive
      ? 'bg-accent-light text-accent font-medium border-l-3 border-accent'
      : 'text-text-2 hover:bg-surface-hover hover:text-text-1'
  )}
>
  <Icon size={20} aria-hidden="true" />
  {label}
</a>
```

**Mobile navigation:**
```
Bottom tabs: max 5 items.
"More" tab opens bottom sheet with full list.
Active tab: accent icon + label + dot indicator.
Touch targets: minimum 44×44px.
```

**Breadcrumb (required for pages > 2 levels deep):**
```jsx
<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2 text-caption text-text-3">
    <li><a href="/">Home</a></li>
    <li aria-hidden="true">/</li>
    <li><a href="/inventory">Inventory</a></li>
    <li aria-hidden="true">/</li>
    <li aria-current="page" className="text-text-1">Product Detail</li>
  </ol>
</nav>
```

---

## 8.3 — Form UX Laws

```
RULE: One column layout (multiple columns confuse eye path).
      Exception: side-by-side for clearly related pairs (First/Last Name).
RULE: Related fields grouped in logical sections.
RULE: Labels always above fields, never inside (except search).
RULE: Validate inline on blur, not only on submit.
RULE: Autofocus on first field when form opens.
RULE: Tab order must be logical (top to bottom, left to right).
RULE: Primary button right-aligned, Cancel left.
RULE: Destructive actions require confirmation (never one-click).
RULE: Form state persists on accidental navigation (warn user).
```

**Validation timing:**
```
On blur (when user leaves field):
  → Show error if field is invalid
  → Show success if field is valid
  → Clear error when user starts correcting

On submit:
  → Validate all fields
  → Focus first error field
  → Show all errors simultaneously

NEVER:
  → Validate on every keystroke (except: password strength, character count)
  → Show errors before user has interacted with the field
  → Clear all errors on any keystroke
```

**Error message quality:**
```
✓ SPECIFIC: "Email must include an @ symbol"
✓ HELPFUL: "Password must be at least 8 characters"
✓ ACTIONABLE: "Card declined. Try a different card or contact your bank."
✗ VAGUE: "Invalid input"
✗ TECHNICAL: "Validation failed"
✗ GENERIC: "Something went wrong"
✗ BLAMING: "You entered an invalid email"
```

**Form field order:**
```
1. Required fields first
2. Most important fields first
3. Related fields grouped together
4. Optional fields last
5. Destructive fields (delete, disable) at the very bottom
```

---

## 8.4 — Empty & Error States

**Every list, table, or data section needs ALL FOUR states:**

```
a) LOADING state  → skeleton screens
b) EMPTY state    → no data exists yet
c) ERROR state    → failed to load
d) FILTERED EMPTY → no results for current filters
```

**Empty state template:**
```jsx
// ✅ Complete empty state
<div className="flex flex-col items-center justify-center py-16 text-center">
  {/* Icon: 32-48px, subtle color, relevant to content type */}
  <Package size={48} className="text-text-3 mb-4" aria-hidden="true" />

  {/* Title: specific to content type */}
  <h3 className="text-h4 text-text-1 mb-2">No products yet</h3>

  {/* Description: explain why + what to do */}
  <p className="text-body text-text-2 mb-6 max-w-sm">
    Add your first product to start tracking inventory
    and managing stock levels.
  </p>

  {/* CTA: only if user can take action */}
  <Button onClick={onCreate}>Add Product</Button>
</div>

// ❌ Bad empty state
<div>No data</div>
```

**Error state template:**
```jsx
// ✅ Complete error state
<div className="flex flex-col items-center justify-center py-16 text-center" role="alert">
  <AlertCircle size={48} className="text-danger mb-4" aria-hidden="true" />
  <h3 className="text-h4 text-text-1 mb-2">Failed to load products</h3>
  <p className="text-body text-text-2 mb-6 max-w-sm">
    {/* User-friendly description of what failed */}
    We couldn't load your products. This might be a temporary issue.
  </p>
  <div className="flex gap-3">
    <Button variant="secondary" onClick={onRetry}>Try again</Button>
    <Button variant="ghost" onClick={onContactSupport}>Contact support</Button>
  </div>
</div>
```

**Filtered empty state:**
```jsx
// ✅ Filtered empty — different from "no data"
<div className="flex flex-col items-center justify-center py-16 text-center">
  <Search size={48} className="text-text-3 mb-4" aria-hidden="true" />
  <h3 className="text-h4 text-text-1 mb-2">No products found</h3>
  <p className="text-body text-text-2 mb-6">
    No products match "{query}". Try a different search term.
  </p>
  <Button variant="ghost" onClick={onClearSearch}>Clear search</Button>
</div>
```

---

## 8.5 — UX Writing Laws

**Voice:** Warm, direct, helpful. Like a smart colleague.  
**NOT:** Corporate, condescending, technical, vague.

### Law 1 — SPECIFIC over generic
```
✓ "3 invoices overdue totaling Rp 4.200.000"
✗ "You have pending items"

✓ "Kemeja Oxford Navy deleted"
✗ "Item deleted"

✓ "Invoice #INV-2026-042 sent to client@email.com"
✗ "Invoice sent"
```

### Law 2 — ACTIVE VOICE
```
✓ "Save your changes"
✗ "Changes will be saved"

✓ "Delete this product"
✗ "This product will be deleted"

✓ "Add a team member"
✗ "A team member can be added"
```

### Law 3 — CTAs are ACTIONS (verb + noun)
```
✓ "Create Invoice"    ✓ "Add Product"      ✓ "Send Report"
✓ "Delete Order"      ✓ "Export to CSV"    ✓ "Invite Member"
✗ "OK"               ✗ "Submit"           ✗ "Confirm"
✗ "Yes"              ✗ "Continue"         ✗ "Proceed"
```

### Law 4 — ERRORS explain + instruct
```
✓ "Connection failed. Check your internet and try again."
✓ "Card declined. Your bank rejected this transaction. Try a different card."
✓ "File too large. Maximum size is 10MB. Compress the file and try again."
✗ "Error 503"
✗ "Network error"
✗ "Something went wrong. Please try again."
```

### Law 5 — NUMBERS are FORMATTED
```
✓ "Rp 1.250.000"    ✗ "1250000"
✓ "43.6%"           ✗ "0.436"
✓ "3 days ago"      ✗ "259200 seconds ago"
✓ "May 19, 2026"    ✗ "2026-05-19T08:30:00.000Z"
✓ "1,234 products"  ✗ "1234 products"
```

### Law 6 — CONFIRMATION DIALOGS are specific
```
✓ "Delete 'Kemeja Oxford Navy'?"
  "This product and all its inventory history will be permanently deleted.
   This action cannot be undone."
  [Cancel] [Delete Product]  ← danger button

✗ "Are you sure?"
  [Cancel] [OK]
```

---

## 8.6 — Notification & Feedback Patterns

**Toast notifications:**
```
success: green, auto-dismiss 4 seconds
error:   red, auto-dismiss 8 seconds (longer — user needs to read)
warning: yellow, auto-dismiss 6 seconds
info:    blue, auto-dismiss 4 seconds

Position: bottom-right (desktop), bottom-center (mobile)
Stack: newest on top, max 3 visible
Hover: pause auto-dismiss timer
```

**Toast content quality:**
```
✓ '"Kemeja Oxford Navy" added to inventory'
✓ 'Invoice #INV-042 sent to client@email.com'
✓ 'Export ready. Download will start automatically.'
✗ 'Success'
✗ 'Item created'
✗ 'Done'
```

**Inline feedback (for forms):**
```
Success: green border + checkmark icon inside field
Error:   red border + error message below field (role="alert")
Loading: spinner inside field (for async validation)
```

---

## 8.7 — Destructive Action Pattern

**Rule: Every destructive action requires explicit confirmation.**

```
DESTRUCTIVE ACTIONS (require confirmation):
  - Delete any record
  - Disable/deactivate an account
  - Cancel an order
  - Clear all data
  - Revoke access

NON-DESTRUCTIVE (no confirmation needed):
  - Archive (reversible)
  - Unpublish (reversible)
  - Toggle settings
  - Change status (if reversible)

CONFIRMATION DIALOG REQUIREMENTS:
  1. State EXACTLY what will be deleted/changed
  2. State the CONSEQUENCE (irreversible? data lost?)
  3. Use danger-colored confirm button
  4. Make Cancel the default (keyboard focus on Cancel)
  5. Require typing the item name for bulk/critical deletes
```

---

## 8.8 — Mobile UX Laws

```
RULE: Touch targets minimum 44×44px (Apple HIG) / 48×48dp (Material).
RULE: Adequate spacing between touch targets (minimum 8px).
RULE: No hover-only interactions (touch devices have no hover).
RULE: Swipe gestures have button alternatives.
RULE: Pinch-to-zoom not disabled.
RULE: Correct keyboard type per input field.
RULE: Modals become full-screen bottom sheets below 480px.
```

**Keyboard types:**
```jsx
<input type="email"   />  // Shows @ key on mobile
<input type="tel"     />  // Shows number pad
<input type="number"  />  // Shows number keyboard
<input type="search"  />  // Shows search key
<input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
/>  // Number pad without type="number" quirks
```

**Bottom sheet pattern (mobile modals):**
```jsx
// Below 480px: full-screen bottom sheet
// Above 480px: centered modal

function AdaptiveModal({ isOpen, onClose, children }) {
  const isMobile = useMediaQuery('(max-width: 480px)')

  if (isMobile) {
    return (
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        {children}
      </BottomSheet>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  )
}
```

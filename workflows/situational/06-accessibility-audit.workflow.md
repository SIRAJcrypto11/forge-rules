# Workflow: Accessibility Audit & Fix
**ID:** WF-06  
**Trigger Keywords:** accessibility, a11y, WCAG, screen reader, keyboard navigation, ARIA, contrast, alt text, semantic HTML, assistive technology, inclusive design  
**Primary Agent:** A11y  
**Support Agents:** UI, Coder, Tester (QA Manual)  
**Estimated Time:** 3 days – 3 weeks  

---

## Overview

Accessibility is not optional — it's a legal requirement (ADA, Section 508) and ethical imperative. This workflow ensures your product is usable by everyone, including people with disabilities.

---

## WCAG 2.1 Conformance Levels

| Level | Description | Requirement |
|-------|-------------|-------------|
| A | Minimum (basic accessibility) | Legal baseline |
| AA | Mid-range (recommended target) | Industry standard |
| AAA | Highest (enhanced support) | Nice to have |

**Target: WCAG 2.1 Level AA compliance**

---

## Phase 1: Automated Audit

### 1.1 Automated Testing Tools
```bash
# axe-core (most comprehensive)
npm install --save-dev @axe-core/cli
npx axe http://localhost:3000 --save audit-report.json

# Lighthouse accessibility audit
npx lighthouse http://localhost:3000 --only-categories=accessibility --output=html

# Pa11y
npm install -g pa11y
pa11y http://localhost:3000

# WAVE (browser extension)
# Install: https://wave.webaim.org/extension/
```

### 1.2 Automated Test Results Analysis
```
Common automated findings:
- [ ] Missing alt text on images
- [ ] Insufficient color contrast
- [ ] Missing form labels
- [ ] Missing ARIA attributes
- [ ] Improper heading hierarchy
- [ ] Missing landmark regions
- [ ] Links without discernible text
- [ ] Buttons without accessible names
```

---

## Phase 2: Manual Testing (Critical — Automated tools catch only ~30%)

### 2.1 Keyboard Navigation Test
```
Test with keyboard only (no mouse):
- [ ] Tab through all interactive elements
- [ ] Shift+Tab to go backwards
- [ ] Enter/Space to activate buttons
- [ ] Arrow keys for radio buttons, dropdowns
- [ ] Escape to close modals/menus
- [ ] No keyboard traps (can always escape)
- [ ] Focus indicator always visible
- [ ] Logical tab order (left-to-right, top-to-bottom)
```

### 2.2 Screen Reader Testing
```
Test with:
- NVDA (Windows, free): https://www.nvaccess.org/
- JAWS (Windows, paid): https://www.freedomscientific.com/
- VoiceOver (macOS/iOS, built-in): Cmd+F5
- TalkBack (Android, built-in)

Screen reader checklist:
- [ ] All content is announced
- [ ] Images have meaningful alt text
- [ ] Form fields have associated labels
- [ ] Error messages are announced
- [ ] Dynamic content changes are announced (aria-live)
- [ ] Buttons/links have clear purpose
- [ ] Headings create logical outline
- [ ] Tables have proper headers
```

### 2.3 Visual Testing
```
Color blindness simulation:
- [ ] Protanopia (red-blind)
- [ ] Deuteranopia (green-blind)
- [ ] Tritanopia (blue-blind)
- [ ] Monochromacy (grayscale)

Tools: Chrome DevTools > Rendering > Emulate vision deficiencies

Zoom testing:
- [ ] 200% zoom (WCAG requirement)
- [ ] 400% zoom (no horizontal scroll)
- [ ] Text spacing adjustments
```

---

## Phase 3: Fix Implementation

### 3.1 Semantic HTML
```html
<!-- BAD - divs for everything -->
<div class="header">
  <div class="nav">
    <div class="link" onclick="navigate()">Home</div>
  </div>
</div>
<div class="main">
  <div class="article">Content</div>
</div>

<!-- GOOD - semantic elements -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>Content</article>
</main>
<footer>Footer content</footer>
```

### 3.2 ARIA Attributes (Use sparingly — HTML first)
```jsx
// Buttons
<button 
  aria-label="Close dialog"  // when no visible text
  aria-pressed={isActive}    // for toggle buttons
  aria-expanded={isOpen}     // for expandable sections
  aria-disabled={isDisabled} // when disabled but still focusable
>
  <CloseIcon aria-hidden="true" /> {/* decorative icon */}
</button>

// Form inputs
<label htmlFor="email">Email address</label>
<input 
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email address
  </span>
)}

// Live regions (for dynamic content)
<div 
  role="status"           // polite announcement
  aria-live="polite"      // don't interrupt
  aria-atomic="true"      // announce whole region
>
  {statusMessage}
</div>

<div 
  role="alert"            // assertive announcement
  aria-live="assertive"   // interrupt current speech
>
  {errorMessage}
</div>

// Landmarks
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>
<aside aria-labelledby="sidebar-heading">...</aside>
<section aria-labelledby="section-heading">...</section>
```

### 3.3 Focus Management
```jsx
// Focus trap in modal
import { useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';

const Modal = ({ isOpen, onClose, children }) => {
  const closeButtonRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Focus first interactive element when opened
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <FocusTrap>
      <div 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">Modal Title</h2>
        {children}
        <button 
          ref={closeButtonRef}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </FocusTrap>
  );
};

// Skip to main content link
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
<main id="main-content">...</main>

/* CSS for skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
```

### 3.4 Color Contrast
```css
/* WCAG AA requirements:
   - Normal text (< 18px): 4.5:1
   - Large text (>= 18px or bold >= 14px): 3:1
   - UI components: 3:1
*/

/* BAD - insufficient contrast */
.text { color: #767676; background: #ffffff; } /* 4.54:1 - barely passes */

/* GOOD - strong contrast */
.text { color: #595959; background: #ffffff; } /* 7:1 - AAA */

/* Check contrast: https://webaim.org/resources/contrastchecker/ */

/* Don't rely on color alone */
/* BAD */
.error { color: red; }
.success { color: green; }

/* GOOD - color + icon + text */
.error { 
  color: #d32f2f; 
  &::before { content: '⚠️ '; }
}
.success { 
  color: #388e3c; 
  &::before { content: '✓ '; }
}
```

### 3.5 Images & Media
```jsx
// Informative images
<img 
  src="/chart.png" 
  alt="Bar chart showing 40% increase in sales from Q1 to Q2"
/>

// Decorative images
<img src="/decoration.png" alt="" /> {/* empty alt */}
<div style={{ backgroundImage: 'url(/bg.png)' }} /> {/* CSS bg */}

// Complex images (charts, diagrams)
<figure>
  <img src="/complex-chart.png" alt="Sales data visualization" />
  <figcaption>
    Detailed description: Sales increased from $100k in January 
    to $250k in June, with the largest jump in April.
  </figcaption>
</figure>

// Video captions
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track 
    kind="captions" 
    src="captions.vtt" 
    srclang="en" 
    label="English"
    default
  />
</video>

// Audio transcripts
<audio controls src="podcast.mp3"></audio>
<details>
  <summary>Read transcript</summary>
  <p>Full transcript text here...</p>
</details>
```

### 3.6 Forms
```jsx
// Accessible form
<form onSubmit={handleSubmit}>
  {/* Group related fields */}
  <fieldset>
    <legend>Personal Information</legend>
    
    {/* Label association */}
    <label htmlFor="name">
      Full Name <span aria-label="required">*</span>
    </label>
    <input 
      id="name"
      type="text"
      required
      aria-required="true"
      aria-invalid={errors.name ? "true" : "false"}
      aria-describedby={errors.name ? "name-error" : "name-hint"}
    />
    <span id="name-hint" className="hint">
      Enter your first and last name
    </span>
    {errors.name && (
      <span id="name-error" role="alert" className="error">
        {errors.name}
      </span>
    )}
  </fieldset>
  
  {/* Radio buttons */}
  <fieldset>
    <legend>Preferred contact method</legend>
    <label>
      <input type="radio" name="contact" value="email" />
      Email
    </label>
    <label>
      <input type="radio" name="contact" value="phone" />
      Phone
    </label>
  </fieldset>
  
  {/* Submit button */}
  <button type="submit">
    Submit form
  </button>
</form>
```

### 3.7 Data Tables
```jsx
// Simple table
<table>
  <caption>Monthly sales data for 2024</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$100,000</td>
      <td>+5%</td>
    </tr>
  </tbody>
</table>

// Complex table with headers
<table>
  <thead>
    <tr>
      <th id="name" scope="col">Name</th>
      <th id="q1" scope="col">Q1</th>
      <th id="q2" scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="john" scope="row">John</th>
      <td headers="john q1">$50k</td>
      <td headers="john q2">$60k</td>
    </tr>
  </tbody>
</table>
```

---

## Phase 4: Testing & Validation

### 4.1 Automated Regression Tests
```javascript
// Jest + jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Playwright accessibility tests
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Homepage should not have accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### 4.2 Manual QA Checklist
```
Keyboard:
- [ ] All functionality available via keyboard
- [ ] Focus order is logical
- [ ] Focus indicator visible on all elements
- [ ] No keyboard traps

Screen Reader:
- [ ] All content announced correctly
- [ ] Form errors announced
- [ ] Dynamic updates announced
- [ ] Landmarks properly labeled

Visual:
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] UI component contrast meets 3:1
- [ ] Content readable at 200% zoom
- [ ] No information conveyed by color alone

Content:
- [ ] Headings in logical order (no skipped levels)
- [ ] All images have appropriate alt text
- [ ] Links have descriptive text (not "click here")
- [ ] Language of page declared (<html lang="en">)
```

---

## Phase 5: Documentation

### 5.1 Accessibility Statement
```markdown
# Accessibility Statement

We are committed to ensuring digital accessibility for people with disabilities. 
We continually improve the user experience for everyone and apply relevant 
accessibility standards.

## Conformance Status
This website is partially conformant with WCAG 2.1 level AA.

## Feedback
We welcome your feedback on the accessibility of this site. Please contact us at:
- Email: accessibility@yourcompany.com
- Phone: +1-XXX-XXX-XXXX

## Known Issues
- [Issue 1]: [Description and workaround]
- [Issue 2]: [Description and expected fix date]

Last updated: [Date]
```

### 5.2 Component Accessibility Documentation
```markdown
## Button Component - Accessibility

### Keyboard Support
- Enter/Space: Activates the button
- Tab: Moves focus to the button

### Screen Reader Support
- Announces button label
- Announces disabled state
- Announces pressed state (for toggle buttons)

### ARIA Attributes
- `role="button"` (if not using <button>)
- `aria-label` (if no visible text)
- `aria-pressed` (for toggle buttons)
- `aria-disabled` (when disabled but focusable)

### Usage
\`\`\`jsx
<Button aria-label="Close dialog">
  <CloseIcon aria-hidden="true" />
</Button>
\`\`\`
```

---

## Quick Reference: Common A11y Mistakes

| Mistake | Impact | Fix |
|---------|--------|-----|
| `<div onClick>` | Not keyboard accessible | Use `<button>` |
| Missing alt text | Screen reader can't describe image | Add descriptive alt |
| Low contrast text | Hard to read | Use 4.5:1 ratio minimum |
| `outline: none` | No focus indicator | Style focus, don't remove |
| Auto-playing media | Disruptive | Provide pause control |
| Time limits | Can't complete task | Allow extension |
| `<div>` for everything | No semantic meaning | Use semantic HTML |
| ARIA overuse | Confusing for SR users | HTML first, ARIA second |
| Missing labels | Forms unusable | Associate label with input |
| Keyboard traps | Can't navigate away | Ensure Esc works |

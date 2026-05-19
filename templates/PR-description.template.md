## What

<!-- Brief description of what this PR does (1-3 sentences) -->

## Why

<!-- Why this change is needed. Link to issue/ticket if applicable -->

Closes #<!-- issue number -->

## How

<!-- Key implementation decisions. Anything non-obvious about the approach -->

- 
- 

## Testing

How was this tested?

- [ ] Unit tests added/updated
- [ ] Component tests added/updated  
- [ ] Integration tests added/updated
- [ ] Manually tested on Chrome
- [ ] Manually tested on mobile (375px viewport)
- [ ] Dark mode tested
- [ ] Keyboard navigation tested

## Screenshots

<!-- Required for any UI changes -->

| Before | After |
|--------|-------|
| | |

## Master Rules Checklist

- [ ] Follows 8-layer architecture (no cross-layer violations)
- [ ] No cross-feature imports
- [ ] No business logic in components
- [ ] All files within line limits
- [ ] Loading, empty, and error states handled
- [ ] No hardcoded values (all in `config/`)
- [ ] No hardcoded colors (all CSS tokens)
- [ ] Accessible: keyboard navigable, aria attributes present
- [ ] Works in dark mode
- [ ] No `console.log` statements
- [ ] No `style={{ }}` inline styles
- [ ] `prefers-reduced-motion` respected for animations
- [ ] No security violations (no secrets, no XSS vectors)
- [ ] `npm audit` passes (no CRITICAL/HIGH vulnerabilities)

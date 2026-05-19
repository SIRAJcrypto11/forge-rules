/**
 * @file src/features/[module]/index.js
 * @layer Layer 8 — Features
 * @purpose Public API for the [Module] feature. Only export what other parts of the app need.
 *
 * RULE: Internal components are NEVER exported from here.
 * RULE: Only the page component and hooks needed by other modules are exported.
 */

// ── Public page export (required) ────────────────────────────
export { default } from './[Module]Page'

// ── Public hook exports (only if other modules need them) ────
// export { use[Module]Summary } from './hooks/use[Module]'

// ── DO NOT export internal components ────────────────────────
// ✗ export { [Entity]List } from './components/[Entity]List'
// ✗ export { [Entity]Form } from './components/[Entity]Form'
// ✗ export { use[Module] } from './hooks/use[Module]'

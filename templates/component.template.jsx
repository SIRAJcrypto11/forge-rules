/**
 * COMPONENT TEMPLATE — Master Rules v2.0
 * Copy this file, rename it, and fill in the blanks.
 * Delete all comments marked [TEMPLATE] after filling in.
 *
 * File: src/[layer]/[tier]/[ComponentName].jsx
 * Max lines: 120 (ui), 150 (feature), 200 (page)
 */

// ─────────────────────────────────────────────────────────────
// BLOCK 1: External imports
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useMemo, useCallback } from 'react'
// [TEMPLATE] Add Lucide icons as named imports:
// import { IconName, AnotherIcon } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// BLOCK 2: Internal config / utils / hooks
// ─────────────────────────────────────────────────────────────
// [TEMPLATE] Import only what this component needs:
// import { SOME_CONSTANT } from '@/config/constants'
// import { formatCurrency } from '@/utils/formatters'
// import { useFilter } from '@/hooks/useFilter'

// ─────────────────────────────────────────────────────────────
// BLOCK 3: Sub-components (shared)
// ─────────────────────────────────────────────────────────────
// [TEMPLATE] Import shared components:
// import { StatusBadge } from '@/components/shared/StatusBadge'
// import { EmptyState } from '@/components/ui/EmptyState'

// ─────────────────────────────────────────────────────────────
// BLOCK 4: Local constants (this file only)
// ─────────────────────────────────────────────────────────────
// [TEMPLATE] Define variant maps, config objects, etc.
// const VARIANT_STYLES = {
//   primary:   'bg-accent text-accent-text hover:bg-accent-hover',
//   secondary: 'bg-surface border border-border text-text-1',
//   ghost:     'text-accent hover:bg-accent-light'
// }

// ─────────────────────────────────────────────────────────────
// BLOCK 5: Internal sub-components (tiny, local only)
// ─────────────────────────────────────────────────────────────
// [TEMPLATE] Small helper components used only in this file.
// Keep these under 20 lines. If larger, extract to own file.
// function RowItem({ item }) {
//   return <div>{item.name}</div>
// }

// ─────────────────────────────────────────────────────────────
// BLOCK 6: Main component
// ─────────────────────────────────────────────────────────────

/**
 * [TEMPLATE] Replace with JSDoc describing this component.
 * @param {Object} props
 * @param {Array}    props.items      - [TEMPLATE] Required: describe the data
 * @param {Function} props.onSelect   - [TEMPLATE] Required: describe the callback
 * @param {boolean}  [props.isLoading=false] - Shows skeleton when true
 * @param {string}   [props.error=null]      - Shows error state when set
 * @param {string}   [props.className='']    - Additional CSS classes
 */
export function ComponentName({
  // Required props first (no default value)
  items,
  onSelect,
  // Optional props with defaults
  isLoading = false,
  error = null,
  className = ''
}) {
  // ── 6a. State (only non-derived, non-server state) ──────────
  const [activeId, setActiveId] = useState(null)

  // ── 6b. Derived state (ALWAYS useMemo, NEVER useState) ──────
  // [TEMPLATE] Replace with actual derived computation
  const processedItems = useMemo(() => {
    if (!items) return []
    return items // .filter(...).sort(...)
  }, [items])

  // ── 6c. Side effects ────────────────────────────────────────
  // [TEMPLATE] Only use useEffect for true side effects:
  // subscriptions, DOM manipulation, external sync.
  // NOT for derived data (use useMemo instead).
  // useEffect(() => {
  //   // side effect
  //   return () => { /* cleanup */ }
  // }, [dependency])

  // ── 6d. Handlers (ALWAYS useCallback) ───────────────────────
  const handleSelect = useCallback((id) => {
    setActiveId(id)
    onSelect?.(id)
  }, [onSelect])

  // ── 6e. Early returns for special states ────────────────────
  if (isLoading) return <ComponentNameSkeleton />
  if (error) return <ComponentNameError error={error} />
  if (!processedItems.length) return <ComponentNameEmpty />

  // ── 6f. Main render ─────────────────────────────────────────
  return (
    <div className={`${className}`}>
      {/* [TEMPLATE] Main content */}
      {processedItems.map(item => (
        <div
          key={item.id}
          onClick={() => handleSelect(item.id)}
          className={`
            cursor-pointer rounded-lg p-4
            border border-border
            hover:border-accent hover:shadow-md
            transition-all duration-150
            ${activeId === item.id ? 'border-accent bg-accent-light' : 'bg-surface'}
          `}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BLOCK 7: Skeleton state
// ─────────────────────────────────────────────────────────────
function ComponentNameSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading...">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-lg bg-sunken animate-shimmer"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BLOCK 8: Empty state
// ─────────────────────────────────────────────────────────────
function ComponentNameEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* [TEMPLATE] Replace with appropriate icon */}
      {/* <IconName size={48} className="text-text-3 mb-4" aria-hidden="true" /> */}
      <h3 className="text-h4 text-text-1 mb-2">
        {/* [TEMPLATE] "No [items] yet" */}
        No items yet
      </h3>
      <p className="text-body text-text-2 mb-6 max-w-sm">
        {/* [TEMPLATE] Explain why empty + what to do */}
        Get started by adding your first item.
      </p>
      {/* [TEMPLATE] CTA button — verb + noun */}
      {/* <Button onClick={onAdd}>Add Item</Button> */}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BLOCK 9: Error state
// ─────────────────────────────────────────────────────────────
function ComponentNameError({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* <AlertCircle size={48} className="text-danger mb-4" aria-hidden="true" /> */}
      <h3 className="text-h4 text-text-1 mb-2">Something went wrong</h3>
      <p className="text-body text-text-2 mb-6 max-w-sm">
        {error || 'Failed to load data. Please try again.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn btn-secondary"
        >
          Try again
        </button>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BLOCK 10: Default export
// ─────────────────────────────────────────────────────────────
export default ComponentName

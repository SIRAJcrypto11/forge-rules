/**
 * HOOK TEMPLATE — Master Rules v2.0
 * Copy this file, rename it, and fill in the blanks.
 * Delete all comments marked [TEMPLATE] after filling in.
 *
 * File: src/hooks/use[Name].js  OR  src/features/[module]/hooks/use[Name].js
 * Max lines: 100
 * Rules:
 *   - Name starts with "use"
 *   - Returns a plain object (not array, unless single value)
 *   - No JSX
 *   - No direct DOM manipulation
 *   - All math delegated to utils/
 *   - One hook = one clear responsibility
 */

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
// [TEMPLATE] Import utils for calculations (never do math in hooks directly):
// import { calcMetric, filterByQuery } from '@/utils/calculators'
// [TEMPLATE] Import services only if this hook fetches data:
// import { apiService } from '@/services/api.service'

/**
 * [TEMPLATE] Replace with JSDoc describing this hook.
 *
 * @param {Array}  items          - [TEMPLATE] Describe the input
 * @param {Object} [config={}]    - [TEMPLATE] Optional configuration
 * @param {string} [config.key]   - [TEMPLATE] Describe config options
 *
 * @returns {Object} Hook state and handlers
 * @returns {Array}    returns.items       - [TEMPLATE] Describe
 * @returns {boolean}  returns.isLoading   - True while fetching
 * @returns {string}   returns.error       - Error message or null
 * @returns {Function} returns.handleX     - [TEMPLATE] Describe handler
 *
 * @example
 * const { items, isLoading, handleSearch } = useHookName(rawData)
 */
export function useHookName(items = [], config = {}) {
  // ── Destructure config with defaults ────────────────────────
  const {
    // [TEMPLATE] Add config options with defaults
    // defaultSortKey = 'createdAt',
    // pageSize = 25
  } = config

  // ── 1. State declarations ────────────────────────────────────
  // Only non-derived state goes here.
  // If a value can be computed from other state/props → use useMemo.
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // [TEMPLATE] Add your state:
  // const [query, setQuery] = useState('')
  // const [selectedId, setSelectedId] = useState(null)

  // ── 2. Refs (for values that don't trigger re-render) ────────
  // [TEMPLATE] Use refs for: abort controllers, timers, previous values
  // const abortControllerRef = useRef(null)

  // ── 3. Derived state (ALWAYS useMemo, NEVER useState) ────────
  // [TEMPLATE] Replace with actual derived computation
  const processedItems = useMemo(() => {
    if (!items || !items.length) return []
    return items
    // Example: return filterByQuery(items, query, ['name', 'sku'])
  }, [items]) // [TEMPLATE] Add all dependencies

  // ── 4. Side effects ─────────────────────────────────────────
  // [TEMPLATE] Only for: data fetching, subscriptions, external sync
  // useEffect(() => {
  //   let cancelled = false
  //
  //   async function fetchData() {
  //     setIsLoading(true)
  //     setError(null)
  //
  //     const { data, error: fetchError } = await apiService.get('/endpoint')
  //
  //     if (!cancelled) {
  //       if (fetchError) setError(fetchError)
  //       else setItems(data)
  //       setIsLoading(false)
  //     }
  //   }
  //
  //   fetchData()
  //   return () => { cancelled = true }
  // }, []) // [TEMPLATE] Add dependencies

  // ── 5. Handlers (ALWAYS useCallback) ────────────────────────
  // [TEMPLATE] Replace with actual handlers
  const handleAction = useCallback((value) => {
    // [TEMPLATE] Implement handler
    // setQuery(value)
  }, []) // [TEMPLATE] Add dependencies

  // ── 6. Return plain object ───────────────────────────────────
  // Group related values together.
  // Order: data → loading/error → counts → handlers
  return {
    // Data
    items: processedItems,

    // Status
    isLoading,
    error,

    // Counts / metadata
    count: processedItems.length,
    isEmpty: !isLoading && processedItems.length === 0,

    // Handlers
    handleAction,

    // [TEMPLATE] Add more as needed:
    // query,
    // handleSearch,
    // handleSort,
    // handleCreate,
    // handleUpdate,
    // handleDelete,
  }
}

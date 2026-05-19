/**
 * @file src/features/[module]/hooks/use[Module].js
 * @layer Layer 8 — Features (module hook)
 * @purpose Primary data and state hook for [Module] feature.
 *          Manages CRUD, filtering, sorting, pagination, optimistic updates.
 * @imports-from Layer 4 (calculators, arrayHelpers), Layer 6 (services)
 * @exports use[Module] (named)
 * Max lines: 100
 */

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { filterByQuery, sortArray, paginate } from '@/utils/arrayHelpers'
import { [entity]Service } from '@/services/[entity].service'
import { useToast } from '@/hooks/useToast'
import { PAGINATION } from '@/config/constants'

/**
 * Manages the complete [Module] state including CRUD, filtering,
 * sorting, pagination, and optimistic updates.
 *
 * @param {Object} [options={}]
 * @param {number} [options.pageSize=25]
 * @param {string} [options.defaultSort='updatedAt']
 * @returns {Object} Complete [module] state and handlers
 */
export function use[Module](options = {}) {
  const {
    pageSize = PAGINATION.DEFAULT_PAGE_SIZE,
    defaultSort = 'updatedAt',
  } = options

  const { addToast } = useToast()
  const abortRef = useRef(null)

  // ── 1. Server state ───────────────────────────────────────────
  const [[entity]s, set[Entity]s] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // ── 2. UI state ───────────────────────────────────────────────
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState(defaultSort)
  const [sortDir, setSortDir] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)

  // ── 3. Derived state — ALL useMemo ────────────────────────────
  const filtered = useMemo(() => {
    const searched = filterByQuery([entity]s, query, ['name']) // [TEMPLATE] add searchable fields
    return sortArray(searched, sortKey, sortDir)
  }, [[entity]s, query, sortKey, sortDir])

  const paginated = useMemo(
    () => paginate(filtered, currentPage, pageSize),
    [filtered, currentPage, pageSize]
  )

  const isEmpty = useMemo(
    () => !isLoading && !error && [entity]s.length === 0,
    [isLoading, error, [entity]s.length]
  )

  const isFilteredEmpty = useMemo(
    () => !isLoading && !error && [entity]s.length > 0 && filtered.length === 0,
    [isLoading, error, [entity]s.length, filtered.length]
  )

  // ── 4. Data fetching ──────────────────────────────────────────
  const fetch[Entity]s = useCallback(async () => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setIsLoading(true)
    setError(null)

    const { data, error: fetchError } = await [entity]Service.fetchAll({
      signal: abortRef.current.signal,
    })

    if (fetchError) {
      if (fetchError !== 'AbortError') {
        setError(fetchError)
        addToast('Failed to load [entity]s. Please try again.', 'error')
      }
    } else {
      set[Entity]s(data)
    }
    setIsLoading(false)
  }, [addToast])

  useEffect(() => {
    fetch[Entity]s()
    return () => abortRef.current?.abort()
  }, [fetch[Entity]s])

  // ── 5. CRUD with optimistic updates ──────────────────────────
  const create[Entity] = useCallback(async (payload) => {
    const tempId = `temp-${Date.now()}`
    const optimistic = { ...payload, id: tempId, createdAt: new Date().toISOString() }
    set[Entity]s(prev => [optimistic, ...prev])

    const { data, error: err } = await [entity]Service.create(payload)
    if (err) {
      set[Entity]s(prev => prev.filter(i => i.id !== tempId))
      addToast(`Failed to create [entity]: ${err}`, 'error')
      return { success: false, error: err }
    }
    set[Entity]s(prev => prev.map(i => i.id === tempId ? data : i))
    addToast(`"${data.name}" created`, 'success')
    return { success: true, data }
  }, [addToast])

  const update[Entity] = useCallback(async (id, payload) => {
    const original = [entity]s.find(i => i.id === id)
    if (!original) return { success: false, error: '[Entity] not found' }

    set[Entity]s(prev => prev.map(i => i.id === id ? { ...i, ...payload } : i))
    const { data, error: err } = await [entity]Service.update(id, payload)
    if (err) {
      set[Entity]s(prev => prev.map(i => i.id === id ? original : i))
      addToast(`Failed to update [entity]: ${err}`, 'error')
      return { success: false, error: err }
    }
    set[Entity]s(prev => prev.map(i => i.id === id ? data : i))
    addToast(`"${data.name}" updated`, 'success')
    return { success: true, data }
  }, [[entity]s, addToast])

  const delete[Entity] = useCallback(async (id) => {
    const item = [entity]s.find(i => i.id === id)
    if (!item) return { success: false, error: '[Entity] not found' }

    set[Entity]s(prev => prev.filter(i => i.id !== id))
    const { error: err } = await [entity]Service.delete(id)
    if (err) {
      set[Entity]s(prev => [...prev, item])
      addToast(`Failed to delete [entity]: ${err}`, 'error')
      return { success: false, error: err }
    }
    addToast(`"${item.name}" deleted`, 'success')
    return { success: true }
  }, [[entity]s, addToast])

  // ── 6. UI handlers ────────────────────────────────────────────
  const handleSearch = useCallback((value) => {
    setQuery(value)
    setCurrentPage(1)
  }, [])

  const handleSort = useCallback((key) => {
    setSortDir(prev => sortKey === key ? (prev === 'asc' ? 'desc' : 'asc') : 'desc')
    setSortKey(key)
    setCurrentPage(1)
  }, [sortKey])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  // ── 7. Return plain object ────────────────────────────────────
  return {
    [entity]s: paginated.items,
    isLoading,
    error,
    isEmpty,
    isFilteredEmpty,
    query,
    sortKey,
    sortDir,
    pagination: {
      currentPage,
      totalPages: paginated.totalPages,
      totalItems: filtered.length,
      pageSize,
    },
    create[Entity],
    update[Entity],
    delete[Entity],
    refetch: fetch[Entity]s,
    handleSearch,
    handleSort,
    handlePageChange,
  }
}

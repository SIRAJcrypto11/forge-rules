/**
 * CONTEXT TEMPLATE — Forge Rules v2.2.0
 * Copy this file, rename it, and fill in the blanks.
 *
 * File: src/context/[Name]Context.jsx
 * Rules:
 *   - Separate context per concern (never one giant AppContext)
 *   - Context value MUST be memoized (useMemo) to prevent re-renders
 *   - Split read/write contexts for heavy consumers
 *   - Always provide a custom hook (use[Name]) — never use useContext directly
 *   - Throw clear error if used outside provider
 */

import { createContext, useContext, useState, useCallback, useMemo } from 'react'

// ─────────────────────────────────────────────────────────────
// Context creation
// Split into State + Actions for optimal re-render performance:
//   - Components that only READ don't re-render when actions change
//   - Components that only DISPATCH don't re-render when state changes
// ─────────────────────────────────────────────────────────────
const [Name]StateContext  = createContext(null)
const [Name]ActionsContext = createContext(null)

// ─────────────────────────────────────────────────────────────
// Provider component
// ─────────────────────────────────────────────────────────────

/**
 * [Name]Provider — wraps the app (or subtree) that needs [Name] state.
 * Place in App.jsx alongside other providers.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function [Name]Provider({ children }) {
  // ── State ──────────────────────────────────────────────────
  // [TEMPLATE] Replace with actual state
  const [value, setValue] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // ── Actions (memoized to prevent re-renders) ───────────────
  // [TEMPLATE] Replace with actual actions
  const doSomething = useCallback(async (payload) => {
    setIsLoading(true)
    setError(null)
    try {
      // [TEMPLATE] Implement action
      setValue(payload)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setValue(null)
    setError(null)
  }, [])

  // ── Memoized context values ────────────────────────────────
  // CRITICAL: Always memoize. Without this, every render of the
  // provider causes ALL consumers to re-render.
  const stateValue = useMemo(() => ({
    value,
    isLoading,
    error,
    // [TEMPLATE] Add derived values here
    hasValue: value !== null,
  }), [value, isLoading, error])

  const actionsValue = useMemo(() => ({
    doSomething,
    reset,
    // [TEMPLATE] Add more actions here
  }), [doSomething, reset])

  return (
    <[Name]StateContext.Provider value={stateValue}>
      <[Name]ActionsContext.Provider value={actionsValue}>
        {children}
      </[Name]ActionsContext.Provider>
    </[Name]StateContext.Provider>
  )
}

// ─────────────────────────────────────────────────────────────
// Custom hooks — ALWAYS use these, never useContext directly
// ─────────────────────────────────────────────────────────────

/**
 * Access [Name] state (value, isLoading, error, derived values).
 * Use in components that need to READ [Name] data.
 *
 * @returns {{ value, isLoading, error, hasValue }}
 * @throws {Error} If used outside [Name]Provider
 */
export function use[Name]() {
  const context = useContext([Name]StateContext)
  if (context === null) {
    throw new Error('use[Name] must be used within a [Name]Provider')
  }
  return context
}

/**
 * Access [Name] actions (doSomething, reset).
 * Use in components that need to DISPATCH [Name] actions.
 * These components won't re-render when state changes.
 *
 * @returns {{ doSomething, reset }}
 * @throws {Error} If used outside [Name]Provider
 */
export function use[Name]Actions() {
  const context = useContext([Name]ActionsContext)
  if (context === null) {
    throw new Error('use[Name]Actions must be used within a [Name]Provider')
  }
  return context
}

// ─────────────────────────────────────────────────────────────
// Usage example (delete this section after reading)
// ─────────────────────────────────────────────────────────────
//
// In App.jsx:
//   <[Name]Provider>
//     <App />
//   </[Name]Provider>
//
// In a component that reads:
//   const { value, isLoading } = use[Name]()
//
// In a component that writes:
//   const { doSomething } = use[Name]Actions()
//
// In a component that does both:
//   const { value } = use[Name]()
//   const { doSomething } = use[Name]Actions()

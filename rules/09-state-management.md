# Chapter 9 — State Management Laws

> Use the lowest level of state that works.  
> Every level up adds complexity. Complexity is debt.  
> If it can be computed, it must be computed — never stored.

---

## 9.1 — State Hierarchy

```
Level 1 → LOCAL (useState)
Level 2 → DERIVED (useMemo)
Level 3 → MODULE (custom hook)
Level 4 → CROSS-MODULE (React Context)
Level 5 → SERVER (React Query / SWR)
```

**Decision rule:** Start at Level 1. Only move up when Level 1 is insufficient.

---

## Level 1 — LOCAL STATE (`useState`)

**For:** UI state, toggles, form inputs, current tab, hover state, open/closed.  
**Rule:** Default choice. Start here always.  
**Rule:** If only ONE component needs it → it stays local.

```js
// ✅ Correct use of local state
const [isOpen, setIsOpen] = useState(false)
const [activeTab, setActiveTab] = useState('overview')
const [hoveredId, setHoveredId] = useState(null)
const [inputValue, setInputValue] = useState('')

// ❌ WRONG: Storing derived data in local state
const [filteredItems, setFilteredItems] = useState(items)  // Use useMemo instead
const [totalPrice, setTotalPrice] = useState(0)            // Use useMemo instead
const [isAdmin, setIsAdmin] = useState(false)              // Derive from user.role
```

---

## Level 2 — DERIVED STATE (`useMemo`)

**For:** Any value that can be computed from existing state or props.  
**Rule:** NEVER store derived data in `useState`.  
**Rule:** If it can be computed, it MUST be computed via `useMemo`.

```js
// ✅ CORRECT: Derived data via useMemo
const filteredProducts = useMemo(
  () => products.filter(p => p.status === 'active'),
  [products]
)

const totalRevenue = useMemo(
  () => orders.reduce((sum, o) => sum + o.amount, 0),
  [orders]
)

const isAdmin = user?.role === 'admin'  // Simple derivation — no useMemo needed

const sortedItems = useMemo(
  () => [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  [items]
)

// ❌ WRONG: Storing derived data in useState
const [filteredProducts, setFilteredProducts] = useState([])
useEffect(() => {
  setFilteredProducts(products.filter(p => p.status === 'active'))
}, [products])
// This creates: extra state, extra effect, potential stale data, extra re-renders
```

**When NOT to use useMemo:**
```js
// ❌ DON'T: Simple string concatenation
const fullName = useMemo(() => `${first} ${last}`, [first, last])
// Just do: const fullName = `${first} ${last}`

// ❌ DON'T: Boolean derivation
const isEmpty = useMemo(() => items.length === 0, [items])
// Just do: const isEmpty = items.length === 0

// ❌ DON'T: Primitive values
const count = useMemo(() => items.length, [items])
// Just do: const count = items.length
```

---

## Level 3 — MODULE STATE (Custom Hook)

**For:** State shared between 2+ components within the SAME feature module.  
**Rule:** The Page component calls the hook. Children receive data as props only.  
**Rule:** Never pass the hook itself as a prop — pass the data.

```js
// ✅ CORRECT: Page calls hook, passes data down as props
function InventoryPage() {
  const {
    products,
    isLoading,
    error,
    handleSearch,
    handleDelete,
    createProduct,
  } = useInventory()

  return (
    <PageContainer>
      <FilterBar onSearch={handleSearch} />
      <ProductList
        products={products}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
      />
    </PageContainer>
  )
}

// ❌ WRONG: Child component calls hook directly
function ProductList() {
  const { products } = useInventory()  // Violates Law #2 — creates hidden dependency
  return <table>...</table>
}

// ❌ WRONG: Passing hook as prop
function InventoryPage() {
  const inventoryHook = useInventory()
  return <ProductList hook={inventoryHook} />  // Leaks implementation detail
}
```

---

## Level 4 — CROSS-MODULE STATE (React Context)

**For:** Auth, theme, notifications, global user preferences, app-wide settings.  
**Rule:** Separate context per concern. Never one giant AppContext.  
**Rule:** Context value must be memoized to prevent unnecessary re-renders.

```jsx
// ✅ CORRECT: Separate contexts per concern
<AuthProvider>
  <ThemeProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </ThemeProvider>
</AuthProvider>

// ❌ WRONG: One giant context
<AppProvider>  // Contains: user, theme, notifications, cart, settings, ...
  <App />
</AppProvider>

// ✅ CORRECT: Memoized context value
function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = useCallback(async (credentials) => {
    // ...
  }, [])

  const logout = useCallback(() => {
    // ...
  }, [])

  // ✅ Memoize the context value to prevent re-renders
  const value = useMemo(() => ({
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    hasPermission: (permission) => user?.permissions?.includes(permission) ?? false,
  }), [user, isLoading, login, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ✅ CORRECT: Context split by read/write to optimize re-renders
const AuthStateContext = createContext(null)    // Read: user, isLoading
const AuthActionsContext = createContext(null)  // Write: login, logout

// Components that only need to read don't re-render when actions change
```

**Required contexts (every app):**
```
AuthContext:         user, isLoading, login, logout, hasPermission
ThemeContext:        theme, isDark, toggleTheme, setTheme
NotificationContext: addToast, removeToast, toasts
```

---

## Level 5 — SERVER STATE (React Query / SWR)

**For:** Remote data that needs caching, background sync, refetch on focus.  
**Rule:** Use React Query for ALL server state. Replaces useEffect + fetch + useState.  
**Rule:** Never duplicate server state in local state.

```js
// ✅ CORRECT: React Query for server state
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function useProducts(filters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.fetchAll(filters),
    staleTime: 5 * 60 * 1000,  // 5 minutes
    gcTime: 10 * 60 * 1000,    // 10 minutes
  })
}

function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => productService.create(payload),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => {
      addToast(`Failed to create product: ${error.message}`, 'error')
    },
  })
}

// ❌ WRONG: Manual server state management
function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    productService.fetchAll()
      .then(({ data }) => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  return { products, isLoading, error }
  // Missing: caching, background refetch, stale data handling, deduplication
}
```

---

## 9.2 — State Anti-Patterns (Forbidden)

```
✗ REDUX without justification
  → React Context + hooks is sufficient for 95% of apps
  → Only use Redux for: complex undo/redo, time-travel debugging, very large teams

✗ PROP DRILLING more than 3 levels
  → A → B → C → D passing the same prop = move to Context or hook

✗ DUPLICATE STATE (same data in 2 useStates)
  → If two states always change together: merge them
  → If one derives from the other: use useMemo

✗ STORING DERIVED DATA in state
  → If it can be computed from other state: use useMemo
  → Never: const [total, setTotal] = useState(items.reduce(...))

✗ SYNCING STATE with useEffect
  → If you're using useEffect to sync one state to another: use useMemo
  → useEffect is for side effects (API calls, subscriptions, DOM), not derivations

✗ STALE CLOSURES in handlers
  → Always include all dependencies in useCallback/useMemo
  → Use the ESLint exhaustive-deps rule

✗ GLOBAL STATE for local concerns
  → Don't put "which modal is open" in global context
  → Don't put "current tab" in global context
  → These are local UI state — keep them local
```

---

## 9.3 — State Colocation Rule

**State should live as close to where it's used as possible.**

```
QUESTION: "Who needs this state?"

Only one component → useState in that component
Multiple components in same feature → custom hook in that feature
Multiple features → React Context
Server data → React Query
```

**Lifting state up (when to do it):**
```js
// BEFORE: State in child (can't share)
function ProductList() {
  const [selectedId, setSelectedId] = useState(null)
  // Only ProductList knows about selectedId
}

// AFTER: State lifted to parent (can share with siblings)
function InventoryPage() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <ProductList
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ProductDetail
        productId={selectedId}  // Sibling can now access it
      />
    </>
  )
}
```

---

## 9.4 — Form State Pattern

**Rule: Use a dedicated form hook. Never manage form state manually in components.**

```js
// src/hooks/useForm.js — reusable form state management

export function useForm(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Derived state
  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initialValues),
    [values, initialValues]
  )

  const isValid = useMemo(
    () => Object.keys(errors).length === 0,
    [errors]
  )

  const handleChange = useCallback((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts correcting
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }, [errors])

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    // Validate on blur
    if (validationRules[field]) {
      const error = validationRules[field](values[field], values)
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }))
      }
    }
  }, [values, validationRules])

  const handleSubmit = useCallback(async (onSubmit) => {
    // Validate all fields
    const newErrors = {}
    Object.keys(validationRules).forEach(field => {
      const error = validationRules[field](values[field], values)
      if (error) newErrors[field] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(Object.keys(validationRules).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {}))
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validationRules])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  }
}
```

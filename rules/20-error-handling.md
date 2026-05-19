# Chapter 20 — Error Handling Patterns

> Errors are not exceptions. They are expected outcomes.  
> Every function that can fail WILL fail. Design for it.  
> The question is not "will this error?" but "what happens when it does?"

---

## 20.1 — Error Handling Philosophy

**Three categories of errors:**

```
1. EXPECTED ERRORS (handle gracefully)
   → Network failures, validation errors, not found, unauthorized
   → User sees a helpful message and can take action
   → Log at INFO level

2. UNEXPECTED ERRORS (catch and recover)
   → Null pointer, type errors, logic bugs
   → User sees a generic error message
   → Log at ERROR level with full context

3. FATAL ERRORS (crash and restart)
   → Out of memory, corrupted state, unrecoverable
   → App restarts cleanly
   → Log at FATAL level, alert on-call
```

**The golden rule:** Every error the user caused must be visible to the user. Every error the system caused must be logged internally. Never expose internal details to users.

---

## 20.2 — Service Layer Error Handling

**Rule: Services return `{ data, error }`. They NEVER throw.**

```javascript
// src/services/api.service.js

/**
 * Standard service response shape.
 * ALWAYS return this shape — never throw from services.
 *
 * @typedef {{ data: T | null, error: string | null, status: number | null }} ServiceResponse
 */

async function request(endpoint, options = {}, retryCount = 0) {
  const controller = new AbortController()
  const timeoutId = setTimeout(
    () => controller.abort(),
    Number(import.meta.env.VITE_API_TIMEOUT) || 10000
  )

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    // Parse response body
    const body = await response.json().catch(() => null)

    // HTTP errors are NOT exceptions — handle them explicitly
    if (!response.ok) {
      return {
        data: null,
        error: body?.error ?? `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
      }
    }

    return { data: body?.data ?? body, error: null, status: response.status }

  } catch (err) {
    clearTimeout(timeoutId)

    // AbortError = timeout or manual cancel — not a real error
    if (err.name === 'AbortError') {
      return { data: null, error: 'Request timed out. Please try again.', status: null }
    }

    // Network error (offline, DNS failure, etc.)
    if (!navigator.onLine) {
      return { data: null, error: 'No internet connection. Check your network and try again.', status: null }
    }

    // Retry on network errors (not on 4xx/5xx — those are handled above)
    if (retryCount < MAX_RETRIES) {
      await delay(Math.pow(2, retryCount) * 1000) // exponential backoff: 1s, 2s, 4s
      return request(endpoint, options, retryCount + 1)
    }

    // Log unexpected errors internally
    console.error('[API Error]', { endpoint, error: err.message, retryCount })

    return { data: null, error: 'Connection failed. Please try again.', status: null }
  }
}
```

---

## 20.3 — Hook Layer Error Handling

**Rule: Hooks catch service errors and translate them to UI state.**

```javascript
// Pattern: error state + toast + optimistic revert

const createProduct = useCallback(async (payload) => {
  // 1. Optimistic update
  const tempId = `temp-${Date.now()}`
  setProducts(prev => [{ ...payload, id: tempId }, ...prev])

  // 2. API call
  const { data, error, status } = await productService.create(payload)

  if (error) {
    // 3a. Revert optimistic update
    setProducts(prev => prev.filter(p => p.id !== tempId))

    // 3b. Translate error to user-friendly message
    const userMessage = translateError(error, status)
    addToast(userMessage, 'error')

    // 3c. Return error for caller to handle if needed
    return { success: false, error: userMessage }
  }

  // 4. Success: replace temp with real data
  setProducts(prev => prev.map(p => p.id === tempId ? data : p))
  addToast(`"${data.name}" created`, 'success')
  return { success: true, data }
}, [addToast])

/**
 * Translates API errors to user-friendly messages.
 * Maps HTTP status codes and error strings to actionable messages.
 */
function translateError(error, status) {
  // Status-based translations
  const statusMessages = {
    400: 'Please check your input and try again.',
    401: 'Your session has expired. Please log in again.',
    403: "You don't have permission to do this.",
    404: 'This item no longer exists.',
    409: 'This item already exists. Try a different name.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'Server error. Our team has been notified.',
    503: 'Service temporarily unavailable. Please try again in a few minutes.',
  }

  if (status && statusMessages[status]) {
    return statusMessages[status]
  }

  // String-based translations for known error messages
  if (error?.includes('timeout') || error?.includes('timed out')) {
    return 'Request timed out. Check your connection and try again.'
  }
  if (error?.includes('network') || error?.includes('connection')) {
    return 'Connection failed. Check your internet and try again.'
  }
  if (error?.includes('already exists') || error?.includes('duplicate')) {
    return 'This item already exists.'
  }

  // Fallback: use the error message if it's user-friendly, otherwise generic
  return error?.length < 100 ? error : 'Something went wrong. Please try again.'
}
```

---

## 20.4 — Component Layer Error Handling

**Rule: Components display errors. They never handle them.**

```jsx
// ✅ CORRECT: Component displays error state, doesn't handle it
function ProductList({ products, isLoading, error, onRetry }) {
  if (error) {
    return (
      <ErrorState
        message={error}  // Already translated by hook
        onRetry={onRetry}
      />
    )
  }
  // ...
}

// ❌ WRONG: Component handling errors
function ProductList({ products }) {
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .catch(err => setError(err.message))  // Component shouldn't fetch
  }, [])
}
```

**Error Boundary (catches unexpected render errors):**

```jsx
// src/components/shared/ErrorBoundary.jsx
import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log to error tracking (Sentry, etc.)
    console.error('[ErrorBoundary]', error, errorInfo)
    // In production: Sentry.captureException(error, { extra: errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center py-16 text-center" role="alert">
          <h2 className="text-h3 text-text-1 mb-2">Something went wrong</h2>
          <p className="text-body text-text-2 mb-6">
            An unexpected error occurred. Please refresh the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-secondary"
          >
            Refresh page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Usage: wrap each feature module
<ErrorBoundary fallback={<FeatureErrorFallback />}>
  <InventoryPage />
</ErrorBoundary>
```

---

## 20.5 — Form Error Handling

**Rule: Form errors are inline, specific, and actionable.**

```jsx
// ✅ CORRECT: Inline errors with specific messages
function ProductForm({ onSubmit }) {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useForm(
    INITIAL_VALUES,
    VALIDATION_RULES
  )

  const handleFormSubmit = async () => {
    const result = await handleSubmit(onSubmit)
    if (!result.success) {
      // API-level errors (e.g., SKU already exists)
      // These come back from the hook, not from validation
      // The hook already showed a toast — no additional action needed
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit() }}>
      <Input
        id="sku"
        label="SKU"
        value={values.sku}
        onChange={(e) => handleChange('sku', e.target.value)}
        onBlur={() => handleBlur('sku')}
        error={touched.sku ? errors.sku : undefined}
        // ✅ Error only shown after user has touched the field
      />

      {/* Submit button shows loading state, never double-submits */}
      <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
        Save Product
      </Button>
    </form>
  )
}
```

**Validation error message quality:**

```javascript
// src/utils/validators.js

// ✅ CORRECT: Specific, actionable error messages
export const VALIDATION_RULES = {
  email: (value) => {
    if (!value) return 'Email address is required'
    if (!value.includes('@')) return 'Email must include an @ symbol'
    if (!value.includes('.')) return 'Email must include a domain (e.g., .com)'
    if (value.length > 254) return 'Email address is too long'
    return null
  },

  password: (value) => {
    if (!value) return 'Password is required'
    if (value.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(value)) return 'Password must include at least one uppercase letter'
    if (!/[0-9]/.test(value)) return 'Password must include at least one number'
    return null
  },

  price: (value) => {
    if (value === '' || value === null || value === undefined) return 'Price is required'
    const num = Number(value)
    if (isNaN(num)) return 'Price must be a number'
    if (num < 0) return 'Price cannot be negative'
    if (!Number.isInteger(num)) return 'Price must be a whole number (no decimals)'
    return null
  },
}

// ❌ BAD: Vague, non-actionable error messages
export const BAD_RULES = {
  email: (value) => !value ? 'Required' : !value.includes('@') ? 'Invalid' : null,
  password: (value) => value.length < 8 ? 'Too short' : null,
}
```

---

## 20.6 — Global Error Handling

**Rule: Every unhandled error must be caught at the app level.**

```jsx
// src/main.jsx

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Promise Rejection]', event.reason)
  // In production: Sentry.captureException(event.reason)
  event.preventDefault() // Prevent default browser error logging
})

// Catch uncaught errors
window.addEventListener('error', (event) => {
  console.error('[Uncaught Error]', event.error)
  // In production: Sentry.captureException(event.error)
})

// React error boundary at app root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
```

---

## 20.7 — Error Logging Standards

```javascript
// What to log (internal, never shown to user):
console.error('[Context]', {
  message: error.message,
  stack: error.stack,
  userId: currentUser?.id,        // ID only, never email/name
  endpoint: '/api/products',
  payload: sanitizePayload(payload), // Remove sensitive fields
  timestamp: new Date().toISOString(),
  environment: import.meta.env.MODE,
})

// What NOT to log:
// ✗ Passwords, tokens, API keys
// ✗ Full user PII (email, phone, address)
// ✗ Credit card numbers
// ✗ Session tokens

// Sanitize before logging:
function sanitizePayload(payload) {
  const sensitive = ['password', 'token', 'secret', 'key', 'card', 'cvv']
  return Object.fromEntries(
    Object.entries(payload ?? {}).map(([k, v]) =>
      sensitive.some(s => k.toLowerCase().includes(s))
        ? [k, '[REDACTED]']
        : [k, v]
    )
  )
}
```

---

## 20.8 — Error Handling Checklist

```
□ Services return { data, error } — never throw
□ All API errors translated to user-friendly messages
□ Optimistic updates have revert logic on error
□ Form validation errors are inline and specific
□ Error Boundary wraps each feature module
□ Global unhandledrejection handler configured
□ Error tracking (Sentry) configured for production
□ Sensitive data redacted from logs
□ No stack traces exposed to users
□ Every error state has a retry action
□ Network errors distinguished from server errors
□ Timeout errors have specific message
□ 401 errors redirect to login
□ 403 errors show permission denied (not 404)
```

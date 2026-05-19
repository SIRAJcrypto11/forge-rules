# Chapter 13 — Security Laws

> Security is not a feature. It is a baseline requirement.  
> Every rule here prevents a real attack that has happened to real applications.

---

## Security Priority

Security violations are **immediate blockers**. No code ships with a known security violation.

```
CRITICAL  → Fix before any other work. Block the PR.
HIGH      → Fix in the same sprint.
MEDIUM    → Fix within 2 sprints.
LOW       → Fix in next maintenance window.
```

---

## 13.1 — Environment Variables

**Rule: API keys, secrets, and credentials NEVER appear in client-side code.**

```js
// ❌ CRITICAL VIOLATION — hardcoded secret
const API_KEY = 'sk-prod-abc123xyz789'
const DB_PASSWORD = 'mypassword123'

// ✅ CORRECT — from environment variables
const API_KEY = import.meta.env.VITE_API_KEY
```

**Rules:**
- All secrets in `.env` files (never committed to git)
- `.env.example` committed with structure but no values
- `.env` in `.gitignore` — always, no exceptions
- Validate required env vars on app startup

**Startup validation:**
```js
// src/config/env.js
// Run this before anything else in main.jsx

const REQUIRED_ENV_VARS = [
  'VITE_API_BASE_URL',
  'VITE_AUTH_DOMAIN',
  'VITE_AUTH_CLIENT_ID'
]

export function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter(
    key => !import.meta.env[key]
  )

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(k => `  - ${k}`).join('\n')}\n` +
      `Copy .env.example to .env and fill in the values.`
    )
  }
}
```

---

## 13.2 — XSS (Cross-Site Scripting) Prevention

**Rule: Never use `dangerouslySetInnerHTML` without sanitization.**

```jsx
// ❌ CRITICAL VIOLATION — raw HTML injection
function UserBio({ bio }) {
  return <div dangerouslySetInnerHTML={{ __html: bio }} />
}

// ✅ CORRECT — sanitize before rendering
import DOMPurify from 'dompurify'

function UserBio({ bio }) {
  const sanitized = DOMPurify.sanitize(bio, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target']
  })
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}

// ✅ BEST — avoid dangerouslySetInnerHTML entirely
function UserBio({ bio }) {
  return <p>{bio}</p>  // React escapes this automatically
}
```

**React's built-in XSS protection:**
- React automatically escapes all string values in JSX
- `{userInput}` is safe — React converts `<script>` to `&lt;script&gt;`
- Only `dangerouslySetInnerHTML` bypasses this protection

**URL sanitization:**
```js
// ❌ VIOLATION — user-controlled href
function UserLink({ url }) {
  return <a href={url}>Visit</a>  // javascript: protocol attack
}

// ✅ CORRECT — validate URL protocol
function sanitizeUrl(url) {
  if (!url) return '#'
  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) return '#'
    return url
  } catch {
    return '#'
  }
}

function UserLink({ url }) {
  return <a href={sanitizeUrl(url)} rel="noopener noreferrer" target="_blank">Visit</a>
}
```

---

## 13.3 — Input Validation & Sanitization

**Rule: Validate ALL user input before processing or displaying.**

```js
// src/utils/validators.js

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' }
  }
  const trimmed = email.trim()
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email is too long' }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Enter a valid email address' }
  }
  return { valid: true, error: null }
}

/**
 * Sanitizes a string for safe display (strips HTML tags).
 * @param {string} input
 * @param {number} [maxLength=500]
 * @returns {string}
 */
export function sanitizeString(input, maxLength = 500) {
  if (!input || typeof input !== 'string') return ''
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '')  // Remove angle brackets
}

/**
 * Validates a numeric input within bounds.
 * @param {any} value
 * @param {Object} options
 * @param {number} [options.min=0]
 * @param {number} [options.max=Infinity]
 * @returns {{ valid: boolean, value: number|null, error: string|null }}
 */
export function validateNumber(value, { min = 0, max = Infinity } = {}) {
  const num = Number(value)
  if (isNaN(num)) return { valid: false, value: null, error: 'Must be a number' }
  if (num < min) return { valid: false, value: null, error: `Minimum value is ${min}` }
  if (num > max) return { valid: false, value: null, error: `Maximum value is ${max}` }
  return { valid: true, value: num, error: null }
}
```

---

## 13.4 — Authentication & Authorization

**Rule: Never trust the client. Always verify on the server.**  
**Rule: Never store sensitive data in localStorage.**

```js
// ❌ VIOLATION — sensitive data in localStorage
localStorage.setItem('user_password', password)
localStorage.setItem('credit_card', cardNumber)
localStorage.setItem('ssn', socialSecurityNumber)

// ✅ CORRECT — only store non-sensitive session data
localStorage.setItem('theme', 'dark')
localStorage.setItem('sidebar_collapsed', 'true')
localStorage.setItem('last_visited_page', '/dashboard')

// Auth tokens: use httpOnly cookies (server-managed)
// If you MUST use localStorage for tokens, accept the XSS risk
// and implement token rotation + short expiry
```

**Route protection:**
```jsx
// src/components/shared/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/config/routes'

export function ProtectedRoute({ children, requiredRole = null }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <PageSkeleton />

  if (!user) {
    // Preserve intended destination for post-login redirect
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />
  }

  return children
}
```

**Permission checking:**
```js
// src/utils/permissions.js
import { PERMISSIONS } from '@/config/permissions'

/**
 * Checks if a user has a specific permission.
 * @param {Object} user - Current user object
 * @param {string} permission - Permission key from PERMISSIONS config
 * @returns {boolean}
 */
export function hasPermission(user, permission) {
  if (!user || !user.roles) return false
  return user.roles.some(role =>
    PERMISSIONS[role]?.includes(permission)
  )
}

// Usage in components:
// if (!hasPermission(user, 'inventory:delete')) return null
```

---

## 13.5 — CSRF Protection

**Rule: Include CSRF tokens in all state-changing requests.**

```js
// src/services/api.service.js
// CSRF token is set by the server in a cookie
// We read it and include it in request headers

function getCsrfToken() {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('csrf-token='))
    ?.split('=')[1]
}

async function request(endpoint, options = {}) {
  const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(
    options.method?.toUpperCase()
  )

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(isStateChanging && { 'X-CSRF-Token': getCsrfToken() }),
      ...options.headers
    },
    credentials: 'include'  // Include cookies
  })
}
```

---

## 13.6 — Dependency Security

**Rule: Pin exact dependency versions. Audit regularly.**

```json
// package.json — use exact versions, not ranges
{
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-router-dom": "6.26.0"
  }
}
```

**Regular audit commands:**
```bash
# Check for known vulnerabilities
npm audit

# Fix automatically where safe
npm audit fix

# Check for outdated packages
npm outdated
```

**Rules:**
- Run `npm audit` before every release
- No packages with CRITICAL or HIGH severity vulnerabilities in production
- Review `npm audit` output in CI/CD pipeline
- Update dependencies monthly (not daily — stability matters)

---

## 13.7 — Sensitive Data Handling

**Rule: Never log sensitive data.**

```js
// ❌ VIOLATION — logging sensitive data
console.log('User logged in:', { email, password, token })
console.log('Payment processed:', { cardNumber, cvv })

// ✅ CORRECT — log only safe identifiers
console.log('User logged in:', { userId: user.id, email: maskEmail(user.email) })
console.log('Payment processed:', { orderId, last4: card.last4 })

// Mask email for logs: user@example.com → u***@example.com
function maskEmail(email) {
  const [local, domain] = email.split('@')
  return `${local[0]}***@${domain}`
}
```

**Rule: Remove all `console.log` before production.**

```js
// eslint.config.js — enforce no console in production
rules: {
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
}
```

---

## 13.8 — Content Security Policy

Add to your server/hosting configuration:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.yourdomain.com;
  frame-ancestors 'none';
```

---

## 13.9 — Security Checklist (Pre-Launch)

```
□ No hardcoded API keys, passwords, or secrets in code
□ .env is in .gitignore and never committed
□ .env.example is committed with all keys documented
□ All user inputs are validated before processing
□ dangerouslySetInnerHTML is sanitized with DOMPurify
□ All external URLs are validated for safe protocols
□ Auth tokens are not stored in localStorage (use httpOnly cookies)
□ Protected routes redirect unauthenticated users
□ CSRF tokens included in state-changing requests
□ npm audit shows no CRITICAL or HIGH vulnerabilities
□ No console.log statements in production build
□ Content Security Policy headers configured
□ All API calls use HTTPS only
□ Sensitive data is masked in logs
```

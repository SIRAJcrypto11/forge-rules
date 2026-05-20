# Chapter 24 — Monitoring & Observability

> You cannot improve what you cannot measure.  
> You cannot fix what you cannot see.  
> Monitoring is not optional — it is the difference between  
> knowing about a problem before your users do, or after.

---

## 24.1 — Observability Pillars

```
THREE PILLARS:

1. LOGS    → What happened? (events, errors, user actions)
2. METRICS → How is the system performing? (response time, error rate, uptime)
3. TRACES  → Why did it happen? (request flow, bottlenecks)

For frontend applications, focus on:
  - Error tracking (Sentry) → Logs + Traces
  - Performance monitoring (Web Vitals) → Metrics
  - Uptime monitoring → Metrics
  - User analytics (optional) → Metrics
```

---

## 24.2 — Error Tracking (Sentry)

```javascript
// src/monitoring/sentry.js

import * as Sentry from '@sentry/react'

export function initSentry() {
  if (!import.meta.env.VITE_SENTRY_DSN || import.meta.env.DEV) return

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    release: `${import.meta.env.VITE_APP_NAME}@${import.meta.env.VITE_APP_VERSION}`,

    // Performance monitoring
    tracesSampleRate: 0.1,        // 10% of transactions
    profilesSampleRate: 0.1,      // 10% of sampled transactions

    // Session replay (for debugging)
    replaysSessionSampleRate: 0.01,  // 1% of sessions
    replaysOnErrorSampleRate: 1.0,   // 100% of sessions with errors

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,      // Mask all text (privacy)
        blockAllMedia: true,    // Block all media (privacy)
      }),
    ],

    // Privacy: never send PII
    beforeSend(event) {
      // Remove user email from events
      if (event.user) {
        delete event.user.email
        delete event.user.ip_address
        // Keep user.id for debugging (not PII)
      }

      // Remove sensitive request data
      if (event.request?.data) {
        event.request.data = sanitizeForLogging(event.request.data)
      }

      return event
    },

    // Ignore known non-errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured',
      /^Network Error$/,
      /^Request aborted$/,
    ],
  })
}

// Set user context after login
export function setSentryUser(user) {
  Sentry.setUser(user ? { id: user.id } : null)  // ID only, no PII
}

// Capture custom events
export function captureEvent(name, data = {}) {
  Sentry.addBreadcrumb({
    category: 'user-action',
    message: name,
    data: sanitizeForLogging(data),
    level: 'info',
  })
}

// Sanitize sensitive fields before logging
function sanitizeForLogging(data) {
  if (!data || typeof data !== 'object') return data
  const SENSITIVE = ['password', 'token', 'secret', 'key', 'card', 'cvv', 'pin']
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) =>
      SENSITIVE.some(s => k.toLowerCase().includes(s))
        ? [k, '[REDACTED]']
        : [k, v]
    )
  )
}
```

---

## 24.3 — Performance Monitoring (Web Vitals)

```javascript
// src/monitoring/vitals.js

import { onCLS, onFCP, onFID, onLCP, onTTFB, onINP } from 'web-vitals'

const THRESHOLDS = {
  CLS:  { good: 0.1,  poor: 0.25  },
  FCP:  { good: 1800, poor: 3000  },  // ms
  FID:  { good: 100,  poor: 300   },  // ms
  LCP:  { good: 2500, poor: 4000  },  // ms
  TTFB: { good: 800,  poor: 1800  },  // ms
  INP:  { good: 200,  poor: 500   },  // ms
}

function getRating(name, value) {
  const threshold = THRESHOLDS[name]
  if (!threshold) return 'unknown'
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function reportVital(metric) {
  const rating = getRating(metric.name, metric.value)

  // Log to console in development
  if (import.meta.env.DEV) {
    const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌'
    console.log(`${emoji} ${metric.name}: ${Math.round(metric.value)}ms (${rating})`)
  }

  // Send to analytics in production
  if (import.meta.env.PROD) {
    // Option 1: Send to your own analytics endpoint
    fetch('/api/vitals', {
      method: 'POST',
      body: JSON.stringify({
        name:   metric.name,
        value:  metric.value,
        rating,
        id:     metric.id,
        page:   window.location.pathname,
      }),
      keepalive: true,  // Ensures request completes even if page unloads
    }).catch(() => {})  // Silent fail — don't break the app for analytics

    // Option 2: Send to Sentry
    // Sentry.captureMessage(`Web Vital: ${metric.name}`, {
    //   level: rating === 'poor' ? 'warning' : 'info',
    //   extra: { value: metric.value, rating },
    // })
  }
}

export function initVitalsMonitoring() {
  onCLS(reportVital)
  onFCP(reportVital)
  onFID(reportVital)
  onLCP(reportVital)
  onTTFB(reportVital)
  onINP(reportVital)
}
```

---

## 24.4 — Logging Standards

**What to log:**

```javascript
// ✅ LOG: User actions (for debugging user-reported issues)
captureEvent('product.created', { productId: data.id })
captureEvent('export.triggered', { format: 'csv', count: products.length })
captureEvent('search.performed', { query: query.length > 0 ? '[query]' : '' })

// ✅ LOG: Errors with context
Sentry.captureException(error, {
  extra: {
    endpoint: '/api/products',
    userId: user?.id,
    action: 'createProduct',
  },
})

// ✅ LOG: Performance anomalies
if (loadTime > 3000) {
  Sentry.captureMessage('Slow page load detected', {
    level: 'warning',
    extra: { loadTime, page: window.location.pathname },
  })
}
```

**What NOT to log:**

```javascript
// ❌ NEVER LOG: Passwords, tokens, secrets
console.log('User logged in:', { email, password })  // NEVER

// ❌ NEVER LOG: Full PII
console.log('User data:', user)  // May contain email, phone, address

// ❌ NEVER LOG: Credit card data
console.log('Payment:', { cardNumber, cvv })  // NEVER

// ❌ NEVER LOG: Session tokens
console.log('Auth token:', token)  // NEVER
```

---

## 24.5 — Alert Thresholds

```
CRITICAL (page on-call immediately):
  □ Error rate > 5% in 5 minutes
  □ Uptime < 99% in 1 hour
  □ LCP > 4s on > 20% of page loads
  □ Any new CRITICAL Sentry issue

HIGH (fix within 1 hour):
  □ Error rate > 1% in 15 minutes
  □ LCP > 2.5s on > 10% of page loads
  □ Any new HIGH Sentry issue
  □ Build failure on main branch

MEDIUM (fix within 1 day):
  □ Error rate > 0.5% in 1 hour
  □ CLS > 0.1 on > 5% of page loads
  □ Bundle size increased > 10%

LOW (fix in next sprint):
  □ Any new MEDIUM Sentry issue
  □ Test coverage dropped > 5%
  □ Lighthouse score dropped > 5 points
```

---

## 24.6 — Monitoring Setup Checklist

```
□ Sentry initialized in main.jsx (production only)
□ Sentry DSN in environment variables (not hardcoded)
□ User context set after login (ID only, no PII)
□ PII redacted in beforeSend hook
□ Known non-errors added to ignoreErrors
□ Web Vitals monitoring initialized
□ Uptime monitoring configured (UptimeRobot or equivalent)
□ Alert thresholds configured
□ On-call rotation defined (if team > 1)
□ Incident response runbook documented
□ Error tracking tested: trigger a test error, verify it appears in Sentry
□ Performance monitoring tested: verify vitals are being reported
```

---

## 24.7 — Incident Response

```
WHEN AN ALERT FIRES:

1. ACKNOWLEDGE (< 5 minutes)
   → Acknowledge the alert
   → Post in team channel: "Investigating [alert name]"

2. ASSESS (< 15 minutes)
   → How many users affected?
   → Is it getting worse or stable?
   → Is there a recent deployment that could have caused it?

3. DECIDE (< 5 minutes after assessment)
   → > 10% users affected: ROLLBACK immediately
   → < 10% users affected: HOTFIX (see workflows/hotfix.md)
   → False alarm: CLOSE and document

4. RESOLVE
   → Apply fix or rollback
   → Verify fix in production
   → Monitor for 30 minutes

5. POST-MORTEM (within 24 hours)
   → What happened?
   → Why did it happen?
   → How was it detected?
   → How was it resolved?
   → What will prevent it from happening again?
   → 3 action items (see agents/retro.md format)
```

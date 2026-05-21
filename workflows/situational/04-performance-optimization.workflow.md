# Workflow: Performance Optimization
**ID:** WF-04  
**Trigger Keywords:** slow, performance, speed, optimize, lag, loading, LCP, FCP, TTI, bundle size, memory leak, CPU, render, cache, lighthouse, web vitals  
**Primary Agent:** Performance  
**Support Agents:** Coder, DevOps, Backend  
**Estimated Time:** 1 day – 3 weeks  

---

## Overview

Performance optimization covers frontend rendering speed, backend response times, database queries, bundle sizes, and infrastructure scaling. Always measure before and after — never optimize blindly.

---

## Golden Rule: Measure First, Optimize Second

```
NEVER optimize without:
1. Baseline measurement (current numbers)
2. Profiling (where is the bottleneck?)
3. Hypothesis (what change will help and why?)
4. Target (what number are we aiming for?)
5. Verification (did the change actually help?)
```

---

## Phase 1: Measurement & Profiling

### 1.1 Core Web Vitals Targets
```
Metric          | Good    | Needs Work | Poor
----------------|---------|------------|------
LCP (load)      | < 2.5s  | 2.5–4s     | > 4s
FID/INP (input) | < 100ms | 100–300ms  | > 300ms
CLS (stability) | < 0.1   | 0.1–0.25   | > 0.25
FCP (first paint)| < 1.8s | 1.8–3s     | > 3s
TTFB (server)   | < 800ms | 800ms–1.8s | > 1.8s
TTI (interactive)| < 3.8s | 3.8–7.3s   | > 7.3s
```

### 1.2 Measurement Tools
```bash
# Lighthouse (automated)
npx lighthouse https://yoursite.com --output=json --output-path=./report.json

# WebPageTest (real browser, multiple locations)
# https://www.webpagetest.org

# Chrome DevTools
# Performance tab → Record → Analyze flame chart

# Bundle analyzer
npx webpack-bundle-analyzer stats.json
# or for Vite:
npx vite-bundle-visualizer

# React DevTools Profiler
# Components tab → Profiler → Record interactions
```

### 1.3 Backend Profiling
```bash
# Node.js profiling
node --prof app.js
node --prof-process isolate-*.log > processed.txt

# Database query analysis
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

# API response time monitoring
# Check your APM tool (Datadog, New Relic, Sentry Performance)
```

### 1.4 Create Performance Baseline Report
```
BASELINE REPORT - [Date]
========================
Page: [URL]
Environment: [Production/Staging]

Core Web Vitals:
- LCP: [X]s
- INP: [X]ms
- CLS: [X]
- FCP: [X]s
- TTFB: [X]ms

Bundle:
- Total JS: [X]KB (gzipped: [X]KB)
- Total CSS: [X]KB
- Images: [X]KB
- Total page weight: [X]KB

API:
- Average response time: [X]ms
- P95 response time: [X]ms
- Slowest endpoints: [list]

Database:
- Slowest queries: [list with times]
```

---

## Phase 2: Frontend Optimization

### 2.1 JavaScript Bundle Optimization

**Code Splitting:**
```javascript
// Route-based splitting (React)
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// Component-level splitting for heavy components
const HeavyChart = lazy(() => import('./components/HeavyChart'));
const RichTextEditor = lazy(() => import('./components/RichTextEditor'));

// Usage with loading fallback
<Suspense fallback={<PageSkeleton />}>
  <Dashboard />
</Suspense>
```

**Tree Shaking:**
```javascript
// BAD - imports entire library
import _ from 'lodash';
const result = _.debounce(fn, 300);

// GOOD - imports only what's needed
import debounce from 'lodash/debounce';
const result = debounce(fn, 300);

// BETTER - use native or lighter alternatives
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
```

**Dynamic Imports:**
```javascript
// Load heavy libraries only when needed
const handleExport = async () => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  // use doc...
};

// Load analytics only after user interaction
document.addEventListener('click', async () => {
  const analytics = await import('./analytics');
  analytics.init();
}, { once: true });
```

### 2.2 React Performance Optimization

**Prevent Unnecessary Re-renders:**
```javascript
// memo for expensive components
const ExpensiveList = memo(({ items, onSelect }) => {
  return items.map(item => (
    <ListItem key={item.id} item={item} onSelect={onSelect} />
  ));
}, (prevProps, nextProps) => {
  // Custom comparison - return true if props are equal (skip re-render)
  return prevProps.items === nextProps.items && 
         prevProps.onSelect === nextProps.onSelect;
});

// useCallback for stable function references
const handleSelect = useCallback((id) => {
  setSelected(id);
}, []); // empty deps = stable reference

// useMemo for expensive calculations
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]); // only recalculate when items changes
```

**Virtualization for Long Lists:**
```javascript
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualList = ({ items }) => {
  const parentRef = useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // estimated row height
  });
  
  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: virtualItem.start,
              height: virtualItem.size,
            }}
          >
            <ListItem item={items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

**State Optimization:**
```javascript
// Split state to prevent unnecessary re-renders
// BAD - one big state object
const [state, setState] = useState({ user: null, posts: [], ui: {} });

// GOOD - separate concerns
const [user, setUser] = useState(null);
const [posts, setPosts] = useState([]);
const [uiState, setUiState] = useState({});

// Use useReducer for complex state
const [state, dispatch] = useReducer(reducer, initialState);
```

### 2.3 Image Optimization
```jsx
// Next.js Image component (automatic optimization)
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // for above-the-fold images
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>

// Manual optimization checklist:
// - [ ] Use WebP/AVIF format
// - [ ] Serve correct sizes (srcset)
// - [ ] Lazy load below-the-fold images
// - [ ] Use CDN for image delivery
// - [ ] Compress without quality loss (squoosh.app)
```

### 2.4 CSS Performance
```css
/* Avoid expensive CSS properties */
/* BAD - triggers layout */
.bad { width: calc(100% - 20px); top: 0; left: 0; }

/* GOOD - use transform (GPU accelerated) */
.good { transform: translateX(0); }

/* Contain layout recalculation */
.card {
  contain: layout style; /* Isolate from rest of page */
}

/* Use will-change sparingly */
.animated-element {
  will-change: transform; /* Only for elements that WILL animate */
}

/* Remove after animation */
element.addEventListener('animationend', () => {
  element.style.willChange = 'auto';
});
```

### 2.5 Network Optimization
```javascript
// Prefetch next likely navigation
<link rel="prefetch" href="/dashboard" />
<link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin />

// Service Worker caching strategy
// Cache-first for static assets
// Network-first for API calls
// Stale-while-revalidate for semi-static content

// HTTP/2 - enable on server
// Compression - enable gzip/brotli
// CDN - serve static assets from edge

// Request deduplication
const cache = new Map();
const fetchWithCache = async (url) => {
  if (cache.has(url)) return cache.get(url);
  const promise = fetch(url).then(r => r.json());
  cache.set(url, promise);
  return promise;
};
```

---

## Phase 3: Backend Optimization

### 3.1 API Response Time
```javascript
// Add response time logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (duration > 1000) {
      logger.warn(`Slow request: ${req.method} ${req.path} - ${duration}ms`);
    }
  });
  next();
});

// Pagination - never return unbounded results
app.get('/api/users', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * Math.min(limit, 100); // cap at 100
  
  const users = await db.users.findMany({
    skip: offset,
    take: parseInt(limit),
    select: { id: true, name: true, email: true } // only needed fields
  });
  
  res.json({ data: users, page, limit });
});
```

### 3.2 Database Query Optimization
```sql
-- Add indexes for frequently queried columns
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_posts_user_id ON posts(user_id);
CREATE INDEX CONCURRENTLY idx_posts_created_at ON posts(created_at DESC);

-- Composite index for common query patterns
CREATE INDEX idx_posts_user_status ON posts(user_id, status);

-- Analyze slow queries
EXPLAIN (ANALYZE, BUFFERS) 
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
WHERE u.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.id;

-- Avoid N+1 queries
-- BAD: N+1
const users = await User.findAll();
for (const user of users) {
  user.posts = await Post.findAll({ where: { userId: user.id } });
}

-- GOOD: eager loading
const users = await User.findAll({
  include: [{ model: Post, attributes: ['id', 'title'] }]
});
```

### 3.3 Caching Strategy
```javascript
// Redis caching layer
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

const withCache = async (key, ttl, fetchFn) => {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
};

// Usage
const getUser = (id) => withCache(
  `user:${id}`,
  300, // 5 minutes TTL
  () => db.users.findById(id)
);

// Cache invalidation
const updateUser = async (id, data) => {
  await db.users.update(id, data);
  await redis.del(`user:${id}`); // invalidate cache
};

// HTTP caching headers
res.set({
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  'ETag': generateETag(data),
  'Last-Modified': new Date().toUTCString()
});
```

---

## Phase 4: Infrastructure Optimization (DevOps)

### 4.1 CDN Configuration
```
Static assets: Cache at edge, long TTL (1 year with content hash)
API responses: Cache at edge for public data, short TTL
HTML: Short TTL or no cache (for deployments)

CDN checklist:
- [ ] Static assets served from CDN
- [ ] Images served from CDN with optimization
- [ ] Gzip/Brotli compression enabled
- [ ] HTTP/2 or HTTP/3 enabled
- [ ] HSTS enabled
```

### 4.2 Server Optimization
```nginx
# Nginx configuration
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;

# Brotli (better than gzip)
brotli on;
brotli_types text/plain text/css application/json application/javascript;

# Keep-alive
keepalive_timeout 65;
keepalive_requests 100;

# Buffer sizes
client_body_buffer_size 10K;
client_header_buffer_size 1k;
```

---

## Phase 5: Verification & Monitoring

### 5.1 Performance Budget
```javascript
// webpack.config.js - fail build if budget exceeded
module.exports = {
  performance: {
    maxAssetSize: 250000,      // 250KB per asset
    maxEntrypointSize: 500000, // 500KB entry point
    hints: 'error'             // fail build, not just warn
  }
};
```

### 5.2 Continuous Monitoring
```yaml
# .github/workflows/performance.yml
- name: Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun
    
# lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}]
      }
    }
  }
}
```

### 5.3 After Optimization Report
```
OPTIMIZATION REPORT - [Date]
=============================
Changes made: [list]

Results:
Metric          | Before  | After   | Change
----------------|---------|---------|--------
LCP             | [X]s    | [Y]s    | -[Z]%
Bundle size     | [X]KB   | [Y]KB   | -[Z]%
API p95         | [X]ms   | [Y]ms   | -[Z]%
DB query avg    | [X]ms   | [Y]ms   | -[Z]%

Status: [Target met / Partial / Needs more work]
Next steps: [If target not met]
```

---

## Quick Reference: Performance Anti-Patterns

| Anti-Pattern | Impact | Fix |
|-------------|--------|-----|
| Render on every keystroke | High CPU | Debounce input handlers |
| Fetching all data upfront | Slow initial load | Paginate + lazy load |
| No image optimization | Large page weight | WebP + srcset + lazy |
| Synchronous localStorage | Blocks main thread | Use async storage |
| Missing virtualization | DOM overload | react-virtual |
| No memoization | Unnecessary renders | memo + useMemo |
| N+1 queries | Slow API | Eager loading |
| No caching | Repeated work | Redis + HTTP cache |
| Unindexed queries | Slow DB | Add indexes |
| Blocking scripts | Slow FCP | defer/async |

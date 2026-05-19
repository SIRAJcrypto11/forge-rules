# Launch Readiness Checklist

> Complete this checklist before going live.  
> Every unchecked box is a known risk you're accepting.

---

## Functionality

```
□ All features work end-to-end in production build
□ All critical user journeys tested (E2E tests pass)
□ All forms validate correctly
□ All error states display correctly
□ All empty states display correctly
□ Loading states appear correctly on slow connections
□ Pagination works correctly
□ Search and filter work correctly
□ Export functionality works (if applicable)
□ Authentication flow works (login, logout, session expiry)
□ Protected routes redirect correctly
□ 404 page exists and displays correctly
```

---

## Performance

```
□ Lighthouse score ≥ 90 on Performance
□ First Contentful Paint < 1.5s on 4G
□ Largest Contentful Paint < 2.5s on 4G
□ Cumulative Layout Shift < 0.1
□ Initial bundle < 100KB gzipped
□ Each feature chunk < 50KB gzipped
□ No console errors in production build
□ No console.log statements in production
□ Images optimized (WebP format, correct dimensions)
□ Fonts self-hosted (no external CDN dependency)
□ Lists > 100 items virtualized
```

---

## Security

```
□ npm audit: zero CRITICAL or HIGH vulnerabilities
□ No hardcoded secrets in codebase (git grep for common patterns)
□ .env not committed to git
□ All environment variables set in production platform
□ HTTPS enforced (no HTTP fallback)
□ Content Security Policy headers configured
□ Authentication tokens use httpOnly cookies
□ All user inputs validated
□ dangerouslySetInnerHTML uses DOMPurify
□ External URLs validated for safe protocols
□ CORS configured correctly on API
```

---

## Accessibility

```
□ Lighthouse Accessibility score ≥ 90
□ axe-core automated scan: zero critical violations
□ Manual keyboard navigation test passed
□ Screen reader test passed (NVDA or VoiceOver)
□ Color contrast passes WCAG AA (4.5:1 for normal text)
□ All images have alt text
□ All form inputs have labels
□ Focus management works in modals
□ Skip-to-content link present
□ Page titles update on navigation
□ No user-scalable=no in viewport meta
```

---

## Cross-Browser & Device

```
□ Chrome (latest) — desktop
□ Firefox (latest) — desktop
□ Safari (latest) — desktop
□ Chrome — Android mobile (375px)
□ Safari — iOS mobile (375px)
□ No horizontal scroll on any viewport
□ Touch targets ≥ 44×44px on mobile
□ Dark mode works on all browsers
□ System dark mode preference respected
```

---

## Documentation

```
□ README.md is up to date
□ ARCHITECTURE.md reflects current module structure
□ .env.example has all required variables documented
□ CHANGELOG.md updated with this release
□ API documentation updated (if applicable)
```

---

## Monitoring & Observability

```
□ Error tracking configured (Sentry or equivalent)
□ Analytics configured (if required)
□ Uptime monitoring configured
□ Performance monitoring configured
□ Log aggregation configured (if applicable)
□ Alerts configured for critical errors
```

---

## Deployment

```
□ Production environment variables set
□ Database migrations run (if applicable)
□ CDN cache invalidated
□ DNS configured correctly
□ SSL certificate valid and not expiring soon
□ Rollback plan documented
□ Team notified of deployment
□ Post-deployment smoke test completed
```

---

## Post-Launch (within 24 hours)

```
□ Monitor error tracking for new errors
□ Monitor performance metrics
□ Check user feedback channels
□ Verify all critical user journeys work in production
□ Document any issues found and their status
```

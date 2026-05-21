# Workflow: Security Fix
**ID:** WF-05  
**Trigger Keywords:** security, vulnerability, CVE, XSS, CSRF, injection, auth, authentication, authorization, breach, exploit, exposure, sensitive data, token, password, permission  
**Primary Agent:** Security  
**Support Agents:** Backend, Coder, DevOps, Reviewer  
**Estimated Time:** 2 hours – 2 weeks (severity-dependent)  
**⚠️ CONFIDENTIAL: Security issues should not be discussed in public channels**

---

## Overview

Security fixes require a different mindset than regular bugs: speed matters (minimize exposure window), discretion matters (don't announce vulnerabilities publicly before patching), and thoroughness matters (partial fixes can be worse than none).

---

## Severity Classification (CVSS-based)

| Level | CVSS Score | Description | Response Time | Example |
|-------|-----------|-------------|---------------|---------|
| Critical | 9.0–10.0 | Remote code execution, full data breach | Immediate (< 4h) | SQL injection, auth bypass |
| High | 7.0–8.9 | Significant data exposure, privilege escalation | < 24 hours | Stored XSS, IDOR |
| Medium | 4.0–6.9 | Limited data exposure, requires user interaction | < 1 week | Reflected XSS, CSRF |
| Low | 0.1–3.9 | Minimal impact, hard to exploit | Next sprint | Info disclosure, weak headers |

---

## Phase 1: Triage & Containment (Security Agent)

### 1.1 Immediate Assessment
```
FIRST 30 MINUTES:
- [ ] Confirm the vulnerability is real (not false positive)
- [ ] Determine severity (CVSS score)
- [ ] Assess if actively being exploited
- [ ] Identify affected systems and data
- [ ] Notify security lead / CTO (for High/Critical)
- [ ] Create private issue/ticket (NOT public)
```

### 1.2 Containment Options (Critical/High)
```
While fix is being developed:
Option A - Feature flag: Disable the vulnerable feature
Option B - WAF rule: Block malicious patterns at edge
Option C - Rate limiting: Limit attack surface
Option D - Temporary auth: Add extra auth layer
Option E - Rollback: Revert to last known-good version

Choose based on: user impact vs security risk
```

### 1.3 Scope Assessment
```
Questions to answer:
- What data is exposed? (PII, financial, credentials, IP)
- How many users are affected?
- Is there evidence of exploitation? (check logs)
- What is the attack vector? (network, local, physical)
- What privileges does attacker need?
- What user interaction is required?
```

---

## Phase 2: Root Cause Analysis (Security + Backend)

### 2.1 Common Vulnerability Patterns

**Injection Attacks:**
```javascript
// SQL Injection
// VULNERABLE
const query = `SELECT * FROM users WHERE email = '${email}'`;

// SECURE - parameterized queries
const query = 'SELECT * FROM users WHERE email = $1';
const result = await db.query(query, [email]);

// ORM (Prisma/Sequelize) - safe by default
const user = await prisma.user.findUnique({ where: { email } });

// NoSQL Injection (MongoDB)
// VULNERABLE
db.users.find({ email: req.body.email }); // if email = { $gt: "" }

// SECURE
const email = String(req.body.email); // force string type
db.users.find({ email });
```

**XSS (Cross-Site Scripting):**
```javascript
// Stored XSS
// VULNERABLE - rendering raw HTML
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// SECURE - sanitize before rendering
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />

// BETTER - use text content, not HTML
<div>{userContent}</div> // React escapes by default

// Reflected XSS
// VULNERABLE
res.send(`<h1>Hello ${req.query.name}</h1>`);

// SECURE
import { escape } from 'html-escaper';
res.send(`<h1>Hello ${escape(req.query.name)}</h1>`);
```

**CSRF (Cross-Site Request Forgery):**
```javascript
// SECURE - CSRF token implementation
import csrf from 'csurf';
app.use(csrf({ cookie: true }));

// In form
<input type="hidden" name="_csrf" value={csrfToken} />

// For SPAs - use SameSite cookies + custom header
// Set cookie: SameSite=Strict; Secure; HttpOnly
// Require custom header: X-Requested-With: XMLHttpRequest
```

**Authentication Issues:**
```javascript
// VULNERABLE - weak password hashing
const hash = md5(password); // NEVER use MD5/SHA1 for passwords

// SECURE - bcrypt with appropriate cost factor
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 12; // adjust based on server speed
const hash = await bcrypt.hash(password, SALT_ROUNDS);
const isValid = await bcrypt.compare(password, hash);

// JWT security
// VULNERABLE
const token = jwt.sign(payload, 'secret'); // weak secret, no expiry

// SECURE
const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: '15m',    // short-lived access token
  algorithm: 'HS256',
  issuer: 'your-app',
  audience: 'your-app-users'
});

// Refresh token rotation
const refreshToken = crypto.randomBytes(64).toString('hex');
// Store hash of refresh token, not the token itself
await db.refreshTokens.create({
  tokenHash: await bcrypt.hash(refreshToken, 10),
  userId,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
});
```

**Authorization (IDOR - Insecure Direct Object Reference):**
```javascript
// VULNERABLE - no ownership check
app.get('/api/documents/:id', async (req, res) => {
  const doc = await db.documents.findById(req.params.id);
  res.json(doc);
});

// SECURE - always verify ownership
app.get('/api/documents/:id', authenticate, async (req, res) => {
  const doc = await db.documents.findOne({
    where: { 
      id: req.params.id,
      userId: req.user.id  // MUST check ownership
    }
  });
  
  if (!doc) {
    return res.status(404).json({ error: 'Not found' }); // don't reveal 403
  }
  
  res.json(doc);
});
```

**Sensitive Data Exposure:**
```javascript
// VULNERABLE - logging sensitive data
logger.info('User login', { email, password }); // NEVER log passwords

// SECURE - log only safe fields
logger.info('User login', { email, userId: user.id, ip: req.ip });

// VULNERABLE - returning sensitive fields
res.json(user); // might include password hash, tokens

// SECURE - explicit field selection
res.json({
  id: user.id,
  name: user.name,
  email: user.email
  // never: password, passwordHash, secretToken, ssn, creditCard
});

// Environment variables - never in code
// VULNERABLE
const apiKey = 'sk-1234567890abcdef';

// SECURE
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error('API_KEY environment variable required');
```

### 2.2 Security Headers
```javascript
// Express - use helmet
import helmet from 'helmet';
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'nonce-{nonce}'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.yourapp.com'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Required security headers:
// X-Content-Type-Options: nosniff
// X-Frame-Options: DENY
// X-XSS-Protection: 1; mode=block
// Referrer-Policy: strict-origin-when-cross-origin
// Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## Phase 3: Fix Implementation (Security + Backend + Coder)

### 3.1 Fix Branch Protocol
```bash
# Use private branch naming (don't reveal vulnerability type publicly)
git checkout -b security/patch-$(date +%Y%m%d)

# Or if using ticket system
git checkout -b security/SEC-123
```

### 3.2 Fix Checklist
```
Before submitting fix:
- [ ] Root cause addressed (not just symptom)
- [ ] All instances of the pattern fixed (not just reported one)
- [ ] Input validation added at entry points
- [ ] Output encoding added at exit points
- [ ] Principle of least privilege applied
- [ ] Sensitive data not logged
- [ ] Error messages don't leak internal info
- [ ] Security headers configured
- [ ] Dependencies updated if CVE in dependency
```

### 3.3 Dependency Vulnerability Fix
```bash
# Audit dependencies
npm audit

# Fix automatically (minor/patch)
npm audit fix

# Check what will change before fixing
npm audit fix --dry-run

# Force fix (may include breaking changes - test thoroughly)
npm audit fix --force

# Update specific package
npm update <package-name>

# Check for known vulnerabilities
npx snyk test
```

---

## Phase 4: Security Testing (Security Agent + Tester)

### 4.1 Penetration Testing Checklist
```
Authentication:
- [ ] Brute force protection (rate limiting, lockout)
- [ ] Password strength requirements enforced
- [ ] Secure password reset flow
- [ ] Session invalidation on logout
- [ ] Concurrent session handling

Authorization:
- [ ] Horizontal privilege escalation (access other users' data)
- [ ] Vertical privilege escalation (access admin functions)
- [ ] Function-level access control
- [ ] API endpoint authorization

Input Validation:
- [ ] SQL injection (all DB queries)
- [ ] XSS (all user-controlled output)
- [ ] Command injection (if using exec/spawn)
- [ ] Path traversal (file operations)
- [ ] XML/JSON injection

Session Management:
- [ ] Session token entropy (>= 128 bits)
- [ ] Secure + HttpOnly + SameSite cookie flags
- [ ] Session expiration
- [ ] Session fixation prevention
```

### 4.2 Automated Security Scanning
```bash
# SAST (Static Analysis)
npx semgrep --config=auto src/

# Dependency scanning
npm audit
npx snyk test

# Secret scanning
npx detect-secrets scan

# DAST (Dynamic Analysis) - against staging
npx zap-cli quick-scan --self-contained --start-options '-config api.disablekey=true' http://staging.yourapp.com
```

---

## Phase 5: Code Review (Security + Reviewer)

### 5.1 Security Code Review Checklist
```
- [ ] No hardcoded secrets or credentials
- [ ] All user inputs validated and sanitized
- [ ] All outputs properly encoded
- [ ] Parameterized queries used everywhere
- [ ] Authentication required on all protected routes
- [ ] Authorization checked for all resource access
- [ ] Sensitive data not in logs
- [ ] Error messages don't leak stack traces
- [ ] HTTPS enforced
- [ ] Security headers present
```

### 5.2 PR Process for Security Fixes
```
- Use private PR if possible (GitHub private security advisories)
- Limit reviewers to security team + lead devs
- Do NOT mention specific vulnerability details in PR title
- Merge quickly after approval
- Deploy immediately after merge
```

---

## Phase 6: Deployment & Disclosure (DevOps + Security)

### 6.1 Emergency Deployment Checklist
```
- [ ] Fix tested on staging
- [ ] Rollback plan ready
- [ ] Deploy to production
- [ ] Verify fix in production
- [ ] Monitor for 1 hour post-deploy
- [ ] Revoke any compromised tokens/sessions
- [ ] Force re-authentication if needed
- [ ] Notify affected users (if data was exposed)
```

### 6.2 Responsible Disclosure
```
Timeline:
Day 0: Vulnerability discovered
Day 0-1: Assess and contain
Day 1-7: Develop and test fix
Day 7: Deploy fix
Day 7-90: Coordinate with reporter (if external)
Day 90: Public disclosure (CVE if applicable)

Disclosure template:
- What was the vulnerability
- What data/systems were affected
- When it was discovered and fixed
- What users should do (if anything)
- How to report future vulnerabilities
```

### 6.3 Post-Incident Actions
```
- [ ] Update security runbook
- [ ] Add automated test to prevent regression
- [ ] Review similar code patterns across codebase
- [ ] Update threat model
- [ ] Security training if human error involved
- [ ] Consider bug bounty program
```

---

## Quick Reference: OWASP Top 10 (2021)

| # | Vulnerability | Quick Check |
|---|--------------|-------------|
| A01 | Broken Access Control | Check all routes have auth + authz |
| A02 | Cryptographic Failures | No MD5/SHA1 for passwords, HTTPS everywhere |
| A03 | Injection | Parameterized queries, input validation |
| A04 | Insecure Design | Threat modeling, security requirements |
| A05 | Security Misconfiguration | Security headers, no default credentials |
| A06 | Vulnerable Components | npm audit, keep deps updated |
| A07 | Auth Failures | MFA, rate limiting, secure sessions |
| A08 | Software Integrity | Verify dependencies, signed commits |
| A09 | Logging Failures | Log security events, don't log secrets |
| A10 | SSRF | Validate URLs, allowlist external services |

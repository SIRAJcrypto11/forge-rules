# Workflow: Code Refactoring
**ID:** WF-07  
**Trigger Keywords:** refactor, clean up, technical debt, code smell, DRY, simplify, restructure, improve code quality, maintainability  
**Primary Agent:** Coder  
**Support Agents:** Architect, Reviewer, Tester  
**Estimated Time:** 1 day – 3 weeks  

---

## Overview

Refactoring improves code structure without changing external behavior. The goal: make code easier to understand, modify, and maintain.

---

## Golden Rules of Refactoring

```
1. Tests MUST pass before and after
2. Refactor OR add features — never both at once
3. Small, incremental changes
4. Commit after each successful refactor
5. If tests break, revert immediately
```

---

## Phase 1: Identify Refactoring Candidates

### 1.1 Code Smells Checklist
```
Bloaters (too big):
- [ ] Long method (> 20 lines)
- [ ] Large class (> 300 lines)
- [ ] Long parameter list (> 3 params)
- [ ] Data clumps (same group of variables together)

Object-Orientation Abusers:
- [ ] Switch statements (should be polymorphism)
- [ ] Temporary fields (only used sometimes)
- [ ] Refused bequest (subclass doesn't use parent methods)

Change Preventers:
- [ ] Divergent change (one class changes for multiple reasons)
- [ ] Shotgun surgery (one change requires many small edits)
- [ ] Parallel inheritance (adding subclass requires adding another)

Dispensables (unnecessary):
- [ ] Comments explaining what code does (code should be self-explanatory)
- [ ] Duplicate code
- [ ] Dead code (unused)
- [ ] Speculative generality (unused abstraction)

Couplers (too much coupling):
- [ ] Feature envy (method uses another class more than its own)
- [ ] Inappropriate intimacy (classes too dependent on each other)
- [ ] Message chains (a.b().c().d())
- [ ] Middle man (class just delegates to another)
```

### 1.2 Metrics to Check
```bash
# Code complexity
npx eslint src/ --ext .js,.jsx,.ts,.tsx

# Cyclomatic complexity (should be < 10)
npx complexity-report src/

# Duplicate code detection
npx jscpd src/

# Bundle size analysis
npx webpack-bundle-analyzer stats.json
```

---

## Phase 2: Refactoring Patterns

### 2.1 Extract Function
```javascript
// BEFORE - long method
function renderUserProfile(user) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <div>
        {user.posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// AFTER - extracted functions
function UserAvatar({ src, alt }) {
  return <img src={src} alt={alt} />;
}

function UserInfo({ name, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

function PostPreview({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}...</p>
      <span>{formatDate(post.createdAt)}</span>
    </div>
  );
}

function UserProfile({ user }) {
  return (
    <div>
      <UserAvatar src={user.avatar} alt={user.name} />
      <UserInfo name={user.name} email={user.email} />
      <div>
        {user.posts.map(post => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
```

### 2.2 Replace Conditional with Polymorphism
```javascript
// BEFORE - switch statement
function getShippingCost(order) {
  switch (order.shippingMethod) {
    case 'standard':
      return order.weight * 0.5;
    case 'express':
      return order.weight * 1.5 + 10;
    case 'overnight':
      return order.weight * 3 + 25;
    default:
      throw new Error('Unknown shipping method');
  }
}

// AFTER - strategy pattern
class StandardShipping {
  calculateCost(order) {
    return order.weight * 0.5;
  }
}

class ExpressShipping {
  calculateCost(order) {
    return order.weight * 1.5 + 10;
  }
}

class OvernightShipping {
  calculateCost(order) {
    return order.weight * 3 + 25;
  }
}

const shippingStrategies = {
  standard: new StandardShipping(),
  express: new ExpressShipping(),
  overnight: new OvernightShipping()
};

function getShippingCost(order) {
  const strategy = shippingStrategies[order.shippingMethod];
  if (!strategy) throw new Error('Unknown shipping method');
  return strategy.calculateCost(order);
}
```

### 2.3 Introduce Parameter Object
```javascript
// BEFORE - long parameter list
function createUser(name, email, password, age, country, city, zipCode) {
  // ...
}

createUser('John', 'john@example.com', 'pass123', 30, 'USA', 'NYC', '10001');

// AFTER - parameter object
function createUser({ name, email, password, age, address }) {
  // ...
}

createUser({
  name: 'John',
  email: 'john@example.com',
  password: 'pass123',
  age: 30,
  address: {
    country: 'USA',
    city: 'NYC',
    zipCode: '10001'
  }
});
```

### 2.4 Replace Magic Numbers with Constants
```javascript
// BEFORE
function calculateDiscount(price) {
  if (price > 100) {
    return price * 0.1;
  }
  return 0;
}

setTimeout(() => {
  // ...
}, 86400000);

// AFTER
const DISCOUNT_THRESHOLD = 100;
const DISCOUNT_RATE = 0.1;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function calculateDiscount(price) {
  if (price > DISCOUNT_THRESHOLD) {
    return price * DISCOUNT_RATE;
  }
  return 0;
}

setTimeout(() => {
  // ...
}, ONE_DAY_MS);
```

### 2.5 Simplify Conditional Logic
```javascript
// BEFORE - nested conditionals
function getUserDiscount(user) {
  if (user) {
    if (user.isPremium) {
      if (user.loyaltyPoints > 1000) {
        return 0.3;
      } else {
        return 0.2;
      }
    } else {
      if (user.loyaltyPoints > 500) {
        return 0.1;
      } else {
        return 0;
      }
    }
  } else {
    return 0;
  }
}

// AFTER - early returns + clear logic
function getUserDiscount(user) {
  if (!user) return 0;
  
  if (user.isPremium) {
    return user.loyaltyPoints > 1000 ? 0.3 : 0.2;
  }
  
  return user.loyaltyPoints > 500 ? 0.1 : 0;
}
```

### 2.6 Extract Custom Hook (React)
```javascript
// BEFORE - logic mixed in component
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{user.name}</div>;
}

// AFTER - extracted hook
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  return { user, loading, error };
}

function UserProfile() {
  const { user, loading, error } = useUser();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{user.name}</div>;
}
```

### 2.7 Consolidate Duplicate Code
```javascript
// BEFORE - duplication
function formatUserName(user) {
  return `${user.firstName} ${user.lastName}`;
}

function formatAuthorName(author) {
  return `${author.firstName} ${author.lastName}`;
}

function formatAdminName(admin) {
  return `${admin.firstName} ${admin.lastName}`;
}

// AFTER - single function
function formatFullName(person) {
  return `${person.firstName} ${person.lastName}`;
}

// Usage
formatFullName(user);
formatFullName(author);
formatFullName(admin);
```

---

## Phase 3: Refactoring Process

### 3.1 Safe Refactoring Steps
```
1. Ensure tests exist and pass
2. Make ONE small change
3. Run tests
4. If tests pass: commit
5. If tests fail: revert
6. Repeat
```

### 3.2 Refactoring Workflow
```bash
# 1. Create refactor branch
git checkout -b refactor/simplify-user-service

# 2. Run tests before starting
npm run test

# 3. Make small change
# ... edit code ...

# 4. Run tests after change
npm run test

# 5. If pass, commit
git add .
git commit -m "refactor: extract getUserDiscount function"

# 6. Repeat for next change
# ... edit code ...
npm run test
git commit -m "refactor: replace magic numbers with constants"

# 7. When done, create PR
git push origin refactor/simplify-user-service
```

---

## Phase 4: Testing After Refactoring

### 4.1 Verification Checklist
```
- [ ] All existing tests pass
- [ ] No new bugs introduced
- [ ] Performance not degraded
- [ ] Code coverage maintained or improved
- [ ] Linter passes
- [ ] TypeScript types still valid
- [ ] Build succeeds
```

### 4.2 Regression Testing
```bash
# Run full test suite
npm run test

# Run E2E tests
npx playwright test

# Check bundle size
npm run build
# Compare dist/ size before and after

# Performance testing
npm run lighthouse
```

---

## Phase 5: Documentation

### 5.1 Update Documentation
```
After refactoring:
- [ ] Update README if API changed
- [ ] Update JSDoc comments
- [ ] Update architecture diagrams if structure changed
- [ ] Update migration guide if breaking changes
```

### 5.2 PR Description Template
```markdown
## Refactoring: [Brief description]

### Motivation
[Why this refactoring was needed]

### Changes
- Extracted X into separate function
- Replaced switch with strategy pattern
- Consolidated duplicate code in Y and Z

### Impact
- Code complexity reduced from X to Y
- Duplicate code reduced by Z lines
- Test coverage maintained at X%

### Testing
- [ ] All tests pass
- [ ] No performance regression
- [ ] Manual testing completed

### Breaking Changes
None / [List if any]
```

---

## Quick Reference: When to Refactor

| Situation | Action |
|-----------|--------|
| Adding feature to messy code | Refactor first, then add feature |
| Bug in complex code | Simplify first, then fix bug |
| Code review feedback | Refactor before merging |
| Duplicate code (3+ times) | Extract to shared function |
| Function > 20 lines | Extract smaller functions |
| Nested conditionals (3+ levels) | Simplify with early returns |
| Magic numbers | Replace with named constants |
| Long parameter list (> 3) | Use parameter object |
| God class (> 300 lines) | Split into smaller classes |

# Workflow: Testing Strategy & Implementation
**ID:** WF-08  
**Trigger Keywords:** test, testing, unit test, integration test, e2e, coverage, TDD, jest, vitest, playwright, cypress, QA  
**Primary Agent:** Tester  
**Support Agents:** Coder, QA Manual  
**Estimated Time:** 2 days – 2 weeks  

---

## Overview

Comprehensive testing strategy covering unit, integration, and end-to-end tests. Follow the testing pyramid: many unit tests, fewer integration tests, minimal E2E tests.

---

## Testing Pyramid

```
        /\
       /E2E\      ← Few (slow, brittle, expensive)
      /------\
     /  INT   \   ← Some (medium speed, medium cost)
    /----------\
   /    UNIT    \ ← Many (fast, cheap, reliable)
  /--------------\
```

**Target Coverage:**
- Unit: 80%+ coverage
- Integration: Critical paths
- E2E: Happy paths + critical flows

---

## Phase 1: Test Strategy Planning

### 1.1 What to Test
```
Priority 1 - MUST test:
- [ ] Business logic (calculations, validations, transformations)
- [ ] Authentication & authorization
- [ ] Payment processing
- [ ] Data persistence
- [ ] Critical user flows (signup, checkout, etc.)

Priority 2 - SHOULD test:
- [ ] UI components (behavior, not styling)
- [ ] API endpoints
- [ ] Error handling
- [ ] Edge cases

Priority 3 - NICE to test:
- [ ] Utility functions
- [ ] Presentational components
- [ ] Static content
```

### 1.2 Test Framework Selection
```
Unit/Integration:
- Jest (React, Node.js) - most popular
- Vitest (Vite projects) - faster, ESM-native
- Mocha + Chai (flexibility)

E2E:
- Playwright (recommended) - fast, reliable, multi-browser
- Cypress - great DX, Chrome-only
- Puppeteer - lower-level control

Component Testing:
- React Testing Library (behavior-focused)
- Enzyme (implementation-focused, deprecated)
```

---

## Phase 2: Unit Testing

### 2.1 Unit Test Structure (AAA Pattern)
```javascript
describe('calculateTotal', () => {
  it('should calculate total with tax', () => {
    // Arrange - setup
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 }
    ];
    const taxRate = 0.1;
    
    // Act - execute
    const result = calculateTotal(items, taxRate);
    
    // Assert - verify
    expect(result).toBe(27.5); // (10*2 + 5*1) * 1.1
  });
  
  it('should handle empty cart', () => {
    expect(calculateTotal([], 0.1)).toBe(0);
  });
  
  it('should handle zero tax rate', () => {
    const items = [{ price: 10, quantity: 1 }];
    expect(calculateTotal(items, 0)).toBe(10);
  });
});
```

### 2.2 Testing React Components
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>);
    
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  it('handles disabled state', () => {
    render(<Button disabled>Submit</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

### 2.3 Testing Hooks
```javascript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  it('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
  
  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  it('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
  
  it('resets count', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

### 2.4 Mocking
```javascript
// Mock API calls
import { fetchUser } from './api';
jest.mock('./api');

test('loads user data', async () => {
  fetchUser.mockResolvedValue({ id: 1, name: 'John' });
  
  const { result } = renderHook(() => useUser(1));
  
  await waitFor(() => {
    expect(result.current.data).toEqual({ id: 1, name: 'John' });
  });
});

// Mock modules
jest.mock('axios');
import axios from 'axios';

test('fetches data', async () => {
  axios.get.mockResolvedValue({ data: { users: [] } });
  
  const data = await fetchUsers();
  
  expect(axios.get).toHaveBeenCalledWith('/api/users');
  expect(data).toEqual({ users: [] });
});

// Mock timers
jest.useFakeTimers();

test('debounces input', () => {
  const handleChange = jest.fn();
  render(<DebouncedInput onChange={handleChange} delay={300} />);
  
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'test' } });
  
  expect(handleChange).not.toHaveBeenCalled();
  
  jest.advanceTimersByTime(300);
  
  expect(handleChange).toHaveBeenCalledWith('test');
});
```

---

## Phase 3: Integration Testing

### 3.1 API Integration Tests
```javascript
import request from 'supertest';
import app from '../app';
import { setupTestDB, teardownTestDB } from './helpers';

describe('POST /api/users', () => {
  beforeAll(async () => {
    await setupTestDB();
  });
  
  afterAll(async () => {
    await teardownTestDB();
  });
  
  it('creates a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123!'
      })
      .expect(201);
    
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name: 'John Doe',
      email: 'john@example.com'
    });
    expect(response.body.password).toBeUndefined(); // should not return password
  });
  
  it('validates required fields', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John' }) // missing email and password
      .expect(400);
    
    expect(response.body.errors).toContain('Email is required');
    expect(response.body.errors).toContain('Password is required');
  });
  
  it('prevents duplicate emails', async () => {
    await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'test@example.com', password: 'pass' });
    
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Jane', email: 'test@example.com', password: 'pass' })
      .expect(409);
    
    expect(response.body.error).toMatch(/email already exists/i);
  });
});
```

### 3.2 Database Integration Tests
```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User model', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany(); // clean slate
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });
  
  it('creates user with hashed password', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'plaintext', // should be hashed by middleware
        name: 'Test User'
      }
    });
    
    expect(user.password).not.toBe('plaintext');
    expect(user.password).toMatch(/^\$2[aby]\$/); // bcrypt hash pattern
  });
  
  it('finds user by email', async () => {
    await prisma.user.create({
      data: { email: 'find@example.com', password: 'pass', name: 'Find Me' }
    });
    
    const user = await prisma.user.findUnique({
      where: { email: 'find@example.com' }
    });
    
    expect(user).toBeTruthy();
    expect(user.name).toBe('Find Me');
  });
});
```

---

## Phase 4: End-to-End Testing

### 4.1 Playwright E2E Tests
```javascript
import { test, expect } from '@playwright/test';

test.describe('User authentication flow', () => {
  test('user can sign up, log in, and log out', async ({ page }) => {
    // Sign up
    await page.goto('/signup');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
    
    // Log out
    await page.click('button:has-text("Log out")');
    await expect(page).toHaveURL('/');
    
    // Log in
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
  });
  
  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('[role="alert"]')).toContainText('Invalid credentials');
    await expect(page).toHaveURL('/login'); // stays on login page
  });
});

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
  });
  
  test('can add items to cart and checkout', async ({ page }) => {
    // Browse products
    await page.goto('/products');
    
    // Add first product
    await page.click('[data-testid="product-1"] button:has-text("Add to cart")');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
    
    // Add second product
    await page.click('[data-testid="product-2"] button:has-text("Add to cart")');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('2');
    
    // Go to cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page).toHaveURL('/cart');
    
    // Verify items
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(2);
    
    // Proceed to checkout
    await page.click('button:has-text("Checkout")');
    await expect(page).toHaveURL('/checkout');
    
    // Fill checkout form
    await page.fill('input[name="cardNumber"]', '4242424242424242');
    await page.fill('input[name="expiry"]', '12/25');
    await page.fill('input[name="cvc"]', '123');
    await page.click('button:has-text("Place order")');
    
    // Verify success
    await expect(page).toHaveURL(/\/order\/\d+/);
    await expect(page.locator('h1')).toContainText('Order confirmed');
  });
});
```

### 4.2 Visual Regression Testing
```javascript
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Take screenshot
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    maxDiffPixels: 100 // allow small differences
  });
});

test('button states', async ({ page }) => {
  await page.goto('/components/button');
  
  const button = page.locator('[data-testid="primary-button"]');
  
  // Default state
  await expect(button).toHaveScreenshot('button-default.png');
  
  // Hover state
  await button.hover();
  await expect(button).toHaveScreenshot('button-hover.png');
  
  // Focus state
  await button.focus();
  await expect(button).toHaveScreenshot('button-focus.png');
});
```

---

## Phase 5: Test Coverage & Quality

### 5.1 Coverage Configuration
```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### 5.2 Running Tests
```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npx playwright test

# E2E headed mode (see browser)
npx playwright test --headed

# E2E specific test
npx playwright test auth.spec.ts

# E2E debug mode
npx playwright test --debug
```

---

## Quick Reference: Testing Best Practices

| Practice | Why | Example |
|----------|-----|---------|
| Test behavior, not implementation | Tests survive refactors | Query by role, not class |
| One assertion per test | Clear failure messages | Split into multiple tests |
| Arrange-Act-Assert | Readable structure | AAA pattern |
| Descriptive test names | Self-documenting | `it('shows error when email is invalid')` |
| Avoid test interdependence | Tests can run in any order | Clean state before each |
| Mock external dependencies | Fast, reliable tests | Mock API calls |
| Test edge cases | Find bugs early | Empty, null, max values |
| Don't test libraries | Trust dependencies | Don't test React itself |

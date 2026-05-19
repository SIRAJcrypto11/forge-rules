# Chapter 10 — Naming Conventions

> Names are the first documentation.  
> A good name makes a comment unnecessary.  
> A bad name makes the code unreadable.  
> When in doubt: be specific, be consistent, be boring.

---

## 10.1 — File Naming

| File Type | Convention | Example |
|-----------|-----------|---------|
| Page components | PascalCase + `Page` | `ProductPage.jsx` |
| Feature components | PascalCase | `ProductCard.jsx` |
| UI primitives | PascalCase | `Button.jsx` |
| Layout components | PascalCase | `AppShell.jsx` |
| Hooks | camelCase + `use` prefix | `useProducts.js` |
| Utils | camelCase | `formatters.js` |
| Services | camelCase + `Service` suffix | `productService.js` |
| Types | camelCase + `.types` | `product.types.js` |
| Data | camelCase + `.data` | `products.data.js` |
| Constants | camelCase | `constants.js` |
| Styles | camelCase + `.styles` | `sidebar.styles.js` |
| Tests | same name + `.test` | `ProductCard.test.jsx` |
| E2E tests | feature name + `.spec` | `inventory.spec.ts` |
| Fixtures | name + `.fixture` | `products.fixture.js` |
| MSW handlers | domain + `.handlers` | `products.handlers.js` |

**Rules:**
```
✓ File name matches the primary export name exactly
✓ One primary export per file (Iron Law #1)
✓ Index files only for re-exports (never logic)
✗ No abbreviations that aren't universally understood
✗ No generic names: utils.js, helpers.js, misc.js, stuff.js
✗ No numbered files: component1.jsx, helper2.js
```

---

## 10.2 — Variable & Function Naming

### Constants
```js
// SCREAMING_SNAKE_CASE for module-level constants
const MAX_FILE_SIZE_MB = 10
const DEFAULT_PAGE_SIZE = 25
const API_TIMEOUT_MS = 10000
const SUPPORTED_CURRENCIES = ['IDR', 'USD', 'EUR']

// Object.freeze for enum-like constants
export const OrderStatus = Object.freeze({
  PENDING:    'pending',
  PROCESSING: 'processing',
  COMPLETED:  'completed',
  CANCELLED:  'cancelled',
})
```

### Variables
```js
// camelCase, descriptive nouns
const grossMarginPct = 0.42
const activeProductCount = 147
const selectedOrderId = 'uuid-here'
const isFirstTimeUser = true

// ❌ Bad variable names
const x = 0.42          // What is x?
const data = []          // What data?
const temp = 'uuid'      // Temp what?
const flag = true        // Flag for what?
const d = new Date()     // d is meaningless
```

### Functions
```js
// camelCase, verb + noun
function calcGrossMargin(revenue, cogs) { }
function formatCurrency(amount, currency) { }
function validateEmail(email) { }
function fetchProducts(filters) { }
function handleProductDelete(id) { }
function parseCSVRow(row) { }
function buildQueryString(params) { }

// ❌ Bad function names
function process(data) { }    // Process what? How?
function doStuff() { }        // What stuff?
function helper(x) { }        // Helper for what?
function fn(a, b) { }         // Meaningless
```

### Boolean Variables
```js
// Prefix: is, has, can, should, will, did, was
const isLoading = true
const hasError = false
const canEdit = user.role === 'admin'
const shouldRefetch = staleness > STALE_THRESHOLD
const isFirstRender = useRef(true)
const hasUnsavedChanges = isDirty

// ❌ Bad boolean names
const loading = true      // Use isLoading
const error = false       // Use hasError
const admin = true        // Use isAdmin
const valid = false       // Use isValid
```

---

## 10.3 — Component Naming

```jsx
// PascalCase, descriptive noun (what it renders)
function ProductCard({ product }) { }
function InvoiceTable({ invoices }) { }
function UserAvatarGroup({ users }) { }
function OrderStatusBadge({ status }) { }
function DashboardKPICard({ metric }) { }

// Page components: always end with "Page"
function InventoryPage() { }
function OrderDetailPage() { }
function SettingsPage() { }

// ❌ Bad component names
function Card({ product }) { }        // Too generic
function Component({ data }) { }      // Meaningless
function ProductStuff({ product }) { } // "Stuff" is not a name
function Comp1() { }                   // Numbered
```

---

## 10.4 — Hook Naming

```js
// Always starts with "use", followed by noun describing what it manages
function useProducts() { }           // Manages product list state
function useProductForm() { }        // Manages product form state
function useProductFilter() { }      // Manages product filter state
function useAuth() { }               // Manages authentication state
function useLocalStorage(key) { }    // Manages localStorage value
function useDebounce(value, delay) { } // Debounces a value
function useMediaQuery(query) { }    // Detects media query match
function useClickOutside(ref) { }    // Detects click outside element

// ❌ Bad hook names
function products() { }              // Missing "use" prefix
function useData() { }               // Too generic
function useStuff() { }              // Meaningless
function useProductHook() { }        // "Hook" is redundant
```

---

## 10.5 — Props Naming

```jsx
// Boolean props: is/has/can/show/enable prefix
<Component
  isLoading={true}
  hasError={false}
  canEdit={user.isAdmin}
  showActions={isHovered}
  isDisabled={!hasPermission}
/>

// Event handler props: on + Verb (or on + Noun + Verb)
<Component
  onClick={handleClick}
  onChange={handleChange}
  onSubmit={handleSubmit}
  onDelete={handleProductDelete}
  onStatusChange={handleStatusChange}
  onPageChange={handlePageChange}
/>

// Data props: descriptive nouns
<Component
  products={productList}
  selectedId={activeProductId}
  currentUser={authenticatedUser}
  config={tableConfiguration}
/>

// Ref props: ref or [name]Ref
<Component
  ref={containerRef}
  inputRef={searchInputRef}
  triggerRef={dropdownTriggerRef}
/>

// ❌ Bad prop names
<Component
  loading={true}        // Use isLoading
  click={handleClick}   // Use onClick
  data={products}       // Use products (specific)
  cb={handleSubmit}     // Use onSubmit
  fn={handleDelete}     // Use onDelete
/>
```

---

## 10.6 — Event Handler Naming

```js
// Internal handlers (inside component/hook): handle + Noun + Verb
const handleProductDelete = useCallback((id) => { }, [])
const handleSearchChange = useCallback((query) => { }, [])
const handleFormSubmit = useCallback((values) => { }, [])
const handleModalClose = useCallback(() => { }, [])
const handlePageChange = useCallback((page) => { }, [])

// Prop callbacks (passed from parent): on + Noun + Verb
// These are the "interface" — what the parent provides
<ProductList
  onProductDelete={handleProductDelete}
  onProductEdit={handleProductEdit}
  onPageChange={handlePageChange}
/>

// Simple single-action handlers: handle + Verb
const handleSubmit = useCallback(() => { }, [])
const handleClose = useCallback(() => { }, [])
const handleReset = useCallback(() => { }, [])
```

---

## 10.7 — CSS / Tailwind Naming

```css
/* CSS custom properties: --kebab-case */
--color-accent: #3B82F6;
--font-sans: 'Inter', sans-serif;
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--duration-fast: 150ms;

/* CSS class names: kebab-case */
.page-container { }
.card-interactive { }
.animate-shimmer { }
.sr-only { }

/* Tailwind custom classes: kebab-case */
/* In tailwind.config.js: */
colors: {
  'text-1': 'var(--color-text-1)',
  'accent-light': 'var(--color-accent-light)',
}
```

---

## 10.8 — Test Naming

```js
// Test file: [ComponentName].test.jsx or [hookName].test.js
// Test suite: describe('[ComponentName]' or '[functionName]')
// Test case: it('[does X] when [Y]') or it('shows [X] when [Y] is [Z]')

describe('ProductList', () => {
  it('shows skeleton when isLoading is true', () => { })
  it('shows empty state when items array is empty', () => { })
  it('shows error state when error prop is set', () => { })
  it('renders product rows when items are provided', () => { })
  it('calls onDelete when delete button is clicked', () => { })
  it('calls onEdit when edit button is clicked', () => { })
  it('does not call onDelete when disabled', () => { })
})

describe('formatCurrency', () => {
  it('formats positive IDR amount correctly', () => { })
  it('returns em dash for null input', () => { })
  it('returns em dash for undefined input', () => { })
  it('handles zero correctly', () => { })
  it('formats negative amounts with minus sign', () => { })
})

// ❌ Bad test names
it('test 1', () => { })
it('works correctly', () => { })
it('handles the case', () => { })
it('ProductList test', () => { })
```

---

## 10.9 — Git Naming

```bash
# Branch names: type/short-description (kebab-case)
feat/inventory-search
fix/cart-quantity-overflow
chore/update-react-19
refactor/extract-useFilter
docs/update-api-readme
test/add-formatter-coverage
hotfix/payment-crash

# Commit messages: Conventional Commits
feat(inventory): add bulk export to CSV
fix(cart): prevent negative quantity on decrement
refactor(useFilter): extract search logic to arrayHelpers
test(formatters): add edge cases for formatCurrency
chore(deps): update react-router-dom to 6.26.0
docs(readme): add environment setup instructions
perf(ProductList): virtualize rows for lists > 100 items

# ❌ Bad commit messages
fix stuff
update
WIP
asdfgh
fixed the bug
changes
```

---

## 10.10 — API & Data Naming

```js
// API endpoints: kebab-case, plural nouns
GET    /api/products
POST   /api/products
GET    /api/products/:id
PATCH  /api/products/:id
DELETE /api/products/:id
GET    /api/products/:id/variants
POST   /api/orders/:id/cancel

// JSON response fields: camelCase
{
  "id": "uuid-v4",
  "productName": "Kemeja Oxford Navy",
  "unitPrice": 285000,
  "stockQuantity": 47,
  "createdAt": "2026-01-15T08:30:00.000Z",
  "updatedAt": "2026-05-19T14:22:00.000Z"
}

// Database columns: snake_case (convention for SQL)
product_name, unit_price, stock_quantity, created_at

// Environment variables: SCREAMING_SNAKE_CASE with VITE_ prefix for client
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Inventra
VITE_FEATURE_AI_INSIGHTS=false
```

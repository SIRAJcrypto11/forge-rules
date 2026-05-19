# Chapter 19 — TypeScript Standards

> TypeScript is not just JavaScript with types.  
> It is a design tool. Types are documentation that the compiler enforces.  
> If your types are `any`, you have JavaScript with extra steps.

---

## 19.1 — When to Use TypeScript

**Use TypeScript when:**
- Team size > 1 person
- Project lifetime > 3 months
- Public API or library
- Complex data transformations
- Strict correctness requirements

**Use JavaScript + JSDoc when:**
- Solo project, short timeline
- Rapid prototyping
- Team is not TypeScript-fluent

**Forge Rules support both.** This chapter covers TypeScript-specific patterns.

---

## 19.2 — tsconfig.json Standard

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",

    /* Strict mode — ALL of these must be true */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    /* Output */
    "outDir": "./dist",
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

**Rules:**
```
✓ strict: true — always. No exceptions.
✓ noUncheckedIndexedAccess: true — array[0] is T | undefined, not T
✓ noImplicitReturns: true — every code path must return
✗ NEVER disable strict mode for "convenience"
✗ NEVER use @ts-ignore without a comment explaining why
✗ NEVER use @ts-nocheck
```

---

## 19.3 — Type Definitions (Layer 2)

**Replace JSDoc with TypeScript interfaces and enums:**

```typescript
// src/types/product.types.ts

// ── Enums ─────────────────────────────────────────────────────
// Use const enums for tree-shaking, regular enums for runtime access
export const ProductStatus = {
  ACTIVE:   'active',
  INACTIVE: 'inactive',
  DRAFT:    'draft',
  ARCHIVED: 'archived',
} as const

export type ProductStatus = typeof ProductStatus[keyof typeof ProductStatus]
// Result: 'active' | 'inactive' | 'draft' | 'archived'

// ── Interfaces ────────────────────────────────────────────────
export interface Product {
  readonly id:        string          // UUID v4 — never mutate
  name:               string          // max 120 chars
  sku:                string          // unique per user
  categoryId:         string | null
  price:              number          // IDR, integer (no decimals)
  stock:              number          // min 0
  reorderPoint:       number          // default 5
  status:             ProductStatus
  notes:              string | null
  readonly createdAt: string          // ISO 8601
  updatedAt:          string          // ISO 8601
}

// ── Utility types ─────────────────────────────────────────────
export type CreateProductPayload = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateProductPayload = Partial<Omit<Product, 'id' | 'createdAt'>>
export type ProductSummary = Pick<Product, 'id' | 'name' | 'sku' | 'status' | 'stock'>

// ── API response types ────────────────────────────────────────
export interface ApiResponse<T> {
  data:   T | null
  error:  string | null
  status: number | null
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total:       number
    page:        number
    pageSize:    number
    totalPages:  number
  }
}
```

---

## 19.4 — Component Props Typing

```typescript
// ── Props interface ───────────────────────────────────────────
interface ProductListProps {
  // Required props first
  products:     Product[]
  onEdit:       (product: Product) => void
  onDelete:     (product: Product) => void

  // Optional props with defaults
  isLoading?:   boolean
  error?:       string | null
  onCreate?:    () => void
  onRetry?:     () => void
  className?:   string
}

// ── Component with typed props ────────────────────────────────
export function ProductList({
  products,
  onEdit,
  onDelete,
  isLoading = false,
  error = null,
  onCreate,
  onRetry,
  className = '',
}: ProductListProps) {
  // ...
}

// ── Children prop ─────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode  // Use ReactNode for any renderable content
  className?: string
}

// ── Event handler types ───────────────────────────────────────
interface ButtonProps {
  onClick?:  React.MouseEventHandler<HTMLButtonElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

// ── Ref forwarding ────────────────────────────────────────────
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
      {error && <p>{error}</p>}
    </div>
  )
)
```

---

## 19.5 — Hook Typing

```typescript
// ── Return type interface ─────────────────────────────────────
interface UseInventoryReturn {
  // Data
  products:       Product[]
  allProducts:    Product[]
  metrics:        InventoryMetrics

  // Status
  isLoading:      boolean
  error:          string | null
  isEmpty:        boolean
  isFilteredEmpty: boolean

  // Pagination
  pagination:     PaginationState

  // Filter/sort
  query:          string
  sortKey:        string
  sortDir:        'asc' | 'desc'

  // CRUD
  createProduct:  (payload: CreateProductPayload) => Promise<{ success: boolean; data?: Product }>
  updateProduct:  (id: string, payload: UpdateProductPayload) => Promise<{ success: boolean }>
  deleteProduct:  (id: string) => Promise<{ success: boolean }>
  refetch:        () => void

  // Handlers
  handleSearch:   (query: string) => void
  handleSort:     (key: string) => void
  handlePageChange: (page: number) => void
}

// ── Hook with explicit return type ───────────────────────────
export function useInventory(options?: UseInventoryOptions): UseInventoryReturn {
  // ...
}

// ── Generic hooks ─────────────────────────────────────────────
function useAsync<T>(
  asyncFn: () => Promise<T>
): {
  data:      T | null
  isLoading: boolean
  error:     string | null
  execute:   () => Promise<void>
} {
  // ...
}
```

---

## 19.6 — Service Typing

```typescript
// src/services/product.service.ts

import type { Product, CreateProductPayload, UpdateProductPayload, ApiResponse, PaginatedResponse } from '@/types/product.types'

export async function fetchProducts(
  params?: FetchProductsParams
): Promise<PaginatedResponse<Product>> {
  // ...
}

export async function createProduct(
  payload: CreateProductPayload
): Promise<ApiResponse<Product>> {
  // ...
}

export async function updateProduct(
  id: string,
  payload: UpdateProductPayload
): Promise<ApiResponse<Product>> {
  // ...
}

export async function deleteProduct(
  id: string
): Promise<ApiResponse<{ success: boolean }>> {
  // ...
}
```

---

## 19.7 — Type Anti-Patterns (Forbidden)

```typescript
// ✗ NEVER use `any` — it defeats the purpose of TypeScript
const data: any = fetchData()
function process(input: any) { }

// ✓ Use `unknown` for truly unknown types, then narrow
const data: unknown = fetchData()
if (typeof data === 'string') { /* now it's string */ }

// ✗ NEVER use non-null assertion without certainty
const element = document.getElementById('root')!  // Could be null

// ✓ Check first
const element = document.getElementById('root')
if (!element) throw new Error('Root element not found')

// ✗ NEVER use type casting to silence errors
const value = (someValue as string).toUpperCase()

// ✓ Narrow properly
if (typeof someValue === 'string') {
  const upper = someValue.toUpperCase()
}

// ✗ NEVER use object type
function process(data: object) { }

// ✓ Use specific interface or Record
function process(data: Record<string, unknown>) { }
function process(data: Product) { }

// ✗ NEVER use Function type
const handler: Function = () => {}

// ✓ Use specific function signature
const handler: (id: string) => void = (id) => {}

// ✗ NEVER ignore TypeScript errors with @ts-ignore without explanation
// @ts-ignore
someFunction()

// ✓ Use @ts-expect-error with explanation (or fix the actual issue)
// @ts-expect-error: Library type definition is incorrect, tracked in #142
someFunction()
```

---

## 19.8 — Migrating from JavaScript to TypeScript

**Step-by-step migration (don't do it all at once):**

```
Step 1: Add tsconfig.json with allowJs: true
Step 2: Rename files one at a time: .js → .ts, .jsx → .tsx
Step 3: Fix type errors in renamed files
Step 4: Add types to Layer 2 (types/) first
Step 5: Add types to Layer 4 (utils/) — easiest, pure functions
Step 6: Add types to Layer 5 (hooks/)
Step 7: Add types to Layer 6 (services/)
Step 8: Add types to Layer 7 (components/)
Step 9: Add types to Layer 8 (features/)
Step 10: Remove allowJs: true, enable strict mode
```

**File naming:**
```
JavaScript:   formatters.js    → TypeScript: formatters.ts
JSX:          Button.jsx       → TSX:        Button.tsx
Types:        product.types.js → TypeScript: product.types.ts
```

---

## 19.9 — TypeScript + Tailwind

```typescript
// Type-safe className utility with clsx + tailwind-merge
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// Usage:
<div className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'danger' && 'danger-class',
  className  // user-provided classes, merged correctly
)} />
```

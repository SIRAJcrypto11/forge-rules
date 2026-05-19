# CONVENTIONS: [Project Name]
**Version:** 1.0.0  
**Last updated:** [Date]

> This document defines the coding conventions for this project.  
> All contributors must follow these conventions.  
> When in doubt: be consistent with existing code.

---

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Page | PascalCase + `Page` | `InventoryPage.jsx` |
| Component | PascalCase | `ProductCard.jsx` |
| Hook | camelCase + `use` | `useProducts.js` |
| Util | camelCase | `formatters.js` |
| Service | camelCase + `Service` | `productService.js` |
| Type | camelCase + `.types` | `product.types.js` |
| Data | camelCase + `.data` | `products.data.js` |
| Test | same + `.test` | `ProductCard.test.jsx` |
| E2E | feature + `.spec` | `inventory.spec.ts` |

---

## Import Order

Every file follows this import order:

```js
// 1. External libraries
import { useState, useMemo } from 'react'
import { TrendingUp } from 'lucide-react'

// 2. Internal config / utils / hooks
import { ROUTES } from '@/config/routes'
import { formatCurrency } from '@/utils/formatters'
import { useFilter } from '@/hooks/useFilter'

// 3. Shared components
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/Button'

// 4. Feature-local imports (only inside features/)
import { useInventory } from './hooks/useInventory'
import { ProductList } from './components/ProductList'
```

---

## Path Aliases

Always use `@/` alias. Never use relative paths going up more than one level.

```js
// ✅ Correct
import { formatCurrency } from '@/utils/formatters'
import { Button } from '@/components/ui/Button'

// ❌ Wrong
import { formatCurrency } from '../../../utils/formatters'
import { Button } from '../../components/ui/Button'
```

---

## Component Structure

Every JSX file follows the 9-block structure (see `rules/04-component-architecture.md`):

1. External imports
2. Internal imports
3. Shared component imports
4. Local constants
5. Internal sub-components
6. Main component
7. Skeleton state
8. Empty state
9. Default export

---

## Naming Conventions

See `rules/10-naming-conventions.md` for complete reference.

**Quick reference:**
```
Constants:    SCREAMING_SNAKE_CASE  → MAX_FILE_SIZE
Variables:    camelCase             → grossMarginPct
Functions:    camelCase verb+noun   → calcGrossMargin
Components:   PascalCase            → ProductCard
Hooks:        camelCase use+Noun    → useProductFilter
CSS vars:     --kebab-case          → --color-accent
Booleans:     is/has/can prefix     → isLoading, hasError
Handlers:     on+Verb (props)       → onClick, onDelete
              handle+Noun+Verb (internal) → handleProductDelete
```

---

## Git Conventions

**Branch naming:** `type/short-description`
```
feat/inventory-search
fix/cart-quantity-overflow
chore/update-dependencies
```

**Commit messages:** Conventional Commits
```
feat(inventory): add bulk export to CSV
fix(cart): prevent negative quantity on decrement
chore(deps): update react-router-dom to 6.26.0
```

**PR size:** Ideal < 400 lines, maximum 800 lines.

---

## Code Quality Rules

```
✓ No console.log in production code
✓ No TODO without ticket reference
✓ No commented-out code
✓ No hardcoded values outside config/
✓ No hardcoded colors in components
✓ All functions have JSDoc
✓ All functions handle null/undefined
✓ All components handle loading, empty, error states
✓ All event handlers use useCallback
✓ All derived values use useMemo
```

---

## Testing Conventions

```
Test files: co-located in __tests__/ folder
Test naming: "shows X when Y" or "calls X when Y"
Query priority: getByRole > getByLabelText > getByText > getByTestId
Coverage targets: utils 100%, hooks 90%, components 85%
```

---

## Environment Variables

All env vars documented in `.env.example`.  
Client-side vars use `VITE_` prefix.  
Never commit `.env` files.

---

*For questions about conventions, open a discussion in the repository.*

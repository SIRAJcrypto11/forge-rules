# Chapter 1 — The Iron Laws

> These are supreme. They override all other decisions.  
> If any other rule conflicts with an Iron Law, the Iron Law wins.

---

```
╔══════════════════════════════════════════════════════════════╗
║  IRON LAW #1: ONE FILE = ONE RESPONSIBILITY. ALWAYS.         ║
║  IRON LAW #2: UI RENDERS DATA. IT NEVER CREATES IT.         ║
║  IRON LAW #3: MODULES ARE ISLANDS. THEY DON'T TALK.         ║
║  IRON LAW #4: SHOW SOMETHING INSTANTLY. ALWAYS.             ║
║  IRON LAW #5: EVERY INTERACTION HAS A RESPONSE.             ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Law #1 — One File = One Responsibility

Each file does exactly one thing.  
If you can't describe a file's purpose in 5 words, split it.

**Examples:**

| Description | File | Verdict |
|-------------|------|---------|
| "Formats currency values for display" | `formatters.js` | ✅ |
| "Renders a single product card" | `ProductCard.jsx` | ✅ |
| "Manages cart state and quantity logic" | `useCart.js` | ✅ |
| "Does all the product stuff" | `products.js` | ❌ SPLIT IT |

**The 5-word test:** Before creating or editing a file, write its purpose in 5 words or fewer. If you can't, the file is doing too much.

**Signs a file needs splitting:**
- It has more than one `export default`
- It imports from more than 4 different layers
- Its name contains "and" or "or" (e.g., `authAndUser.js`)
- It exceeds its line limit (see Chapter 4)

---

## Law #2 — UI Renders Data. It Never Creates It.

Components receive data as props or from hooks.  
Components never compute business logic.  
Components never call APIs.  
Components never transform raw data.

**If a component is doing math: MOVE IT to `utils/` or `hooks/`.**

```jsx
// ❌ VIOLATION — component computing business logic
function RevenueCard({ orders }) {
  const total = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.amount * (1 - o.discountRate), 0)
  
  return <div>{total}</div>
}

// ✅ CORRECT — component renders, hook computes
function RevenueCard({ totalRevenue }) {
  return <div>{formatCurrency(totalRevenue)}</div>
}

// In useRevenue.js hook:
const totalRevenue = useMemo(() => calcNetRevenue(orders), [orders])
```

**The test:** Can you render this component with a single static prop value? If yes, it's clean. If it needs to "figure things out" first, it's violating Law #2.

---

## Law #3 — Modules Are Islands. They Don't Talk.

A feature module (`features/inventory/`) **never imports** directly from another feature module (`features/sales/`).

**If two modules need to share data, choose one:**
- Lift state to global context (`src/context/`)
- Create a shared hook in `src/hooks/`
- Use an event bus pattern
- Create a shared component in `src/components/shared/`

```js
// ❌ VIOLATION — cross-feature import
// src/features/sales/components/SalesForm.jsx
import { useInventory } from '../inventory/hooks/useInventory'

// ✅ CORRECT — shared hook in src/hooks/
// src/hooks/useProductStock.js  ← shared between features
import { useProductStock } from '@/hooks/useProductStock'
```

**Why this matters:** Cross-feature imports create invisible coupling. When you change `inventory`, you break `sales`. When you delete a feature, you get cascading errors. Islands stay independent.

---

## Law #4 — Show Something Instantly. Always.

The user must see **content** within 100ms of navigation.  
No blank white screens. No full-page spinners.

**Every loading state uses skeleton screens** that match the exact shape of the real content.  
Demo mode uses static data: zero network dependency.

```
Timeline of a page load:
  0ms    → Navigation triggered
  0-50ms → Shell renders (sidebar, topbar — already loaded)
  50ms   → Skeleton screens appear (matching content shape)
  50-800ms → Real data loads
  800ms  → Skeleton fades out, real content fades in
```

**The test:** Open your app on a throttled 3G connection. If you see a blank white screen or a full-page spinner at any point, Law #4 is violated.

---

## Law #5 — Every Interaction Has a Response.

Every button click, every hover, every focus, every form submission must have **visual feedback**.

**Silent UI is broken UI.**  
If you can interact with it, it must respond visibly.

| Interaction | Required Response |
|-------------|-------------------|
| Button hover | Background color change (150ms) |
| Button click | Scale down to 98% (80ms) |
| Button loading | Spinner replaces text, width locked |
| Form submit | Button enters loading state |
| Form error | Field shakes + red border + error message |
| Form success | Success state + toast notification |
| Delete action | Item animates out + undo toast |
| Toggle | Immediate visual state change |
| Keyboard focus | Visible focus ring (never hidden) |

**The test:** Tab through your entire app using only the keyboard. Every interactive element must show a visible focus state. Click every button. Every action must have a visible response within 80ms.

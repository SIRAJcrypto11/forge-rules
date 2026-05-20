# Chapter 23 — Frontend API Design Patterns

> The API layer is the contract between your frontend and the world.  
> A well-designed API layer makes the rest of the app simple.  
> A poorly designed one makes everything complicated.

---

## 23.1 — API Client Architecture

**Rule: One base client. All services extend it. Never call fetch directly in services.**

```javascript
// src/services/api.service.js — The single API client

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT) || 10000
const MAX_RETRIES = 3

// Token management
let authToken = null
export function setAuthToken(token) { authToken = token }
export function clearAuthToken() { authToken = null }

// Exponential backoff delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function request(endpoint, options = {}, retryCount = 0) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
      ...options.headers,
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: options.signal ?? controller.signal,
    })

    clearTimeout(timeoutId)

    // Parse body (handle empty responses)
    const body = response.status !== 204
      ? await response.json().catch(() => null)
      : null

    if (!response.ok) {
      // 401: token expired — trigger re-auth
      if (response.status === 401) {
        clearAuthToken()
        window.dispatchEvent(new CustomEvent('auth:expired'))
      }

      return {
        data: null,
        error: body?.error ?? `HTTP ${response.status}`,
        status: response.status,
        fields: body?.fields ?? null,  // Validation field errors
      }
    }

    return {
      data: body?.data ?? body,
      error: null,
      status: response.status,
      meta: body?.meta ?? null,  // Pagination metadata
    }

  } catch (err) {
    clearTimeout(timeoutId)

    if (err.name === 'AbortError') {
      return { data: null, error: 'Request timed out. Please try again.', status: null }
    }

    if (!navigator.onLine) {
      return { data: null, error: 'No internet connection.', status: null }
    }

    // Retry on network errors (not on HTTP errors)
    if (retryCount < MAX_RETRIES) {
      await delay(Math.pow(2, retryCount) * 1000)
      return request(endpoint, options, retryCount + 1)
    }

    return { data: null, error: 'Connection failed. Please try again.', status: null }
  }
}

export const apiClient = {
  get:    (endpoint, params, signal) => {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params)}`
      : endpoint
    return request(url, { method: 'GET', signal })
  },
  post:   (endpoint, body, signal) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body), signal }),
  put:    (endpoint, body, signal) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body), signal }),
  patch:  (endpoint, body, signal) =>
    request(endpoint, { method: 'PATCH', body: JSON.stringify(body), signal }),
  delete: (endpoint, signal) =>
    request(endpoint, { method: 'DELETE', signal }),
}
```

---

## 23.2 — Service Layer Pattern

```javascript
// src/services/product.service.js
// Rule: Services are thin wrappers. No business logic. No state.

import { apiClient } from './api.service'
import { API_ENDPOINTS } from '@/config/api'

/**
 * Fetches paginated product list with optional filters.
 * @param {Object} params - Query parameters
 * @returns {Promise<{ data: Product[], meta: PaginationMeta, error: string|null }>}
 */
export async function fetchProducts(params = {}) {
  return apiClient.get(API_ENDPOINTS.PRODUCTS, params)
}

export async function fetchProductById(id) {
  if (!id) return { data: null, error: 'Product ID is required' }
  return apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${id}`)
}

export async function createProduct(payload) {
  return apiClient.post(API_ENDPOINTS.PRODUCTS, payload)
}

export async function updateProduct(id, payload) {
  return apiClient.patch(`${API_ENDPOINTS.PRODUCTS}/${id}`, payload)
}

export async function deleteProduct(id) {
  return apiClient.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`)
}

export async function recordStockMovement(productId, payload) {
  return apiClient.post(
    `${API_ENDPOINTS.PRODUCTS}/${productId}/stock-movements`,
    payload
  )
}
```

---

## 23.3 — React Query Integration

**Rule: Use React Query for ALL server state. It handles caching, deduplication, background refetch, and stale data.**

```javascript
// src/hooks/queries/useProductsQuery.js
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '@/services/product.service'
import { useToast } from '@/hooks/useToast'

// Query keys — centralized to prevent typos and enable precise invalidation
export const PRODUCT_KEYS = {
  all:    () => ['products'],
  lists:  () => [...PRODUCT_KEYS.all(), 'list'],
  list:   (filters) => [...PRODUCT_KEYS.lists(), filters],
  detail: (id) => [...PRODUCT_KEYS.all(), 'detail', id],
}

/**
 * Fetches paginated product list.
 * Keeps previous data while fetching new page (no loading flash on pagination).
 */
export function useProductsQuery(filters = {}) {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(filters),
    queryFn:  () => fetchProducts(filters),
    placeholderData: keepPreviousData,  // No loading flash on filter/page change
    staleTime: 5 * 60 * 1000,          // 5 minutes
    gcTime:    10 * 60 * 1000,         // 10 minutes
    select: (response) => ({
      products: response.data ?? [],
      meta:     response.meta ?? { total: 0, page: 1, pageSize: 25, totalPages: 1 },
    }),
  })
}

/**
 * Fetches single product by ID.
 */
export function useProductQuery(id) {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn:  () => fetchProductById(id),
    enabled:  !!id,  // Don't fetch if no ID
    staleTime: 5 * 60 * 1000,
    select: (response) => response.data,
  })
}

/**
 * Create product mutation with optimistic update.
 */
export function useCreateProductMutation() {
  const queryClient = useQueryClient()
  const { addToast } = useToast()

  return useMutation({
    mutationFn: createProduct,

    onMutate: async (payload) => {
      // Cancel in-flight queries to prevent overwrite
      await queryClient.cancelQueries({ queryKey: PRODUCT_KEYS.lists() })

      // Snapshot for rollback
      const previousData = queryClient.getQueriesData({ queryKey: PRODUCT_KEYS.lists() })

      // Optimistic update: add temp item to all list caches
      const tempId = `temp-${Date.now()}`
      queryClient.setQueriesData(
        { queryKey: PRODUCT_KEYS.lists() },
        (old) => old ? {
          ...old,
          data: [{ ...payload, id: tempId, createdAt: new Date().toISOString() }, ...(old.data ?? [])],
        } : old
      )

      return { previousData, tempId }
    },

    onSuccess: (response, _payload, context) => {
      if (response.error) {
        // API returned error — revert
        queryClient.setQueriesData(
          { queryKey: PRODUCT_KEYS.lists() },
          (old) => old ? {
            ...old,
            data: (old.data ?? []).filter(p => p.id !== context.tempId),
          } : old
        )
        addToast(response.error, 'error')
        return
      }

      // Replace temp with real data
      queryClient.setQueriesData(
        { queryKey: PRODUCT_KEYS.lists() },
        (old) => old ? {
          ...old,
          data: (old.data ?? []).map(p => p.id === context.tempId ? response.data : p),
        } : old
      )

      // Invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() })
      addToast(`"${response.data.name}" added to inventory`, 'success')
    },

    onError: (_err, _payload, context) => {
      // Revert optimistic update
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      addToast('Failed to create product. Please try again.', 'error')
    },
  })
}

/**
 * Delete product mutation with optimistic update.
 */
export function useDeleteProductMutation() {
  const queryClient = useQueryClient()
  const { addToast } = useToast()

  return useMutation({
    mutationFn: deleteProduct,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: PRODUCT_KEYS.lists() })
      const previousData = queryClient.getQueriesData({ queryKey: PRODUCT_KEYS.lists() })
      const product = queryClient
        .getQueriesData({ queryKey: PRODUCT_KEYS.lists() })
        .flatMap(([, data]) => data?.data ?? [])
        .find(p => p.id === id)

      queryClient.setQueriesData(
        { queryKey: PRODUCT_KEYS.lists() },
        (old) => old ? {
          ...old,
          data: (old.data ?? []).filter(p => p.id !== id),
          meta: old.meta ? { ...old.meta, total: Math.max(0, old.meta.total - 1) } : old.meta,
        } : old
      )

      return { previousData, product }
    },

    onSuccess: (_response, _id, context) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() })
      addToast(`"${context.product?.name}" deleted`, 'success')
    },

    onError: (_err, _id, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      addToast('Failed to delete product. Please try again.', 'error')
    },
  })
}
```

---

## 23.4 — Cache Invalidation Strategy

```javascript
// Rule: Invalidate precisely. Never invalidate everything.

// ✅ CORRECT: Invalidate only affected queries
queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() })

// ✅ CORRECT: Invalidate specific item after update
queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.detail(id) })

// ✅ CORRECT: Update cache directly (no refetch needed)
queryClient.setQueryData(PRODUCT_KEYS.detail(id), updatedProduct)

// ❌ WRONG: Invalidate everything (causes unnecessary refetches)
queryClient.invalidateQueries()

// ❌ WRONG: Invalidate all products (includes details that didn't change)
queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all() })
```

---

## 23.5 — Real-Time / WebSocket Patterns

```javascript
// src/hooks/useRealtimeProducts.js
// For apps that need real-time updates (Supabase Realtime, Socket.io, etc.)

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/services/supabase.service'
import { PRODUCT_KEYS } from './queries/useProductsQuery'

export function useRealtimeProducts() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            // Update specific item in cache
            queryClient.setQueryData(
              PRODUCT_KEYS.detail(payload.new.id),
              payload.new
            )
            // Invalidate lists to reflect new/updated item
            queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() })
          }

          if (payload.eventType === 'DELETE') {
            // Remove from cache
            queryClient.removeQueries({ queryKey: PRODUCT_KEYS.detail(payload.old.id) })
            queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])
}
```

---

## 23.6 — API Design Rules

```
✓ One base API client (api.service.js) — all services use it
✓ Services return { data, error, status } — never throw
✓ React Query for all server state
✓ Query keys centralized in ENTITY_KEYS object
✓ Optimistic updates with rollback on error
✓ Precise cache invalidation (not invalidate-all)
✓ keepPreviousData for pagination (no loading flash)
✓ AbortController for request cancellation
✓ Exponential backoff retry (max 3 attempts)
✓ 401 triggers auth:expired event

✗ NEVER call fetch directly in components
✗ NEVER call fetch directly in hooks
✗ NEVER duplicate server state in useState
✗ NEVER invalidate all queries
✗ NEVER forget to cancel requests on unmount
✗ NEVER ignore the error field in responses
✗ NEVER show raw API errors to users
```

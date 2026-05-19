/**
 * SERVICE TEMPLATE — Master Rules v2.0
 * Copy this file, rename it, and fill in the blanks.
 *
 * File: src/services/[domain].service.js
 * Rules:
 *   - ONLY layer that talks to the outside world
 *   - Never import from components/ or features/
 *   - All calls: try/catch + consistent response shape
 *   - Response shape: { data, error, status }
 *   - API keys from environment variables ONLY
 *   - UI never imports services directly → always via hooks
 */

import { apiService } from './api.service'
// [TEMPLATE] Import types for JSDoc:
// import { EntityStatus } from '@/types/entity.types'

// ─────────────────────────────────────────────────────────────
// [TEMPLATE] Replace 'entity' with your domain (product, order, user, etc.)
// ─────────────────────────────────────────────────────────────

/**
 * Fetches a paginated list of entities.
 * @param {Object} [params={}]
 * @param {number} [params.page=1]
 * @param {number} [params.pageSize=25]
 * @param {string} [params.query='']
 * @param {string} [params.sortKey='createdAt']
 * @param {string} [params.sortDir='desc']
 * @returns {Promise<{ data: { items: Array, total: number } | null, error: string | null }>}
 */
export async function fetchEntities(params = {}) {
  const {
    page = 1,
    pageSize = 25,
    query = '',
    sortKey = 'createdAt',
    sortDir = 'desc'
  } = params

  return apiService.get('/entities', {
    page,
    pageSize,
    q: query,
    sort: `${sortKey}:${sortDir}`
  })
}

/**
 * Fetches a single entity by ID.
 * @param {string} id - Entity UUID
 * @returns {Promise<{ data: Object | null, error: string | null }>}
 */
export async function fetchEntityById(id) {
  if (!id) return { data: null, error: 'ID is required' }
  return apiService.get(`/entities/${id}`)
}

/**
 * Creates a new entity.
 * @param {Object} payload - Entity data (validated before calling)
 * @returns {Promise<{ data: Object | null, error: string | null }>}
 */
export async function createEntity(payload) {
  if (!payload) return { data: null, error: 'Payload is required' }
  return apiService.post('/entities', payload)
}

/**
 * Updates an existing entity.
 * @param {string} id - Entity UUID
 * @param {Object} payload - Fields to update (partial update)
 * @returns {Promise<{ data: Object | null, error: string | null }>}
 */
export async function updateEntity(id, payload) {
  if (!id) return { data: null, error: 'ID is required' }
  if (!payload) return { data: null, error: 'Payload is required' }
  return apiService.patch(`/entities/${id}`, payload)
}

/**
 * Deletes an entity by ID.
 * @param {string} id - Entity UUID
 * @returns {Promise<{ data: { success: boolean } | null, error: string | null }>}
 */
export async function deleteEntity(id) {
  if (!id) return { data: null, error: 'ID is required' }
  return apiService.delete(`/entities/${id}`)
}

/**
 * Bulk updates entity status.
 * @param {string[]} ids - Array of entity UUIDs
 * @param {string} status - New status value
 * @returns {Promise<{ data: { updated: number } | null, error: string | null }>}
 */
export async function bulkUpdateEntityStatus(ids, status) {
  if (!ids?.length) return { data: null, error: 'IDs are required' }
  if (!status) return { data: null, error: 'Status is required' }
  return apiService.patch('/entities/bulk-status', { ids, status })
}

// [TEMPLATE] Add domain-specific operations below:
// export async function exportEntitiesToCSV(filters) { ... }
// export async function importEntitiesFromCSV(file) { ... }

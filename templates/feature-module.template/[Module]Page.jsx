/**
 * @file src/features/[module]/[Module]Page.jsx
 * @layer Layer 8 — Features
 * @purpose Orchestrator page. Wires hooks to components. Contains NO business logic.
 * @imports-from Layer 5 (hooks), Layer 7 (components/layout, components/shared)
 * @exports [Module]Page (default)
 * Max lines: 200
 */

// ── BLOCK 1: External imports ─────────────────────────────────
import { useState, useCallback } from 'react'
import { Plus } from 'lucide-react'

// ── BLOCK 2: Internal imports ─────────────────────────────────
import { ROUTES } from '@/config/routes'

// ── BLOCK 3: Layout + shared component imports ────────────────
import { PageHeader } from '@/components/layout/PageHeader'
import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'

// ── BLOCK 4: Feature-internal imports ────────────────────────
import { use[Module] } from './hooks/use[Module]'
import { [Entity]List } from './components/[Entity]List'
import { [Entity]Form } from './components/[Entity]Form'

// ── BLOCK 5: Local constants ──────────────────────────────────
// (none needed for page orchestrators — keep them clean)

// ── BLOCK 6: Main component ───────────────────────────────────
/**
 * [Module] page — orchestrates the [module] feature.
 * Calls use[Module] hook and passes data down as props.
 * Contains NO business logic — only wiring.
 */
export default function [Module]Page() {
  // ── 6a. Feature hook (single source of truth) ────────────────
  const {
    [entity]s,
    isLoading,
    error,
    pagination,
    query,
    handleSearch,
    handleSort,
    handlePageChange,
    create[Entity],
    update[Entity],
    delete[Entity],
    refetch,
  } = use[Module]()

  // ── 6b. Local UI state (modal open/close only) ───────────────
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deletingItem, setDeletingItem] = useState(null)

  // ── 6c. Handlers ─────────────────────────────────────────────
  const handleCreate = useCallback(() => {
    setEditingItem(null)
    setIsFormOpen(true)
  }, [])

  const handleEdit = useCallback((item) => {
    setEditingItem(item)
    setIsFormOpen(true)
  }, [])

  const handleDeleteRequest = useCallback((item) => {
    setDeletingItem(item)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (!deletingItem) return
    await delete[Entity](deletingItem.id)
    setDeletingItem(null)
  }, [deletingItem, delete[Entity]])

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false)
    setEditingItem(null)
  }, [])

  const handleFormSubmit = useCallback(async (values) => {
    if (editingItem) {
      await update[Entity](editingItem.id, values)
    } else {
      await create[Entity](values)
    }
    handleFormClose()
  }, [editingItem, create[Entity], update[Entity], handleFormClose])

  // ── 6d. Main render ───────────────────────────────────────────
  return (
    <PageContainer>
      <PageHeader
        title="[Module Title]"
        description="[Brief description of what this page manages]"
        actions={
          <Button onClick={handleCreate}>
            <Plus size={16} aria-hidden="true" />
            Add [Entity]
          </Button>
        }
      />

      <[Entity]List
        [entity]s={[entity]s}
        isLoading={isLoading}
        error={error}
        pagination={pagination}
        query={query}
        onSearch={handleSearch}
        onSort={handleSort}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
        onCreate={handleCreate}
        onRetry={refetch}
      />

      {/* Create / Edit Form Modal */}
      <[Entity]Form
        isOpen={isFormOpen}
        item={editingItem}
        onSubmit={handleFormSubmit}
        onClose={handleFormClose}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingItem}
        title={`Delete "${deletingItem?.name}"?`}
        description="This action cannot be undone. All associated data will be permanently deleted."
        confirmLabel="Delete [Entity]"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingItem(null)}
        isDangerous
      />
    </PageContainer>
  )
}

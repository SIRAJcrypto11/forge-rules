/**
 * @file src/features/[module]/components/[Entity]List.jsx
 * @layer Layer 8 — Features
 * @purpose Renders filterable, sortable [entity] table with all states.
 * @imports-from Layer 4 (formatters), Layer 7 (components/shared, components/ui)
 * @exports [Entity]List (named), default [Entity]List
 * Max lines: 150
 */

// ── BLOCK 1: External imports ─────────────────────────────────
import { useCallback } from 'react'
import { Package, AlertCircle } from 'lucide-react'

// ── BLOCK 2: Internal imports ─────────────────────────────────
import { formatCurrency, formatDate } from '@/utils/formatters'
import { PAGINATION } from '@/config/constants'

// ── BLOCK 3: Shared component imports ────────────────────────
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Pagination } from '@/components/ui/Pagination'

// ── BLOCK 4: Local constants ──────────────────────────────────
// [TEMPLATE] Define columns for your entity
const COLUMNS = [
  { key: 'name',      label: 'Name',    sortable: true,  width: 'auto'  },
  { key: 'status',    label: 'Status',  sortable: false, width: '100px' },
  { key: 'createdAt', label: 'Created', sortable: true,  width: '120px' },
  { key: 'actions',   label: '',        sortable: false, width: '48px'  },
]

// ── BLOCK 5: Internal sub-components ─────────────────────────
// (none needed — DataTable handles row rendering)

// ── BLOCK 6: Main component ───────────────────────────────────
/**
 * Renders a filterable, sortable [entity] list with all states.
 *
 * @param {Object}   props
 * @param {Array}    props.[entity]s     - [Entity] array from use[Module] hook
 * @param {boolean}  props.isLoading     - Shows skeleton when true
 * @param {string}   props.error         - Shows error state when non-null
 * @param {Object}   props.pagination    - { currentPage, totalPages, totalItems, pageSize }
 * @param {string}   props.query         - Current search query
 * @param {Function} props.onSearch      - Called with search string
 * @param {Function} props.onSort        - Called with sort key
 * @param {Function} props.onPageChange  - Called with page number
 * @param {Function} props.onEdit        - Called with [entity] when edit clicked
 * @param {Function} props.onDelete      - Called with [entity] when delete clicked
 * @param {Function} props.onCreate      - Called when "Add [Entity]" clicked
 * @param {Function} props.onRetry       - Called when retry button clicked
 * @param {string}   [props.className='']
 */
export function [Entity]List({
  [entity]s,
  isLoading,
  error,
  pagination,
  query,
  onSearch,
  onSort,
  onPageChange,
  onEdit,
  onDelete,
  onCreate,
  onRetry,
  className = '',
}) {
  // ── 6a. Cell renderer ────────────────────────────────────────
  const renderCell = useCallback((column, item) => {
    switch (column.key) {
      case 'status':
        return <StatusBadge status={item.status} />
      case 'createdAt':
        return formatDate(item.createdAt, { relative: true })
      case 'actions':
        return (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onEdit?.(item)}
              aria-label={`Edit ${item.name}`}
              className="p-1 rounded hover:bg-accent-light text-text-2 hover:text-accent transition-colors duration-150"
            >
              {/* EditIcon size={14} */}
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(item)}
              aria-label={`Delete ${item.name}`}
              className="p-1 rounded hover:bg-danger-light text-text-2 hover:text-danger transition-colors duration-150"
            >
              {/* TrashIcon size={14} */}
            </button>
          </div>
        )
      default:
        return item[column.key] ?? '—'
    }
  }, [onEdit, onDelete])

  // ── 6b. Early returns for special states ─────────────────────
  if (error) return <[Entity]ListError error={error} onRetry={onRetry} />

  // ── 6c. Main render ───────────────────────────────────────────
  return (
    <div className={`space-y-4 ${className}`}>
      <FilterBar
        query={query}
        onSearch={onSearch}
        placeholder="Search [entity]s..."
        resultCount={pagination?.totalItems}
      />

      <DataTable
        columns={COLUMNS}
        rows={[entity]s}
        renderCell={renderCell}
        isLoading={isLoading}
        onSort={onSort}
        emptyState={<[Entity]ListEmpty onCreate={onCreate} />}
        aria-label="[Entity] list"
      />

      {!isLoading && pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

// ── BLOCK 7: Skeleton ─────────────────────────────────────────
// (handled by DataTable's isLoading prop)

// ── BLOCK 8: Empty state ──────────────────────────────────────
function [Entity]ListEmpty({ onCreate }) {
  return (
    <EmptyState
      icon={<Package size={48} aria-hidden="true" />}
      title="No [entity]s yet"
      description="Add your first [entity] to get started."
      action={onCreate ? { label: 'Add [Entity]', onClick: onCreate } : undefined}
    />
  )
}

// ── Error state (not a block — used in early return) ──────────
function [Entity]ListError({ error, onRetry }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      role="alert"
    >
      <AlertCircle size={48} className="text-danger mb-4" aria-hidden="true" />
      <h3 className="text-h4 text-text-1 mb-2">Failed to load [entity]s</h3>
      <p className="text-body text-text-2 mb-6 max-w-sm">
        {error || 'Something went wrong. Please try again.'}
      </p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn btn-secondary">
          Try again
        </button>
      )}
    </div>
  )
}

// ── BLOCK 9: Default export ───────────────────────────────────
export default [Entity]List

/**
 * @file src/features/[module]/components/[Entity]Form.jsx
 * @layer Layer 8 — Features
 * @purpose Create/edit form for [Entity]. Handles validation, loading, and error states.
 * @imports-from Layer 4 (validators), Layer 5 (useForm), Layer 7 (components/ui)
 * @exports [Entity]Form (named), default [Entity]Form
 * Max lines: 150
 */

// ── BLOCK 1: External imports ─────────────────────────────────
import { useEffect } from 'react'

// ── BLOCK 2: Internal imports ─────────────────────────────────
import { useForm } from '@/hooks/useForm'
import { validateRequired, validateMinLength } from '@/utils/validators'

// ── BLOCK 3: Shared component imports ────────────────────────
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
// [TEMPLATE] Add more form field components as needed:
// import { Select } from '@/components/ui/Select'
// import { Textarea } from '@/components/ui/Textarea'

// ── BLOCK 4: Local constants ──────────────────────────────────
// [TEMPLATE] Define initial values matching your entity shape
const INITIAL_VALUES = {
  name:   '',
  status: 'active',
  // [TEMPLATE] Add all editable fields
}

// [TEMPLATE] Define validation rules for each field
const VALIDATION_RULES = {
  name: (value) => {
    const required = validateRequired(value)
    if (!required.valid) return required.error
    const minLen = validateMinLength(value, 2)
    if (!minLen.valid) return minLen.error
    return null
  },
  // [TEMPLATE] Add validation for other fields
}

// ── BLOCK 5: Internal sub-components ─────────────────────────
// (none needed for forms)

// ── BLOCK 6: Main component ───────────────────────────────────
/**
 * Create/edit form for [Entity], rendered inside a Modal.
 *
 * @param {Object}        props
 * @param {boolean}       props.isOpen     - Controls modal visibility
 * @param {Object|null}   props.item       - Existing item for edit mode, null for create
 * @param {Function}      props.onSubmit   - Called with form values on valid submit
 * @param {Function}      props.onClose    - Called when modal should close
 */
export function [Entity]Form({ isOpen, item, onSubmit, onClose }) {
  const isEditMode = !!item

  const {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useForm(
    item ? { ...INITIAL_VALUES, ...item } : INITIAL_VALUES,
    VALIDATION_RULES
  )

  // Reset form when modal opens/closes or item changes
  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen, item, reset])

  // Warn user about unsaved changes before closing
  const handleClose = () => {
    if (isDirty) {
      const confirmed = window.confirm(
        'You have unsaved changes. Leave anyway?'
      )
      if (!confirmed) return
    }
    onClose()
  }

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Edit [Entity]' : 'Add [Entity]'}
      size="md"
    >
      <form
        onSubmit={(e) => { e.preventDefault(); handleFormSubmit() }}
        noValidate
        className="space-y-4"
      >
        {/* [TEMPLATE] Add form fields matching your entity */}
        <Input
          id="name"
          label="Name"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          error={touched.name ? errors.name : undefined}
          required
          autoFocus
          placeholder="Enter [entity] name"
        />

        {/* [TEMPLATE] Add more fields:
        <Select
          id="status"
          label="Status"
          value={values.status}
          onChange={(value) => handleChange('status', value)}
          onBlur={() => handleBlur('status')}
          error={touched.status ? errors.status : undefined}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />
        */}

        {/* Form footer — Cancel left, Submit right */}
        <div className="flex justify-between pt-4 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isEditMode ? 'Save Changes' : 'Add [Entity]'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

// ── BLOCK 7: Skeleton ─────────────────────────────────────────
// (Modal handles its own loading state)

// ── BLOCK 8: Empty state ──────────────────────────────────────
// (not applicable for forms)

// ── BLOCK 9: Default export ───────────────────────────────────
export default [Entity]Form

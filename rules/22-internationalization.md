# Chapter 22 — Internationalization (i18n)

> i18n is not translation. Translation is 20% of the work.  
> The other 80%: date formats, number formats, currency, pluralization,  
> text direction, locale-aware sorting, and cultural context.  
> Build for i18n from day one. Retrofitting is 10x harder.

---

## 22.1 — i18n Architecture

**Rule: All user-facing strings are externalized. Zero hardcoded strings in components.**

```
src/
├── i18n/
│   ├── index.js              ← i18n initialization
│   ├── locales/
│   │   ├── id.json           ← Bahasa Indonesia (default)
│   │   ├── en.json           ← English
│   │   └── [locale].json     ← Add more as needed
│   └── namespaces/
│       ├── common.json       ← Shared strings (buttons, labels)
│       ├── inventory.json    ← Inventory feature strings
│       ├── orders.json       ← Orders feature strings
│       └── errors.json       ← Error messages
```

**Recommended library: `react-i18next` (most widely used, excellent TypeScript support)**

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

---

## 22.2 — Setup

```javascript
// src/i18n/index.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import locale files
import idCommon    from './locales/id/common.json'
import idInventory from './locales/id/inventory.json'
import idErrors    from './locales/id/errors.json'
import enCommon    from './locales/en/common.json'
import enInventory from './locales/en/inventory.json'
import enErrors    from './locales/en/errors.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      id: {
        common:    idCommon,
        inventory: idInventory,
        errors:    idErrors,
      },
      en: {
        common:    enCommon,
        inventory: enInventory,
        errors:    enErrors,
      },
    },
    defaultNS: 'common',
    fallbackLng: 'id',  // Default to Indonesian
    supportedLngs: ['id', 'en'],
    interpolation: {
      escapeValue: false,  // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
```

---

## 22.3 — Translation File Structure

```json
// src/i18n/locales/id/common.json
{
  "actions": {
    "save":    "Simpan",
    "cancel":  "Batal",
    "delete":  "Hapus",
    "edit":    "Edit",
    "add":     "Tambah",
    "search":  "Cari",
    "filter":  "Filter",
    "export":  "Ekspor",
    "import":  "Impor",
    "confirm": "Konfirmasi"
  },
  "status": {
    "active":   "Aktif",
    "inactive": "Tidak Aktif",
    "draft":    "Draf",
    "archived": "Diarsipkan"
  },
  "pagination": {
    "showing": "Menampilkan {{from}}-{{to}} dari {{total}} item",
    "previous": "Sebelumnya",
    "next": "Berikutnya"
  },
  "empty": {
    "noData":    "Tidak ada data",
    "noResults": "Tidak ada hasil untuk \"{{query}}\""
  },
  "errors": {
    "generic":  "Terjadi kesalahan. Silakan coba lagi.",
    "network":  "Koneksi gagal. Periksa internet Anda.",
    "notFound": "Item tidak ditemukan.",
    "forbidden": "Anda tidak memiliki izin untuk melakukan ini."
  }
}
```

```json
// src/i18n/locales/id/inventory.json
{
  "title": "Inventaris",
  "product": {
    "singular": "produk",
    "plural":   "produk",
    "add":      "Tambah Produk",
    "edit":     "Edit Produk",
    "delete":   "Hapus Produk",
    "name":     "Nama Produk",
    "sku":      "SKU",
    "price":    "Harga",
    "stock":    "Stok",
    "status":   "Status",
    "category": "Kategori"
  },
  "empty": {
    "title":       "Belum ada produk",
    "description": "Tambahkan produk pertama Anda untuk mulai melacak inventaris.",
    "cta":         "Tambah Produk"
  },
  "stockStatus": {
    "inStock":    "Tersedia",
    "lowStock":   "Stok Menipis",
    "outOfStock": "Habis"
  },
  "messages": {
    "created": "\"{{name}}\" berhasil ditambahkan",
    "updated": "\"{{name}}\" berhasil diperbarui",
    "deleted": "\"{{name}}\" berhasil dihapus",
    "deleteConfirm": {
      "title":       "Hapus \"{{name}}\"?",
      "description": "Produk ini dan semua riwayat stoknya akan dihapus permanen. Tindakan ini tidak dapat dibatalkan."
    }
  }
}
```

---

## 22.4 — Usage in Components

```jsx
// ✅ CORRECT: Using useTranslation hook
import { useTranslation } from 'react-i18next'

export function ProductList({ products, isLoading, error, onCreate }) {
  const { t } = useTranslation('inventory')
  const { t: tCommon } = useTranslation('common')

  if (!products.length) {
    return (
      <EmptyState
        title={t('empty.title')}
        description={t('empty.description')}
        action={{ label: t('empty.cta'), onClick: onCreate }}
      />
    )
  }

  return (
    <div>
      {products.map(product => (
        <ProductRow key={product.id} product={product} />
      ))}
    </div>
  )
}

// ✅ Interpolation with variables
const message = t('messages.created', { name: product.name })
// → "\"Kemeja Oxford Navy\" berhasil ditambahkan"

// ✅ Pluralization
const { t } = useTranslation()
t('items', { count: 1 })   // → "1 produk"
t('items', { count: 5 })   // → "5 produk"

// In JSON:
// "items_one": "{{count}} produk",
// "items_other": "{{count}} produk"
// (Indonesian doesn't have plural forms, but English does)
```

---

## 22.5 — Locale-Aware Formatting

**Rule: NEVER hardcode locale in formatters. Always use the current locale.**

```javascript
// src/utils/formatters.js — locale-aware versions

/**
 * Formats currency based on current locale.
 * @param {number} amount - Amount in smallest unit
 * @param {string} [currency='IDR'] - ISO 4217 currency code
 * @param {string} [locale] - BCP 47 locale tag (auto-detected if not provided)
 */
export function formatCurrency(amount, currency = 'IDR', locale) {
  if (amount == null || isNaN(amount)) return '—'

  const activeLocale = locale ?? i18n.language ?? 'id-ID'

  // Map language codes to full locale tags
  const localeMap = { id: 'id-ID', en: 'en-US' }
  const fullLocale = localeMap[activeLocale] ?? activeLocale

  return new Intl.NumberFormat(fullLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'IDR' ? 0 : 2,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(amount)
}

// Results:
// id-ID + IDR: "Rp 1.250.000"
// en-US + IDR: "IDR 1,250,000"
// en-US + USD: "$1,250.00"

/**
 * Formats date based on current locale.
 */
export function formatDate(dateString, options = {}) {
  if (!dateString) return '—'

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '—'

  const locale = i18n.language === 'id' ? 'id-ID' : 'en-US'

  if (options.relative) {
    return formatRelativeTime(date, locale)
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: options.short ? 'short' : 'long',
    day: 'numeric',
    ...options,
  }).format(date)
}

// Results:
// id-ID: "19 Mei 2026"
// en-US: "May 19, 2026"

/**
 * Formats relative time ("3 hari yang lalu" / "3 days ago")
 */
function formatRelativeTime(date, locale) {
  const now = new Date()
  const diffMs = now - date
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (diffSecs < 60)  return rtf.format(-diffSecs, 'second')
  if (diffMins < 60)  return rtf.format(-diffMins, 'minute')
  if (diffHours < 24) return rtf.format(-diffHours, 'hour')
  if (diffDays < 30)  return rtf.format(-diffDays, 'day')

  return formatDate(date.toISOString(), { locale })
}

// Results:
// id-ID: "3 hari yang lalu", "kemarin", "baru saja"
// en-US: "3 days ago", "yesterday", "just now"

/**
 * Formats number with locale-appropriate separators.
 */
export function formatNumber(value, options = {}) {
  if (value == null || isNaN(value)) return '—'
  const locale = i18n.language === 'id' ? 'id-ID' : 'en-US'
  return new Intl.NumberFormat(locale, options).format(value)
}

// Results:
// id-ID: "1.250.000" (period as thousands separator)
// en-US: "1,250,000" (comma as thousands separator)
```

---

## 22.6 — Language Switcher

```jsx
// src/components/shared/LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'English',   flag: '🇺🇸' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  return (
    <div className="relative">
      <select
        value={currentLang}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label="Select language"
        className="appearance-none bg-surface border border-border rounded-lg px-3 py-2 pr-8 text-sm text-text-1 cursor-pointer hover:border-border-strong transition-colors"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
```

---

## 22.7 — i18n Rules

```
✓ All user-facing strings in translation files
✓ Use namespaces to organize strings by feature
✓ Use interpolation for dynamic values: t('key', { name })
✓ Use Intl API for dates, numbers, currencies
✓ Detect locale from browser, persist to localStorage
✓ Fallback to default locale (Indonesian) if translation missing
✓ Test with both locales before shipping

✗ NEVER hardcode strings in components
✗ NEVER hardcode locale ('id-ID') in formatters
✗ NEVER use string concatenation for translated sentences
   → ❌ t('hello') + ' ' + userName  (word order differs by language)
   → ✅ t('hello', { name: userName })
✗ NEVER assume date format (MM/DD vs DD/MM vs YYYY-MM-DD)
✗ NEVER assume number format (1,000 vs 1.000)
✗ NEVER assume currency symbol position ($100 vs 100$)
```

---

## 22.8 — i18n Checklist

```
□ react-i18next installed and configured
□ All strings externalized to locale files
□ Locale files organized by namespace (common, feature, errors)
□ formatCurrency uses Intl.NumberFormat with current locale
□ formatDate uses Intl.DateTimeFormat with current locale
□ formatRelativeTime uses Intl.RelativeTimeFormat
□ Language switcher component exists
□ Language preference persisted to localStorage
□ Fallback locale configured (Indonesian)
□ All features tested in both Indonesian and English
□ No hardcoded strings in any component
□ No hardcoded locale codes in formatters
```

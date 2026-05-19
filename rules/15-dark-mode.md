# Chapter 15 — Dark Mode Implementation

> Dark mode is not "invert the colors."  
> It is a complete second visual language that requires its own design decisions.

---

## 15.1 — Token-Based Theming Architecture

**Rule: ALL colors must use CSS custom properties (tokens). Zero hardcoded hex in components.**

The token system defined in Chapter 7 is designed for dual-theme support. Every semantic token has a light and dark value.

```css
/* src/styles/tokens.css */

:root {
  /* ── Light Theme (default) ── */

  /* Backgrounds */
  --color-bg:              #F8F9FA;
  --color-surface:         #FFFFFF;
  --color-sunken:          #F1F3F5;
  --color-surface-hover:   #F8F9FA;

  /* Borders */
  --color-border:          #E9ECEF;
  --color-border-strong:   #CED4DA;

  /* Text */
  --color-text-1:          #1A1D23;   /* Primary — near black */
  --color-text-2:          #495057;   /* Secondary */
  --color-text-3:          #868E96;   /* Tertiary / placeholder */
  --color-text-inverse:    #FFFFFF;

  /* Brand */
  --color-accent:          #3B82F6;
  --color-accent-hover:    #2563EB;
  --color-accent-active:   #1D4ED8;
  --color-accent-light:    #EFF6FF;
  --color-accent-text:     #FFFFFF;

  /* Semantic */
  --color-success:         #10B981;
  --color-success-light:   #ECFDF5;
  --color-success-text:    #065F46;

  --color-warning:         #F59E0B;
  --color-warning-light:   #FFFBEB;
  --color-warning-text:    #92400E;

  --color-danger:          #EF4444;
  --color-danger-light:    #FEF2F2;
  --color-danger-text:     #991B1B;

  --color-info:            #3B82F6;
  --color-info-light:      #EFF6FF;
  --color-info-text:       #1E40AF;

  /* Shadows */
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:   0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg:   0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04);
  --shadow-xl:   0 20px 25px rgba(0,0,0,0.10), 0 8px 10px rgba(0,0,0,0.04);
}

/* ── Dark Theme ── */
[data-theme="dark"] {
  /* Backgrounds — layered from darkest to lightest */
  --color-bg:              #0F1117;   /* Page background */
  --color-surface:         #1A1D27;   /* Cards, panels */
  --color-sunken:          #13151E;   /* Input bg, table header */
  --color-surface-hover:   #22263A;

  /* Borders — subtle in dark mode */
  --color-border:          #2A2D3E;
  --color-border-strong:   #3D4166;

  /* Text — never pure white */
  --color-text-1:          #E8EAF0;   /* Primary */
  --color-text-2:          #9BA3C0;   /* Secondary */
  --color-text-3:          #5C6480;   /* Tertiary */
  --color-text-inverse:    #0F1117;

  /* Brand — slightly lighter for dark bg contrast */
  --color-accent:          #60A5FA;
  --color-accent-hover:    #93C5FD;
  --color-accent-active:   #BFDBFE;
  --color-accent-light:    #1E3A5F;
  --color-accent-text:     #0F1117;

  /* Semantic — muted backgrounds, brighter text */
  --color-success:         #34D399;
  --color-success-light:   #064E3B;
  --color-success-text:    #A7F3D0;

  --color-warning:         #FBBF24;
  --color-warning-light:   #451A03;
  --color-warning-text:    #FDE68A;

  --color-danger:          #F87171;
  --color-danger-light:    #450A0A;
  --color-danger-text:     #FECACA;

  --color-info:            #60A5FA;
  --color-info-light:      #1E3A5F;
  --color-info-text:       #BFDBFE;

  /* Shadows — more prominent in dark mode */
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.20);
  --shadow-md:   0 4px 6px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.20);
  --shadow-lg:   0 10px 15px rgba(0,0,0,0.40), 0 4px 6px rgba(0,0,0,0.25);
  --shadow-xl:   0 20px 25px rgba(0,0,0,0.50), 0 8px 10px rgba(0,0,0,0.30);
}
```

---

## 15.2 — Theme Context

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage preference
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored

    // 2. Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'

    // 3. Default to light
    return 'light'
  })

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  const isDark = theme === 'dark'

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

---

## 15.3 — Theme Toggle Component

```jsx
// src/components/ui/ThemeToggle.jsx
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={`
        relative w-10 h-10 rounded-lg
        flex items-center justify-center
        text-text-2 hover:text-text-1
        hover:bg-surface-hover
        transition-colors duration-150
        ${className}
      `}
    >
      {isDark ? (
        <Sun size={20} aria-hidden="true" />
      ) : (
        <Moon size={20} aria-hidden="true" />
      )}
    </button>
  )
}
```

---

## 15.4 — Tailwind Dark Mode Configuration

```js
// tailwind.config.js
export default {
  // Use 'class' strategy — controlled by data-theme attribute
  darkMode: ['selector', '[data-theme="dark"]'],

  theme: {
    extend: {
      colors: {
        // Map Tailwind classes to CSS tokens
        bg:       'var(--color-bg)',
        surface:  'var(--color-surface)',
        sunken:   'var(--color-sunken)',
        border:   'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',

        'text-1': 'var(--color-text-1)',
        'text-2': 'var(--color-text-2)',
        'text-3': 'var(--color-text-3)',
        'text-inverse': 'var(--color-text-inverse)',

        accent:       'var(--color-accent)',
        'accent-hover':  'var(--color-accent-hover)',
        'accent-light':  'var(--color-accent-light)',
        'accent-text':   'var(--color-accent-text)',

        success:       'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        'success-text':  'var(--color-success-text)',

        warning:       'var(--color-warning)',
        'warning-light': 'var(--color-warning-light)',
        'warning-text':  'var(--color-warning-text)',

        danger:       'var(--color-danger)',
        'danger-light': 'var(--color-danger-light)',
        'danger-text':  'var(--color-danger-text)',
      },
      boxShadow: {
        sm:    'var(--shadow-sm)',
        md:    'var(--shadow-md)',
        lg:    'var(--shadow-lg)',
        xl:    'var(--shadow-xl)',
      }
    }
  }
}
```

---

## 15.5 — Dark Mode Rules

```
✓ All colors use CSS tokens — zero hardcoded hex in components
✓ Dark mode respects system preference by default
✓ User preference is persisted in localStorage
✓ Theme toggle is accessible (aria-label, aria-pressed)
✓ Transition between themes: 200ms ease on background and color
✓ Images: use CSS filter for dark mode adjustments if needed
✓ Charts: use theme-aware color palettes

✗ Never use pure black (#000000) as background in dark mode
✗ Never use pure white (#FFFFFF) as text in dark mode
✗ Never invert images (use separate dark-mode image variants)
✗ Never use opacity to "darken" — use proper dark tokens
✗ Never hardcode dark mode colors in components (use tokens)
```

**Theme transition (global CSS):**
```css
/* src/styles/global.css */
/* Smooth transition when switching themes */
*, *::before, *::after {
  transition:
    background-color 200ms ease,
    border-color 200ms ease,
    color 200ms ease;
}

/* Exception: don't transition animations (causes jank) */
[class*="animate-"],
[class*="transition-"] {
  transition: none;
}
```

---

## 15.6 — Dark Mode Image Handling

```jsx
// For images that need different versions per theme
function ThemedImage({ lightSrc, darkSrc, alt, ...props }) {
  const { isDark } = useTheme()
  return <img src={isDark ? darkSrc : lightSrc} alt={alt} {...props} />
}

// For logos and illustrations that need CSS adjustment
function Logo() {
  const { isDark } = useTheme()
  return (
    <img
      src="/logo.svg"
      alt="Company logo"
      className={isDark ? 'brightness-0 invert' : ''}
    />
  )
}
```

---

## 15.7 — Dark Mode Testing Checklist

```
□ All text passes 4.5:1 contrast ratio in dark mode
□ All UI components (buttons, inputs, badges) pass 3:1 in dark mode
□ No hardcoded colors visible in dark mode
□ Theme toggle works and persists across page refresh
□ System preference is respected on first load
□ Charts and data visualizations are readable in dark mode
□ Images are appropriate in dark mode (not inverted unintentionally)
□ Skeleton screens use dark-appropriate shimmer colors
□ Focus rings are visible in dark mode
□ Shadows are visible (not invisible on dark backgrounds)
```

# Chapter 25 — Data Visualization & Charts

> A chart that requires explanation has failed.  
> The best chart makes the insight obvious in 3 seconds.  
> Choose the chart type that answers the question, not the one that looks impressive.

---

## 25.1 — Chart Type Selection

**Rule: Choose the chart type based on the question being answered.**

| Question | Chart Type | When to Use |
|----------|-----------|-------------|
| How does X change over time? | Line chart | Trends, time series |
| How do parts relate to a whole? | Donut/Pie chart | Composition (max 5 segments) |
| How do values compare? | Bar chart | Comparison across categories |
| How are two variables related? | Scatter plot | Correlation |
| What is the distribution? | Histogram | Frequency distribution |
| What is the current value vs target? | Progress bar / Gauge | KPI tracking |
| How does a metric change? | Sparkline | Compact trend in a card |

**Anti-patterns:**
```
✗ Pie chart with > 5 segments (use bar chart instead)
✗ 3D charts (distort perception)
✗ Dual Y-axis (confusing — use two separate charts)
✗ Truncated Y-axis starting at non-zero (misleading)
✗ Too many data series on one chart (max 5-7 lines)
✗ Chart without a title or axis labels
✗ Chart without accessible alternative
```

---

## 25.2 — Chart Component Architecture

```jsx
// src/components/shared/ChartWrapper.jsx
// Rule: Every chart is wrapped in ChartWrapper for consistent behavior

import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Wrapper for all chart components.
 * Handles: loading skeleton, empty state, error state, responsive sizing,
 * accessibility, and reduced motion.
 *
 * @param {Object} props
 * @param {string}   props.title       - Chart title (required for accessibility)
 * @param {string}   [props.description] - Accessible description of chart data
 * @param {boolean}  [props.isLoading]
 * @param {string}   [props.error]
 * @param {boolean}  [props.isEmpty]
 * @param {string}   [props.emptyMessage]
 * @param {number}   [props.height=300]
 * @param {ReactNode} props.children   - The actual chart component
 */
export function ChartWrapper({
  title,
  description,
  isLoading = false,
  error = null,
  isEmpty = false,
  emptyMessage = 'No data available for this period',
  height = 300,
  children,
  className = '',
}) {
  if (isLoading) return <ChartSkeleton height={height} />
  if (error)     return <ChartError error={error} height={height} />
  if (isEmpty)   return <ChartEmpty message={emptyMessage} height={height} />

  return (
    <div
      className={`w-full ${className}`}
      role="img"
      aria-label={title}
      aria-describedby={description ? `chart-desc-${title.replace(/\s/g, '-')}` : undefined}
    >
      {description && (
        <p
          id={`chart-desc-${title.replace(/\s/g, '-')}`}
          className="sr-only"
        >
          {description}
        </p>
      )}
      <div style={{ height }}>
        {children}
      </div>
    </div>
  )
}

// Skeleton
function ChartSkeleton({ height }) {
  return (
    <div
      className="w-full rounded-lg bg-sunken animate-shimmer"
      style={{ height }}
      aria-hidden="true"
    />
  )
}

// Empty state
function ChartEmpty({ message, height }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center rounded-lg border border-border bg-sunken"
      style={{ height }}
    >
      <BarChart2 size={32} className="text-text-3 mb-2" aria-hidden="true" />
      <p className="text-body text-text-3">{message}</p>
    </div>
  )
}

// Error state
function ChartError({ error, height }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center rounded-lg border border-danger-light bg-danger-light"
      style={{ height }}
      role="alert"
    >
      <AlertCircle size={32} className="text-danger mb-2" aria-hidden="true" />
      <p className="text-body text-danger">{error || 'Failed to load chart data'}</p>
    </div>
  )
}
```

---

## 25.3 — Chart Color System

**Rule: Chart colors must be accessible (3:1 contrast on white background) and work in dark mode.**

```javascript
// src/config/chartColors.js

export const CHART_COLORS = {
  // Primary palette (use in order)
  primary: [
    'var(--color-accent)',      // Blue
    'var(--color-success)',     // Green
    'var(--color-warning)',     // Yellow/Orange
    'var(--color-danger)',      // Red
    '#8B5CF6',                  // Purple
    '#EC4899',                  // Pink
    '#14B8A6',                  // Teal
  ],

  // Semantic colors (for status-based charts)
  semantic: {
    positive: 'var(--color-success)',
    negative: 'var(--color-danger)',
    neutral:  'var(--color-text-3)',
    warning:  'var(--color-warning)',
  },

  // Gradient (for area charts)
  gradient: {
    accent: {
      start: 'rgba(59, 130, 246, 0.3)',
      end:   'rgba(59, 130, 246, 0)',
    },
    success: {
      start: 'rgba(16, 185, 129, 0.3)',
      end:   'rgba(16, 185, 129, 0)',
    },
  },
}

// Rule: Never use more than 7 colors in one chart
// Rule: Always test chart colors with color blindness simulator
// Rule: Never rely on color alone to distinguish data series (use patterns or labels)
```

---

## 25.4 — Recharts Implementation Patterns

```jsx
// src/components/shared/ChartLine.jsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { CHART_COLORS } from '@/config/chartColors'
import { formatCurrency, formatDate } from '@/utils/formatters'

/**
 * Responsive line chart with accessibility and reduced motion support.
 */
export function ChartLine({
  data,
  lines,           // [{ key, label, color }]
  xAxisKey = 'date',
  formatX = (v) => formatDate(v, { short: true }),
  formatY = (v) => v,
  formatTooltip = (v, name) => [formatY(v), name],
  height = 300,
  showGrid = true,
  showLegend = true,
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
        )}

        <XAxis
          dataKey={xAxisKey}
          tickFormatter={formatX}
          tick={{ fill: 'var(--color-text-3)', fontSize: 12 }}
          axisLine={{ stroke: 'var(--color-border)' }}
          tickLine={false}
        />

        <YAxis
          tickFormatter={formatY}
          tick={{ fill: 'var(--color-text-3)', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-md)',
          }}
          labelStyle={{ color: 'var(--color-text-1)', fontWeight: 600 }}
          itemStyle={{ color: 'var(--color-text-2)' }}
          formatter={formatTooltip}
          labelFormatter={formatX}
        />

        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: 12, color: 'var(--color-text-2)' }}
          />
        )}

        {lines.map((line, index) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.label}
            stroke={line.color ?? CHART_COLORS.primary[index % CHART_COLORS.primary.length]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            // Disable animation for reduced motion users
            isAnimationActive={!prefersReducedMotion}
            animationDuration={600}
            animationEasing="ease-out"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
```

---

## 25.5 — Sparkline (Compact Trend)

```jsx
// src/components/shared/SparkLine.jsx
// Used inside KPI cards for compact trend visualization

import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function SparkLine({ data, dataKey = 'value', color, height = 40 }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color ?? 'var(--color-accent)'}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={!prefersReducedMotion}
          animationDuration={600}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            fontSize: 12,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

---

## 25.6 — Chart Accessibility

```jsx
// Rule: Every chart must have an accessible text alternative

// Option 1: aria-label on wrapper (for simple charts)
<div role="img" aria-label="Revenue trend: increased 23% from January to May 2026">
  <ChartLine data={revenueData} />
</div>

// Option 2: Data table alternative (for complex charts)
<div>
  <ChartLine data={revenueData} aria-describedby="revenue-table" />

  {/* Visually hidden data table */}
  <table className="sr-only" id="revenue-table">
    <caption>Monthly revenue data</caption>
    <thead>
      <tr><th>Month</th><th>Revenue</th></tr>
    </thead>
    <tbody>
      {revenueData.map(row => (
        <tr key={row.month}>
          <td>{row.month}</td>
          <td>{formatCurrency(row.revenue)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

// Rule: Chart colors must pass 3:1 contrast ratio
// Rule: Never use color alone to distinguish data series
// Rule: Provide text labels on data points when possible
// Rule: Tooltip must be keyboard accessible
```

---

## 25.7 — Chart Performance

```
✓ Use ResponsiveContainer from Recharts (handles resize)
✓ Disable animations for reduced motion users
✓ Limit data points: > 500 points → aggregate/downsample
✓ Use useMemo for chart data transformations
✓ Lazy load chart library (heavy — only load when needed)

// Lazy load Recharts
const ChartLine = lazy(() => import('@/components/shared/ChartLine'))

// Aggregate data for performance
const chartData = useMemo(() => {
  if (rawData.length <= 100) return rawData
  // Downsample: take every Nth point
  const step = Math.ceil(rawData.length / 100)
  return rawData.filter((_, i) => i % step === 0)
}, [rawData])
```

---

## 25.8 — Chart Checklist

```
□ Chart type matches the question being answered
□ Chart has a descriptive title
□ Axes are labeled with units
□ Tooltip is informative and formatted
□ Colors are accessible (3:1 contrast)
□ Colors work in dark mode (using CSS tokens)
□ Accessible text alternative provided (aria-label or sr-only table)
□ Loading skeleton matches chart dimensions
□ Empty state is informative
□ Error state is shown when data fails to load
□ Animations disabled for prefers-reduced-motion users
□ Responsive (works at 375px width)
□ Data is memoized (no recalculation on every render)
□ Chart library lazy-loaded
```

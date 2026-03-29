'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { CATEGORIES } from '@/lib/constants/categories'
import { ToolCategory, ToolCondition } from '@/lib/types'
import { SlidersHorizontal, X } from 'lucide-react'

const CONDITIONS: { value: ToolCondition; label: string }[] = [
  { value: 'like-new', label: 'Like New' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
]

const PRICE_RANGES = [
  { label: 'Under $10/day', min: null, max: 1000 },
  { label: '$10–$25/day', min: 1000, max: 2500 },
  { label: '$25–$50/day', min: 2500, max: 5000 },
  { label: '$50+/day', min: 5000, max: null },
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Best Match' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
]

export default function ListingFilters({ onApply, hasZip }: { onApply?: () => void; hasZip?: boolean } = {}) {
  const router = useRouter()
  const params = useSearchParams()

  const setParam = useCallback((key: string, value: string | null) => {
    const p = new URLSearchParams(params.toString())
    if (value) p.set(key, value)
    else p.delete(key)
    router.push(`/browse?${p.toString()}`)
    onApply?.()
  }, [params, router, onApply])

  const activeCategory = params.get('category') as ToolCategory | null
  const activeCondition = params.get('condition') as ToolCondition | null
  const activeSort = params.get('sort') ?? 'relevance'
  const instantOnly = params.get('instant') === '1'
  const activeMin = params.get('minPrice')
  const activeMax = params.get('maxPrice')

  return (
    <aside className="w-full">
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal size={18} className="text-gray-500" />
        <h3 className="font-semibold text-gray-900">Filters</h3>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          value={activeSort}
          onChange={(e) => setParam('sort', e.target.value === 'relevance' ? null : e.target.value)}
          className="input-base text-sm"
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          {hasZip && <option value="distance">📍 Nearest First</option>}
        </select>
      </div>

      {/* Instant Book */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={instantOnly}
            onChange={(e) => setParam('instant', e.target.checked ? '1' : null)}
            className="w-4 h-4 rounded text-brand-500 focus:ring-brand-400"
          />
          <span className="text-sm font-medium text-gray-700">⚡ Instant Book only</span>
        </label>
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setParam('category', activeCategory === cat.value ? null : cat.value)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                activeCategory === cat.value
                  ? 'bg-brand-50 text-brand-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              {activeCategory === cat.value && <X size={14} className="ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Daily Price</h4>
        <div className="space-y-1">
          {PRICE_RANGES.map((r) => {
            const active = activeMin === String(r.min ?? '') && activeMax === String(r.max ?? '')
            return (
              <button
                key={r.label}
                onClick={() => {
                  if (active) {
                    setParam('minPrice', null)
                    setParam('maxPrice', null)
                  } else {
                    const p = new URLSearchParams(params.toString())
                    if (r.min) p.set('minPrice', String(r.min)); else p.delete('minPrice')
                    if (r.max) p.set('maxPrice', String(r.max)); else p.delete('maxPrice')
                    router.push(`/browse?${p.toString()}`)
                  }
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                  active ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Condition */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Condition</h4>
        <div className="space-y-1">
          {CONDITIONS.map((c) => (
            <button
              key={c.value}
              onClick={() => setParam('condition', activeCondition === c.value ? null : c.value)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                activeCondition === c.value ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

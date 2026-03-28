'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants/categories'
import { ToolCategory, ToolCondition, Listing } from '@/lib/types'
import { updateListing } from '@/lib/actions/listings'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/utils/cn'

const CONDITIONS: { value: ToolCondition; label: string }[] = [
  { value: 'like-new', label: 'Like New' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
]

export default function EditListingForm({ listing }: { listing: Listing }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({
    title: listing.title,
    category: listing.category as ToolCategory | '',
    description: listing.description,
    brand: listing.brand ?? '',
    model: listing.model ?? '',
    condition: listing.condition as ToolCondition | '',
    retailValue: listing.retailValue ? String(listing.retailValue / 100) : '',
    accessories: listing.accessories.join('\n'),
    dailyRate: String(listing.pricing.dailyRate / 100),
    depositAmount: String(listing.pricing.depositAmount / 100),
    instantBook: listing.availability.instantBook,
    minRentalDays: String(listing.availability.minRentalDays),
  })
  const [error, setError] = useState<string | null>(null)

  const canSave = form.title && form.category && form.condition && form.dailyRate && form.depositAmount

  function handleSave() {
    if (!canSave) return
    setError(null)
    startTransition(async () => {
      try {
        await updateListing(listing.id, {
          title: form.title,
          category: form.category as ToolCategory,
          description: form.description,
          condition: form.condition as ToolCondition,
          brand: form.brand,
          model: form.model,
          retailValue: Number(form.retailValue) * 100 || 0,
          accessories: form.accessories ? form.accessories.split('\n').filter(Boolean) : [],
          dailyRate: Math.round(Number(form.dailyRate) * 100) || 0,
          depositAmount: Math.round(Number(form.depositAmount) * 100) || 0,
          instantBook: form.instantBook,
          minRentalDays: Number(form.minRentalDays) || 1,
        })
        router.push(`/listings/${listing.id}`)
        router.refresh()
      } catch (err: any) {
        setError(err.message ?? 'Failed to save changes')
      }
    })
  }

  return (
    <div className="container-app py-8 max-w-2xl">
      <Link
        href={`/listings/${listing.id}`}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={16} /> Back to listing
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Listing</h1>

      <div className="card p-6 space-y-5">
        <Input
          label="Listing Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CATEGORIES.filter(c => c.value !== 'other').map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setForm({ ...form, category: cat.value })}
                className={cn('flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all', {
                  'border-brand-400 bg-brand-50 text-brand-700': form.category === cat.value,
                  'border-gray-200 text-gray-600 hover:border-gray-300': form.category !== cat.value,
                })}
              >
                <span>{cat.emoji}</span><span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CONDITIONS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setForm({ ...form, condition: c.value })}
                className={cn('px-3 py-2 rounded-xl border text-sm font-medium transition-all', {
                  'border-brand-400 bg-brand-50 text-brand-700': form.condition === c.value,
                  'border-gray-200 text-gray-600 hover:border-gray-300': form.condition !== c.value,
                })}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Brand (optional)" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          <Input label="Model (optional)" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
        </div>

        <Input
          label="Retail Value ($)"
          type="number"
          value={form.retailValue}
          onChange={(e) => setForm({ ...form, retailValue: e.target.value })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Accessories / What&apos;s Included (one per line)
          </label>
          <textarea
            rows={3}
            value={form.accessories}
            onChange={(e) => setForm({ ...form, accessories: e.target.value })}
            placeholder={'e.g. Carrying case\nExtra battery\nCharger'}
            className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Daily Rate ($)"
            type="number"
            value={form.dailyRate}
            onChange={(e) => setForm({ ...form, dailyRate: e.target.value })}
          />
          <Input
            label="Deposit ($)"
            type="number"
            value={form.depositAmount}
            onChange={(e) => setForm({ ...form, depositAmount: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Min Rental Days"
            type="number"
            value={form.minRentalDays}
            onChange={(e) => setForm({ ...form, minRentalDays: e.target.value })}
          />
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.instantBook}
                onChange={(e) => setForm({ ...form, instantBook: e.target.checked })}
                className="w-4 h-4 accent-brand-500"
              />
              <span className="text-sm font-medium text-gray-700">Instant Book</span>
            </label>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Link
            href={`/listings/${listing.id}`}
            className="flex-1 text-center px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={!canSave || isPending}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-colors"
          >
            {isPending ? <><Loader2 size={15} className="animate-spin" />Saving…</> : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

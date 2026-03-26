'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Check, Camera, DollarSign, Info } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants/categories'
import { ToolCategory, ToolCondition } from '@/lib/types'
import { getSmartPricingSuggestion } from '@/lib/utils/pricing'
import { PRICING_BENCHMARKS } from '@/lib/constants/pricing-benchmarks'
import { formatCents } from '@/lib/utils/formatting'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/utils/cn'

const CONDITIONS: { value: ToolCondition; label: string; desc: string }[] = [
  { value: 'like-new', label: 'Like New', desc: 'Used once or twice, perfect condition' },
  { value: 'excellent', label: 'Excellent', desc: 'Minor signs of use, fully functional' },
  { value: 'good', label: 'Good', desc: 'Normal wear, works great' },
  { value: 'fair', label: 'Fair', desc: 'Noticeable wear, still functional' },
]

const STEPS = ['Basics', 'Details', 'Photos', 'Pricing', 'Availability', 'Review']

export default function NewListingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    title: '',
    category: '' as ToolCategory | '',
    description: '',
    brand: '',
    model: '',
    condition: '' as ToolCondition | '',
    retailValue: '',
    accessories: '',
    dailyRate: '',
    depositAmount: '',
    instantBook: true,
    minRentalDays: '1',
  })

  const retailCents = Number(form.retailValue) * 100
  const suggestion =
    form.category && retailCents > 0
      ? getSmartPricingSuggestion(retailCents, form.category as ToolCategory)
      : null

  const canProceed = [
    form.title && form.category,
    form.description && form.condition,
    true, // photos step (mock)
    form.dailyRate && form.depositAmount,
    true, // availability (defaults are fine)
    true,
  ][step]

  function handleSubmit() {
    // In production, would call server action / API
    setTimeout(() => router.push('/dashboard'), 1000)
  }

  return (
    <div className="container-app py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">List Your Tool</h1>
      <p className="text-gray-500 mb-6">Share what you own and start earning.</p>

      {/* Progress */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={cn('flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap', {
              'bg-brand-50 text-brand-700': i === step,
              'bg-forest-50 text-forest-700': i < step,
              'text-gray-400': i > step,
            })}>
              {i < step ? <Check size={12} /> : <span>{i + 1}</span>}
              {s}
            </div>
            {i < STEPS.length - 1 && <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />}
          </div>
        ))}
      </div>

      <div className="card p-6">
        {/* Step 0: Basics */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-900 text-lg">Basic Information</h2>
            <Input
              label="Listing Title"
              placeholder='e.g. "DeWalt 20V Cordless Drill Kit"'
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
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-900 text-lg">Item Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                placeholder="Describe your item — condition, any quirks, what projects it's great for..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="input-base resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Brand (optional)" placeholder="e.g. DeWalt" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              <Input label="Model (optional)" placeholder="e.g. DCD771C2" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <div className="space-y-2">
                {CONDITIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setForm({ ...form, condition: c.value })}
                    className={cn('w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all', {
                      'border-brand-400 bg-brand-50': form.condition === c.value,
                      'border-gray-200 hover:border-gray-300': form.condition !== c.value,
                    })}
                  >
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{c.label}</p>
                      <p className="text-xs text-gray-500">{c.desc}</p>
                    </div>
                    {form.condition === c.value && <Check size={16} className="text-brand-500 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">What&apos;s Included (accessories)</label>
              <textarea
                rows={2}
                placeholder="e.g. 2 batteries, charger, carrying case (one per line)"
                value={form.accessories}
                onChange={(e) => setForm({ ...form, accessories: e.target.value })}
                className="input-base resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 2: Photos (mock) */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-900 text-lg">Photos</h2>
            <p className="text-sm text-gray-500">Add clear photos showing the item from multiple angles. Good photos increase bookings by 3×.</p>
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={cn('aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors', i === 0 ? 'border-brand-300 bg-brand-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50')}>
                  <Camera size={24} className={i === 0 ? 'text-brand-400' : 'text-gray-300'} />
                  <span className="text-xs text-gray-500">{i === 0 ? 'Cover photo' : 'Add photo'}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">Photo upload is mocked in this demo. In production, images are stored securely on S3.</p>
          </div>
        )}

        {/* Step 3: Pricing */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-900 text-lg">Pricing</h2>
            <Input
              label="Retail / Replacement Value ($)"
              placeholder="189.00"
              type="number"
              leftIcon={<DollarSign size={16} />}
              value={form.retailValue}
              onChange={(e) => setForm({ ...form, retailValue: e.target.value })}
              hint="Used to calculate smart pricing suggestions and deposit amount"
            />

            {/* Smart pricing suggestion */}
            {suggestion && (
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info size={16} className="text-brand-500" />
                  <p className="text-sm font-semibold text-brand-800">Smart Pricing Suggestion</p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-brand-600">{formatCents(suggestion.categoryBenchmarkLow)}</p>
                    <p className="text-xs text-brand-500">Low end</p>
                  </div>
                  <div className="border-x border-brand-200">
                    <p className="text-lg font-bold text-brand-700">{formatCents(suggestion.suggestedDailyRate)}</p>
                    <p className="text-xs text-brand-600 font-medium">✓ Suggested</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-brand-600">{formatCents(suggestion.categoryBenchmarkHigh)}</p>
                    <p className="text-xs text-brand-500">High end</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({
                    ...form,
                    dailyRate: (suggestion.suggestedDailyRate / 100).toFixed(2),
                    depositAmount: (suggestion.suggestedDepositRate / 100).toFixed(2),
                  })}
                  className="mt-3 w-full px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Use Suggested Rates
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Daily Rate ($)"
                placeholder="15.00"
                type="number"
                leftIcon={<DollarSign size={16} />}
                value={form.dailyRate}
                onChange={(e) => setForm({ ...form, dailyRate: e.target.value })}
              />
              <Input
                label="Security Deposit ($)"
                placeholder="50.00"
                type="number"
                leftIcon={<DollarSign size={16} />}
                value={form.depositAmount}
                onChange={(e) => setForm({ ...form, depositAmount: e.target.value })}
                hint="Held in escrow, returned after rental"
              />
            </div>
            <p className="text-xs text-gray-500">ToolShed takes a 10% service fee on each completed rental. You keep 90%.</p>
          </div>
        )}

        {/* Step 4: Availability */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-gray-900 text-lg">Availability</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, instantBook: true })}
                  className={cn('p-4 rounded-2xl border-2 text-left transition-all', form.instantBook ? 'border-brand-400 bg-brand-50' : 'border-gray-200')}
                >
                  <p className="font-semibold text-sm text-gray-900">⚡ Instant Book</p>
                  <p className="text-xs text-gray-500 mt-1">Renters can book without approval. More rentals, less work.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, instantBook: false })}
                  className={cn('p-4 rounded-2xl border-2 text-left transition-all', !form.instantBook ? 'border-brand-400 bg-brand-50' : 'border-gray-200')}
                >
                  <p className="font-semibold text-sm text-gray-900">✋ Request to Book</p>
                  <p className="text-xs text-gray-500 mt-1">You approve each renter before confirming.</p>
                </button>
              </div>
            </div>
            <Input
              label="Minimum Rental (days)"
              type="number"
              value={form.minRentalDays}
              onChange={(e) => setForm({ ...form, minRentalDays: e.target.value })}
              hint="1 day minimum is most flexible"
            />
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-900 text-lg">Review & Publish</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Title', value: form.title || '—' },
                { label: 'Category', value: CATEGORIES.find(c => c.value === form.category)?.label || '—' },
                { label: 'Condition', value: CONDITIONS.find(c => c.value === form.condition)?.label || '—' },
                { label: 'Daily Rate', value: form.dailyRate ? `$${form.dailyRate}` : '—' },
                { label: 'Deposit', value: form.depositAmount ? `$${form.depositAmount}` : '—' },
                { label: 'Booking Type', value: form.instantBook ? 'Instant Book' : 'Request to Book' },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-medium text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By publishing, you confirm the item is safe, accurately described, and you agree to ToolShed&apos;s Owner Terms.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 0 && <Button variant="secondary" onClick={() => setStep(step - 1)}>← Back</Button>}
          {step < STEPS.length - 1 ? (
            <Button className="flex-1" disabled={!canProceed} onClick={() => setStep(step + 1)}>
              Continue →
            </Button>
          ) : (
            <Button className="flex-1" onClick={handleSubmit}>
              🚀 Publish Listing
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Check, Info, Shield, MessageSquare } from 'lucide-react'
import { calcDaysBetween } from '@/lib/utils/availability'
import { ListingWithOwner } from '@/lib/types'
import { formatCents } from '@/lib/utils/formatting'
import { calcBookingPricing } from '@/lib/utils/pricing'
import { createBooking } from '@/lib/actions/bookings'
import BookingSummary from '@/components/booking/BookingSummary'
import WaiverText from '@/components/booking/WaiverText'
import AffiliateRecommendations from '@/components/listings/AffiliateRecommendations'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

const STEPS = [
  { id: 1, label: 'Dates' },
  { id: 2, label: 'Waiver' },
  { id: 3, label: 'Confirm' },
]

interface Props {
  listing: ListingWithOwner
  startDate: string
  endDate: string
}

export default function BookingFlow({ listing, startDate, endDate }: Props) {
  const router = useRouter()
  const days = startDate && endDate ? Math.max(1, calcDaysBetween(startDate, endDate)) : 1

  const [step, setStep] = useState(1)
  const [waiverSigned, setWaiverSigned] = useState(false)
  const [signature, setSignature] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pricing = calcBookingPricing(
    listing.pricing.dailyRate,
    days,
    listing.pricing.depositAmount,
    listing.pricing.weekendRate,
    startDate,
  )

  async function handleConfirm() {
    setSubmitting(true)
    setError(null)
    try {
      const bookingId = await createBooking({
        listingId: listing.id,
        ownerId: listing.ownerId,
        startDate,
        endDate,
        totalDays: days,
        dailyRate: listing.pricing.dailyRate,
        depositAmount: listing.pricing.depositAmount,
        weekendRate: listing.pricing.weekendRate,
        insuranceEnrolled: false,
        instantBook: listing.availability.instantBook,
        waiverSigned,
        waiverSignature: signature,
      })
      router.push(
        `/book/${listing.id}/confirmation?bookingId=${bookingId}&start=${startDate}&end=${endDate}`
      )
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="container-app py-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Booking</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => step > s.id && setStep(s.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                step === s.id && 'text-brand-600 bg-brand-50',
                step > s.id && 'text-forest-600 bg-forest-50 cursor-pointer',
                step < s.id && 'text-gray-400'
              )}
            >
              <span className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                step === s.id && 'bg-brand-500 text-white',
                step > s.id && 'bg-forest-500 text-white',
                step < s.id && 'bg-gray-200 text-gray-500'
              )}>
                {step > s.id ? <Check size={10} /> : s.id}
              </span>
              {s.label}
            </button>
            {i < STEPS.length - 1 && <ChevronRight size={14} className="text-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">

          {/* Step 1: Dates */}
          {step === 1 && (
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">Confirm Your Dates</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-50 rounded-xl p-4">
                  <p className="text-xs text-brand-600 font-medium mb-1">Pick Up</p>
                  <p className="font-bold text-gray-900">{startDate || '—'}</p>
                </div>
                <div className="bg-brand-50 rounded-xl p-4">
                  <p className="text-xs text-brand-600 font-medium mb-1">Return By</p>
                  <p className="font-bold text-gray-900">{endDate || '—'}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                <p className="text-sm text-gray-600">Duration: <span className="font-semibold text-gray-900">{days} day{days !== 1 ? 's' : ''}</span></p>
                <p className="text-sm text-gray-600">Rental rate: <span className="font-semibold text-gray-900">{formatCents(pricing.totalCharge)}</span></p>
                <p className="text-sm text-gray-600">Deposit (owner-held): <span className="font-semibold text-gray-900">+ {formatCents(pricing.depositAmount)}</span></p>
                <p className="text-sm font-semibold text-gray-900 pt-1 border-t border-gray-200">Estimated total: {formatCents(pricing.totalWithDeposit)}</p>
              </div>

              {/* Payment disclaimer */}
              <div className="flex gap-2.5 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 space-y-1">
                  <p className="font-semibold">ToolShed does not collect payments or deposits.</p>
                  <p className="text-blue-700 text-xs leading-relaxed">
                    Payment and any deposit are arranged directly between you and{' '}
                    <span className="font-medium">{listing.owner.name}</span> after your request is
                    accepted. Amounts shown are estimates based on the owner&apos;s listed rates.
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
                📍 You&apos;ll coordinate exact pickup location and payment method with {listing.owner.name} after booking is confirmed.
              </p>
              <Button className="w-full" onClick={() => setStep(2)}>
                Continue to Waiver →
              </Button>
            </div>
          )}

          {/* Step 2: Waiver */}
          {step === 2 && (
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">Liability Waiver</h2>
              <div className="bg-gray-50 rounded-xl p-5 h-80 overflow-y-auto border border-gray-200">
                <WaiverText />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Full Name (electronic signature)</label>
                <input
                  type="text"
                  placeholder="Type your full legal name"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="input-base"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-brand-500"
                />
                <span className="text-sm text-gray-600">
                  I have read and agree to the ToolShed Rental Agreement & Liability Waiver. I understand this constitutes a legally binding agreement.
                </span>
              </label>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
                <Button
                  className="flex-1"
                  disabled={!signature.trim() || !agreed}
                  onClick={() => { setWaiverSigned(true); setStep(3) }}
                >
                  Sign & Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">Review & Confirm</h2>

              {/* Booking summary rows */}
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Item', value: listing.title },
                  { label: 'Dates', value: `${startDate} → ${endDate} (${days} day${days !== 1 ? 's' : ''})` },
                  { label: 'Waiver', value: waiverSigned ? `Signed as "${signature}"` : '⚠ Not yet signed' },
                  { label: 'Rental rate', value: formatCents(pricing.totalCharge) },
                  { label: 'Deposit (est.)', value: `+ ${formatCents(pricing.depositAmount)}` },
                  { label: 'Estimated total', value: formatCents(pricing.totalWithDeposit) },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="font-medium text-gray-900 text-right max-w-xs">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Payment & deposit disclaimer */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                  <Info size={15} className="text-blue-500" />
                  How payment works
                </div>
                <ul className="text-xs text-blue-800 space-y-1.5 leading-relaxed pl-1">
                  <li className="flex gap-2"><MessageSquare size={12} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    Once your request is accepted, you and <span className="font-medium">{listing.owner.name}</span> will coordinate payment directly via the ToolShed message thread.
                  </li>
                  <li className="flex gap-2"><Shield size={12} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    Any deposit is held by the owner — ToolShed does not collect, hold, or process any funds.
                  </li>
                  <li className="flex gap-2"><Info size={12} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    Amounts shown are estimates based on the owner&apos;s listed rates. Final amounts are agreed between you and the owner.
                  </li>
                </ul>
              </div>

              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(2)}>← Back</Button>
                <Button className="flex-1" loading={submitting} onClick={handleConfirm}>
                  {listing.availability.instantBook ? '⚡ Confirm Request' : 'Send Booking Request'}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <BookingSummary
            listing={listing}
            startDate={startDate}
            endDate={endDate}
            days={days}
            waiverSigned={waiverSigned}
          />
          <AffiliateRecommendations category={listing.category} listingTitle={listing.title} />
        </div>
      </div>
    </div>
  )
}

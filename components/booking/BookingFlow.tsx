'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, ChevronRight, Check, CreditCard } from 'lucide-react'
import { calcDaysBetween } from '@/lib/utils/availability'
import { ListingWithOwner } from '@/lib/types'
import { formatCents } from '@/lib/utils/formatting'
import { calcBookingPricing, INSURANCE_DAILY_CENTS } from '@/lib/utils/pricing'
import { createBooking } from '@/lib/actions/bookings'
import BookingSummary from '@/components/booking/BookingSummary'
import WaiverText from '@/components/booking/WaiverText'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

const STEPS = [
  { id: 1, label: 'Dates' },
  { id: 2, label: 'Protection' },
  { id: 3, label: 'Waiver' },
  { id: 4, label: 'Payment' },
  { id: 5, label: 'Confirm' },
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
  const [insuranceEnrolled, setInsuranceEnrolled] = useState(false)
  const [waiverSigned, setWaiverSigned] = useState(false)
  const [signature, setSignature] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pricing = calcBookingPricing(
    listing.pricing.dailyRate,
    days,
    listing.pricing.depositAmount,
    insuranceEnrolled,
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
        insuranceEnrolled,
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
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Duration: <span className="font-semibold text-gray-900">{days} day{days !== 1 ? 's' : ''}</span></p>
                <p className="text-sm text-gray-600 mt-1">Total (before deposit): <span className="font-semibold text-gray-900">{formatCents(pricing.totalCharge)}</span></p>
              </div>
              <p className="text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
                📍 You&apos;ll coordinate exact pickup location with {listing.owner.name} after booking is confirmed.
              </p>
              <Button className="w-full" onClick={() => setStep(2)}>
                Continue to Protection →
              </Button>
            </div>
          )}

          {/* Step 2: Protection */}
          {step === 2 && (
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">Add Protection Plan</h2>
              <p className="text-sm text-gray-500">ToolShed Protection covers accidental damage up to the item&apos;s retail value, after a $50 deductible.</p>

              <div
                className={cn('border-2 rounded-2xl p-5 cursor-pointer transition-all', insuranceEnrolled ? 'border-forest-400 bg-forest-50' : 'border-gray-200 hover:border-gray-300')}
                onClick={() => setInsuranceEnrolled(!insuranceEnrolled)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', insuranceEnrolled ? 'bg-forest-500 text-white' : 'bg-gray-100 text-gray-400')}>
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">ToolShed Protection</p>
                      <p className="text-sm text-gray-500">{formatCents(INSURANCE_DAILY_CENTS)}/day · {formatCents(INSURANCE_DAILY_CENTS * days)} total</p>
                    </div>
                  </div>
                  <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center', insuranceEnrolled ? 'border-forest-500 bg-forest-500' : 'border-gray-300')}>
                    {insuranceEnrolled && <Check size={10} className="text-white" />}
                  </div>
                </div>
                <ul className="mt-3 space-y-1 text-xs text-gray-500">
                  <li>✓ Covers accidental damage up to retail value</li>
                  <li>✓ $50 deductible (vs. full deposit at risk)</li>
                  <li>✓ Claims processed within 48 hours</li>
                  <li>✗ Does not cover personal injury or theft</li>
                </ul>
              </div>

              <div
                className={cn('border-2 rounded-2xl p-5 cursor-pointer transition-all', !insuranceEnrolled ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300')}
                onClick={() => setInsuranceEnrolled(false)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">No Protection</p>
                    <p className="text-sm text-gray-500">Your {formatCents(listing.pricing.depositAmount)} deposit covers any damage claim</p>
                  </div>
                  <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center', !insuranceEnrolled ? 'border-gray-500 bg-gray-500' : 'border-gray-300')}>
                    {!insuranceEnrolled && <Check size={10} className="text-white" />}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)}>Continue to Waiver →</Button>
              </div>
            </div>
          )}

          {/* Step 3: Waiver */}
          {step === 3 && (
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
                <Button variant="secondary" onClick={() => setStep(2)}>← Back</Button>
                <Button
                  className="flex-1"
                  disabled={!signature.trim() || !agreed}
                  onClick={() => { setWaiverSigned(true); setStep(4) }}
                >
                  Sign & Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                <p className="font-semibold mb-1">🔒 Secure checkout powered by Stripe</p>
                <p>Your payment info is encrypted and never stored by ToolShed.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                  <div className="input-base flex items-center gap-2">
                    <CreditCard size={18} className="text-gray-400" />
                    <input type="text" placeholder="4242 4242 4242 4242" className="flex-1 outline-none text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry</label>
                    <input type="text" placeholder="MM / YY" className="input-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                    <input type="text" placeholder="•••" className="input-base" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Name on Card</label>
                  <input type="text" placeholder="Your name" className="input-base" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(3)}>← Back</Button>
                <Button className="flex-1" onClick={() => setStep(5)}>Review & Confirm →</Button>
              </div>
            </div>
          )}

          {/* Step 5: Confirm */}
          {step === 5 && (
            <div className="card p-6 space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">Review & Confirm</h2>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Item', value: listing.title },
                  { label: 'Dates', value: `${startDate} → ${endDate} (${days} day${days !== 1 ? 's' : ''})` },
                  { label: 'Protection', value: insuranceEnrolled ? 'ToolShed Protection enrolled' : 'No protection plan' },
                  { label: 'Waiver', value: waiverSigned ? `Signed as "${signature}"` : '⚠ Not yet signed' },
                  { label: 'Total charge', value: formatCents(pricing.totalCharge) },
                  { label: 'Refundable deposit', value: formatCents(pricing.depositAmount) },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="font-medium text-gray-900 text-right max-w-xs">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                By confirming, {formatCents(pricing.totalWithDeposit)} will be authorized on your card. The deposit is refunded automatically after check-out.
              </p>
              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(4)}>← Back</Button>
                <Button className="flex-1" loading={submitting} onClick={handleConfirm}>
                  {listing.availability.instantBook ? '⚡ Confirm & Pay' : 'Send Request'}
                </Button>
              </div>
            </div>
          )}
        </div>

        <BookingSummary
          listing={listing}
          startDate={startDate}
          endDate={endDate}
          days={days}
          insuranceEnrolled={insuranceEnrolled}
          waiverSigned={waiverSigned}
        />
      </div>
    </div>
  )
}

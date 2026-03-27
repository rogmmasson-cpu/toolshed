'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertTriangle, ChevronRight, DollarSign } from 'lucide-react'
import { DisputeReason } from '@/lib/types'
import { createDispute } from '@/lib/utils/local-disputes'
import { MOCK_BOOKINGS } from '@/lib/data/mock-bookings'
import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import { formatCents } from '@/lib/utils/formatting'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/utils/cn'

const REASONS: { value: DisputeReason; label: string; desc: string; icon: string }[] = [
  { value: 'item_damaged',        label: 'Item Damaged',           desc: 'The tool was damaged during the rental', icon: '🔧' },
  { value: 'item_not_returned',   label: 'Item Not Returned',      desc: 'The renter did not return the tool', icon: '📦' },
  { value: 'item_not_as_described', label: 'Not as Described',     desc: 'The item did not match the listing', icon: '📋' },
  { value: 'item_not_received',   label: 'Item Not Received',      desc: 'I never received the tool from the owner', icon: '🚫' },
  { value: 'deposit_dispute',     label: 'Deposit Dispute',        desc: 'I disagree with how the deposit was handled', icon: '💰' },
  { value: 'other',               label: 'Other Issue',            desc: 'Something else went wrong', icon: '❓' },
]

export default function NewDisputePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId') ?? ''

  const booking = MOCK_BOOKINGS.find(b => b.id === bookingId)
  const listing = booking ? MOCK_LISTINGS.find(l => l.id === booking.listingId) : null

  const [reason, setReason] = useState<DisputeReason | ''>('')
  const [description, setDescription] = useState('')
  const [claimDeposit, setClaimDeposit] = useState(false)
  const [claimAmount, setClaimAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!booking || !listing) {
    return (
      <div className="container-app py-20 max-w-lg text-center text-gray-500">
        <p>Booking not found. <a href="/dashboard/rentals" className="text-brand-600 font-medium">Back to rentals</a></p>
      </div>
    )
  }

  const isRenter = booking.renterId === 'usr_current'
  const filedByRole = isRenter ? 'renter' : 'owner'
  const maxClaim = booking.deposit.heldAmount

  function handleSubmit() {
    if (!reason || !description.trim()) return
    setSubmitting(true)
    const claimCents = claimDeposit && claimAmount
      ? Math.min(Math.round(parseFloat(claimAmount) * 100), maxClaim)
      : null
    const dispute = createDispute({
      bookingId: booking!.id,
      listingId: listing!.id,
      renterId: booking!.renterId,
      ownerId: booking!.ownerId,
      filedByRole,
      filedByName: 'You',
      reason: reason as DisputeReason,
      description: description.trim(),
      depositClaimAmount: claimCents,
    })
    router.push(`/disputes/${dispute.id}`)
  }

  return (
    <div className="container-app py-8 max-w-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={20} className="text-red-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">File a Dispute</h1>
          <p className="text-sm text-gray-500">Booking #{bookingId.slice(-6).toUpperCase()}</p>
        </div>
      </div>

      {/* Booking summary */}
      <div className="card p-4 mb-6 flex items-center gap-3">
        <img src={listing.photos[0]} alt="" className="w-16 h-14 rounded-xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{listing.title}</p>
          <p className="text-xs text-gray-500">{booking.dates.startDate} → {booking.dates.endDate}</p>
          <p className="text-xs text-gray-500">Deposit held: <span className="font-medium text-gray-700">{formatCents(booking.deposit.heldAmount)}</span></p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Reason */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">What is the issue?</label>
          <div className="space-y-2">
            {REASONS.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => setReason(r.value)}
                className={cn(
                  'w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all',
                  reason === r.value
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300',
                )}
              >
                <span className="text-xl flex-shrink-0">{r.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">{r.label}</p>
                  <p className="text-xs text-gray-500">{r.desc}</p>
                </div>
                {reason === r.value && <ChevronRight size={16} className="text-red-500 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Describe what happened <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            placeholder="Please be specific — include dates, photos you have, and any communication with the other party that is relevant..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="input-base resize-none w-full"
          />
          <p className="text-xs text-gray-400 mt-1">{description.length} / 1000 characters</p>
        </div>

        {/* Deposit claim */}
        {booking.deposit.status === 'held' && (
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Deposit claim</label>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setClaimDeposit(false)}
                className={cn(
                  'w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all',
                  !claimDeposit ? 'border-brand-400 bg-brand-50' : 'border-gray-200 hover:border-gray-300',
                )}
              >
                <div>
                  <p className="font-medium text-sm text-gray-900">No deposit claim</p>
                  <p className="text-xs text-gray-500">I am not requesting any deposit funds</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setClaimDeposit(true)}
                className={cn(
                  'w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all',
                  claimDeposit ? 'border-brand-400 bg-brand-50' : 'border-gray-200 hover:border-gray-300',
                )}
              >
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">Claim from deposit</p>
                  <p className="text-xs text-gray-500">Request that some or all of the {formatCents(maxClaim)} deposit be used</p>
                </div>
              </button>
              {claimDeposit && (
                <Input
                  label={`Claim amount (max ${formatCents(maxClaim)})`}
                  type="number"
                  placeholder="0.00"
                  leftIcon={<DollarSign size={16} />}
                  value={claimAmount}
                  onChange={e => setClaimAmount(e.target.value)}
                  hint="Enter the dollar amount you are claiming from the deposit"
                />
              )}
            </div>
          </div>
        )}

        {/* Info box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <p className="font-semibold mb-1">How disputes work</p>
          <ol className="list-decimal list-inside space-y-1 text-xs text-amber-700">
            <li>You file a dispute with a description of the issue</li>
            <li>The other party has 48 hours to respond</li>
            <li>A ToolShed mediator reviews the case and any evidence</li>
            <li>A binding resolution is issued, typically within 3–5 business days</li>
          </ol>
        </div>

        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white justify-center"
          disabled={!reason || !description.trim() || submitting}
          onClick={handleSubmit}
        >
          {submitting ? 'Filing…' : 'File Dispute'}
        </Button>

        <button
          type="button"
          onClick={() => router.back()}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel — go back
        </button>
      </div>
    </div>
  )
}

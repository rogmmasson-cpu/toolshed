'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDays, Shield, Zap, MessageSquare } from 'lucide-react'
import { ListingWithOwner } from '@/lib/types'
import { formatCents, formatDate } from '@/lib/utils/formatting'
import { calcBookingPricing } from '@/lib/utils/pricing'
import { PLATFORM_FEE_PCT } from '@/lib/constants/pricing-benchmarks'
import Button from '@/components/ui/Button'
import StarRating from '@/components/ui/StarRating'
import Avatar from '@/components/ui/Avatar'
import { calcDaysBetween } from '@/lib/utils/availability'

export default function PricingCard({ listing }: { listing: ListingWithOwner }) {
  const router = useRouter()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const days = startDate && endDate ? Math.max(1, calcDaysBetween(startDate, endDate)) : 0
  const pricing = days > 0
    ? calcBookingPricing(listing.pricing.dailyRate, days, listing.pricing.depositAmount, listing.pricing.weekendRate, startDate)
    : null

  return (
    <div className="card p-5 sticky top-24">
      {/* Price header */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-extrabold text-gray-900">{formatCents(listing.pricing.dailyRate)}</span>
        <span className="text-gray-500 text-sm">/day</span>
      </div>
      {listing.pricing.weekendRate && (
        <p className="text-xs text-amber-600 font-medium">
          📅 {formatCents(listing.pricing.weekendRate)}/day on weekends (Fri–Sun)
        </p>
      )}
      {listing.pricing.weeklyRate && (
        <p className="text-xs text-forest-600 font-medium mb-3">
          💡 {formatCents(listing.pricing.weeklyRate)}/week (save {Math.round((1 - listing.pricing.weeklyRate / (listing.pricing.dailyRate * 7)) * 100)}%)
        </p>
      )}

      <StarRating rating={listing.stats.averageRating} count={listing.stats.reviewCount} size="md" className="mb-4" />

      {/* Instant Book badge */}
      {listing.availability.instantBook ? (
        <div className="flex items-center gap-1.5 text-xs text-forest-700 bg-forest-50 rounded-lg px-3 py-1.5 mb-4">
          <Zap size={13} />Instant Book — no approval wait
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-1.5 mb-4">
          <CalendarDays size={13} />Request to Book — owner approves within 4h
        </div>
      )}

      {/* Date pickers */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">From</label>
          <input
            type="date"
            value={startDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-base text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">To</label>
          <input
            type="date"
            value={endDate}
            min={startDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-base text-sm"
          />
        </div>
      </div>

      {/* Price breakdown */}
      {pricing && days > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {listing.pricing.weekendRate
                ? `${days} day${days > 1 ? 's' : ''} (mixed rates)`
                : `${formatCents(listing.pricing.dailyRate)} × ${days} day${days > 1 ? 's' : ''}`}
            </span>
            <span className="font-bold text-gray-900">{formatCents(pricing.totalCharge)}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Refundable deposit</span>
            <span>+ {formatCents(listing.pricing.depositAmount)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
            <span>Due at booking</span>
            <span>{formatCents(pricing.totalWithDeposit)}</span>
          </div>
        </div>
      )}

      {/* CTA */}
      <Button
        className="w-full mb-3"
        size="lg"
        onClick={() => {
          if (!startDate || !endDate) return
          router.push(`/book/${listing.id}?start=${startDate}&end=${endDate}`)
        }}
        disabled={!startDate || !endDate}
      >
        {listing.availability.instantBook ? 'Book Now' : 'Request to Book'}
      </Button>

      <Button variant="secondary" className="w-full mb-4" size="md">
        <MessageSquare size={16} />Message Owner
      </Button>

      {/* Deposit info */}
      <div className="flex items-start gap-2 text-xs text-gray-500">
        <Shield size={14} className="text-forest-500 flex-shrink-0 mt-0.5" />
        <p>
          <span className="font-medium text-gray-700">{formatCents(listing.pricing.depositAmount)} deposit</span> held securely — fully refunded after check-out if no damage.
        </p>
      </div>

      {/* Owner snippet */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
        <Avatar src={listing.owner.avatarUrl} name={listing.owner.name} size="md" />
        <div>
          <p className="text-sm font-semibold text-gray-900">{listing.owner.name}</p>
          <p className="text-xs text-gray-500">
            Trust score: <span className="font-semibold text-brand-500">{listing.owner.trustScore}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

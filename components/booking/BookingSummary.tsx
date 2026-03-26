'use client'
import { Shield, Zap } from 'lucide-react'
import { ListingWithOwner } from '@/lib/types'
import { formatCents } from '@/lib/utils/formatting'
import { calcBookingPricing } from '@/lib/utils/pricing'
import { INSURANCE_DAILY_CENTS } from '@/lib/utils/pricing'
import Avatar from '@/components/ui/Avatar'

interface BookingSummaryProps {
  listing: ListingWithOwner
  startDate: string
  endDate: string
  days: number
  insuranceEnrolled: boolean
  waiverSigned: boolean
}

export default function BookingSummary({ listing, startDate, endDate, days, insuranceEnrolled, waiverSigned }: BookingSummaryProps) {
  const pricing = calcBookingPricing(listing.pricing.dailyRate, days, listing.pricing.depositAmount, insuranceEnrolled)

  return (
    <div className="card p-5 sticky top-24">
      {/* Listing snapshot */}
      <div className="flex gap-3 mb-5 pb-5 border-b border-gray-100">
        <img src={listing.photos[0]} alt={listing.title} className="w-20 h-16 rounded-xl object-cover flex-shrink-0" />
        <div>
          <p className="font-semibold text-sm text-gray-900 line-clamp-2">{listing.title}</p>
          <p className="text-xs text-gray-500 mt-1">{listing.location.neighborhood}, {listing.location.city}</p>
          <div className="flex items-center gap-1 mt-1">
            <Avatar src={listing.owner.avatarUrl} name={listing.owner.name} size="xs" />
            <span className="text-xs text-gray-500">{listing.owner.name}</span>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-0.5">From</p>
          <p className="text-sm font-semibold text-gray-900">{startDate}</p>
        </div>
        <div className="flex-1 bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-0.5">To</p>
          <p className="text-sm font-semibold text-gray-900">{endDate}</p>
        </div>
      </div>

      {/* Price breakdown */}
      <div className="space-y-2.5 text-sm mb-5">
        <div className="flex justify-between">
          <span className="text-gray-600">{formatCents(listing.pricing.dailyRate)} × {days} day{days !== 1 ? 's' : ''}</span>
          <span className="font-medium">{formatCents(pricing.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Service fee (10%)</span>
          <span className="font-medium">{formatCents(pricing.platformFee)}</span>
        </div>
        {insuranceEnrolled && (
          <div className="flex justify-between text-forest-700">
            <span>🛡️ Protection plan × {days}d</span>
            <span className="font-medium">{formatCents(pricing.insuranceFee)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2.5 flex justify-between font-bold text-gray-900">
          <span>Total charge</span>
          <span>{formatCents(pricing.totalCharge)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1"><Shield size={12} className="text-forest-500" />Refundable deposit</span>
          <span>+ {formatCents(pricing.depositAmount)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-gray-500">
          <span>Total (incl. deposit)</span>
          <span>{formatCents(pricing.totalWithDeposit)}</span>
        </div>
      </div>

      {/* Status chips */}
      <div className="space-y-2">
        <div className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 ${insuranceEnrolled ? 'bg-forest-50 text-forest-700' : 'bg-gray-50 text-gray-500'}`}>
          <Zap size={13} />
          {insuranceEnrolled ? 'Protection plan enrolled' : 'No protection plan'}
        </div>
        <div className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 ${waiverSigned ? 'bg-forest-50 text-forest-700' : 'bg-gray-50 text-gray-500'}`}>
          <Shield size={13} />
          {waiverSigned ? 'Liability waiver signed' : 'Waiver not yet signed'}
        </div>
      </div>
    </div>
  )
}

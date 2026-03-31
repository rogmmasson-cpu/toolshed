'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { approveBooking, declineBooking } from '@/lib/actions/bookings'
import { formatCents, formatDateRange, formatDuration, timeAgo } from '@/lib/utils/formatting'
import type { Booking, Listing, User } from '@/lib/types'

interface RequestCardProps {
  booking: Booking
  listing: Listing | null
  renter: User | null
}

export default function RequestCard({ booking, listing, renter }: RequestCardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [action, setAction] = useState<'approve' | 'decline' | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Reflect the booking's real status if it's already been decided
  const alreadyApproved = booking.status === 'approved' || booking.status === 'active'
  const alreadyDeclined = booking.status === 'cancelled'

  function decide(next: 'approve' | 'decline') {
    setAction(next)
    setError(null)
    startTransition(async () => {
      try {
        if (next === 'approve') {
          await approveBooking(booking.id)
        } else {
          await declineBooking(booking.id)
        }
        router.refresh()
      } catch (err: any) {
        setError(err.message ?? 'Something went wrong')
        setAction(null)
      }
    })
  }

  // Approved state — compact confirmed row
  if (alreadyApproved || action === 'approve') {
    return (
      <div className="card p-4 flex gap-3 items-center border-l-4 border-forest-400">
        {listing?.photos[0] && (
          <img src={listing.photos[0]} alt="" className="w-14 h-12 rounded-xl object-cover flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{listing?.title}</p>
          <p className="text-xs text-gray-500">{formatDateRange(booking.dates.startDate, booking.dates.endDate)}</p>
        </div>
        {renter && <Avatar src={renter.avatarUrl} name={renter.name} size="sm" />}
        <Badge variant="success">Approved</Badge>
      </div>
    )
  }

  // Declined state — muted row
  if (alreadyDeclined || action === 'decline') {
    return (
      <div className="card p-4 flex gap-3 items-center opacity-50">
        {listing?.photos[0] && (
          <img src={listing.photos[0]} alt="" className="w-14 h-12 rounded-xl object-cover flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{listing?.title}</p>
          <p className="text-xs text-gray-500">{formatDateRange(booking.dates.startDate, booking.dates.endDate)}</p>
        </div>
        {renter && <Avatar src={renter.avatarUrl} name={renter.name} size="sm" />}
        <Badge variant="danger">Declined</Badge>
      </div>
    )
  }

  // Pending — full card with action buttons
  return (
    <div className="card p-5 border-l-4 border-yellow-400">
      <div className="flex items-start gap-4">
        {listing?.photos[0] && (
          <img src={listing.photos[0]} alt="" className="w-20 h-16 rounded-xl object-cover flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{listing?.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatDateRange(booking.dates.startDate, booking.dates.endDate)} · {formatDuration(booking.dates.totalDays)}
          </p>
          <p className="text-xs text-gray-500">
            Payout:{' '}
            <span className="font-semibold text-forest-700">
              {formatCents(booking.pricing.subtotal * 0.9)}
            </span>
          </p>
          {renter && (
            <div className="flex items-center gap-2 mt-2">
              <Avatar src={renter.avatarUrl} name={renter.name} size="xs" />
              <span className="text-xs text-gray-700 font-medium">{renter.name}</span>
              <span className="text-xs text-gray-400">· {timeAgo(booking.createdAt)}</span>
            </div>
          )}
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-red-600 font-medium">{error}</p>}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => decide('approve')}
          disabled={isPending}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-forest-500 hover:bg-forest-600 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {isPending && action === 'approve' ? (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <CheckCircle2 size={15} />
          )}
          Approve
        </button>
        <button
          onClick={() => decide('decline')}
          disabled={isPending}
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-200 hover:bg-gray-50 disabled:opacity-60 text-gray-600 text-sm font-semibold rounded-xl transition-colors"
        >
          {isPending && action === 'decline' ? (
            <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          ) : (
            <XCircle size={15} />
          )}
          Decline
        </button>
        <Link
          href="/messages"
          className="flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-semibold rounded-xl transition-colors"
        >
          Message
        </Link>
      </div>
    </div>
  )
}

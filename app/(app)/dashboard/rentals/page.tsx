import Link from 'next/link'
import { ArrowLeft, QrCode, Star, AlertTriangle, CheckCircle2, Clock, Package, Scale } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { getBookingsByRenter } from '@/lib/mock-db/bookings'
import { getListingById } from '@/lib/mock-db/listings'
import { formatCents, formatDateRange, formatDuration } from '@/lib/utils/formatting'
import Badge from '@/components/ui/Badge'

const STATUS_CONFIG = {
  pending:   { label: 'Pending Approval', icon: <Clock size={13}/>,       variant: 'warning'  as const },
  approved:  { label: 'Approved',         icon: <CheckCircle2 size={13}/>, variant: 'info'     as const },
  active:    { label: 'Active',           icon: <CheckCircle2 size={13}/>, variant: 'success'  as const },
  completed: { label: 'Completed',        icon: <CheckCircle2 size={13}/>, variant: 'default'  as const },
  cancelled: { label: 'Cancelled',        icon: <AlertTriangle size={13}/>,variant: 'danger'   as const },
  disputed:  { label: 'Disputed',         icon: <AlertTriangle size={13}/>,variant: 'danger'   as const },
}

export default async function RentalsPage() {
  const { userId } = await auth()
  const bookings = userId ? await getBookingsByRenter(userId) : []

  const active    = bookings.filter(b => b.status === 'active')
  const upcoming  = bookings.filter(b => b.status === 'pending' || b.status === 'approved')
  const past      = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled')

  const listings = await Promise.all(bookings.map(b => getListingById(b.listingId)))
  const listingMap = Object.fromEntries(bookings.map((b, i) => [b.id, listings[i]]))

  return (
    <div className="container-app py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
          <ArrowLeft size={18}/>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">My Rentals</h1>
      </div>

      {bookings.length === 0 && (
        <div className="card p-16 text-center">
          <Package size={40} className="text-gray-200 mx-auto mb-3"/>
          <p className="text-gray-500 mb-4">You haven't rented anything yet.</p>
          <Link href="/browse" className="btn-primary">Browse Tools</Link>
        </div>
      )}

      {active.length > 0 && (
        <Section title="Active Rentals" count={active.length}>
          {active.map(b => (
            <BookingRow key={b.id} booking={b} listing={listingMap[b.id]} showQr />
          ))}
        </Section>
      )}

      {upcoming.length > 0 && (
        <Section title="Upcoming" count={upcoming.length}>
          {upcoming.map(b => (
            <BookingRow key={b.id} booking={b} listing={listingMap[b.id]} />
          ))}
        </Section>
      )}

      {past.length > 0 && (
        <Section title="Past Rentals" count={past.length}>
          {past.map(b => (
            <BookingRow key={b.id} booking={b} listing={listingMap[b.id]} showReview />
          ))}
        </Section>
      )}
    </div>
  )
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-3">
        {title} <span className="text-gray-400 font-normal">({count})</span>
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function BookingRow({ booking, listing, showQr, showReview }: {
  booking: Awaited<ReturnType<typeof getBookingsByRenter>>[0]
  listing: Awaited<ReturnType<typeof getListingById>>
  showQr?: boolean
  showReview?: boolean
}) {
  const cfg = STATUS_CONFIG[booking.status]
  const needsReview = showReview && !booking.renterReviewId

  return (
    <div className="card p-4 flex gap-4">
      {listing?.photos[0] && (
        <img src={listing.photos[0]} alt={listing?.title} className="w-20 h-16 rounded-xl object-cover flex-shrink-0"/>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-semibold text-sm text-gray-900 truncate">{listing?.title ?? 'Listing'}</p>
          <Badge variant={cfg.variant} className="flex-shrink-0 flex items-center gap-1">
            {cfg.icon}{cfg.label}
          </Badge>
        </div>
        <p className="text-xs text-gray-500">
          {formatDateRange(booking.dates.startDate, booking.dates.endDate)} · {formatDuration(booking.dates.totalDays)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          Paid {formatCents(booking.pricing.totalCharge)} · Deposit {formatCents(booking.pricing.depositAmount)}{' '}
          <span className={booking.deposit.status === 'released' ? 'text-forest-600 font-medium' : 'text-yellow-600 font-medium'}>
            ({booking.deposit.status})
          </span>
        </p>

        <div className="flex gap-2 mt-2">
          {showQr && (
            <Link
              href={`/bookings/${booking.id}/checkin`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <QrCode size={12}/>QR Check-Out
            </Link>
          )}
          {needsReview && (
            <Link
              href={`/bookings/${booking.id}/review`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-700 text-xs font-semibold rounded-lg transition-colors"
            >
              <Star size={12}/>Leave a Review
            </Link>
          )}
          <Link
            href={`/messages`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
          >
            Message
          </Link>
          {(booking.status === 'active' || booking.status === 'completed') && (
            <Link
              href={`/disputes/new?bookingId=${booking.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold rounded-lg transition-colors"
            >
              <Scale size={12}/>File Dispute
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

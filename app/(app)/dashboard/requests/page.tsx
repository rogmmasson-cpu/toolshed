import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { getBookingsByOwner } from '@/lib/mock-db/bookings'
import { getListingById } from '@/lib/mock-db/listings'
import { getUserById } from '@/lib/mock-db/users'
import { formatCents, formatDateRange } from '@/lib/utils/formatting'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import RequestCard from '@/components/dashboard/RequestCard'

export default async function RequestsPage() {
  const bookings = await getBookingsByOwner('usr_current')
  const pending  = bookings.filter(b => b.status === 'pending')
  const approved = bookings.filter(b => b.status === 'approved' || b.status === 'active')
  const past     = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled')

  const data = await Promise.all(
    bookings.map(async b => ({
      booking: b,
      listing: await getListingById(b.listingId),
      renter:  await getUserById(b.renterId),
    }))
  )
  const byId = Object.fromEntries(data.map(d => [d.booking.id, d]))

  return (
    <div className="container-app py-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
          <ArrowLeft size={18}/>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Rental Requests</h1>
      </div>

      {bookings.length === 0 && (
        <div className="card p-16 text-center">
          <Clock size={40} className="text-gray-200 mx-auto mb-3"/>
          <p className="text-gray-500 mb-2">No requests yet.</p>
          <p className="text-sm text-gray-400">When renters book your tools, requests will appear here.</p>
        </div>
      )}

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-3">
            Awaiting Your Approval ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map(b => {
              const { listing, renter } = byId[b.id]
              return (
                <RequestCard key={b.id} booking={b} listing={listing ?? null} renter={renter ?? null} />
              )
            })}
          </div>
        </div>
      )}

      {approved.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-3">
            Approved / Active ({approved.length})
          </h2>
          <div className="space-y-3">
            {approved.map(b => {
              const { listing, renter } = byId[b.id]
              return (
                <div key={b.id} className="card p-4 flex gap-3 items-center">
                  {listing?.photos[0] && <img src={listing.photos[0]} alt="" className="w-14 h-12 rounded-xl object-cover flex-shrink-0"/>}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{listing?.title}</p>
                    <p className="text-xs text-gray-500">{formatDateRange(b.dates.startDate, b.dates.endDate)}</p>
                  </div>
                  {renter && <Avatar src={renter.avatarUrl} name={renter.name} size="sm"/>}
                  <Badge variant={b.status === 'active' ? 'success' : 'info'}>{b.status}</Badge>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-3">
            Completed ({past.length})
          </h2>
          <div className="space-y-3">
            {past.map(b => {
              const { listing, renter } = byId[b.id]
              return (
                <div key={b.id} className="card p-4 flex gap-3 items-center opacity-70">
                  {listing?.photos[0] && <img src={listing.photos[0]} alt="" className="w-14 h-12 rounded-xl object-cover flex-shrink-0"/>}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{listing?.title}</p>
                    <p className="text-xs text-gray-500">{formatDateRange(b.dates.startDate, b.dates.endDate)} · Earned {formatCents(b.pricing.subtotal * 0.9)}</p>
                  </div>
                  {renter && <Avatar src={renter.avatarUrl} name={renter.name} size="sm"/>}
                  <Badge variant="default">{b.status}</Badge>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

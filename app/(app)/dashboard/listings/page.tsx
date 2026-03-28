import Link from 'next/link'
import { ArrowLeft, Plus, Eye, Edit3, TrendingUp, Star, CalendarDays } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { getListingsByOwner } from '@/lib/mock-db/listings'
import { formatCents } from '@/lib/utils/formatting'
import Badge from '@/components/ui/Badge'
import ListingStatusButton from '@/components/dashboard/ListingStatusButton'

export default async function ManageListingsPage() {
  const { userId } = await auth()
  const listings = userId ? await getListingsByOwner(userId) : []

  return (
    <div className="container-app py-8 max-w-4xl">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
        </div>
        <Link
          href="/listings/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm rounded-xl transition-colors"
        >
          <Plus size={16} />New Listing
        </Link>
      </div>

      {listings.length === 0 && (
        <div className="card p-16 text-center">
          <p className="text-gray-500 mb-4">No listings yet. Start earning today!</p>
          <Link href="/listings/new" className="btn-primary">Create First Listing</Link>
        </div>
      )}

      {listings.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Listings', value: listings.length },
            { label: 'Active', value: listings.filter(l => l.status === 'active').length },
            { label: 'Total Rentals', value: listings.reduce((s, l) => s + l.stats.totalRentals, 0) },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {listings.map(listing => (
          <div key={listing.id} className="card p-4 flex gap-4">
            <img
              src={listing.photos[0]}
              alt={listing.title}
              className="w-24 h-20 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900 truncate">{listing.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {listing.location.neighborhood} · {formatCents(listing.pricing.dailyRate)}/day
                  </p>
                </div>
                <Badge
                  variant={
                    listing.status === 'active' ? 'success' :
                    listing.status === 'paused' ? 'warning' : 'default'
                  }
                >
                  {listing.status}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye size={11} />{listing.stats.viewCount} views
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={11} />{listing.stats.totalRentals} rentals
                </span>
                {listing.stats.reviewCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={11} className="fill-brand-400 text-brand-400" />
                    {listing.stats.averageRating.toFixed(1)} ({listing.stats.reviewCount})
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <Link
                  href={`/listings/${listing.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
                >
                  <Eye size={11} />View
                </Link>
                <Link
                  href={`/listings/${listing.id}/availability`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
                >
                  <CalendarDays size={11} />Availability
                </Link>
                <Link
                  href={`/listings/${listing.id}/edit`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
                >
                  <Edit3 size={11} />Edit
                </Link>
                <ListingStatusButton id={listing.id} status={listing.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

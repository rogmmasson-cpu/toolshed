'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Eye, Pause, Play, Edit3, TrendingUp, Star, CalendarDays } from 'lucide-react'
import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import { getLocalListings, updateLocalListing, saveLocalListing } from '@/lib/utils/local-listings'
import { formatCents } from '@/lib/utils/formatting'
import Badge from '@/components/ui/Badge'
import { Listing } from '@/lib/types'

function getMockOwnerListings() {
  return MOCK_LISTINGS.filter(l => l.ownerId === 'usr_current' || l.ownerId === 'usr_3')
}

export default function ManageListingsPage() {
  const [localListings, setLocalListings] = useState<Listing[]>([])

  useEffect(() => {
    setLocalListings(getLocalListings())
  }, [])

  function toggleStatus(id: string, current: string, listing: Listing) {
    const next = current === 'active' ? 'paused' : 'active'
    const inLocal = localListings.some(l => l.id === id)
    if (inLocal) {
      updateLocalListing(id, { status: next as any })
    } else {
      saveLocalListing({ ...listing, status: next as any })
    }
    setLocalListings(getLocalListings())
  }

  const mockListings = getMockOwnerListings()
  // Deduplicate: if a mock listing has been adopted into localStorage, use that version
  const localIds = new Set(localListings.map(l => l.id))
  const all = [...localListings, ...mockListings.filter(l => !localIds.has(l.id))]

  return (
    <div className="container-app py-8 max-w-4xl">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
            <ArrowLeft size={18}/>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
        </div>
        <Link href="/listings/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm rounded-xl transition-colors">
          <Plus size={16}/>New Listing
        </Link>
      </div>

      {all.length === 0 && (
        <div className="card p-16 text-center">
          <p className="text-gray-500 mb-4">No listings yet. Start earning today!</p>
          <Link href="/listings/new" className="btn-primary">Create First Listing</Link>
        </div>
      )}

      {all.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Listings', value: all.length },
            { label: 'Active', value: all.filter(l => l.status === 'active').length },
            { label: 'Total Rentals', value: all.reduce((s, l) => s + l.stats.totalRentals, 0) },
          ].map(s => (
            <div key={s.label} className="card p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {all.map(listing => {
          const isNew = listing.id.startsWith('lst_local_')
          return (
            <div key={listing.id} className="card p-4 flex gap-4">
              <img src={listing.photos[0]} alt={listing.title} className="w-24 h-20 rounded-xl object-cover flex-shrink-0"/>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 truncate">{listing.title}</p>
                      {isNew && <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">New</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{listing.location.neighborhood} · {formatCents(listing.pricing.dailyRate)}/day</p>
                  </div>
                  <Badge variant={listing.status === 'active' ? 'success' : listing.status === 'paused' ? 'warning' : 'default'}>
                    {listing.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Eye size={11}/>{listing.stats.viewCount} views</span>
                  <span className="flex items-center gap-1"><TrendingUp size={11}/>{listing.stats.totalRentals} rentals</span>
                  {listing.stats.reviewCount > 0 && (
                    <span className="flex items-center gap-1"><Star size={11} className="fill-brand-400 text-brand-400"/>{listing.stats.averageRating.toFixed(1)} ({listing.stats.reviewCount})</span>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <Link href={`/listings/${listing.id}`} className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg transition-colors">
                    <Eye size={11}/>View
                  </Link>
                  <Link
                    href={`/listings/${listing.id}/availability`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <CalendarDays size={11}/>Availability
                  </Link>
                  <Link
                    href={`/listings/${listing.id}/edit`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Edit3 size={11}/>Edit
                  </Link>
                  <button
                    onClick={() => toggleStatus(listing.id, listing.status, listing)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
                  >
                    {listing.status === 'active' ? <><Pause size={11}/>Pause</> : <><Play size={11}/>Activate</>}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

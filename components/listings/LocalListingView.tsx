'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, CheckCircle2, Package, Lock } from 'lucide-react'
import { getLocalListingById } from '@/lib/utils/local-listings'
import { formatCents, formatDate, formatLocation } from '@/lib/utils/formatting'
import { getCategoryDef } from '@/lib/constants/categories'
import { Listing } from '@/lib/types'
import Badge from '@/components/ui/Badge'

const conditionLabels: Record<string, string> = { 'like-new': 'Like New', excellent: 'Excellent', good: 'Good', fair: 'Fair' }

export default function LocalListingView({ id }: { id: string }) {
  const [listing, setListing] = useState<Listing | null>(null)

  useEffect(() => {
    setListing(getLocalListingById(id))
  }, [id])

  if (!listing) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-gray-500 mb-4">Listing not found.</p>
        <Link href="/dashboard/listings" className="text-brand-600 hover:underline">← Back to My Listings</Link>
      </div>
    )
  }

  const cat = getCategoryDef(listing.category)

  return (
    <div className="container-app py-8 max-w-3xl">
      <Link href="/dashboard/listings" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft size={16} /> Back to My Listings
      </Link>

      <img
        src={listing.photos[0]}
        alt={listing.title}
        className="w-full h-64 object-cover rounded-2xl mb-6"
      />

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`badge ${cat.color}`}>{cat.emoji} {cat.label}</span>
        <Badge variant="default">{conditionLabels[listing.condition] ?? listing.condition}</Badge>
        {listing.availability.instantBook && <Badge variant="success">⚡ Instant Book</Badge>}
        <Badge variant="success">active</Badge>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h1>
      <p className="text-sm text-gray-500 flex items-center gap-1 mb-6">
        <MapPin size={13} />{formatLocation(listing.location.city, listing.location.state)}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{formatCents(listing.pricing.dailyRate)}</p>
          <p className="text-xs text-gray-500 mt-1">per day</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{formatCents(listing.pricing.depositAmount)}</p>
          <p className="text-xs text-gray-500 mt-1">deposit</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{listing.availability.minRentalDays}d</p>
          <p className="text-xs text-gray-500 mt-1">minimum</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3 mb-6">
        <Lock size={14} className="text-gray-400 flex-shrink-0" />
        <span>Exact address shared only after a booking is confirmed.</span>
      </div>

      {listing.description && (
        <div className="mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">Description</h2>
          <p className="text-gray-600 leading-relaxed">{listing.description}</p>
        </div>
      )}

      {listing.accessories.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">What&apos;s included</h2>
          <ul className="space-y-1">
            {listing.accessories.map((acc, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={14} className="text-forest-500" />{acc}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {listing.brand && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Brand</p>
            <p className="font-semibold text-gray-900">{listing.brand}</p>
          </div>
        )}
        {listing.model && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Model</p>
            <p className="font-semibold text-gray-900">{listing.model}</p>
          </div>
        )}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500">Listed</p>
          <p className="font-semibold text-gray-900">{formatDate(listing.createdAt)}</p>
        </div>
        {listing.retailValue > 0 && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Retail Value</p>
            <p className="font-semibold text-gray-900">{formatCents(listing.retailValue)}</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/dashboard/listings"
          className="flex-1 text-center px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl transition-colors"
        >
          ← My Listings
        </Link>
        <Link
          href={`/listings/${id}/edit`}
          className="flex-1 text-center px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm rounded-xl transition-colors"
        >
          Edit Listing
        </Link>
      </div>
    </div>
  )
}

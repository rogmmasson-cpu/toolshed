import Link from 'next/link'
import { MapPin, Zap } from 'lucide-react'
import { ListingWithOwner } from '@/lib/types'
import { formatCents } from '@/lib/utils/formatting'
import { getCategoryDef } from '@/lib/constants/categories'
import StarRating from '@/components/ui/StarRating'
import Avatar from '@/components/ui/Avatar'

interface ListingCardProps {
  listing: ListingWithOwner
}

const conditionColors = {
  'like-new': 'bg-green-100 text-green-700',
  'excellent': 'bg-blue-100 text-blue-700',
  'good': 'bg-gray-100 text-gray-600',
  'fair': 'bg-yellow-100 text-yellow-700',
}
const conditionLabels = {
  'like-new': 'Like New', 'excellent': 'Excellent', 'good': 'Good', 'fair': 'Fair',
}

export default function ListingCard({ listing }: ListingCardProps) {
  const cat = getCategoryDef(listing.category)

  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="card-hover overflow-hidden rounded-2xl h-full flex flex-col">
        {/* Photo */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img
            src={listing.photos[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category badge */}
          <span className={`absolute top-3 left-3 badge ${cat.color}`}>
            {cat.emoji} {cat.label}
          </span>
          {/* Instant book */}
          {listing.availability.instantBook && (
            <span className="absolute top-3 right-3 badge bg-forest-100 text-forest-700">
              <Zap size={10} />Instant
            </span>
          )}
          {/* Bundle */}
          {listing.toolKit.isBundle && (
            <span className="absolute bottom-3 left-3 badge bg-purple-100 text-purple-700">
              📦 Kit Bundle
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-brand-600 transition-colors">
            {listing.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
            <MapPin size={11} />
            <span>{listing.location.neighborhood}, {listing.location.city}</span>
          </div>

          {/* Condition */}
          <div className="mb-3">
            <span className={`badge text-xs ${conditionColors[listing.condition]}`}>
              {conditionLabels[listing.condition]}
            </span>
          </div>

          <div className="mt-auto flex items-end justify-between">
            {/* Price */}
            <div>
              <span className="text-lg font-bold text-gray-900">{formatCents(listing.pricing.dailyRate)}</span>
              <span className="text-xs text-gray-500">/day</span>
            </div>

            {/* Rating + owner */}
            <div className="flex items-center gap-2">
              <StarRating rating={listing.stats.averageRating} count={listing.stats.reviewCount} />
              <Avatar src={listing.owner.avatarUrl} name={listing.owner.name} size="xs" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

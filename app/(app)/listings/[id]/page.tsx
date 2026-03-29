import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Package, CheckCircle2, ArrowLeft, Users, Clock, Lock } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import LocalListingView from '@/components/listings/LocalListingView'
import { getListingById, getSimilarListings } from '@/lib/mock-db/listings'
import { getReviewsForListing } from '@/lib/mock-db/reviews'
import { getCategoryDef } from '@/lib/constants/categories'
import { formatCents, formatDate, formatLocation } from '@/lib/utils/formatting'
import PhotoGallery from '@/components/listings/PhotoGallery'
import PricingCard from '@/components/listings/PricingCard'
import ReviewCard from '@/components/reviews/ReviewCard'
import ListingCard from '@/components/listings/ListingCard'
import Avatar from '@/components/ui/Avatar'
import StarRating from '@/components/ui/StarRating'
import Badge from '@/components/ui/Badge'
import TrustScoreCard from '@/components/profile/TrustScoreCard'
import { getUserById } from '@/lib/mock-db/users'
import MessageOwnerButton from '@/components/messages/MessageOwnerButton'

const conditionLabels = { 'like-new': 'Like New', 'excellent': 'Excellent', 'good': 'Good', 'fair': 'Fair' }
const conditionColors = { 'like-new': 'success', 'excellent': 'info', 'good': 'default', 'fair': 'warning' } as const

interface Props { params: Promise<{ id: string }> }

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params

  // Local listings are stored in localStorage — render client-side
  if (id.startsWith('lst_local_')) {
    return <LocalListingView id={id} />
  }

  const listing = await getListingById(id)
  if (!listing) notFound()

  const [{ userId }, reviews, similar, owner] = await Promise.all([
    auth(),
    getReviewsForListing(id),
    getSimilarListings(listing),
    getUserById(listing.ownerId),
  ])

  const cat = getCategoryDef(listing.category)

  return (
    <div className="container-app py-8">
      {/* Back */}
      <Link href="/browse" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft size={16} /> Back to results
      </Link>

      {/* Photo gallery */}
      <PhotoGallery photos={listing.photos} title={listing.title} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`badge ${cat.color}`}>{cat.emoji} {cat.label}</span>
              <Badge variant={conditionColors[listing.condition]}>{conditionLabels[listing.condition]}</Badge>
              {listing.availability.instantBook && <Badge variant="success">⚡ Instant Book</Badge>}
              {listing.toolKit.isBundle && <Badge variant="default">📦 Kit Bundle</Badge>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={14} />{formatLocation(listing.location.neighborhood, listing.location.city)}</span>
              <StarRating rating={listing.stats.averageRating} count={listing.stats.reviewCount} size="md" />
              <span className="flex items-center gap-1"><Users size={14} />{listing.stats.totalRentals} rentals</span>
            </div>
          </div>

          {/* Owner */}
          <div className="card p-5">
            <Link href={`/profile/${listing.ownerId}`} className="flex items-center gap-4 hover:opacity-90">
              <Avatar src={listing.owner.avatarUrl} name={listing.owner.name} size="lg" />
              <div>
                <p className="font-semibold text-gray-900">{listing.owner.name}</p>
                <p className="text-sm text-gray-500">
                  Trust score <span className="font-semibold text-brand-500">{listing.owner.trustScore}</span> ·{' '}
                  {Math.round(listing.owner.responseRate * 100)}% response rate
                </p>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <Clock size={11} /> Quick responder
                </p>
              </div>
              <span className="ml-auto text-brand-500 text-sm font-medium">View profile →</span>
            </Link>
            <MessageOwnerButton
              listingId={listing.id}
              ownerId={listing.ownerId}
              ownerName={listing.owner.name}
              currentUserId={userId ?? null}
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="font-semibold text-gray-900 text-lg mb-3">About this item</h2>
            <p className="text-gray-600 leading-relaxed">{listing.description}</p>
          </div>

          {/* Location privacy note */}
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
            <Lock size={14} className="text-gray-400 flex-shrink-0" />
            <span>Exact address shared only after a booking is confirmed.</span>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {listing.brand && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Brand</p>
                <p className="font-semibold text-gray-900">{listing.brand}</p>
              </div>
            )}
            {listing.model && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Model</p>
                <p className="font-semibold text-gray-900">{listing.model}</p>
              </div>
            )}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Min. Rental</p>
              <p className="font-semibold text-gray-900">{listing.availability.minRentalDays} day{listing.availability.minRentalDays > 1 ? 's' : ''}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Retail Value</p>
              <p className="font-semibold text-gray-900">{formatCents(listing.retailValue)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Listed</p>
              <p className="font-semibold text-gray-900">{listing.publishedAt ? formatDate(listing.publishedAt) : 'N/A'}</p>
            </div>
          </div>

          {/* Accessories */}
          {listing.accessories.length > 0 && (
            <div>
              <h2 className="font-semibold text-gray-900 text-lg mb-3">What&apos;s included</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {listing.accessories.map((acc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="text-forest-500 flex-shrink-0" />
                    {acc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pricing breakdown */}
          <div>
            <h2 className="font-semibold text-gray-900 text-lg mb-3">Pricing</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{formatCents(listing.pricing.dailyRate)}</p>
                <p className="text-xs text-gray-500 mt-1">per day</p>
              </div>
              {listing.pricing.weeklyRate && (
                <div className="border border-brand-200 bg-brand-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-brand-600">{formatCents(listing.pricing.weeklyRate)}</p>
                  <p className="text-xs text-brand-500 mt-1">per week</p>
                  <p className="text-xs text-forest-600 font-medium">Save {Math.round((1 - listing.pricing.weeklyRate / (listing.pricing.dailyRate * 7)) * 100)}%</p>
                </div>
              )}
              {listing.pricing.monthlyRate && (
                <div className="border border-gray-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{formatCents(listing.pricing.monthlyRate)}</p>
                  <p className="text-xs text-gray-500 mt-1">per month</p>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
              <Package size={12} />
              {formatCents(listing.pricing.depositAmount)} refundable deposit · returned automatically after check-out
            </p>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900 text-lg">Reviews</h2>
              <StarRating rating={listing.stats.averageRating} count={listing.stats.reviewCount} size="lg" />
            </div>
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>
            ) : (
              <div className="space-y-5">
                {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
            )}
          </div>

          {/* Similar */}
          {similar.length > 0 && (
            <div>
              <h2 className="font-semibold text-gray-900 text-lg mb-5">Similar Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {similar.map((l) => <ListingCard key={l.id} listing={l} />)}
              </div>
            </div>
          )}
        </div>

        {/* Right: pricing card */}
        <div>
          <PricingCard listing={listing} />
          {owner && (
            <div className="mt-4">
              <TrustScoreCard user={owner} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

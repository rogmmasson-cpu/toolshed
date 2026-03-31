import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Calendar, MessageSquare, Star, Package, TrendingUp } from 'lucide-react'
import { getUserById } from '@/lib/mock-db/users'
import { getListingsByOwner } from '@/lib/mock-db/listings'
import { getReviewsForUser } from '@/lib/mock-db/reviews'
import Avatar from '@/components/ui/Avatar'
import ReviewCard from '@/components/reviews/ReviewCard'
import ListingCard from '@/components/listings/ListingCard'
import { formatDate } from '@/lib/utils/formatting'

interface Props { params: Promise<{ userId: string }> }

export default async function UserProfilePage({ params }: Props) {
  const { userId } = await params
  const [user, listings, reviews] = await Promise.all([
    getUserById(userId),
    getListingsByOwner(userId),
    getReviewsForUser(userId),
  ])
  if (!user) notFound()

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.ratings.overall, 0) / reviews.length
    : null

  return (
    <div className="container-app py-8 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: profile card */}
        <div className="space-y-4">
          <div className="card p-6 text-center">
            <Avatar src={user.avatarUrl} name={user.name} size="xl" className="mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mt-1">
              <MapPin size={14} />
              {user.location.neighborhood ? `${user.location.neighborhood}, ` : ''}{user.location.city}, {user.location.state}
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-1">
              <Calendar size={12} />
              Member since {formatDate(user.memberSince)}
            </div>
            {avgRating && (
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star size={14} className="fill-brand-400 text-brand-400" />
                <span className="font-semibold text-sm">{avgRating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">({reviews.length} reviews)</span>
              </div>
            )}
            {user.bio && <p className="text-sm text-gray-500 mt-4 leading-relaxed">{user.bio}</p>}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { value: user.totalListings, label: 'Listings' },
                { value: user.totalLends, label: 'Lends' },
                { value: `${Math.round(user.responseRate * 100)}%`, label: 'Response' },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-2">
                  <p className="text-lg font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            {userId !== 'usr_current' && (
              <Link
                href="/messages"
                className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                <MessageSquare size={16} />Message {user.name.split(' ')[0]}
              </Link>
            )}
          </div>

        </div>

        {/* Right: listings + reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Listings */}
          {listings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={18} className="text-brand-500" />
                {user.name.split(' ')[0]}&apos;s Tools ({listings.filter(l => l.status === 'active').length} available)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {listings.filter(l => l.status === 'active').slice(0, 4).map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star size={18} className="text-brand-400 fill-brand-400" />
              Reviews ({reviews.length})
            </h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm">No reviews yet.</p>
            ) : (
              <div className="card p-5 space-y-5">
                {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

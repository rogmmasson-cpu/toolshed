import { notFound } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { ArrowLeft } from 'lucide-react'
import { getBookingById } from '@/lib/mock-db/bookings'
import { getListingById } from '@/lib/mock-db/listings'
import { getUserById } from '@/lib/mock-db/users'
import Avatar from '@/components/ui/Avatar'
import ReviewForm from '@/components/reviews/ReviewForm'

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ bookingId: string }>
}) {
  const { bookingId } = await params
  const { userId } = await auth()

  if (!userId) notFound()

  const booking = await getBookingById(bookingId)
  if (!booking || booking.renterId !== userId) notFound()
  if (booking.renterReviewId) {
    return (
      <div className="container-app py-16 max-w-sm mx-auto text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Already Reviewed</h2>
        <p className="text-gray-500 mb-6">You've already left a review for this rental.</p>
        <Link href="/dashboard/rentals" className="btn-primary">Back to Rentals</Link>
      </div>
    )
  }

  const [listing, owner] = await Promise.all([
    getListingById(booking.listingId),
    getUserById(booking.ownerId),
  ])

  return (
    <div className="container-app py-8 max-w-lg mx-auto">
      <Link href="/dashboard/rentals" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <ArrowLeft size={15} /> Back
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Leave a Review</h1>
      <p className="text-sm text-gray-500 mb-6">Your honest feedback helps the ToolShed community.</p>

      {listing && owner && (
        <div className="card p-4 mb-6 flex gap-3">
          {listing.photos[0] && (
            <img src={listing.photos[0]} alt="" className="w-16 h-14 rounded-xl object-cover flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{listing.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <Avatar src={owner.avatarUrl} name={owner.name} size="xs" />
              <span className="text-xs text-gray-500">Owned by {owner.name}</span>
            </div>
          </div>
        </div>
      )}

      <ReviewForm bookingId={bookingId} />
    </div>
  )
}

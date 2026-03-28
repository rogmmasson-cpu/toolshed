'use server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

async function upsertCurrentUser() {
  const [{ userId }, clerkUser] = await Promise.all([auth(), currentUser()])
  if (!userId || !clerkUser) throw new Error('Not authenticated')

  await db.user.upsert({
    where: { id: userId },
    update: {
      name: clerkUser.fullName ?? clerkUser.username ?? 'User',
      avatarUrl: clerkUser.imageUrl ?? null,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? '',
    },
    create: {
      id: userId,
      name: clerkUser.fullName ?? clerkUser.username ?? 'User',
      email: clerkUser.emailAddresses[0]?.emailAddress ?? '',
      avatarUrl: clerkUser.imageUrl ?? null,
    },
  })

  return userId
}

export interface CreateReviewInput {
  bookingId: string
  overallRating: number
  accuracyRating: number
  communicationRating: number
  conditionRating: number
  content: string
}

export async function createReview(input: CreateReviewInput): Promise<void> {
  const authorId = await upsertCurrentUser()

  const booking = await db.booking.findUnique({ where: { id: input.bookingId } })
  if (!booking) throw new Error('Booking not found')
  if (booking.renterId !== authorId) throw new Error('Only the renter can leave a review')
  if (booking.renterReviewId) throw new Error('You have already reviewed this booking')

  // Create the review
  const review = await db.review.create({
    data: {
      bookingId: input.bookingId,
      authorId,
      targetId: booking.ownerId,
      targetType: 'user',
      listingId: booking.listingId,
      overallRating: input.overallRating,
      accuracyRating: input.accuracyRating || null,
      communicationRating: input.communicationRating || null,
      conditionRating: input.conditionRating || null,
      content: input.content.trim(),
    },
  })

  // Mark the booking as reviewed
  await db.booking.update({
    where: { id: input.bookingId },
    data: { renterReviewId: review.id },
  })

  // Recalculate listing average rating
  const listingReviews = await db.review.findMany({
    where: { listingId: booking.listingId },
    select: { overallRating: true },
  })
  const avg = listingReviews.reduce((sum, r) => sum + r.overallRating, 0) / listingReviews.length
  await db.listing.update({
    where: { id: booking.listingId },
    data: {
      averageRating: Math.round(avg * 10) / 10,
      reviewCount: listingReviews.length,
    },
  })
}

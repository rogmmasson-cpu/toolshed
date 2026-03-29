import { db } from '@/lib/db'
import { Review } from '@/lib/types'
import type { Review as PrismaReview, User as PrismaUser } from '@prisma/client'

export interface ReviewWithAuthor extends Review {
  author: { id: string; name: string; avatarUrl: string | null }
}

function toReview(r: PrismaReview): Review {
  return {
    id: r.id,
    bookingId: r.bookingId,
    authorId: r.authorId,
    targetId: r.targetId,
    targetType: r.targetType as Review['targetType'],
    ratings: {
      overall: r.overallRating,
      accuracy: r.accuracyRating,
      communication: r.communicationRating,
      condition: r.conditionRating,
      reliability: r.reliabilityRating,
    },
    content: r.content,
    response: r.response,
    isVisible: r.isVisible,
    createdAt: r.createdAt.toISOString(),
  }
}

type PrismaReviewWithAuthor = PrismaReview & { author: PrismaUser }

function toReviewWithAuthor(r: PrismaReviewWithAuthor): ReviewWithAuthor {
  return {
    ...toReview(r),
    author: {
      id: r.author.id,
      name: r.author.name,
      avatarUrl: r.author.avatarUrl ?? null,
    },
  }
}

export async function getReviewsForListing(listingId: string): Promise<ReviewWithAuthor[]> {
  // Get the listing to find the owner
  const listing = await db.listing.findUnique({
    where: { id: listingId },
    select: { ownerId: true },
  })
  if (!listing) return []

  const reviews = await db.review.findMany({
    where: {
      OR: [
        { targetId: listing.ownerId, targetType: 'owner' },
        { targetId: listingId, targetType: 'tool' },
      ],
      isVisible: true,
    },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  return reviews.map(toReviewWithAuthor)
}

export async function getReviewsForUser(userId: string): Promise<ReviewWithAuthor[]> {
  const reviews = await db.review.findMany({
    where: { targetId: userId, isVisible: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })

  return reviews.map(toReviewWithAuthor)
}

export async function getReviewsByAuthor(authorId: string): Promise<ReviewWithAuthor[]> {
  const reviews = await db.review.findMany({
    where: { authorId, isVisible: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })

  return reviews.map(toReviewWithAuthor)
}

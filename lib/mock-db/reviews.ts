import { MOCK_REVIEWS } from '@/lib/data/mock-reviews'
import { MOCK_USERS } from '@/lib/data/mock-users'
import { Review } from '@/lib/types'

export interface ReviewWithAuthor extends Review {
  author: { id: string; name: string; avatarUrl: string | null }
}

function attachAuthor(review: Review): ReviewWithAuthor {
  const author = MOCK_USERS.find((u) => u.id === review.authorId)!
  return { ...review, author: { id: author.id, name: author.name, avatarUrl: author.avatarUrl } }
}

export async function getReviewsForListing(listingId: string): Promise<ReviewWithAuthor[]> {
  // Reviews where target is the owner of the listing — simplified mock
  return MOCK_REVIEWS
    .filter((r) => r.isVisible && (r.targetType === 'owner' || r.targetType === 'tool'))
    .slice(0, 4)
    .map(attachAuthor)
}

export async function getReviewsForUser(userId: string): Promise<ReviewWithAuthor[]> {
  return MOCK_REVIEWS
    .filter((r) => r.targetId === userId && r.isVisible)
    .map(attachAuthor)
}

'use server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

function getAdminIds(): string[] {
  return (process.env.ADMIN_USER_IDS ?? '').split(',').map(s => s.trim()).filter(Boolean)
}

async function requireAdmin(): Promise<string> {
  const { userId } = await auth()
  if (!userId || !getAdminIds().includes(userId)) throw new Error('Forbidden')
  return userId
}

export async function adminBanUser(userId: string, reason: string) {
  await requireAdmin()
  await db.user.update({
    where: { id: userId },
    data: { bannedAt: new Date(), bannedReason: reason },
  })
  revalidatePath('/admin/users')
}

export async function adminUnbanUser(userId: string) {
  await requireAdmin()
  await db.user.update({
    where: { id: userId },
    data: { bannedAt: null, bannedReason: null },
  })
  revalidatePath('/admin/users')
}

export async function adminTakeDownListing(listingId: string, reason: string) {
  await requireAdmin()
  await db.listing.update({
    where: { id: listingId },
    data: { status: 'archived', takenDownReason: reason },
  })
  revalidatePath('/admin/listings')
}

export async function adminRestoreListing(listingId: string) {
  await requireAdmin()
  await db.listing.update({
    where: { id: listingId },
    data: { status: 'active', takenDownReason: null },
  })
  revalidatePath('/admin/listings')
}

export async function adminHideReview(reviewId: string) {
  await requireAdmin()
  await db.review.update({ where: { id: reviewId }, data: { isVisible: false } })
  revalidatePath('/admin/reviews')
}

export async function adminShowReview(reviewId: string) {
  await requireAdmin()
  await db.review.update({ where: { id: reviewId }, data: { isVisible: true } })
  revalidatePath('/admin/reviews')
}

export async function adminResolveDispute(
  disputeId: string,
  resolution: string,
  note: string,
  adminName: string
) {
  await requireAdmin()
  await db.$transaction([
    db.dispute.update({
      where: { id: disputeId },
      data: {
        status: 'resolved',
        resolution,
        resolutionNote: note,
        resolvedAt: new Date(),
      },
    }),
    db.disputeEvent.create({
      data: {
        disputeId,
        type: 'resolved',
        authorRole: 'admin',
        authorName: adminName,
        content: `Resolution: ${resolution}. ${note}`,
      },
    }),
  ])
  revalidatePath('/admin/disputes')
}

export async function adminAddDisputeNote(
  disputeId: string,
  content: string,
  adminName: string
) {
  await requireAdmin()
  await db.disputeEvent.create({
    data: {
      disputeId,
      type: 'admin_note',
      authorRole: 'admin',
      authorName: adminName,
      content,
    },
  })
  revalidatePath('/admin/disputes')
}

export async function getAdminStats() {
  await requireAdmin()
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const [
    totalUsers, bannedUsers, newUsersWeek,
    activeListings, pausedListings, archivedListings,
    totalBookings, pendingBookings, completedBookings,
    openDisputes, resolvedDisputes,
    totalWaivers,
    hiddenReviews,
    totalReviews,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { bannedAt: { not: null } } }),
    db.user.count({ where: { createdAt: { gte: weekAgo } } }),
    db.listing.count({ where: { status: 'active' } }),
    db.listing.count({ where: { status: 'paused' } }),
    db.listing.count({ where: { status: 'archived' } }),
    db.booking.count(),
    db.booking.count({ where: { status: 'pending' } }),
    db.booking.count({ where: { status: 'completed' } }),
    db.dispute.count({ where: { status: 'open' } }),
    db.dispute.count({ where: { status: 'resolved' } }),
    db.booking.count({ where: { waiverSigned: true } }),
    db.review.count({ where: { isVisible: false } }),
    db.review.count(),
  ])
  return {
    totalUsers, bannedUsers, newUsersWeek,
    activeListings, pausedListings, archivedListings,
    totalBookings, pendingBookings, completedBookings,
    openDisputes, resolvedDisputes,
    totalWaivers,
    hiddenReviews, totalReviews,
  }
}

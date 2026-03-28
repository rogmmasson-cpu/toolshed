import { db } from '@/lib/db'
import { Booking, DepositStatus, BookingStatus } from '@/lib/types'
import type { Booking as PrismaBooking } from '@prisma/client'

function toBooking(r: PrismaBooking): Booking {
  return {
    id: r.id,
    listingId: r.listingId,
    renterId: r.renterId,
    ownerId: r.ownerId,
    qrCode: r.qrCode,
    dates: {
      startDate: r.startDate,
      endDate: r.endDate,
      totalDays: r.totalDays,
    },
    pricing: {
      dailyRate: r.dailyRate,
      subtotal: r.subtotal,
      platformFee: r.platformFee,
      insuranceFee: r.insuranceFee,
      depositAmount: r.depositAmount,
      totalCharge: r.totalCharge,
      totalWithDeposit: r.totalWithDeposit,
    },
    deposit: {
      status: r.depositStatus as DepositStatus,
      heldAmount: r.heldAmount,
      releasedAt: r.releasedAt ? r.releasedAt.toISOString() : null,
      claimedAmount: r.claimedAmount,
      claimReason: r.claimReason,
    },
    waiver: {
      signed: r.waiverSigned,
      signedAt: r.waiverSignedAt ? r.waiverSignedAt.toISOString() : null,
      ipAddress: r.waiverIpAddress,
    },
    insurance: {
      enrolled: r.insuranceEnrolled,
      provider: r.insuranceProvider,
      policyId: r.insurancePolicyId,
    },
    checkIn: {
      completed: r.checkInCompleted,
      completedAt: r.checkInAt ? r.checkInAt.toISOString() : null,
      method: r.checkInMethod as Booking['checkIn']['method'],
    },
    checkOut: {
      completed: r.checkOutCompleted,
      completedAt: r.checkOutAt ? r.checkOutAt.toISOString() : null,
      method: r.checkOutMethod as Booking['checkOut']['method'],
    },
    status: r.status as BookingStatus,
    renterReviewId: r.renterReviewId,
    ownerReviewId: r.ownerReviewId,
    conversationId: r.conversationId,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const row = await db.booking.findUnique({ where: { id } })
  return row ? toBooking(row) : null
}

export async function getBookingsByRenter(renterId: string): Promise<Booking[]> {
  const rows = await db.booking.findMany({ where: { renterId }, orderBy: { createdAt: 'desc' } })
  return rows.map(toBooking)
}

export async function getBookingsByOwner(ownerId: string): Promise<Booking[]> {
  const rows = await db.booking.findMany({ where: { ownerId }, orderBy: { createdAt: 'desc' } })
  return rows.map(toBooking)
}

export async function getActiveBookings(userId: string): Promise<Booking[]> {
  const rows = await db.booking.findMany({
    where: {
      OR: [{ renterId: userId }, { ownerId: userId }],
      status: 'active',
    },
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toBooking)
}

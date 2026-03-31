'use server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { calcBookingPricing } from '@/lib/utils/pricing'
import { nanoid } from 'nanoid'

export interface CreateBookingInput {
  listingId: string
  ownerId: string
  startDate: string
  endDate: string
  totalDays: number
  dailyRate: number
  depositAmount: number
  weekendRate: number | null
  insuranceEnrolled: boolean
  instantBook: boolean
  waiverSigned: boolean
  waiverSignature: string
}

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

export async function createBooking(input: CreateBookingInput): Promise<string> {
  const renterId = await upsertCurrentUser()

  // Guard: listing must be active
  const listing = await db.listing.findUnique({ where: { id: input.listingId }, select: { status: true } })
  if (!listing) throw new Error('Listing not found')
  if (listing.status !== 'active') throw new Error('This listing is currently paused and not accepting bookings.')

  const pricing = calcBookingPricing(
    input.dailyRate,
    input.totalDays,
    input.depositAmount,
    input.weekendRate,
    input.startDate,
  )

  const status = input.instantBook ? 'approved' : 'pending'
  const qrCode = nanoid(12)

  const booking = await db.booking.create({
    data: {
      listingId: input.listingId,
      renterId,
      ownerId: input.ownerId,
      qrCode,
      startDate: input.startDate,
      endDate: input.endDate,
      totalDays: input.totalDays,
      dailyRate: pricing.dailyRate,
      subtotal: pricing.subtotal,
      platformFee: pricing.platformFee,
      insuranceFee: 0,
      depositAmount: pricing.depositAmount,
      totalCharge: pricing.totalCharge,
      totalWithDeposit: pricing.totalWithDeposit,
      heldAmount: pricing.depositAmount,
      waiverSigned: input.waiverSigned,
      waiverSignedAt: input.waiverSigned ? new Date() : null,
      insuranceEnrolled: input.insuranceEnrolled,
      status,
    },
  })

  return booking.id
}

export async function approveBooking(bookingId: string): Promise<void> {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const booking = await db.booking.findUnique({ where: { id: bookingId } })
  if (!booking) throw new Error('Booking not found')
  if (booking.ownerId !== userId) throw new Error('Unauthorized')

  await db.booking.update({
    where: { id: bookingId },
    data: { status: 'approved' },
  })
}

export async function declineBooking(bookingId: string): Promise<void> {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const booking = await db.booking.findUnique({ where: { id: bookingId } })
  if (!booking) throw new Error('Booking not found')
  if (booking.ownerId !== userId) throw new Error('Unauthorized')

  await db.booking.update({
    where: { id: bookingId },
    data: { status: 'cancelled' },
  })
}

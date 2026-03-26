import { MOCK_BOOKINGS } from '@/lib/data/mock-bookings'
import { Booking } from '@/lib/types'

export async function getBookingById(id: string): Promise<Booking | null> {
  return MOCK_BOOKINGS.find((b) => b.id === id) ?? null
}

export async function getBookingsByRenter(renterId: string): Promise<Booking[]> {
  return MOCK_BOOKINGS.filter((b) => b.renterId === renterId)
}

export async function getBookingsByOwner(ownerId: string): Promise<Booking[]> {
  return MOCK_BOOKINGS.filter((b) => b.ownerId === ownerId)
}

export async function getActiveBookings(userId: string): Promise<Booking[]> {
  return MOCK_BOOKINGS.filter(
    (b) => (b.renterId === userId || b.ownerId === userId) && b.status === 'active'
  )
}

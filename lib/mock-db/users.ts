import { db } from '@/lib/db'
import { User } from '@/lib/types'

function toUser(u: {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  bio: string | null
  locationCity: string
  locationState: string
  locationNeighborhood: string | null
  locationLat: number
  locationLng: number
  trustScore: number
  badges: string[]
  memberSince: Date
  responseRate: number
  responseTimeHours: number
  totalListings: number
  totalRentals: number
  totalLends: number
}): User {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    avatarUrl: u.avatarUrl,
    bio: u.bio,
    location: {
      city: u.locationCity,
      state: u.locationState,
      neighborhood: u.locationNeighborhood,
      lat: u.locationLat,
      lng: u.locationLng,
    },
    trustScore: u.trustScore,
    badges: u.badges as User['badges'],
    memberSince: u.memberSince.toISOString(),
    responseRate: u.responseRate,
    responseTimeHours: u.responseTimeHours,
    totalListings: u.totalListings,
    totalRentals: u.totalRentals,
    totalLends: u.totalLends,
    groupIds: [],
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const u = await db.user.findUnique({ where: { id } })
  return u ? toUser(u) : null
}

export async function getCurrentUser(userId: string): Promise<User | null> {
  return getUserById(userId)
}

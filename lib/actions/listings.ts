'use server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { ToolCategory, ToolCondition } from '@/lib/types'

export interface CreateListingInput {
  title: string
  category: ToolCategory
  description: string
  condition: ToolCondition
  brand: string
  model: string
  retailValue: number       // cents
  accessories: string[]
  dailyRate: number         // cents
  weekendRate: number | null
  depositAmount: number     // cents
  instantBook: boolean
  minRentalDays: number
  photos: string[]
  location: {
    address: string
    neighborhood: string
    city: string
    state: string
    lat: number
    lng: number
  }
}

export interface UpdateListingInput extends Partial<CreateListingInput> {
  status?: 'active' | 'paused' | 'archived'
}

// Ensure the Clerk user exists in our DB before writing any listings
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

export async function createListing(input: CreateListingInput): Promise<string> {
  const userId = await upsertCurrentUser()

  const listing = await db.listing.create({
    data: {
      ownerId: userId,
      title: input.title,
      description: input.description,
      category: input.category,
      condition: input.condition,
      brand: input.brand || null,
      model: input.model || null,
      retailValue: input.retailValue,
      photos: input.photos,
      tags: [input.category, input.brand].filter(Boolean) as string[],
      accessories: input.accessories,
      locationAddress: input.location.address,
      locationNeighborhood: input.location.neighborhood,
      locationCity: input.location.city,
      locationState: input.location.state,
      locationLat: input.location.lat,
      locationLng: input.location.lng,
      dailyRate: input.dailyRate,
      weekendRate: input.weekendRate,
      depositAmount: input.depositAmount,
      instantBook: input.instantBook,
      minRentalDays: input.minRentalDays,
      status: 'active',
      publishedAt: new Date(),
    },
  })

  return listing.id
}

export async function updateListing(id: string, input: UpdateListingInput): Promise<void> {
  const userId = await upsertCurrentUser()

  // Verify ownership
  const existing = await db.listing.findUnique({ where: { id }, select: { ownerId: true } })
  if (!existing) throw new Error('Listing not found')
  if (existing.ownerId !== userId) throw new Error('Not authorized')

  await db.listing.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.condition !== undefined && { condition: input.condition }),
      ...(input.brand !== undefined && { brand: input.brand || null }),
      ...(input.model !== undefined && { model: input.model || null }),
      ...(input.retailValue !== undefined && { retailValue: input.retailValue }),
      ...(input.accessories !== undefined && { accessories: input.accessories }),
      ...(input.photos !== undefined && { photos: input.photos }),
      ...(input.dailyRate !== undefined && { dailyRate: input.dailyRate }),
      ...(input.weekendRate !== undefined && { weekendRate: input.weekendRate }),
      ...(input.depositAmount !== undefined && { depositAmount: input.depositAmount }),
      ...(input.instantBook !== undefined && { instantBook: input.instantBook }),
      ...(input.minRentalDays !== undefined && { minRentalDays: input.minRentalDays }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.location !== undefined && {
        locationAddress: input.location.address,
        locationNeighborhood: input.location.neighborhood,
        locationCity: input.location.city,
        locationState: input.location.state,
        locationLat: input.location.lat,
        locationLng: input.location.lng,
      }),
    },
  })
}

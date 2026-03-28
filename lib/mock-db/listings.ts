import { db } from '@/lib/db'
import { Listing, ListingWithOwner, SearchFilters, ToolCategory, ToolCondition } from '@/lib/types'
import type { Listing as PrismaListing, User as PrismaUser } from '@prisma/client'

type PrismaListingWithOwner = PrismaListing & {
  owner: Pick<PrismaUser, 'id' | 'name' | 'avatarUrl' | 'trustScore' | 'badges' | 'responseRate'>
}

const ownerSelect = {
  id: true,
  name: true,
  avatarUrl: true,
  trustScore: true,
  badges: true,
  responseRate: true,
}

function toListing(r: PrismaListing): Listing {
  return {
    id: r.id,
    ownerId: r.ownerId,
    title: r.title,
    description: r.description,
    category: r.category as ToolCategory,
    condition: r.condition as ToolCondition,
    brand: r.brand,
    model: r.model,
    retailValue: r.retailValue,
    photos: r.photos,
    tags: r.tags,
    accessories: r.accessories,
    location: {
      address: r.locationAddress,
      neighborhood: r.locationNeighborhood,
      city: r.locationCity,
      state: r.locationState,
      lat: r.locationLat,
      lng: r.locationLng,
    },
    pricing: {
      dailyRate: r.dailyRate,
      weekendRate: r.weekendRate,
      weeklyRate: r.weeklyRate,
      monthlyRate: r.monthlyRate,
      depositAmount: r.depositAmount,
      insuranceAvailable: r.insuranceAvailable,
      insuranceDailyRate: r.insuranceDailyRate,
    },
    availability: {
      blockedDates: r.blockedDates,
      minRentalDays: r.minRentalDays,
      maxRentalDays: r.maxRentalDays,
      instantBook: r.instantBook,
    },
    toolKit: {
      isBundle: r.isBundle,
      bundledListingIds: r.bundledListingIds,
      bundleDiscount: r.bundleDiscount,
    },
    stats: {
      averageRating: r.averageRating,
      reviewCount: r.reviewCount,
      totalRentals: r.totalRentals,
      viewCount: r.viewCount,
    },
    status: r.status as Listing['status'],
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }
}

function toListingWithOwner(r: PrismaListingWithOwner): ListingWithOwner {
  return {
    ...toListing(r),
    owner: {
      id: r.owner.id,
      name: r.owner.name,
      avatarUrl: r.owner.avatarUrl,
      trustScore: r.owner.trustScore,
      badges: r.owner.badges as ListingWithOwner['owner']['badges'],
      responseRate: r.owner.responseRate,
    },
  }
}

export async function getListings(filters?: Partial<SearchFilters>): Promise<ListingWithOwner[]> {
  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { status: 'active' }

  if (filters?.category) where.category = filters.category
  if (filters?.instantBookOnly) where.instantBook = true
  if (filters?.condition) where.condition = filters.condition
  if (filters?.minPrice || filters?.maxPrice) {
    where.dailyRate = {}
    if (filters.minPrice) where.dailyRate.gte = filters.minPrice
    if (filters.maxPrice) where.dailyRate.lte = filters.maxPrice
  }
  if (filters?.minRating) where.averageRating = { gte: filters.minRating }
  if (filters?.query) {
    const q = filters.query
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { brand: { contains: q, mode: 'insensitive' } },
      { tags: { has: q.toLowerCase() } },
    ]
  }

  // Build orderBy
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orderBy: any = { createdAt: 'desc' }
  switch (filters?.sortBy) {
    case 'price-asc':  orderBy = { dailyRate: 'asc' }; break
    case 'price-desc': orderBy = { dailyRate: 'desc' }; break
    case 'rating':     orderBy = { averageRating: 'desc' }; break
    case 'newest':     orderBy = { createdAt: 'desc' }; break
  }

  const rows = await db.listing.findMany({ where, orderBy, include: { owner: { select: ownerSelect } } })
  return rows.map(toListingWithOwner)
}

export async function getListingById(id: string): Promise<ListingWithOwner | null> {
  const row = await db.listing.findUnique({ where: { id }, include: { owner: { select: ownerSelect } } })
  return row ? toListingWithOwner(row) : null
}

export async function getFeaturedListings(limit = 6): Promise<ListingWithOwner[]> {
  const rows = await db.listing.findMany({
    where: { status: 'active' },
    orderBy: { reviewCount: 'desc' },
    take: limit,
    include: { owner: { select: ownerSelect } },
  })
  return rows.map(toListingWithOwner)
}

export async function getListingsByOwner(ownerId: string): Promise<ListingWithOwner[]> {
  const rows = await db.listing.findMany({
    where: { ownerId },
    orderBy: { createdAt: 'desc' },
    include: { owner: { select: ownerSelect } },
  })
  return rows.map(toListingWithOwner)
}

export async function getSimilarListings(listing: Listing, limit = 4): Promise<ListingWithOwner[]> {
  const rows = await db.listing.findMany({
    where: { category: listing.category, status: 'active', id: { not: listing.id } },
    take: limit,
    include: { owner: { select: ownerSelect } },
  })
  return rows.map(toListingWithOwner)
}

export async function getCategoryCounts(): Promise<Partial<Record<ToolCategory, number>>> {
  const groups = await db.listing.groupBy({
    by: ['category'],
    where: { status: 'active' },
    _count: true,
  })
  return Object.fromEntries(groups.map((g) => [g.category as ToolCategory, g._count]))
}

// Kept for backward compatibility — callers that need category counts synchronously
// should migrate to getCategoryCounts()
export const CATEGORY_COUNTS: Partial<Record<ToolCategory, number>> = {}

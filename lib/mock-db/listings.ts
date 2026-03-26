import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import { MOCK_USERS } from '@/lib/data/mock-users'
import { Listing, ListingWithOwner, SearchFilters, ToolCategory } from '@/lib/types'

function attachOwner(listing: Listing): ListingWithOwner {
  const owner = MOCK_USERS.find((u) => u.id === listing.ownerId)!
  return {
    ...listing,
    owner: {
      id: owner.id,
      name: owner.name,
      avatarUrl: owner.avatarUrl,
      trustScore: owner.trustScore,
      badges: owner.badges,
      responseRate: owner.responseRate,
    },
  }
}

export async function getListings(filters?: Partial<SearchFilters>): Promise<ListingWithOwner[]> {
  let results = MOCK_LISTINGS.filter((l) => l.status === 'active')

  if (filters?.category) {
    results = results.filter((l) => l.category === filters.category)
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase()
    results = results.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some((t) => t.includes(q)) ||
        l.brand?.toLowerCase().includes(q)
    )
  }
  if (filters?.minPrice) {
    results = results.filter((l) => l.pricing.dailyRate >= filters.minPrice!)
  }
  if (filters?.maxPrice) {
    results = results.filter((l) => l.pricing.dailyRate <= filters.maxPrice!)
  }
  if (filters?.instantBookOnly) {
    results = results.filter((l) => l.availability.instantBook)
  }
  if (filters?.minRating) {
    results = results.filter((l) => l.stats.averageRating >= filters.minRating!)
  }
  if (filters?.condition) {
    results = results.filter((l) => l.condition === filters.condition)
  }

  // sort
  switch (filters?.sortBy) {
    case 'price-asc':  results.sort((a, b) => a.pricing.dailyRate - b.pricing.dailyRate); break
    case 'price-desc': results.sort((a, b) => b.pricing.dailyRate - a.pricing.dailyRate); break
    case 'rating':     results.sort((a, b) => b.stats.averageRating - a.stats.averageRating); break
    case 'newest':     results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
  }

  return results.map(attachOwner)
}

export async function getListingById(id: string): Promise<ListingWithOwner | null> {
  const listing = MOCK_LISTINGS.find((l) => l.id === id)
  if (!listing) return null
  return attachOwner(listing)
}

export async function getFeaturedListings(limit = 6): Promise<ListingWithOwner[]> {
  return MOCK_LISTINGS
    .filter((l) => l.status === 'active')
    .sort((a, b) => b.stats.reviewCount - a.stats.reviewCount)
    .slice(0, limit)
    .map(attachOwner)
}

export async function getListingsByOwner(ownerId: string): Promise<ListingWithOwner[]> {
  return MOCK_LISTINGS.filter((l) => l.ownerId === ownerId).map(attachOwner)
}

export async function getSimilarListings(listing: Listing, limit = 4): Promise<ListingWithOwner[]> {
  return MOCK_LISTINGS
    .filter((l) => l.id !== listing.id && l.category === listing.category && l.status === 'active')
    .slice(0, limit)
    .map(attachOwner)
}

export const CATEGORY_COUNTS: Record<ToolCategory, number> = MOCK_LISTINGS.reduce(
  (acc, l) => {
    if (l.status === 'active') acc[l.category] = (acc[l.category] ?? 0) + 1
    return acc
  },
  {} as Record<ToolCategory, number>
)

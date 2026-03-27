import { Listing } from '@/lib/types'

const KEY = 'toolshed_local_listings'

export function getLocalListings(): Listing[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function saveLocalListing(listing: Listing) {
  const existing = getLocalListings()
  localStorage.setItem(KEY, JSON.stringify([listing, ...existing]))
}

export function getLocalListingById(id: string): Listing | null {
  return getLocalListings().find(l => l.id === id) ?? null
}

export function updateLocalListing(id: string, changes: Partial<Listing>) {
  const listings = getLocalListings()
  const updated = listings.map(l => l.id === id ? { ...l, ...changes } : l)
  localStorage.setItem(KEY, JSON.stringify(updated))
}

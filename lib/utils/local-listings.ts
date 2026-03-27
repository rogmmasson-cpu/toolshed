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

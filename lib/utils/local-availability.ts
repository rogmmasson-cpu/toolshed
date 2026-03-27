const KEY = 'toolshed_availability_overrides'

function getAll(): Record<string, string[]> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function getBlockedDates(listingId: string, defaultDates: string[] = []): string[] {
  const all = getAll()
  return all[listingId] !== undefined ? all[listingId] : defaultDates
}

export function setBlockedDates(listingId: string, dates: string[]) {
  const all = getAll()
  all[listingId] = dates
  localStorage.setItem(KEY, JSON.stringify(all))
}

import { Suspense } from 'react'
import { SearchFilters, ToolCategory, ToolCondition, SortOption } from '@/lib/types'
import { getListings } from '@/lib/mock-db/listings'
import { zipToLatLng } from '@/lib/utils/geocode'
import ListingCard from '@/components/listings/ListingCard'
import ListingFilters from '@/components/listings/ListingFilters'
import MobileFilterDrawer from '@/components/listings/MobileFilterDrawer'
import { ListingCardSkeleton } from '@/components/ui/Skeleton'
import { MapPin } from 'lucide-react'
import AffiliateRecommendations from '@/components/listings/AffiliateRecommendations'
import { getCategoryDef } from '@/lib/constants/categories'
import AdUnit from '@/components/ads/AdUnit'

interface BrowsePageProps {
  searchParams: Promise<{
    q?: string
    zip?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    instant?: string
    condition?: string
  }>
}

async function ListingGrid({ filters }: { filters: Partial<SearchFilters> }) {
  const listings = await getListings(filters)
  if (listings.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <span className="text-6xl mb-4">🔍</span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
        <p className="text-gray-500">Try adjusting your filters or searching for something different.</p>
      </div>
    )
  }
  return (
    <>
      {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
    </>
  )
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams

  // Geocode ZIP → lat/lng for distance sorting
  const coords = params.zip ? await zipToLatLng(params.zip) : null

  const filters: Partial<SearchFilters> = {
    query: params.q ?? '',
    category: (params.category as ToolCategory) ?? null,
    minPrice: params.minPrice ? Number(params.minPrice) : null,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : null,
    sortBy: (params.sort as SortOption) ?? 'relevance',
    instantBookOnly: params.instant === '1',
    condition: (params.condition as ToolCondition) ?? null,
    lat: coords?.lat ?? null,
    lng: coords?.lng ?? null,
  }

  const activeFiltersCount = [filters.category, filters.minPrice, filters.maxPrice, filters.instantBookOnly, filters.condition].filter(Boolean).length

  // Build the page heading
  const headingParts: string[] = []
  if (params.q) headingParts.push(`"${params.q}"`)
  if (params.category) headingParts.push(params.category.replace(/-/g, ' '))
  const heading = headingParts.length > 0 ? `Results for ${headingParts.join(' · ')}` : 'All Tools'

  return (
    <div className="container-app py-8">
      {/* Active search context banner */}
      {(params.q || params.zip) && (
        <div className="flex flex-wrap items-center gap-2 mb-5 text-sm text-gray-600">
          {params.q && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-200 text-brand-700 rounded-full font-medium">
              🔍 {params.q}
            </span>
          )}
          {params.zip && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-gray-700 rounded-full font-medium">
              <MapPin size={12} /> near {params.zip}
            </span>
          )}
          <a href="/browse" className="text-xs text-gray-400 hover:text-gray-600 underline">Clear</a>
        </div>
      )}

      {/* Title + mobile filter trigger */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">{heading}</h1>
        <div className="flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <span className="badge bg-brand-100 text-brand-700 hidden lg:inline-flex">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </span>
          )}
          <Suspense>
            <MobileFilterDrawer activeFiltersCount={activeFiltersCount} hasZip={!!params.zip} />
          </Suspense>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar */}
        <div className="w-56 flex-shrink-0 hidden lg:block">
          <Suspense>
            <ListingFilters hasZip={!!params.zip} />
          </Suspense>
        </div>

        {/* Grid */}
        <div className="flex-1">
          {/* Leaderboard ad above results */}
          <AdUnit slot="BROWSE_TOP_SLOT" format="horizontal" className="mb-5" />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <Suspense fallback={<>{Array.from({ length: 6 }).map((_, i) => <ListingCardSkeleton key={i} />)}</>}>
              <ListingGrid filters={filters} />
            </Suspense>
          </div>

          {/* Affiliate strip — shown when a category is active */}
          {filters.category && (
            <div className="mt-10">
              <AffiliateRecommendations
                category={filters.category}
                listingTitle={getCategoryDef(filters.category).description}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

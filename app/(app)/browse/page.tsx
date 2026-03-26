import { Suspense } from 'react'
import { SearchFilters, ToolCategory, ToolCondition, SortOption } from '@/lib/types'
import { getListings } from '@/lib/mock-db/listings'
import ListingCard from '@/components/listings/ListingCard'
import ListingFilters from '@/components/listings/ListingFilters'
import MobileFilterDrawer from '@/components/listings/MobileFilterDrawer'
import { ListingCardSkeleton } from '@/components/ui/Skeleton'
import { Search } from 'lucide-react'

interface BrowsePageProps {
  searchParams: Promise<{
    q?: string
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
  const filters: Partial<SearchFilters> = {
    query: params.q ?? '',
    category: (params.category as ToolCategory) ?? null,
    minPrice: params.minPrice ? Number(params.minPrice) : null,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : null,
    sortBy: (params.sort as SortOption) ?? 'relevance',
    instantBookOnly: params.instant === '1',
    condition: (params.condition as ToolCondition) ?? null,
  }

  const activeFiltersCount = [filters.category, filters.minPrice, filters.maxPrice, filters.instantBookOnly, filters.condition].filter(Boolean).length

  return (
    <div className="container-app py-8">
      {/* Search bar */}
      <div className="mb-6">
        <form action="/browse" method="GET" className="flex gap-3">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
            <Search size={18} className="text-gray-400" />
            <input
              name="q"
              defaultValue={params.q}
              placeholder="Search tools, brands, keywords..."
              className="flex-1 text-sm text-gray-900 outline-none placeholder-gray-400"
            />
          </div>
          <button type="submit" className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors">
            Search
          </button>
        </form>
      </div>

      {/* Title + count + mobile filter trigger */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">
          {params.q ? `Results for "${params.q}"` : params.category ? `${params.category.replace('-', ' ')} tools` : 'All Tools'}
        </h1>
        <div className="flex items-center gap-3">
          {activeFiltersCount > 0 && (
            <span className="badge bg-brand-100 text-brand-700 hidden lg:inline-flex">{activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active</span>
          )}
          <Suspense>
            <MobileFilterDrawer activeFiltersCount={activeFiltersCount} />
          </Suspense>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar */}
        <div className="w-56 flex-shrink-0 hidden lg:block">
          <Suspense>
            <ListingFilters />
          </Suspense>
        </div>

        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <Suspense fallback={<>{Array.from({ length: 6 }).map((_, i) => <ListingCardSkeleton key={i} />)}</>}>
              <ListingGrid filters={filters} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

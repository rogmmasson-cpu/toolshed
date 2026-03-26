import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedListings } from '@/lib/mock-db/listings'
import ListingCard from '@/components/listings/ListingCard'

export default async function FeaturedListings() {
  const listings = await getFeaturedListings(6)
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-app">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-title">Top-Rated Near You</h2>
            <p className="section-subtitle">Highly reviewed tools available on the South Coast, MA</p>
          </div>
          <Link href="/browse" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-500 text-brand-600 font-semibold rounded-xl hover:bg-brand-50 transition-colors"
          >
            Browse All Tools <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

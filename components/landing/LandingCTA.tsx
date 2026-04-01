import Link from 'next/link'
import { Search, Plus } from 'lucide-react'

export default function LandingCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container-app">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Ready to get started?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Browse available tools in your neighborhood right now — no account required.
            When you find something you need, signing up takes less than a minute.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/browse"
              className="flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-2xl transition-colors shadow-lg text-base w-full sm:w-auto justify-center"
            >
              <Search size={18} />
              Browse Tools Near You
            </Link>
            <Link
              href="/listings/new"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl transition-colors border border-white/20 text-base w-full sm:w-auto justify-center"
            >
              <Plus size={18} />
              List a Tool for Free
            </Link>
          </div>

          <p className="mt-8 text-gray-500 text-sm">
            Free to browse. Free to list. ToolShed takes no fees — payment goes directly between neighbors.
          </p>
        </div>
      </div>
    </section>
  )
}

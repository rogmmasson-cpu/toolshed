'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ChevronRight } from 'lucide-react'

const POPULAR = ['Drill', 'Pressure washer', 'Lawn mower', 'Ladder', 'Generator']

export default function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    router.push(`/browse?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-orange-700 text-white">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-app relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            2,400+ tools available near Fairhaven, MA
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Borrow the tools<br />your neighbors own.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Rent tools and household items from people nearby — or earn money sharing what&apos;s gathering dust in your garage.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-lg">
              <Search size={20} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder='Search "pressure washer", "drill"...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-gray-900 text-sm outline-none placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-lg sm:w-44">
              <MapPin size={20} className="text-brand-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Fairhaven, MA"
                className="flex-1 text-gray-700 text-sm outline-none"
                defaultValue="Fairhaven, MA"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-2xl transition-colors shadow-lg"
            >
              Search <ChevronRight size={18} />
            </button>
          </form>

          {/* No-auth nudge */}
          <p className="mt-5 text-white/75 text-sm font-medium">
            🔓 Browse for free — no account needed. Sign up only when you&apos;re ready to book or list.
          </p>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-white/60 text-sm">Popular:</span>
            {POPULAR.map((term) => (
              <button
                key={term}
                onClick={() => router.push(`/browse?q=${encodeURIComponent(term)}`)}
                className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-sm text-white/90 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
            <a
              href="/browse"
              className="flex items-center gap-2 px-7 py-3 bg-white text-brand-600 font-semibold rounded-2xl hover:bg-white/90 transition-colors shadow-md text-sm"
            >
              Browse All Tools
            </a>
            <a
              href="/listings/new"
              className="flex items-center gap-2 px-7 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-2xl transition-colors text-sm border border-white/30"
            >
              List Your Tools
            </a>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

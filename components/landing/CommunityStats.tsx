import Link from 'next/link'

export default function CommunityStats() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container-app">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Turn your garage into a<br/>
            <span className="text-brand-400">revenue stream.</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            The average American household owns $6,500+ in tools that sit idle 95% of the time. ToolShed lets you monetize them safely.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 rounded-2xl p-6">
              <p className="text-4xl font-extrabold text-brand-300">$15</p>
              <p className="text-sm text-gray-300 mt-1">Avg. drill/day</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <p className="text-4xl font-extrabold text-brand-300">$65</p>
              <p className="text-sm text-gray-300 mt-1">Avg. mower/day</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <p className="text-4xl font-extrabold text-brand-300">$320</p>
              <p className="text-sm text-gray-300 mt-1">Avg. monthly earnings</p>
            </div>
          </div>

          <Link
            href="/listings/new"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold text-lg rounded-2xl transition-colors shadow-lg"
          >
            Start Listing for Free →
          </Link>
          <p className="text-gray-500 text-sm mt-3">No listing fees. ToolShed takes 10% only when you earn.</p>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { TrendingUp, DollarSign, Clock, Star, Wrench } from 'lucide-react'

export const metadata = {
  title: 'Smart Pricing Guide | ToolShed',
  description: 'How to price your tools on ToolShed to maximize earnings.',
}

const categories = [
  { name: 'Hand Tools', examples: 'Drills, sanders, jigsaws', range: '$8–$20/day' },
  { name: 'Power Saws', examples: 'Miter saw, circular saw, table saw', range: '$20–$45/day' },
  { name: 'Pressure Washers', examples: 'Electric & gas models', range: '$25–$55/day' },
  { name: 'Lawn Equipment', examples: 'Mowers, trimmers, aerators', range: '$20–$60/day' },
  { name: 'Moving Equipment', examples: 'Dollies, moving blankets, straps', range: '$10–$30/day' },
  { name: 'Ladders & Scaffolding', examples: 'Step, extension, platform', range: '$15–$40/day' },
  { name: 'Specialty Tools', examples: 'Tile saws, cement mixers', range: '$40–$80/day' },
  { name: 'Kitchen Appliances', examples: 'Mixers, food processors, waffle irons', range: '$5–$15/day' },
]

const tips = [
  {
    icon: TrendingUp,
    color: 'bg-brand-50 text-brand-600',
    title: 'Start at 75% of market rate',
    desc: 'New listings without reviews benefit from competitive pricing. Once you have 5+ positive reviews, bump your rate up 10–15%. Renters pay a premium for trusted owners.',
  },
  {
    icon: Clock,
    color: 'bg-blue-50 text-blue-600',
    title: 'Offer weekly discounts',
    desc: 'Listings with weekly rates get 2× more bookings than day-only listings. A 20–30% weekly discount feels like a deal to renters — and fills your calendar.',
  },
  {
    icon: DollarSign,
    color: 'bg-green-50 text-green-600',
    title: 'Set a deposit proportional to value',
    desc: 'A good rule of thumb: deposit = 2–3× the daily rate, or 10–15% of replacement cost. Too high and renters skip your listing. Too low and you\'re unprotected.',
  },
  {
    icon: Star,
    color: 'bg-amber-50 text-amber-600',
    title: 'Invest in great photos',
    desc: 'Listings with 4+ well-lit photos earn 40% more bookings. Show the tool from multiple angles, include any accessories, and photograph any existing wear so everyone\'s on the same page.',
  },
]

export default function PricingGuidePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="container-app max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-500/20 rounded-2xl mb-6">
            <TrendingUp size={32} className="text-brand-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Smart Pricing Guide</h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Price your tools right and your garage starts paying rent. Here&apos;s what works.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 px-4">
        <div className="container-app max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Pricing principles that actually work</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${tip.color}`}>
                  <tip.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Rates */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">South Coast market rates</h2>
            <p className="text-gray-500 text-sm">Based on successful bookings in the Fairhaven/New Bedford area. Updated March 2026.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Category</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-700">Examples</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-700">Typical Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((cat) => (
                  <tr key={cat.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{cat.name}</td>
                    <td className="px-5 py-3 text-gray-500">{cat.examples}</td>
                    <td className="px-5 py-3 text-right font-semibold text-brand-600">{cat.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">Ranges reflect typical daily rates. Gas-powered, brand-name, or professional-grade tools command the higher end.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container-app max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Wrench size={26} className="text-brand-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to start earning?</h2>
          <p className="text-gray-500 mb-8">List your first tool in under 5 minutes. No subscription, no upfront cost — ToolShed only earns when you do.</p>
          <Link
            href="/listings/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
          >
            List a Tool
          </Link>
        </div>
      </section>
    </div>
  )
}

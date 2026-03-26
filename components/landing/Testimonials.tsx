import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marisol V.',
    location: 'Fairhaven Center',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: "I borrowed a tile saw for my bathroom remodel and saved over $400 vs renting from a big box store. The owner walked me through how to use it — neighbors genuinely helping neighbors.",
    toolBorrowed: '🪚 Wet Tile Saw',
    savedAmount: '$420',
  },
  {
    id: 2,
    name: 'James T.',
    location: 'New Bedford',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: "I listed my pressure washer and power drill — both tools I only use twice a year — and made $340 last month alone. ToolShed is basically passive income on stuff just sitting in my garage.",
    toolShared: '🔩 Power Drill',
    earned: '$340/mo',
  },
  {
    id: 3,
    name: 'Priya K.',
    location: 'Mattapoisett',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: "I needed a stand mixer for a weekend of baking and found one two blocks away. The QR check-in was seamless, the deposit was handled automatically, and I had fresh bread Sunday morning.",
    toolBorrowed: '🥣 KitchenAid Mixer',
    savedAmount: '$65',
  },
  {
    id: 4,
    name: 'David R.',
    location: 'Marion',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    text: "As someone who just moved into my first house on the South Coast, ToolShed has been a lifesaver. I've completed 3 major home projects without buying a single specialized tool.",
    toolBorrowed: '🔨 Rotary Hammer',
    savedAmount: '$780',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Loved by South Coast Neighbors</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Real stories from people who stopped buying tools they only need once.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className={s <= t.rating ? 'fill-brand-400 text-brand-400' : 'text-gray-200 fill-gray-100'} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>

              {/* Chip */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full">
                  {t.toolBorrowed ?? t.toolShared}
                </span>
                {t.savedAmount && (
                  <span className="px-2.5 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded-full">
                    Saved {t.savedAmount}
                  </span>
                )}
                {t.earned && (
                  <span className="px-2.5 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded-full">
                    Earned {t.earned}
                  </span>
                )}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location} · Fairhaven, MA area</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stat */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Rated <span className="font-bold text-gray-800">4.9 / 5.0</span> from over{' '}
            <span className="font-bold text-gray-800">2,400 reviews</span> on the South Coast
          </p>
        </div>
      </div>
    </section>
  )
}

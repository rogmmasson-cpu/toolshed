import { Briefcase, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Careers | ToolShed',
  description: 'Join the ToolShed team and help build the neighborhood tool marketplace.',
}

const values = [
  {
    emoji: '🏘️',
    title: 'Community first',
    desc: 'We build for the neighborhoods we serve. Every decision starts with how it affects real people on real streets.',
  },
  {
    emoji: '⚡',
    title: 'Ship it',
    desc: 'We\'re a small team moving fast. We bias toward action, learn from what we ship, and iterate relentlessly.',
  },
  {
    emoji: '🤝',
    title: 'Trust as default',
    desc: 'Internally and externally. We assume good faith, communicate directly, and treat everyone like a neighbor.',
  },
  {
    emoji: '🌱',
    title: 'Sustainability matters',
    desc: 'The sharing economy is good for the planet. We care about environmental impact in our decisions.',
  },
]

export default function CareersPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-brand-900 text-white py-20 px-4">
        <div className="container-app max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-500/30 rounded-2xl mb-6">
            <Briefcase size={32} className="text-brand-300" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Work at ToolShed</h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            We&apos;re a small team building the neighborhood tool marketplace. Come help us grow it.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
            <MapPin size={14} />
            <span>Fairhaven, MA · Remote-friendly</span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What we believe</h2>
            <p className="text-gray-500 text-sm">Four things that guide how we work and what we build.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="text-2xl mb-2">{v.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container-app max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Open positions</h2>
          <p className="text-gray-500 text-sm mb-8">No openings right now — check back soon.</p>
          <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
            <div className="text-4xl mb-3">🔧</div>
            <h3 className="font-bold text-gray-900 mb-2">We&apos;re heads-down building</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              We&apos;re a small team right now. When we&apos;re ready to grow, we&apos;ll post roles here. In the meantime, feel free to introduce yourself.
            </p>
          </div>
        </div>
      </section>

      {/* General apps */}
      <section className="py-20 px-4">
        <div className="container-app max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Don&apos;t see your role?</h2>
          <p className="text-gray-500 mb-6">
            We&apos;re always interested in talented people who care about community. Send us your story.
          </p>
          <a
            href="mailto:jobs@toolshed.com?subject=General Application"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
          >
            <Briefcase size={16} />
            Say hello
          </a>
          <p className="text-gray-400 text-xs mt-4">jobs@toolshed.com</p>
        </div>
      </section>
    </div>
  )
}

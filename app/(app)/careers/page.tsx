import Link from 'next/link'
import { Briefcase, MapPin, Heart, Users, Wrench, Laptop } from 'lucide-react'

export const metadata = {
  title: 'Careers | ToolShed',
  description: 'Join the ToolShed team and help build the neighborhood tool marketplace.',
}

const openRoles = [
  {
    title: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    type: 'Full-time',
    location: 'Remote (US)',
    icon: Laptop,
    desc: 'Own core platform features end-to-end. We\'re a Next.js + Postgres shop that ships fast and cares about code quality. 4+ years experience.',
  },
  {
    title: 'Community & Growth Manager',
    team: 'Growth',
    type: 'Full-time',
    location: 'Fairhaven, MA (Hybrid)',
    icon: Users,
    desc: 'Grow the ToolShed community in our South Coast home market and help us expand to new neighborhoods. Passion for local commerce required.',
  },
  {
    title: 'Head of Trust & Safety',
    team: 'Operations',
    type: 'Full-time',
    location: 'Remote (US)',
    icon: Heart,
    desc: 'Build and lead the policies, tools, and team that keep ToolShed trustworthy. Experience in platform safety or marketplace ops.',
  },
  {
    title: 'Product Designer',
    team: 'Design',
    type: 'Contract / FT',
    location: 'Remote (US)',
    icon: Wrench,
    desc: 'Design the end-to-end booking experience for renters and owners. Figma-first, user-research-driven, and comfortable shipping on tight timelines.',
  },
]

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
        <div className="container-app max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Open positions</h2>
            <p className="text-gray-500 text-sm">{openRoles.length} roles · Updated March 2026</p>
          </div>
          <div className="space-y-4">
            {openRoles.map((role) => (
              <div key={role.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                      <role.icon size={18} className="text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{role.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1.5 mb-3">
                        <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5">{role.team}</span>
                        <span className="text-xs bg-brand-50 text-brand-600 rounded-full px-2.5 py-0.5">{role.type}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} />{role.location}</span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{role.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pl-14">
                  <a
                    href={`mailto:jobs@toolshed.com?subject=Application: ${role.title}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Apply now →
                  </a>
                </div>
              </div>
            ))}
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

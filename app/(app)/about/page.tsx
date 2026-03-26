import Link from 'next/link'
import { Wrench, Heart, Users, Lightbulb, MapPin, Quote } from 'lucide-react'

export const metadata = {
  title: 'About ToolShed',
  description: 'The story behind ToolShed — born in Fairhaven, MA out of a love for using tools and a hatred of buying them.',
}

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-orange-700 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-app relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <Wrench size={32} className="text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Built by a guy who borrows<br />his Dad&apos;s tools.
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            ToolShed was born on the South Coast of Massachusetts, where neighbors have always helped each other out — we just built the app to make it easier.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-white/70 text-sm">
            <MapPin size={14} />
            <span>Fairhaven, MA</span>
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="py-20 px-4">
        <div className="container-app max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Photo + badge */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Roger Masson, Founder of ToolShed"
                  className="w-56 h-56 rounded-3xl object-cover shadow-xl ring-4 ring-brand-100"
                />
                <div className="absolute -bottom-4 -right-4 bg-brand-500 text-white rounded-2xl px-4 py-2 shadow-lg text-sm font-bold">
                  Founder & Tool Borrower
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xl font-bold text-gray-900">Roger Masson</p>
                <p className="text-gray-500 text-sm flex items-center justify-center gap-1 mt-1">
                  <MapPin size={12} /> Fairhaven, MA
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full">
                <Heart size={14} className="fill-brand-500" /> The Origin Story
              </div>

              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                40 years of borrowing. One app to expand the reach.
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Roger Masson loves building things. He loves fixing things. He loves weekend projects that involve power tools, sawdust, and a cold drink at the end. What he doesn&apos;t love? Buying tools he&apos;ll use exactly once.
              </p>

              <p className="text-gray-600 leading-relaxed">
                For four decades, Roger&apos;s go-to solution was simple: call Dad. Need a miter saw? Dad&apos;s got one. Pressure washer? Dad&apos;s garage. Tile saw for the bathroom remodel? You know where to look. His father&apos;s workshop became the family hardware store — always open, never judging, and stocked with tools for every occasion.
              </p>

              <p className="text-gray-600 leading-relaxed">
                But what about the projects when Dad&apos;s tools were already spoken for? Or the neighbors who didn&apos;t have a Dad with a perfectly organized garage? Roger realized that every street in Fairhaven — every neighborhood on the South Coast — had a version of his Dad: someone with a garage full of quality tools just sitting there, waiting to be useful.
              </p>

              <p className="text-gray-600 leading-relaxed font-medium text-gray-800">
                ToolShed is the app that turns every neighborhood into the kind of community Roger grew up in — where you borrow what you need, treat it right, and pay it forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container-app max-w-2xl mx-auto text-center">
          <Quote size={40} className="text-brand-300 mx-auto mb-6" />
          <blockquote className="text-2xl font-semibold text-gray-800 leading-relaxed italic mb-6">
            &ldquo;I&apos;ve been borrowing my Dad&apos;s tools for 40 years. ToolShed just lets me borrow from the whole neighborhood.&rdquo;
          </blockquote>
          <p className="text-gray-500 font-medium">— Roger Masson, Founder</p>
        </div>
      </section>

      {/* Mission cards */}
      <section className="py-20 px-4">
        <div className="container-app max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why ToolShed Exists</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Three ideas that drive everything we build.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mb-4">
                <Wrench size={22} className="text-brand-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Tools should be used</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                The average power tool is used 12 minutes over its lifetime. That&apos;s a waste — of money, resources, and perfectly good tools. We&apos;re here to fix that.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest-50 rounded-2xl flex items-center justify-center mb-4">
                <Users size={22} className="text-forest-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Neighbors helping neighbors</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                The best communities are built on trust. ToolShed adds safety, payment, and accountability — so the spirit of generosity can scale beyond just family.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                <Lightbulb size={22} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Smart beats expensive</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                You don&apos;t need to own everything to do anything. Renting what you need, when you need it, is just smarter — for your wallet and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* South Coast roots */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="container-app max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin size={18} className="text-brand-400" />
            <span className="text-brand-400 font-semibold text-sm uppercase tracking-wider">South Coast Proud</span>
          </div>
          <h2 className="text-3xl font-bold mb-5">
            Started in Fairhaven. Built for every neighborhood.
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto">
            Fairhaven, MA is a small waterfront town where people still know their neighbors — where someone&apos;s always got what you need and happy to lend it. Roger built ToolShed to bottle that feeling and bring it everywhere.
          </p>
          <p className="text-gray-400 text-sm">
            Today ToolShed serves communities across the South Coast: Fairhaven, New Bedford, Mattapoisett, Marion, Dartmouth, and beyond.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container-app max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to join the neighborhood?</h2>
          <p className="text-gray-500 mb-8">Browse tools near you or list what&apos;s collecting dust in your garage.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/browse"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              Browse Tools
            </Link>
            <Link
              href="/listings/new"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors"
            >
              List Your Tools
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

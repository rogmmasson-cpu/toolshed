import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog | ToolShed',
  description: 'Tips, stories, and news from the ToolShed community.',
}

const posts = [
  {
    slug: 'spring-projects-south-coast',
    category: 'Project Ideas',
    categoryColor: 'bg-green-100 text-green-700',
    date: 'March 18, 2026',
    title: '8 Spring Projects Worth Renting a Pressure Washer For',
    excerpt: 'Winter is rough on driveways, decks, and siding. Here are eight Saturday projects that\'ll make your home look like new — and the right tools to rent for each.',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
  },
  {
    slug: 'owner-spotlight-marcus',
    category: 'Owner Stories',
    categoryColor: 'bg-brand-100 text-brand-700',
    date: 'March 5, 2026',
    title: 'How Marcus Earns $400/Month Renting His Shop Tools',
    excerpt: '"I was stepping over that miter saw for three years," Marcus says. "Now it pays my utility bill." We sat down with one of Fairhaven\'s top-rated Owners.',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=300&fit=crop',
  },
  {
    slug: 'first-rental-checklist',
    category: 'How-To',
    categoryColor: 'bg-blue-100 text-blue-700',
    date: 'February 20, 2026',
    title: 'Your First ToolShed Rental: A Complete Checklist',
    excerpt: 'First time renting a tool from a neighbor? Here\'s everything you need to know — from booking to check-in, safe operation, and leaving a great review.',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1566677914817-56426959ae9c?w=600&h=300&fit=crop',
  },
  {
    slug: 'deck-build-guide',
    category: 'Project Ideas',
    categoryColor: 'bg-green-100 text-green-700',
    date: 'February 8, 2026',
    title: 'Build a 12×16 Deck for Under $2,000 (Tool Rental Math Included)',
    excerpt: 'Buying all the tools to build a deck would cost $800+ before you buy a single board. Here\'s how to do it smart — with a real budget breakdown.',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&h=300&fit=crop',
  },
  {
    slug: 'community-groups-launch',
    category: 'ToolShed News',
    categoryColor: 'bg-purple-100 text-purple-700',
    date: 'January 15, 2026',
    title: 'Introducing ToolShed Groups: Borrow Within Your HOA or Street',
    excerpt: 'The newest feature on ToolShed lets neighborhoods, HOAs, and friend groups create private lending circles — trusted borrowing, zero strangers.',
    readTime: '3 min read',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=300&fit=crop',
  },
  {
    slug: 'pricing-your-tools',
    category: 'Owner Tips',
    categoryColor: 'bg-amber-100 text-amber-700',
    date: 'January 3, 2026',
    title: 'The 3 Pricing Mistakes New Owners Make (and How to Fix Them)',
    excerpt: 'Priced too high and nobody books. Too low and you\'re leaving money on the table. Here\'s how to find your sweet spot — plus what our data says about the South Coast market.',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=300&fit=crop',
  },
]

export default function BlogPage() {
  const [featured, ...rest] = posts

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-12 px-4">
        <div className="container-app max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-brand-600" />
            </div>
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">The ToolShed Blog</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Stories, tips, and how-tos</h1>
          <p className="text-gray-500">From the South Coast community and beyond.</p>
        </div>
      </div>

      <div className="container-app max-w-4xl mx-auto py-14 px-4">
        {/* Featured post */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
          <div className="relative h-56 overflow-hidden">
            <img
              src={featured.img}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${featured.categoryColor}`}>
              {featured.category}
            </span>
          </div>
          <div className="p-6">
            <p className="text-xs text-gray-400 mb-2">{featured.date} · {featured.readTime}</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{featured.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-1 text-brand-600 text-sm font-semibold">
              Read more <ArrowRight size={14} />
            </span>
          </div>
        </div>

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {rest.map((post) => (
            <div key={post.slug} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-0.5 rounded-full ${post.categoryColor}`}>
                  {post.category}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1.5">{post.date} · {post.readTime}</p>
                <h3 className="font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-brand-600 transition-colors text-sm">{post.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-14 bg-brand-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Get new posts in your inbox</h2>
          <p className="text-white/80 text-sm mb-5">Project ideas, owner tips, and community stories — no spam, ever.</p>
          <form className="flex gap-2 max-w-sm mx-auto" action="#">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-white text-brand-600 font-semibold rounded-xl text-sm hover:bg-brand-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

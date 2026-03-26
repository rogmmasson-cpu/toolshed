import Link from 'next/link'
import { Wrench, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center">
            <Wrench size={32} className="text-brand-500" />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-700 mb-3">Tool not found.</h2>
        <p className="text-gray-500 leading-relaxed mb-8">
          Looks like this page wandered off to someone else&apos;s garage. Let&apos;s get you back to the good stuff.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors"
          >
            <Home size={16} /> Go Home
          </Link>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 transition-colors"
          >
            <Search size={16} /> Browse Tools
          </Link>
        </div>
      </div>
    </div>
  )
}

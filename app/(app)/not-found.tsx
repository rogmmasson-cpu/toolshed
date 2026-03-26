import Link from 'next/link'
import { SearchX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-app py-24 text-center max-w-md mx-auto">
      <SearchX size={48} className="text-gray-300 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or may have been moved.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/browse" className="btn-primary">Browse Tools</Link>
        <Link href="/" className="btn-secondary">Go Home</Link>
      </div>
    </div>
  )
}

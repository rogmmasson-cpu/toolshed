import Link from 'next/link'
import { CheckCircle2, MapPin, MessageSquare, Calendar } from 'lucide-react'
import { getListingById } from '@/lib/mock-db/listings'
import AffiliateRecommendations from '@/components/listings/AffiliateRecommendations'

export default async function ConfirmationPage({ params, searchParams }: {
  params: Promise<{ listingId: string }>
  searchParams: Promise<{ start?: string; end?: string; bookingId?: string }>
}) {
  const { listingId } = await params
  const sp = await searchParams
  const listing = await getListingById(listingId)
  const confirmationCode = sp.bookingId
    ? sp.bookingId.slice(-8).toUpperCase()
    : `TS-${Date.now().toString(36).toUpperCase()}`
  const bookingId = sp.bookingId

  return (
    <div className="container-app py-16 max-w-lg mx-auto text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-forest-100 mx-auto mb-6">
        <CheckCircle2 size={40} className="text-forest-600" />
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">You&apos;re booked! 🎉</h1>
      <p className="text-gray-500 mb-6">Your rental request has been confirmed. The owner will be in touch shortly.</p>

      <div className="card p-6 text-left mb-6">
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Confirmation Code</p>
          <p className="text-2xl font-bold text-brand-500">{confirmationCode}</p>
        </div>
        <div className="space-y-2 text-sm">
          {sp.start && <div className="flex justify-between"><span className="text-gray-500">Pick up</span><span className="font-medium">{sp.start}</span></div>}
          {sp.end && <div className="flex justify-between"><span className="text-gray-500">Return by</span><span className="font-medium">{sp.end}</span></div>}
          <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-medium text-forest-600">Confirmed</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-8">
        <div className="flex items-center gap-3 bg-brand-50 rounded-xl p-4 text-left">
          <MapPin size={24} className="text-brand-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm text-gray-900">Coordinate Pickup</p>
            <p className="text-xs text-gray-500">Message the owner to agree on a time, place, and payment method</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 text-left">
          <MessageSquare size={24} className="text-blue-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm text-gray-900">Message the Owner</p>
            <p className="text-xs text-gray-500">All your conversation is saved inside ToolShed for your records</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-4 text-left">
          <Calendar size={24} className="text-purple-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm text-gray-900">Add to Calendar</p>
            <p className="text-xs text-gray-500">Never miss your return date</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-10">
        <Link href="/dashboard/rentals" className="btn-primary w-full justify-center">
          View My Rentals
        </Link>
        <Link href="/messages" className="btn-secondary w-full justify-center">
          Message Owner
        </Link>
        <Link href="/browse" className="text-sm text-gray-500 hover:text-gray-700">
          Continue browsing →
        </Link>
      </div>

      {/* Affiliate recommendations — while you wait for pickup */}
      {listing && (
        <div className="text-left">
          <p className="text-xs text-gray-400 text-center mb-3 uppercase tracking-wide">
            While you wait — grab what you&apos;ll need
          </p>
          <AffiliateRecommendations
            category={listing.category}
            listingTitle={listing.title}
          />
        </div>
      )}
    </div>
  )
}

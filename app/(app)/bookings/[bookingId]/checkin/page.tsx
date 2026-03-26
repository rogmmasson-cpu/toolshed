'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, AlertCircle, Smartphone, ArrowLeft, Camera } from 'lucide-react'
import { MOCK_BOOKINGS } from '@/lib/data/mock-bookings'
import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import { formatCents, formatDateRange } from '@/lib/utils/formatting'

type Phase = 'idle' | 'scanning' | 'success' | 'error'

export default function QRCheckinPage() {
  const { bookingId } = useParams<{ bookingId: string }>()
  const [phase, setPhase] = useState<Phase>('idle')
  const [isCheckout, setIsCheckout] = useState(false)

  const booking = MOCK_BOOKINGS.find(b => b.id === bookingId) ?? MOCK_BOOKINGS.find(b => b.status === 'active')!
  const listing = MOCK_LISTINGS.find(l => l.id === booking?.listingId)

  useEffect(() => {
    if (booking) setIsCheckout(booking.checkIn.completed && !booking.checkOut.completed)
  }, [booking])

  function simulateScan() {
    setPhase('scanning')
    setTimeout(() => setPhase('success'), 2200)
  }

  if (!booking) return <div className="container-app py-20 text-center text-gray-500">Booking not found.</div>

  return (
    <div className="container-app py-8 max-w-sm mx-auto">
      <Link href="/dashboard/rentals" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <ArrowLeft size={15}/>Back to rentals
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isCheckout ? 'Check Out' : 'Check In'}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Scan the QR code on the {isCheckout ? 'return drop-off' : 'listing'} to confirm {isCheckout ? 'return' : 'pickup'}.
      </p>

      {/* Booking summary */}
      {listing && (
        <div className="card p-4 mb-6 flex gap-3">
          <img src={listing.photos[0]} alt="" className="w-16 h-14 rounded-xl object-cover flex-shrink-0"/>
          <div>
            <p className="font-semibold text-sm text-gray-900">{listing.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{formatDateRange(booking.dates.startDate, booking.dates.endDate)}</p>
            <p className="text-xs text-gray-500">Deposit: {formatCents(booking.pricing.depositAmount)}</p>
          </div>
        </div>
      )}

      {/* QR scan area */}
      {phase === 'idle' && (
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-2xl aspect-square flex flex-col items-center justify-center text-white gap-4 relative overflow-hidden">
            {/* Fake viewfinder */}
            <div className="absolute inset-6 border-2 border-white/30 rounded-xl"/>
            <div className="absolute top-8 left-8 w-6 h-6 border-t-4 border-l-4 border-brand-400 rounded-tl"/>
            <div className="absolute top-8 right-8 w-6 h-6 border-t-4 border-r-4 border-brand-400 rounded-tr"/>
            <div className="absolute bottom-8 left-8 w-6 h-6 border-b-4 border-l-4 border-brand-400 rounded-bl"/>
            <div className="absolute bottom-8 right-8 w-6 h-6 border-b-4 border-r-4 border-brand-400 rounded-br"/>
            <Camera size={40} className="text-white/40"/>
            <p className="text-sm text-white/60">Point camera at QR code</p>
          </div>
          <button
            onClick={simulateScan}
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-2xl text-base transition-colors"
          >
            <Smartphone size={18} className="inline mr-2 -mt-0.5"/>
            Simulate Scan
          </button>
          <p className="text-center text-xs text-gray-400">
            Camera permission required for real scan. This demo simulates it.
          </p>
        </div>
      )}

      {phase === 'scanning' && (
        <div className="bg-gray-900 rounded-2xl aspect-square flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-400 border-t-transparent rounded-full animate-spin"/>
          <p className="text-white text-sm">Reading QR code…</p>
          {/* Animated scan line */}
          <div className="absolute left-10 right-10 h-0.5 bg-brand-400 animate-bounce opacity-80"/>
        </div>
      )}

      {phase === 'success' && (
        <div className="space-y-6">
          <div className="bg-forest-50 border-2 border-forest-300 rounded-2xl p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center">
              <CheckCircle2 size={36} className="text-forest-600"/>
            </div>
            <h2 className="text-xl font-bold text-forest-800">
              {isCheckout ? 'Return Confirmed!' : 'Check-In Complete!'}
            </h2>
            <p className="text-sm text-forest-700">
              {isCheckout
                ? `Your ${formatCents(booking.pricing.depositAmount)} deposit will be released within 48 hours.`
                : 'Rental period has started. Enjoy your tool!'}
            </p>
            <p className="text-xs text-forest-600 font-mono bg-forest-100 px-3 py-1 rounded-full">
              {new Date().toLocaleTimeString()} · {new Date().toLocaleDateString()}
            </p>
          </div>

          {isCheckout && !booking.renterReviewId && (
            <div className="card p-4 text-center">
              <p className="font-semibold text-gray-900 mb-1">How was it? ⭐</p>
              <p className="text-sm text-gray-500 mb-3">Leave a review to help the community.</p>
              <Link
                href={`/bookings/${booking.id}/review`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Leave Review
              </Link>
            </div>
          )}

          <Link href="/dashboard/rentals" className="block w-full text-center py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-2xl text-sm transition-colors">
            Back to Rentals
          </Link>
        </div>
      )}

      {phase === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col items-center gap-3 text-center">
          <AlertCircle size={32} className="text-red-500"/>
          <p className="font-semibold text-red-800">Scan Failed</p>
          <p className="text-sm text-red-600">QR code not recognized. Try again or enter the code manually.</p>
          <button onClick={() => setPhase('idle')} className="mt-2 px-5 py-2 bg-red-500 text-white font-semibold rounded-xl text-sm">
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

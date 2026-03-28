'use client'
import { useState, useEffect } from 'react'
import type { Booking } from '@/lib/types'

function storageKey(id: string) {
  return `toolshed_booking_decision_${id}`
}

export default function DashboardPendingRow({ booking }: { booking: Booking }) {
  const [decision, setDecision] = useState<'approved' | 'declined' | null>(null)
  const [loading, setLoading] = useState<'approve' | 'decline' | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey(booking.id)) as 'approved' | 'declined' | null
    if (stored) setDecision(stored)
  }, [booking.id])

  function decide(action: 'approved' | 'declined') {
    setLoading(action === 'approved' ? 'approve' : 'decline')
    setTimeout(() => {
      localStorage.setItem(storageKey(booking.id), action)
      setDecision(action)
      setLoading(null)
    }, 600)
  }

  if (decision === 'approved') {
    return (
      <div className="flex items-center justify-between p-3 bg-forest-50 border border-forest-200 rounded-xl">
        <div>
          <p className="text-sm font-medium text-gray-900">Booking #{booking.id.slice(-6)}</p>
          <p className="text-xs text-gray-500">{booking.dates.startDate} → {booking.dates.endDate}</p>
        </div>
        <span className="px-2.5 py-1 bg-forest-500 text-white text-xs font-semibold rounded-full">Approved</span>
      </div>
    )
  }

  if (decision === 'declined') {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl opacity-50">
        <div>
          <p className="text-sm font-medium text-gray-900">Booking #{booking.id.slice(-6)}</p>
          <p className="text-xs text-gray-500">{booking.dates.startDate} → {booking.dates.endDate}</p>
        </div>
        <span className="px-2.5 py-1 bg-gray-400 text-white text-xs font-semibold rounded-full">Declined</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
      <div>
        <p className="text-sm font-medium text-gray-900">Booking #{booking.id.slice(-6)}</p>
        <p className="text-xs text-gray-500">{booking.dates.startDate} → {booking.dates.endDate}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => decide('approved')}
          disabled={!!loading}
          className="px-3 py-1 bg-forest-500 hover:bg-forest-600 disabled:opacity-60 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
        >
          {loading === 'approve' && (
            <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          )}
          Approve
        </button>
        <button
          onClick={() => decide('declined')}
          disabled={!!loading}
          className="px-3 py-1 border border-gray-200 hover:bg-gray-100 disabled:opacity-60 text-gray-600 text-xs font-semibold rounded-lg flex items-center gap-1"
        >
          {loading === 'decline' && (
            <span className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          )}
          Decline
        </button>
      </div>
    </div>
  )
}

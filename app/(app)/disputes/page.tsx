'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Scale, AlertTriangle, CheckCircle2, Clock, ChevronRight, Lock } from 'lucide-react'
import { Dispute } from '@/lib/types'
import { getDisputes } from '@/lib/utils/local-disputes'
import { MOCK_DISPUTES } from '@/lib/data/mock-disputes'
import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import { formatDate, timeAgo } from '@/lib/utils/formatting'
import { cn } from '@/lib/utils/cn'

const REASON_LABELS: Record<string, string> = {
  item_damaged: 'Item Damaged',
  item_not_returned: 'Item Not Returned',
  item_not_as_described: 'Not as Described',
  item_not_received: 'Item Not Received',
  deposit_dispute: 'Deposit Dispute',
  other: 'Other Issue',
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  open:         { label: 'Open',         color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={11} /> },
  under_review: { label: 'Under Review', color: 'bg-blue-100 text-blue-800',    icon: <Scale size={11} /> },
  resolved:     { label: 'Resolved',     color: 'bg-forest-100 text-forest-800', icon: <CheckCircle2 size={11} /> },
  closed:       { label: 'Closed',       color: 'bg-gray-100 text-gray-600',    icon: <Lock size={11} /> },
}

function DisputeRow({ dispute }: { dispute: Dispute }) {
  const listing = MOCK_LISTINGS.find(l => l.id === dispute.listingId)
  const status = STATUS_CONFIG[dispute.status]

  return (
    <Link
      href={`/disputes/${dispute.id}`}
      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
    >
      {listing ? (
        <img src={listing.photos[0]} alt="" className="w-14 h-12 rounded-xl object-cover flex-shrink-0" />
      ) : (
        <div className="w-14 h-12 rounded-xl bg-gray-100 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold', status.color)}>
            {status.icon} {status.label}
          </span>
          <span className="text-xs text-gray-400">{timeAgo(dispute.updatedAt)}</span>
        </div>
        <p className="font-medium text-sm text-gray-900 truncate">{REASON_LABELS[dispute.reason]}</p>
        <p className="text-xs text-gray-500 truncate">{listing?.title ?? 'Unknown listing'}</p>
      </div>
      <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
    </Link>
  )
}

export default function DisputesPage() {
  const [localDisputes, setLocalDisputes] = useState<Dispute[]>([])

  useEffect(() => {
    setLocalDisputes(getDisputes())
  }, [])

  // Disputes involving usr_current (either as renter or owner)
  const mockForCurrent = MOCK_DISPUTES.filter(
    d => d.renterId === 'usr_current' || d.ownerId === 'usr_current',
  )

  const all = [...localDisputes, ...mockForCurrent].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )

  const open = all.filter(d => d.status === 'open' || d.status === 'under_review')
  const closed = all.filter(d => d.status === 'resolved' || d.status === 'closed')

  return (
    <div className="container-app py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Scale size={22} className="text-brand-500" /> Disputes
        </h1>
        <Link
          href="/dashboard/rentals"
          className="text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          File from a rental →
        </Link>
      </div>

      {all.length === 0 ? (
        <div className="card p-12 text-center">
          <Scale size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No disputes</p>
          <p className="text-sm text-gray-400 mt-1">Disputes on your rentals will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {open.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Active ({open.length})
              </h2>
              <div className="card divide-y divide-gray-100">
                {open.map(d => <DisputeRow key={d.id} dispute={d} />)}
              </div>
            </div>
          )}
          {closed.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Resolved ({closed.length})
              </h2>
              <div className="card divide-y divide-gray-100 opacity-75">
                {closed.map(d => <DisputeRow key={d.id} dispute={d} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-5 text-sm text-gray-600">
        <p className="font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
          <AlertTriangle size={15} className="text-amber-500" /> When to file a dispute
        </p>
        <ul className="space-y-1.5 text-xs list-disc list-inside text-gray-500">
          <li>A rented item was returned damaged or not at all</li>
          <li>An item did not match its listing description</li>
          <li>You cannot agree with the other party on deposit handling</li>
          <li>Any safety concern arose during the rental</li>
        </ul>
        <p className="text-xs text-gray-400 mt-3">
          File disputes from an active or completed rental in your{' '}
          <Link href="/dashboard/rentals" className="text-brand-600 underline">Rentals</Link> or{' '}
          <Link href="/dashboard/requests" className="text-brand-600 underline">Requests</Link> dashboard.
        </p>
      </div>
    </div>
  )
}

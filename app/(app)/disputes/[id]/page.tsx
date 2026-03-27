'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, AlertTriangle, CheckCircle2, Clock, Shield,
  MessageSquare, Send, Scale, Lock,
} from 'lucide-react'
import { Dispute, DisputeEvent } from '@/lib/types'
import { getDisputeById, addDisputeResponse } from '@/lib/utils/local-disputes'
import { MOCK_DISPUTES } from '@/lib/data/mock-disputes'
import { MOCK_BOOKINGS } from '@/lib/data/mock-bookings'
import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import { formatCents, formatDate, timeAgo } from '@/lib/utils/formatting'
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
  open: { label: 'Open', color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={13} /> },
  under_review: { label: 'Under Review', color: 'bg-blue-100 text-blue-800', icon: <Scale size={13} /> },
  resolved: { label: 'Resolved', color: 'bg-forest-100 text-forest-800', icon: <CheckCircle2 size={13} /> },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-600', icon: <Lock size={13} /> },
}

const RESOLUTION_LABELS: Record<string, string> = {
  renter_wins: 'Decided in favor of renter',
  owner_wins: 'Decided in favor of owner',
  split: 'Compromise reached',
  no_action: 'No action taken',
}

function EventCard({ event, isLast }: { event: DisputeEvent; isLast: boolean }) {
  const isAdmin = event.authorRole === 'admin'
  const isMe = event.authorName === 'You' || event.authorRole === 'renter'

  return (
    <div className="relative flex gap-4">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-100" />
      )}
      {/* Icon */}
      <div className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10',
        isAdmin ? 'bg-brand-100' : 'bg-gray-100',
      )}>
        {isAdmin
          ? <Shield size={16} className="text-brand-600" />
          : event.type === 'filed'
            ? <AlertTriangle size={16} className="text-red-500" />
            : <MessageSquare size={16} className="text-gray-500" />
        }
      </div>
      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900">{event.authorName}</span>
          {isAdmin && (
            <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">ToolShed</span>
          )}
          <span className="text-xs text-gray-400 ml-auto">{timeAgo(event.createdAt)}</span>
        </div>
        <div className={cn(
          'rounded-2xl p-4 text-sm leading-relaxed',
          isAdmin
            ? 'bg-brand-50 border border-brand-100 text-brand-900'
            : event.type === 'filed'
              ? 'bg-red-50 border border-red-100 text-gray-800'
              : 'bg-white border border-gray-200 text-gray-800',
        )}>
          {event.type === 'filed' && (
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Dispute Filed</p>
          )}
          {event.type === 'resolved' && (
            <p className="text-xs font-semibold text-forest-600 uppercase tracking-wide mb-2">✓ Resolved</p>
          )}
          {event.content}
        </div>
      </div>
    </div>
  )
}

export default function DisputeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [dispute, setDispute] = useState<Dispute | null>(null)
  const [response, setResponse] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    // Try local storage first, then fall back to mock data
    const local = getDisputeById(id)
    if (local) { setDispute(local); return }
    const mock = MOCK_DISPUTES.find(d => d.id === id)
    if (mock) setDispute(mock)
  }, [id])

  if (!dispute) {
    return (
      <div className="container-app py-20 max-w-xl text-center text-gray-500">
        <p>Dispute not found. <Link href="/disputes" className="text-brand-600 font-medium">View all disputes</Link></p>
      </div>
    )
  }

  const booking = MOCK_BOOKINGS.find(b => b.id === dispute.bookingId)
  const listing = MOCK_LISTINGS.find(l => l.id === dispute.listingId)
  const status = STATUS_CONFIG[dispute.status]
  const isLocal = id.startsWith('dsp_local_')
  const isOpen = dispute.status === 'open' || dispute.status === 'under_review'

  const myRole: 'renter' | 'owner' = dispute.renterId === 'usr_current' ? 'renter' : 'owner'
  const hasResponded = dispute.timeline.some(
    e => e.type === 'response' && e.authorRole === myRole,
  )
  const canRespond = isLocal && isOpen && dispute.filedByRole !== myRole && !hasResponded

  function sendResponse() {
    if (!response.trim()) return
    setSending(true)
    addDisputeResponse(id, myRole, 'You', response.trim())
    const updated = getDisputeById(id)
    if (updated) setDispute(updated)
    setResponse('')
    setSending(false)
  }

  return (
    <div className="container-app py-8 max-w-2xl">
      {/* Back */}
      <Link href="/disputes" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft size={16} /> All Disputes
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start gap-3 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold', status.color)}>
              {status.icon} {status.label}
            </span>
            <span className="text-xs text-gray-400">#{id.slice(-8).toUpperCase()}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">{REASON_LABELS[dispute.reason]}</h1>
          <p className="text-sm text-gray-500">Filed {formatDate(dispute.createdAt)}</p>
        </div>
      </div>

      {/* Booking context */}
      {listing && (
        <div className="card p-4 mb-6 flex items-center gap-3">
          <img src={listing.photos[0]} alt="" className="w-16 h-14 rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{listing.title}</p>
            {booking && (
              <p className="text-xs text-gray-500">{booking.dates.startDate} → {booking.dates.endDate}</p>
            )}
            {dispute.depositClaimAmount && (
              <p className="text-xs text-red-600 font-medium mt-0.5">
                Deposit claim: {formatCents(dispute.depositClaimAmount)}
              </p>
            )}
          </div>
          {booking && (
            <Link href={`/listings/${listing.id}`} className="text-xs text-brand-600 font-medium whitespace-nowrap">
              View listing →
            </Link>
          )}
        </div>
      )}

      {/* Resolution banner */}
      {dispute.status === 'resolved' && dispute.resolution && (
        <div className="bg-forest-50 border border-forest-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-forest-600" />
            <p className="font-semibold text-forest-800">Case Resolved</p>
          </div>
          <p className="text-sm font-medium text-forest-700 mb-1">{RESOLUTION_LABELS[dispute.resolution]}</p>
          {dispute.resolutionNote && (
            <p className="text-sm text-forest-600">{dispute.resolutionNote}</p>
          )}
          {dispute.resolvedAt && (
            <p className="text-xs text-forest-500 mt-2">Resolved on {formatDate(dispute.resolvedAt)}</p>
          )}
        </div>
      )}

      {/* Timeline */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Scale size={16} className="text-gray-400" /> Case Timeline
        </h2>
        <div>
          {dispute.timeline.map((event, i) => (
            <EventCard key={event.id} event={event} isLast={i === dispute.timeline.length - 1} />
          ))}
        </div>
      </div>

      {/* Response input */}
      {canRespond && (
        <div className="card p-4">
          <h3 className="font-semibold text-sm text-gray-900 mb-3">Add Your Response</h3>
          <textarea
            rows={4}
            placeholder="Share your side of the story. Be specific and factual — include relevant dates, photos, or messages..."
            value={response}
            onChange={e => setResponse(e.target.value)}
            className="input-base resize-none w-full mb-3"
          />
          <button
            onClick={sendResponse}
            disabled={!response.trim() || sending}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors',
              response.trim()
                ? 'bg-brand-500 hover:bg-brand-600 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed',
            )}
          >
            <Send size={14} /> Submit Response
          </button>
        </div>
      )}

      {/* Awaiting response note */}
      {isOpen && !canRespond && dispute.filedByRole === myRole && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 flex items-start gap-2">
          <Clock size={16} className="flex-shrink-0 mt-0.5" />
          <p>Waiting for the other party to respond. You will be notified when they reply.</p>
        </div>
      )}

      {/* Under review note */}
      {dispute.status === 'under_review' && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-2">
          <Scale size={16} className="flex-shrink-0 mt-0.5" />
          <p>A ToolShed mediator is reviewing this case. Decisions are typically issued within 3–5 business days.</p>
        </div>
      )}
    </div>
  )
}

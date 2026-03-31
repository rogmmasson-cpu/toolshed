'use client'
import { useState, useTransition } from 'react'
import { adminResolveDispute, adminAddDisputeNote } from '@/lib/actions/admin'
import { ChevronDown, ChevronUp, Loader2, MessageSquare, CheckCircle2 } from 'lucide-react'
import { formatDate, formatCents } from '@/lib/utils/formatting'

interface DisputeWithRelations {
  id: string
  reason: string
  status: string
  resolution: string | null
  resolutionNote: string | null
  filedByRole: string
  depositClaimAmount: number | null
  createdAt: Date
  listing: { title: string; photos: string[] }
  booking: { startDate: string; endDate: string; depositAmount: number; waiverSigned: boolean; waiverSignedAt: Date | null }
  timeline: { id: string; type: string; authorRole: string; authorName: string; content: string; createdAt: Date }[]
}

export default function AdminDisputePanel({ dispute }: { dispute: DisputeWithRelations }) {
  const [expanded, setExpanded] = useState(dispute.status === 'open')
  const [isPending, startTransition] = useTransition()
  const [note, setNote] = useState('')
  const [resolution, setResolution] = useState('')
  const [resolutionNote, setResolutionNote] = useState('')

  function handleAddNote() {
    if (!note.trim()) return
    startTransition(async () => {
      await adminAddDisputeNote(dispute.id, note, 'Admin')
      setNote('')
    })
  }

  function handleResolve() {
    if (!resolution) return
    startTransition(async () => {
      await adminResolveDispute(dispute.id, resolution, resolutionNote, 'Admin')
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={() => setExpanded(v => !v)} className="w-full px-5 py-4 flex items-start gap-4 text-left hover:bg-gray-50/50 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-900 text-sm truncate">{dispute.listing.title}</p>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${dispute.status === 'open' ? 'bg-red-50 text-red-700' : dispute.status === 'resolved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{dispute.status}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{dispute.reason.replace(/_/g, ' ')} &middot; Filed by {dispute.filedByRole} &middot; {formatDate(dispute.createdAt.toISOString())}</p>
          {dispute.depositClaimAmount && (
            <p className="text-xs text-amber-700 mt-0.5">Deposit claim: {formatCents(dispute.depositClaimAmount)}</p>
          )}
        </div>
        {expanded ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0 mt-0.5" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />}
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4 space-y-4">
          {/* Booking info */}
          <div className="bg-gray-50 rounded-xl p-3 text-sm flex gap-4 flex-wrap">
            <span><span className="text-gray-500">Dates:</span> {dispute.booking.startDate} &rarr; {dispute.booking.endDate}</span>
            <span><span className="text-gray-500">Deposit:</span> {formatCents(dispute.booking.depositAmount)}</span>
            <span><span className="text-gray-500">Waiver:</span> {dispute.booking.waiverSigned ? `Signed${dispute.booking.waiverSignedAt ? ` ${formatDate(dispute.booking.waiverSignedAt.toISOString())}` : ''}` : 'Not signed'}</span>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Timeline</p>
            <div className="space-y-2">
              {dispute.timeline.map(ev => (
                <div key={ev.id} className={`text-sm rounded-xl px-3 py-2.5 ${ev.authorRole === 'admin' ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-xs text-gray-700">{ev.authorName}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${ev.authorRole === 'admin' ? 'bg-blue-100 text-blue-700' : ev.authorRole === 'owner' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-600'}`}>{ev.authorRole}</span>
                    <span className="text-xs text-gray-400 ml-auto">{formatDate(ev.createdAt.toISOString())}</span>
                  </div>
                  <p className="text-gray-700">{ev.content}</p>
                </div>
              ))}
            </div>
          </div>

          {dispute.status !== 'resolved' && dispute.status !== 'closed' && (
            <>
              {/* Add note */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Add Admin Note</p>
                <div className="flex gap-2">
                  <input value={note} onChange={e => setNote(e.target.value)} placeholder="Internal note…"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200" />
                  <button onClick={handleAddNote} disabled={!note.trim() || isPending}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl flex items-center gap-1">
                    {isPending ? <Loader2 size={13} className="animate-spin" /> : <MessageSquare size={13} />} Add
                  </button>
                </div>
              </div>

              {/* Resolve */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Resolve Dispute</p>
                <div className="space-y-2">
                  <select value={resolution} onChange={e => setResolution(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none">
                    <option value="">Select resolution…</option>
                    <option value="renter_wins">Renter wins</option>
                    <option value="owner_wins">Owner wins</option>
                    <option value="split">Split</option>
                    <option value="no_action">No action</option>
                  </select>
                  <input value={resolutionNote} onChange={e => setResolutionNote(e.target.value)}
                    placeholder="Resolution notes (optional)…"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none" />
                  <button onClick={handleResolve} disabled={!resolution || isPending}
                    className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1">
                    {isPending ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} Resolve Dispute
                  </button>
                </div>
              </div>
            </>
          )}
          {dispute.status === 'resolved' && dispute.resolution && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm">
              <p className="font-semibold text-green-800">Resolution: {dispute.resolution.replace(/_/g, ' ')}</p>
              {dispute.resolutionNote && <p className="text-green-700 mt-0.5">{dispute.resolutionNote}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

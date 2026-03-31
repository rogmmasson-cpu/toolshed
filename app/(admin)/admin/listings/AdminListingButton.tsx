'use client'
import { useState, useTransition } from 'react'
import { adminTakeDownListing, adminRestoreListing } from '@/lib/actions/admin'
import { ShieldOff, RotateCcw, Loader2 } from 'lucide-react'

export default function AdminListingButton({ listingId, status }: { listingId: string; status: string }) {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)
  const [reason, setReason] = useState('')

  function handleTakeDown() {
    if (!reason.trim()) return
    startTransition(async () => {
      await adminTakeDownListing(listingId, reason)
      setShowModal(false)
      setReason('')
    })
  }

  function handleRestore() {
    startTransition(async () => { await adminRestoreListing(listingId) })
  }

  if (status === 'archived') {
    return (
      <button onClick={handleRestore} disabled={isPending}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50">
        {isPending ? <Loader2 size={10} className="animate-spin" /> : <RotateCcw size={10} />} Restore
      </button>
    )
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold rounded-lg transition-colors">
        <ShieldOff size={10} /> Take Down
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-1">Take Down Listing</h3>
            <p className="text-sm text-gray-500 mb-4">Provide a reason. The listing will be archived and hidden from browse.</p>
            <textarea rows={3} value={reason} onChange={e => setReason(e.target.value)}
              placeholder="Reason for removal…"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-200 resize-none mb-4" />
            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={handleTakeDown} disabled={!reason.trim() || isPending}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1">
                {isPending ? <Loader2 size={14} className="animate-spin" /> : null} Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

'use client'
import { useState, useTransition } from 'react'
import { Pause, Play, Loader2 } from 'lucide-react'
import { updateListing } from '@/lib/actions/listings'
import { useRouter } from 'next/navigation'

export default function ListingStatusButton({
  id,
  status,
}: {
  id: string
  status: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [optimisticStatus, setOptimisticStatus] = useState(status)

  function toggle() {
    const next = optimisticStatus === 'active' ? 'paused' : 'active'
    setOptimisticStatus(next)
    startTransition(async () => {
      try {
        await updateListing(id, { status: next as 'active' | 'paused' })
        router.refresh()
      } catch {
        setOptimisticStatus(optimisticStatus) // revert on error
      }
    })
  }

  const isPaused = optimisticStatus !== 'active'

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`inline-flex items-center gap-1 px-3 py-1.5 border disabled:opacity-50 text-xs font-semibold rounded-lg transition-colors ${
        isPaused
          ? 'border-forest-200 bg-forest-50 hover:bg-forest-100 text-forest-700'
          : 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700'
      }`}
    >
      {isPending ? (
        <Loader2 size={11} className="animate-spin" />
      ) : isPaused ? (
        <Play size={11} />
      ) : (
        <Pause size={11} />
      )}
      {isPaused ? 'Activate' : 'Pause'}
    </button>
  )
}

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

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-gray-600 text-xs font-semibold rounded-lg transition-colors"
    >
      {isPending ? (
        <Loader2 size={11} className="animate-spin" />
      ) : optimisticStatus === 'active' ? (
        <Pause size={11} />
      ) : (
        <Play size={11} />
      )}
      {optimisticStatus === 'active' ? 'Pause' : 'Activate'}
    </button>
  )
}

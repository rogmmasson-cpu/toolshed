'use client'
import { useTransition } from 'react'
import { adminHideReview, adminShowReview } from '@/lib/actions/admin'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function AdminReviewButton({ reviewId, isVisible }: { reviewId: string; isVisible: boolean }) {
  const [isPending, startTransition] = useTransition()

  function toggle() {
    startTransition(async () => {
      if (isVisible) await adminHideReview(reviewId)
      else await adminShowReview(reviewId)
    })
  }

  return (
    <button onClick={toggle} disabled={isPending}
      className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors disabled:opacity-50 flex-shrink-0 ${isVisible ? 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'}`}>
      {isPending ? <Loader2 size={10} className="animate-spin" /> : isVisible ? <EyeOff size={10} /> : <Eye size={10} />}
      {isVisible ? 'Hide' : 'Show'}
    </button>
  )
}

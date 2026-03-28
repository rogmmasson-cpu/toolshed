'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Star, Send } from 'lucide-react'
import Button from '@/components/ui/Button'
import { createReview } from '@/lib/actions/reviews'
import { cn } from '@/lib/utils/cn'

function StarPicker({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(s => (
          <button
            key={s}
            type="button"
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(s)}
          >
            <Star
              size={22}
              className={cn(
                'transition-colors',
                (hover || value) >= s ? 'fill-brand-400 text-brand-400' : 'text-gray-300 fill-gray-100'
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ReviewForm({ bookingId }: { bookingId: string }) {
  const [ratings, setRatings] = useState({ overall: 0, accuracy: 0, communication: 0, condition: 0 })
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()

  function submit() {
    if (ratings.overall === 0 || content.trim().length < 20) return
    setError(null)
    startTransition(async () => {
      try {
        await createReview({
          bookingId,
          overallRating: ratings.overall,
          accuracyRating: ratings.accuracy,
          communicationRating: ratings.communication,
          conditionRating: ratings.condition,
          content,
        })
        setDone(true)
      } catch (err: any) {
        setError(err.message ?? 'Something went wrong. Please try again.')
      }
    })
  }

  if (done) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌟</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Submitted!</h2>
        <p className="text-gray-500 mb-6">
          Thanks for helping the community. Your review helps everyone make better decisions.
        </p>
        <Link href="/browse" className="btn-primary">Browse More Tools</Link>
      </div>
    )
  }

  return (
    <div className="card p-5 space-y-5">
      {/* Star ratings */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Ratings</h3>
        <div className="space-y-3">
          <StarPicker value={ratings.overall} onChange={v => setRatings(r => ({ ...r, overall: v }))} label="Overall Experience *" />
          <StarPicker value={ratings.accuracy} onChange={v => setRatings(r => ({ ...r, accuracy: v }))} label="Item Accuracy" />
          <StarPicker value={ratings.communication} onChange={v => setRatings(r => ({ ...r, communication: v }))} label="Owner Communication" />
          <StarPicker value={ratings.condition} onChange={v => setRatings(r => ({ ...r, condition: v }))} label="Item Condition" />
        </div>
      </div>

      {/* Written review */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Written Review <span className="text-gray-400 font-normal">(min 20 chars)</span>
        </label>
        <textarea
          rows={4}
          placeholder="Describe your experience — was the item as described? How was the owner to work with?"
          value={content}
          onChange={e => setContent(e.target.value.slice(0, 500))}
          className="input-base resize-none"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">{content.length}/500</span>
          {content.length < 20 && content.length > 0 && (
            <span className="text-xs text-red-500">{20 - content.length} more characters needed</span>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      <Button
        className="w-full"
        size="lg"
        disabled={ratings.overall === 0 || content.length < 20}
        loading={isPending}
        onClick={submit}
      >
        <Send size={16} /> Submit Review
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Reviews are public and help build community trust. False or malicious reviews violate our Terms of Service.
      </p>
    </div>
  )
}

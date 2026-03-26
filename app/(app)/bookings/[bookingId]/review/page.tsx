'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Star, ArrowLeft, Send } from 'lucide-react'
import { MOCK_BOOKINGS } from '@/lib/data/mock-bookings'
import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import { MOCK_USERS } from '@/lib/data/mock-users'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { cn } from '@/lib/utils/cn'

function StarPicker({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex gap-1">
        {[1,2,3,4,5].map(s => (
          <button
            key={s}
            type="button"
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(s)}
          >
            <Star
              size={22}
              className={cn('transition-colors', (hover || value) >= s ? 'fill-brand-400 text-brand-400' : 'text-gray-300 fill-gray-100')}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ReviewPage() {
  const { bookingId } = useParams<{ bookingId: string }>()
  const router = useRouter()
  const [ratings, setRatings] = useState({ overall: 0, accuracy: 0, communication: 0, condition: 0 })
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const booking = MOCK_BOOKINGS.find(b => b.id === bookingId) ?? MOCK_BOOKINGS[0]
  const listing = MOCK_LISTINGS.find(l => l.id === booking?.listingId)
  const owner   = MOCK_USERS.find(u => u.id === booking?.ownerId)

  async function submit() {
    if (ratings.overall === 0 || !content.trim()) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setDone(true)
  }

  if (done) return (
    <div className="container-app py-16 max-w-sm mx-auto text-center">
      <div className="text-6xl mb-4">🌟</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Submitted!</h2>
      <p className="text-gray-500 mb-6">Thanks for helping the community. Your review helps everyone make better decisions.</p>
      <Link href="/browse" className="btn-primary">Browse More Tools</Link>
    </div>
  )

  return (
    <div className="container-app py-8 max-w-lg mx-auto">
      <Link href="/dashboard/rentals" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <ArrowLeft size={15}/>Back
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Leave a Review</h1>
      <p className="text-sm text-gray-500 mb-6">Your honest feedback helps the ToolShed community.</p>

      {/* Tool & owner */}
      {listing && owner && (
        <div className="card p-4 mb-6 flex gap-3">
          <img src={listing.photos[0]} alt="" className="w-16 h-14 rounded-xl object-cover flex-shrink-0"/>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{listing.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <Avatar src={owner.avatarUrl} name={owner.name} size="xs"/>
              <span className="text-xs text-gray-500">Owned by {owner.name}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card p-5 space-y-5">
        {/* Star ratings */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Ratings</h3>
          <div className="space-y-3">
            <StarPicker value={ratings.overall}       onChange={v => setRatings(r => ({...r, overall: v}))}       label="Overall Experience *" />
            <StarPicker value={ratings.accuracy}      onChange={v => setRatings(r => ({...r, accuracy: v}))}      label="Item Accuracy" />
            <StarPicker value={ratings.communication} onChange={v => setRatings(r => ({...r, communication: v}))} label="Owner Communication" />
            <StarPicker value={ratings.condition}     onChange={v => setRatings(r => ({...r, condition: v}))}     label="Item Condition" />
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
            onChange={e => setContent(e.target.value)}
            className="input-base resize-none"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">{content.length}/500</span>
            {content.length < 20 && content.length > 0 && (
              <span className="text-xs text-red-500">{20 - content.length} more characters needed</span>
            )}
          </div>
        </div>

        {/* Photo upload (mock) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Add Photos (optional)</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center text-sm text-gray-400 hover:border-gray-300 cursor-pointer transition-colors">
            📷 Upload photos of the tool or your project
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={ratings.overall === 0 || content.length < 20}
          loading={submitting}
          onClick={submit}
        >
          <Send size={16}/>Submit Review
        </Button>

        <p className="text-xs text-gray-400 text-center">
          Reviews are public and help build community trust. False or malicious reviews violate our Terms of Service.
        </p>
      </div>
    </div>
  )
}

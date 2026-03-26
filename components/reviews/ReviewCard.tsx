import { Star } from 'lucide-react'
import { ReviewWithAuthor } from '@/lib/mock-db/reviews'
import Avatar from '@/components/ui/Avatar'
import { formatDate } from '@/lib/utils/formatting'

export default function ReviewCard({ review }: { review: ReviewWithAuthor }) {
  return (
    <div className="border-b border-gray-100 pb-5 last:border-0">
      <div className="flex items-start gap-3 mb-3">
        <Avatar src={review.author.avatarUrl} name={review.author.name} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-sm text-gray-900">{review.author.name}</p>
            <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
          </div>
          <div className="flex items-center gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={12}
                className={s <= review.ratings.overall ? 'fill-brand-400 text-brand-400' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>
      {review.response && (
        <div className="mt-3 ml-4 pl-3 border-l-2 border-gray-200">
          <p className="text-xs font-semibold text-gray-500 mb-1">Owner&apos;s reply:</p>
          <p className="text-sm text-gray-600">{review.response}</p>
        </div>
      )}

      {/* Sub-ratings */}
      {(review.ratings.accuracy || review.ratings.communication || review.ratings.condition) && (
        <div className="mt-3 flex flex-wrap gap-3">
          {review.ratings.accuracy && (
            <span className="text-xs text-gray-500">Accuracy <span className="font-semibold text-gray-700">{review.ratings.accuracy}/5</span></span>
          )}
          {review.ratings.communication && (
            <span className="text-xs text-gray-500">Communication <span className="font-semibold text-gray-700">{review.ratings.communication}/5</span></span>
          )}
          {review.ratings.condition && (
            <span className="text-xs text-gray-500">Condition <span className="font-semibold text-gray-700">{review.ratings.condition}/5</span></span>
          )}
        </div>
      )}
    </div>
  )
}

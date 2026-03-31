import { db } from '@/lib/db'
import { formatDate } from '@/lib/utils/formatting'
import AdminReviewButton from './AdminReviewButton'
import Link from 'next/link'

interface Props { searchParams: Promise<{ filter?: string }> }

export default async function AdminReviewsPage({ searchParams }: Props) {
  const { filter } = await searchParams

  const reviews = await db.review.findMany({
    where: {
      ...(filter === 'hidden' ? { isVisible: false } : {}),
      ...(filter === 'visible' ? { isVisible: true } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      author: { select: { name: true } },
    },
  })

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">{reviews.length} results</p>
      </div>

      <div className="flex gap-2 mb-6">
        {[['', 'All'], ['visible', 'Visible'], ['hidden', 'Hidden']].map(([val, label]) => (
          <Link key={val} href={`/admin/reviews${val ? `?filter=${val}` : ''}`}
            className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${(filter ?? '') === val ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
            {label}
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-gray-400">No reviews found</p>
          </div>
        ) : reviews.map(r => (
          <div key={r.id} className={`bg-white rounded-2xl border shadow-sm p-5 ${!r.isVisible ? 'border-red-100 bg-red-50/30' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-sm text-gray-900">{r.author.name}</span>
                  <span className="text-xs text-gray-400 capitalize">{r.targetType}</span>
                  <span className="text-xs font-bold text-amber-500">&#9733; {r.overallRating.toFixed(1)}</span>
                  {!r.isVisible && <span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs font-medium rounded-full border border-red-200">Hidden</span>}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{r.content}</p>
                {r.response && (
                  <div className="mt-2 pl-3 border-l-2 border-gray-200 text-sm text-gray-500 italic">{r.response}</div>
                )}
                <p className="text-xs text-gray-400 mt-2">{formatDate(r.createdAt.toISOString())}</p>
              </div>
              <AdminReviewButton reviewId={r.id} isVisible={r.isVisible} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

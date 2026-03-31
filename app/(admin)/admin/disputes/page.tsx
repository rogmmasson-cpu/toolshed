import { db } from '@/lib/db'
import { formatDate, formatCents } from '@/lib/utils/formatting'
import AdminDisputePanel from './AdminDisputePanel'
import Link from 'next/link'

interface Props { searchParams: Promise<{ status?: string }> }

export default async function AdminDisputesPage({ searchParams }: Props) {
  const { status = 'open' } = await searchParams

  const disputes = await db.dispute.findMany({
    where: { status },
    orderBy: { createdAt: 'desc' },
    include: {
      listing: { select: { title: true, photos: true } },
      timeline: { orderBy: { createdAt: 'asc' } },
      booking: { select: { startDate: true, endDate: true, depositAmount: true, waiverSigned: true, waiverSignedAt: true } },
    },
  })

  const counts = await db.dispute.groupBy({ by: ['status'], _count: true })
  const byStatus: Record<string, number> = {}
  counts.forEach(c => { byStatus[c.status] = c._count })

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Disputes</h1>
        <p className="text-sm text-gray-500 mt-1">{disputes.length} results</p>
      </div>

      <div className="flex gap-2 mb-6">
        {[['open', 'Open'], ['under_review', 'Under Review'], ['resolved', 'Resolved'], ['closed', 'Closed']].map(([val, label]) => (
          <Link key={val} href={`/admin/disputes?status=${val}`}
            className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${status === val ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
            {label} {byStatus[val] ? `(${byStatus[val]})` : ''}
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {disputes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-gray-400">No {status} disputes</p>
          </div>
        ) : disputes.map(d => (
          <AdminDisputePanel key={d.id} dispute={d} />
        ))}
      </div>
    </div>
  )
}

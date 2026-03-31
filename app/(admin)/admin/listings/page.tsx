import { db } from '@/lib/db'
import { formatDate, formatCents } from '@/lib/utils/formatting'
import AdminListingButton from './AdminListingButton'
import Link from 'next/link'
import { Search } from 'lucide-react'

interface Props { searchParams: Promise<{ q?: string; status?: string }> }

export default async function AdminListingsPage({ searchParams }: Props) {
  const { q, status } = await searchParams

  const listings = await db.listing.findMany({
    where: {
      ...(q ? { OR: [{ title: { contains: q, mode: 'insensitive' } }, { brand: { contains: q, mode: 'insensitive' } }] } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: { owner: { select: { id: true, name: true, bannedAt: true } } },
  })

  const counts = await db.listing.groupBy({ by: ['status'], _count: true })
  const byStatus: Record<string, number> = {}
  counts.forEach(c => { byStatus[c.status] = c._count })

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Listings</h1>
        <p className="text-sm text-gray-500 mt-1">{listings.length} results</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <form className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 max-w-xs">
          <Search size={14} className="text-gray-400" />
          <input name="q" defaultValue={q} placeholder="Search listings…" className="text-sm flex-1 outline-none" />
        </form>
        <div className="flex gap-2 flex-wrap">
          {[['', `All (${Object.values(byStatus).reduce((a, b) => a + b, 0)})`], ['active', `Active (${byStatus.active ?? 0})`], ['paused', `Paused (${byStatus.paused ?? 0})`], ['archived', `Archived (${byStatus.archived ?? 0})`]].map(([val, label]) => (
            <Link key={val} href={`/admin/listings${val ? `?status=${val}` : ''}`}
              className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors whitespace-nowrap ${(status === val || (!status && val === '')) ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
            <th className="text-left px-5 py-3">Listing</th>
            <th className="text-left px-5 py-3">Owner</th>
            <th className="text-left px-5 py-3">Price</th>
            <th className="text-left px-5 py-3">Stats</th>
            <th className="text-left px-5 py-3">Status</th>
            <th className="text-left px-5 py-3">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {listings.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">No listings found</td></tr>
            ) : listings.map(l => (
              <tr key={l.id} className="hover:bg-gray-50/50">
                <td className="px-5 py-4 max-w-[220px]">
                  <p className="font-medium text-gray-900 truncate">{l.title}</p>
                  <p className="text-xs text-gray-400 capitalize">{l.category} · {l.condition}</p>
                  {l.takenDownReason && <p className="text-xs text-red-500 mt-0.5 truncate">&#8627; {l.takenDownReason}</p>}
                </td>
                <td className="px-5 py-4">
                  <Link href={`/admin/users/${l.owner.id}`} className="hover:underline text-gray-700">{l.owner.name}</Link>
                  {l.owner.bannedAt && <span className="ml-1 text-xs text-red-500">(banned)</span>}
                </td>
                <td className="px-5 py-4 font-medium text-gray-900">{formatCents(l.dailyRate)}/day</td>
                <td className="px-5 py-4 text-xs text-gray-500">
                  {l.totalRentals} rentals<br/>
                  {l.reviewCount > 0 ? `★ ${l.averageRating.toFixed(1)} (${l.reviewCount})` : 'No reviews'}
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.status === 'active' ? 'bg-green-50 text-green-700' : l.status === 'paused' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{l.status}</span>
                </td>
                <td className="px-5 py-4">
                  <AdminListingButton listingId={l.id} status={l.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { db } from '@/lib/db'
import { formatDate, formatCents } from '@/lib/utils/formatting'
import { CheckCircle2, XCircle } from 'lucide-react'

interface Props { searchParams: Promise<{ filter?: string }> }

export default async function AdminAgreementsPage({ searchParams }: Props) {
  const { filter } = await searchParams

  const bookings = await db.booking.findMany({
    where: {
      ...(filter === 'signed' ? { waiverSigned: true } : {}),
      ...(filter === 'unsigned' ? { waiverSigned: false } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      listing: { select: { title: true } },
      renter: { select: { name: true, email: true } },
    },
  })

  const signedCount = await db.booking.count({ where: { waiverSigned: true } })
  const totalCount = await db.booking.count()

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agreements &amp; Waivers</h1>
        <p className="text-sm text-gray-500 mt-1">{signedCount} of {totalCount} bookings have signed waivers</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-600" />
          <div>
            <p className="text-xl font-bold text-gray-900">{signedCount}</p>
            <p className="text-xs text-green-700">Signed waivers</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center gap-3">
          <XCircle size={20} className="text-red-500" />
          <div>
            <p className="text-xl font-bold text-gray-900">{totalCount - signedCount}</p>
            <p className="text-xs text-red-600">Unsigned</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {[['', 'All'], ['signed', 'Signed'], ['unsigned', 'Unsigned']].map(([val, label]) => (
          <a key={val} href={`/admin/agreements${val ? `?filter=${val}` : ''}`}
            className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${(filter ?? '') === val ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
            {label}
          </a>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
            <th className="text-left px-5 py-3">Listing</th>
            <th className="text-left px-5 py-3">Renter</th>
            <th className="text-left px-5 py-3">Dates</th>
            <th className="text-left px-5 py-3">Deposit</th>
            <th className="text-left px-5 py-3">Waiver</th>
            <th className="text-left px-5 py-3">Signed At</th>
            <th className="text-left px-5 py-3">IP</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {bookings.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-400">No bookings found</td></tr>
            ) : bookings.map(b => (
              <tr key={b.id} className="hover:bg-gray-50/50">
                <td className="px-5 py-3">
                  <p className="font-medium text-gray-900 max-w-[180px] truncate">{b.listing.title}</p>
                </td>
                <td className="px-5 py-3">
                  <p className="text-gray-700">{b.renter.name}</p>
                  <p className="text-xs text-gray-400">{b.renter.email}</p>
                </td>
                <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{b.startDate} &rarr; {b.endDate}</td>
                <td className="px-5 py-3 font-medium text-gray-900">{formatCents(b.depositAmount)}</td>
                <td className="px-5 py-3">
                  {b.waiverSigned
                    ? <span className="inline-flex items-center gap-1 text-green-700 font-medium"><CheckCircle2 size={13} /> Signed</span>
                    : <span className="inline-flex items-center gap-1 text-red-500"><XCircle size={13} /> Not signed</span>}
                </td>
                <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                  {b.waiverSignedAt ? formatDate(b.waiverSignedAt.toISOString()) : '—'}
                </td>
                <td className="px-5 py-3 text-gray-400 text-xs font-mono">
                  {b.waiverIpAddress ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { getAdminStats } from '@/lib/actions/admin'
import { db } from '@/lib/db'
import { Users, Package, BookOpen, AlertTriangle, FileText, Star, Ban } from 'lucide-react'
import { formatDate } from '@/lib/utils/formatting'

export default async function AdminOverviewPage() {
  const stats = await getAdminStats()

  const [recentUsers, recentBookings, openDisputes] = await Promise.all([
    db.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, email: true, createdAt: true, bannedAt: true } }),
    db.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { listing: { select: { title: true } }, renter: { select: { name: true } } } }),
    db.dispute.findMany({ where: { status: 'open' }, orderBy: { createdAt: 'desc' }, take: 5, include: { listing: { select: { title: true } } } }),
  ])

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, sub: `+${stats.newUsersWeek} this week`, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Banned Users', value: stats.bannedUsers, sub: 'accounts suspended', icon: Ban, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Active Listings', value: stats.activeListings, sub: `${stats.pausedListings} paused · ${stats.archivedListings} archived`, icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Bookings', value: stats.totalBookings, sub: `${stats.pendingBookings} pending · ${stats.completedBookings} completed`, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Open Disputes', value: stats.openDisputes, sub: `${stats.resolvedDisputes} resolved total`, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Signed Waivers', value: stats.totalWaivers, sub: `of ${stats.totalBookings} bookings`, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Reviews', value: stats.totalReviews, sub: `${stats.hiddenReviews} hidden`, icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ]

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Platform health at a glance</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={17} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value.toLocaleString()}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Recent Sign-ups</h2>
            <a href="/admin/users" className="text-xs text-brand-600 hover:underline">View all</a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.length === 0 ? (
              <p className="px-5 py-6 text-sm text-gray-400 text-center">No users yet</p>
            ) : recentUsers.map(u => (
              <div key={u.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
                <div className="text-right">
                  {u.bannedAt && <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Banned</span>}
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(u.createdAt.toISOString())}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open disputes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Open Disputes</h2>
            <a href="/admin/disputes" className="text-xs text-brand-600 hover:underline">View all</a>
          </div>
          <div className="divide-y divide-gray-50">
            {openDisputes.length === 0 ? (
              <p className="px-5 py-6 text-sm text-gray-400 text-center">No open disputes</p>
            ) : openDisputes.map(d => (
              <div key={d.id} className="px-5 py-3">
                <p className="text-sm font-medium text-gray-900 truncate">{d.listing.title}</p>
                <p className="text-xs text-gray-400">{d.reason.replace(/_/g, ' ')} · {formatDate(d.createdAt.toISOString())}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent bookings */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Recent Bookings</h2>
            <a href="/admin/agreements" className="text-xs text-brand-600 hover:underline">Waiver audit</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="text-left px-5 py-2">Listing</th>
                <th className="text-left px-5 py-2">Renter</th>
                <th className="text-left px-5 py-2">Status</th>
                <th className="text-left px-5 py-2">Waiver</th>
                <th className="text-left px-5 py-2">Date</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.length === 0 ? (
                  <tr><td colSpan={5} className="px-5 py-6 text-center text-gray-400">No bookings yet</td></tr>
                ) : recentBookings.map(b => (
                  <tr key={b.id}>
                    <td className="px-5 py-3 font-medium text-gray-900 max-w-[200px] truncate">{b.listing.title}</td>
                    <td className="px-5 py-3 text-gray-600">{b.renter.name}</td>
                    <td className="px-5 py-3"><StatusChip status={b.status} /></td>
                    <td className="px-5 py-3">{b.waiverSigned ? <span className="text-green-600 font-medium text-xs">Signed</span> : <span className="text-gray-400 text-xs">—</span>}</td>
                    <td className="px-5 py-3 text-gray-400">{formatDate(b.createdAt.toISOString())}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700',
    approved: 'bg-blue-50 text-blue-700',
    active: 'bg-green-50 text-green-700',
    completed: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-gray-100 text-gray-500',
    disputed: 'bg-red-50 text-red-700',
  }
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>{status}</span>
}

import { db } from '@/lib/db'
import { formatDate } from '@/lib/utils/formatting'
import AdminBanButton from './AdminBanButton'
import Link from 'next/link'
import { Search } from 'lucide-react'

interface Props { searchParams: Promise<{ q?: string; filter?: string }> }

export default async function AdminUsersPage({ searchParams }: Props) {
  const { q, filter } = await searchParams

  const users = await db.user.findMany({
    where: {
      ...(q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { email: { contains: q, mode: 'insensitive' } }] } : {}),
      ...(filter === 'banned' ? { bannedAt: { not: null } } : {}),
      ...(filter === 'active' ? { bannedAt: null } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: { id: true, name: true, email: true, locationCity: true, locationState: true, totalListings: true, totalLends: true, totalRentals: true, badges: true, bannedAt: true, bannedReason: true, createdAt: true },
  })

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-1">{users.length} results</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <form className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 max-w-xs">
          <Search size={14} className="text-gray-400" />
          <input name="q" defaultValue={q} placeholder="Search name or email…" className="text-sm flex-1 outline-none" />
        </form>
        <div className="flex gap-2">
          {[['', 'All'], ['active', 'Active'], ['banned', 'Banned']].map(([val, label]) => (
            <Link key={val} href={`/admin/users${val ? `?filter=${val}` : ''}`}
              className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${filter === val || (!filter && val === '') ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
            <th className="text-left px-5 py-3">User</th>
            <th className="text-left px-5 py-3">Location</th>
            <th className="text-left px-5 py-3">Activity</th>
            <th className="text-left px-5 py-3">Badges</th>
            <th className="text-left px-5 py-3">Joined</th>
            <th className="text-left px-5 py-3">Status</th>
            <th className="text-left px-5 py-3">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-400">No users found</td></tr>
            ) : users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50/50">
                <td className="px-5 py-4">
                  <Link href={`/admin/users/${u.id}`} className="hover:underline">
                    <p className="font-medium text-gray-900">{u.name}</p>
                    <p className="text-xs text-gray-400">{u.email}</p>
                  </Link>
                </td>
                <td className="px-5 py-4 text-gray-600">{u.locationCity}, {u.locationState}</td>
                <td className="px-5 py-4 text-gray-500 text-xs">
                  <span>{u.totalListings} listings</span><br/>
                  <span>{u.totalLends} lends · {u.totalRentals} rentals</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {u.badges.map(b => (
                      <span key={b} className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-xs">{b}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-400 text-xs">{formatDate(u.createdAt.toISOString())}</td>
                <td className="px-5 py-4">
                  {u.bannedAt ? (
                    <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs font-medium">Banned</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">Active</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <AdminBanButton userId={u.id} isBanned={!!u.bannedAt} bannedReason={u.bannedReason ?? ''} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

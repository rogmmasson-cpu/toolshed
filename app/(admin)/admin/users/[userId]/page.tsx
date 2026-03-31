import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatCents } from '@/lib/utils/formatting'
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react'
import AdminBanButton from '../AdminBanButton'

interface Props { params: Promise<{ userId: string }> }

export default async function AdminUserDetailPage({ params }: Props) {
  const { userId } = await params

  const [user, listings, bookingsAsRenter, bookingsAsOwner] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.listing.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'desc' }, take: 20, select: { id: true, title: true, status: true, dailyRate: true, totalRentals: true, averageRating: true, reviewCount: true, createdAt: true, takenDownReason: true } }),
    db.booking.findMany({ where: { renterId: userId }, orderBy: { createdAt: 'desc' }, take: 10, include: { listing: { select: { title: true } } } }),
    db.booking.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'desc' }, take: 10, include: { renter: { select: { name: true } } } }),
  ])

  if (!user) notFound()

  return (
    <div className="p-8 max-w-5xl">
      <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft size={14} /> Back to Users
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">{user.locationCity}, {user.locationState}</p>
            <p className="text-xs text-gray-400 mt-2">Member since {formatDate(user.memberSince.toISOString())}</p>

            {user.bannedAt && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-xs font-semibold text-red-700">Banned {formatDate(user.bannedAt.toISOString())}</p>
                {user.bannedReason && <p className="text-xs text-red-600 mt-1">{user.bannedReason}</p>}
              </div>
            )}

            <div className="mt-4">
              <AdminBanButton userId={user.id} isBanned={!!user.bannedAt} bannedReason={user.bannedReason ?? ''} />
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-sm text-gray-900 mb-3">Stats</h2>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Listings', value: user.totalListings },
                { label: 'Total Lends', value: user.totalLends },
                { label: 'Total Rentals', value: user.totalRentals },
                { label: 'Response Rate', value: `${Math.round(user.responseRate * 100)}%` },
                { label: 'Response Time', value: `${user.responseTimeHours}h` },
              ].map(s => (
                <div key={s.label} className="flex justify-between">
                  <span className="text-gray-500">{s.label}</span>
                  <span className="font-medium text-gray-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-sm text-gray-900 mb-3">Verification Badges</h2>
            <div className="space-y-2">
              {(['email', 'phone', 'id', 'social', 'payment'] as const).map(b => {
                const has = user.badges.includes(b)
                return (
                  <div key={b} className={`flex items-center gap-2 text-sm ${has ? 'text-gray-700' : 'text-gray-300'}`}>
                    {has ? <CheckCircle2 size={14} className="text-green-500" /> : <XCircle size={14} className="text-gray-300" />}
                    <span className="capitalize">{b} verified</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right: listings + bookings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Listings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm">Listings ({listings.length})</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {listings.length === 0 ? (
                <p className="px-5 py-6 text-sm text-gray-400 text-center">No listings</p>
              ) : listings.map(l => (
                <div key={l.id} className="px-5 py-3 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{l.title}</p>
                    {l.takenDownReason && <p className="text-xs text-red-500">Taken down: {l.takenDownReason}</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-900">{formatCents(l.dailyRate)}/day</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${l.status === 'active' ? 'bg-green-50 text-green-700' : l.status === 'paused' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{l.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings as renter */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm">Rental History (as renter)</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {bookingsAsRenter.length === 0 ? (
                <p className="px-5 py-6 text-sm text-gray-400 text-center">No rentals</p>
              ) : bookingsAsRenter.map(b => (
                <div key={b.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{b.listing.title}</p>
                    <p className="text-xs text-gray-400">{b.startDate} &rarr; {b.endDate}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.status === 'completed' ? 'bg-gray-100 text-gray-600' : b.status === 'disputed' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{b.status}</span>
                    <p className="text-xs text-gray-400 mt-0.5">{b.waiverSigned ? 'Waiver signed' : 'No waiver'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings as owner */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm">Lend History (as owner)</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {bookingsAsOwner.length === 0 ? (
                <p className="px-5 py-6 text-sm text-gray-400 text-center">No lends</p>
              ) : bookingsAsOwner.map(b => (
                <div key={b.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{b.renter.name}</p>
                    <p className="text-xs text-gray-400">{b.startDate} &rarr; {b.endDate}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.status === 'completed' ? 'bg-gray-100 text-gray-600' : b.status === 'disputed' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

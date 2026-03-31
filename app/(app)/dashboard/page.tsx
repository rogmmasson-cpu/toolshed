import Link from 'next/link'
import { DollarSign, Package, Star, TrendingUp, ArrowRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { auth, currentUser } from '@clerk/nextjs/server'
import { getCurrentUser } from '@/lib/mock-db/users'
import { getListingsByOwner } from '@/lib/mock-db/listings'
import { getBookingsByOwner, getBookingsByRenter } from '@/lib/mock-db/bookings'
import { formatCents } from '@/lib/utils/formatting'
import Avatar from '@/components/ui/Avatar'
import DashboardPendingRow from '@/components/dashboard/DashboardPendingRow'

export default async function DashboardPage() {
  const { userId } = await auth()

  const [clerkUser, dbUser, myListings, incomingBookings, myRentals] = await Promise.all([
    currentUser(),
    userId ? getCurrentUser(userId) : Promise.resolve(null),
    userId ? getListingsByOwner(userId) : Promise.resolve([]),
    userId ? getBookingsByOwner(userId) : Promise.resolve([]),
    userId ? getBookingsByRenter(userId) : Promise.resolve([]),
  ])

  const displayName = clerkUser?.firstName ?? clerkUser?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ?? dbUser?.name.split(' ')[0] ?? 'there'
  const displayAvatar = clerkUser?.imageUrl ?? dbUser?.avatarUrl ?? null
  const user = dbUser

  const totalEarnings = incomingBookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + b.pricing.subtotal, 0)

  const pendingRequests = incomingBookings.filter((b) => b.status === 'pending')
  const activeRentals = myRentals.filter((b) => b.status === 'active')

  const stats = [
    { label: 'Total Earned', value: formatCents(totalEarnings), icon: <DollarSign size={20} />, color: 'text-forest-600 bg-forest-50' },
    { label: 'Active Listings', value: myListings.filter(l => l.status === 'active').length, icon: <Package size={20} />, color: 'text-brand-600 bg-brand-50' },
    { label: 'Pending Requests', value: pendingRequests.length, icon: <Clock size={20} />, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Active Rentals', value: activeRentals.length, icon: <Star size={20} />, color: 'text-purple-600 bg-purple-50' },
  ]

  return (
    <div className="container-app py-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar src={displayAvatar} name={displayName} size="xl" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {displayName}!</h1>
          <p className="text-gray-500">Member since {user?.memberSince ? new Date(user.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'recently'}</p>
        </div>
        <Link href="/listings/new" className="ml-auto hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors">
          + List a Tool
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pending requests */}
          {pendingRequests.length > 0 && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <AlertCircle size={18} className="text-yellow-500" />
                  Pending Requests ({pendingRequests.length})
                </h2>
                <Link href="/dashboard/requests" className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {pendingRequests.slice(0, 2).map((b) => (
                  <DashboardPendingRow key={b.id} booking={b} />
                ))}
              </div>
            </div>
          )}

          {/* Active rentals */}
          {activeRentals.length > 0 && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-forest-500" />
                  Active Rentals ({activeRentals.length})
                </h2>
                <Link href="/dashboard/rentals" className="text-sm text-brand-600 font-medium flex items-center gap-1">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {activeRentals.map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-3 bg-forest-50 border border-forest-200 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Booking #{b.id.slice(-6)}</p>
                      <p className="text-xs text-gray-500">Returns {b.dates.endDate}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-forest-500 text-white text-xs font-semibold rounded-full">Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My listings */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">My Listings</h2>
              <Link href="/dashboard/listings" className="text-sm text-brand-600 font-medium flex items-center gap-1">
                Manage <ArrowRight size={14} />
              </Link>
            </div>
            {myListings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm mb-3">No listings yet</p>
                <Link href="/listings/new" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 text-white text-sm font-semibold rounded-xl">
                  Create Your First Listing
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myListings.slice(0, 3).map((l) => (
                  <div key={l.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
                    <img src={l.photos[0]} alt={l.title} className="w-14 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{l.title}</p>
                      <p className="text-xs text-gray-500">{formatCents(l.pricing.dailyRate)}/day · {l.stats.totalRentals} rentals</p>
                    </div>
                    <span className={`badge ${l.status === 'active' ? 'bg-forest-100 text-forest-700' : 'bg-gray-100 text-gray-600'}`}>
                      {l.status}
                    </span>
                    <Link href={`/listings/${l.id}`} className="text-brand-500 text-xs font-medium">View</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { href: '/listings/new', label: '+ List a new tool', color: 'text-brand-600' },
                { href: '/browse', label: '🔍 Browse tools to rent', color: 'text-gray-700' },
                { href: '/messages', label: '💬 View messages', color: 'text-gray-700' },
                { href: `/profile/usr_current`, label: '👤 View my profile', color: 'text-gray-700' },
              ].map((a) => (
                <Link key={a.href} href={a.href} className={`block text-sm font-medium ${a.color} hover:opacity-80 py-1`}>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

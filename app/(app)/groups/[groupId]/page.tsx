import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Users, Package, MapPin, Settings, MessageSquare } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { getGroupById } from '@/lib/mock-db/groups'
import { db } from '@/lib/db'
import ListingCard from '@/components/listings/ListingCard'
import GroupJoinButton from '@/components/groups/GroupJoinButton'
import Avatar from '@/components/ui/Avatar'
import { getListings } from '@/lib/mock-db/listings'

interface Props {
  params: Promise<{ groupId: string }>
}

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&h=400&fit=crop'

export default async function GroupDetailPage({ params }: Props) {
  const { groupId } = await params

  const [group, { userId }] = await Promise.all([
    getGroupById(groupId),
    auth(),
  ])

  if (!group) notFound()

  const isMember = userId ? group.memberIds.includes(userId) : false
  const isAdmin = userId === group.adminId

  // Load member users from DB (best-effort — skip unknown IDs)
  const memberUsers = group.memberIds.length > 0
    ? await db.user.findMany({ where: { id: { in: group.memberIds } }, select: { id: true, name: true, avatarUrl: true } })
    : []

  const adminUser = memberUsers.find(u => u.id === group.adminId) ?? null

  // Load member listings (listings owned by members)
  const memberListings = group.memberIds.length > 0
    ? await getListings().then(all => all.filter(l => group.memberIds.includes(l.ownerId)).slice(0, 4))
    : []

  const locationParts = [group.neighborhood, group.city, group.state].filter(Boolean)
  const location = locationParts.join(', ')

  return (
    <div className="pb-12">
      {/* Cover photo */}
      <div className="relative h-52 md:h-64 overflow-hidden">
        <img src={group.coverImageUrl ?? DEFAULT_COVER} alt={group.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container-app max-w-4xl">
            <Link href="/groups" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft size={14} /> All Groups
            </Link>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{group.name}</h1>
                {location && (
                  <p className="text-white/70 text-sm flex items-center gap-1.5">
                    <MapPin size={12} />{location}
                  </p>
                )}
              </div>
              {isMember || isAdmin ? (
                <div className="flex gap-2 flex-shrink-0">
                  {isAdmin && (
                    <span className="px-3 py-2 bg-white/10 border border-white/30 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5">
                      <Settings size={13} />Organizer
                    </span>
                  )}
                  <GroupJoinButton groupId={group.id} isMember={isMember || isAdmin} isAdmin={isAdmin} />
                </div>
              ) : (
                <GroupJoinButton groupId={group.id} isMember={false} isAdmin={false} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-app max-w-4xl pt-6">
        {/* Stats row */}
        <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5 font-medium text-gray-700">
            <Users size={15} className="text-brand-500" />{group.memberIds.length} members
          </span>
          {memberListings.length > 0 && (
            <span className="flex items-center gap-1.5 font-medium text-gray-700">
              <Package size={15} className="text-brand-500" />{memberListings.length}+ listings
            </span>
          )}
          <span className="text-gray-400">·</span>
          <span>Est. {new Date(group.createdAt).getFullYear()}</span>
          {(isMember || isAdmin) && (
            <>
              <span className="text-gray-400">·</span>
              <span className="px-2 py-0.5 bg-forest-100 text-forest-700 text-xs font-semibold rounded-full">
                {isAdmin ? 'Organizer' : 'Member'}
              </span>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{group.description}</p>
            </div>

            {/* Group rules */}
            {group.rules.length > 0 && (
              <div className="card p-5">
                <h2 className="font-semibold text-gray-900 mb-3">Group Rules</h2>
                <ol className="space-y-2">
                  {group.rules.map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <span className="flex-shrink-0 w-5 h-5 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {rule}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Listings from members */}
            {memberListings.length > 0 && (
              <div>
                <h2 className="font-semibold text-gray-900 mb-3">Tools from Members</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {memberListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty state for members with no listings yet */}
            {memberListings.length === 0 && (isMember || isAdmin) && (
              <div className="card p-8 text-center border-dashed">
                <p className="text-gray-500 text-sm mb-3">No listings from group members yet.</p>
                <Link href="/listings/new" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors">
                  + List Your First Tool
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Organizer */}
            {adminUser && (
              <div className="card p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Organizer</h3>
                <Link href={`/profile/${adminUser.id}`} className="flex items-center gap-3 group">
                  <Avatar src={adminUser.avatarUrl} name={adminUser.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{adminUser.name}</p>
                    <p className="text-xs text-gray-500">Group organizer</p>
                  </div>
                </Link>
              </div>
            )}

            {/* Members */}
            <div className="card p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Members ({group.memberIds.length})
              </h3>
              {memberUsers.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {memberUsers.slice(0, 12).map(member => (
                    <Link key={member.id} href={`/profile/${member.id}`} title={member.name}>
                      <Avatar src={member.avatarUrl} name={member.name} size="sm" className="border-2 border-white shadow-sm hover:opacity-80 transition-opacity" />
                    </Link>
                  ))}
                  {group.memberIds.length > 12 && (
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium border-2 border-white shadow-sm">
                      +{group.memberIds.length - 12}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No members yet.</p>
              )}
            </div>

            {/* Join CTA for non-members */}
            {!isMember && !isAdmin && (
              <div className="card p-5 text-center border-brand-200 bg-brand-50">
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="font-semibold text-gray-900 mb-1">Join This Group</h3>
                <p className="text-xs text-gray-500 mb-3">Connect with {group.memberIds.length} trusted neighbor{group.memberIds.length !== 1 ? 's' : ''} and share tools.</p>
                <GroupJoinButton groupId={group.id} isMember={false} isAdmin={false} />
              </div>
            )}

            {/* Messaging hint */}
            {(isMember || isAdmin) && (
              <div className="card p-4 text-center border-brand-100 bg-brand-50">
                <MessageSquare size={18} className="text-brand-500 mx-auto mb-2" />
                <p className="text-xs text-brand-700 font-medium">Message group members directly via the platform.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

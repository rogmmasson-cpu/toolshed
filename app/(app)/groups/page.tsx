import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { Users, Package, MapPin, Plus } from 'lucide-react'
import { getGroups, getGroupsByMember, type GroupRow } from '@/lib/mock-db/groups'

export default async function GroupsPage() {
  const { userId } = await auth()
  const [allGroups, myGroups] = await Promise.all([
    getGroups(),
    userId ? getGroupsByMember(userId) : Promise.resolve([]),
  ])

  const myGroupIds = new Set(myGroups.map(g => g.id))
  const discover = allGroups.filter(g => !myGroupIds.has(g.id))

  return (
    <div className="container-app py-8 max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Neighborhood Groups</h1>
          <p className="text-gray-500 mt-1">Join local communities to share tools with trusted neighbors.</p>
        </div>
        <Link
          href="/groups/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm rounded-xl transition-colors"
        >
          <Plus size={16} />Create Group
        </Link>
      </div>

      {myGroups.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-4">Your Groups</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {myGroups.map(g => <GroupCard key={g.id} group={g} isJoined />)}
          </div>
        </div>
      )}

      {discover.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-4">Discover Nearby</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {discover.map(g => <GroupCard key={g.id} group={g} isJoined={false} />)}
          </div>
        </div>
      )}

      {allGroups.length === 0 && myGroups.length === 0 && (
        <div className="card p-16 text-center">
          <p className="text-gray-500 mb-2">No groups yet in your area.</p>
          <p className="text-sm text-gray-400 mb-6">Be the first to start a neighborhood tool-sharing community!</p>
          <Link href="/groups/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors">
            <Plus size={16} />Create the First Group
          </Link>
        </div>
      )}
    </div>
  )
}

function GroupCard({ group, isJoined }: { group: GroupRow; isJoined: boolean }) {
  const locationParts = [group.neighborhood, group.city, group.state].filter(Boolean)
  const location = locationParts.join(', ')
  const defaultCover = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=300&fit=crop'

  return (
    <Link href={`/groups/${group.id}`} className="card-hover overflow-hidden block group">
      <div className="relative h-36 overflow-hidden">
        <img
          src={group.coverImageUrl ?? defaultCover}
          alt={group.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-sm leading-tight">{group.name}</p>
            {location && (
              <p className="text-white/70 text-xs flex items-center gap-1 mt-0.5">
                <MapPin size={10} />{location}
              </p>
            )}
          </div>
          {isJoined && (
            <span className="px-2 py-0.5 bg-forest-500 text-white text-xs font-semibold rounded-full">Joined</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{group.description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Users size={11} />{group.memberIds.length} members</span>
          {group.rules.length > 0 && (
            <span className="text-gray-400">{group.rules.length} rules</span>
          )}
        </div>
        {!isJoined && (
          <div className="mt-3 w-full py-2 bg-brand-50 text-brand-700 text-xs font-semibold rounded-lg text-center">
            + Join Group
          </div>
        )}
      </div>
    </Link>
  )
}

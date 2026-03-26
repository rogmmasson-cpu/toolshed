import Link from 'next/link'
import { Users, Package, MapPin, Plus } from 'lucide-react'

const MOCK_GROUPS = [
  {
    id: 'grp_1',
    name: 'East Austin Tool Collective',
    neighborhood: 'East Austin',
    city: 'Austin, TX',
    memberCount: 147,
    listingCount: 89,
    coverImageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=300&fit=crop',
    description: 'The original Austin tool-sharing community. 5+ years strong. We share power tools, garden equipment, and everything in between.',
    isJoined: true,
    isAdmin: false,
  },
  {
    id: 'grp_2',
    name: 'Mueller Neighborhood Share',
    neighborhood: 'Mueller',
    city: 'Austin, TX',
    memberCount: 92,
    listingCount: 54,
    coverImageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=300&fit=crop',
    description: 'Mueller community members sharing tools, kitchen equipment, outdoor gear, and more. Trusted neighbors only.',
    isJoined: true,
    isAdmin: false,
  },
  {
    id: 'grp_3',
    name: 'South Austin Makers',
    neighborhood: 'South Lamar',
    city: 'Austin, TX',
    memberCount: 213,
    listingCount: 134,
    coverImageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=300&fit=crop',
    description: 'For makers, builders, and DIYers in South Austin. Woodworking, metalworking, 3D printing, and more.',
    isJoined: false,
    isAdmin: false,
  },
  {
    id: 'grp_4',
    name: 'Hyde Park Garden Club',
    neighborhood: 'Hyde Park',
    city: 'Austin, TX',
    memberCount: 58,
    listingCount: 31,
    coverImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop',
    description: 'Sharing garden tools, seeds, raised bed materials, and expertise. Monthly meetups at Shipe Park.',
    isJoined: false,
    isAdmin: false,
  },
  {
    id: 'grp_5',
    name: 'Tarrytown Home Improvement',
    neighborhood: 'Tarrytown',
    city: 'Austin, TX',
    memberCount: 76,
    listingCount: 47,
    coverImageUrl: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=600&h=300&fit=crop',
    description: 'Home improvement tools and know-how for Tarrytown residents. From plumbing to painting.',
    isJoined: false,
    isAdmin: false,
  },
]

export default function GroupsPage() {
  const myGroups = MOCK_GROUPS.filter(g => g.isJoined)
  const discover = MOCK_GROUPS.filter(g => !g.isJoined)

  return (
    <div className="container-app py-8 max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Neighborhood Groups</h1>
          <p className="text-gray-500 mt-1">Join local communities to share tools with trusted neighbors.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl transition-colors">
          <Plus size={16}/>Create Group
        </button>
      </div>

      {myGroups.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-4">Your Groups</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {myGroups.map(g => <GroupCard key={g.id} group={g} />)}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-4">Discover Nearby</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {discover.map(g => <GroupCard key={g.id} group={g} />)}
        </div>
      </div>
    </div>
  )
}

function GroupCard({ group }: { group: typeof MOCK_GROUPS[0] }) {
  return (
    <Link href={`/groups/${group.id}`} className="card-hover overflow-hidden block group">
      <div className="relative h-36 overflow-hidden">
        <img src={group.coverImageUrl} alt={group.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-sm leading-tight">{group.name}</p>
            <p className="text-white/70 text-xs flex items-center gap-1"><MapPin size={10}/>{group.neighborhood}</p>
          </div>
          {group.isJoined && (
            <span className="px-2 py-0.5 bg-forest-500 text-white text-xs font-semibold rounded-full">Joined</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{group.description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Users size={11}/>{group.memberCount} members</span>
          <span className="flex items-center gap-1"><Package size={11}/>{group.listingCount} listings</span>
        </div>
        {!group.isJoined && (
          <button className="mt-3 w-full py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold rounded-lg transition-colors">
            + Join Group
          </button>
        )}
      </div>
    </Link>
  )
}

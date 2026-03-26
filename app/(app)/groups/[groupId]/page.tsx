import Link from 'next/link'
import { ArrowLeft, Users, Package, MapPin, Settings, MessageSquare } from 'lucide-react'
import { MOCK_USERS } from '@/lib/data/mock-users'
import { getListingById } from '@/lib/mock-db/listings'
import ListingCard from '@/components/listings/ListingCard'

const MOCK_GROUPS = [
  {
    id: 'grp_1',
    name: 'Fairhaven Tool Collective',
    neighborhood: 'Fairhaven Center',
    city: 'Fairhaven, MA',
    memberCount: 147,
    listingCount: 89,
    coverImageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&h=400&fit=crop',
    description: 'The original Fairhaven tool-sharing community. 5+ years strong. We share power tools, garden equipment, and everything in between. Monthly swap meets at the Millicent Library.',
    isJoined: true,
    isAdmin: false,
    memberIds: ['usr_current', 'usr_1', 'usr_3', 'usr_4'],
    listingIds: ['lst_1', 'lst_3', 'lst_7', 'lst_10'],
    rules: [
      'Always return items clean and in the condition received.',
      'Book through the app — no off-platform payments.',
      'Report damage immediately, do not hide it.',
      'Be responsive. Reply to messages within 24 hours.',
      'No commercial or professional use of borrowed tools.',
    ],
    createdAt: '2019-03-15',
    adminId: 'usr_1',
  },
  {
    id: 'grp_2',
    name: 'New Bedford Harbor Makers',
    neighborhood: 'Downtown New Bedford',
    city: 'New Bedford, MA',
    memberCount: 92,
    listingCount: 54,
    coverImageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=1200&h=400&fit=crop',
    description: 'New Bedford community members sharing tools, kitchen equipment, outdoor gear, and more. Trusted neighbors only.',
    isJoined: true,
    isAdmin: false,
    memberIds: ['usr_current', 'usr_2', 'usr_4'],
    listingIds: ['lst_2', 'lst_5', 'lst_9'],
    rules: [
      'New Bedford residents only — verify your address when joining.',
      'Return items within the agreed window.',
      'Communicate pickup/dropoff details in advance.',
    ],
    createdAt: '2021-06-01',
    adminId: 'usr_2',
  },
  {
    id: 'grp_3',
    name: 'South Coast DIYers',
    neighborhood: 'North Dartmouth',
    city: 'Dartmouth, MA',
    memberCount: 213,
    listingCount: 134,
    coverImageUrl: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=1200&h=400&fit=crop',
    description: 'For makers, builders, and DIYers across the South Coast. Woodworking, metalworking, 3D printing, and more.',
    isJoined: false,
    isAdmin: false,
    memberIds: ['usr_3', 'usr_5'],
    listingIds: ['lst_4', 'lst_6', 'lst_8', 'lst_11'],
    rules: [
      'Respect equipment — if you don\'t know how to use it, ask.',
      'Clean up after yourself.',
      'Share your projects in #show-and-tell.',
    ],
    createdAt: '2020-11-10',
    adminId: 'usr_3',
  },
  {
    id: 'grp_4',
    name: 'Mattapoisett Garden Club',
    neighborhood: 'Mattapoisett Village',
    city: 'Mattapoisett, MA',
    memberCount: 58,
    listingCount: 31,
    coverImageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=400&fit=crop',
    description: 'Sharing garden tools, seeds, raised bed materials, and expertise. Monthly meetups at the town pier.',
    isJoined: false,
    isAdmin: false,
    memberIds: ['usr_4', 'usr_1'],
    listingIds: ['lst_12'],
    rules: ['Garden tools only.', 'Share seeds and cuttings freely when possible.'],
    createdAt: '2022-02-20',
    adminId: 'usr_4',
  },
  {
    id: 'grp_5',
    name: 'Marion Home Improvement',
    neighborhood: 'Marion Village',
    city: 'Marion, MA',
    memberCount: 76,
    listingCount: 47,
    coverImageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&h=400&fit=crop',
    description: 'Home improvement tools and know-how for Marion residents. From plumbing to painting.',
    isJoined: false,
    isAdmin: false,
    memberIds: ['usr_5', 'usr_2'],
    listingIds: ['lst_2', 'lst_5'],
    rules: ['Marion homeowners only.', 'Rate your experience after every borrow.'],
    createdAt: '2021-09-14',
    adminId: 'usr_5',
  },
]

interface Props {
  params: Promise<{ groupId: string }>
}

export default async function GroupDetailPage({ params }: Props) {
  const { groupId } = await params
  const group = MOCK_GROUPS.find(g => g.id === groupId) ?? MOCK_GROUPS[0]
  const admin = MOCK_USERS.find(u => u.id === group.adminId)
  const members = group.memberIds.map(id => MOCK_USERS.find(u => u.id === id)).filter(Boolean)
  const listings = (await Promise.all(group.listingIds.map(id => getListingById(id)))).filter(Boolean)

  return (
    <div className="pb-12">
      {/* Cover photo */}
      <div className="relative h-52 md:h-64 overflow-hidden">
        <img src={group.coverImageUrl} alt={group.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container-app max-w-4xl">
            <Link href="/groups" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft size={14} /> All Groups
            </Link>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{group.name}</h1>
                <p className="text-white/70 text-sm flex items-center gap-1.5">
                  <MapPin size={12} />{group.neighborhood}, {group.city}
                </p>
              </div>
              {group.isJoined ? (
                <div className="flex gap-2 flex-shrink-0">
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5">
                    <Settings size={13} />Manage
                  </button>
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5">
                    <MessageSquare size={13} />Group Chat
                  </button>
                </div>
              ) : (
                <button className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors flex-shrink-0">
                  + Join Group
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-app max-w-4xl pt-6">
        {/* Stats row */}
        <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5 font-medium text-gray-700">
            <Users size={15} className="text-brand-500" />{group.memberCount} members
          </span>
          <span className="flex items-center gap-1.5 font-medium text-gray-700">
            <Package size={15} className="text-brand-500" />{group.listingCount} listings
          </span>
          <span className="text-gray-400">·</span>
          <span>Est. {new Date(group.createdAt).getFullYear()}</span>
          {group.isJoined && (
            <>
              <span className="text-gray-400">·</span>
              <span className="px-2 py-0.5 bg-forest-100 text-forest-700 text-xs font-semibold rounded-full">Member</span>
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

            {/* Listings in group */}
            {listings.length > 0 && (
              <div>
                <h2 className="font-semibold text-gray-900 mb-3">Tools in This Group</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {listings.map(listing => listing && (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
                {group.listingCount > listings.length && (
                  <p className="text-center mt-4 text-sm text-gray-500">
                    + {group.listingCount - listings.length} more listings from members
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Organizer */}
            {admin && (
              <div className="card p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Organizer</h3>
                <Link href={`/profile/${admin.id}`} className="flex items-center gap-3 group">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {admin.avatarUrl
                      ? <img src={admin.avatarUrl} alt={admin.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">{admin.name[0]}</div>
                    }
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{admin.name}</p>
                    <p className="text-xs text-gray-500">Trust: {admin.trustScore}</p>
                  </div>
                </Link>
              </div>
            )}

            {/* Members */}
            <div className="card p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Members ({group.memberCount})
              </h3>
              <div className="flex flex-wrap gap-2">
                {members.map(member => member && (
                  <Link key={member.id} href={`/profile/${member.id}`} title={member.name}>
                    {member.avatarUrl
                      ? <img src={member.avatarUrl} alt={member.name} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm hover:opacity-80 transition-opacity" />
                      : <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs border-2 border-white shadow-sm hover:opacity-80 transition-opacity">{member.name[0]}</div>
                    }
                  </Link>
                ))}
                {group.memberCount > members.length && (
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium border-2 border-white shadow-sm">
                    +{group.memberCount - members.length}
                  </div>
                )}
              </div>
            </div>

            {/* Join CTA for non-members */}
            {!group.isJoined && (
              <div className="card p-5 text-center border-brand-200 bg-brand-50">
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="font-semibold text-gray-900 mb-1">Join This Group</h3>
                <p className="text-xs text-gray-500 mb-3">Access {group.listingCount} tools from {group.memberCount} trusted neighbors.</p>
                <button className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors">
                  Request to Join
                </button>
              </div>
            )}

            {/* Share */}
            <div className="card p-4 text-center">
              <p className="text-xs text-gray-500 mb-2">Know someone who'd love this group?</p>
              <button className="text-brand-600 text-xs font-semibold hover:text-brand-700 transition-colors">
                Share Group Link →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

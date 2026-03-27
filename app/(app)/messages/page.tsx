'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { getConversations, LocalConversation, markConversationRead } from '@/lib/utils/local-messages'
import { MOCK_CONVERSATIONS } from '@/lib/data/mock-messages'
import { MOCK_USERS } from '@/lib/data/mock-users'
import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import Avatar from '@/components/ui/Avatar'
import { timeAgo, formatCents } from '@/lib/utils/formatting'

// Normalise mock conversations for display alongside localStorage ones
function buildMockDisplayConvs() {
  return MOCK_CONVERSATIONS.map(c => {
    const otherId = c.participantIds.find(id => id !== 'usr_current')!
    const other = MOCK_USERS.find(u => u.id === otherId)
    const listing = c.listingId ? MOCK_LISTINGS.find(l => l.id === c.listingId) : null
    return {
      id: c.id,
      otherName: other?.name ?? 'Unknown',
      otherAvatar: other?.avatarUrl ?? null,
      listingTitle: listing?.title ?? null,
      listingPhoto: listing?.photos[0] ?? null,
      lastMessagePreview: c.lastMessagePreview,
      lastMessageAt: c.lastMessageAt,
      unreadCount: 0,
    }
  })
}

export default function MessagesPage() {
  const [localConvs, setLocalConvs] = useState<LocalConversation[]>([])

  useEffect(() => { setLocalConvs(getConversations()) }, [])

  const localDisplay = localConvs.map(c => ({
    id: c.id,
    otherName: c.ownerUserId === 'usr_current' ? c.renterName : c.ownerName,
    otherAvatar: c.ownerUserId === 'usr_current' ? c.renterAvatar : c.ownerAvatar,
    listingTitle: c.listingTitle,
    listingPhoto: c.listingPhoto,
    lastMessagePreview: c.lastMessagePreview || 'No messages yet — say hello!',
    lastMessageAt: c.lastMessageAt,
    unreadCount: c.unreadCount,
  }))

  const mockDisplay = buildMockDisplayConvs()
  const all = [
    ...localDisplay,
    ...mockDisplay,
  ].sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())

  return (
    <div className="container-app py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageSquare size={24} className="text-brand-500" /> Messages
      </h1>

      {all.length === 0 ? (
        <div className="card p-12 text-center">
          <MessageSquare size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No messages yet.</p>
          <Link href="/browse" className="mt-4 inline-block text-brand-600 font-medium text-sm">
            Browse tools to start a conversation
          </Link>
        </div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {all.map(conv => (
            <Link
              key={conv.id}
              href={`/messages/${conv.id}`}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="relative flex-shrink-0">
                {conv.listingPhoto ? (
                  <img src={conv.listingPhoto} alt="" className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <Avatar src={conv.otherAvatar} name={conv.otherName} size="md" />
                )}
                {conv.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm text-gray-900 truncate">{conv.otherName}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(conv.lastMessageAt)}</span>
                </div>
                {conv.listingTitle && (
                  <p className="text-xs text-brand-600 font-medium truncate">{conv.listingTitle}</p>
                )}
                <p className={`text-sm truncate mt-0.5 ${conv.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  {conv.lastMessagePreview}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

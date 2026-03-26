import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { getConversationsForUser } from '@/lib/mock-db/messages'
import Avatar from '@/components/ui/Avatar'
import { timeAgo } from '@/lib/utils/formatting'
import { MOCK_USERS } from '@/lib/data/mock-users'

export default async function MessagesPage() {
  const conversations = await getConversationsForUser('usr_current')

  return (
    <div className="container-app py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageSquare size={24} className="text-brand-500" />Messages
      </h1>

      {conversations.length === 0 ? (
        <div className="card p-12 text-center">
          <MessageSquare size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No messages yet.</p>
          <Link href="/browse" className="mt-4 inline-block text-brand-600 font-medium text-sm">Browse tools to start a conversation</Link>
        </div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {conversations.map((conv) => {
            const other = conv.participants.find((p) => p.id !== 'usr_current')!
            const otherFull = MOCK_USERS.find((u) => u.id === other.id)
            return (
              <Link key={conv.id} href={`/messages/${conv.id}`} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className="relative">
                  <Avatar src={other.avatarUrl} name={other.name} size="md" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-forest-400 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-gray-900">{other.name}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(conv.lastMessageAt)}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-0.5">{conv.lastMessagePreview}</p>
                  {conv.listingId && (
                    <span className="inline-block mt-1 text-xs bg-brand-50 text-brand-600 rounded px-2 py-0.5">
                      Re: listing
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

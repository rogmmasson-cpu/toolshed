import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { getConversationsForUser } from '@/lib/mock-db/messages'
import Avatar from '@/components/ui/Avatar'
import { timeAgo } from '@/lib/utils/formatting'

export default async function MessagesPage() {
  const { userId } = await auth()
  const convs = userId ? await getConversationsForUser(userId) : []

  return (
    <div className="container-app py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageSquare size={24} className="text-brand-500" /> Messages
      </h1>

      {convs.length === 0 ? (
        <div className="card p-12 text-center">
          <MessageSquare size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No messages yet.</p>
          <Link href="/browse" className="mt-4 inline-block text-brand-600 font-medium text-sm">
            Browse tools to start a conversation
          </Link>
        </div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {convs.map(conv => {
            const other = conv.participants.find(p => p.id !== userId)
            return (
              <Link
                key={conv.id}
                href={`/messages/${conv.id}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {conv.listing?.photos[0] ? (
                    <img
                      src={conv.listing.photos[0]}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <Avatar src={other?.avatarUrl ?? null} name={other?.name ?? 'User'} size="md" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {other?.name ?? 'User'}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {timeAgo(conv.lastMessageAt)}
                    </span>
                  </div>
                  {conv.listing && (
                    <p className="text-xs text-brand-600 font-medium truncate">
                      {conv.listing.title}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 truncate mt-0.5">
                    {conv.lastMessagePreview || 'No messages yet — say hello!'}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

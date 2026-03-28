import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import { getConversationWithMessages } from '@/lib/mock-db/messages'
import ConversationThread from '@/components/messages/ConversationThread'

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>
}) {
  const { conversationId } = await params
  const { userId } = await auth()

  if (!userId) notFound()

  const { conversation, messages } = await getConversationWithMessages(conversationId, userId)

  if (!conversation) {
    return (
      <div className="container-app py-20 text-center text-gray-500">
        Conversation not found.{' '}
        <Link href="/messages" className="text-brand-600 font-medium">
          Back to messages
        </Link>
      </div>
    )
  }

  return (
    <ConversationThread
      conversation={conversation}
      initialMessages={messages}
      currentUserId={userId}
    />
  )
}

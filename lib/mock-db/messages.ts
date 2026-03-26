import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '@/lib/data/mock-messages'
import { MOCK_USERS } from '@/lib/data/mock-users'
import { Conversation, Message } from '@/lib/types'

export interface ConversationWithParticipants extends Conversation {
  participants: Array<{ id: string; name: string; avatarUrl: string | null }>
}

export async function getConversationsForUser(userId: string): Promise<ConversationWithParticipants[]> {
  return MOCK_CONVERSATIONS
    .filter((c) => c.participantIds.includes(userId))
    .map((c) => ({
      ...c,
      participants: c.participantIds.map((pid) => {
        const u = MOCK_USERS.find((u) => u.id === pid)!
        return { id: u.id, name: u.name, avatarUrl: u.avatarUrl }
      }),
    }))
    .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
}

export async function getMessagesForConversation(conversationId: string): Promise<Message[]> {
  return MOCK_MESSAGES
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

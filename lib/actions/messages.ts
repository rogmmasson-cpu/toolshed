'use server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

async function upsertCurrentUser() {
  const [{ userId }, clerkUser] = await Promise.all([auth(), currentUser()])
  if (!userId || !clerkUser) throw new Error('Not authenticated')

  await db.user.upsert({
    where: { id: userId },
    update: {
      name: clerkUser.fullName ?? clerkUser.username ?? 'User',
      avatarUrl: clerkUser.imageUrl ?? null,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? '',
    },
    create: {
      id: userId,
      name: clerkUser.fullName ?? clerkUser.username ?? 'User',
      email: clerkUser.emailAddresses[0]?.emailAddress ?? '',
      avatarUrl: clerkUser.imageUrl ?? null,
    },
  })

  return userId
}

export async function getOrCreateConversation(
  listingId: string,
  ownerId: string,
): Promise<string> {
  const renterId = await upsertCurrentUser()

  if (renterId === ownerId) throw new Error('Cannot message yourself')

  // Find existing conversation between these two users for this listing
  const existing = await db.conversation.findFirst({
    where: {
      listingId,
      AND: [
        { participantIds: { has: renterId } },
        { participantIds: { has: ownerId } },
      ],
    },
  })

  if (existing) return existing.id

  const conv = await db.conversation.create({
    data: {
      participantIds: [renterId, ownerId],
      listingId,
      lastMessageAt: new Date(),
      lastMessagePreview: '',
    },
  })

  return conv.id
}

export async function fetchMessages(conversationId: string, since: string): Promise<{ id: string; conversationId: string; senderId: string; senderName: string; senderAvatar: string | null; content: string; createdAt: string }[]> {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const conv = await db.conversation.findUnique({ where: { id: conversationId } })
  if (!conv || !conv.participantIds.includes(userId)) throw new Error('Unauthorized')

  const messages = await db.message.findMany({
    where: { conversationId, createdAt: { gt: new Date(since) } },
    orderBy: { createdAt: 'asc' },
    include: { sender: { select: { name: true, avatarUrl: true } } },
  })

  return messages.map(m => ({
    id: m.id,
    conversationId: m.conversationId,
    senderId: m.senderId,
    senderName: m.sender.name,
    senderAvatar: m.sender.avatarUrl,
    content: m.content,
    createdAt: m.createdAt.toISOString(),
  }))
}

export async function sendMessage(conversationId: string, content: string): Promise<void> {
  const senderId = await upsertCurrentUser()

  if (!content.trim()) throw new Error('Message cannot be empty')

  const conv = await db.conversation.findUnique({ where: { id: conversationId } })
  if (!conv || !conv.participantIds.includes(senderId)) {
    throw new Error('Unauthorized')
  }

  await db.message.create({
    data: {
      conversationId,
      senderId,
      content: content.trim(),
      attachments: [],
    },
  })

  await db.conversation.update({
    where: { id: conversationId },
    data: {
      lastMessageAt: new Date(),
      lastMessagePreview: content.trim().slice(0, 100),
    },
  })
}

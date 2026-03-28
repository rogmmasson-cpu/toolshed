import { db } from '@/lib/db'

export interface ConversationWithParticipants {
  id: string
  participantIds: string[]
  listingId: string | null
  bookingId: string | null
  lastMessageAt: string
  lastMessagePreview: string
  participants: Array<{ id: string; name: string; avatarUrl: string | null }>
  listing: {
    id: string
    title: string
    photos: string[]
    dailyRate: number
    locationNeighborhood: string
    locationCity: string
  } | null
}

export interface MessageRow {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderAvatar: string | null
  content: string
  createdAt: string
}

export async function getConversationsForUser(userId: string): Promise<ConversationWithParticipants[]> {
  const convs = await db.conversation.findMany({
    where: { participantIds: { has: userId } },
    orderBy: { lastMessageAt: 'desc' },
  })

  if (convs.length === 0) return []

  const allParticipantIds = [...new Set(convs.flatMap(c => c.participantIds))]
  const listingIds = convs.map(c => c.listingId).filter(Boolean) as string[]

  const [users, listings] = await Promise.all([
    db.user.findMany({ where: { id: { in: allParticipantIds } } }),
    listingIds.length > 0
      ? db.listing.findMany({ where: { id: { in: listingIds } } })
      : Promise.resolve([]),
  ])

  const userMap = Object.fromEntries(users.map(u => [u.id, u]))
  const listingMap = Object.fromEntries(listings.map(l => [l.id, l]))

  return convs.map(c => ({
    id: c.id,
    participantIds: c.participantIds,
    listingId: c.listingId,
    bookingId: c.bookingId,
    lastMessageAt: c.lastMessageAt.toISOString(),
    lastMessagePreview: c.lastMessagePreview,
    participants: c.participantIds.map(pid => ({
      id: pid,
      name: userMap[pid]?.name ?? 'Unknown',
      avatarUrl: userMap[pid]?.avatarUrl ?? null,
    })),
    listing: c.listingId && listingMap[c.listingId]
      ? {
          id: c.listingId,
          title: listingMap[c.listingId].title,
          photos: listingMap[c.listingId].photos,
          dailyRate: listingMap[c.listingId].dailyRate,
          locationNeighborhood: listingMap[c.listingId].locationNeighborhood,
          locationCity: listingMap[c.listingId].locationCity,
        }
      : null,
  }))
}

export async function getConversationWithMessages(
  conversationId: string,
  currentUserId: string,
): Promise<{ conversation: ConversationWithParticipants | null; messages: MessageRow[] }> {
  const conv = await db.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
        include: { sender: true },
      },
    },
  })

  if (!conv || !conv.participantIds.includes(currentUserId)) {
    return { conversation: null, messages: [] }
  }

  const users = await db.user.findMany({
    where: { id: { in: conv.participantIds } },
  })
  const userMap = Object.fromEntries(users.map(u => [u.id, u]))

  let listing: ConversationWithParticipants['listing'] = null
  if (conv.listingId) {
    const l = await db.listing.findUnique({ where: { id: conv.listingId } })
    if (l) {
      listing = {
        id: l.id,
        title: l.title,
        photos: l.photos,
        dailyRate: l.dailyRate,
        locationNeighborhood: l.locationNeighborhood,
        locationCity: l.locationCity,
      }
    }
  }

  const conversation: ConversationWithParticipants = {
    id: conv.id,
    participantIds: conv.participantIds,
    listingId: conv.listingId,
    bookingId: conv.bookingId,
    lastMessageAt: conv.lastMessageAt.toISOString(),
    lastMessagePreview: conv.lastMessagePreview,
    participants: conv.participantIds.map(pid => ({
      id: pid,
      name: userMap[pid]?.name ?? 'Unknown',
      avatarUrl: userMap[pid]?.avatarUrl ?? null,
    })),
    listing,
  }

  const messages: MessageRow[] = conv.messages.map(m => ({
    id: m.id,
    conversationId: m.conversationId,
    senderId: m.senderId,
    senderName: m.sender.name,
    senderAvatar: m.sender.avatarUrl ?? null,
    content: m.content,
    createdAt: m.createdAt.toISOString(),
  }))

  return { conversation, messages }
}

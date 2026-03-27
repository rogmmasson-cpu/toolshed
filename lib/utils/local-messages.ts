import { Message, Conversation } from '@/lib/types'

// Denormalized conversation stored in localStorage — carries display info so
// we don't need to re-fetch listings/users on the messages page.
export interface LocalConversation extends Omit<Conversation, 'participantIds'> {
  participantIds: string[]
  listingTitle: string
  listingPhoto: string
  listingDailyRate: number
  listingNeighborhood: string
  listingCity: string
  ownerUserId: string
  ownerName: string
  ownerAvatar: string | null
  renterUserId: string
  renterName: string
  renterAvatar: string | null
  messages: LocalMessage[]
  unreadCount: number // unread by current user (usr_current)
}

export interface LocalMessage extends Omit<Message, 'attachments'> {
  senderName: string
}

const CONV_KEY = 'toolshed_conversations'

export function getConversations(): LocalConversation[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(CONV_KEY) || '[]') } catch { return [] }
}

function saveConversations(convs: LocalConversation[]) {
  localStorage.setItem(CONV_KEY, JSON.stringify(convs))
}

export function getConversationById(id: string): LocalConversation | null {
  return getConversations().find(c => c.id === id) ?? null
}

export function getOrCreateConversation(params: {
  listingId: string
  listingTitle: string
  listingPhoto: string
  listingDailyRate: number
  listingNeighborhood: string
  listingCity: string
  ownerUserId: string
  ownerName: string
  ownerAvatar: string | null
  renterUserId: string
  renterName: string
  renterAvatar: string | null
}): LocalConversation {
  const convs = getConversations()
  const existing = convs.find(
    c => c.listingId === params.listingId &&
         c.ownerUserId === params.ownerUserId &&
         c.renterUserId === params.renterUserId
  )
  if (existing) return existing

  const now = new Date().toISOString()
  const conv: LocalConversation = {
    id: `conv_${Date.now()}`,
    participantIds: [params.ownerUserId, params.renterUserId],
    listingId: params.listingId,
    bookingId: null,
    lastMessageAt: now,
    lastMessagePreview: '',
    listingTitle: params.listingTitle,
    listingPhoto: params.listingPhoto,
    listingDailyRate: params.listingDailyRate,
    listingNeighborhood: params.listingNeighborhood,
    listingCity: params.listingCity,
    ownerUserId: params.ownerUserId,
    ownerName: params.ownerName,
    ownerAvatar: params.ownerAvatar,
    renterUserId: params.renterUserId,
    renterName: params.renterName,
    renterAvatar: params.renterAvatar,
    messages: [],
    unreadCount: 0,
  }
  saveConversations([conv, ...convs])
  return conv
}

export function sendMessage(convId: string, senderId: string, senderName: string, text: string): LocalMessage {
  const convs = getConversations()
  const now = new Date().toISOString()
  const msg: LocalMessage = {
    id: `msg_${Date.now()}`,
    conversationId: convId,
    senderId,
    senderName,
    content: text,
    readAt: null,
    createdAt: now,
  }
  const updated = convs.map(c => {
    if (c.id !== convId) return c
    return {
      ...c,
      messages: [...c.messages, msg],
      lastMessagePreview: text.slice(0, 80),
      lastMessageAt: now,
      unreadCount: senderId === 'usr_current' ? c.unreadCount : c.unreadCount + 1,
    }
  })
  saveConversations(updated)
  return msg
}

export function markConversationRead(convId: string) {
  const convs = getConversations()
  saveConversations(convs.map(c => c.id === convId ? { ...c, unreadCount: 0 } : c))
}

export function getTotalUnread(): number {
  return getConversations().reduce((sum, c) => sum + c.unreadCount, 0)
}

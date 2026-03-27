'use client'
import { useParams } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, Package, Lock } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import {
  getConversationById,
  sendMessage as localSend,
  markConversationRead,
  LocalConversation,
  LocalMessage,
} from '@/lib/utils/local-messages'
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '@/lib/data/mock-messages'
import { MOCK_USERS, CURRENT_USER_ID } from '@/lib/data/mock-users'
import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import { timeAgo, formatCents, formatLocation } from '@/lib/utils/formatting'
import { cn } from '@/lib/utils/cn'
import { Message } from '@/lib/types'

type DisplayMessage = { id: string; senderId: string; content: string; createdAt: string; senderName: string }

export default function ConversationPage() {
  const { conversationId } = useParams<{ conversationId: string }>()
  const [input, setInput] = useState('')
  const [localConv, setLocalConv] = useState<LocalConversation | null>(null)
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  const isLocal = conversationId.startsWith('conv_')

  // Load local conversation
  useEffect(() => {
    if (!isLocal) return
    const conv = getConversationById(conversationId)
    setLocalConv(conv)
    setLocalMessages(conv?.messages ?? [])
    markConversationRead(conversationId)
  }, [conversationId, isLocal])

  // Mock conversation data
  const mockConv = !isLocal ? MOCK_CONVERSATIONS.find(c => c.id === conversationId) : null
  const mockOtherId = mockConv?.participantIds.find(id => id !== CURRENT_USER_ID)
  const mockOther = MOCK_USERS.find(u => u.id === mockOtherId)
  const mockListing = mockConv?.listingId ? MOCK_LISTINGS.find(l => l.id === mockConv.listingId) : null
  const [mockMessages, setMockMessages] = useState<Message[]>(() =>
    !isLocal
      ? MOCK_MESSAGES.filter(m => m.conversationId === conversationId)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      : []
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [localMessages, mockMessages])

  // Derived display values
  const otherName = isLocal
    ? (localConv?.ownerUserId === 'usr_current' ? localConv?.renterName : localConv?.ownerName) ?? ''
    : mockOther?.name ?? 'Unknown'
  const otherAvatar = isLocal
    ? (localConv?.ownerUserId === 'usr_current' ? localConv?.renterAvatar : localConv?.ownerAvatar) ?? null
    : mockOther?.avatarUrl ?? null
  const listingTitle = isLocal ? localConv?.listingTitle : mockListing?.title
  const listingPhoto = isLocal ? localConv?.listingPhoto : mockListing?.photos[0]
  const listingRate = isLocal ? localConv?.listingDailyRate : mockListing?.pricing.dailyRate
  const listingId = isLocal ? localConv?.listingId : mockConv?.listingId
  const listingLocation = isLocal
    ? [localConv?.listingNeighborhood, localConv?.listingCity].filter(Boolean).join(', ')
    : mockListing ? formatLocation(mockListing.location.neighborhood, mockListing.location.city) : ''

  const displayMessages: DisplayMessage[] = isLocal
    ? localMessages.map(m => ({ id: m.id, senderId: m.senderId, content: m.content, createdAt: m.createdAt, senderName: m.senderName }))
    : mockMessages.map(m => {
        const sender = MOCK_USERS.find(u => u.id === m.senderId)
        return { id: m.id, senderId: m.senderId, content: m.content, createdAt: m.createdAt, senderName: sender?.name ?? 'Unknown' }
      })

  function send() {
    if (!input.trim()) return
    const text = input.trim()
    setInput('')
    if (isLocal) {
      localSend(conversationId, 'usr_current', 'You', text)
      const conv = getConversationById(conversationId)
      setLocalMessages(conv?.messages ?? [])
    } else {
      const msg: Message = {
        id: `msg_new_${Date.now()}`,
        conversationId,
        senderId: CURRENT_USER_ID,
        content: text,
        attachments: [],
        readAt: null,
        createdAt: new Date().toISOString(),
      }
      setMockMessages(prev => [...prev, msg])
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  if (isLocal && !localConv) {
    return (
      <div className="container-app py-20 text-center text-gray-500">
        Conversation not found.{' '}
        <Link href="/messages" className="text-brand-600 font-medium">Back to messages</Link>
      </div>
    )
  }
  if (!isLocal && !mockConv) {
    return (
      <div className="container-app py-20 text-center text-gray-500">
        Conversation not found.{' '}
        <Link href="/messages" className="text-brand-600 font-medium">Back to messages</Link>
      </div>
    )
  }

  return (
    <div className="container-app py-6 max-w-2xl flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
        <Link href="/messages" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <Avatar src={otherAvatar} name={otherName} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 leading-tight">{otherName}</p>
          <p className="text-xs text-gray-400">ToolShed member</p>
        </div>
      </div>

      {/* Listing context banner */}
      {listingTitle && (
        <div className="flex items-center gap-3 p-3 bg-brand-50 border border-brand-100 rounded-xl mb-3 flex-shrink-0">
          {listingPhoto && (
            <img src={listingPhoto} alt="" className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-brand-700 truncate">{listingTitle}</p>
            <p className="text-xs text-brand-600">
              {listingRate ? `${formatCents(listingRate)}/day` : ''}
              {listingLocation ? ` · ${listingLocation}` : ''}
            </p>
          </div>
          {listingId && (
            <Link href={`/listings/${listingId}`} className="flex-shrink-0 p-1.5 hover:bg-brand-100 rounded-lg transition-colors" title="View listing">
              <Package size={14} className="text-brand-600" />
            </Link>
          )}
        </div>
      )}

      {/* Location privacy note */}
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2 mb-3 flex-shrink-0">
        <Lock size={11} className="flex-shrink-0" />
        Exact pickup address is shared after both parties confirm the booking.
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
        {displayMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <p className="text-gray-400 text-sm">No messages yet.</p>
            <p className="text-gray-400 text-xs mt-1">Say hello to get started!</p>
          </div>
        ) : (
          displayMessages.map((msg, idx) => {
            const isMe = msg.senderId === 'usr_current' || msg.senderId === CURRENT_USER_ID
            const prevMsg = displayMessages[idx - 1]
            const showAvatar = !isMe && (idx === 0 || prevMsg?.senderId !== msg.senderId)
            return (
              <div key={msg.id} className={cn('flex items-end gap-2', isMe ? 'justify-end' : 'justify-start')}>
                {!isMe && (
                  <div className="w-7 flex-shrink-0">
                    {showAvatar && <Avatar src={otherAvatar} name={otherName} size="xs" />}
                  </div>
                )}
                <div className={cn('max-w-[75%] flex flex-col gap-0.5', isMe ? 'items-end' : 'items-start')}>
                  <div className={cn(
                    'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                    isMe
                      ? 'bg-brand-500 text-white rounded-br-md'
                      : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm'
                  )}>
                    {msg.content}
                  </div>
                  <span className="text-xs text-gray-400 px-1">{timeAgo(msg.createdAt)}</span>
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 flex items-end gap-2 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
        <textarea
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Message ${otherName}…`}
          className="flex-1 resize-none text-sm text-gray-900 outline-none placeholder-gray-400 py-2 max-h-28 overflow-y-auto bg-transparent"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className={cn(
            'flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors',
            input.trim() ? 'bg-brand-500 hover:bg-brand-600 text-white' : 'bg-gray-100 text-gray-400'
          )}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  )
}

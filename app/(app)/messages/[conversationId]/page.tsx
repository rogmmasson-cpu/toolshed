'use client'
import { useParams } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, Package, Paperclip, Info } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '@/lib/data/mock-messages'
import { MOCK_USERS, CURRENT_USER_ID } from '@/lib/data/mock-users'
import { MOCK_LISTINGS } from '@/lib/data/mock-listings'
import { timeAgo, formatCents } from '@/lib/utils/formatting'
import { cn } from '@/lib/utils/cn'
import { Message } from '@/lib/types'

export default function ConversationPage() {
  const { conversationId } = useParams<{ conversationId: string }>()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(() =>
    MOCK_MESSAGES
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  )
  const bottomRef = useRef<HTMLDivElement>(null)

  const conversation = MOCK_CONVERSATIONS.find(c => c.id === conversationId)
  const otherId = conversation?.participantIds.find(id => id !== CURRENT_USER_ID)
  const other = MOCK_USERS.find(u => u.id === otherId)
  const listing = conversation?.listingId ? MOCK_LISTINGS.find(l => l.id === conversation.listingId) : null

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function send() {
    if (!input.trim()) return
    const msg: Message = {
      id: `msg_new_${Date.now()}`,
      conversationId: conversationId,
      senderId: CURRENT_USER_ID,
      content: input.trim(),
      attachments: [],
      readAt: null,
      createdAt: new Date().toISOString(),
    }
    setMessages(prev => [...prev, msg])
    setInput('')
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  if (!conversation || !other) {
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
        <Avatar src={other.avatarUrl} name={other.name} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 leading-tight">{other.name}</p>
          <p className="text-xs text-forest-600">● Online</p>
        </div>
        {other && (
          <Link href={`/profile/${other.id}`} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
            <Info size={16} />
          </Link>
        )}
      </div>

      {/* Listing context banner */}
      {listing && (
        <div className="flex items-center gap-3 p-3 bg-brand-50 border border-brand-100 rounded-xl mb-4 flex-shrink-0">
          <img src={listing.photos[0]} alt="" className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-brand-700 truncate">{listing.title}</p>
            <p className="text-xs text-brand-600">{formatCents(listing.pricing.dailyRate)}/day</p>
          </div>
          <Link href={`/listings/${listing.id}`} className="flex-shrink-0 p-1.5 hover:bg-brand-100 rounded-lg transition-colors">
            <Package size={14} className="text-brand-600" />
          </Link>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <p className="text-gray-400 text-sm">No messages yet.</p>
            <p className="text-gray-400 text-xs mt-1">Send a message to start the conversation.</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === CURRENT_USER_ID
            const sender = MOCK_USERS.find(u => u.id === msg.senderId)
            const prevMsg = messages[idx - 1]
            const showAvatar = !isMe && (idx === 0 || prevMsg?.senderId !== msg.senderId)

            return (
              <div key={msg.id} className={cn('flex items-end gap-2', isMe ? 'justify-end' : 'justify-start')}>
                {!isMe && (
                  <div className="w-7 flex-shrink-0">
                    {showAvatar && <Avatar src={sender?.avatarUrl} name={sender?.name ?? '?'} size="xs" />}
                  </div>
                )}
                <div className={cn('max-w-[75%] flex flex-col gap-0.5', isMe ? 'items-end' : 'items-start')}>
                  <div
                    className={cn(
                      'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                      isMe
                        ? 'bg-brand-500 text-white rounded-br-md'
                        : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm'
                    )}
                  >
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
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
          <Paperclip size={16} />
        </button>
        <textarea
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Message ${other.name}…`}
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

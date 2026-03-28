'use client'
import { useState, useRef, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Send, Package, Lock } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import { sendMessage } from '@/lib/actions/messages'
import type { ConversationWithParticipants, MessageRow } from '@/lib/mock-db/messages'
import { timeAgo, formatCents } from '@/lib/utils/formatting'
import { cn } from '@/lib/utils/cn'

interface Props {
  conversation: ConversationWithParticipants
  initialMessages: MessageRow[]
  currentUserId: string
}

export default function ConversationThread({ conversation, initialMessages, currentUserId }: Props) {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [optimisticMessages, setOptimisticMessages] = useState<MessageRow[]>(initialMessages)
  const [isPending, startTransition] = useTransition()
  const bottomRef = useRef<HTMLDivElement>(null)

  const other = conversation.participants.find(p => p.id !== currentUserId)
  const listing = conversation.listing

  // Sync when server refreshes
  useEffect(() => {
    setOptimisticMessages(initialMessages)
  }, [initialMessages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [optimisticMessages])

  function send() {
    const text = input.trim()
    if (!text) return
    setInput('')

    // Optimistic message
    const tempMsg: MessageRow = {
      id: `temp_${Date.now()}`,
      conversationId: conversation.id,
      senderId: currentUserId,
      senderName: 'You',
      senderAvatar: null,
      content: text,
      createdAt: new Date().toISOString(),
    }
    setOptimisticMessages(prev => [...prev, tempMsg])

    startTransition(async () => {
      await sendMessage(conversation.id, text)
      router.refresh()
    })
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="container-app py-6 max-w-2xl flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
        <Link href="/messages" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <Avatar src={other?.avatarUrl ?? null} name={other?.name ?? 'User'} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 leading-tight">{other?.name ?? 'User'}</p>
          <p className="text-xs text-gray-400">ToolShed member</p>
        </div>
      </div>

      {/* Listing context banner */}
      {listing && (
        <div className="flex items-center gap-3 p-3 bg-brand-50 border border-brand-100 rounded-xl mb-3 flex-shrink-0">
          {listing.photos[0] && (
            <img src={listing.photos[0]} alt="" className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-brand-700 truncate">{listing.title}</p>
            <p className="text-xs text-brand-600">
              {formatCents(listing.dailyRate)}/day
              {listing.locationCity
                ? ` · ${[listing.locationNeighborhood, listing.locationCity].filter(Boolean).join(', ')}`
                : ''}
            </p>
          </div>
          <Link
            href={`/listings/${listing.id}`}
            className="flex-shrink-0 p-1.5 hover:bg-brand-100 rounded-lg transition-colors"
            title="View listing"
          >
            <Package size={14} className="text-brand-600" />
          </Link>
        </div>
      )}

      {/* Privacy note */}
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2 mb-3 flex-shrink-0">
        <Lock size={11} className="flex-shrink-0" />
        Exact pickup address is shared after both parties confirm the booking.
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
        {optimisticMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <p className="text-gray-400 text-sm">No messages yet.</p>
            <p className="text-gray-400 text-xs mt-1">Say hello to get started!</p>
          </div>
        ) : (
          optimisticMessages.map((msg, idx) => {
            const isMe = msg.senderId === currentUserId
            const prevMsg = optimisticMessages[idx - 1]
            const showAvatar = !isMe && (idx === 0 || prevMsg?.senderId !== msg.senderId)
            return (
              <div key={msg.id} className={cn('flex items-end gap-2', isMe ? 'justify-end' : 'justify-start')}>
                {!isMe && (
                  <div className="w-7 flex-shrink-0">
                    {showAvatar && (
                      <Avatar src={other?.avatarUrl ?? null} name={other?.name ?? 'User'} size="xs" />
                    )}
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
          placeholder={`Message ${other?.name?.split(' ')[0] ?? 'them'}…`}
          className="flex-1 resize-none text-sm text-gray-900 outline-none placeholder-gray-400 py-2 max-h-28 overflow-y-auto bg-transparent"
        />
        <button
          onClick={send}
          disabled={!input.trim() || isPending}
          className={cn(
            'flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors',
            input.trim() && !isPending
              ? 'bg-brand-500 hover:bg-brand-600 text-white'
              : 'bg-gray-100 text-gray-400'
          )}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  )
}

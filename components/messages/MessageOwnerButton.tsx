'use client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { MessageSquare } from 'lucide-react'
import { getOrCreateConversation } from '@/lib/actions/messages'

interface Props {
  listingId: string
  ownerId: string
  ownerName: string
  currentUserId: string | null
}

export default function MessageOwnerButton({ listingId, ownerId, ownerName, currentUserId }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Hide if viewer is the owner or not logged in
  if (!currentUserId || currentUserId === ownerId) return null

  function handleClick() {
    startTransition(async () => {
      const convId = await getOrCreateConversation(listingId, ownerId)
      router.push(`/messages/${convId}`)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-brand-300 hover:bg-brand-50 text-brand-600 font-semibold text-sm rounded-xl transition-colors disabled:opacity-60"
    >
      <MessageSquare size={15} />
      {isPending ? 'Opening…' : `Message ${ownerName.split(' ')[0]}`}
    </button>
  )
}

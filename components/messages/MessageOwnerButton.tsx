'use client'
import { useRouter } from 'next/navigation'
import { MessageSquare } from 'lucide-react'
import { getOrCreateConversation } from '@/lib/utils/local-messages'

interface Props {
  listingId: string
  listingTitle: string
  listingPhoto: string
  listingDailyRate: number
  listingNeighborhood: string
  listingCity: string
  ownerUserId: string
  ownerName: string
  ownerAvatar: string | null
}

export default function MessageOwnerButton({
  listingId, listingTitle, listingPhoto, listingDailyRate,
  listingNeighborhood, listingCity, ownerUserId, ownerName, ownerAvatar,
}: Props) {
  const router = useRouter()

  // Don't show if the current user is the owner
  if (ownerUserId === 'usr_current') return null

  function handleClick() {
    const conv = getOrCreateConversation({
      listingId,
      listingTitle,
      listingPhoto,
      listingDailyRate,
      listingNeighborhood,
      listingCity,
      ownerUserId,
      ownerName,
      ownerAvatar,
      renterUserId: 'usr_current',
      renterName: 'You',
      renterAvatar: null,
    })
    router.push(`/messages/${conv.id}`)
  }

  return (
    <button
      onClick={handleClick}
      className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-brand-300 hover:bg-brand-50 text-brand-600 font-semibold text-sm rounded-xl transition-colors"
    >
      <MessageSquare size={15} />
      Message {ownerName.split(' ')[0]}
    </button>
  )
}

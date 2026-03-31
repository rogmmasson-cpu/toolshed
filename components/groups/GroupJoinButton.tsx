'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, UserMinus, UserPlus } from 'lucide-react'
import { joinGroup, leaveGroup } from '@/lib/actions/groups'

export default function GroupJoinButton({
  groupId,
  isMember,
  isAdmin,
}: {
  groupId: string
  isMember: boolean
  isAdmin: boolean
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [optimistic, setOptimistic] = useState(isMember)

  function toggle() {
    const next = !optimistic
    setOptimistic(next)
    startTransition(async () => {
      try {
        if (next) {
          await joinGroup(groupId)
        } else {
          await leaveGroup(groupId)
        }
        router.refresh()
      } catch (e) {
        setOptimistic(optimistic)
        alert(e instanceof Error ? e.message : 'Something went wrong')
      }
    })
  }

  if (isAdmin) return null

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`px-5 py-2.5 font-semibold rounded-xl text-sm transition-colors flex-shrink-0 flex items-center gap-2 ${
        optimistic
          ? 'bg-white/10 hover:bg-white/20 border border-white/30 text-white'
          : 'bg-brand-500 hover:bg-brand-600 text-white'
      }`}
    >
      {isPending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : optimistic ? (
        <UserMinus size={14} />
      ) : (
        <UserPlus size={14} />
      )}
      {optimistic ? 'Leave Group' : 'Join Group'}
    </button>
  )
}

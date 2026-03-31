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

export interface CreateGroupInput {
  name: string
  description: string
  city: string
  state: string
  neighborhood?: string
  coverImageUrl?: string
  rules: string[]
  isPrivate: boolean
}

export async function createGroup(input: CreateGroupInput): Promise<string> {
  const userId = await upsertCurrentUser()

  const group = await db.group.create({
    data: {
      name: input.name.trim(),
      description: input.description.trim(),
      city: input.city.trim(),
      state: input.state.trim(),
      neighborhood: input.neighborhood?.trim() ?? '',
      coverImageUrl: input.coverImageUrl?.trim() || null,
      adminId: userId,
      memberIds: [userId],
      rules: input.rules.filter(r => r.trim()),
      isPrivate: input.isPrivate,
    },
  })

  return group.id
}

export async function joinGroup(groupId: string): Promise<void> {
  const userId = await upsertCurrentUser()

  const group = await db.group.findUnique({ where: { id: groupId } })
  if (!group) throw new Error('Group not found')
  if (group.memberIds.includes(userId)) return // already a member

  await db.group.update({
    where: { id: groupId },
    data: { memberIds: { push: userId } },
  })
}

export async function leaveGroup(groupId: string): Promise<void> {
  const userId = await upsertCurrentUser()

  const group = await db.group.findUnique({ where: { id: groupId } })
  if (!group) throw new Error('Group not found')
  if (group.adminId === userId) throw new Error('Group admin cannot leave. Transfer admin or delete the group.')

  await db.group.update({
    where: { id: groupId },
    data: { memberIds: group.memberIds.filter(id => id !== userId) },
  })
}

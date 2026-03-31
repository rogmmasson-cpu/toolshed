import { db } from '@/lib/db'
import type { Group as PrismaGroup } from '@prisma/client'

export type GroupRow = {
  id: string
  name: string
  description: string
  neighborhood: string
  city: string
  state: string
  coverImageUrl: string | null
  adminId: string
  memberIds: string[]
  rules: string[]
  isPrivate: boolean
  createdAt: string
  updatedAt: string
}

function toGroup(g: PrismaGroup): GroupRow {
  return {
    id: g.id,
    name: g.name,
    description: g.description,
    neighborhood: g.neighborhood,
    city: g.city,
    state: g.state,
    coverImageUrl: g.coverImageUrl,
    adminId: g.adminId,
    memberIds: g.memberIds,
    rules: g.rules,
    isPrivate: g.isPrivate,
    createdAt: g.createdAt.toISOString(),
    updatedAt: g.updatedAt.toISOString(),
  }
}

export async function getGroups(): Promise<GroupRow[]> {
  const rows = await db.group.findMany({
    where: { isPrivate: false },
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toGroup)
}

export async function getGroupById(id: string): Promise<GroupRow | null> {
  const row = await db.group.findUnique({ where: { id } })
  return row ? toGroup(row) : null
}

export async function getGroupsByMember(userId: string): Promise<GroupRow[]> {
  const rows = await db.group.findMany({
    where: { memberIds: { has: userId } },
    orderBy: { createdAt: 'desc' },
  })
  return rows.map(toGroup)
}

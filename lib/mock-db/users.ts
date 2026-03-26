import { MOCK_USERS } from '@/lib/data/mock-users'
import { User } from '@/lib/types'

export async function getUserById(id: string): Promise<User | null> {
  return MOCK_USERS.find((u) => u.id === id) ?? null
}

export async function getCurrentUser(): Promise<User> {
  return MOCK_USERS.find((u) => u.id === 'usr_current')!
}

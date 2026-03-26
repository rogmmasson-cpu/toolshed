import { addDays, format, eachDayOfInterval, parseISO, isWithinInterval } from 'date-fns'

export function isDateBlocked(date: Date, blockedDates: string[]): boolean {
  const iso = format(date, 'yyyy-MM-dd')
  return blockedDates.includes(iso)
}

export function hasConflict(
  start: Date,
  end: Date,
  blockedDates: string[]
): boolean {
  const days = eachDayOfInterval({ start, end })
  return days.some((d) => isDateBlocked(d, blockedDates))
}

export function calcDaysBetween(start: string, end: string): number {
  const s = parseISO(start)
  const e = parseISO(end)
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
}

export function formatIso(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function nextAvailableDate(blockedDates: string[], from: Date = new Date()): Date {
  let candidate = from
  while (isDateBlocked(candidate, blockedDates)) {
    candidate = addDays(candidate, 1)
  }
  return candidate
}

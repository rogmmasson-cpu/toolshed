import { Dispute, DisputeEvent, DisputeReason, DisputeResolution, DisputeStatus } from '@/lib/types'

const KEY = 'toolshed_disputes'

export function getDisputes(): Dispute[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as Dispute[]
  } catch {
    return []
  }
}

export function getDisputeById(id: string): Dispute | null {
  return getDisputes().find(d => d.id === id) ?? null
}

export function getDisputeForBooking(bookingId: string): Dispute | null {
  return getDisputes().find(d => d.bookingId === bookingId) ?? null
}

function save(disputes: Dispute[]) {
  localStorage.setItem(KEY, JSON.stringify(disputes))
}

export function createDispute(params: {
  bookingId: string
  listingId: string
  renterId: string
  ownerId: string
  filedByRole: 'renter' | 'owner'
  filedByName: string
  reason: DisputeReason
  description: string
  depositClaimAmount: number | null
}): Dispute {
  const now = new Date().toISOString()
  const dispute: Dispute = {
    id: `dsp_local_${Date.now()}`,
    bookingId: params.bookingId,
    listingId: params.listingId,
    renterId: params.renterId,
    ownerId: params.ownerId,
    filedByRole: params.filedByRole,
    reason: params.reason,
    status: 'open',
    resolution: null,
    resolutionNote: null,
    depositClaimAmount: params.depositClaimAmount,
    timeline: [
      {
        id: `ev_${Date.now()}`,
        type: 'filed',
        authorRole: params.filedByRole,
        authorName: params.filedByName,
        content: params.description,
        createdAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
    resolvedAt: null,
  }
  const all = getDisputes()
  all.unshift(dispute)
  save(all)
  return dispute
}

export function addDisputeResponse(
  disputeId: string,
  authorRole: 'renter' | 'owner',
  authorName: string,
  content: string,
): void {
  const all = getDisputes()
  const idx = all.findIndex(d => d.id === disputeId)
  if (idx === -1) return
  const now = new Date().toISOString()
  const event: DisputeEvent = {
    id: `ev_${Date.now()}`,
    type: 'response',
    authorRole,
    authorName,
    content,
    createdAt: now,
  }
  all[idx].timeline.push(event)
  all[idx].status = 'under_review'
  all[idx].updatedAt = now
  // Simulate an automatic admin acknowledgement
  all[idx].timeline.push({
    id: `ev_admin_${Date.now()}`,
    type: 'admin_note',
    authorRole: 'admin',
    authorName: 'ToolShed Support',
    content: 'Thank you for your response. A ToolShed mediator has been assigned and will review this case within 1–2 business days.',
    createdAt: now,
  })
  save(all)
}

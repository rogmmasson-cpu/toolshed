// ── ENUMS ──────────────────────────────────────────────────────────────────

export type ToolCategory =
  | 'power-tools'
  | 'hand-tools'
  | 'garden'
  | 'cleaning'
  | 'automotive'
  | 'construction'
  | 'painting'
  | 'plumbing'
  | 'electrical'
  | 'moving'
  | 'outdoor'
  | 'kitchen'
  | 'party-rentals'
  | 'kids'
  | 'trailers'
  | 'other'

export type ToolCondition = 'like-new' | 'excellent' | 'good' | 'fair'

export type BookingStatus =
  | 'pending'
  | 'approved'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'disputed'

export type DisputeReason =
  | 'item_damaged'
  | 'item_not_returned'
  | 'item_not_as_described'
  | 'item_not_received'
  | 'deposit_dispute'
  | 'other'

export type DisputeStatus = 'open' | 'under_review' | 'resolved' | 'closed'

export type DisputeResolution =
  | 'renter_wins'
  | 'owner_wins'
  | 'split'
  | 'no_action'

export interface DisputeEvent {
  id: string
  type: 'filed' | 'response' | 'admin_note' | 'resolved' | 'closed'
  authorRole: 'renter' | 'owner' | 'admin'
  authorName: string
  content: string
  createdAt: string
}

export interface Dispute {
  id: string
  bookingId: string
  listingId: string
  renterId: string
  ownerId: string
  filedByRole: 'renter' | 'owner'
  reason: DisputeReason
  status: DisputeStatus
  resolution: DisputeResolution | null
  resolutionNote: string | null
  depositClaimAmount: number | null  // cents; null = no claim on deposit
  timeline: DisputeEvent[]
  createdAt: string
  updatedAt: string
  resolvedAt: string | null
}

export type DepositStatus = 'held' | 'released' | 'claimed' | 'partial-claimed'

export type VerificationBadge = 'email' | 'phone' | 'id' | 'payment' | 'social'

export type ReviewTargetType = 'owner' | 'renter' | 'tool'

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'distance' | 'newest'

// ── CORE MODELS ────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  bio: string | null
  location: {
    city: string
    state: string
    neighborhood: string | null
    lat: number
    lng: number
  }
  trustScore: number
  badges: VerificationBadge[]
  memberSince: string
  responseRate: number
  responseTimeHours: number
  totalListings: number
  totalRentals: number
  totalLends: number
  groupIds: string[]
}

export interface Listing {
  id: string
  ownerId: string
  title: string
  description: string
  category: ToolCategory
  condition: ToolCondition
  brand: string | null
  model: string | null
  retailValue: number
  photos: string[]
  tags: string[]
  accessories: string[]
  location: {
    address: string
    neighborhood: string
    city: string
    state: string
    lat: number
    lng: number
  }
  pricing: {
    dailyRate: number
    weekendRate: number | null   // if null, weekend days charge dailyRate
    weeklyRate: number | null
    monthlyRate: number | null
    depositAmount: number
    insuranceAvailable: boolean
    insuranceDailyRate: number | null
  }
  availability: {
    blockedDates: string[]
    minRentalDays: number
    maxRentalDays: number | null
    instantBook: boolean
  }
  toolKit: {
    isBundle: boolean
    bundledListingIds: string[]
    bundleDiscount: number
  }
  stats: {
    averageRating: number
    reviewCount: number
    totalRentals: number
    viewCount: number
  }
  status: 'draft' | 'active' | 'paused' | 'archived'
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  distanceMiles?: number
}

export interface Booking {
  id: string
  listingId: string
  renterId: string
  ownerId: string
  qrCode: string
  dates: {
    startDate: string
    endDate: string
    totalDays: number
  }
  pricing: {
    dailyRate: number
    subtotal: number
    platformFee: number
    insuranceFee: number
    depositAmount: number
    totalCharge: number
    totalWithDeposit: number
  }
  deposit: {
    status: DepositStatus
    heldAmount: number
    releasedAt: string | null
    claimedAmount: number
    claimReason: string | null
  }
  waiver: {
    signed: boolean
    signedAt: string | null
    ipAddress: string | null
  }
  insurance: {
    enrolled: boolean
    provider: string | null
    policyId: string | null
  }
  checkIn: {
    completed: boolean
    completedAt: string | null
    method: 'qr' | 'manual' | null
  }
  checkOut: {
    completed: boolean
    completedAt: string | null
    method: 'qr' | 'manual' | null
  }
  status: BookingStatus
  renterReviewId: string | null
  ownerReviewId: string | null
  conversationId: string
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  bookingId: string
  authorId: string
  targetId: string
  targetType: ReviewTargetType
  ratings: {
    overall: number
    accuracy: number | null
    communication: number | null
    condition: number | null
    reliability: number | null
  }
  content: string
  response: string | null
  isVisible: boolean
  createdAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  attachments: string[]
  readAt: string | null
  createdAt: string
}

export interface Conversation {
  id: string
  participantIds: string[]
  listingId: string | null
  bookingId: string | null
  lastMessageAt: string
  lastMessagePreview: string
}

export interface Group {
  id: string
  name: string
  description: string
  neighborhood: string
  city: string
  memberCount: number
  listingCount: number
  coverImageUrl: string
  adminIds: string[]
}

export interface WishlistItem {
  id: string
  requesterId: string
  title: string
  description: string
  category: ToolCategory
  location: { city: string; neighborhood: string | null }
  maxDailyRate: number | null
  neededBy: string | null
  fulfilled: boolean
  createdAt: string
}

// ── DERIVED / UI TYPES ─────────────────────────────────────────────────────

export interface ListingWithOwner extends Listing {
  owner: Pick<User, 'id' | 'name' | 'avatarUrl' | 'trustScore' | 'badges' | 'responseRate'>
}

export interface SearchFilters {
  query: string
  category: ToolCategory | null
  location: string
  lat: number | null
  lng: number | null
  radiusMiles: number
  minPrice: number | null
  maxPrice: number | null
  startDate: string | null
  endDate: string | null
  minRating: number | null
  instantBookOnly: boolean
  condition: ToolCondition | null
  sortBy: SortOption
}

export interface SmartPricingSuggestion {
  retailValue: number
  suggestedDailyRate: number
  suggestedWeeklyRate: number
  suggestedDepositRate: number
  categoryBenchmarkLow: number
  categoryBenchmarkHigh: number
  competitivenessScore: 'low' | 'fair' | 'competitive'
}

export interface TrustScoreBreakdown {
  total: number
  components: {
    emailVerified: number
    phoneVerified: number
    idVerified: number
    paymentVerified: number
    reviewScore: number
    rentalHistory: number
    responseRate: number
  }
}

export interface BookingFormState {
  step: 1 | 2 | 3 | 4 | 5
  listingId: string
  startDate: string | null
  endDate: string | null
  insuranceEnrolled: boolean
  waiverSigned: boolean
  waiverSignature: string | null
}

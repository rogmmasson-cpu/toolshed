import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { PrismaClient } from '@prisma/client'
import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { MOCK_LISTINGS } from '../lib/data/mock-listings'

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {})
const prisma = new PrismaClient({ adapter })

const MOCK_USERS = [
  { id: 'usr_1', name: 'Marcus Rivera', email: 'marcus@example.com', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', bio: 'DIY enthusiast and weekend woodworker.', locationCity: 'New Bedford', locationState: 'MA', locationNeighborhood: 'North End', locationLat: 41.642, locationLng: -70.938, trustScore: 92, badges: ['email', 'phone', 'id', 'payment'], responseRate: 0.97, responseTimeHours: 2, totalListings: 12, totalRentals: 8, totalLends: 47 },
  { id: 'usr_2', name: 'Sarah Chen', email: 'sarah@example.com', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', bio: 'Landscape designer with a garage full of professional-grade garden tools.', locationCity: 'Mattapoisett', locationState: 'MA', locationNeighborhood: 'Mattapoisett Village', locationLat: 41.649, locationLng: -70.807, trustScore: 88, badges: ['email', 'phone', 'id', 'payment'], responseRate: 0.95, responseTimeHours: 4, totalListings: 8, totalRentals: 15, totalLends: 31 },
  { id: 'usr_3', name: 'David Okafor', email: 'david@example.com', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', bio: 'Former contractor, now retired. My tools deserve to be used!', locationCity: 'Fairhaven', locationState: 'MA', locationNeighborhood: 'Fairhaven Center', locationLat: 41.638, locationLng: -70.904, trustScore: 96, badges: ['email', 'phone', 'id', 'payment', 'social'], responseRate: 0.99, responseTimeHours: 1, totalListings: 24, totalRentals: 3, totalLends: 112 },
  { id: 'usr_4', name: 'Priya Patel', email: 'priya@example.com', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', bio: 'Renting tools is just smart economics.', locationCity: 'Dartmouth', locationState: 'MA', locationNeighborhood: 'North Dartmouth', locationLat: 41.636, locationLng: -70.993, trustScore: 78, badges: ['email', 'phone', 'payment'], responseRate: 0.88, responseTimeHours: 8, totalListings: 2, totalRentals: 22, totalLends: 6 },
  { id: 'usr_5', name: 'Tom Brennan', email: 'tom@example.com', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', bio: 'General contractor. Tools are my trade — happy to share.', locationCity: 'Marion', locationState: 'MA', locationNeighborhood: 'Marion Village', locationLat: 41.698, locationLng: -70.762, trustScore: 85, badges: ['email', 'phone', 'id'], responseRate: 0.91, responseTimeHours: 6, totalListings: 6, totalRentals: 5, totalLends: 28 },
]

const MOCK_CONVERSATIONS = [
  {
    id: 'conv_1',
    participantIds: ['usr_1', 'usr_3'],
    listingId: 'lst_4',
    bookingId: null,
    lastMessageAt: new Date('2024-01-23T17:30:00Z'),
    lastMessagePreview: 'Thanks for returning it — deposit released!',
  },
  {
    id: 'conv_3',
    participantIds: ['usr_2', 'usr_4'],
    listingId: 'lst_6',
    bookingId: null,
    lastMessageAt: new Date('2024-04-10T09:15:00Z'),
    lastMessagePreview: 'Enjoy the mower! LMK if you have any questions.',
  },
  {
    id: 'conv_4',
    participantIds: ['usr_1', 'usr_4'],
    listingId: 'lst_2',
    bookingId: null,
    lastMessageAt: new Date('2024-04-14T11:00:00Z'),
    lastMessagePreview: "Hey! Looks good — I'll approve this shortly.",
  },
  {
    id: 'conv_5',
    participantIds: ['usr_4', 'usr_5'],
    listingId: 'lst_5',
    bookingId: null,
    lastMessageAt: new Date('2024-04-12T14:00:00Z'),
    lastMessagePreview: 'Is the ladder available the weekend of the 27th?',
  },
]

const MOCK_SEED_MESSAGES = [
  { id: 'msg_1', conversationId: 'conv_1', senderId: 'usr_1', content: 'Hi David! Is the pressure washer available Jan 22nd? I want to clean my driveway.', createdAt: new Date('2024-01-21T17:00:00Z') },
  { id: 'msg_2', conversationId: 'conv_1', senderId: 'usr_3', content: "Yes, it's free! Just make sure you book through the app so the deposit is handled properly. See you the 22nd.", createdAt: new Date('2024-01-21T17:25:00Z') },
  { id: 'msg_3', conversationId: 'conv_1', senderId: 'usr_1', content: "Perfect, booking now! Quick question — does it come with the soap dispenser attachment?", createdAt: new Date('2024-01-21T17:32:00Z') },
  { id: 'msg_4', conversationId: 'conv_1', senderId: 'usr_3', content: "Yes! Two detergent tanks included. Great for soap-and-rinse on the same pass.", createdAt: new Date('2024-01-21T17:58:00Z') },
  { id: 'msg_5', conversationId: 'conv_1', senderId: 'usr_3', content: 'Thanks for returning it — deposit released!', createdAt: new Date('2024-01-23T17:30:00Z') },
  { id: 'msg_6', conversationId: 'conv_3', senderId: 'usr_2', content: 'Approved your booking! The mower will be ready at 9am on the 10th.', createdAt: new Date('2024-04-09T19:30:00Z') },
  { id: 'msg_7', conversationId: 'conv_3', senderId: 'usr_4', content: "Great, I'll be there at 9. Thanks!", createdAt: new Date('2024-04-09T20:15:00Z') },
  { id: 'msg_8', conversationId: 'conv_3', senderId: 'usr_2', content: 'Enjoy the mower! LMK if you have any questions.', createdAt: new Date('2024-04-10T09:15:00Z') },
  { id: 'msg_9', conversationId: 'conv_4', senderId: 'usr_4', content: "Hi Marcus! I'd love to rent the DeWalt drill for the weekend.", createdAt: new Date('2024-04-14T10:45:00Z') },
  { id: 'msg_10', conversationId: 'conv_4', senderId: 'usr_1', content: "Hey! Looks good — I'll approve this shortly.", createdAt: new Date('2024-04-14T11:00:00Z') },
  { id: 'msg_11', conversationId: 'conv_5', senderId: 'usr_4', content: 'Is the ladder available the weekend of the 27th?', createdAt: new Date('2024-04-12T14:00:00Z') },
]

async function main() {
  console.log('Seeding database...')

  // Upsert users
  for (const user of MOCK_USERS) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    })
  }
  console.log(`Seeded ${MOCK_USERS.length} users`)

  // Upsert listings
  for (const l of MOCK_LISTINGS) {
    await prisma.listing.upsert({
      where: { id: l.id },
      update: {
        ownerId: l.ownerId,
        title: l.title,
        description: l.description,
        category: l.category,
        condition: l.condition,
        brand: l.brand ?? null,
        model: l.model ?? null,
        retailValue: l.retailValue,
        photos: l.photos,
        tags: l.tags,
        accessories: l.accessories,
        locationAddress: l.location.address,
        locationNeighborhood: l.location.neighborhood,
        locationCity: l.location.city,
        locationState: l.location.state,
        locationLat: l.location.lat,
        locationLng: l.location.lng,
        dailyRate: l.pricing.dailyRate,
        weekendRate: l.pricing.weekendRate ?? null,
        weeklyRate: l.pricing.weeklyRate ?? null,
        monthlyRate: l.pricing.monthlyRate ?? null,
        depositAmount: l.pricing.depositAmount,
        insuranceAvailable: l.pricing.insuranceAvailable,
        insuranceDailyRate: l.pricing.insuranceDailyRate ?? null,
        blockedDates: l.availability.blockedDates,
        minRentalDays: l.availability.minRentalDays,
        maxRentalDays: l.availability.maxRentalDays ?? null,
        instantBook: l.availability.instantBook,
        isBundle: l.toolKit.isBundle,
        bundledListingIds: l.toolKit.bundledListingIds,
        bundleDiscount: l.toolKit.bundleDiscount,
        averageRating: l.stats.averageRating,
        reviewCount: l.stats.reviewCount,
        totalRentals: l.stats.totalRentals,
        viewCount: l.stats.viewCount,
        status: l.status,
        publishedAt: l.publishedAt ? new Date(l.publishedAt) : null,
      },
      create: {
        id: l.id,
        ownerId: l.ownerId,
        title: l.title,
        description: l.description,
        category: l.category,
        condition: l.condition,
        brand: l.brand ?? null,
        model: l.model ?? null,
        retailValue: l.retailValue,
        photos: l.photos,
        tags: l.tags,
        accessories: l.accessories,
        locationAddress: l.location.address,
        locationNeighborhood: l.location.neighborhood,
        locationCity: l.location.city,
        locationState: l.location.state,
        locationLat: l.location.lat,
        locationLng: l.location.lng,
        dailyRate: l.pricing.dailyRate,
        weekendRate: l.pricing.weekendRate ?? null,
        weeklyRate: l.pricing.weeklyRate ?? null,
        monthlyRate: l.pricing.monthlyRate ?? null,
        depositAmount: l.pricing.depositAmount,
        insuranceAvailable: l.pricing.insuranceAvailable,
        insuranceDailyRate: l.pricing.insuranceDailyRate ?? null,
        blockedDates: l.availability.blockedDates,
        minRentalDays: l.availability.minRentalDays,
        maxRentalDays: l.availability.maxRentalDays ?? null,
        instantBook: l.availability.instantBook,
        isBundle: l.toolKit.isBundle,
        bundledListingIds: l.toolKit.bundledListingIds,
        bundleDiscount: l.toolKit.bundleDiscount,
        averageRating: l.stats.averageRating,
        reviewCount: l.stats.reviewCount,
        totalRentals: l.stats.totalRentals,
        viewCount: l.stats.viewCount,
        status: l.status,
        publishedAt: l.publishedAt ? new Date(l.publishedAt) : null,
      },
    })
  }
  console.log(`Seeded ${MOCK_LISTINGS.length} listings`)

  // Upsert conversations
  for (const c of MOCK_CONVERSATIONS) {
    await prisma.conversation.upsert({
      where: { id: c.id },
      update: {
        participantIds: c.participantIds,
        listingId: c.listingId,
        bookingId: c.bookingId,
        lastMessageAt: c.lastMessageAt,
        lastMessagePreview: c.lastMessagePreview,
      },
      create: {
        id: c.id,
        participantIds: c.participantIds,
        listingId: c.listingId,
        bookingId: c.bookingId,
        lastMessageAt: c.lastMessageAt,
        lastMessagePreview: c.lastMessagePreview,
      },
    })
  }
  console.log(`Seeded ${MOCK_CONVERSATIONS.length} conversations`)

  // Upsert messages
  for (const m of MOCK_SEED_MESSAGES) {
    await prisma.message.upsert({
      where: { id: m.id },
      update: {
        conversationId: m.conversationId,
        senderId: m.senderId,
        content: m.content,
        attachments: [],
        createdAt: m.createdAt,
      },
      create: {
        id: m.id,
        conversationId: m.conversationId,
        senderId: m.senderId,
        content: m.content,
        attachments: [],
        createdAt: m.createdAt,
      },
    })
  }
  console.log(`Seeded ${MOCK_SEED_MESSAGES.length} messages`)
  console.log('Done.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

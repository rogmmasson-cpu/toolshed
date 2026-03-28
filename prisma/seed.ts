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
  console.log('Done.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import CategoryGrid from '@/components/landing/CategoryGrid'
import HowItWorks from '@/components/landing/HowItWorks'
import FeaturedListings from '@/components/landing/FeaturedListings'
import TrustSignals from '@/components/landing/TrustSignals'
import CommunityStats from '@/components/landing/CommunityStats'
import Testimonials from '@/components/landing/Testimonials'
import AppDownloadCTA from '@/components/landing/AppDownloadCTA'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedListings />
        <HowItWorks />
        <Testimonials />
        <TrustSignals />
        <CommunityStats />
        <AppDownloadCTA />
      </main>
      <Footer />
    </>
  )
}

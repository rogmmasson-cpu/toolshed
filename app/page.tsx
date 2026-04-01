import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import WhatIsToolShed from '@/components/landing/WhatIsToolShed'
import HowItWorks from '@/components/landing/HowItWorks'
import TrustSignals from '@/components/landing/TrustSignals'
import CategoryGrid from '@/components/landing/CategoryGrid'
import FeaturedListings from '@/components/landing/FeaturedListings'
import LandingCTA from '@/components/landing/LandingCTA'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. What it is + search */}
        <Hero />
        {/* 2. Quick value prop */}
        <WhatIsToolShed />
        {/* 3. How it works — renter & owner */}
        <HowItWorks />
        {/* 4. Safety & trust */}
        <TrustSignals />
        {/* 5. Real listings near you */}
        <FeaturedListings />
        {/* 6. Browse by category */}
        <CategoryGrid />
        {/* 7. Final CTA */}
        <LandingCTA />
      </main>
      <Footer />
    </>
  )
}

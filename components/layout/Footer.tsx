import Link from 'next/link'
import { Wrench, Shield, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container-app py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <div className="flex items-center justify-center w-8 h-8 bg-brand-500 rounded-xl">
                <Wrench size={16} className="text-white" />
              </div>
              Tool<span className="text-brand-400">Shed</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The neighborhood marketplace for tools and household items. Rent what you need. Earn from what you own.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/browse" className="hover:text-white transition-colors">Browse All Tools</Link></li>
              <li><Link href="/browse?category=power-tools" className="hover:text-white transition-colors">Power Tools</Link></li>
              <li><Link href="/browse?category=garden" className="hover:text-white transition-colors">Garden</Link></li>
              <li><Link href="/browse?category=moving" className="hover:text-white transition-colors">Moving</Link></li>
              <li><Link href="/browse?category=kitchen" className="hover:text-white transition-colors">Kitchen</Link></li>
            </ul>
          </div>

          {/* Host */}
          <div>
            <h4 className="font-semibold text-white mb-3">List Your Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/listings/new" className="hover:text-white transition-colors">Create a Listing</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Owner Dashboard</Link></li>
              <li><Link href="/pricing-guide" className="hover:text-white transition-colors">Smart Pricing Guide</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-3">ToolShed</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/trust" className="hover:text-white transition-colors">Trust & Safety</Link></li>
              <li><Link href="/groups" className="hover:text-white transition-colors">Community Groups</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <p className="mt-8 text-xs text-gray-600 leading-relaxed border-t border-gray-800 pt-6">
          <span className="font-medium text-gray-500">Affiliate Disclosure:</span> ToolShed participates in the Amazon Services LLC Associates Program and other affiliate advertising programs. We earn commissions on qualifying purchases made through links on this site at no extra cost to you.{' '}
          ToolShed does not process payments or hold deposits — all financial arrangements are made directly between renters and owners.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 ToolShed, Inc. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
            <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="hover:text-white">Ad Opt-Out</a>
          </div>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Made with <Heart size={10} className="text-red-400 fill-red-400" /> in Fairhaven, MA
          </p>
        </div>
      </div>
    </footer>
  )
}

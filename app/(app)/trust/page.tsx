import Link from 'next/link'
import { Shield, Star, MessageSquare, CheckCircle, AlertTriangle, Phone } from 'lucide-react'

export const metadata = {
  title: 'Trust & Safety | ToolShed',
  description: 'How ToolShed keeps renters and owners safe.',
}

const pillars = [
  {
    icon: CheckCircle,
    color: 'bg-green-50 text-green-600',
    title: 'Verified Identities',
    description: 'Every ToolShed user completes identity verification before their first booking. We check government-issued ID through our secure verification partner — no catfishing, no fake accounts.',
  },
  {
    icon: Star,
    color: 'bg-amber-50 text-amber-600',
    title: 'Two-Way Reviews',
    description: 'After every rental, both the Renter and Owner leave a review. Transparent ratings mean the community self-polices — bad actors get weeded out fast.',
  },
  {
    icon: MessageSquare,
    color: 'bg-blue-50 text-blue-600',
    title: 'Documented Messaging',
    description: 'All communication between Renters and Owners happens inside ToolShed. Every message is timestamped and stored, giving both parties a clear record if a dispute arises.',
  },
  {
    icon: Shield,
    color: 'bg-brand-50 text-brand-600',
    title: 'QR Check-In & Check-Out',
    description: 'Our QR-based handoff flow creates a time-stamped record of when a tool changed hands. Combined with photos, it\'s the clearest evidence available if anything goes wrong.',
  },
]

const safetyTips = {
  renters: [
    'Read the listing description fully — check photos and condition notes.',
    'Use the check-in flow to document the tool\'s condition at pickup.',
    'Ask the Owner any questions about safe operation before you leave.',
    'Never use a tool for a purpose it wasn\'t designed for.',
    'Return tools clean and on time to protect your review score.',
  ],
  owners: [
    'Be accurate about your tool\'s condition — honesty builds trust.',
    'Check that all safety guards and accessories are included.',
    'Review a Renter\'s rating before approving a booking.',
    'Use the check-out flow to document condition before handoff.',
    'Set a fair security deposit relative to the tool\'s value.',
  ],
}

export default function TrustPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-500 to-brand-700 text-white py-20 px-4">
        <div className="container-app max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Trust & Safety</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            ToolShed is built on the idea that neighbors can trust each other. Here&apos;s how we back that up.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 px-4">
        <div className="container-app max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How we keep you safe</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${p.color}`}>
                  <p.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container-app max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Safety tips for our community</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-500 text-white rounded-full text-xs flex items-center justify-center font-bold">R</span>
                For Renters
              </h3>
              <ul className="space-y-3">
                {safetyTips.renters.map((tip) => (
                  <li key={tip} className="flex gap-2 text-gray-600 text-sm">
                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-forest-600 text-white rounded-full text-xs flex items-center justify-center font-bold">O</span>
                For Owners
              </h3>
              <ul className="space-y-3">
                {safetyTips.owners.map((tip) => (
                  <li key={tip} className="flex gap-2 text-gray-600 text-sm">
                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Report */}
      <section className="py-20 px-4">
        <div className="container-app max-w-3xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
              <AlertTriangle size={22} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Report a Safety Concern</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                If you experience harassment, fraud, a dangerous tool, or any other safety issue — please report it immediately. We review every report within 24 hours and take swift action.
              </p>
              <a
                href="mailto:safety@toolshed.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <Phone size={14} />
                Contact Safety Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-10 px-4 border-t border-gray-100">
        <div className="container-app max-w-3xl mx-auto flex flex-wrap gap-4 text-sm">
          <Link href="/liability" className="text-brand-600 hover:underline">Liability Waiver</Link>
          <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>
          <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>
        </div>
      </section>
    </div>
  )
}

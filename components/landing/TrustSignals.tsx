import { Shield, CreditCard, UserCheck, Zap } from 'lucide-react'

const FEATURES = [
  {
    icon: <Shield size={28} className="text-brand-500" />,
    title: 'Damage Deposit Escrow',
    desc: 'A deposit is held securely and released automatically when the rental ends without incident. File a claim within 48 hours if damage occurs.',
  },
  {
    icon: <CreditCard size={28} className="text-brand-500" />,
    title: 'Secure Payments via Stripe',
    desc: 'All transactions are processed by Stripe — bank-grade encryption, fraud detection, and instant payouts for owners.',
  },
  {
    icon: <UserCheck size={28} className="text-brand-500" />,
    title: 'Verified Profiles',
    desc: 'Government ID, phone, and payment method verification builds a trust score. Know exactly who you\'re renting to or from.',
  },
  {
    icon: <Zap size={28} className="text-brand-500" />,
    title: 'QR Check-In/Out',
    desc: 'A scannable QR code proves pickup and return — protecting both the renter and owner in any dispute.',
  },
]

const STATS = [
  { value: '12,000+', label: 'Items Listed' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '98%', label: 'On-Time Returns' },
  { value: '$0', label: 'Unresolved Claims' },
]

export default function TrustSignals() {
  return (
    <section className="py-16">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="section-title">Built on Trust & Safety</h2>
          <p className="section-subtitle">Every feature is designed to protect both renters and owners</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {FEATURES.map((f, i) => (
            <div key={i} className="card p-6">
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Liability note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 mb-10">
          <Shield size={24} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Liability Waiver — Transparent Protection</h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              Every renter signs a digital liability waiver before checkout. The waiver clearly states that renters are responsible for damage beyond normal wear, must operate items safely, and agree to ToolShed&apos;s dispute resolution process. Owners acknowledge that items must be in safe working condition. <a href="#" className="underline font-medium">Read the full waiver →</a>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl">
              <p className="text-3xl font-extrabold text-brand-500">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

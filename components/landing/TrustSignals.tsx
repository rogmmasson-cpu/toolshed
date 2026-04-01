import { Shield, MessageSquare, UserCheck, Star } from 'lucide-react'

const FEATURES = [
  {
    icon: <UserCheck size={28} className="text-brand-500" />,
    title: 'Neighbor Reviews',
    desc: 'Every owner and renter has a public rating built from real completed rentals. Read reviews and see response rates before you book.',
  },
  {
    icon: <Star size={28} className="text-brand-500" />,
    title: 'Two-Way Reviews',
    desc: 'After every rental, both the renter and owner leave a review. Transparent ratings keep the community honest.',
  },
  {
    icon: <MessageSquare size={28} className="text-brand-500" />,
    title: 'On-Platform Messaging',
    desc: 'All coordination happens inside ToolShed — every message is timestamped and stored as a record for both parties.',
  },
  {
    icon: <Shield size={28} className="text-brand-500" />,
    title: 'Digital Liability Waiver',
    desc: 'Every renter signs a binding liability waiver before pickup, clearly defining responsibilities and protecting owners.',
  },
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

      </div>
    </section>
  )
}

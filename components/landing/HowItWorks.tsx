import { Search, CalendarCheck, Key, Star } from 'lucide-react'

const RENTER_STEPS = [
  { icon: <Search size={24} />, title: 'Find a Tool', desc: 'Search by location, category, or keyword. Filter by price, condition, and availability.' },
  { icon: <CalendarCheck size={24} />, title: 'Request & Sign', desc: 'Choose your dates and sign a digital liability waiver. The owner approves your request.' },
  { icon: <Key size={24} />, title: 'Pick Up & Use', desc: 'Coordinate pickup directly with the owner, pay them your agreed amount, and get to work.' },
  { icon: <Star size={24} />, title: 'Leave a Review', desc: 'Rate the tool and owner. Help build a community of trusted lenders.' },
]

const OWNER_STEPS = [
  { icon: '📸', title: 'List Your Tool', desc: 'Upload photos, set a price (our smart suggester helps), and choose your availability.' },
  { icon: '✅', title: 'Approve Requests', desc: 'Review renter profiles and ratings before approving. Or turn on Instant Book.' },
  { icon: '💰', title: 'Get Paid Directly', desc: 'Collect payment and any deposit straight from the renter at pickup — no middleman.' },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="section-title">How ToolShed Works</h2>
          <p className="section-subtitle">Simple, safe, and community-powered</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Renter */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              🔧 For Renters
            </div>
            <div className="space-y-6">
              {RENTER_STEPS.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white shadow-card flex items-center justify-center text-brand-500">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Step {i + 1}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Owner */}
          <div>
            <div className="inline-flex items-center gap-2 bg-forest-100 text-forest-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              🏠 For Tool Owners
            </div>
            <div className="space-y-6">
              {OWNER_STEPS.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white shadow-card flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-forest-600 uppercase tracking-wider">Step {i + 1}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-forest-50 border border-forest-200 rounded-2xl">
              <p className="text-sm font-semibold text-forest-800 mb-1">💡 Average owner earns</p>
              <p className="text-3xl font-bold text-forest-700">$320/month</p>
              <p className="text-xs text-forest-600 mt-1">Based on tools rented 3–5 days per month</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

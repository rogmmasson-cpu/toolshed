import Link from 'next/link'
import { Smartphone, Star, Shield, Zap } from 'lucide-react'

const FEATURES = [
  { icon: <Zap size={16} />, text: 'Instant book with one tap' },
  { icon: <Shield size={16} />, text: 'QR check-in & secure deposits' },
  { icon: <Star size={16} />, text: 'Real-time notifications' },
]

export default function AppDownloadCTA() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container-app">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-500/20 text-brand-300 text-xs font-semibold rounded-full mb-4">
                <Smartphone size={12} /> Coming Soon to iOS & Android
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                ToolShed in your pocket.{' '}
                <span className="text-brand-400">Borrow anything</span>, anywhere.
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Get push notifications when your request is answered, scan QR codes for seamless pickup,
                and manage your listings on the go.
              </p>

              <div className="space-y-2 mb-8">
                {FEATURES.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <span className="text-brand-400">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>

              {/* Store badges */}
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-3 px-5 py-3 bg-white text-gray-900 font-semibold rounded-2xl text-sm hover:bg-gray-100 transition-colors">
                  <span className="text-xl">🍎</span>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500 leading-none">Download on the</div>
                    <div className="font-bold text-sm leading-tight">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 px-5 py-3 bg-white text-gray-900 font-semibold rounded-2xl text-sm hover:bg-gray-100 transition-colors">
                  <span className="text-xl">▶</span>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500 leading-none">Get it on</div>
                    <div className="font-bold text-sm leading-tight">Google Play</div>
                  </div>
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Or{' '}
                <Link href="/browse" className="text-brand-400 hover:text-brand-300 underline transition-colors">
                  use the web app
                </Link>{' '}
                — no download required.
              </p>
            </div>

            {/* Mock phone UI */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-52">
                {/* Phone frame */}
                <div className="bg-gray-100 rounded-[2.5rem] p-3 shadow-2xl border-4 border-gray-200">
                  <div className="bg-white rounded-[2rem] overflow-hidden aspect-[9/19]">
                    {/* Status bar */}
                    <div className="bg-brand-500 px-4 pt-3 pb-4">
                      <div className="flex justify-between text-white text-[8px] font-medium mb-2">
                        <span>9:41</span><span>●●●</span>
                      </div>
                      <p className="text-white font-bold text-xs">Good morning, Alex 👋</p>
                      <p className="text-white/70 text-[9px]">3 tools available near you</p>
                    </div>
                    {/* App content */}
                    <div className="p-3 space-y-2 bg-gray-50">
                      {/* Mini listing cards */}
                      {[
                        { emoji: '🔨', name: 'Dewalt Drill', price: '$12', dist: '0.3mi' },
                        { emoji: '🌿', name: 'Lawn Mower', price: '$25', dist: '0.5mi' },
                        { emoji: '🪚', name: 'Circular Saw', price: '$18', dist: '0.8mi' },
                      ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-sm">
                          <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-semibold text-gray-800 truncate">{item.name}</p>
                            <p className="text-[8px] text-gray-400">{item.dist} away</p>
                          </div>
                          <span className="text-[9px] font-bold text-brand-600">{item.price}</span>
                        </div>
                      ))}
                      {/* Notification */}
                      <div className="bg-forest-50 border border-forest-200 rounded-xl p-2 flex items-start gap-1.5">
                        <span className="text-xs">✅</span>
                        <div>
                          <p className="text-[8px] font-semibold text-forest-800">Request approved!</p>
                          <p className="text-[7px] text-forest-600">Pick up tomorrow 9am</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute -inset-4 bg-brand-500/10 rounded-full blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

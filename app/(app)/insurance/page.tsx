import Link from 'next/link'
import { Shield, CheckCircle, X, HelpCircle } from 'lucide-react'

export const metadata = {
  title: 'Insurance & Protection | ToolShed',
  description: 'How ToolShed\'s Protection Plan covers renters and owners.',
}

const covered = [
  'Accidental damage to rented tools (up to $500 per booking)',
  'Theft of a tool during an active rental period',
  'Mediation support in owner-renter disputes',
  'No deductible on covered claims',
  'Fast claim resolution — typically within 3 business days',
]

const notCovered = [
  'Intentional damage or misuse',
  'Normal wear and tear',
  'Damage from using a tool outside its intended purpose',
  'Tools not properly documented at check-in',
  'Claims filed more than 24 hours after return',
]

const faqs = [
  {
    q: 'How much does the Protection Plan cost?',
    a: 'The Protection Plan is 8% of the rental subtotal, added at checkout. For a $50 rental, that\'s $4 — a small price for peace of mind.',
  },
  {
    q: 'Do I need the Protection Plan to rent on ToolShed?',
    a: 'No. It\'s optional. However, without the Protection Plan, you are responsible for the full cost of any damage you cause to a rented tool.',
  },
  {
    q: 'How do I file a claim?',
    a: 'Go to your booking in the ToolShed app, tap "Report Damage," and follow the prompts. Submit within 24 hours of the tool being returned. Our team will review your claim and respond within 3 business days.',
  },
  {
    q: 'Does the Protection Plan cover the Owner\'s tool if it\'s stolen from their garage?',
    a: 'No. The Protection Plan only covers theft that occurs during an active, confirmed rental period. We recommend Owners have their own homeowner\'s or renter\'s insurance as a primary policy.',
  },
  {
    q: 'Is ToolShed\'s Protection Plan an insurance policy?',
    a: 'The ToolShed Protection Plan is a service guarantee provided directly by ToolShed, Inc. It is not an insurance product regulated by state insurance authorities. We are not an insurer.',
  },
]

export default function InsurancePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-600 to-forest-800 text-white py-20 px-4">
        <div className="container-app max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Insurance & Protection</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Rent with confidence. Our optional Protection Plan covers accidental damage, theft, and dispute support.
          </p>
          <div className="mt-8 inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 text-2xl font-bold">
            From just 8% of your rental
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-20 px-4">
        <div className="container-app max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">What&apos;s covered</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Covered */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" /> Covered
              </h3>
              <ul className="space-y-3">
                {covered.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-green-900">
                    <CheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Not covered */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <X size={18} className="text-gray-500" /> Not Covered
              </h3>
              <ul className="space-y-3">
                {notCovered.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-600">
                    <X size={15} className="text-gray-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container-app max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How it works</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Add Protection at checkout', desc: 'Toggle on the Protection Plan when you book. It\'s a one-time add-on per booking — not a subscription.' },
              { step: '2', title: 'Complete your rental', desc: 'Use the tool, return it on time. The protection runs for the full confirmed rental period.' },
              { step: '3', title: 'Report damage within 24 hours', desc: 'If something goes wrong, open the booking in the app and tap "Report Issue." Submit photos and a description.' },
              { step: '4', title: 'We handle it', desc: 'Our team reviews the claim against check-in photos and makes a fair determination, typically within 3 business days.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-brand-500 text-white font-bold text-sm flex items-center justify-center shrink-0">{item.step}</div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="container-app max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="border border-gray-200 rounded-2xl p-5">
                <div className="flex gap-3 items-start mb-2">
                  <HelpCircle size={18} className="text-brand-500 shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-10 px-4 border-t border-gray-100">
        <div className="container-app max-w-3xl mx-auto flex flex-wrap gap-4 text-sm">
          <Link href="/trust" className="text-brand-600 hover:underline">Trust & Safety</Link>
          <Link href="/liability" className="text-brand-600 hover:underline">Liability Waiver</Link>
          <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>
        </div>
      </section>
    </div>
  )
}

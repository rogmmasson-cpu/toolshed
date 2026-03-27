import Link from 'next/link'
import { AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Liability Waiver | ToolShed',
  description: 'ToolShed liability waiver for tool owners and renters.',
}

export default function LiabilityPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-amber-50 border-b border-amber-100 py-12 px-4">
        <div className="container-app max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Legal</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Liability Waiver</h1>
          <p className="text-gray-500 text-sm">Last updated: January 1, 2026 · Effective for all bookings made on or after January 1, 2026</p>
        </div>
      </div>

      {/* Callout */}
      <div className="container-app max-w-3xl mx-auto pt-10 px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
          <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Please read this waiver carefully.</strong> By completing a booking on ToolShed — whether as an Owner or Renter — you agree to the terms of this Liability Waiver. This document affects your legal rights.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-app max-w-3xl mx-auto py-10 px-4 space-y-10">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. Assumption of Risk</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            Renting and using tools involves inherent risks, including but not limited to: personal injury, property damage, and equipment malfunction. By using tools rented through the ToolShed platform, Renters voluntarily assume all such risks.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Renters are solely responsible for reading all safety instructions, using appropriate personal protective equipment, and operating tools within their skill level and applicable local regulations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. Renter Responsibilities</h2>
          <ul className="space-y-2">
            {[
              'Return all tools in the same condition as received, normal wear and tear excepted.',
              'Report any pre-existing damage at the time of pickup via the ToolShed check-in flow.',
              'Pay for any damage caused during the rental period that exceeds normal wear and tear.',
              'Not use tools for any illegal purpose or in violation of manufacturer guidelines.',
              'Not lend or sub-rent tools to third parties.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-gray-600">
                <span className="text-amber-400 mt-1 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. Owner Responsibilities</h2>
          <ul className="space-y-2">
            {[
              'Provide tools in safe, clean, and functional working condition.',
              'Accurately describe the tool\'s condition, age, and any known defects in the listing.',
              'Ensure tools meet applicable safety standards and include all necessary accessories.',
              'Not list tools that are under safety recall.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-gray-600">
                <span className="text-amber-400 mt-1 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. Damage Claims</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If a tool is returned damaged, the following process applies:
          </p>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Owner must file a damage claim within 24 hours of confirmed return via the ToolShed app.' },
              { step: '2', text: 'Owner provides photo evidence and estimated repair/replacement cost.' },
              { step: '3', text: 'ToolShed reviews the claim and the Renter\'s check-in photos within 3 business days.' },
              { step: '4', text: 'If validated, the damage cost is charged to Renter\'s payment method on file, up to the security deposit amount.' },
              { step: '5', text: 'Damage exceeding the security deposit may be pursued by the Owner through our dispute resolution process.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{item.step}</div>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">5. ToolShed's Role and Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            ToolShed is a marketplace platform and is not a party to rental agreements between Owners and Renters. ToolShed does not inspect tools, verify their condition, or warrant their fitness for any purpose.
          </p>
          <p className="text-gray-600 leading-relaxed">
            To the fullest extent permitted by law, ToolShed expressly disclaims all liability for personal injury, property damage, or financial loss arising from the use of any tool rented through the platform. ToolShed&apos;s maximum liability in connection with any claim shall not exceed $500.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">6. What ToolShed's Protection Plan Covers</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            ToolShed offers an optional Protection Plan add-on (available at checkout) that provides additional coverage:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Accidental damage up to $500 per booking',
              'Theft during the rental period',
              'Mediation support for disputes',
              'No deductible for covered claims',
            ].map((item) => (
              <div key={item} className="flex gap-2 items-start bg-green-50 rounded-xl p-3">
                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-3">Protection Plan coverage does not include intentional damage, misuse, or use in violation of these Terms.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">7. Indemnification</h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to indemnify, defend, and hold harmless ToolShed, Inc. and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including attorneys&apos; fees) arising from your use of the platform or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">8. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            This Liability Waiver is governed by the laws of the Commonwealth of Massachusetts. Any disputes shall be resolved in courts located in Bristol County, Massachusetts.
          </p>
        </section>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-4">Questions about this waiver? Contact us at <a href="mailto:legal@toolshed.com" className="text-brand-600 hover:underline">legal@toolshed.com</a></p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>
            <Link href="/insurance" className="text-brand-600 hover:underline">Insurance & Protection</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

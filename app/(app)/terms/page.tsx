export const metadata = { title: 'Terms of Service — ToolShed' }

const EFFECTIVE = 'March 30, 2026'

export default function TermsPage() {
  return (
    <div className="container-app py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-10">Effective date: {EFFECTIVE}</p>

      <div className="space-y-8 text-gray-600 leading-relaxed">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>Summary:</strong> ToolShed is a free marketplace that connects tool owners with renters.
          We do not process payments, charge transaction fees, or hold deposits. Our revenue comes from
          advertising and affiliate commissions. All financial arrangements are made directly between users.
        </div>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ToolShed, you agree to these Terms of Service and our{' '}
            <a href="/privacy" className="text-brand-600 underline">Privacy Policy</a>. If you do not agree,
            do not use the platform. We may update these terms at any time — continued use constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. ToolShed&apos;s Role — Marketplace Intermediary Only</h2>
          <p className="mb-2">
            ToolShed is a technology platform that facilitates connections between tool owners (&quot;Owners&quot;)
            and people seeking to rent tools (&quot;Renters&quot;). ToolShed is <strong>not a party to any rental
            transaction</strong> and explicitly:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Does not own, inspect, insure, or warrant any listed item</li>
            <li>Does not collect, process, hold, or transfer any rental payments or deposits</li>
            <li>Does not set or enforce pricing between parties</li>
            <li>Does not guarantee the completion, safety, or legality of any rental</li>
          </ul>
          <p className="mt-2">
            All payment, deposit, and financial arrangements are made exclusively between Owner and Renter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Eligibility</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>You must be at least 18 years old to create an account.</li>
            <li>You are responsible for maintaining the confidentiality of your credentials.</li>
            <li>You may not create multiple accounts to circumvent bans or reviews.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Listings</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Owners are responsible for accurate, truthful listing descriptions including condition, accessories included, and any known defects.</li>
            <li>You may only list items you own or have legal authority to rent.</li>
            <li>ToolShed may remove listings that violate these terms or applicable law without notice.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Payments & Deposits</h2>
          <p className="mb-2">
            <strong>ToolShed does not process payments or hold deposits.</strong> Pricing shown on the
            platform is informational — final amounts are agreed directly between Owner and Renter. Users are
            encouraged to:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Use traceable payment methods (Venmo, PayPal, bank transfer)</li>
            <li>Document item condition at check-in and check-out with photos</li>
            <li>Agree in writing (via ToolShed messages) on deposit amount and return conditions before the rental begins</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Advertising & Affiliate Links</h2>
          <p className="mb-2">
            ToolShed is supported by advertising revenue. By using the platform you consent to:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Display advertising:</strong> Ads may appear on browse and listing pages.</li>
            <li><strong>Interest-based advertising:</strong> Your browsing behavior may be used to deliver relevant ads from tool retailers and brands via Meta and Google advertising networks.</li>
            <li><strong>Affiliate product links:</strong> Listing pages include links to Amazon and other retailers. ToolShed earns commissions on qualifying purchases at no cost to you. Links are labeled as affiliate links in compliance with FTC guidelines.</li>
          </ul>
          <p className="mt-2 text-sm">
            See our <a href="/privacy" className="text-brand-600 underline">Privacy Policy</a> and{' '}
            <a href="/cookies" className="text-brand-600 underline">Cookie Policy</a> for details and opt-out options.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Prohibited Activities</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>Listing stolen, counterfeit, or illegally obtained items</li>
            <li>Using the platform for any unlawful purpose</li>
            <li>Harassing, threatening, or defrauding other users</li>
            <li>Manipulating reviews or ratings</li>
            <li>Attempting to circumvent ToolShed&apos;s matching or search algorithms</li>
          </ul>
          <p className="mt-2">Violations may result in immediate account suspension or termination.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
          <p className="mb-2">
            To the fullest extent permitted by applicable law:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>ToolShed is not liable for personal injury, property damage, financial loss, or any harm arising from any rental transaction or use of any listed item.</li>
            <li>ToolShed makes no warranties about the condition, safety, suitability, or legality of any listed item.</li>
            <li>ToolShed&apos;s maximum aggregate liability to any user shall not exceed $100.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Governing Law & Disputes</h2>
          <p>
            These Terms are governed by the laws of the State of Texas. Disputes shall be resolved through
            binding arbitration in Travis County, Texas, except where prohibited by law. You waive any right
            to a jury trial or class-action proceeding.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
          <p>
            Questions?{' '}
            <a href="mailto:legal@toolshed.com" className="text-brand-600 underline">legal@toolshed.com</a>
            {' '}· ToolShed, Inc. · Fairhaven, MA
          </p>
        </section>

      </div>
    </div>
  )
}

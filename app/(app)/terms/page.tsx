export const metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <div className="container-app py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2026</p>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">By accessing or using ToolShed, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. ToolShed reserves the right to update these terms at any time, and continued use constitutes acceptance of any changes.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use of the Platform</h2>
          <p className="text-gray-600 leading-relaxed">ToolShed is a peer-to-peer marketplace that enables users to rent and lend tools and household items. We are not a party to any rental transaction and are not responsible for the condition, safety, legality, or any other aspect of the items listed on our platform.</p>
          <p className="text-gray-600 leading-relaxed mt-3">You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Listings and Rentals</h2>
          <p className="text-gray-600 leading-relaxed">Owners are responsible for providing accurate descriptions of their items and ensuring items are safe, clean, and in working order. Renters are responsible for using items safely and returning items in the same condition they were received.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Payments and Fees</h2>
          <p className="text-gray-600 leading-relaxed">ToolShed charges a service fee on each transaction. Fees are displayed before you confirm any booking. Deposits may be required by owners and will be returned within 3–5 business days of a completed rental, assuming no damage claims.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Prohibited Activities</h2>
          <p className="text-gray-600 leading-relaxed">You may not use ToolShed for any unlawful purpose, to list stolen items, to harass other users, or to circumvent our payment system. Violations may result in immediate account termination.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">To the fullest extent permitted by law, ToolShed shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or any rental transaction.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact</h2>
          <p className="text-gray-600 leading-relaxed">Questions about these Terms? Email <a href="mailto:legal@toolshed.com" className="text-brand-600 hover:underline">legal@toolshed.com</a>.</p>
        </section>
      </div>
    </div>
  )
}

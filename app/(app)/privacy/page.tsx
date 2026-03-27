export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="container-app py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2026</p>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed">We collect information you provide directly to us, such as when you create an account, list a tool, make a booking, or contact us for support. This includes your name, email address, phone number, profile photo, and payment information.</p>
          <p className="text-gray-600 leading-relaxed mt-3">We also automatically collect certain information when you use ToolShed, including your IP address, browser type, device identifiers, and usage data to improve our services.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed">We use the information we collect to provide, maintain, and improve ToolShed; process transactions and send related information; send you technical notices, updates, and support messages; respond to your comments and questions; and send marketing communications (which you may opt out of at any time).</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
          <p className="text-gray-600 leading-relaxed">We share your information with other users as necessary to facilitate rentals. We do not sell your personal information to third parties. We may share information with service providers who assist us in operating ToolShed, subject to confidentiality obligations.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
          <p className="text-gray-600 leading-relaxed">We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no security system is impenetrable, and we cannot guarantee the security of our systems.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed">You may update or correct your account information at any time in your Settings. You may request deletion of your account by contacting us at privacy@toolshed.com.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">Questions about this Privacy Policy? Email <a href="mailto:privacy@toolshed.com" className="text-brand-600 hover:underline">privacy@toolshed.com</a> or write to us at ToolShed, Inc., 123 Harbor Way, Fairhaven, MA 02719.</p>
        </section>
      </div>
    </div>
  )
}

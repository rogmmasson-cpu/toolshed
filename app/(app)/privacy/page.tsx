import Link from 'next/link'

export const metadata = { title: 'Privacy Policy — ToolShed' }

const EFFECTIVE = 'March 30, 2026'

export default function PrivacyPage() {
  return (
    <div className="container-app py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Effective date: {EFFECTIVE}</p>

      <div className="space-y-8 text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Who We Are</h2>
          <p>
            ToolShed, Inc. (&quot;ToolShed,&quot; &quot;we,&quot; or &quot;us&quot;) operates a peer-to-peer rental
            marketplace. ToolShed is an <strong>advertising-supported platform</strong> — we do not charge
            transaction fees, process payments, or hold deposits. Our revenue comes from display advertising,
            interest-based ad targeting, and affiliate commissions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li><strong>Account information:</strong> Name, email address, and profile photo when you sign up.</li>
            <li><strong>Location data:</strong> ZIP code or city you enter during search. We derive approximate
              coordinates for distance sorting. We do not collect device GPS location.</li>
            <li><strong>Listing & booking data:</strong> Listings you create, bookings requested or accepted,
              and messages sent through the platform.</li>
            <li><strong>Browsing behavior:</strong> Search terms, tool categories viewed, listings clicked, and
              time on page. This data drives ad targeting and affiliate recommendations.</li>
            <li><strong>Device & technical data:</strong> IP address, browser type, operating system, and
              referring URLs — collected automatically via cookies and similar technologies.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li><strong>Marketplace operations:</strong> Match renters with owners, enable messaging, and manage
              booking records.</li>
            <li><strong>Interest-based advertising:</strong> Your browsing behavior (e.g., viewing drill
              listings) is shared with ad platforms (Meta, Google) so tool retailers can show you relevant ads
              across the web. See Section 5.</li>
            <li><strong>Affiliate product recommendations:</strong> We display curated product links on listing
              pages and earn a commission if you purchase. See Section 6.</li>
            <li><strong>Platform improvement:</strong> Analyze usage, diagnose errors, and test new features.</li>
            <li><strong>Communications:</strong> Transactional emails (booking confirmations) and, with your
              consent, marketing emails.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies & Tracking Technologies</h2>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-semibold text-gray-800 mb-1">Essential Cookies</p>
              <p className="text-sm">Required for authentication and core functionality. Cannot be disabled.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-semibold text-gray-800 mb-1">Analytics Cookies (Google Analytics)</p>
              <p className="text-sm">Measures traffic and usage flows. Data is aggregated and anonymized.</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="font-semibold text-gray-800 mb-1">Advertising Pixels (Meta & Google)</p>
              <p className="text-sm">
                Fire when you view listing pages. These allow tool retailers to show you targeted ads on other
                sites and apps (retargeting). Ad platforms receive information about your ToolShed browsing activity.
                EU/EEA users are asked for consent before these activate.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-semibold text-gray-800 mb-1">Affiliate Tracking (Amazon & others)</p>
              <p className="text-sm">
                When you click an affiliate product link, the retailer sets cookies to attribute purchases for
                commission purposes.
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm">
            Manage preferences on our <Link href="/cookies" className="text-brand-600 underline">Cookie Settings</Link> page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Interest-Based Advertising</h2>
          <p className="mb-2">
            ToolShed participates in interest-based advertising. When you browse listings, behavioral signals
            are shared with Meta and Google so relevant advertisers can reach you on other platforms.{' '}
            <strong>We do not sell your name, email address, or phone number.</strong>
          </p>
          <p className="mb-2">To opt out:</p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>
              <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                Digital Advertising Alliance — opt out
              </a>
            </li>
            <li>
              <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                Network Advertising Initiative — opt out
              </a>
            </li>
            <li>Manage ad preferences in your <Link href="/cookies" className="text-brand-600 underline">Cookie Settings</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Affiliate Link Disclosure (FTC 16 CFR § 255)</h2>
          <p>
            ToolShed participates in the Amazon Services LLC Associates Program and other affiliate advertising
            programs. We earn a commission on qualifying purchases made through affiliate links displayed on
            listing pages — at no additional cost to you. All affiliate links are labeled. This constitutes the
            material connection disclosure required by the FTC.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Information Sharing</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li><strong>Other users:</strong> Your name, photo, and general location are visible as part of
              marketplace operation.</li>
            <li><strong>Service providers:</strong> Clerk (auth), Neon (database), Vercel (hosting/storage) —
              under data processing agreements.</li>
            <li><strong>Advertising platforms:</strong> Behavioral signals shared with Meta and Google for ad
              targeting. See Section 5.</li>
            <li><strong>Legal requirements:</strong> When required by law or to protect ToolShed or others.</li>
          </ul>
          <p className="mt-2 font-medium text-gray-800">
            We do not sell personal identifiers (name, email, phone, precise location) to data brokers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Rights</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800 mb-1">California Residents (CCPA / CPRA)</p>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Right to know what personal information is collected and how it is used</li>
                <li>Right to delete your personal information</li>
                <li>Right to opt out of the sharing of personal information for cross-context behavioral advertising
                  (advertising pixel sharing may qualify — use opt-out links in Section 5)</li>
                <li>Right to correct inaccurate personal information</li>
                <li>Right to non-discrimination for exercising these rights</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">EU / EEA Residents (GDPR)</p>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Right to access, rectify, or erase personal data</li>
                <li>Right to withdraw consent for advertising cookies at any time</li>
                <li>Right to data portability and to object to processing</li>
                <li>Right to lodge a complaint with your local supervisory authority</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-sm">
            To exercise rights: <a href="mailto:privacy@toolshed.com" className="text-brand-600 underline">privacy@toolshed.com</a>. We respond within 45 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Children&apos;s Privacy</h2>
          <p>
            ToolShed is not directed at children under 13 and does not knowingly collect their information.
            Contact us at <a href="mailto:privacy@toolshed.com" className="text-brand-600 underline">privacy@toolshed.com</a> if
            you believe we have.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to This Policy</h2>
          <p>We will notify registered users by email for material changes. The effective date above reflects the most recent revision.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact</h2>
          <p>ToolShed, Inc. · <a href="mailto:privacy@toolshed.com" className="text-brand-600 underline">privacy@toolshed.com</a> · Fairhaven, MA</p>
        </section>

      </div>
    </div>
  )
}

import Link from 'next/link'

export const metadata = { title: 'Cookie Policy — ToolShed' }

const EFFECTIVE = 'March 30, 2026'

export default function CookiesPage() {
  return (
    <div className="container-app py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Effective date: {EFFECTIVE}</p>

      <div className="space-y-8 text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. What Are Cookies</h2>
          <p>
            Cookies are small text files placed on your device by websites you visit. ToolShed uses cookies
            and similar technologies (pixels, local storage) for authentication, analytics, advertising, and
            affiliate tracking. This policy explains what we use and how to control it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Cookies We Use</h2>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-800">Essential Cookies</p>
                <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">Always on</span>
              </div>
              <p className="text-sm mb-2">Required for authentication, session management, and core platform functionality.</p>
              <p className="text-xs text-gray-500">Provider: Clerk (auth tokens, CSRF protection)</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-800">Analytics Cookies</p>
                <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">Opt-out available</span>
              </div>
              <p className="text-sm mb-2">Measures page views, traffic sources, and user flows to improve the platform. Data is aggregated and does not identify individuals.</p>
              <p className="text-xs text-gray-500">Provider: Google Analytics 4</p>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-800">Advertising Pixels</p>
                <span className="text-xs bg-amber-200 text-amber-800 rounded-full px-2 py-0.5">Opt-out available</span>
              </div>
              <p className="text-sm mb-2">
                Fire when you view listing pages. These allow tool retailers and brands to show you targeted
                ads on other websites and apps (retargeting / remarketing). The pixel providers receive
                information about which categories and listings you viewed on ToolShed.
              </p>
              <p className="text-xs text-gray-500 space-y-0.5">
                <span className="block">Provider: Meta (Facebook/Instagram) Pixel</span>
                <span className="block">Provider: Google Ads Remarketing Tag</span>
              </p>
              <p className="text-xs mt-2 text-amber-700">
                EU/EEA users will be asked for consent before these pixels activate.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-800">Affiliate Tracking Cookies</p>
                <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">Set by third parties</span>
              </div>
              <p className="text-sm mb-2">
                When you click an affiliate product link (e.g., &quot;Shop on Amazon&quot;), the destination
                retailer sets cookies on their domain to attribute any purchase to ToolShed for commission
                purposes. ToolShed earns a small commission on qualifying purchases at no extra cost to you.
              </p>
              <p className="text-xs text-gray-500">Providers: Amazon Associates, Impact.com, CJ Affiliate</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How to Manage Cookies</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              <strong>Browser settings:</strong> You can block or delete cookies in your browser. Note that
              blocking essential cookies will prevent you from signing in.
            </li>
            <li>
              <strong>Opt out of interest-based advertising:</strong>{' '}
              <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                Digital Advertising Alliance
              </a>{' '}·{' '}
              <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                Network Advertising Initiative
              </a>
            </li>
            <li>
              <strong>Google Analytics opt-out:</strong>{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                Google Analytics Opt-out Browser Add-on
              </a>
            </li>
            <li>
              <strong>California residents (CCPA):</strong> You have the right to opt out of the sharing of
              personal information for cross-context behavioral advertising. Use the opt-out links above or
              email <a href="mailto:privacy@toolshed.com" className="text-brand-600 underline">privacy@toolshed.com</a>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Affiliate Disclosure</h2>
          <p>
            ToolShed participates in the Amazon Services LLC Associates Program and other affiliate advertising
            programs. We earn commissions on qualifying purchases made through links on this site — at no
            additional cost to you. This is disclosed in compliance with FTC 16 CFR § 255. See our{' '}
            <Link href="/privacy" className="text-brand-600 underline">Privacy Policy</Link> for full details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Contact</h2>
          <p>
            Questions about our cookie practices?{' '}
            <a href="mailto:privacy@toolshed.com" className="text-brand-600 underline">privacy@toolshed.com</a>
          </p>
        </section>

      </div>
    </div>
  )
}

import Link from 'next/link'
import { Cookie } from 'lucide-react'

export const metadata = {
  title: 'Cookie Policy | ToolShed',
  description: 'How ToolShed uses cookies and similar tracking technologies.',
}

const cookieTypes = [
  {
    name: 'Strictly Necessary',
    required: true,
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    description: 'These cookies are essential for the platform to function. They enable core features like logging in, managing your session, and completing bookings.',
    examples: [
      { name: 'ts_session', purpose: 'Maintains your logged-in session', duration: 'Session' },
      { name: 'ts_csrf', purpose: 'Prevents cross-site request forgery attacks', duration: 'Session' },
      { name: 'ts_user_prefs', purpose: 'Stores basic display preferences (e.g., map/list view)', duration: '1 year' },
    ],
  },
  {
    name: 'Analytics',
    required: false,
    color: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    description: 'These cookies help us understand how visitors use ToolShed so we can improve the experience. All data is aggregated and anonymized.',
    examples: [
      { name: '_ga, _gid', purpose: 'Google Analytics — page views and user flows', duration: '2 years / 24 hours' },
      { name: 'ts_perf', purpose: 'Performance monitoring (page load times, errors)', duration: '90 days' },
    ],
  },
  {
    name: 'Functional',
    required: false,
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700',
    description: 'These cookies enable enhanced functionality such as remembering your search filters, location, and recent listings.',
    examples: [
      { name: 'ts_location', purpose: 'Remembers your preferred search area', duration: '30 days' },
      { name: 'ts_recent', purpose: 'Tracks recently viewed listings for quick access', duration: '7 days' },
    ],
  },
  {
    name: 'Marketing',
    required: false,
    color: 'bg-orange-50 border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    description: 'These cookies are used to deliver relevant ads and measure the effectiveness of our marketing campaigns. We do not share this data with third-party advertisers.',
    examples: [
      { name: 'ts_ref', purpose: 'Tracks which campaign or referral source brought you to ToolShed', duration: '90 days' },
    ],
  },
]

export default function CookiesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-12 px-4">
        <div className="container-app max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
              <Cookie size={20} className="text-brand-600" />
            </div>
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Legal</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Cookie Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: January 1, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-app max-w-3xl mx-auto py-14 px-4 space-y-10">

        <div>
          <p className="text-gray-600 leading-relaxed">
            ToolShed uses cookies and similar technologies to operate the platform, analyze usage, and improve your experience. This policy explains what cookies we use, why we use them, and how you can control them.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">What Are Cookies?</h2>
          <p className="text-gray-600 leading-relaxed">
            Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently and to provide information to website owners. Cookies set by ToolShed are called &ldquo;first-party cookies.&rdquo; Cookies set by other services on our behalf are &ldquo;third-party cookies.&rdquo;
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Cookies We Use</h2>
          <div className="space-y-5">
            {cookieTypes.map((type) => (
              <div key={type.name} className={`rounded-2xl border p-5 ${type.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900">{type.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${type.badge}`}>
                    {type.required ? 'Always Active' : 'Optional'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-gray-500">
                        <th className="pb-2 pr-4 font-semibold">Cookie</th>
                        <th className="pb-2 pr-4 font-semibold">Purpose</th>
                        <th className="pb-2 font-semibold">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {type.examples.map((ex) => (
                        <tr key={ex.name} className="border-t border-black/5">
                          <td className="py-1.5 pr-4 font-mono">{ex.name}</td>
                          <td className="py-1.5 pr-4">{ex.purpose}</td>
                          <td className="py-1.5 whitespace-nowrap">{ex.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Managing Your Cookie Preferences</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            You can control optional cookies through your browser settings or our in-app cookie preferences panel (accessible from the footer). Note that disabling cookies may affect the functionality of ToolShed.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Most browsers allow you to refuse cookies, delete existing cookies, or be notified when cookies are set. Refer to your browser&apos;s help documentation for instructions.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Do Not Track</h2>
          <p className="text-gray-600 leading-relaxed">
            Some browsers send &ldquo;Do Not Track&rdquo; (DNT) signals to websites. Because there is no consistent industry standard, ToolShed does not currently respond to DNT signals. We will update this policy if an industry standard is adopted.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-4">Questions? Contact us at <a href="mailto:privacy@toolshed.com" className="text-brand-600 hover:underline">privacy@toolshed.com</a></p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>
            <Link href="/liability" className="text-brand-600 hover:underline">Liability Waiver</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

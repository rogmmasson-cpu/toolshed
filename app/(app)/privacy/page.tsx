import Link from 'next/link'
import { Shield } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | ToolShed',
  description: 'How ToolShed collects, uses, and protects your personal information.',
}

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      'Account information you provide when registering: name, email address, phone number, and profile photo.',
      'Identity verification data including government-issued ID scans (processed by our third-party verification partner and not stored on ToolShed servers).',
      'Payment information processed securely through Stripe. ToolShed never stores full card numbers.',
      'Listing details, photos, and descriptions you create as an owner.',
      'Messages exchanged between renters and owners through our platform.',
      'Device and usage data: IP address, browser type, pages visited, and interaction events to improve the platform.',
      'Location data (city/neighborhood level) used to show relevant nearby listings.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To create and manage your ToolShed account.',
      'To facilitate bookings, payments, and returns between renters and owners.',
      'To verify identities and maintain trust and safety on the platform.',
      'To send transactional emails (booking confirmations, receipts, reminders).',
      'To send optional marketing communications — you may opt out at any time.',
      'To improve our services through analytics and usage patterns.',
      'To comply with legal obligations and resolve disputes.',
    ],
  },
  {
    title: '3. How We Share Your Information',
    content: [
      'With other users only as necessary for a booking — owners see renter names and ratings; renters see owner contact info after confirmation.',
      'With Stripe for payment processing. Stripe\'s privacy policy governs their use of your data.',
      'With identity verification partners solely for ID checks.',
      'With law enforcement or regulators when required by law or to protect platform safety.',
      'We do not sell your personal data to third parties for marketing purposes.',
    ],
  },
  {
    title: '4. Data Retention',
    content: [
      'Account data is retained while your account is active and for 3 years after deletion for legal and dispute purposes.',
      'Transaction records are retained for 7 years in compliance with financial regulations.',
      'You may request deletion of your account and associated data at any time by contacting privacy@toolshed.com.',
    ],
  },
  {
    title: '5. Your Rights',
    content: [
      'Access: You may request a copy of the personal data we hold about you.',
      'Correction: You may update your account information at any time via Settings.',
      'Deletion: You may request that we delete your personal data, subject to legal retention requirements.',
      'Portability: You may request your data in a structured, machine-readable format.',
      'To exercise any of these rights, email privacy@toolshed.com.',
    ],
  },
  {
    title: '6. Security',
    content: [
      'We use industry-standard encryption (TLS 1.3) for all data in transit.',
      'Sensitive data at rest is encrypted using AES-256.',
      'We perform regular security audits and penetration testing.',
      'Despite our best efforts, no system is 100% secure. Please use a strong, unique password for your account.',
    ],
  },
  {
    title: '7. Cookies',
    content: [
      'We use cookies for authentication, preferences, and analytics. See our Cookie Policy for details.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    content: [
      'We may update this Privacy Policy periodically. We will notify you of significant changes via email or in-app notification. Continued use of ToolShed after changes constitutes acceptance.',
    ],
  },
  {
    title: '9. Contact',
    content: [
      'ToolShed, Inc. · 123 Main Street, Fairhaven, MA 02719',
      'privacy@toolshed.com',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-12 px-4">
        <div className="container-app max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-brand-600" />
            </div>
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Legal</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: January 1, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-app max-w-3xl mx-auto py-14 px-4">
        <p className="text-gray-600 leading-relaxed mb-10">
          ToolShed, Inc. (&ldquo;ToolShed,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the ToolShed platform — including our website, mobile applications, and related services.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
              <ul className="space-y-2">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-600 leading-relaxed">
                    <span className="text-brand-400 mt-1 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
          <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>
          <Link href="/cookies" className="text-brand-600 hover:underline">Cookie Policy</Link>
          <Link href="/liability" className="text-brand-600 hover:underline">Liability Waiver</Link>
        </div>
      </div>
    </div>
  )
}

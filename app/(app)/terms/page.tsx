import Link from 'next/link'
import { FileText } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | ToolShed',
  description: 'The terms and conditions governing your use of the ToolShed platform.',
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By creating an account or using ToolShed, you agree to these Terms of Service and our Privacy Policy.',
      'If you do not agree, do not use the platform.',
      'You must be at least 18 years old to use ToolShed.',
    ],
  },
  {
    title: '2. The ToolShed Platform',
    content: [
      'ToolShed is a peer-to-peer marketplace that connects tool owners ("Owners") with people who want to rent them ("Renters").',
      'ToolShed does not own, inspect, or warrant any tools listed on the platform.',
      'ToolShed is not a party to any rental agreement between Owners and Renters.',
      'We reserve the right to remove any listing or user that violates these Terms.',
    ],
  },
  {
    title: '3. Accounts',
    content: [
      'You are responsible for maintaining the security of your account credentials.',
      'You may not share your account or use someone else\'s account.',
      'You must provide accurate, complete, and current information when registering.',
      'ToolShed reserves the right to suspend or terminate accounts that violate these Terms.',
    ],
  },
  {
    title: '4. Listings',
    content: [
      'Owners may list tools they own or have authority to rent.',
      'Listing information must be accurate and not misleading.',
      'Tools must be in safe, working condition when made available for rental.',
      'ToolShed reserves the right to remove listings at our discretion.',
      'Owners set their own prices; ToolShed charges a 12% service fee on each transaction.',
    ],
  },
  {
    title: '5. Bookings and Payments',
    content: [
      'Renters pay at the time of booking. Payments are held and released to Owners after successful return.',
      'Security deposits, where charged, are released within 5 business days of return if no damage claim is filed.',
      'Cancellations are subject to the Owner\'s stated cancellation policy.',
      'ToolShed charges Renters a 3% payment processing fee.',
    ],
  },
  {
    title: '6. Damage and Disputes',
    content: [
      'Renters are responsible for returning tools in the same condition they were received.',
      'Damage claims must be filed within 24 hours of tool return via the ToolShed platform.',
      'ToolShed will mediate disputes but makes no guarantee of outcome.',
      'See our Liability Waiver for full details on damage responsibility.',
    ],
  },
  {
    title: '7. Prohibited Uses',
    content: [
      'Using the platform for any unlawful purpose.',
      'Listing tools you do not have authority to rent.',
      'Harassing, threatening, or defrauding other users.',
      'Circumventing ToolShed\'s payment system by arranging off-platform transactions.',
      'Scraping or copying platform content without written permission.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    content: [
      'To the fullest extent permitted by law, ToolShed is not liable for any indirect, incidental, special, or consequential damages.',
      'Our total liability to any user shall not exceed the greater of $100 or the amount paid to ToolShed in the 6 months preceding the claim.',
    ],
  },
  {
    title: '9. Governing Law',
    content: [
      'These Terms are governed by the laws of the Commonwealth of Massachusetts.',
      'Any disputes shall be resolved in courts located in Bristol County, Massachusetts.',
    ],
  },
  {
    title: '10. Changes to Terms',
    content: [
      'We may update these Terms at any time. Significant changes will be communicated via email.',
      'Continued use of ToolShed after changes constitutes acceptance of the updated Terms.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-12 px-4">
        <div className="container-app max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-brand-600" />
            </div>
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">Legal</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: January 1, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-app max-w-3xl mx-auto py-14 px-4">
        <p className="text-gray-600 leading-relaxed mb-10">
          These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you and ToolShed, Inc. (&ldquo;ToolShed,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your access to and use of the ToolShed platform. Please read these Terms carefully.
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

        <div className="mt-14 pt-8 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-4">Questions? Contact us at <a href="mailto:legal@toolshed.com" className="text-brand-600 hover:underline">legal@toolshed.com</a></p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>
            <Link href="/cookies" className="text-brand-600 hover:underline">Cookie Policy</Link>
            <Link href="/liability" className="text-brand-600 hover:underline">Liability Waiver</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

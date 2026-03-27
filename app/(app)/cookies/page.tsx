export const metadata = { title: 'Cookie Policy' }

export default function CookiesPage() {
  return (
    <div className="container-app py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2026</p>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. What Are Cookies</h2>
          <p className="text-gray-600 leading-relaxed">Cookies are small text files placed on your device by websites you visit. ToolShed uses cookies and similar technologies to deliver and improve our services, keep you signed in, and remember your preferences.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-1">Essential Cookies</h3>
              <p className="text-sm text-gray-600">Required for the platform to function. These include authentication tokens, session cookies, and security cookies. You cannot opt out of these.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-1">Performance Cookies</h3>
              <p className="text-sm text-gray-600">Help us understand how visitors interact with ToolShed by collecting anonymous usage data. Used to improve site performance and user experience.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-1">Functional Cookies</h3>
              <p className="text-sm text-gray-600">Remember your preferences such as location, search filters, and display settings to provide a more personalized experience.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-1">Marketing Cookies</h3>
              <p className="text-sm text-gray-600">Used to deliver relevant advertisements and track the effectiveness of our campaigns. You can opt out in your account settings.</p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Third-Party Cookies</h2>
          <p className="text-gray-600 leading-relaxed">We use trusted third-party services that may set their own cookies, including Clerk (authentication), Stripe (payments), and analytics providers. These services have their own privacy and cookie policies.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Managing Cookies</h2>
          <p className="text-gray-600 leading-relaxed">You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of ToolShed.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Contact</h2>
          <p className="text-gray-600 leading-relaxed">Questions about our cookie practices? Email <a href="mailto:privacy@toolshed.com" className="text-brand-600 hover:underline">privacy@toolshed.com</a>.</p>
        </section>
      </div>
    </div>
  )
}

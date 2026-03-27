export const metadata = { title: 'Liability Waiver' }

export default function LiabilityPage() {
  return (
    <div className="container-app py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Liability Waiver</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2026</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <p className="text-sm text-amber-800 font-medium">This waiver is agreed to by all users upon creating a ToolShed account and is incorporated into our Terms of Service.</p>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Assumption of Risk</h2>
          <p className="text-gray-600 leading-relaxed">By using ToolShed, you acknowledge that renting, borrowing, and operating tools and equipment involves inherent risks, including but not limited to personal injury, property damage, and death. You voluntarily assume all such risks associated with your use of any item rented through our platform.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Release of Liability</h2>
          <p className="text-gray-600 leading-relaxed">To the fullest extent permitted by applicable law, you hereby release, waive, discharge, and covenant not to sue ToolShed, Inc., its officers, directors, employees, agents, and successors from any and all claims, demands, or causes of action arising from or related to your use of items rented through our platform.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Owner Responsibilities</h2>
          <p className="text-gray-600 leading-relaxed">Owners who list items on ToolShed represent that their items are in safe, working condition. Owners remain liable for injuries or damages caused by defective equipment they knowingly listed in unsafe condition.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Renter Responsibilities</h2>
          <p className="text-gray-600 leading-relaxed">Renters agree to use all rented items in a safe and responsible manner, in accordance with manufacturer instructions and applicable law. Renters are solely responsible for any injury, damage, or liability arising from their use or misuse of rented items.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Insurance</h2>
          <p className="text-gray-600 leading-relaxed">ToolShed offers optional rental protection for eligible transactions. We strongly recommend that users maintain their own homeowner&apos;s, renter&apos;s, or general liability insurance to cover rental activities.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">This waiver shall be governed by the laws of the Commonwealth of Massachusetts. Any disputes shall be resolved in the courts of Bristol County, Massachusetts.</p>
        </section>
      </div>
    </div>
  )
}

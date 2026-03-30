export default function WaiverText() {
  return (
    <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
      <p className="font-semibold text-gray-900 text-base">ToolShed Rental Agreement & Liability Waiver</p>

      <p>This Rental Agreement (&quot;Agreement&quot;) is entered into between the Tool Owner (&quot;Owner&quot;) and the person booking the rental (&quot;Renter&quot;), facilitated by ToolShed, Inc. (&quot;ToolShed&quot;). By electronically signing below, Renter agrees to all terms and conditions herein.</p>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
        <strong>Important — ToolShed&apos;s Role:</strong> ToolShed is a peer-to-peer marketplace that connects Renters and Owners. ToolShed is not a party to the rental transaction, does not collect payments, does not hold deposits, and does not own or inspect any listed items. All financial arrangements are made directly between the Renter and Owner.
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">1. Renter Responsibilities</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Renter shall use the rented item(s) only for their intended purpose and in accordance with manufacturer guidelines.</li>
          <li>Renter is responsible for any damage beyond normal wear and tear caused during the rental period.</li>
          <li>Renter agrees to return all items in the same condition as received, at the agreed date and time.</li>
          <li>Renter shall not sublease, lend, or transfer the rented item(s) to any third party.</li>
          <li>Renter shall provide adequate safety equipment when required (e.g., safety glasses, gloves, hearing protection).</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">2. Owner Responsibilities</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Owner warrants that all listed items are in safe, functional working condition.</li>
          <li>Owner shall disclose any known defects, safety hazards, or operational quirks before rental.</li>
          <li>Owner shall not misrepresent the condition, capabilities, or age of any listed item.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">3. Payment & Deposit</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>All payment for rental fees is arranged directly between Renter and Owner. ToolShed does not process, hold, or transfer any funds.</li>
          <li>Any security deposit is set by the Owner, held by the Owner, and governed by an agreement between Renter and Owner only.</li>
          <li>ToolShed has no obligation to mediate payment disputes, refund deposits, or enforce any financial agreement between Renter and Owner.</li>
          <li>Renters are encouraged to use traceable payment methods (e.g., Venmo, PayPal, bank transfer) and to document the condition of items at check-in and check-out.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">4. Limitation of Liability</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>ToolShed is a technology platform and marketplace intermediary. ToolShed is not liable for personal injury, property damage, financial loss, or any other harm arising from the rental, use, or misuse of any item listed on the platform.</li>
          <li>Renter assumes all risk of injury or property damage resulting from use of the rented item(s).</li>
          <li>ToolShed makes no warranties — express or implied — regarding the condition, safety, suitability, or legality of any listed item.</li>
          <li>ToolShed&apos;s maximum aggregate liability to any party in connection with use of the platform shall not exceed $100.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">5. Dispute Resolution</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Disputes between Renters and Owners regarding damage, deposits, or item condition are the sole responsibility of the parties involved.</li>
          <li>ToolShed may, at its sole discretion, assist with mediation but is not obligated to do so and bears no liability for the outcome.</li>
          <li>Unresolved disputes may be pursued through small claims court in the jurisdiction where the rental occurred.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">6. Advertising & Affiliate Links</p>
        <p>ToolShed is supported by advertising revenue and affiliate partnerships. The platform may display advertisements based on browsing behavior and may earn commissions when users purchase products through affiliate links (including Amazon Associates). By using ToolShed, you consent to interest-based advertising as described in our <a href="/privacy" className="text-brand-600 underline">Privacy Policy</a>.</p>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">7. Governing Law</p>
        <p>This Agreement shall be governed by the laws of the State of Texas. Any disputes shall be resolved through binding arbitration in Travis County, Texas, except where prohibited by applicable law.</p>
      </div>
    </div>
  )
}

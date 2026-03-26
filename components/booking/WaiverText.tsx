export default function WaiverText() {
  return (
    <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
      <p className="font-semibold text-gray-900 text-base">ToolShed Rental Agreement & Liability Waiver</p>

      <p>This Rental Agreement (&quot;Agreement&quot;) is entered into between the Tool Owner (&quot;Owner&quot;) and the person booking the rental (&quot;Renter&quot;), facilitated by ToolShed, Inc. (&quot;ToolShed&quot;). By electronically signing below, Renter agrees to all terms and conditions herein.</p>

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
        <p className="font-semibold text-gray-800 mb-1">3. Damage & Deposit</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>A refundable security deposit is collected at booking and held in escrow by ToolShed.</li>
          <li>Deposit is released within 48 hours after check-out if no damage claim is filed.</li>
          <li>In the event of damage, Owner has 48 hours post check-out to file a claim via the ToolShed app.</li>
          <li>ToolShed will mediate disputes and make final deposit release/claim decisions based on photographic evidence and QR check-in/out records.</li>
          <li>Damage exceeding the deposit amount may be pursued through ToolShed&apos;s insurance partner or small claims court.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">4. Limitation of Liability</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>ToolShed is a marketplace facilitator and is not liable for personal injury, property damage, or loss arising from the use of rented items.</li>
          <li>Renter assumes all risk of injury or property damage resulting from use of the rented item(s).</li>
          <li>ToolShed&apos;s maximum liability in any dispute is limited to the total amount of the rental transaction.</li>
        </ul>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">5. Insurance</p>
        <p>Optional protection plans are available at checkout. The protection plan covers accidental damage up to the item&apos;s declared retail value, subject to a $50 deductible. Personal injury is not covered.</p>
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-1">6. Governing Law</p>
        <p>This Agreement shall be governed by the laws of the State of Texas. Any disputes shall be resolved through binding arbitration in Travis County, Texas.</p>
      </div>
    </div>
  )
}

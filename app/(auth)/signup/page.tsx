import Link from 'next/link'
import { Shield, CheckCircle2 } from 'lucide-react'

const PERKS = ['No listing fees', 'Instant Stripe payouts', 'Damage deposit protection', 'Community trust system']

export default function SignupPage() {
  return (
    <div className="w-full max-w-md">
      <div className="card p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an Account</h1>
        <p className="text-gray-500 text-sm mb-2">Join 14,000+ ToolShed members</p>

        <ul className="mb-6 space-y-1">
          {PERKS.map((p) => (
            <li key={p} className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle2 size={13} className="text-forest-500" />{p}
            </li>
          ))}
        </ul>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
              <input type="text" placeholder="Alex" className="input-base" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
              <input type="text" placeholder="Johnson" className="input-base" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" placeholder="you@example.com" className="input-base" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input type="password" placeholder="Min 8 characters" className="input-base" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">City / Zip Code</label>
            <input type="text" placeholder="Austin, TX or 78701" className="input-base" />
          </div>
          <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
            <input type="checkbox" className="mt-0.5 rounded" />
            I agree to ToolShed&apos;s{' '}
            <a href="#" className="text-brand-600 underline">Terms of Service</a>,{' '}
            <a href="#" className="text-brand-600 underline">Privacy Policy</a>, and{' '}
            <a href="#" className="text-brand-600 underline">Liability Waiver</a>.
          </label>
          <Link href="/" className="block w-full text-center px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors">
            Create Account
          </Link>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-600 font-semibold hover:text-brand-700">Sign in</Link>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400">
        <Shield size={12} />
        <span>Your data is encrypted and never sold</span>
      </div>
    </div>
  )
}

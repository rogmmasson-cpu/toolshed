import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="card p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h1>
        <p className="text-gray-500 text-sm mb-6">Welcome back to ToolShed</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" placeholder="you@example.com" className="input-base" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input type="password" placeholder="••••••••" className="input-base" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="rounded" />Remember me
            </label>
            <a href="#" className="text-sm text-brand-600 hover:text-brand-700">Forgot password?</a>
          </div>
          <Link href="/" className="block w-full text-center px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors">
            Sign In
          </Link>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">or continue with</span></div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
              <span>🔵</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
              <span>🍎</span> Apple
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-brand-600 font-semibold hover:text-brand-700">Sign up free</Link>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400">
        <Shield size={12} />
        <span>Secured by ToolShed · 256-bit SSL</span>
      </div>
    </div>
  )
}

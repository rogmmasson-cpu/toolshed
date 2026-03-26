import Link from 'next/link'
import { Wrench } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-orange-50 flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-gray-900 mb-8">
        <div className="flex items-center justify-center w-9 h-9 bg-brand-500 rounded-xl">
          <Wrench size={18} className="text-white" />
        </div>
        Tool<span className="text-brand-500">Shed</span>
      </Link>
      {children}
    </div>
  )
}

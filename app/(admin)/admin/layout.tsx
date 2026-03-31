import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Users, Package, AlertTriangle, FileText, Star, ShieldCheck, LogOut } from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/listings', label: 'Listings', icon: Package },
  { href: '/admin/disputes', label: 'Disputes', icon: AlertTriangle },
  { href: '/admin/agreements', label: 'Agreements', icon: FileText },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
]

export const metadata = { title: 'Admin — ToolShed' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminIds = (process.env.ADMIN_USER_IDS ?? '').split(',').map(s => s.trim()).filter(Boolean)
  const { userId } = await auth()
  if (!userId || !adminIds.includes(userId)) redirect('/')

  const user = await currentUser()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-gray-900 text-white flex flex-col">
        <div className="px-5 py-5 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-brand-400" />
            <span className="font-bold text-sm tracking-wide">ToolShed Admin</span>
          </div>
          {user && (
            <p className="text-xs text-gray-400 mt-1 truncate">{user.firstName} {user.lastName}</p>
          )}
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-gray-700">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut size={15} />
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

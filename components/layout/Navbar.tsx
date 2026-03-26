'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Wrench, Bell, MessageSquare, User, Plus, Search } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import Avatar from '@/components/ui/Avatar'

const navLinks = [
  { href: '/browse', label: 'Browse Tools' },
  { href: '/browse?category=power-tools', label: 'Power Tools' },
  { href: '/browse?category=garden', label: 'Garden' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-brand-600">
            <div className="flex items-center justify-center w-8 h-8 bg-brand-500 rounded-xl">
              <Wrench size={16} className="text-white" />
            </div>
            Tool<span className="text-brand-500">Shed</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === l.href
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search icon — mobile */}
            <Link href="/browse" className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 md:hidden">
              <Search size={20} />
            </Link>

            {/* List a tool */}
            <Link
              href="/listings/new"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
            >
              <Plus size={16} />
              List a Tool
            </Link>

            {/* Messages */}
            <Link href="/messages" className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600">
              <MessageSquare size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
            </Link>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600">
              <Bell size={20} />
            </button>

            {/* Profile */}
            <Link href="/dashboard" className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100">
              <Avatar
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face"
                name="Alex Johnson"
                size="sm"
              />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 mt-2">
            <Link
              href="/listings/new"
              className="block w-full text-center px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              + List a Tool
            </Link>
          </div>
          <div className="flex gap-2 pt-1">
            <Link href="/dashboard" className="flex-1 px-3 py-2 rounded-lg text-sm text-center text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
              <User size={14} className="inline mr-1" />Dashboard
            </Link>
            <Link href="/messages" className="flex-1 px-3 py-2 rounded-lg text-sm text-center text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
              <MessageSquare size={14} className="inline mr-1" />Messages
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

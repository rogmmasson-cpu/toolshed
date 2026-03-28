'use client'
import { useState, useRef, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth, useUser, useClerk } from '@clerk/nextjs'
import { Menu, X, Wrench, Bell, MessageSquare, User, Plus, Search, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [zip, setZip] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const { signOut } = useClerk()
  const zipRef = useRef<HTMLInputElement>(null)

  // Sync search state when navigating away from /browse
  useEffect(() => {
    if (!pathname.startsWith('/browse')) {
      setQuery('')
      setZip('')
    }
  }, [pathname])

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (zip.trim()) params.set('zip', zip.trim())
    router.push(`/browse?${params.toString()}`)
    setMobileOpen(false)
  }

  const displayName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] ?? 'Account'
  const avatarUrl = user?.imageUrl

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-app">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-brand-600 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 bg-brand-500 rounded-xl">
              <Wrench size={16} className="text-white" />
            </div>
            Tool<span className="text-brand-500">Shed</span>
          </Link>

          {/* Search bar — desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl items-center gap-0 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
            {/* Keyword input */}
            <div className="flex items-center gap-2 flex-1 px-3 py-2.5 min-w-0">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Tab') { e.preventDefault(); zipRef.current?.focus() } }}
                placeholder="What tool do you need?"
                className="flex-1 text-sm text-gray-900 outline-none placeholder-gray-400 bg-transparent min-w-0"
              />
            </div>
            {/* Divider */}
            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
            {/* ZIP input */}
            <div className="flex items-center gap-1.5 px-3 py-2.5 w-32 flex-shrink-0">
              <MapPin size={14} className="text-gray-400 flex-shrink-0" />
              <input
                ref={zipRef}
                type="text"
                value={zip}
                onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="ZIP code"
                inputMode="numeric"
                className="w-full text-sm text-gray-900 outline-none placeholder-gray-400 bg-transparent"
              />
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="flex-shrink-0 h-full px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
            >
              Search
            </button>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
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

            {/* Signed-out: Sign in */}
            {isLoaded && !isSignedIn && (
              <Link
                href="/login"
                className="hidden sm:block px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Sign in
              </Link>
            )}

            {/* Signed-in: Messages + Notifications + Avatar */}
            {isLoaded && isSignedIn && (
              <>
                <Link href="/messages" className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600">
                  <MessageSquare size={20} />
                </Link>

                <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </Link>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 focus:outline-none"
                  >
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-bold">
                        {displayName[0].toUpperCase()}
                      </div>
                    )}
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
                          <p className="text-xs text-gray-400 truncate">{user?.emailAddresses?.[0]?.emailAddress}</p>
                        </div>
                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
                        <Link href={`/profile/${user?.id ?? 'me'}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                        <Link href="/disputes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>Disputes</Link>
                        <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>Settings</Link>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

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
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-3">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="space-y-2">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="What tool do you need?"
                className="flex-1 text-sm text-gray-900 outline-none placeholder-gray-400 bg-transparent"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={zip}
                  onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="ZIP code"
                  inputMode="numeric"
                  className="flex-1 text-sm text-gray-900 outline-none placeholder-gray-400 bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Go
              </button>
            </div>
          </form>

          <div className="border-t border-gray-100 pt-2">
            <Link
              href="/listings/new"
              className="block w-full text-center px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              + List a Tool
            </Link>
          </div>

          {isSignedIn && (
            <>
              <div className="flex gap-2">
                <Link href="/dashboard" className="flex-1 px-3 py-2 rounded-lg text-sm text-center text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                  <User size={14} className="inline mr-1" />Dashboard
                </Link>
                <Link href="/messages" className="flex-1 px-3 py-2 rounded-lg text-sm text-center text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                  <MessageSquare size={14} className="inline mr-1" />Messages
                </Link>
              </div>
              <button
                className="w-full px-3 py-2 rounded-lg text-sm text-center text-red-500 hover:bg-red-50"
                onClick={() => { setMobileOpen(false); handleSignOut() }}
              >
                Sign Out
              </button>
            </>
          )}

          {!isSignedIn && (
            <div className="flex gap-2">
              <Link href="/login" className="flex-1 px-3 py-2 rounded-lg text-sm text-center text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
              <Link href="/signup" className="flex-1 px-3 py-2 rounded-lg text-sm text-center font-semibold text-brand-600 hover:bg-brand-50" onClick={() => setMobileOpen(false)}>
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

'use client'
import { useState } from 'react'
import { User, Bell, CreditCard, Shield, LogOut, Camera, CheckCircle2 } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import { MOCK_USERS, CURRENT_USER_ID } from '@/lib/data/mock-users'

const SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'payout', label: 'Payout & Payments', icon: CreditCard },
  { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
]

export default function SettingsPage() {
  const me = MOCK_USERS.find(u => u.id === CURRENT_USER_ID)!
  const [activeSection, setActiveSection] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: me.name,
    bio: me.bio ?? '',
    city: me.location.city,
    state: me.location.state,
    email: me.email,
  })
  const [notifPrefs, setNotifPrefs] = useState({
    bookingRequests: true,
    messages: true,
    depositUpdates: true,
    reviews: true,
    reminders: true,
    marketing: false,
  })

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="container-app py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <div className="lg:col-span-1">
          <nav className="card p-2 space-y-0.5">
            {SECTIONS.map(s => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                    activeSection === s.id
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  {s.label}
                </button>
              )
            })}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">

          {/* Profile */}
          {activeSection === 'profile' && (
            <form onSubmit={handleSave} className="card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Profile Information</h2>
                {saved && (
                  <span className="flex items-center gap-1.5 text-forest-600 text-sm font-medium">
                    <CheckCircle2 size={16} /> Saved!
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar src={me.avatarUrl} name={me.name} size="xl" />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-brand-500 hover:bg-brand-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                  >
                    <Camera size={14} />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{me.name}</p>
                  <p className="text-xs text-gray-500">Member since {new Date(me.memberSince).getFullYear()}</p>
                  <button type="button" className="text-xs text-brand-600 font-medium mt-1 hover:text-brand-700">
                    Upload new photo
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">State</label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                    maxLength={2}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  rows={3}
                  placeholder="Tell neighbors a little about yourself…"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">{form.bio.length}/300 characters</p>
              </div>

              {/* Verification badges */}
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">Verified Badges</p>
                <div className="flex flex-wrap gap-2">
                  {(['email', 'phone', 'id', 'payment'] as const).map(badge => {
                    const has = me.badges.includes(badge)
                    return (
                      <div key={badge} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${has ? 'bg-forest-100 text-forest-700' : 'bg-gray-100 text-gray-400'}`}>
                        {has ? <CheckCircle2 size={12} /> : <span className="w-3 h-3 rounded-full border-2 border-gray-300 inline-block" />}
                        {badge === 'id' ? 'ID Verified' : badge.charAt(0).toUpperCase() + badge.slice(1)}
                        {!has && <button type="button" className="ml-1 text-brand-600 font-semibold">Verify →</button>}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-sm transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="card p-6 space-y-5">
              <h2 className="font-semibold text-gray-900">Notification Preferences</h2>
              <div className="space-y-4">
                {(Object.entries(notifPrefs) as [keyof typeof notifPrefs, boolean][]).map(([key, val]) => {
                  const labels: Record<keyof typeof notifPrefs, { title: string; desc: string }> = {
                    bookingRequests: { title: 'Booking requests', desc: 'When someone wants to rent your tool' },
                    messages: { title: 'New messages', desc: 'When you receive a message from another user' },
                    depositUpdates: { title: 'Deposit updates', desc: 'When deposits are held or released' },
                    reviews: { title: 'New reviews', desc: 'When someone leaves you a review' },
                    reminders: { title: 'Return reminders', desc: 'Reminders before a rental is due back' },
                    marketing: { title: 'Tips & promotions', desc: 'Product updates, community news, and offers' },
                  }
                  return (
                    <div key={key} className="flex items-center justify-between gap-4 py-1">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{labels[key].title}</p>
                        <p className="text-xs text-gray-500">{labels[key].desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifPrefs(p => ({ ...p, [key]: !val }))}
                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${val ? 'bg-brand-500' : 'bg-gray-200'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${val ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Payout */}
          {activeSection === 'payout' && (
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Payout Method</h2>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard size={18} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">No payout method added</p>
                    <p className="text-xs text-gray-500">Add a bank account to receive rental earnings</p>
                  </div>
                </div>
                <button className="w-full py-2.5 border-2 border-dashed border-brand-300 text-brand-600 font-semibold text-sm rounded-xl hover:bg-brand-50 transition-colors">
                  + Add Bank Account
                </button>
              </div>

              <div className="card p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Payment Methods</h2>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard size={18} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">No card on file</p>
                    <p className="text-xs text-gray-500">Required to rent tools and hold deposits</p>
                  </div>
                </div>
                <button className="w-full py-2.5 border-2 border-dashed border-brand-300 text-brand-600 font-semibold text-sm rounded-xl hover:bg-brand-50 transition-colors">
                  + Add Card
                </button>
              </div>
            </div>
          )}

          {/* Privacy */}
          {activeSection === 'privacy' && (
            <div className="space-y-4">
              <div className="card p-6 space-y-4">
                <h2 className="font-semibold text-gray-900">Privacy Settings</h2>
                {[
                  { label: 'Show my location on map', desc: 'Let renters see your approximate neighborhood', defaultOn: true },
                  { label: 'Show my profile publicly', desc: 'Anyone can view your profile and reviews', defaultOn: true },
                  { label: 'Allow message requests', desc: 'Let users message you before booking', defaultOn: true },
                ].map((item, i) => {
                  const [on, setOn] = useState(item.defaultOn)
                  return (
                    <div key={i} className="flex items-center justify-between gap-4 py-1">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setOn(v => !v)}
                        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-brand-500' : 'bg-gray-200'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="card p-6 border-red-100">
                <h2 className="font-semibold text-red-600 mb-1">Danger Zone</h2>
                <p className="text-xs text-gray-500 mb-4">These actions are irreversible. Please be certain.</p>
                <div className="space-y-2">
                  <button className="w-full py-2.5 border border-red-200 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors">
                    Deactivate Account
                  </button>
                  <button className="w-full py-2.5 border border-red-300 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors">
                    Delete Account Permanently
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

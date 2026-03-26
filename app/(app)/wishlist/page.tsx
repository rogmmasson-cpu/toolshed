'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Plus, MapPin, Clock, CheckCircle2, MessageSquare } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants/categories'
import { ToolCategory } from '@/lib/types'
import { formatCents } from '@/lib/utils/formatting'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { MOCK_USERS } from '@/lib/data/mock-users'
import { cn } from '@/lib/utils/cn'

const MOCK_REQUESTS = [
  { id: 'wr1', title: 'Pressure washer for deck cleaning', category: 'cleaning' as ToolCategory, requesterId: 'usr_4', location: 'Mueller', maxDailyRate: 3500, neededBy: '2024-04-25', fulfilled: false, createdAt: '2024-04-10', desc: 'Need to clean a large deck before painting. Looking for a ~2000 PSI electric washer for a weekend.' },
  { id: 'wr2', title: 'Extension ladder (at least 24ft)', category: 'construction' as ToolCategory, requesterId: 'usr_current', location: 'Hyde Park', maxDailyRate: 2500, neededBy: '2024-05-01', fulfilled: false, createdAt: '2024-04-08', desc: 'Cleaning gutters on a two-story house. Need for one afternoon.' },
  { id: 'wr3', title: 'Stand mixer for wedding cake baking', category: 'kitchen' as ToolCategory, requesterId: 'usr_1', location: 'East Austin', maxDailyRate: 2000, neededBy: '2024-04-20', fulfilled: true, createdAt: '2024-04-01', desc: 'Making 4 wedding cakes. Would love a KitchenAid or similar for 2 days.' },
  { id: 'wr4', title: 'Concrete mixer for patio project', category: 'construction' as ToolCategory, requesterId: 'usr_5', location: 'North Loop', maxDailyRate: 5000, neededBy: null, fulfilled: false, createdAt: '2024-04-12', desc: 'Pouring a 12x16ft patio. Need for a full weekend, possibly two.' },
  { id: 'wr5', title: 'Tile saw for bathroom remodel', category: 'power-tools' as ToolCategory, requesterId: 'usr_4', location: 'Mueller', maxDailyRate: 4500, neededBy: '2024-05-15', fulfilled: false, createdAt: '2024-04-13', desc: 'Full bathroom retile. Need a wet tile saw for 3-4 days.' },
]

export default function WishlistPage() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', category: '' as ToolCategory | '', desc: '', maxRate: '', neededBy: '' })
  const [submitted, setSubmitted] = useState(false)

  const filtered = MOCK_REQUESTS.filter(r => activeCategory === 'all' || r.category === activeCategory)

  return (
    <div className="container-app py-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tool Request Board</h1>
          <p className="text-gray-500 mt-1">Don't see what you need? Post a request — owners with matching tools will reach out.</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={16}/>Post a Request
        </Button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCategory('all')}
          className={cn('px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors', activeCategory === 'all' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
        >
          All Requests
        </button>
        {CATEGORIES.slice(0, 8).map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value === activeCategory ? 'all' : cat.value)}
            className={cn('px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1', activeCategory === cat.value ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(req => {
          const requester = MOCK_USERS.find(u => u.id === req.requesterId)!
          const cat = CATEGORIES.find(c => c.value === req.category)!
          return (
            <div key={req.id} className={cn('card p-5', req.fulfilled && 'opacity-60')}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 leading-snug">{req.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className={`badge ${cat.color}`}>{cat.emoji} {cat.label}</span>
                    <span className="flex items-center gap-1"><MapPin size={10}/>{req.location}</span>
                  </div>
                </div>
                {req.fulfilled && <Badge variant="success">Fulfilled</Badge>}
              </div>

              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{req.desc}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                {req.maxDailyRate && (
                  <span>Max: <span className="font-semibold text-gray-700">{formatCents(req.maxDailyRate)}/day</span></span>
                )}
                {req.neededBy && (
                  <span className="flex items-center gap-1"><Clock size={10}/>Needed by {req.neededBy}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar src={requester.avatarUrl} name={requester.name} size="xs"/>
                  <span className="text-xs text-gray-600">{requester.name}</span>
                  <span className="text-xs text-gray-400">· Trust {requester.trustScore}</span>
                </div>
                {!req.fulfilled && req.requesterId !== 'usr_current' && (
                  <Link href="/messages" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold rounded-lg transition-colors">
                    <MessageSquare size={12}/>I have this!
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Post request modal */}
      <Modal open={showModal} onClose={() => { setShowModal(false); setSubmitted(false) }} title="Post a Tool Request" size="md">
        {submitted ? (
          <div className="p-6 text-center">
            <div className="text-5xl mb-3">📣</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Posted!</h3>
            <p className="text-gray-500 text-sm mb-4">Tool owners near {form.category || 'you'} will see your request and reach out if they have a match.</p>
            <Button onClick={() => { setShowModal(false); setSubmitted(false) }}>Done</Button>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">What do you need?</label>
              <input
                className="input-base"
                placeholder='e.g. "Pressure washer for deck cleaning"'
                value={form.title}
                onChange={e => setForm(f => ({...f, title: e.target.value}))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select className="input-base" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value as ToolCategory}))}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Details</label>
              <textarea rows={3} className="input-base resize-none" placeholder="Describe your project and how long you need it..." value={form.desc} onChange={e => setForm(f => ({...f, desc: e.target.value}))}/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Rate ($/day)</label>
                <input type="number" className="input-base" placeholder="25.00" value={form.maxRate} onChange={e => setForm(f => ({...f, maxRate: e.target.value}))}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Needed By</label>
                <input type="date" className="input-base" value={form.neededBy} onChange={e => setForm(f => ({...f, neededBy: e.target.value}))}/>
              </div>
            </div>
            <Button className="w-full" disabled={!form.title || !form.category} onClick={() => setSubmitted(true)}>
              Post Request
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}

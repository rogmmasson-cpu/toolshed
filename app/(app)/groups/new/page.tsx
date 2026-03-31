'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, X, Users, Lock, Globe } from 'lucide-react'
import { createGroup } from '@/lib/actions/groups'

export default function CreateGroupPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [rules, setRules] = useState<string[]>([''])

  function addRule() {
    setRules(prev => [...prev, ''])
  }

  function updateRule(i: number, val: string) {
    setRules(prev => prev.map((r, idx) => idx === i ? val : r))
  }

  function removeRule(i: number) {
    setRules(prev => prev.filter((_, idx) => idx !== i))
  }

  function submit() {
    if (!name.trim() || !description.trim() || !city.trim() || !state.trim()) {
      setError('Name, description, city, and state are required.')
      return
    }
    setError('')
    startTransition(async () => {
      try {
        const id = await createGroup({ name, description, city, state, neighborhood, coverImageUrl, rules: rules.filter(r => r.trim()), isPrivate })
        router.push(`/groups/${id}`)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to create group')
      }
    })
  }

  return (
    <div className="container-app py-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/groups" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create a Group</h1>
          <p className="text-sm text-gray-500">Build a tool-sharing community in your neighborhood</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Group Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Oakwood Street Neighbors"
            className="input-base w-full"
            maxLength={80}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description <span className="text-red-500">*</span></label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What kinds of tools does your group share? Who can join?"
            className="input-base w-full resize-none"
            rows={3}
            maxLength={500}
          />
          <p className="text-xs text-gray-400 mt-1">{description.length}/500</p>
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">City <span className="text-red-500">*</span></label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Boston" className="input-base w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">State <span className="text-red-500">*</span></label>
            <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="MA" className="input-base w-full" maxLength={2} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Neighborhood <span className="text-xs text-gray-400">(optional)</span></label>
          <input type="text" value={neighborhood} onChange={e => setNeighborhood(e.target.value)} placeholder="e.g. South End" className="input-base w-full" />
        </div>

        {/* Cover image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image URL <span className="text-xs text-gray-400">(optional)</span></label>
          <input type="url" value={coverImageUrl} onChange={e => setCoverImageUrl(e.target.value)} placeholder="https://..." className="input-base w-full" />
          {coverImageUrl && (
            <img src={coverImageUrl} alt="preview" className="mt-2 h-28 w-full object-cover rounded-xl" onError={() => setCoverImageUrl('')} />
          )}
        </div>

        {/* Rules */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-700">Group Rules <span className="text-xs text-gray-400">(optional)</span></label>
            <button type="button" onClick={addRule} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
              <Plus size={12} />Add rule
            </button>
          </div>
          <div className="space-y-2">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-5 h-5 flex-shrink-0 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <input
                  type="text"
                  value={rule}
                  onChange={e => updateRule(i, e.target.value)}
                  placeholder="e.g. Return items clean and on time"
                  className="input-base flex-1 text-sm"
                />
                {rules.length > 1 && (
                  <button type="button" onClick={() => removeRule(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Privacy</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsPrivate(false)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-colors ${!isPrivate ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Globe size={16} className={!isPrivate ? 'text-brand-600' : 'text-gray-400'} />
              <div>
                <p className={`text-sm font-semibold ${!isPrivate ? 'text-brand-700' : 'text-gray-700'}`}>Public</p>
                <p className="text-xs text-gray-500">Anyone can find and join</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setIsPrivate(true)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-colors ${isPrivate ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Lock size={16} className={isPrivate ? 'text-brand-600' : 'text-gray-400'} />
              <div>
                <p className={`text-sm font-semibold ${isPrivate ? 'text-brand-700' : 'text-gray-700'}`}>Private</p>
                <p className="text-xs text-gray-500">Invite only</p>
              </div>
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={submit}
            disabled={isPending}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors"
          >
            <Users size={16} />
            {isPending ? 'Creating…' : 'Create Group'}
          </button>
          <Link href="/groups" className="px-5 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm transition-colors">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}

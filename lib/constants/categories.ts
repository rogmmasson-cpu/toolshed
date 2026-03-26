import { ToolCategory } from '@/lib/types'

export interface CategoryDef {
  value: ToolCategory
  label: string
  emoji: string
  description: string
  color: string
}

export const CATEGORIES: CategoryDef[] = [
  {
    value: 'power-tools',
    label: 'Power Tools',
    emoji: '⚡',
    description: 'Drills, saws, sanders, grinders',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: 'hand-tools',
    label: 'Hand Tools',
    emoji: '🔧',
    description: 'Hammers, wrenches, screwdrivers',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    value: 'garden',
    label: 'Garden',
    emoji: '🌱',
    description: 'Mowers, tillers, hedge trimmers',
    color: 'bg-green-100 text-green-800',
  },
  {
    value: 'cleaning',
    label: 'Cleaning',
    emoji: '🧹',
    description: 'Pressure washers, steam cleaners',
    color: 'bg-cyan-100 text-cyan-800',
  },
  {
    value: 'automotive',
    label: 'Automotive',
    emoji: '🔩',
    description: 'Jack stands, tire changers, diagnostic tools',
    color: 'bg-gray-100 text-gray-800',
  },
  {
    value: 'construction',
    label: 'Construction',
    emoji: '🏗️',
    description: 'Scaffolding, concrete mixers, levels',
    color: 'bg-orange-100 text-orange-800',
  },
  {
    value: 'painting',
    label: 'Painting',
    emoji: '🎨',
    description: 'Sprayers, rollers, ladders',
    color: 'bg-pink-100 text-pink-800',
  },
  {
    value: 'plumbing',
    label: 'Plumbing',
    emoji: '🚰',
    description: 'Pipe threaders, drain snakes, pipe cutters',
    color: 'bg-sky-100 text-sky-800',
  },
  {
    value: 'electrical',
    label: 'Electrical',
    emoji: '💡',
    description: 'Multimeters, wire strippers, conduit benders',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    value: 'moving',
    label: 'Moving',
    emoji: '📦',
    description: 'Dollies, furniture pads, straps',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    value: 'outdoor',
    label: 'Outdoor',
    emoji: '⛺',
    description: 'Camping gear, generators, fire pits',
    color: 'bg-emerald-100 text-emerald-800',
  },
  {
    value: 'kitchen',
    label: 'Kitchen',
    emoji: '👨‍🍳',
    description: 'Stand mixers, food processors, sous vide',
    color: 'bg-red-100 text-red-800',
  },
  {
    value: 'other',
    label: 'Other',
    emoji: '📦',
    description: 'Everything else',
    color: 'bg-slate-100 text-slate-800',
  },
]

export const getCategoryDef = (value: ToolCategory): CategoryDef =>
  CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[CATEGORIES.length - 1]

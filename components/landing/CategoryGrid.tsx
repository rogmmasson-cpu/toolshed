import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants/categories'

export default function CategoryGrid() {
  const shown = CATEGORIES.filter((c) => c.value !== 'other')
  return (
    <section className="py-16">
      <div className="container-app">
        <div className="text-center mb-10">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">Find exactly what you need for your next project</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {shown.map((cat) => (
            <Link
              key={cat.value}
              href={`/browse?category=${cat.value}`}
              className="card-hover flex flex-col items-center gap-2 p-4 rounded-2xl text-center group hover:-translate-y-0.5 transition-transform"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-brand-600">{cat.label}</span>
              <span className="text-xs text-gray-400">{cat.description.split(',')[0]}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

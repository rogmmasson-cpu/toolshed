import { DollarSign, Users, Wrench } from 'lucide-react'

const PILLARS = [
  {
    icon: <Wrench size={24} className="text-brand-500" />,
    title: 'Rent instead of buy',
    desc: 'Need a tile saw for one weekend? Borrow it from someone nearby for a fraction of the purchase price.',
  },
  {
    icon: <DollarSign size={24} className="text-brand-500" />,
    title: 'Earn from what you own',
    desc: 'Your drill sits in a drawer 350 days a year. List it on ToolShed and earn while your neighbors put it to work.',
  },
  {
    icon: <Users size={24} className="text-brand-500" />,
    title: 'Built for your neighborhood',
    desc: 'ToolShed is a community of neighbors helping each other tackle projects. Every rental strengthens local trust.',
  },
]

export default function WhatIsToolShed() {
  return (
    <section className="py-16 bg-white">
      <div className="container-app">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            What is ToolShed?
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            ToolShed is a peer-to-peer tool and equipment rental marketplace for the South Coast of Massachusetts.
            Renters save money. Owners earn money. The neighborhood wins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((p, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 mb-4">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

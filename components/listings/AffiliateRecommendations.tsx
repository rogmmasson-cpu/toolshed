'use client'

import { ExternalLink, ShoppingCart, Info } from 'lucide-react'
import { ToolCategory } from '@/lib/types'
import {
  getAffiliateProducts,
  getHomeDepotProducts,
  amazonSearchUrl,
  homeDepotSearchUrl,
} from '@/lib/constants/affiliates'
import { useState } from 'react'

interface Props {
  category: ToolCategory
  listingTitle: string
}

export default function AffiliateRecommendations({ category, listingTitle }: Props) {
  const [disclosureOpen, setDisclosureOpen] = useState(false)
  const { section, products: amazonProducts } = getAffiliateProducts(category, listingTitle, 4)
  const hdProducts = getHomeDepotProducts(category, listingTitle, 3)

  if (amazonProducts.length === 0 && hdProducts.length === 0) return null

  return (
    <div className="border border-amber-100 bg-amber-50 rounded-2xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShoppingCart size={16} className="text-amber-600 flex-shrink-0" />
          <h2 className="font-semibold text-gray-900">{section.heading}</h2>
        </div>
        <button
          onClick={() => setDisclosureOpen((v) => !v)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 shrink-0"
          aria-label="Affiliate disclosure"
        >
          <Info size={12} />
          <span>Affiliate links</span>
        </button>
      </div>

      {disclosureOpen && (
        <p className="text-xs text-gray-500 bg-white border border-gray-100 rounded-lg px-3 py-2 leading-relaxed">
          ToolShed earns a small commission when you purchase through these links at no extra cost
          to you. We only recommend consumables and accessories commonly needed with this type of rental.
        </p>
      )}

      {/* Amazon grid */}
      {amazonProducts.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-wide mb-2">
            Amazon
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {amazonProducts.map((product) => (
              <a
                key={product.name}
                href={amazonSearchUrl(product.searchQuery)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group bg-white border border-amber-100 hover:border-amber-300 hover:shadow-sm rounded-xl p-3 flex flex-col gap-1.5 transition-all"
              >
                <span className="self-start text-[10px] font-semibold bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 leading-none">
                  amazon
                </span>
                <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 leading-snug line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-auto pt-1.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-forest-600">{product.priceRange}</span>
                  <ExternalLink size={11} className="text-gray-300 group-hover:text-brand-400 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Home Depot grid */}
      {hdProducts.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold text-orange-700 uppercase tracking-wide mb-2">
            Home Depot
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {hdProducts.map((product) => (
              <a
                key={product.name}
                href={homeDepotSearchUrl(product.searchQuery)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group bg-white border border-orange-100 hover:border-orange-300 hover:shadow-sm rounded-xl p-3 flex flex-col gap-1.5 transition-all"
              >
                <span className="self-start text-[10px] font-semibold bg-orange-100 text-orange-700 rounded-full px-2 py-0.5 leading-none">
                  home depot
                </span>
                <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 leading-snug line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-auto pt-1.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-forest-600">{product.priceRange}</span>
                  <ExternalLink size={11} className="text-gray-300 group-hover:text-orange-400 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <p className="text-[11px] text-gray-400 leading-relaxed">
        Prices are estimates — check each retailer for current pricing. ToolShed earns commissions
        as an Amazon Associate and through the Home Depot affiliate program via Impact.com.
      </p>
    </div>
  )
}

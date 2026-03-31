import { NextRequest, NextResponse } from 'next/server'
import { ToolCategory } from '@/lib/types'

// Map UPCitemdb category strings → ToolShed categories
const CATEGORY_MAP: [RegExp, ToolCategory][] = [
  [/power.?tool|drill|saw|sander|grinder|jigsaw|circular|recipro|rotary|impact.?driver|nail.?gun|staple/i, 'power-tools'],
  [/hand.?tool|hammer|wrench|screwdriver|plier|chisel|level|tape.?measure|utility.?knife|socket/i, 'hand-tools'],
  [/lawn|garden|mow|tiller|hedge|edger|leaf|cultivat|outdoor.?power|sprinkler|hose/i, 'garden'],
  [/pressure.?wash|steam.?clean|carpet.?clean|vacuum|floor.?clean|power.?wash/i, 'cleaning'],
  [/automotive|car.?lift|floor.?jack|jack.?stand|tire|obd|diagnostic|creeper|torque/i, 'automotive'],
  [/construction|scaffold|concrete|cement|mixer|laser.?level|transit/i, 'construction'],
  [/paint|sprayer|roller|airless|brush.?set|paint.?gun/i, 'painting'],
  [/plumb|pipe.?wrench|snake|drain|solder|pipe.?cutter|pex|basin.?wrench/i, 'plumbing'],
  [/electric|wire|conduit|multimeter|voltage|circuit|outlet|panel/i, 'electrical'],
  [/dolly|hand.?truck|furniture.?pad|moving.?blanket|appliance.?dolly|strap/i, 'moving'],
  [/camp|generator|tent|lantern|solar|fire.?pit|outdoor.?heater|space.?heater/i, 'outdoor'],
  [/kitchen|mixer|blender|food.?processor|sous.?vide|waffle|coffee|espresso|instant.?pot/i, 'kitchen'],
  [/tent|canopy|table|chair|bouncer|bounce.?house|party|event/i, 'party-rentals'],
  [/baby|infant|stroller|carrier|car.?seat|crib|pack.?n.?play|bouncer/i, 'kids'],
  [/trailer|hitch|tow/i, 'trailers'],
]

function mapCategory(raw: string): ToolCategory {
  for (const [pattern, cat] of CATEGORY_MAP) {
    if (pattern.test(raw)) return cat
  }
  return 'other'
}

function parseBrand(title: string, knownBrand: string): string {
  if (knownBrand) return knownBrand
  // Common tool brands at start of title
  const brands = ['DeWalt','Milwaukee','Makita','Bosch','Ryobi','Ridgid','Craftsman','Stanley','Black+Decker','Husky','Klein','Channellock','Irwin','Hilti','Metabo','Festool','Snap-on','Mac Tools','Kobalt','Hart','Worx','Greenworks','EGO','Sun Joe','Generac','Honda','Briggs','Troy-Bilt','Husqvarna','Stihl','Echo','Oregon','KitchenAid','Cuisinart','Vitamix','Instant Pot','Ninja','Breville']
  for (const b of brands) {
    if (title.toLowerCase().startsWith(b.toLowerCase())) return b
  }
  return ''
}

export async function GET(req: NextRequest) {
  const upc = req.nextUrl.searchParams.get('upc')?.replace(/\D/g, '')
  if (!upc || upc.length < 8) {
    return NextResponse.json({ error: 'Invalid UPC' }, { status: 400 })
  }

  try {
    // Try UPCitemdb first (free tier: 100/day, no key needed for trial)
    const res = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 86400 }, // cache 24h
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const data = await res.json()
    const item = data.items?.[0]
    if (!item) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const rawCategory = [item.category, item.gcategory, ...(item.stores?.map((s: { category?: string }) => s.category) ?? [])].filter(Boolean).join(' ')
    const category = mapCategory(rawCategory + ' ' + item.title)
    const brand = parseBrand(item.title ?? '', item.brand ?? '')

    // Best retail price: highest list price across offers
    const prices = [
      item.highest_recorded_price,
      ...(item.offers?.map((o: { list_price?: number }) => o.list_price) ?? []),
    ].filter(Boolean)
    const retailPrice = prices.length > 0 ? Math.max(...prices) : null

    // Best image
    const images: string[] = item.images ?? item.offers?.flatMap((o: { images?: string[] }) => o.images ?? []) ?? []

    return NextResponse.json({
      upc,
      title: item.title ?? '',
      brand,
      model: item.model ?? '',
      description: item.description ?? '',
      category,
      images: images.slice(0, 3),
      retailPrice, // dollars (not cents)
    })
  } catch {
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
  }
}

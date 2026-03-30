import { ToolCategory } from '@/lib/types'

export interface AffiliateProduct {
  name: string
  description: string
  priceRange: string
  keywords: string[]
  searchQuery: string
  tag: 'amazon' | 'home-depot'
}

export interface AffiliateSectionDef {
  heading: string
  products: AffiliateProduct[]
}

// ── Amazon Associates ────────────────────────────────────────────────────────
export const getAssociateTag = () =>
  process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG ?? 'toolshed0f6-20'

export const amazonSearchUrl = (query: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${getAssociateTag()}`

// ── Home Depot (Impact.com) ──────────────────────────────────────────────────
// Sign up: https://www.impactradius.com/brand-signup/ → search "Home Depot"
// Once approved, set NEXT_PUBLIC_HOME_DEPOT_IMPACT_ID to your Impact publisher ID.
// Without it, links go directly to homedepot.com (still works, just untracked).
export const getHomeDepotImpactId = () =>
  process.env.NEXT_PUBLIC_HOME_DEPOT_IMPACT_ID ?? ''

export const homeDepotSearchUrl = (query: string) => {
  const dest = `https://www.homedepot.com/s/${encodeURIComponent(query)}`
  const impactId = getHomeDepotImpactId()
  if (impactId) {
    // Impact.com deep-link format for Home Depot (offer 1602185, campaign 17276)
    return `https://goto.homedepot.com/c/${impactId}/1602185/17276?u=${encodeURIComponent(dest)}`
  }
  return dest
}

// ── Per-category affiliate product definitions ──────────────────────────────

const AFFILIATE_MAP: Record<ToolCategory, AffiliateSectionDef> = {
  'power-tools': {
    heading: "Consumables & supplies you'll need",
    products: [
      {
        name: 'Drill Bit Set',
        description: 'HSS titanium-coated bits for wood, metal & plastic',
        priceRange: '$12 – $35',
        keywords: ['drill', 'driver', 'impact'],
        searchQuery: 'drill bit set titanium hss',
        tag: 'amazon',
      },
      {
        name: 'Circular Saw Blades',
        description: 'Carbide-tipped blades for wood, OSB & plywood',
        priceRange: '$15 – $40',
        keywords: ['saw', 'circular', 'miter', 'track saw'],
        searchQuery: 'circular saw blades carbide wood cutting',
        tag: 'amazon',
      },
      {
        name: 'Sanding Discs / Belts',
        description: 'Assorted grits for finish & material removal',
        priceRange: '$8 – $25',
        keywords: ['sander', 'grinder', 'polisher'],
        searchQuery: 'sanding discs assorted grit orbital sander',
        tag: 'amazon',
      },
      {
        name: 'Safety Glasses',
        description: 'ANSI Z87.1 rated — required for all power tool work',
        priceRange: '$6 – $20',
        keywords: [],
        searchQuery: 'safety glasses ansi z87 clear lens',
        tag: 'amazon',
      },
      {
        name: 'Hearing Protection',
        description: 'Foam earplugs or earmuffs, 28 NRR rated',
        priceRange: '$5 – $18',
        keywords: [],
        searchQuery: 'hearing protection earplugs 28 nrr construction',
        tag: 'amazon',
      },
      {
        name: 'Heavy-Duty Extension Cord',
        description: '12 AWG, 25–50 ft, outdoor rated',
        priceRange: '$18 – $45',
        keywords: [],
        searchQuery: 'heavy duty extension cord 12 awg 50 ft outdoor',
        tag: 'amazon',
      },
    ],
  },

  'hand-tools': {
    heading: "Supplies to go with your hand tools",
    products: [
      {
        name: 'Work Gloves',
        description: 'Cut-resistant mechanics gloves for grip & protection',
        priceRange: '$10 – $28',
        keywords: [],
        searchQuery: 'work gloves cut resistant mechanics',
        tag: 'amazon',
      },
      {
        name: 'Penetrating Oil',
        description: 'Loosens frozen bolts & rusted fasteners',
        priceRange: '$6 – $14',
        keywords: ['wrench', 'socket', 'ratchet', 'bolt'],
        searchQuery: 'penetrating oil frozen bolts PB blaster',
        tag: 'amazon',
      },
      {
        name: 'Measuring Tape (25 ft)',
        description: 'Wide blade, auto-lock, magnetic tip',
        priceRange: '$10 – $22',
        keywords: ['level', 'square', 'layout'],
        searchQuery: '25 ft measuring tape auto lock magnetic',
        tag: 'amazon',
      },
      {
        name: 'Carpenter Pencils & Chalk Line',
        description: 'Marking kit for layout and cut lines',
        priceRange: '$5 – $15',
        keywords: ['square', 'level', 'layout', 'framing'],
        searchQuery: 'carpenter pencils chalk line marking kit',
        tag: 'amazon',
      },
    ],
  },

  'garden': {
    heading: "Garden supplies you'll want on hand",
    products: [
      {
        name: 'Garden Gloves (3-pack)',
        description: 'Nitrile-coated for thorns, digging & pruning',
        priceRange: '$10 – $20',
        keywords: [],
        searchQuery: 'garden gloves nitrile coated 3 pack',
        tag: 'amazon',
      },
      {
        name: 'Lawn & Leaf Bags (50-pack)',
        description: 'Heavy-duty paper bags for clippings & debris',
        priceRange: '$12 – $22',
        keywords: ['mower', 'blower', 'trimmer', 'edger'],
        searchQuery: 'lawn leaf bags heavy duty paper 50 pack',
        tag: 'amazon',
      },
      {
        name: 'String Trimmer Line',
        description: '0.080" – 0.095" replacement spool for most trimmers',
        priceRange: '$8 – $20',
        keywords: ['trimmer', 'weed', 'string', 'edger'],
        searchQuery: 'string trimmer replacement line 0.095 spool',
        tag: 'amazon',
      },
      {
        name: 'All-Purpose Fertilizer',
        description: '10-10-10 granular — pre- or post-project soil boost',
        priceRange: '$14 – $30',
        keywords: ['tiller', 'aerator', 'spreader'],
        searchQuery: 'all purpose granular fertilizer 10-10-10',
        tag: 'amazon',
      },
      {
        name: 'Knee Pads',
        description: 'Foam-padded for planting, weeding & edging',
        priceRange: '$12 – $25',
        keywords: [],
        searchQuery: 'garden knee pads foam padded',
        tag: 'amazon',
      },
    ],
  },

  'cleaning': {
    heading: "Cleaning supplies & consumables",
    products: [
      {
        name: 'Pressure Washer Detergent',
        description: 'Multi-surface soap concentrate, 1 gal',
        priceRange: '$12 – $25',
        keywords: ['pressure washer', 'power wash'],
        searchQuery: 'pressure washer soap concentrate multi surface gallon',
        tag: 'amazon',
      },
      {
        name: 'Microfiber Towels (24-pack)',
        description: 'Lint-free for drying, buffing & detail work',
        priceRange: '$14 – $22',
        keywords: [],
        searchQuery: 'microfiber towels 24 pack cleaning detail',
        tag: 'amazon',
      },
      {
        name: 'Rubber Gloves (3-pack)',
        description: 'Chemical-resistant for cleaners & degreasers',
        priceRange: '$8 – $16',
        keywords: [],
        searchQuery: 'rubber gloves chemical resistant reusable cleaning',
        tag: 'amazon',
      },
      {
        name: 'Vacuum Bags / Filters',
        description: 'Universal replacement — check your model before ordering',
        priceRange: '$8 – $20',
        keywords: ['vacuum', 'shop vac'],
        searchQuery: 'replacement vacuum bags filters shop vac universal',
        tag: 'amazon',
      },
    ],
  },

  'automotive': {
    heading: "Auto supplies for your project",
    products: [
      {
        name: 'Nitrile Gloves (100-ct)',
        description: 'Powder-free mechanic gloves, oil & grease resistant',
        priceRange: '$12 – $20',
        keywords: [],
        searchQuery: 'nitrile gloves 100 count mechanic powder free',
        tag: 'amazon',
      },
      {
        name: 'Shop Rags (50-ct)',
        description: 'Heavy-weight cotton rags for oil, grease & fluids',
        priceRange: '$10 – $18',
        keywords: [],
        searchQuery: 'shop rags 50 count cotton heavy duty mechanic',
        tag: 'amazon',
      },
      {
        name: 'Penetrating Oil Spray',
        description: 'Loosens rusted bolts & seized parts',
        priceRange: '$6 – $14',
        keywords: ['wrench', 'impact', 'socket'],
        searchQuery: 'penetrating oil spray rust remover bolt loosener',
        tag: 'amazon',
      },
      {
        name: 'Safety Jack Stands (pair)',
        description: '3-ton rated stands — always use with any jack',
        priceRange: '$25 – $55',
        keywords: ['jack', 'lift', 'floor jack'],
        searchQuery: 'jack stands 3 ton pair safety steel',
        tag: 'amazon',
      },
      {
        name: 'Brake Parts Cleaner',
        description: 'Fast-drying solvent spray for rotors & calipers',
        priceRange: '$6 – $12',
        keywords: ['brake', 'caliper', 'rotor'],
        searchQuery: 'brake parts cleaner spray non-chlorinated',
        tag: 'amazon',
      },
    ],
  },

  'construction': {
    heading: "Safety gear & job site supplies",
    products: [
      {
        name: 'Hard Hat',
        description: 'ANSI Type I Class E — required on most job sites',
        priceRange: '$14 – $35',
        keywords: [],
        searchQuery: 'hard hat ansi type 1 class e construction',
        tag: 'amazon',
      },
      {
        name: 'N95 Respirator Masks (10-pk)',
        description: 'For concrete, drywall & insulation dust',
        priceRange: '$12 – $28',
        keywords: ['mixer', 'grinder', 'saw', 'drywall'],
        searchQuery: 'n95 respirator masks 10 pack construction dust',
        tag: 'amazon',
      },
      {
        name: 'Work Gloves — Heavy Duty',
        description: 'Cut-level A4, padded palm for rough materials',
        priceRange: '$12 – $30',
        keywords: [],
        searchQuery: 'heavy duty work gloves cut resistant A4 padded palm',
        tag: 'amazon',
      },
      {
        name: 'Chalk Reel & Line',
        description: 'Snap-line for layout on slabs, subfloor & framing',
        priceRange: '$8 – $18',
        keywords: ['level', 'layout', 'framing', 'slab'],
        searchQuery: 'chalk reel line construction layout',
        tag: 'amazon',
      },
      {
        name: 'Concrete Mixing Paddles',
        description: '1/2" drill-shank paddle for mortar, grout & thinset',
        priceRange: '$10 – $22',
        keywords: ['mixer', 'concrete', 'mortar'],
        searchQuery: 'concrete mixing paddle 1/2 inch drill attachment',
        tag: 'amazon',
      },
    ],
  },

  'painting': {
    heading: "Prep supplies & painting consumables",
    products: [
      {
        name: "Painter's Tape (6-pack)",
        description: '1" & 2" widths — clean removal up to 14 days',
        priceRange: '$12 – $22',
        keywords: [],
        searchQuery: "painter's tape 6 pack multi surface clean release",
        tag: 'amazon',
      },
      {
        name: 'Drop Cloths (3-pack)',
        description: '9×12 canvas — protects floors & furniture',
        priceRange: '$18 – $35',
        keywords: [],
        searchQuery: 'canvas drop cloth 9x12 3 pack painting',
        tag: 'amazon',
      },
      {
        name: 'Paint Roller & Tray Kit',
        description: '9" frame, 2 covers + tray — semi & rough surfaces',
        priceRange: '$10 – $20',
        keywords: ['roller', 'paint'],
        searchQuery: 'paint roller tray kit 9 inch covers',
        tag: 'amazon',
      },
      {
        name: 'Sprayer Tip / Filter Kit',
        description: 'Replacement tips & inlet filters for airless sprayers',
        priceRange: '$12 – $30',
        keywords: ['sprayer', 'airless', 'hvlp'],
        searchQuery: 'airless paint sprayer tip filter replacement kit',
        tag: 'amazon',
      },
      {
        name: 'Latex Gloves (50-ct)',
        description: 'Disposable — keep hands clean during spray & roll work',
        priceRange: '$8 – $14',
        keywords: [],
        searchQuery: 'latex gloves disposable 50 count painting',
        tag: 'amazon',
      },
    ],
  },

  'plumbing': {
    heading: "Plumbing supplies & fittings",
    products: [
      {
        name: "Plumber's Tape (10-pack)",
        description: 'PTFE thread seal tape — fits all NPT threaded fittings',
        priceRange: '$6 – $14',
        keywords: [],
        searchQuery: "plumber's tape PTFE thread seal 10 pack",
        tag: 'amazon',
      },
      {
        name: 'PVC Primer & Cement Kit',
        description: 'Purple primer + clear cement for ABS/PVC joints',
        priceRange: '$10 – $20',
        keywords: ['pvc', 'pipe', 'drain'],
        searchQuery: 'PVC primer cement kit purple clear ABS',
        tag: 'amazon',
      },
      {
        name: 'Pipe Cutter Set',
        description: '1/4"–2" mini cutters for copper & PEX',
        priceRange: '$10 – $25',
        keywords: ['copper', 'pex', 'tubing'],
        searchQuery: 'pipe cutter set copper PEX mini tubing',
        tag: 'amazon',
      },
      {
        name: 'Rubber Gloves (chemical-rated)',
        description: 'Long-cuff protection against drain chemicals',
        priceRange: '$8 – $16',
        keywords: ['drain', 'snake', 'auger'],
        searchQuery: 'rubber gloves chemical resistant long cuff plumbing',
        tag: 'amazon',
      },
    ],
  },

  'electrical': {
    heading: "Electrical supplies & safety gear",
    products: [
      {
        name: 'Wire Connectors / Nuts (200-ct)',
        description: 'Assorted orange, yellow, red twist-on connectors',
        priceRange: '$8 – $16',
        keywords: [],
        searchQuery: 'wire connectors nuts assorted 200 count twist on',
        tag: 'amazon',
      },
      {
        name: 'Electrical Tape (10-pack)',
        description: 'UL-listed vinyl tape, 3/4" × 66 ft rolls',
        priceRange: '$8 – $18',
        keywords: [],
        searchQuery: 'electrical tape vinyl 3/4 inch 10 pack UL listed',
        tag: 'amazon',
      },
      {
        name: 'Non-Contact Voltage Tester',
        description: 'Detect live wires safely before every cut',
        priceRange: '$12 – $28',
        keywords: ['wire', 'outlet', 'panel', 'circuit'],
        searchQuery: 'non contact voltage tester pen electrical safety',
        tag: 'amazon',
      },
      {
        name: 'Cable Staples & Ties (kit)',
        description: 'Romex staples + zip ties for neat wire runs',
        priceRange: '$8 – $18',
        keywords: ['wire', 'conduit', 'romex'],
        searchQuery: 'cable staples zip ties electrical wiring kit romex',
        tag: 'amazon',
      },
      {
        name: 'Insulated Rubber Gloves',
        description: 'Class 00 rated to 500V for low-voltage work',
        priceRange: '$18 – $40',
        keywords: [],
        searchQuery: 'insulated rubber gloves class 00 500v electrical',
        tag: 'amazon',
      },
    ],
  },

  'moving': {
    heading: "Moving supplies & packing materials",
    products: [
      {
        name: 'Moving Boxes (25-pack, mixed)',
        description: 'Small, medium & large corrugated boxes',
        priceRange: '$25 – $45',
        keywords: [],
        searchQuery: 'moving boxes mixed 25 pack corrugated cardboard',
        tag: 'amazon',
      },
      {
        name: 'Packing Tape + Dispenser',
        description: '3-roll heavy-duty tape + ergonomic dispenser gun',
        priceRange: '$10 – $20',
        keywords: [],
        searchQuery: 'packing tape dispenser 3 rolls heavy duty moving',
        tag: 'amazon',
      },
      {
        name: 'Stretch Wrap (4-pack)',
        description: 'Self-adhesive wrap for bundling furniture & appliances',
        priceRange: '$18 – $30',
        keywords: [],
        searchQuery: 'stretch wrap 4 pack moving furniture bundling',
        tag: 'amazon',
      },
      {
        name: 'Furniture Sliders (8-pack)',
        description: 'Reusable felt + plastic sliders for hardwood & carpet',
        priceRange: '$10 – $20',
        keywords: ['dolly', 'cart', 'furniture'],
        searchQuery: 'furniture sliders 8 pack hardwood carpet reusable',
        tag: 'amazon',
      },
      {
        name: 'Ratchet Straps (4-pack)',
        description: '1" × 15 ft, 500 lb working load for securing loads',
        priceRange: '$18 – $30',
        keywords: ['truck', 'trailer', 'dolly'],
        searchQuery: 'ratchet straps 4 pack 1 inch 15 ft 500 lb',
        tag: 'amazon',
      },
    ],
  },

  'outdoor': {
    heading: "Outdoor & camping supplies",
    products: [
      {
        name: 'Propane Fuel Canisters (4-pack)',
        description: '1 lb canisters — fits most camp stoves & lanterns',
        priceRange: '$12 – $22',
        keywords: ['stove', 'grill', 'lantern', 'heater'],
        searchQuery: 'propane fuel canister 1 lb 4 pack camping',
        tag: 'amazon',
      },
      {
        name: 'AA / AAA Batteries (48-ct)',
        description: 'Alkaline multipack for lights, radios & gear',
        priceRange: '$14 – $22',
        keywords: ['lantern', 'light', 'flashlight', 'radio'],
        searchQuery: 'AA AAA alkaline batteries 48 pack multipack',
        tag: 'amazon',
      },
      {
        name: 'Fire Starters (64-ct)',
        description: 'Waterproof cubes — lights wet wood in under 8 min',
        priceRange: '$8 – $16',
        keywords: ['fire pit', 'fireplace', 'campfire', 'grill'],
        searchQuery: 'fire starters waterproof cubes 64 count camping',
        tag: 'amazon',
      },
      {
        name: 'Insect Repellent Spray',
        description: 'DEET-based protection for extended outdoor work',
        priceRange: '$6 – $16',
        keywords: [],
        searchQuery: 'insect repellent DEET spray outdoor protection',
        tag: 'amazon',
      },
    ],
  },

  'kitchen': {
    heading: "Supplies to go with your kitchen rental",
    products: [
      {
        name: 'Parchment Paper Rolls (2-pk)',
        description: 'Pre-cut sheets for baking, lining & food wrapping',
        priceRange: '$8 – $16',
        keywords: ['mixer', 'oven', 'bake'],
        searchQuery: 'parchment paper rolls baking pre cut sheets 2 pack',
        tag: 'amazon',
      },
      {
        name: 'Vacuum Sealer Bags (50-ct)',
        description: 'BPA-free bags for sous vide & food storage',
        priceRange: '$12 – $20',
        keywords: ['sous vide', 'vacuum', 'sealer'],
        searchQuery: 'vacuum sealer bags BPA free sous vide 50 count',
        tag: 'amazon',
      },
      {
        name: 'Food Processor Blades Kit',
        description: 'Universal S-blade, shred & slice disc set',
        priceRange: '$12 – $25',
        keywords: ['food processor', 'chopper', 'blender'],
        searchQuery: 'food processor blade kit replacement s-blade disc',
        tag: 'amazon',
      },
      {
        name: 'Ice Cream Rock Salt (4 lb)',
        description: 'Morton coarse ice cream salt for old-fashioned makers',
        priceRange: '$6 – $12',
        keywords: ['ice cream', 'maker', 'churn'],
        searchQuery: 'rock salt ice cream maker Morton coarse 4 lb',
        tag: 'amazon',
      },
    ],
  },

  'party-rentals': {
    heading: "Party supplies & décor",
    products: [
      {
        name: 'Disposable Tablecloths (10-pk)',
        description: 'Plastic roll tablecloths — 54" × 108" fits 6-ft tables',
        priceRange: '$10 – $18',
        keywords: [],
        searchQuery: 'disposable tablecloths plastic 54x108 10 pack',
        tag: 'amazon',
      },
      {
        name: 'Heavy-Duty Paper Plates (125-ct)',
        description: 'Soak-proof, microwavable plates for large events',
        priceRange: '$12 – $20',
        keywords: [],
        searchQuery: 'heavy duty paper plates soak proof 125 count',
        tag: 'amazon',
      },
      {
        name: 'Catering Chafing Dish Fuel',
        description: 'Wick gel fuel cans (24-pack) for food warmers',
        priceRange: '$18 – $30',
        keywords: ['chafing', 'warmer', 'buffet', 'catering'],
        searchQuery: 'chafing dish fuel gel wick cans 24 pack catering',
        tag: 'amazon',
      },
      {
        name: 'Party Balloon Pump (electric)',
        description: 'Inflates latex & foil balloons 10× faster by hand',
        priceRange: '$12 – $25',
        keywords: ['balloon', 'decor', 'inflator'],
        searchQuery: 'electric balloon pump inflator latex foil fast',
        tag: 'amazon',
      },
    ],
  },

  'kids': {
    heading: "Accessories & consumables for kids gear",
    products: [
      {
        name: 'AA Batteries (48-ct)',
        description: 'Alkaline — most ride-on toys, monitors & swings use AA',
        priceRange: '$14 – $22',
        keywords: ['ride-on', 'power wheels', 'toy', 'swing'],
        searchQuery: 'AA batteries alkaline 48 pack kids toys',
        tag: 'amazon',
      },
      {
        name: 'Pack-n-Play Fitted Sheet (2-pk)',
        description: 'Jersey cotton — fits most standard playard mattresses',
        priceRange: '$12 – $20',
        keywords: ['pack', 'play', 'crib', 'playard'],
        searchQuery: 'pack n play fitted sheet 2 pack jersey cotton',
        tag: 'amazon',
      },
      {
        name: 'Inflatable Pool Patch Kit',
        description: 'PVC patches + vinyl cement — works on bounce houses too',
        priceRange: '$6 – $14',
        keywords: ['bounce', 'inflatable', 'pool', 'water'],
        searchQuery: 'inflatable pool patch kit PVC vinyl cement repair',
        tag: 'amazon',
      },
      {
        name: 'Kids Sunscreen SPF 50 (2-pk)',
        description: 'Reef-safe mineral sunscreen — outdoor play ready',
        priceRange: '$12 – $20',
        keywords: [],
        searchQuery: 'kids sunscreen SPF 50 mineral reef safe 2 pack',
        tag: 'amazon',
      },
    ],
  },

  'trailers': {
    heading: "Trailer supplies & tie-down gear",
    products: [
      {
        name: 'Ratchet Tie-Down Straps (4-pk)',
        description: '2" × 27 ft, 3,300 lb break strength',
        priceRange: '$22 – $40',
        keywords: [],
        searchQuery: 'ratchet tie down straps 4 pack 2 inch 27 ft 3300 lb',
        tag: 'amazon',
      },
      {
        name: 'Wheel Chocks (4-pk)',
        description: 'Rubber chocks to stabilize trailer during loading',
        priceRange: '$14 – $25',
        keywords: [],
        searchQuery: 'wheel chocks rubber 4 pack trailer stabilizer',
        tag: 'amazon',
      },
      {
        name: 'Trailer Hitch Ball (2" standard)',
        description: '2" ball, 1" shank — fits most Class II/III receivers',
        priceRange: '$10 – $20',
        keywords: [],
        searchQuery: 'trailer hitch ball 2 inch standard class 3 receiver',
        tag: 'amazon',
      },
      {
        name: 'Trailer Wiring Harness',
        description: '4-pin flat connector — universal brake/signal/running lights',
        priceRange: '$8 – $18',
        keywords: [],
        searchQuery: '4 pin trailer wiring harness flat connector universal',
        tag: 'amazon',
      },
      {
        name: 'Bearing Buddy Protectors (pair)',
        description: 'Press-in grease caps — extend hub bearing life',
        priceRange: '$12 – $25',
        keywords: [],
        searchQuery: 'bearing buddy protectors pair grease cap trailer hub',
        tag: 'amazon',
      },
    ],
  },

  'other': {
    heading: "Useful supplies for your project",
    products: [
      {
        name: 'Work Gloves (3-pk)',
        description: 'Nitrile-coated palm, touchscreen-compatible fingertips',
        priceRange: '$10 – $22',
        keywords: [],
        searchQuery: 'work gloves nitrile coated 3 pack touchscreen',
        tag: 'amazon',
      },
      {
        name: 'Safety Glasses (3-pk)',
        description: 'ANSI Z87.1 rated, anti-scratch clear lenses',
        priceRange: '$8 – $16',
        keywords: [],
        searchQuery: 'safety glasses 3 pack ANSI Z87.1 anti scratch',
        tag: 'amazon',
      },
      {
        name: 'Heavy-Duty Extension Cord',
        description: '12 AWG, 25 ft, outdoor-rated with 3 outlets',
        priceRange: '$18 – $35',
        keywords: [],
        searchQuery: 'heavy duty extension cord 12 awg 25 ft outdoor 3 outlet',
        tag: 'amazon',
      },
    ],
  },
}

// ── Helper: get products for a category, filtered by listing title keywords ──

export function getAffiliateProducts(
  category: ToolCategory,
  listingTitle: string,
  maxProducts = 4,
): { section: AffiliateSectionDef; products: AffiliateProduct[] } {
  const section = AFFILIATE_MAP[category] ?? AFFILIATE_MAP['other']
  const titleLower = listingTitle.toLowerCase()

  // Prioritise products whose keywords match the listing title
  const sorted = [...section.products].sort((a, b) => {
    const aMatch = a.keywords.some((k) => titleLower.includes(k)) ? 1 : 0
    const bMatch = b.keywords.some((k) => titleLower.includes(k)) ? 1 : 0
    return bMatch - aMatch
  })

  return { section, products: sorted.slice(0, maxProducts) }
}

// ── Home Depot product map ───────────────────────────────────────────────────
// Focused on HD's strengths: building materials, paint, lumber, bulk hardware,
// plumbing fixtures, electrical supplies, garden center — complementary to Amazon.

const HD_MAP: Partial<Record<ToolCategory, AffiliateProduct[]>> = {
  'power-tools': [
    {
      name: 'Wood Screws (1 lb box assorted)',
      description: 'Coarse-thread screws in #6, #8, #10 — covers most projects',
      priceRange: '$8 – $18',
      keywords: ['drill', 'driver', 'screw'],
      searchQuery: 'wood screws assorted 1 lb box',
      tag: 'home-depot',
    },
    {
      name: 'Sandpaper Sheets (assorted, 25-pk)',
      description: '60 / 80 / 120 / 220 grit — stock up before you sand',
      priceRange: '$8 – $16',
      keywords: ['sander', 'grinder', 'orbital'],
      searchQuery: 'sandpaper sheets assorted grit 25 pack',
      tag: 'home-depot',
    },
    {
      name: 'Construction Adhesive (tube)',
      description: 'Liquid Nails or Loctite PL — bonds wood, concrete & more',
      priceRange: '$5 – $10',
      keywords: ['nailer', 'brad', 'finish'],
      searchQuery: 'construction adhesive liquid nails tube',
      tag: 'home-depot',
    },
    {
      name: 'Safety Goggles',
      description: 'Anti-fog wraparound goggles for cutting & grinding',
      priceRange: '$6 – $16',
      keywords: [],
      searchQuery: 'safety goggles anti-fog wraparound',
      tag: 'home-depot',
    },
  ],

  'hand-tools': [
    {
      name: 'Drywall Anchors & Screws Kit',
      description: 'Assorted toggle bolts, plastic anchors & screws',
      priceRange: '$6 – $14',
      keywords: ['screw', 'drill', 'wall'],
      searchQuery: 'drywall anchors screws assorted kit',
      tag: 'home-depot',
    },
    {
      name: 'Utility Knife + Blades (10-pk)',
      description: 'Retractable box cutter with replacement blades',
      priceRange: '$6 – $12',
      keywords: [],
      searchQuery: 'utility knife replacement blades 10 pack retractable',
      tag: 'home-depot',
    },
    {
      name: 'Stud Finder',
      description: 'Magnetic or electronic — finds studs, live wires & pipes',
      priceRange: '$12 – $30',
      keywords: ['level', 'square', 'framing'],
      searchQuery: 'stud finder electronic magnetic wall',
      tag: 'home-depot',
    },
  ],

  'garden': [
    {
      name: 'Garden Soil (1 cu ft bag)',
      description: 'Miracle-Gro or equivalent enriched garden soil',
      priceRange: '$8 – $14',
      keywords: ['tiller', 'aerator', 'cultivator'],
      searchQuery: 'garden soil 1 cubic foot bag',
      tag: 'home-depot',
    },
    {
      name: 'Mulch (2 cu ft bag)',
      description: 'Hardwood or cedar mulch for beds & borders',
      priceRange: '$5 – $10',
      keywords: ['mower', 'edger', 'blower'],
      searchQuery: 'mulch 2 cubic foot bag hardwood cedar',
      tag: 'home-depot',
    },
    {
      name: 'Garden Hose (50 ft)',
      description: 'Kink-resistant expandable hose with spray nozzle',
      priceRange: '$18 – $40',
      keywords: ['sprinkler', 'irrigation', 'water'],
      searchQuery: 'garden hose 50 ft kink resistant',
      tag: 'home-depot',
    },
    {
      name: 'Weed Barrier Fabric (3×50 ft)',
      description: 'Landscape fabric for beds and pathways',
      priceRange: '$10 – $20',
      keywords: ['tiller', 'edger'],
      searchQuery: 'weed barrier landscape fabric 3x50',
      tag: 'home-depot',
    },
  ],

  'cleaning': [
    {
      name: 'Zep Heavy-Duty Degreaser',
      description: 'Commercial-strength spray for concrete, grease & grime',
      priceRange: '$8 – $14',
      keywords: ['pressure washer', 'power wash', 'steam'],
      searchQuery: 'Zep heavy duty degreaser spray',
      tag: 'home-depot',
    },
    {
      name: 'Shop-Vac Filters & Bags',
      description: 'OEM-compatible cartridge filter + collection bags',
      priceRange: '$10 – $20',
      keywords: ['vacuum', 'shop vac', 'shop-vac'],
      searchQuery: 'shop vac filter bags replacement',
      tag: 'home-depot',
    },
    {
      name: 'Pressure Washer Surface Cleaner',
      description: 'Spin-arm attachment for fast, streak-free driveway cleaning',
      priceRange: '$25 – $55',
      keywords: ['pressure washer', 'power wash'],
      searchQuery: 'pressure washer surface cleaner attachment',
      tag: 'home-depot',
    },
  ],

  'automotive': [
    {
      name: 'Oil Drain Pan (5 qt)',
      description: 'Low-profile pan with pour spout for oil changes',
      priceRange: '$8 – $16',
      keywords: ['jack', 'oil', 'drain'],
      searchQuery: 'oil drain pan 5 quart pour spout',
      tag: 'home-depot',
    },
    {
      name: 'Floor Dry Absorbent (50 lb)',
      description: 'Clay-based spill absorbent for oil, gas & fluids',
      priceRange: '$10 – $20',
      keywords: [],
      searchQuery: 'floor dry absorbent oil spill 50 lb',
      tag: 'home-depot',
    },
    {
      name: 'Automotive Touch-Up Spray Paint',
      description: 'Rust-Oleum enamel for undercarriage & trim',
      priceRange: '$6 – $12',
      keywords: ['paint', 'body', 'rust'],
      searchQuery: 'automotive touch up spray paint rust-oleum',
      tag: 'home-depot',
    },
  ],

  'construction': [
    {
      name: 'Quikrete Fast-Setting Concrete (50 lb)',
      description: 'Sets in 20–40 min — posts, footings & repairs',
      priceRange: '$8 – $14',
      keywords: ['mixer', 'concrete', 'post'],
      searchQuery: 'quikrete fast setting concrete mix 50 lb',
      tag: 'home-depot',
    },
    {
      name: 'Deck Screws (5 lb box, 3")',
      description: 'Coarse-thread exterior screws, weather-resistant coating',
      priceRange: '$14 – $24',
      keywords: ['nailer', 'drill', 'deck', 'framing'],
      searchQuery: 'deck screws 3 inch 5 lb box exterior',
      tag: 'home-depot',
    },
    {
      name: 'Drywall (4×8 sheet)',
      description: '1/2" or 5/8" standard gypsum — available for in-store pickup',
      priceRange: '$12 – $18',
      keywords: ['drywall', 'sheetrock', 'wall'],
      searchQuery: 'drywall 4x8 1/2 inch gypsum board',
      tag: 'home-depot',
    },
    {
      name: 'Construction Foam & Caulk Kit',
      description: 'Great Stuff expanding foam + paintable latex caulk',
      priceRange: '$10 – $20',
      keywords: ['framing', 'insulation', 'window', 'door'],
      searchQuery: 'great stuff expanding foam caulk kit',
      tag: 'home-depot',
    },
  ],

  'painting': [
    {
      name: 'Interior Paint (1 gal, custom mix)',
      description: 'Custom-mixed in any color in-store — flat, eggshell or semi-gloss',
      priceRange: '$28 – $55',
      keywords: [],
      searchQuery: 'interior paint 1 gallon eggshell',
      tag: 'home-depot',
    },
    {
      name: 'Purdy Nylox Brush Set',
      description: '2" & 3" angle sash brushes — pro-grade nylon/polyester blend',
      priceRange: '$14 – $28',
      keywords: ['brush', 'paint'],
      searchQuery: 'Purdy paint brush set angle sash nylox',
      tag: 'home-depot',
    },
    {
      name: 'Primer (1 gal)',
      description: 'PVA or drywall primer for new surfaces & stain blocking',
      priceRange: '$16 – $30',
      keywords: ['prime', 'primer', 'drywall', 'spray'],
      searchQuery: 'interior primer 1 gallon PVA drywall',
      tag: 'home-depot',
    },
    {
      name: 'Paintable Caulk (6-pk)',
      description: 'DAP Alex Plus latex caulk — fills gaps before painting',
      priceRange: '$12 – $20',
      keywords: [],
      searchQuery: 'paintable latex caulk DAP 6 pack',
      tag: 'home-depot',
    },
  ],

  'plumbing': [
    {
      name: 'SharkBite Push-to-Connect Fittings',
      description: 'No-solder elbows, couplings & tees for 1/2" – 3/4" pipe',
      priceRange: '$6 – $18 each',
      keywords: ['copper', 'pex', 'pipe'],
      searchQuery: 'SharkBite push connect fittings 1/2 inch',
      tag: 'home-depot',
    },
    {
      name: 'Toilet Wax Ring + Bolts',
      description: 'Standard wax seal with plastic horn — fits all toilets',
      priceRange: '$8 – $14',
      keywords: ['toilet', 'flange', 'drain'],
      searchQuery: 'toilet wax ring bolts standard horn',
      tag: 'home-depot',
    },
    {
      name: 'P-Trap Kit (1-1/2")',
      description: 'PVC P-trap with extension & slip joint for sink drains',
      priceRange: '$6 – $12',
      keywords: ['drain', 'sink', 'trap'],
      searchQuery: 'PVC P-trap kit 1-1/2 inch sink drain',
      tag: 'home-depot',
    },
    {
      name: 'Faucet Supply Lines (2-pk)',
      description: 'Braided stainless 12" lines for hot & cold connections',
      priceRange: '$8 – $14',
      keywords: ['faucet', 'sink', 'supply'],
      searchQuery: 'braided faucet supply lines 12 inch stainless 2 pack',
      tag: 'home-depot',
    },
  ],

  'electrical': [
    {
      name: 'Romex Wire (25 ft, 14-2)',
      description: 'NM-B sheathed cable for 15-amp circuits',
      priceRange: '$20 – $35',
      keywords: ['wire', 'romex', 'circuit'],
      searchQuery: 'romex 14-2 NM-B wire 25 ft',
      tag: 'home-depot',
    },
    {
      name: 'GFCI Outlet (2-pk)',
      description: '15A tamper-resistant GFCI receptacle — kitchens, baths & outdoors',
      priceRange: '$16 – $28',
      keywords: ['outlet', 'receptacle', 'gfci'],
      searchQuery: 'GFCI outlet 15A tamper resistant 2 pack',
      tag: 'home-depot',
    },
    {
      name: 'Electrical Junction Box',
      description: 'Single-gang PVC or metal new-work box',
      priceRange: '$1 – $5',
      keywords: ['box', 'outlet', 'switch'],
      searchQuery: 'electrical junction box single gang new work',
      tag: 'home-depot',
    },
    {
      name: 'Circuit Breaker (15A or 20A)',
      description: 'Square D or Eaton single-pole breaker — specify your panel brand',
      priceRange: '$8 – $18',
      keywords: ['panel', 'breaker', 'circuit'],
      searchQuery: 'single pole circuit breaker 15 amp 20 amp',
      tag: 'home-depot',
    },
  ],

  'moving': [
    {
      name: 'Moving Boxes Bundle (10-pk)',
      description: 'Medium corrugated boxes — available for same-day in-store pickup',
      priceRange: '$12 – $22',
      keywords: [],
      searchQuery: 'moving boxes medium 10 pack corrugated',
      tag: 'home-depot',
    },
    {
      name: 'Moving Blankets (4-pk)',
      description: 'Woven furniture pads — protects appliances, tables & mirrors',
      priceRange: '$20 – $40',
      keywords: ['dolly', 'furniture', 'appliance'],
      searchQuery: 'moving blankets furniture pads 4 pack',
      tag: 'home-depot',
    },
    {
      name: 'Heavy-Duty Rope (50 ft)',
      description: '3/8" braided nylon — secure loads on trucks or trailers',
      priceRange: '$10 – $18',
      keywords: ['truck', 'trailer', 'cart'],
      searchQuery: 'nylon rope 3/8 inch 50 ft braided',
      tag: 'home-depot',
    },
  ],

  'outdoor': [
    {
      name: 'Propane Tank (20 lb)',
      description: 'Pre-filled 20 lb propane tank — or exchange your empty at store',
      priceRange: '$18 – $28 (exchange)',
      keywords: ['grill', 'heater', 'stove', 'generator'],
      searchQuery: 'propane tank 20 lb exchange',
      tag: 'home-depot',
    },
    {
      name: 'Extension Cord Reel (100 ft)',
      description: '12 AWG retractable reel — ideal for generators & outdoor tools',
      priceRange: '$35 – $65',
      keywords: ['generator', 'compressor', 'outdoor'],
      searchQuery: 'extension cord reel 100 ft 12 AWG retractable',
      tag: 'home-depot',
    },
    {
      name: 'Ground Stakes & Tie-Down Kit',
      description: 'Auger stakes + ratchet straps for tent and canopy anchoring',
      priceRange: '$12 – $25',
      keywords: ['tent', 'canopy', 'pop-up'],
      searchQuery: 'ground stakes auger tent tie down kit',
      tag: 'home-depot',
    },
  ],

  'trailers': [
    {
      name: 'Trailer Coupler Lock',
      description: 'Hardened steel ball coupler lock — deters theft during storage',
      priceRange: '$14 – $28',
      keywords: [],
      searchQuery: 'trailer coupler lock ball hitch security',
      tag: 'home-depot',
    },
    {
      name: 'Safety Chains (pair)',
      description: 'Class III safety chains with J-hooks — 5,000 lb rating',
      priceRange: '$12 – $22',
      keywords: [],
      searchQuery: 'trailer safety chains pair J hooks class 3',
      tag: 'home-depot',
    },
    {
      name: 'Exterior LED Trailer Light Kit',
      description: 'DOT-approved stop/tail/turn light kit for utility trailers',
      priceRange: '$18 – $35',
      keywords: [],
      searchQuery: 'trailer light kit LED DOT exterior',
      tag: 'home-depot',
    },
  ],
}

// ── Helper: get Home Depot products for a category ───────────────────────────

export function getHomeDepotProducts(
  category: ToolCategory,
  listingTitle: string,
  maxProducts = 3,
): AffiliateProduct[] {
  const products = HD_MAP[category] ?? HD_MAP['power-tools'] ?? []
  const titleLower = listingTitle.toLowerCase()

  const sorted = [...products].sort((a, b) => {
    const aMatch = a.keywords.some((k) => titleLower.includes(k)) ? 1 : 0
    const bMatch = b.keywords.some((k) => titleLower.includes(k)) ? 1 : 0
    return bMatch - aMatch
  })

  return sorted.slice(0, maxProducts)
}

/* Catalogue data. Shade hexes are catalogue values sampled from dyed
   stock — not brand colours. Every shade carries a name because screen
   colour cannot be trusted. */

export const PHOTO = {
  kalamkari: '/WhatsApp Image 2026-09-02 at 3.58.25 PM.jpeg',
  position: '/WhatsApp Image 2026-09-02 at 3.58.24 PM.jpeg',
  stack: '/WhatsApp Image 2026-09-02 at 3.58.25 PM (1).jpeg',
}

export const SHADES = [
  { id: 'mustard',   name: 'Mustard',   hex: '#C9971D' },
  { id: 'maroon',    name: 'Maroon',    hex: '#8D2F3F' },
  { id: 'indigo',    name: 'Indigo',    hex: '#1F4F6B' },
  { id: 'bottle',    name: 'Bottle',    hex: '#2F5D3A' },
  { id: 'offwhite',  name: 'Off-white', hex: '#E8DFD0' },
  { id: 'purple',    name: 'Purple',    hex: '#5A3B78' },
  { id: 'rose',      name: 'Rose',      hex: '#D3737A' },
  { id: 'rust',      name: 'Rust',      hex: '#A8542F' },
  { id: 'black',     name: 'Black',     hex: '#1A1A1A' },
  { id: 'grey',      name: 'Grey',      hex: '#C2C7C9' },
  { id: 'beige',     name: 'Beige',     hex: '#D9B382' },
  { id: 'sage',      name: 'Sage',      hex: '#7D9B6A' },
]

export const shadeById = Object.fromEntries(SHADES.map((s) => [s.id, s]))

export const FABRIC_TYPES = [
  { id: 'cotton',  name: 'Cotton' },
  { id: 'silk',    name: 'Silk' },
  { id: 'chinon',  name: 'Chinon' },
  { id: 'crepe',   name: 'Crepe' },
  { id: 'rawsilk', name: 'Rawsilk' },
  { id: 'tussar',  name: 'Tussar' },
  { id: 'sartin',  name: 'Sartin' },
  { id: 'lining',  name: 'Lining' },
]

export const DESIGNS = [
  { id: 'kalamkari', name: 'Kalamkari print', tag: 'Hand-drawn florals, pen kalamkari', photo: PHOTO.kalamkari },
  { id: 'paisley',   name: 'Position print',  tag: 'Placed paisley with sequin work',   photo: PHOTO.position },
  { id: 'border',    name: 'Zari border',     tag: 'Woven elephant border, gold zari',  photo: PHOTO.stack },
  { id: 'stripe',    name: 'Stripe',          tag: 'Yarn-dyed even stripe',   weave: 'weave-stripe' },
  { id: 'checks',    name: 'Checks',          tag: 'Small gingham check',     weave: 'weave-check' },
  { id: 'polka',     name: 'Polka',           tag: 'Discharge-print dot',     weave: 'weave-polka' },
  { id: 'plain',     name: 'Plain',           tag: 'Solid dyed, no pattern',  weave: 'weave-plain' },
  { id: 'dobby',     name: 'Dobby',           tag: 'Self-textured dobby grid', weave: 'weave-grid' },
]

export const designById = Object.fromEntries(DESIGNS.map((d) => [d.id, d]))

const f = (o) => ({ swatchPrice: 20, out: [], ...o })

export const FABRICS = [
  f({
    id: 'cxc-silk', name: 'CxC Silk', type: 'silk', design: 'border',
    sub: 'Pattu silk · 36" · plain weave', width: '36"',
    price: 100, mrp: 200, slab: { from: 11, price: 92 },
    photo: PHOTO.stack, stock: 'in stock',
    shades: ['mustard','maroon','indigo','bottle','offwhite','purple','rose','rust','black','grey','beige','sage'],
    out: ['purple'],
    note: 'Mill-dyed in 12 shades, cut fresh off the than. Zari border runs along one selvedge.',
  }),
  f({
    id: 'position-print', name: 'Position Print', type: 'chinon', design: 'paisley',
    sub: 'Chinon · 44" · sequin work', width: '44"',
    price: 450, photo: PHOTO.position, stock: 'in stock',
    shades: ['mustard','rose','purple','bottle'],
    note: 'Placement print — one repeat per 2.5 m, so cut lengths are rounded to the repeat.',
  }),
  f({
    id: 'jyothi-cotton', name: 'Jyothi printed cotton', type: 'cotton', design: 'kalamkari',
    sub: 'Mal cotton · 44" · softer, lighter', width: '44"',
    price: 90, mrp: 130, slab: { from: 20, price: 82 },
    photo: PHOTO.kalamkari, stock: 'in stock',
    shades: ['offwhite','indigo','maroon','rust','bottle','black'],
    note: 'Screen-printed on mal cotton. Bleeds slightly on first wash — pre-wash before stitching.',
  }),
  f({
    id: 'cotton-cambric', name: 'Cotton Cambric', type: 'cotton', design: 'plain',
    sub: 'Cambric · 44" · 60*60 count', width: '44"',
    price: 38, weave: 'weave-diag', stock: 'in stock',
    shades: ['offwhite','beige','grey','sage','indigo','black','rose','mustard'],
    note: 'The workhorse. Lining, kurta bodies, muslin toiles — priced to move by the than.',
  }),
  f({
    id: 'cotton-hakoba', name: 'Cotton Hakoba', type: 'cotton', design: 'dobby',
    sub: 'Hakoba shot · 44" · self work', width: '44"',
    price: 100, mrp: 200, weave: 'weave-grid', stock: 'low stock',
    shades: ['offwhite','beige','sage','rose','grey'],
    note: 'Chikan-style cutwork on a shot ground. Limited lot — 6 thans left in godown.',
  }),
  f({
    id: 'cotton-6060', name: 'Cotton 60*60', type: 'cotton', design: 'plain',
    sub: 'Combed cotton · 44" · crisp', width: '44"',
    price: 75, weave: 'weave-plain', stock: 'in stock',
    shades: ['offwhite','indigo','maroon','bottle','black','grey','beige','rust','sage','mustard'],
    note: 'Even 60s warp and weft. Takes a print cleanly, which is why most of the design book sits on it.',
  }),
  f({
    id: 'silk-crepe', name: 'Silk Crepe', type: 'crepe', design: 'plain',
    sub: 'Crepe · 44" · fluid fall', width: '44"',
    price: 180, mrp: 240, weave: 'weave-plain', stock: 'in stock',
    shades: ['black','maroon','indigo','bottle','rust','purple','rose'],
    note: 'Crepe twist in the weft gives the drape. Cuts cleanly, does not fray much.',
  }),
  f({
    id: 'raw-silk', name: 'Rawsilk Slub', type: 'rawsilk', design: 'plain',
    sub: 'Rawsilk · 44" · slubbed', width: '44"',
    price: 210, weave: 'weave-plain', stock: 'in stock',
    shades: ['beige','mustard','bottle','maroon','offwhite','indigo','black'],
    note: 'Visible slub across the weft — that irregularity is the cloth, not a fault.',
  }),
  f({
    id: 'tussar-plain', name: 'Tussar by the metre', type: 'tussar', design: 'plain',
    sub: 'Tussar · 44" · natural gold', width: '44"',
    price: 320, weave: 'weave-plain', stock: 'low stock',
    shades: ['beige','offwhite','rust','bottle','maroon'],
    note: 'Ghicha tussar, natural gold cast. Shade varies lot to lot — order a swatch card first.',
  }),
  f({
    id: 'sartin-shine', name: 'Sartin', type: 'sartin', design: 'plain',
    sub: 'Satin · 44" · high sheen', width: '44"',
    price: 85, mrp: 120, weave: 'weave-plain', stock: 'in stock',
    shades: ['black','maroon','indigo','purple','rose','mustard','bottle','grey'],
    note: 'Bright satin face, matte back. Blouse linings and lehenga kali.',
  }),
  f({
    id: 'lining-cotton', name: 'Cotton Lining', type: 'lining', design: 'plain',
    sub: 'Lining · 36" · soft finish', width: '36"',
    price: 28, weave: 'weave-diag', stock: 'in stock',
    shades: ['offwhite','beige','black','grey','maroon','indigo'],
    note: 'Plain lining stock. Sold in 10 m minimum at the counter rate.',
  }),
  f({
    id: 'stripe-cotton', name: 'Yarn-dyed Stripe', type: 'cotton', design: 'stripe',
    sub: 'Cotton · 44" · yarn-dyed', width: '44"',
    price: 68, weave: 'weave-stripe', stock: 'in stock',
    shades: ['indigo','offwhite','black','rust','sage'],
    note: 'Woven stripe, not printed — colour runs right through the cloth.',
  }),
  f({
    id: 'check-cotton', name: 'Gingham Check', type: 'cotton', design: 'checks',
    sub: 'Cotton · 44" · 8 mm check', width: '44"',
    price: 72, weave: 'weave-check', stock: 'in stock',
    shades: ['indigo','maroon','black','sage','rose','grey'],
    note: 'Small even check. Cut on the bias for facings and it reads as a diamond.',
  }),
  f({
    id: 'polka-crepe', name: 'Polka Crepe', type: 'crepe', design: 'polka',
    sub: 'Crepe · 44" · discharge print', width: '44"',
    price: 130, mrp: 170, weave: 'weave-polka', stock: 'in stock',
    shades: ['black','maroon','indigo','offwhite','rust'],
    note: 'Discharge dot on a dyed ground, so the dot is soft to the hand.',
  }),
  f({
    id: 'chinon-plain', name: 'Chinon Plain', type: 'chinon', design: 'plain',
    sub: 'Chinon · 44" · sheer', width: '44"',
    price: 120, weave: 'weave-plain', stock: 'in stock',
    shades: ['offwhite','rose','mustard','sage','grey','purple'],
    note: 'Sheer chinon for dupattas and second layers. Needs a lining underneath.',
  }),
  f({
    id: 'silk-kalam', name: 'Kalamkari on Silk', type: 'silk', design: 'kalamkari',
    sub: 'Pattu silk · 44" · pen kalamkari', width: '44"',
    price: 480, mrp: 620, slab: { from: 6, price: 440 },
    photo: PHOTO.kalamkari, stock: 'in stock',
    shades: ['offwhite','beige','indigo','maroon'],
    note: 'Pen kalamkari on silk ground — drawn, not screened. Each than differs a little.',
  }),
]

/* Which fabrics a given design is available on. */
export function fabricsForDesign(designId) {
  return FABRICS.filter((x) => x.design === designId)
}

export function fabricById(id) {
  return FABRICS.find((x) => x.id === id)
}

export const rupee = (n) => '₹' + Number(n).toLocaleString('en-IN')

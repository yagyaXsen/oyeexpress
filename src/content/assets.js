/**
 * OyeExpress — media registry
 * ------------------------------------------------------------------
 * Every image and video slot on the site is defined here, and only here.
 * Swap any entry for OyeExpress's own photography or film: nothing else
 * changes, because every slot keeps its ratio and crop (object-fit: cover).
 *
 *   photo(id, alt, opts)  an Unsplash photo, served responsively from
 *                         images.unsplash.com (AVIF/WebP by browser support)
 *   own(src, alt, opts)   your own file: import it, or put it in /public/media
 *   film(name, alt, opts) a self-hosted loop in /public/media (mp4 + poster)
 *
 *   alt       describe the photograph ('' for purely decorative media)
 *   position  CSS object-position to steer the crop, e.g. '50% 70%'
 *
 * Current media is licensed for free use without attribution:
 * photos via Unsplash (unsplash.com/license), films via Pexels
 * (pexels.com/license) and Mixkit (mixkit.co/license). See CREDITS.md.
 * The placeholder system (`scene`) remains as a fallback for empty slots.
 */

/** Set to false to hide placeholder briefs on any slot left without media. */
export const SHOW_SLOT_LABELS = true

const UNSPLASH_WIDTHS = [480, 800, 1200, 1600, 2200]
const unsplashUrl = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=72&w=${w}`

const photo = (id, alt, { position = 'center', scene = 'dusk' } = {}) => ({
  type: 'image',
  src: unsplashUrl(id, 1600),
  srcSet: UNSPLASH_WIDTHS.map((w) => `${unsplashUrl(id, w)} ${w}w`).join(', '),
  alt,
  position,
  scene,
})

// eslint-disable-next-line no-unused-vars
const own = (src, alt, { position = 'center', scene = 'dusk' } = {}) => ({ type: 'image', src, alt, position, scene })

const film = (name, alt, { mobile, position = 'center', scene = 'dusk' } = {}) => ({
  type: 'video',
  src: `/media/${name}.mp4`,
  srcMobile: mobile ? `/media/${mobile}.mp4` : '',
  poster: `/media/${name.replace(/-\d+$/, '')}-poster.jpg`,
  alt,
  position,
  scene,
})

export const media = {
  /* I · Hero — slow dolly through a double-height living room (Pexels) */
  hero: film('hero-1920', 'A double-height living room with a low sofa and full-height curtains', { mobile: 'hero-960', position: '45% 50%' }),

  /* II · The idea */
  idea: {
    inline: photo('photo-1784652587224-062bd5f231bf', '', { position: '50% 40%' }),
    portrait: photo('photo-1768946131536-39b5f3ec329d', 'A textured bouclé sofa in raking evening light', { position: '40% 50%' }),
  },

  /* III · The journey */
  journey: {
    brief: photo('photo-1659930087003-2d64e33181f7', 'A designer marking measurements on timber with a pencil'),
    discover: photo('photo-1687180498602-5a1046defaa4', 'A furniture showroom floor with sofas and lounge chairs'),
    source: photo('photo-1547609434-b732edfee020', 'A craftsman sawing timber in a sunlit workshop', { position: '60% 50%' }),
    materials: {
      walnut: photo('photo-1736506159776-22ca388780fa', 'Walnut grain'),
      travertine: photo('photo-1780253460324-9d49f88c74fc', 'Travertine tiles'),
      boucle: photo('photo-1768946131690-247c5319f0d8', 'Bouclé upholstery'),
      brass: photo('photo-1550336163-fd7bb464e5a2', 'Brass studs on a carved door'),
      marble: photo('photo-1550053808-52a75a05955d', 'Black marble with white veining'),
      linen: photo('photo-1711533522750-0dfbf42d273d', 'Woven linen'),
    },
    inspect: photo('photo-1497219055242-93359eeed651', 'A chisel carving into a timber surface'),
    ship: photo('photo-1621697944804-d0a393f7e01a', 'A container port lit at night'),
    deliver: photo('photo-1772411650649-f88111bcb8a5', 'A living room at dusk overlooking a lake', { position: '55% 50%' }),
  },

  /* IV · The collection */
  collections: {
    living: photo('photo-1640357897497-599b4fc84f51', 'A low sofa against a fluted wall in a dark living room'),
    bedroom: photo('photo-1768946131530-358c52c4c42d', 'An upholstered bed with a rounded frame in dramatic light'),
    dining: photo('photo-1777041097323-2f2ab6734a82', 'A long timber dining table in a dark, warm room'),
    outdoor: photo('photo-1787869200932-e8a1617012ed', 'Wicker loungers on a villa terrace among pines'),
    lighting: photo('photo-1483678777699-a2340573e155', 'Amber glass pendant lights glowing in the dark'),
    wardrobes: photo('photo-1781473377372-8690a514c152', 'A walnut dressing room with open wardrobes'),
    villa: photo('photo-1668277156357-3e174dff9f1a', 'A villa living room with full-height windows and shell chandeliers'),
    custom: photo('photo-1762803841091-c5327f7aed37', 'A sculptural armchair in a furniture workshop'),
  },

  /* V · Foshan — timber stock in raking light (Mixkit) */
  foshan: {
    film: film('timber-1600', 'Timber boards stacked upright in raking workshop light'),
    factories: photo('photo-1530191601183-4de2969575ad', 'A furniture workshop with machinery and a craftsman at work'),
    markets: photo('photo-1760611656148-063d3b9a8dbc', 'Chairs on display in a showroom'),
    materials: photo('photo-1694382224140-cb7443c6a3ec', 'Dark marble with fine veining'),
    craftsmanship: photo('photo-1660796334938-cf0b03be7e6d', 'Hands carving a detailed wooden panel'),
    showrooms: photo('photo-1788716183840-bb3f0edc2f75', 'Timber chairs displayed on white plinths'),
    manufacturing: photo('photo-1721508490084-1b1de5b230d4', 'A woodworker shaping timber by hand'),
  },

  /* VI · Bespoke — the finished piece in each finish; the reference is shown in monochrome */
  bespoke: {
    mocha: photo('photo-1762803841091-c5327f7aed37', 'A sculptural mocha bouclé armchair', { position: '50% 60%' }),
    ivory: photo('photo-1759262151001-3f8841d02ce1', 'An ivory bouclé armchair beside a side table'),
    oak: photo('photo-1763279934323-edb3735f6a6e', 'An oak-framed armchair upholstered in oatmeal linen'),
    cognac: photo('photo-1605797063353-4cbcb6027f2c', 'A cognac leather armchair in warm light'),
    umber: photo('photo-1768946131536-39b5f3ec329d', 'An umber bouclé sofa in raking light', { position: '40% 50%' }),
  },

  /* Why OyeExpress */
  why: {
    direct: photo('photo-1788716183840-bb3f0edc2f75', 'Timber chairs displayed in a showroom'),
    custom: photo('photo-1768946131690-247c5319f0d8', 'Close-up of bouclé upholstery'),
    quality: photo('photo-1564842505181-8862a3b9b173', 'Quilted leather with even stitching'),
    logistics: photo('photo-1594571194668-7112042d8f54', 'Stacked timber pallets ready for shipping'),
  },

  /* Who it's for */
  audiences: {
    homes: photo('photo-1668277156357-3e174dff9f1a', 'A villa living room with full-height windows'),
    hospitality: photo('photo-1774192621035-20d11389f781', 'A wood-panelled hotel lobby'),
    designers: photo('photo-1760611656148-063d3b9a8dbc', 'Chairs on display in a showroom'),
    businesses: photo('photo-1781955781178-6ea29c66e860', 'A candlelit restaurant and bar'),
  },

  /* VII · Inspection (feature image, kept for reuse) */
  inspection: {
    feature: photo('photo-1736506159893-22cca29b8018', 'Close-up of dark walnut veneer'),
    material: photo('photo-1747696766706-5485b39bf358', 'Black marble with white veining'),
    finishing: photo('photo-1564842505181-8862a3b9b173', 'Quilted leather with even stitching'),
    dimensions: photo('photo-1659930087003-2d64e33181f7', 'A craftsman marking timber with a pencil'),
    packaging: photo('photo-1594571194668-7112042d8f54', 'Stacked timber pallets ready for shipping'),
    preshipment: photo('photo-1758915753395-a5dddea1d813', 'A finished armchair ready for inspection'),
  },

  /* VIII · Projects (imagery illustrates scope; replace with OyeExpress projects) */
  projects: {
    p1: photo('photo-1668277157922-ecd8330ea809', 'A villa living room with a wall of windows over the sea'),
    p2: photo('photo-1768946131535-b90bad125f16', 'A bedroom with a sculptural bed'),
    p3: photo('photo-1774192621035-20d11389f781', 'A wood-panelled hotel lobby'),
    p4: photo('photo-1781955781178-6ea29c66e860', 'A candlelit restaurant and bar'),
    p5: photo('photo-1783936338672-2afc6e6266c9', 'A timber cabana with outdoor seating'),
  },

  /* X · Testimonial — a sculpted timber pendant (Pexels) */
  testimonial: film('testimonial-1600', 'A sculpted timber pendant light glowing in a warm room'),

  /* XI · Journal */
  journal: {
    interiors: photo('photo-1640357960494-9242650846d3', 'A monochrome living room with a fluted, curved wall'),
    foshan: photo('photo-1747997271429-194588a13a09', 'A river flowing past the city at dusk'),
    factory: photo('photo-1641893979088-87d4d9604c36', 'A craftsman finishing a river table'),
    behind: photo('photo-1631396326838-de37e5f8bcbc', 'A woodworker at his bench'),
    projects: photo('photo-1668277156355-08d083dcfea4', 'A villa sitting room with sea views'),
  },

  /* Closing — a stone villa at dusk, lanterns lit (Pexels) */
  final: film('closing-1920', 'A stone and timber villa at dusk with its lanterns lit', { position: '50% 40%' }),
}

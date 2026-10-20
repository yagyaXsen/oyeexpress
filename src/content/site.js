/**
 * OyeExpress — site copy and structured content.
 * Media is referenced from ./assets.js so images stay in one place.
 * Anything in [square brackets] is a placeholder to replace before launch.
 */
import { media } from './assets'

export const contact = {
  instagram: 'https://instagram.com/oyeexpress',
  handle: '@oyeexpress',
  whatsapp: '', // e.g. 'https://wa.me/91XXXXXXXXXX'
  whatsappLabel: '[number]',
  email: '', // e.g. 'mailto:hello@oyeexpress.com'
  emailLabel: '[address]',
}

export const nav = {
  left: [
    { label: 'Collections', href: '#collections' },
    { label: 'How It Works', href: '#process' },
    { label: 'Foshan', href: '#foshan' },
  ],
  right: [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#enquire' },
  ],
}

/* How it works: six steps, one or two short sentences each. */
export const journey = [
  { n: '01', title: 'Tell us what you need', text: 'Share your rooms, sizes, style and budget. Photos and sketches help.', media: media.journey.brief },
  { n: '02', title: 'We source in Foshan', text: 'We work with furniture manufacturers and showrooms to find pieces that match your requirements.', media: media.journey.discover },
  { n: '03', title: 'You approve', text: 'You review options, prices, materials and finishes. Nothing is ordered until you say yes.', materials: true },
  { n: '04', title: 'We inspect', text: 'Every piece is checked for materials, finish and size before it is packed.', media: media.journey.inspect },
  { n: '05', title: 'We ship', text: 'We pack, consolidate and ship your order, and handle the export paperwork.', media: media.journey.ship },
  { n: '06', title: 'We deliver', text: 'Your furniture arrives at your door, in India or worldwide.', media: media.journey.deliver },
]

export const materials = [
  { label: 'Walnut', media: media.journey.materials.walnut },
  { label: 'Travertine', media: media.journey.materials.travertine, light: true },
  { label: 'Bouclé', media: media.journey.materials.boucle, light: true },
  { label: 'Brass', media: media.journey.materials.brass },
  { label: 'Marble', media: media.journey.materials.marble },
  { label: 'Linen', media: media.journey.materials.linen },
]

/* What you can source. `float` sizes the image that follows the cursor on desktop. */
export const collections = [
  { n: '01', name: 'Living', tagline: 'Sofas, lounge chairs, coffee and side tables.', media: media.collections.living, float: 'w-[380px] h-[470px]' },
  { n: '02', name: 'Bedroom', tagline: 'Beds, bedside tables, benches and dressers.', media: media.collections.bedroom, float: 'w-[460px] h-[340px]' },
  { n: '03', name: 'Dining', tagline: 'Dining tables, chairs, sideboards and bar stools.', media: media.collections.dining, float: 'w-[380px] h-[380px]' },
  { n: '04', name: 'Outdoor', tagline: 'Loungers, outdoor dining sets and shade.', media: media.collections.outdoor, float: 'w-[500px] h-[312px]' },
  { n: '05', name: 'Lighting', tagline: 'Pendants, chandeliers, floor and wall lights.', media: media.collections.lighting, float: 'w-[300px] h-[450px]' },
  { n: '06', name: 'Wardrobes', tagline: 'Walk-in closets, fitted wardrobes and storage.', media: media.collections.wardrobes, float: 'w-[320px] h-[480px]' },
  { n: '07', name: 'Custom', tagline: 'Made to your size, material and design.', media: media.collections.custom, float: 'w-[400px] h-[400px]', href: '#custom' },
]

export const foshanFrames = [
  { n: '01', label: 'Factories', media: media.foshan.factories, grow: 1.35 },
  { n: '02', label: 'Markets', media: media.foshan.markets, grow: 0.8 },
  { n: '03', label: 'Materials', media: media.foshan.materials, grow: 1 },
  { n: '04', label: 'Craftsmanship', media: media.foshan.craftsmanship, grow: 1.15 },
  { n: '05', label: 'Showrooms', media: media.foshan.showrooms, grow: 0.85 },
  { n: '06', label: 'Manufacturing', media: media.foshan.manufacturing, grow: 1.1 },
]

/* Each finish shows the same idea realised in a different material. */
export const finishes = [
  { key: 'mocha', name: 'Mocha bouclé', hex: '#6E5847', media: media.bespoke.mocha },
  { key: 'ivory', name: 'Ivory bouclé', hex: '#E6DFD3', media: media.bespoke.ivory },
  { key: 'oak', name: 'Oak & linen', hex: '#C9B79C', media: media.bespoke.oak },
  { key: 'cognac', name: 'Cognac leather', hex: '#8A4F2A', media: media.bespoke.cognac },
  { key: 'umber', name: 'Umber bouclé', hex: '#4A3526', media: media.bespoke.umber },
]

export const customLevers = ['Dimensions', 'Materials', 'Finishes', 'Colours', 'Design references', 'Private label']

/* Why Foshan: three plain reasons. */
export const foshanReasons = [
  { title: 'More choice', text: 'Thousands of styles in one region, from ready-made pieces to custom work.' },
  { title: 'Direct from makers', text: 'Buy from the people who make the furniture, not through layers of resellers.' },
  { title: 'Made to order', text: 'Factories here are set up to build to your sizes, materials and finishes.' },
]

/* Why OyeExpress: the real value, in four points. */
export const whyUs = [
  { n: '01', title: 'Direct sourcing', text: 'Access to furniture manufacturers and showrooms in Foshan.', media: media.why.direct },
  { n: '02', title: 'Custom options', text: 'Furniture sourced to your dimensions, materials and design.', media: media.why.custom },
  { n: '03', title: 'Quality control', text: 'Every piece is checked before it is shipped.', media: media.why.quality },
  { n: '04', title: 'End-to-end logistics', text: 'We manage the journey from China to your door.', media: media.why.logistics },
]

/* Who it's for: so visitors can find themselves quickly. */
export const audiences = [
  { title: 'For homes', text: 'Complete home and villa furnishing.', media: media.audiences.homes },
  { title: 'For hospitality', text: 'Hotels, restaurants and resorts.', media: media.audiences.hospitality },
  { title: 'For designers', text: 'Furniture sourcing for your client projects.', media: media.audiences.designers },
  { title: 'For businesses', text: 'Offices, retail and commercial spaces.', media: media.audiences.businesses },
]

export const projectFilters = [
  { key: 'all', label: 'All' },
  { key: 'residential', label: 'Homes' },
  { key: 'villa', label: 'Villas' },
  { key: 'hospitality', label: 'Hospitality' },
  { key: 'commercial', label: 'Business' },
]

/* Placeholder projects: no real clients are named. Replace with OyeExpress work. */
export const projects = [
  { id: 'p1', n: '01', category: 'villa', label: 'Villa', name: '[Project name]', location: '[City, Country]', scope: 'Full furnishing, [X] rooms', media: media.projects.p1 },
  { id: 'p2', n: '02', category: 'residential', label: 'Residential', name: '[Project name]', location: '[City]', scope: 'Bedrooms & wardrobes', media: media.projects.p2 },
  { id: 'p3', n: '03', category: 'hospitality', label: 'Hospitality', name: '[Hotel name]', location: '[City]', scope: 'Guest rooms & lobby', media: media.projects.p3 },
  { id: 'p4', n: '04', category: 'commercial', label: 'Commercial', name: '[Restaurant name]', location: '[City]', scope: 'Dining room & lighting', media: media.projects.p4 },
  { id: 'p5', n: '05', category: 'residential', label: 'Residential', name: '[Project name]', location: '[City]', scope: 'Terrace & outdoor', media: media.projects.p5 },
]

export const testimonial = {
  isPlaceholder: true,
  quote: '[A client’s words about how their space came together, to be replaced with a real testimonial before launch.]',
  client: '[Client name]',
  project: '[Villa, City]',
  scope: '[Scope]',
}

export const journal = [
  { label: 'Interiors', kind: 'reel', media: media.journal.interiors, offset: 'md:mt-0', speed: -6 },
  { label: 'Field notes', kind: 'reel', media: media.journal.foshan, offset: 'md:mt-[120px]', speed: 8 },
  { label: 'Factory floor', kind: 'post', media: media.journal.factory, offset: 'md:mt-[40px]', speed: -4 },
  { label: 'Behind the scenes', kind: 'story', media: media.journal.behind, offset: 'md:mt-[170px]', speed: 10 },
  { label: 'Projects', kind: 'post', media: media.journal.projects, offset: 'md:mt-[70px]', speed: -8 },
]

export const enquiry = {
  steps: [
    { key: 'space', q: 'What are you furnishing?' },
    { key: 'scope', q: 'What are you looking for?' },
    { key: 'location', q: 'Where is the project?' },
    { key: 'budget', q: 'Estimated budget' },
    { key: 'inspiration', q: 'Inspiration and references' },
    { key: 'contact', q: 'How do we reach you?' },
  ],
  spaces: ['Villa', 'Home', 'Hotel', 'Restaurant', 'Office', 'Other'],
  scopes: ['Full furniture', 'Living', 'Bedroom', 'Dining', 'Outdoor', 'Lighting', 'Custom'],
  budgets: ['Under ₹10 lakh', '₹10–25 lakh', '₹25–50 lakh', '₹50 lakh–1 crore', 'Above ₹1 crore', 'Not sure yet'],
}

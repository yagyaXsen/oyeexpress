import { useEffect, useRef } from 'react'
import { SHOW_SLOT_LABELS } from '../content/assets'
import { prefersReducedMotion } from '../lib/motion'
import { HeroRoom, Sofa, Bed, Dining, Lounger, Pendant, Chair, ChairSketch } from './PlaceholderArt'

/* scene name → placeholder class + optional artwork */
const SCENES = {
  hero: { cls: 'scene-room', Art: HeroRoom },
  living: { cls: 'scene-dusk', Art: Sofa },
  villa: { cls: 'scene-shaft', Art: Sofa },
  lobby: { cls: 'scene-lamp', Art: Sofa },
  bedroom: { cls: 'scene-bed', Art: Bed },
  dining: { cls: 'scene-lamp', Art: Dining },
  outdoor: { cls: 'scene-outdoor', Art: Lounger },
  lighting: { cls: 'scene-pendant', Art: Pendant },
  wardrobes: { cls: 'scene-wardrobe' },
  atelier: { cls: 'scene-atelier', Art: Chair },
  chair: { cls: 'scene-spot', Art: Chair },
  sketch: { cls: 'scene-paper', Art: ChairSketch, light: true },
  dusk: { cls: 'scene-dusk' },
  shaft: { cls: 'scene-shaft' },
  lamp: { cls: 'scene-lamp' },
  market: { cls: 'scene-market' },
  factory: { cls: 'scene-factory' },
  night: { cls: 'scene-night' },
  walnut: { cls: 'scene-walnut' },
  travertine: { cls: 'scene-travertine', light: true },
  boucle: { cls: 'scene-boucle', light: true },
  brass: { cls: 'scene-brass' },
  marble: { cls: 'scene-marble' },
  linen: { cls: 'scene-linen' },
  stitch: { cls: 'scene-stitch' },
  crate: { cls: 'scene-crate' },
}

export function Placeholder({ scene, brief, tint, label = true }) {
  const s = SCENES[scene] || SCENES.dusk
  const Art = s.Art
  return (
    <div className={`scene ${s.cls}`} aria-hidden="true">
      {Art && <Art tint={tint} />}
      {SHOW_SLOT_LABELS && label && brief && (
        <span className={`slot-tag ${s.light ? 'on-light' : ''}`}>▢ {brief}</span>
      )}
    </div>
  )
}

/**
 * A media slot. The wrapper owns size and ratio (pass Tailwind classes);
 * the content fills it with object-fit: cover, so real photos and films
 * drop in without layout changes.
 *
 *   asset     an entry from src/content/assets.js
 *   priority  load eagerly (above-the-fold only)
 *   parallax  % of vertical drift on scroll (inner layer is over-sized to hide edges)
 *   reveal    'clip' opens the frame from the centre as it enters
 *   tint      recolours placeholder artwork (bespoke chair)
 *   label     show the placeholder brief
 *   sizes     rendered width hint for responsive images (srcSet)
 *   eager     skip lazy loading (e.g. inside the pinned horizontal track)
 */
export default function Media({ asset, className = '', priority = false, parallax, reveal, tint, label = true, sizes = '(min-width: 1024px) 50vw, 100vw', eager = false, children, ...rest }) {
  const ref = useRef(null)
  const isVideo = asset?.type === 'video' && asset?.src

  // Films play only while on screen, and never under reduced motion.
  useEffect(() => {
    if (!isVideo) return
    const v = ref.current?.querySelector('video')
    if (!v) return
    if (prefersReducedMotion()) { v.pause(); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}) } else v.pause()
    }, { rootMargin: '200px' })
    io.observe(v)
    return () => io.disconnect()
  }, [isVideo, asset?.src])

  const innerStyle = parallax ? { top: `-${Math.abs(parallax) + 2}%`, bottom: `-${Math.abs(parallax) + 2}%` } : undefined

  return (
    <div ref={ref} className={`media ${className}`} data-reveal={reveal} {...rest}>
      <div data-media className="absolute inset-0" data-parallax={parallax || undefined} style={innerStyle}>
        {asset?.src ? (
          isVideo ? (
            <video
              className="media-fill"
              poster={asset.poster || undefined}
              muted
              loop
              playsInline
              preload={priority ? 'auto' : 'none'}
              aria-label={asset.alt || undefined}
              style={{ objectPosition: asset.position }}
            >
              {asset.srcMobile && <source src={asset.srcMobile} type="video/mp4" media="(max-width: 767px)" />}
              <source src={asset.src} type="video/mp4" />
            </video>
          ) : (
            <img
              className="media-fill"
              src={asset.src}
              srcSet={asset.srcSet || undefined}
              sizes={asset.srcSet ? sizes : undefined}
              alt={asset.alt || ''}
              loading={priority || eager ? 'eager' : 'lazy'}
              decoding="async"
              fetchpriority={priority ? 'high' : undefined}
              style={{ objectPosition: asset.position }}
            />
          )
        ) : (
          <Placeholder scene={asset?.scene} brief={asset?.brief} tint={tint} label={label} />
        )}
      </div>
      {children}
    </div>
  )
}

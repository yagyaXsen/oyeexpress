import { useEffect, useRef, useState } from 'react'
import { collections } from '../content/site'
import { gsap, prefersReducedMotion } from '../lib/motion'
import Media from '../components/Media'
import { Folio, Button } from '../components/ui'

/* IV · A typographic index. On desktop each room surfaces under the cursor,
   each in its own proportion. On touch, thumbnails carry the imagery. */
export default function Collection() {
  const [active, setActive] = useState(-1)
  const floatRef = useRef(null)
  const moveTo = useRef(null)
  const fine = useRef(false)

  useEffect(() => {
    const el = floatRef.current
    if (!el) return
    fine.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine.current) return
    const d = prefersReducedMotion() ? 0 : 0.9
    const xTo = gsap.quickTo(el, 'x', { duration: d, ease: 'expo.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: d, ease: 'expo.out' })
    moveTo.current = (x, y) => { xTo(x); yTo(y) }
    gsap.set(el, { x: window.innerWidth * 0.7, y: window.innerHeight * 0.5 })
  }, [])

  const onMove = (e) => moveTo.current?.(e.clientX, e.clientY)

  return (
    <section id="collections" className="relative px-gutter pt-7 pb-36 lg:pb-52" aria-labelledby="collection-title">
      <Folio title="III — Collections" note="What you can source" page="03" />

      <div className="mt-20 grid grid-cols-1 items-end gap-6 md:grid-cols-12 lg:mt-32">
        <h2 id="collection-title" data-reveal="lines" className="serif text-[clamp(52px,7.4vw,108px)] leading-[0.9] tracking-[-0.04em] md:col-span-8">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.16em]"><span data-line className="block">What you can source</span></span>
        </h2>
        <p className="max-w-[360px] text-[17px] leading-[1.65] text-ivory/80 md:col-span-4 md:col-start-9">
          Furniture for every room, from ready-made pieces to fully custom designs. Choose a category to start a request.
        </p>
      </div>

      <div className="bleed-x mt-12 md:hidden">
        <Media asset={collections[0].media} className="aspect-[5/4] w-full" sizes="100vw" />
      </div>

      <ol
        className="group/idx relative z-20 mt-10 border-t border-ivory/15 md:mt-24"
        onMouseMove={onMove}
        onMouseLeave={() => setActive(-1)}
      >
        {collections.map((c, i) => (
          <li key={c.n} className="group/row" onMouseEnter={() => fine.current && setActive(i)}>
            <a
              href={c.href || '#enquire'}
              className="grid grid-cols-[22px_60px_minmax(0,1fr)] items-center gap-4 border-b border-ivory/15 py-4 md:grid-cols-[56px_96px_minmax(0,1fr)_auto] md:gap-8 md:py-[22px]"
            >
              <span className="caption text-mute">{c.n}</span>
              <Media asset={c.media} label={false} className="h-11 w-full md:h-[62px]" sizes="120px" />
              <span className="min-w-0">
                <span className="serif block truncate text-[clamp(30px,7.2vw,108px)] leading-[1.02] tracking-[-0.03em] transition-[opacity,transform] duration-700 ease-(--ease-expo) group-hover/idx:opacity-35 group-hover/row:translate-x-8 group-hover/row:italic group-hover/row:opacity-100">
                  {c.name}
                </span>
                <span className="mt-1 block text-[14px] leading-snug text-ivory/70 md:hidden">{c.tagline}</span>
              </span>
              <span className="hidden max-w-[300px] text-right transition-opacity duration-500 group-hover/idx:opacity-40 group-hover/row:opacity-100 md:block">
                <span className="block text-[15px] leading-snug text-ivory/80">{c.tagline}</span>
                <span className="eyebrow mt-2 block text-bronze">{c.href ? 'See custom →' : 'Request →'}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-14 flex flex-wrap items-center gap-8">
        <Button href="#enquire">Request sourcing</Button>
        <a href="#custom" className="eyebrow link-line hover:text-bronze">Need something custom?</a>
      </div>

      {/* Cursor-following image (fine pointers only) */}
      <div
        ref={floatRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-10 hidden md:block"
      >
        {collections.map((c, i) => (
          <div
            key={c.n}
            className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-[opacity,scale,rotate] duration-700 ease-(--ease-expo) ${
              active === i ? 'scale-100 rotate-0 opacity-100' : 'scale-[0.86] -rotate-3 opacity-0'
            }`}
          >
            <Media asset={c.media} className={c.float} sizes="520px" />
          </div>
        ))}
      </div>
    </section>
  )
}

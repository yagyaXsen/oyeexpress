import { useCallback, useRef, useState } from 'react'
import { finishes, customLevers } from '../content/site'
import { gsap, useGsap, MOTION_OK } from '../lib/motion'
import Media from '../components/Media'
import { SectionHead, Button } from '../components/ui'

/* VI · Bespoke. Drag the line: your reference on the left, the finished
   piece on the right, in the finish you choose. */
export default function Bespoke() {
  const [pos, setPos] = useState(50)
  const [finish, setFinish] = useState(0)
  const stageRef = useRef(null)
  const dragging = useRef(false)
  const touched = useRef(false)

  const setFromX = useCallback((clientX) => {
    const r = stageRef.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  // A single sweep on first view shows that the line moves.
  const scope = useGsap((root) => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const proxy = { v: 50 }
      gsap.timeline({ scrollTrigger: { trigger: root.querySelector('[data-stage]'), start: 'top 55%', once: true } })
        .to(proxy, { v: 30, duration: 0.9, ease: 'power2.inOut', onUpdate: () => !touched.current && setPos(proxy.v) })
        .to(proxy, { v: 70, duration: 1.2, ease: 'power2.inOut', onUpdate: () => !touched.current && setPos(proxy.v) })
        .to(proxy, { v: 50, duration: 0.9, ease: 'power2.inOut', onUpdate: () => !touched.current && setPos(proxy.v) })
    })
    return () => mm.revert()
  })

  const current = finishes[finish]

  return (
    <section id="custom" ref={scope} className="bg-ink px-gutter pt-24 pb-28 lg:pt-32 lg:pb-40" aria-labelledby="bespoke-title">
      <SectionHead
        n="03"
        label="Custom"
        id="bespoke-title"
        title={['Made around', 'your requirements.']}
        text="Can’t find the exact piece? Send us a photo, a sketch or a reference. We find a maker in Foshan who can build it to your size, material and finish."
      />

      <div
        ref={stageRef}
        data-stage
        className="relative mt-16 aspect-[4/5] touch-pan-y overflow-hidden select-none sm:aspect-[16/10] md:cursor-ew-resize lg:mt-20 lg:aspect-[16/8]"
        onPointerDown={(e) => { dragging.current = true; touched.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); setFromX(e.clientX) }}
        onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
        onPointerUp={() => { dragging.current = false }}
        onPointerCancel={() => { dragging.current = false }}
      >
        {/* finished piece, in the chosen finish */}
        <Media key={current.key} asset={current.media} tint={current.hex} sizes="100vw" className="absolute! inset-0 animate-[fade_.9s_ease-out]" />
        {/* your reference: the same idea, as a monochrome study */}
        <div className="absolute inset-0 z-2" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Media key={`ref-${current.key}`} asset={current.media} sizes="100vw" className="absolute! inset-0 [filter:grayscale(1)_contrast(1.08)_brightness(1.06)]" />
          <div className="absolute inset-0 bg-[#e8e1d3] mix-blend-multiply opacity-35" />
        </div>
        <span className="eyebrow pointer-events-none absolute top-4 left-4 z-5 bg-ink/70 px-3 py-2 text-ivory">Your reference</span>
        <span className="eyebrow pointer-events-none absolute top-4 right-4 z-5 bg-ink/70 px-3 py-2 text-ivory">Finished piece</span>

        <div className="pointer-events-none absolute inset-y-0 z-6 w-px bg-bronze" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bronze bg-ink/60 text-ivory">
            <svg width="20" height="10" viewBox="0 0 20 10" aria-hidden="true"><path d="M5 1L1 5l4 4M15 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
          </div>
        </div>
        <label className="sr-only" htmlFor="compare">Compare your reference with the finished piece</label>
        <input
          id="compare"
          type="range"
          min="0"
          max="100"
          value={Math.round(pos)}
          onChange={(e) => { touched.current = true; setPos(Number(e.target.value)) }}
          className="sr-only"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-5">
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow text-mute">Finish</p>
            <p className="caption text-ivory" aria-live="polite">{current.name}</p>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Finish">
            {finishes.map((f, i) => (
              <button
                key={f.key}
                type="button"
                role="radio"
                aria-checked={i === finish}
                aria-label={f.name}
                onClick={() => setFinish(i)}
                className={`h-12 outline-1 outline-offset-4 transition-[outline-color] duration-500 ${i === finish ? 'outline-bronze' : 'outline-transparent hover:outline-ivory/30'}`}
                style={{ background: f.hex, outlineStyle: 'solid' }}
              />
            ))}
          </div>
          <p className="caption mt-3 text-mute">Drag the line on the image to compare.</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-mute">You choose</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] text-ivory/85 sm:grid-cols-3">
            {customLevers.map((l) => <li key={l}>{l}</li>)}
          </ul>
          <div className="mt-8"><Button href="#enquire">Request custom sourcing</Button></div>
        </div>
      </div>
    </section>
  )
}

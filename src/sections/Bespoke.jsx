import { useCallback, useRef, useState } from 'react'
import { finishes, customLevers } from '../content/site'
import { gsap, useGsap, MOTION_OK } from '../lib/motion'
import Media from '../components/Media'
import { Folio, Button } from '../components/ui'

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
    <section id="custom" ref={scope} className="bg-ink pt-7 pb-32 lg:pb-44" aria-labelledby="bespoke-title">
      <div className="px-gutter">
        <Folio title="IV — Custom furniture" note="Drag the line to compare" page="04" />
      </div>

      <div
        ref={stageRef}
        data-stage
        className="relative mt-10 h-[min(900px,92svh)] min-h-[520px] touch-pan-y overflow-hidden select-none md:cursor-ew-resize"
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
        <div className="pointer-events-none absolute inset-0 z-3 bg-[linear-gradient(180deg,rgba(13,12,10,.45),rgba(13,12,10,0)_35%,rgba(13,12,10,0)_65%,rgba(13,12,10,.5))]" />

        <h2 id="bespoke-title" className="serif pointer-events-none absolute top-14 left-gutter z-5 text-[clamp(42px,7.6vw,112px)] leading-[0.9] tracking-[-0.04em] text-ivory [text-shadow:0_1px_24px_rgba(0,0,0,.35)]" style={{ left: 'var(--gutter)' }}>
          If you can<br />imagine it,
        </h2>
        <p aria-hidden="true" className="serif pointer-events-none absolute right-gutter bottom-14 z-5 text-right text-[clamp(42px,7.6vw,112px)] leading-[0.9] tracking-[-0.04em] text-ivory italic [text-shadow:0_1px_24px_rgba(0,0,0,.35)]" style={{ right: 'var(--gutter)' }}>
          we can<br />source it.
        </p>
        <span className="caption pointer-events-none absolute bottom-14 z-5 hidden text-ivory [text-shadow:0_1px_24px_rgba(0,0,0,.35)] md:block" style={{ left: 'var(--gutter)' }}>Your reference</span>
        <span className="caption pointer-events-none absolute top-16 z-5 hidden text-ivory/80 md:block" style={{ right: 'var(--gutter)' }}>Sourced in Foshan</span>

        <div className="pointer-events-none absolute inset-y-0 z-6 w-px bg-bronze" style={{ left: `${pos}%` }}>
          <div className="caption absolute top-1/2 left-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bronze bg-ink/55 text-ivory backdrop-blur-[2px] peer-focus-visible:outline">
            ◂ ▸
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

      <div className="mt-14 grid grid-cols-1 gap-12 px-gutter md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="serif text-[clamp(22px,1.9vw,27px)] leading-[1.35]">
            Can’t find the exact piece? Send us a photo, a sketch or a reference. We find a maker in Foshan who can build it to your size, material and finish.
          </p>
          <div className="mt-8"><Button href="#enquire">Request custom sourcing</Button></div>
        </div>
        <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <div className="flex items-baseline justify-between gap-4">
            <span className="eyebrow text-mute">Finish</span>
            <span className="serif text-[19px] italic" aria-live="polite">{current.name}</span>
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
                className={`h-14 outline-1 outline-offset-4 transition-[outline-color] duration-500 md:h-16 ${i === finish ? 'outline-bronze' : 'outline-transparent hover:outline-ivory/30'}`}
                style={{ background: f.hex, outlineStyle: 'solid' }}
              />
            ))}
          </div>
          <p className="eyebrow mt-8 text-mute">You choose</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-ivory/85 sm:grid-cols-3">
            {customLevers.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

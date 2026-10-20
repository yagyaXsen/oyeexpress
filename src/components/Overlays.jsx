import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/motion'
import { curtainWillShow } from '../lib/intro'
import { Button } from './ui'

/** Opening curtain: the wordmark, then the page is unveiled. Once per session. */
export function Curtain() {
  const ref = useRef(null)
  const [show] = useState(curtainWillShow)

  useLayoutEffect(() => {
    if (!show) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from('[data-curtain-word]', { yPercent: 110, duration: 0.7, ease: 'expo.out' })
        .from('[data-curtain-note]', { opacity: 0, duration: 0.4 }, 0.2)
        .to('[data-curtain-inner]', { opacity: 0, duration: 0.3 }, 0.6)
        .to(ref.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 0.65)
        .set(ref.current, { display: 'none' })
    }, ref)
    return () => ctx.revert()
  }, [show])

  if (!show) return null
  return (
    <div ref={ref} aria-hidden="true" className="fixed inset-0 z-100 flex items-center justify-center bg-ink">
      <div data-curtain-inner className="flex flex-col items-center gap-4">
        <span className="block overflow-hidden"><span data-curtain-word className="serif block text-[40px] tracking-[-0.01em]">OyeExpress</span></span>
        <span data-curtain-note className="eyebrow text-mute">Foshan → Worldwide</span>
      </div>
    </div>
  )
}

/** Phone-only call to action. */
export function MobileCta() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  // Appears between the hero and the form, and only while scrolling up,
  // so it never sits over a headline you are reading.
  useLayoutEffect(() => {
    let pastHero = false
    let atForm = false
    let up = false
    let last = window.scrollY
    const update = () => setVisible(pastHero && !atForm && up)
    const a = ScrollTrigger.create({ trigger: '#top', start: 'bottom 40%', end: 'max', onToggle: (s) => { pastHero = s.isActive; update() } })
    const b = ScrollTrigger.create({ trigger: '#enquire', start: 'top bottom', end: 'bottom top', onToggle: (s) => { atForm = s.isActive; update() } })
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - last) > 8) { up = y < last; last = y; update() }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { a.kill(); b.kill(); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div
      ref={ref}
      className={`fixed inset-x-3 bottom-3 z-40 transition-[transform,opacity] duration-700 ease-(--ease-expo) md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[140%] opacity-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <Button href="#enquire" className="w-full" tabIndex={visible ? 0 : -1}>Start your project</Button>
    </div>
  )
}

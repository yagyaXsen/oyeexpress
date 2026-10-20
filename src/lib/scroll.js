import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'

let lenis = null

/** Smooth scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  lenis.on('scroll', ScrollTrigger.update)
  if (import.meta.env.DEV) window.__lenis = lenis
  const tick = (time) => lenis && lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTarget(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el && target !== 0) return
  // A link inside the open menu fires while scrolling is still locked: unlock first.
  document.documentElement.style.overflow = ''
  if (lenis) {
    lenis.start()
    lenis.scrollTo(el ?? 0, { duration: 1.6, force: true, ...options })
  } else {
    if (target === 0) window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}

export function lockScroll(locked) {
  if (lenis) (locked ? lenis.stop() : lenis.start())
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

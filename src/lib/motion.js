import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

/**
 * Scoped GSAP setup for a component. `setup(scopeEl)` runs inside a
 * gsap.context, so every tween and ScrollTrigger is reverted on unmount.
 * Return a cleanup function from setup if you create a gsap.matchMedia.
 */
export function useGsap(setup, deps = []) {
  const scope = useRef(null)
  useLayoutEffect(() => {
    if (!scope.current) return
    const ctx = gsap.context(() => setup(scope.current), scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return scope
}

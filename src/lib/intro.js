import { prefersReducedMotion } from './motion'

let willShow = null

/** The opening curtain plays once per browser session. */
export function curtainWillShow() {
  if (willShow !== null) return willShow
  if (typeof window === 'undefined' || prefersReducedMotion()) return (willShow = false)
  try {
    willShow = !window.sessionStorage.getItem('oe-intro')
    window.sessionStorage.setItem('oe-intro', '1')
  } catch {
    willShow = true
  }
  return willShow
}

/** Seconds the hero waits before its entrance, so it follows the curtain. */
export const introDelay = () => (curtainWillShow() ? 0.85 : 0.1)

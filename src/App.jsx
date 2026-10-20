import { useEffect, useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, MOTION_OK } from './lib/motion'
import { initSmoothScroll, scrollToTarget } from './lib/scroll'
import Header from './components/Header'
import { Curtain, MobileCta } from './components/Overlays'
import { Grain } from './components/ui'
import Hero from './sections/Hero'
import Idea from './sections/Idea'
import Journey from './sections/Journey'
import Collection from './sections/Collection'
import Foshan from './sections/Foshan'
import Bespoke from './sections/Bespoke'
import WhyUs from './sections/WhyUs'
import Projects, { Audiences } from './sections/Projects'
import Enquiry from './sections/Enquiry'
import { Testimonial, Journal, FinalCta, Footer } from './sections/Closing'

export default function App() {
  useEffect(() => initSmoothScroll(), [])

  // In-page links glide (Lenis) instead of jumping.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id === '#top') { e.preventDefault(); scrollToTarget(0); return }
      const el = id.length > 1 && document.querySelector(id)
      if (!el) return
      e.preventDefault()
      scrollToTarget(el)
      history.replaceState(null, '', id)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Shared reveals, declared in markup with data attributes:
  //   data-reveal="up"     fade and rise
  //   data-reveal="lines"  child [data-line] spans rise out of their masks
  //   data-reveal="clip"   a media frame opens from the centre
  //   data-parallax="8"    a media layer drifts on scroll
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray('[data-reveal="up"]').forEach((el) => {
        gsap.from(el, { y: 56, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
      gsap.utils.toArray('[data-reveal="lines"]').forEach((el) => {
        gsap.from(el.querySelectorAll('[data-line]'), { yPercent: 110, duration: 1.5, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
      gsap.utils.toArray('[data-reveal="clip"]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(16% 9% 16% 9%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const amt = Number(el.dataset.parallax) || 6
        gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    })
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => { mm.revert(); window.removeEventListener('load', refresh) }
  }, [])

  return (
    <>
      <a href="#main" className="eyebrow sr-only z-100 bg-ivory px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">Skip to content</a>
      <Grain />
      <Curtain />
      <Header />
      <main id="main">
        <Hero />            {/* What is OyeExpress? */}
        <Idea />
        <Collection />      {/* What can I source? */}
        <Bespoke />
        <Journey />         {/* How does it work? */}
        <Foshan />          {/* Why Foshan? */}
        <WhyUs />           {/* Why OyeExpress? */}
        <Audiences />       {/* Who is it for / what projects? */}
        <Projects />
        <Testimonial />
        <Journal />
        <Enquiry />         {/* How do I start? */}
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}

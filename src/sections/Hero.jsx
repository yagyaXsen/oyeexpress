import { media } from '../content/assets'
import { gsap, useGsap, MOTION_OK } from '../lib/motion'
import { introDelay } from '../lib/intro'
import Media from '../components/Media'
import { Button } from '../components/ui'

/* I · What is OyeExpress? Said plainly, over the film. */
export default function Hero() {
  const scope = useGsap((root) => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.timeline({ delay: introDelay() })
        .from('[data-hero-media]', { scale: 1.12, duration: 2.8, ease: 'expo.out' }, 0)
        .from('[data-rise] > span', { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: 0.1 }, 0.1)
        .from('[data-hero-fade]', { opacity: 0, y: 12, duration: 1, ease: 'power2.out', stagger: 0.08 }, 0.7)

      // As you leave, the film recedes behind the page.
      const st = { trigger: root, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('[data-hero-stage]', { yPercent: 14, scale: 0.94, opacity: 0.35, ease: 'none', scrollTrigger: st })
    })
    return () => mm.revert()
  })

  return (
    <section id="top" ref={scope} className="relative h-svh min-h-[680px] overflow-hidden bg-ink" aria-labelledby="hero-title">
      <div data-hero-stage className="absolute inset-0 origin-top">
        <Media asset={media.hero} priority data-hero-media className="absolute! inset-0" label={false} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,12,10,.7)_0%,rgba(13,12,10,.35)_30%,rgba(13,12,10,.55)_60%,rgba(13,12,10,.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,12,10,.6)_0%,rgba(13,12,10,0)_65%)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-gutter pt-[calc(var(--header-h)+24px)] pb-10 lg:pb-14">
        <p className="eyebrow text-ivory/85" data-hero-fade>
          Foshan <span aria-hidden="true" className="mx-1.5 text-bronze">→</span> Worldwide
        </p>

        <h1 id="hero-title" className="t-display mt-5 lg:mt-6">
          <span data-rise className="-mb-[0.08em] block overflow-hidden pb-[0.08em]"><span className="block">Premium furniture,</span></span>
          <span data-rise className="-mb-[0.08em] block overflow-hidden pb-[0.08em]"><span className="block">sourced in Foshan.</span></span>
        </h1>

        <p data-hero-fade className="t-lead mt-6 max-w-[520px] text-ivory/90 lg:mt-8">
          Bespoke sourcing, customisation and delivery for residential and commercial projects.
        </p>
        <div data-hero-fade className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:mt-10">
          <Button href="#enquire" magnetic>Start your project</Button>
          <Button href="#collections" variant="outline" arrow={false}>View collections</Button>
        </div>

        <ol aria-label="What we handle" data-hero-fade className="mt-12 hidden items-center gap-5 border-t border-ivory/20 pt-5 md:flex lg:mt-14">
          {['Sourcing', 'Customisation', 'Quality check', 'Shipping', 'Delivery'].map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-3">
              <span className="caption text-bronze">{String(i + 1).padStart(2, '0')}</span>
              <span className="caption text-ivory/85">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

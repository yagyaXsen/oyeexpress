import { media } from '../content/assets'
import { testimonial, journal, contact, nav } from '../content/site'
import { gsap, useGsap, MOTION_OK } from '../lib/motion'
import Media from '../components/Media'
import { Folio, Line, Button } from '../components/ui'

/* X · The one symmetrical spread. */
export function Testimonial() {
  const scope = useGsap((root) => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.fromTo('[data-tm-media]', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
    return () => mm.revert()
  })
  return (
    <section ref={scope} className="relative flex min-h-[640px] items-center justify-center overflow-hidden py-32 text-center lg:h-[940px]" aria-label="Client testimonial">
      <Media asset={media.testimonial} data-tm-media className="absolute! inset-0" label={false} />
      <div className="absolute inset-0 bg-[#0a0907]/60" />
      {!media.testimonial.src && <span className="caption absolute top-10 z-3 hidden text-ivory/55 md:block" style={{ left: 'var(--gutter)' }}>▢ {media.testimonial.brief}</span>}
      <figure className="relative z-3 max-w-[1040px] px-gutter">
        <span className="caption text-bronze">X — In their words{testimonial.isPlaceholder && ' · placeholder testimonial'}</span>
        <blockquote className="serif mt-12 text-[clamp(30px,4.4vw,64px)] leading-[1.12] tracking-[-0.02em] [text-indent:-0.4em]">
          “{testimonial.quote}”
        </blockquote>
        <figcaption className="eyebrow mt-12 text-ivory/80">
          {testimonial.client} &nbsp;·&nbsp; {testimonial.project} &nbsp;·&nbsp; {testimonial.scope}
        </figcaption>
      </figure>
    </section>
  )
}

/* XI · Instagram's 4:5 frames, with the handle written across them. */
export function Journal() {
  const scope = useGsap((root) => {
    const mm = gsap.matchMedia()
    mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
      root.querySelectorAll('[data-speed]').forEach((el) => {
        gsap.fromTo(el, { yPercent: -Number(el.dataset.speed) }, { yPercent: Number(el.dataset.speed), ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
      gsap.fromTo('[data-handle]', { xPercent: -46 }, { xPercent: -54, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
    return () => mm.revert()
  })
  return (
    <section ref={scope} className="overflow-hidden px-gutter pt-7 pb-32 lg:pb-44" aria-labelledby="journal-title">
      <Folio title="XI — Journal" note="On Instagram" page="11" />
      <div className="mt-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mt-32">
        <h2 id="journal-title" className="serif text-[clamp(42px,5vw,72px)] leading-[0.95] tracking-[-0.03em]">From the Journal</h2>
        <a href={contact.instagram} target="_blank" rel="noreferrer" className="eyebrow link-line self-start hover:text-bronze md:self-auto">Follow {contact.handle} ↗</a>
      </div>
      <div className="relative mt-14 lg:mt-20">
        <div className="no-scrollbar bleed-x flex scroll-px-(--gutter) snap-x snap-mandatory gap-3 overflow-x-auto px-gutter md:mx-0 md:gap-4 md:overflow-visible md:px-0 md:pb-24">
          {journal.map((j) => (
            <a key={j.label} href={contact.instagram} target="_blank" rel="noreferrer" className={`group block w-[64vw] shrink-0 snap-start md:w-auto md:min-w-0 md:flex-1 ${j.offset}`}>
              <div data-speed={j.speed}>
                <Media asset={j.media} sizes="(min-width: 768px) 20vw, 64vw" className="aspect-[4/5] w-full [&_[data-media]]:transition-[scale] [&_[data-media]]:duration-[1600ms] [&_[data-media]]:ease-(--ease-expo) group-hover:[&_[data-media]]:scale-105">
                  {j.kind === 'reel' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" className="absolute top-3.5 right-3.5 z-4" aria-label="Video"><path d="M4 2.5l9 5.5-9 5.5z" fill="#EFE9DE" /></svg>
                  )}
                </Media>
                <p className="caption mt-3 text-mute">{j.label}</p>
              </div>
            </a>
          ))}
        </div>
        <div data-handle aria-hidden="true" className="serif pointer-events-none absolute top-[46%] left-1/2 z-5 hidden -translate-y-1/2 text-[clamp(80px,12.4vw,184px)] leading-none tracking-[-0.04em] whitespace-nowrap text-ivory italic mix-blend-difference md:block" style={{ transform: 'translate(-50%,-50%)' }}>
          {contact.handle}
        </div>
      </div>
    </section>
  )
}

/* Closing: a staggered line over the last frame. */
export function FinalCta() {
  const scope = useGsap((root) => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.fromTo('[data-final-media]', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: true } })
    })
    return () => mm.revert()
  })
  return (
    <section ref={scope} className="relative h-svh min-h-[640px] overflow-hidden lg:max-h-[1000px]" aria-labelledby="final-title">
      <Media asset={media.final} data-final-media className="absolute! inset-0" label={false} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,12,10,.5),rgba(13,12,10,.2)_40%,rgba(13,12,10,.88))]" />
      {!media.final.src && <span className="caption absolute top-24 z-3 hidden text-ivory/55 lg:block" style={{ right: 'var(--gutter)' }}>▢ {media.final.brief}</span>}
      <div className="relative z-3 flex h-full flex-col px-gutter pt-[calc(var(--header-h)+48px)] pb-10 lg:pb-16">
        <h2 id="final-title" data-reveal="lines" className="serif text-[clamp(52px,10vw,150px)] leading-[0.88] tracking-[-0.045em]">
          <Line>Your next</Line>
          <Line className="pl-[0.8em] md:pl-[2.2em]">space starts</Line>
          <Line className="text-right italic">in Foshan.</Line>
        </h2>
        <div className="mt-auto flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="text-[17px] leading-[1.65] text-ivory/90">Tell us what you’re building.<br />We’ll handle the sourcing.</p>
          <div className="flex flex-wrap items-center gap-8">
            <Button href="#enquire" magnetic>Start your project</Button>
            <a href={contact.whatsapp || '#enquire'} className="eyebrow link-line hover:text-bronze">Talk to our team</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const links = [nav.left[0], { label: 'How it works', href: '#process' }, nav.right[0], nav.right[1], nav.right[2]]
  return (
    <footer className="px-gutter pt-28 pb-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-12">
        <div className="col-span-2 md:col-span-5">
          <span className="eyebrow text-bronze">Foshan → Worldwide</span>
          <p className="serif mt-5 max-w-[340px] text-[24px] leading-[1.35]">Bespoke furniture sourcing, from the workshop floor to yours.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3 md:col-span-3 md:col-start-7">
          <span className="caption mb-2 text-mute">Studio</span>
          {links.map((l) => <a key={l.label} href={l.href} className="serif self-start text-[21px] hover:text-bronze">{l.label}</a>)}
        </nav>
        <div className="flex flex-col gap-3 md:col-span-3 md:col-start-10">
          <span className="caption mb-2 text-mute">Connect</span>
          <a href={contact.instagram} target="_blank" rel="noreferrer" className="serif self-start text-[21px] hover:text-bronze">Instagram ↗</a>
          <a href={contact.whatsapp || '#enquire'} className="serif self-start text-[21px] hover:text-bronze">WhatsApp {!contact.whatsapp && <span className="caption text-mute">{contact.whatsappLabel}</span>}</a>
          <a href={contact.email || '#enquire'} className="serif self-start text-[21px] hover:text-bronze">Email {!contact.email && <span className="caption text-mute">{contact.emailLabel}</span>}</a>
        </div>
      </div>
      <svg viewBox="0 0 1000 170" className="mt-24 w-full overflow-visible lg:mt-28" role="img" aria-label="OyeExpress">
        <text x="0" y="140" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="#EFE9DE" fontFamily="Bodoni Moda, Didot, Georgia, serif" fontSize="182" letterSpacing="-8">OyeExpress</text>
      </svg>
      <div className="caption mt-10 flex flex-col gap-3 border-t border-ivory/12 pt-5 text-mute md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} OyeExpress</span>
        <span>23.0215° N · 113.1214° E</span>
        <a href="#top" className="text-ivory hover:text-bronze">Back to top ↑</a>
      </div>
    </footer>
  )
}

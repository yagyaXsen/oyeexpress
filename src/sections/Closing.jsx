import { media } from '../content/assets'
import { testimonial, journal, contact, nav } from '../content/site'
import { gsap, useGsap, MOTION_OK } from '../lib/motion'
import Media from '../components/Media'
import { SectionHead, Line, Button } from '../components/ui'

/* Testimonial: the one centred spread. */
export function Testimonial() {
  const scope = useGsap((root) => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.fromTo('[data-tm-media]', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
    return () => mm.revert()
  })
  return (
    <section ref={scope} className="relative flex min-h-[600px] items-center justify-center overflow-hidden py-28 text-center lg:h-[820px]" aria-label="Client testimonial">
      <Media asset={media.testimonial} data-tm-media className="absolute! inset-0" label={false} />
      <div className="absolute inset-0 bg-[#0a0907]/62" />
      {!media.testimonial.src && <span className="caption absolute top-10 z-3 hidden text-ivory/55 md:block" style={{ left: 'var(--gutter)' }}>▢ {media.testimonial.brief}</span>}
      <figure className="relative z-3 max-w-[880px] px-gutter">
        <p className="eyebrow text-ivory/80">Client words{testimonial.isPlaceholder && ' · placeholder'}</p>
        <blockquote className="t-statement mt-8">“{testimonial.quote}”</blockquote>
        <figcaption className="caption mt-8 text-ivory/80">
          {testimonial.client} · {testimonial.project} · {testimonial.scope}
        </figcaption>
      </figure>
    </section>
  )
}

/* 09 · Journal: Instagram's 4:5 frames, in one even row. */
export function Journal() {
  return (
    <section className="px-gutter pt-24 pb-28 lg:pt-32 lg:pb-40" aria-labelledby="journal-title">
      <SectionHead
        n="09"
        label="Journal"
        id="journal-title"
        title={['From the journal.']}
        text="Furniture, interiors and trips to Foshan, as they happen."
      >
        <div className="mt-6">
          <Button href={contact.instagram} variant="outline" size="sm" target="_blank" rel="noreferrer">Follow {contact.handle}</Button>
        </div>
      </SectionHead>
      <div className="no-scrollbar bleed-x mt-16 flex scroll-px-(--gutter) snap-x snap-mandatory gap-3 overflow-x-auto px-gutter md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0 lg:mt-20">
        {journal.map((j) => (
          <a key={j.label} href={contact.instagram} target="_blank" rel="noreferrer" className="group block w-[64vw] shrink-0 snap-start md:w-auto">
            <Media asset={j.media} sizes="(min-width: 768px) 20vw, 64vw" className="aspect-[4/5] w-full [&_[data-media]]:transition-[scale] [&_[data-media]]:duration-[1400ms] [&_[data-media]]:ease-(--ease-expo) group-hover:[&_[data-media]]:scale-[1.04]">
              {j.kind === 'reel' && (
                <svg width="16" height="16" viewBox="0 0 16 16" className="absolute top-3.5 right-3.5 z-4" aria-label="Video"><path d="M4 2.5l9 5.5-9 5.5z" fill="#EFE9DE" /></svg>
              )}
            </Media>
            <p className="caption mt-3 text-ivory/70">{j.label}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

/* Closing: two restrained lines over the last frame. */
export function FinalCta() {
  const scope = useGsap((root) => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.fromTo('[data-final-media]', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: true } })
    })
    return () => mm.revert()
  })
  return (
    <section ref={scope} className="relative h-svh min-h-[620px] overflow-hidden lg:max-h-[900px]" aria-labelledby="final-title">
      <Media asset={media.final} data-final-media className="absolute! inset-0" label={false} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,12,10,.45),rgba(13,12,10,.25)_40%,rgba(13,12,10,.9))]" />
      {!media.final.src && <span className="caption absolute top-24 z-3 hidden text-ivory/55 lg:block" style={{ right: 'var(--gutter)' }}>▢ {media.final.brief}</span>}
      <div className="relative z-3 flex h-full flex-col justify-end px-gutter pt-[calc(var(--header-h)+48px)] pb-12 lg:pb-20">
        <p className="eyebrow text-ivory/85">Foshan <span aria-hidden="true" className="mx-1.5 text-bronze">→</span> Worldwide</p>
        <h2 id="final-title" data-reveal="lines" className="t-display mt-5 text-[clamp(40px,5.4vw,84px)]">
          <Line>Your next space</Line>
          <Line>starts in Foshan.</Line>
        </h2>
        <p className="t-lead mt-6 max-w-[460px] text-ivory/90">Tell us what you’re building. We’ll handle the sourcing.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button href="#enquire" magnetic>Start your project</Button>
          <Button href={contact.whatsapp || '#enquire'} variant="outline" arrow={false}>Talk to our team</Button>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const links = [nav.left[0], { label: 'How it works', href: '#process' }, nav.right[0], nav.right[1], nav.right[2]]
  const link = 'self-start text-[15px] text-ivory/85 transition-colors hover:text-bronze'
  return (
    <footer className="px-gutter pt-24 pb-10">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-ivory/15 pt-12 md:grid-cols-12">
        <div className="col-span-2 md:col-span-5">
          <a href="#top" className="serif text-[28px]">OyeExpress</a>
          <p className="t-body mt-3 max-w-[340px] text-ivory/70">Premium and bespoke furniture, sourced in Foshan and delivered worldwide.</p>
          <div className="mt-6"><Button href="#enquire" size="sm">Start your project</Button></div>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3 md:col-span-3 md:col-start-7">
          <p className="eyebrow mb-1 text-mute">Explore</p>
          {links.map((l) => <a key={l.label} href={l.href} className={link}>{l.label}</a>)}
        </nav>
        <div className="flex flex-col gap-3 md:col-span-3 md:col-start-10">
          <p className="eyebrow mb-1 text-mute">Contact</p>
          <a href={contact.instagram} target="_blank" rel="noreferrer" className={link}>Instagram</a>
          <a href={contact.whatsapp || '#enquire'} className={link}>WhatsApp {!contact.whatsapp && <span className="text-mute">{contact.whatsappLabel}</span>}</a>
          <a href={contact.email || '#enquire'} className={link}>Email {!contact.email && <span className="text-mute">{contact.emailLabel}</span>}</a>
        </div>
      </div>
      <div className="caption mt-16 flex flex-col gap-3 border-t border-ivory/12 pt-5 text-mute md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} OyeExpress</span>
        <span>Foshan, China → Worldwide</span>
        <a href="#top" className="text-ivory/85 hover:text-bronze">Back to top ↑</a>
      </div>
    </footer>
  )
}

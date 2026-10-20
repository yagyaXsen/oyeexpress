import { media } from '../content/assets'
import { foshanFrames, foshanReasons } from '../content/site'
import { gsap, useGsap, MOTION_OK } from '../lib/motion'
import Media from '../components/Media'
import { Folio } from '../components/ui'

/* V · Field notes. A name wider than the screen slides past; a documentary
   frame overlaps it; a contact sheet closes the section. */
export default function Foshan() {
  const scope = useGsap((root) => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.fromTo('[data-fs-word]', { xPercent: 6 }, {
        xPercent: -34, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'center top', scrub: true },
      })
    })
    return () => mm.revert()
  })

  return (
    <section id="foshan" ref={scope} className="overflow-hidden bg-night pt-7 pb-32 lg:pb-44" aria-labelledby="foshan-title">
      <div className="px-gutter">
        <Folio title="VI — Why Foshan" note="Guangdong, China" page="06" />
      </div>

      <p data-fs-word aria-hidden="true" className="serif mt-16 pl-[calc(var(--gutter)-0.06em)] text-[clamp(150px,31vw,450px)] leading-[0.76] tracking-[-0.045em] whitespace-nowrap lg:mt-20">
        FOSHAN
      </p>

      <div className="relative z-2 grid grid-cols-1 gap-14 px-gutter md:grid-cols-12 md:gap-x-6">
        <figure className="bleed-l -mt-[12vw] md:col-span-8 lg:-mt-[150px]">
          <Media asset={media.foshan.film} reveal="clip" parallax={6} sizes="(min-width: 768px) 70vw, 100vw" className="aspect-[4/5] w-full md:aspect-[16/12] lg:aspect-auto lg:h-[760px]" />
          <figcaption className="caption mt-3.5 pl-gutter text-mute">Fig. 05 — Timber stock, raking light. Film.</figcaption>
        </figure>

        <div className="md:col-span-4 md:col-start-9 md:pt-10">
          <h2 id="foshan-title" data-reveal="lines" className="serif text-[clamp(40px,4.4vw,66px)] leading-[0.96] tracking-[-0.03em]">
            <span className="-mb-[0.1em] block overflow-hidden pb-[0.16em]"><span data-line className="block">China’s furniture</span></span>
            <span className="-mb-[0.1em] block overflow-hidden pb-[0.16em]"><span data-line className="block">capital.</span></span>
          </h2>
          <p className="mt-7 text-[17px] leading-[1.65] text-ivory/85">
            Foshan, in southern China, is one of the world’s largest centres for furniture making. Factories, showrooms and material suppliers are all in one place.
          </p>
          <ul className="mt-9 border-t border-ivory/15">
            {foshanReasons.map((r) => (
              <li key={r.title} className="border-b border-ivory/15 py-4">
                <h3 className="eyebrow text-[12px] text-bronze">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ivory/75">{r.text}</p>
              </li>
            ))}
          </ul>
          <figure className="mt-14 max-w-[360px]">
            <DeltaMap />
            <figcaption className="caption mt-2.5 text-mute">Fig. 06 — Pearl River Delta. Not to scale.</figcaption>
          </figure>
        </div>
      </div>

      <div className="no-scrollbar mt-24 flex scroll-px-(--gutter) snap-x snap-mandatory gap-1 overflow-x-auto px-gutter lg:mt-36 lg:overflow-visible">
        {foshanFrames.map((f) => (
          <figure key={f.n} className="m-0 w-[68vw] shrink-0 snap-start sm:w-[44vw] lg:w-auto lg:min-w-0 lg:shrink lg:basis-0 lg:grow-(--g)" style={{ '--g': f.grow }}>
            <Media asset={f.media} className="h-[300px] w-full" sizes="(min-width: 1024px) 20vw, 68vw" />
            <figcaption className="caption mt-3 text-mute">{f.n} {f.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function DeltaMap() {
  return (
    <svg viewBox="0 0 340 290" role="img" aria-label="Map: Foshan beside Guangzhou in the Pearl River Delta, with Shenzhen, Hong Kong and Macau to the south" className="h-auto w-full">
      <circle cx="71" cy="74" r="30" fill="none" stroke="#B89668" strokeWidth=".8" />
      <circle cx="71" cy="74" r="64" fill="none" stroke="rgba(239,233,222,.2)" strokeWidth=".8" strokeDasharray="2 4" />
      <circle cx="71" cy="74" r="4" fill="#B89668" />
      <circle cx="103" cy="49" r="2.5" fill="#EFE9DE" />
      <circle cx="287" cy="185" r="2.5" fill="#EFE9DE" />
      <circle cx="312" cy="235" r="2.5" fill="#EFE9DE" />
      <circle cx="167" cy="263" r="2.5" fill="#EFE9DE" />
      <text x="84" y="98" fill="#B89668" fontFamily="DM Mono, monospace" fontSize="10">FOSHAN</text>
      <text x="110" y="46" fill="#9C9486" fontFamily="DM Mono, monospace" fontSize="9">Guangzhou</text>
      <text x="236" y="178" fill="#9C9486" fontFamily="DM Mono, monospace" fontSize="9">Shenzhen</text>
      <text x="252" y="252" fill="#9C9486" fontFamily="DM Mono, monospace" fontSize="9">Hong Kong</text>
      <text x="176" y="267" fill="#9C9486" fontFamily="DM Mono, monospace" fontSize="9">Macau</text>
      <text x="140" y="140" fill="rgba(239,233,222,.42)" fontFamily="Bodoni Moda, serif" fontStyle="italic" fontSize="15">Pearl River Delta</text>
    </svg>
  )
}

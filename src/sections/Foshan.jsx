import { media } from '../content/assets'
import { foshanFrames, foshanReasons } from '../content/site'
import Media from '../components/Media'
import { SectionHead } from '../components/ui'

/* 05 · Why Foshan? A wide film, three plain reasons, the place on a map. */
export default function Foshan() {
  return (
    <section id="foshan" className="bg-night px-gutter pt-24 pb-28 lg:pt-32 lg:pb-40" aria-labelledby="foshan-title">
      <SectionHead
        n="05"
        label="Why Foshan"
        id="foshan-title"
        title={['China’s furniture', 'capital.']}
        text="Foshan, in southern China, is one of the world’s largest centres for furniture making. Factories, showrooms and material suppliers are all in one place."
      />

      <figure className="mt-16 lg:mt-20">
        <Media asset={media.foshan.film} reveal="clip" sizes="100vw" className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]" />
        <figcaption className="caption mt-3 text-mute">Timber stock in a furniture workshop.</figcaption>
      </figure>

      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-6 lg:mt-20">
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-8 md:gap-6">
          {foshanReasons.map((r, i) => (
            <li key={r.title} className="border-t border-ivory/15 pt-5">
              <p className="eyebrow text-bronze">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="t-h3 mt-2">{r.title}</h3>
              <p className="t-body mt-2 text-ivory/75">{r.text}</p>
            </li>
          ))}
        </ol>
        <figure className="max-w-[340px] border-t border-ivory/15 pt-5 md:col-span-3 md:col-start-10">
          <DeltaMap />
          <figcaption className="caption mt-2 text-mute">Pearl River Delta. Not to scale.</figcaption>
        </figure>
      </div>

      <div className="no-scrollbar bleed-x mt-20 flex scroll-px-(--gutter) snap-x snap-mandatory gap-2 overflow-x-auto px-gutter lg:mx-0 lg:mt-24 lg:overflow-visible lg:px-0">
        {foshanFrames.map((f) => (
          <figure key={f.n} className="m-0 w-[68vw] shrink-0 snap-start sm:w-[44vw] lg:w-auto lg:min-w-0 lg:shrink lg:basis-0 lg:grow-(--g)" style={{ '--g': f.grow }}>
            <Media asset={f.media} className="h-[280px] w-full" sizes="(min-width: 1024px) 20vw, 68vw" />
            <figcaption className="caption mt-3 text-ivory/70">{f.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function DeltaMap() {
  const label = { fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 500 }
  return (
    <svg viewBox="0 0 340 290" role="img" aria-label="Map: Foshan beside Guangzhou in the Pearl River Delta, with Shenzhen, Hong Kong and Macau to the south" className="h-auto w-full">
      <circle cx="71" cy="74" r="30" fill="none" stroke="#B89668" strokeWidth=".8" />
      <circle cx="71" cy="74" r="4" fill="#B89668" />
      <circle cx="103" cy="49" r="2.5" fill="#EFE9DE" />
      <circle cx="287" cy="185" r="2.5" fill="#EFE9DE" />
      <circle cx="312" cy="235" r="2.5" fill="#EFE9DE" />
      <circle cx="167" cy="263" r="2.5" fill="#EFE9DE" />
      <text x="84" y="98" fill="#B89668" {...label} fontWeight="600">Foshan</text>
      <text x="110" y="46" fill="#9C9486" {...label}>Guangzhou</text>
      <text x="240" y="178" fill="#9C9486" {...label}>Shenzhen</text>
      <text x="254" y="252" fill="#9C9486" {...label}>Hong Kong</text>
      <text x="176" y="267" fill="#9C9486" {...label}>Macau</text>
    </svg>
  )
}

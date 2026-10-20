import { journey, materials } from '../content/site'
import Media from '../components/Media'
import { Folio, Button } from '../components/ui'

/* III · How does it work? Six steps, readable at a glance, with nothing
   hidden behind scroll animation. */
export default function Journey() {
  return (
    <section id="process" className="bg-umber px-gutter pt-7 pb-32 lg:pb-44" aria-labelledby="process-title">
      <Folio title="V — How it works" note="Six steps" page="05" />

      <div className="mt-20 grid grid-cols-1 items-end gap-8 md:grid-cols-12 lg:mt-28">
        <h2 id="process-title" data-reveal="lines" className="serif text-[clamp(44px,7vw,104px)] leading-[0.92] tracking-[-0.04em] md:col-span-8">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.16em]"><span data-line className="block">From Foshan</span></span>
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.16em]"><span data-line className="block text-bronze italic">to your space.</span></span>
        </h2>
        <p className="max-w-[380px] text-[17px] leading-[1.65] text-ivory/80 md:col-span-4">
          You tell us what you need. We take care of everything else, and keep you updated at every step.
        </p>
      </div>

      <ol className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-y-20">
        {journey.map((s) => (
          <li key={s.n} data-reveal="up" className="border-t border-ivory/15 pt-6">
            <div className="flex items-baseline gap-4">
              <span className="serif text-[44px] leading-none text-bronze italic">{s.n}</span>
              <h3 className="eyebrow text-[12px] text-ivory">{s.title}</h3>
            </div>
            <p className="mt-4 max-w-[380px] text-[16px] leading-[1.6] text-ivory/75">{s.text}</p>
            <div className="mt-6">
              {s.materials ? (
                <div className="grid aspect-[16/10] grid-cols-3 grid-rows-2 gap-1">
                  {materials.map((m) => (
                    <Media key={m.label} asset={m.media} className="h-full w-full" sizes="160px">
                      <span className={`caption absolute bottom-2 left-2.5 z-3 text-[10px] ${m.light ? 'text-coal/75' : 'text-ivory/85'}`}>{m.label}</span>
                    </Media>
                  ))}
                </div>
              ) : (
                <Media asset={s.media} className="aspect-[16/10] w-full" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-20 flex flex-col items-start gap-6 border-t border-ivory/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="serif text-[clamp(22px,2vw,28px)]">Ready when you are.</p>
        <Button href="#enquire">Start your project</Button>
      </div>
    </section>
  )
}

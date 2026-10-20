import { journey, materials } from '../content/site'
import Media from '../components/Media'
import { SectionHead, Button } from '../components/ui'

/* 04 · How does it work? Six steps, readable at a glance. */
export default function Journey() {
  return (
    <section id="process" className="bg-umber px-gutter pt-24 pb-28 lg:pt-32 lg:pb-40" aria-labelledby="process-title">
      <SectionHead
        n="04"
        label="How it works"
        id="process-title"
        title={['How furniture gets', 'from Foshan to you.']}
        text="You tell us what you need. We take care of everything else, and keep you updated at every step."
      />

      <ol className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-y-20">
        {journey.map((s) => (
          <li key={s.n} data-reveal="up">
            {s.materials ? (
              <div className="grid aspect-[4/3] grid-cols-3 grid-rows-2 gap-1">
                {materials.map((m) => (
                  <Media key={m.label} asset={m.media} className="h-full w-full" sizes="160px">
                    <span className={`caption absolute bottom-2 left-2.5 z-3 text-[11px] ${m.light ? 'text-coal/80' : 'text-ivory/90'}`}>{m.label}</span>
                  </Media>
                ))}
              </div>
            ) : (
              <Media asset={s.media} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
            )}
            <p className="eyebrow mt-6 text-bronze">Step {s.n}</p>
            <h3 className="t-h3 mt-2">{s.title}</h3>
            <p className="t-body mt-2 max-w-[400px] text-ivory/75">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-20 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button href="#enquire">Start your project</Button>
      </div>
    </section>
  )
}

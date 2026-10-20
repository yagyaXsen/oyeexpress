import { whyUs } from '../content/site'
import Media from '../components/Media'
import { SectionHead, Button } from '../components/ui'

/* 06 · Why OyeExpress? Four points of value. */
export default function WhyUs() {
  return (
    <section id="why" className="bg-paper px-gutter pt-24 pb-28 text-coal lg:pt-32 lg:pb-40" aria-labelledby="why-title">
      <SectionHead
        n="06"
        label="Why OyeExpress"
        id="why-title"
        tone="paper"
        title={['More than', 'furniture sourcing.']}
        text="Finding furniture is only the start. We make sure it is right, and that it reaches you."
      />

      <ol className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {whyUs.map((w) => (
          <li key={w.n} data-reveal="up">
            <Media asset={w.media} className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" />
            <p className="eyebrow mt-6 text-oxide">{w.n}</p>
            <h3 className="t-h3 mt-2">{w.title}</h3>
            <p className="t-body mt-2 max-w-[320px] text-stone">{w.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-20 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button href="#enquire" variant="ink">Start your project</Button>
        <Button href="#enquire" variant="outline-ink" arrow={false}>Talk to our team</Button>
      </div>
    </section>
  )
}

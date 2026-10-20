import { whyUs } from '../content/site'
import Media from '../components/Media'
import { Folio, Line, Button } from '../components/ui'

/* V · Why OyeExpress? Four plain points of value. */
export default function WhyUs() {
  return (
    <section id="why" className="bg-paper px-gutter pt-7 pb-32 text-coal lg:pb-44" aria-labelledby="why-title">
      <Folio title="VII — Why OyeExpress" note="What you get" page="07" tone="paper" />

      <div className="mt-20 grid grid-cols-1 items-end gap-8 md:grid-cols-12 lg:mt-28">
        <h2 id="why-title" data-reveal="lines" className="serif text-[clamp(44px,7.6vw,112px)] leading-[0.9] tracking-[-0.04em] md:col-span-8">
          <Line>More than</Line>
          <Line className="italic">furniture sourcing.</Line>
        </h2>
        <p className="max-w-[380px] text-[17px] leading-[1.65] text-stone md:col-span-4">
          Finding furniture is only the start. We make sure it is right, and that it reaches you.
        </p>
      </div>

      <ol className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 border-t border-coal/20 pt-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
        {whyUs.map((w) => (
          <li key={w.n} data-reveal="up">
            <Media asset={w.media} className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" />
            <span className="serif mt-6 block text-[40px] leading-none text-oxide italic">{w.n}</span>
            <h3 className="eyebrow mt-4 text-[12px] text-coal">{w.title}</h3>
            <p className="mt-3 max-w-[300px] text-[16px] leading-[1.6] text-stone">{w.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-20 flex flex-wrap items-center gap-8">
        <Button href="#enquire" variant="ink">Request sourcing</Button>
        <a href="#enquire" className="eyebrow link-line hover:text-oxide">Talk to our team</a>
      </div>
    </section>
  )
}

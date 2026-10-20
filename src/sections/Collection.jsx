import { collections } from '../content/site'
import Media from '../components/Media'
import { SectionHead, Button } from '../components/ui'

/* 02 · What can I source? Image-led category cards; the photographs lead. */
export default function Collection() {
  return (
    <section id="collections" className="px-gutter pt-24 pb-28 lg:pt-32 lg:pb-40" aria-labelledby="collection-title">
      <SectionHead
        n="02"
        label="Collections"
        id="collection-title"
        title={['Furniture for', 'every kind of space.']}
        text="Living, bedroom, dining and outdoor furniture, sourced around your project. Ready-made pieces or fully custom."
      />

      <ul className="mt-16 grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-5 lg:mt-20 lg:grid-cols-4 lg:gap-y-14">
        {collections.map((c) => (
          <li key={c.n} data-reveal="up">
            <a href={c.href || '#enquire'} className="group block">
              <Media
                asset={c.media}
                sizes="(min-width: 1024px) 24vw, 48vw"
                className="aspect-[4/5] w-full [&_[data-media]]:transition-[scale] [&_[data-media]]:duration-[1400ms] [&_[data-media]]:ease-(--ease-expo) group-hover:[&_[data-media]]:scale-[1.04]"
              />
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="t-h3 text-[17px] md:text-[20px]">{c.name}</h3>
                <span aria-hidden="true" className="text-bronze transition-transform duration-500 group-hover:translate-x-1">→</span>
              </div>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-ivory/70 md:text-[15px]">{c.tagline}</p>
            </a>
          </li>
        ))}
        <li data-reveal="up" className="col-span-2 lg:col-span-1">
          <div className="flex h-full min-h-[220px] flex-col justify-between border border-ivory/15 p-6 lg:aspect-[4/5] lg:min-h-0">
            <div>
              <h3 className="t-h3">Can’t see what you need?</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-ivory/70">Tell us the piece. We source to order.</p>
            </div>
            <Button href="#enquire" size="sm" className="mt-6 self-start">Request sourcing</Button>
          </div>
        </li>
      </ul>
    </section>
  )
}

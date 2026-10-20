import { media } from '../content/assets'
import Media from '../components/Media'
import { Folio, Line, Button } from '../components/ui'

/* II · What is OyeExpress? One plain sentence, one image, one action. */
export default function Idea() {
  return (
    <section id="about" className="bg-paper px-gutter pt-7 pb-32 text-coal lg:pb-44" aria-labelledby="about-title">
      <Folio title="II — About OyeExpress" note="What we do" page="02" tone="paper" />

      <h2 id="about-title" data-reveal="lines" className="serif mt-20 text-[clamp(46px,9vw,136px)] leading-[0.92] tracking-[-0.04em] lg:mt-28">
        <Line>
          <span className="flex flex-wrap items-center gap-x-[0.16em]">
            Furniture
            <Media asset={media.idea.inline} label={false} sizes="320px" className="inline-block h-[0.72em] w-[2em] translate-y-[0.04em]" />
            from Foshan,
          </span>
        </Line>
        <Line className="text-right italic">to your door.</Line>
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-6 lg:mt-24">
        <div className="md:col-span-7 lg:col-span-6">
          <p className="serif text-[clamp(24px,2.4vw,34px)] leading-[1.3] tracking-[-0.01em]">
            OyeExpress is a furniture sourcing company. We find the right furniture in Foshan, China, check it, and deliver it to your project.
          </p>
          <p className="mt-8 max-w-[520px] text-[17px] leading-[1.7] text-stone">
            You tell us what you need. We handle the sourcing, customisation, quality checks, shipping and delivery, so you deal with one team from start to finish.
          </p>
          <ul className="mt-10 grid max-w-[540px] grid-cols-2 gap-x-6 gap-y-3 border-t border-coal/20 pt-6 text-[15px] text-coal sm:grid-cols-3">
            {['Homes & villas', 'Hotels & restaurants', 'Offices & retail', 'Interior designers', 'Ready-made pieces', 'Custom furniture'].map((t) => (
              <li key={t} className="flex items-center gap-2.5"><span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-oxide" />{t}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Button href="#enquire" variant="ink">Start your project</Button>
            <a href="#process" className="eyebrow link-line hover:text-oxide">See how it works</a>
          </div>
        </div>
        <figure className="bleed-r md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          <Media asset={media.idea.portrait} reveal="clip" parallax={8} sizes="(min-width: 768px) 36vw, 100vw" className="aspect-[4/5] w-full" />
          <figcaption className="caption mt-3.5 text-stone">Bouclé sofa, sourced to order.</figcaption>
        </figure>
      </div>
    </section>
  )
}

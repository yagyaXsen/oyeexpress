import { media } from '../content/assets'
import Media from '../components/Media'
import { Button } from '../components/ui'

/* 01 · What is OyeExpress? One statement, plain support, the image leads. */
export default function Idea() {
  return (
    <section id="about" className="bg-paper px-gutter pt-24 pb-28 text-coal lg:pt-32 lg:pb-40" aria-labelledby="about-title">
      <p className="eyebrow border-t border-coal/20 pt-5 text-stone">
        <span className="text-oxide">01</span><span aria-hidden="true" className="mx-2">/</span>About
      </p>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-x-6 lg:mt-16">
        <div className="flex flex-col md:col-span-6 lg:col-span-5">
          <h2 id="about-title" data-reveal="up" className="t-statement">
            OyeExpress is a furniture sourcing company. We find the right furniture in Foshan, China, check it, and deliver it to your project.
          </h2>
          <p className="t-body mt-8 max-w-[480px] text-stone">
            You tell us what you need. We handle sourcing, customisation, quality checks, shipping and delivery, so you deal with one team from start to finish.
          </p>
          <ul className="mt-10 grid max-w-[480px] grid-cols-2 gap-x-6 gap-y-3 border-t border-coal/20 pt-6 text-[15px]">
            {['Homes & villas', 'Hotels & restaurants', 'Offices & retail', 'Interior designers', 'Ready-made pieces', 'Custom furniture'].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-oxide" />{t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-auto md:pt-10">
            <Button href="#enquire" variant="ink">Start your project</Button>
            <Button href="#process" variant="outline-ink" arrow={false}>How it works</Button>
          </div>
        </div>
        <figure className="bleed-r md:col-span-6 md:col-start-7">
          <Media asset={media.idea.portrait} reveal="clip" parallax={6} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5] w-full lg:aspect-[5/6]" />
          <figcaption className="caption mt-3 text-stone">Bouclé sofa, sourced to order.</figcaption>
        </figure>
      </div>
    </section>
  )
}

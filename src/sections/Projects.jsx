import { useState } from 'react'
import { projects, projectFilters, audiences } from '../content/site'
import Media from '../components/Media'
import { Folio, Button } from '../components/ui'

/* IX · Features with credits, set like an architecture magazine. */
export default function Projects() {
  const [filter, setFilter] = useState('all')
  const on = (p) => filter === 'all' || p.category === filter
  const [feature, ...rest] = projects
  const layout = [
    'md:col-span-5',
    'md:col-span-6 md:col-start-7 md:mt-[300px]',
    'md:col-span-4 md:col-start-3 md:mt-[120px]',
    'md:col-span-5 md:col-start-8 md:mt-[40px] md:bleed-r',
  ]
  const ratio = ['aspect-[4/5]', 'aspect-[3/2]', 'aspect-square', 'aspect-[4/3]']

  return (
    <section id="projects" className="px-gutter pt-7 pb-36 lg:pb-52" aria-labelledby="projects-title">
      <Folio title="IX — Projects" note="Example spaces" page="09" />

      <div className="mt-20 flex flex-col gap-10 lg:mt-32 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="projects-title" data-reveal="lines" className="serif text-[clamp(48px,8vw,120px)] leading-[0.9] tracking-[-0.04em]">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.16em]"><span data-line className="block">Spaces we’ve</span></span>
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.16em]"><span data-line className="block">helped create.</span></span>
        </h2>
        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex flex-wrap items-baseline" role="group" aria-label="Filter projects">
            {projectFilters.map((f, i) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`serif min-h-11 px-0.5 text-[19px] transition-colors duration-500 md:text-[21px] ${filter === f.key ? 'text-ivory italic' : 'text-ivory/45 hover:text-ivory/80'}`}
              >
                {f.label}
                {i < projectFilters.length - 1 && <span className="px-2 text-ivory/25 not-italic" aria-hidden="true">/</span>}
              </button>
            ))}
          </div>
          <span className="caption text-bronze">Placeholder projects: replace before launch</span>
        </div>
      </div>

      <a href="#projects" className="group relative mt-16 block transition-opacity duration-700 lg:mt-24" style={{ opacity: on(feature) ? 1 : 0.14 }}>
        <Media asset={feature.media} reveal="clip" sizes="100vw" className="aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-[720px]">
          <div className="absolute inset-0 z-2 transition-[scale] duration-1000" />
        </Media>
        <div className="relative z-4 bg-ink pt-7 md:absolute md:right-0 md:-bottom-[72px] md:w-[440px] md:pl-9">
          <span className="caption text-bronze">Project {feature.n} — {feature.label}</span>
          <h3 className="serif mt-3 text-[clamp(34px,3vw,44px)] leading-none">{feature.name}</h3>
          <dl className="caption mt-6 grid grid-cols-[90px_1fr] gap-y-2 text-mute">
            <dt>Location</dt><dd className="text-ivory">{feature.location}</dd>
            <dt>Scope</dt><dd className="text-ivory">{feature.scope}</dd>
            <dt>Sourced</dt><dd className="text-ivory">Foshan</dd>
          </dl>
        </div>
      </a>

      <div className="mt-16 grid grid-cols-1 gap-14 md:mt-[200px] md:grid-cols-12 md:gap-x-6 md:gap-y-0">
        {rest.map((p, i) => (
          <a
            key={p.id}
            href="#projects"
            className={`group block transition-opacity duration-700 ${layout[i]}`}
            style={{ opacity: on(p) ? 1 : 0.14 }}
          >
            <Media asset={p.media} sizes="(min-width: 768px) 45vw, 100vw" className={`w-full ${ratio[i]} [&_[data-media]]:transition-[scale] [&_[data-media]]:duration-[1600ms] [&_[data-media]]:ease-(--ease-expo) group-hover:[&_[data-media]]:scale-105`}>
              <div className="absolute inset-x-6 bottom-5 z-4 translate-y-2.5 opacity-0 transition-[opacity,translate] duration-700 ease-(--ease-expo) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="serif block text-[30px] leading-none">{p.name}</span>
                <span className="caption mt-2 block">{p.location} · {p.scope}</span>
              </div>
              <div className="absolute inset-0 z-3 bg-linear-to-t from-ink/70 to-transparent to-50% opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </Media>
            <p className="caption mt-3.5 flex justify-between text-mute">
              <span>{p.n} — {p.label}</span>
              <span className="md:hidden">{p.location}</span>
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}

/* VIII · Who it's for: visitors find themselves in one glance. */
export function Audiences() {
  return (
    <section id="who" className="px-gutter pt-7 pb-24 lg:pb-32" aria-labelledby="who-title">
      <Folio title="VIII — Who it’s for" note="Homes, hospitality, designers, business" page="08" />
      <div className="mt-20 grid grid-cols-1 items-end gap-8 md:grid-cols-12 lg:mt-28">
        <h2 id="who-title" data-reveal="lines" className="serif text-[clamp(44px,7vw,104px)] leading-[0.92] tracking-[-0.04em] md:col-span-8">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.16em]"><span data-line className="block">Who we work with.</span></span>
        </h2>
        <p className="max-w-[360px] text-[17px] leading-[1.65] text-ivory/80 md:col-span-4">
          From a single statement piece to a fully furnished villa or hotel.
        </p>
      </div>
      <ul className="mt-14 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {audiences.map((a) => (
          <li key={a.title} data-reveal="up">
            <a href="#enquire" className="group block">
              <Media asset={a.media} className="aspect-[3/4] w-full [&_[data-media]]:transition-[scale] [&_[data-media]]:duration-[1600ms] [&_[data-media]]:ease-(--ease-expo) group-hover:[&_[data-media]]:scale-105" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" />
              <h3 className="serif mt-5 text-[32px] leading-none">{a.title}</h3>
              <p className="mt-2 text-[16px] leading-[1.55] text-ivory/75">{a.text}</p>
              <span className="eyebrow mt-4 inline-block text-bronze transition-transform duration-500 group-hover:translate-x-1">Start a project →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

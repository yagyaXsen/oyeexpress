import { useState } from 'react'
import { projects, projectFilters, audiences } from '../content/site'
import Media from '../components/Media'
import { SectionHead, Button } from '../components/ui'

const zoom = '[&_[data-media]]:transition-[scale] [&_[data-media]]:duration-[1400ms] [&_[data-media]]:ease-(--ease-expo) group-hover:[&_[data-media]]:scale-[1.04]'

/* 08 · Projects: one feature, then a calm two-column gallery.
   Details stay visible (not hidden behind hover). */
export default function Projects() {
  const [filter, setFilter] = useState('all')
  const on = (p) => filter === 'all' || p.category === filter
  const [feature, ...rest] = projects

  return (
    <section id="projects" className="px-gutter pt-24 pb-28 lg:pt-32 lg:pb-40" aria-labelledby="projects-title">
      <SectionHead
        n="08"
        label="Projects"
        id="projects-title"
        title={['Spaces we’ve', 'helped furnish.']}
        text="A selection of homes, villas, hotels and restaurants furnished with pieces sourced in Foshan."
      >
        <p className="caption mt-4 text-bronze">Example projects. Replace before launch.</p>
      </SectionHead>

      <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {projectFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`min-h-10 border px-4 text-[14px] font-medium transition-colors duration-300 ${
              filter === f.key ? 'border-ivory bg-ivory text-ink' : 'border-ivory/25 text-ivory/80 hover:border-ivory/60'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <a href="#projects" className={`group mt-10 block transition-opacity duration-500 ${on(feature) ? '' : 'opacity-20'}`}>
        <Media asset={feature.media} reveal="clip" sizes="100vw" className={`aspect-[4/5] w-full sm:aspect-[16/9] ${zoom}`} />
        <ProjectCaption p={feature} />
      </a>

      <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2">
        {rest.map((p) => (
          <li key={p.id} className={`transition-opacity duration-500 ${on(p) ? '' : 'opacity-20'}`}>
            <a href="#projects" className="group block">
              <Media asset={p.media} sizes="(min-width: 768px) 48vw, 100vw" className={`aspect-[4/3] w-full ${zoom}`} />
              <ProjectCaption p={p} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProjectCaption({ p }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
      <div>
        <p className="eyebrow text-bronze">{p.label}</p>
        <h3 className="t-h3 mt-2">{p.name}</h3>
      </div>
      <p className="caption text-ivory/70 sm:text-right">{p.location} · {p.scope}</p>
    </div>
  )
}

/* 07 · Who it's for: visitors find themselves at a glance. */
export function Audiences() {
  return (
    <section id="who" className="px-gutter pt-24 pb-8 lg:pt-32" aria-labelledby="who-title">
      <SectionHead
        n="07"
        label="Who it’s for"
        id="who-title"
        title={['Who we work with.']}
        text="From a single statement piece to a fully furnished villa or hotel."
      />
      <ul className="mt-16 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {audiences.map((a) => (
          <li key={a.title} data-reveal="up">
            <a href="#enquire" className="group block">
              <Media asset={a.media} className={`aspect-[4/5] w-full ${zoom}`} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" />
              <h3 className="t-h3 mt-5">{a.title}</h3>
              <p className="t-body mt-1.5 text-ivory/75">{a.text}</p>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button href="#enquire">Start your project</Button>
      </div>
    </section>
  )
}

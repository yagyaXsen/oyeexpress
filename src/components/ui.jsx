import { useMagnetic } from '../lib/useMagnetic'

export function Arrow({ className = '', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" className={className} aria-hidden="true">
      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

/**
 * Buttons: one style family across the site.
 *   variant 'primary' (default) · 'outline' on dark grounds
 *   variant 'ink' · 'outline-ink' on paper grounds
 */
export function Button({ href, children, variant = 'primary', size, magnetic = false, className = '', arrow = true, ...rest }) {
  const ref = useMagnetic(magnetic)
  const v = { primary: '', outline: 'btn-outline', ink: 'btn-ink', 'outline-ink': 'btn-outline-ink' }[variant] ?? ''
  const cls = `btn ${v} ${size === 'sm' ? 'btn-sm' : ''} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  )
  return href ? (
    <a ref={ref} href={href} className={cls} {...rest}>{content}</a>
  ) : (
    <button ref={ref} type="button" className={cls} {...rest}>{content}</button>
  )
}

/**
 * The one section header used everywhere:
 *   01 / LABEL            (eyebrow, on a hairline)
 *   Heading in two lines  (t-h2, sans)       Short description (t-body)
 */
export function SectionHead({ n, label, title, text, id, tone = 'dark', children, className = '' }) {
  const paper = tone === 'paper'
  const lines = Array.isArray(title) ? title : [title]
  return (
    <header className={className}>
      <p className={`eyebrow border-t pt-5 ${paper ? 'border-coal/20 text-stone' : 'border-ivory/15 text-mute'}`}>
        <span className={paper ? 'text-oxide' : 'text-bronze'}>{n}</span>
        <span aria-hidden="true" className="mx-2">/</span>
        {label}
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end md:gap-x-6 lg:mt-16">
        <h2 id={id} data-reveal="lines" className="t-h2 md:col-span-7">
          {lines.map((l) => <Line key={l}>{l}</Line>)}
        </h2>
        {(text || children) && (
          <div className="md:col-span-4 md:col-start-9">
            {text && <p className={`t-body max-w-[400px] ${paper ? 'text-stone' : 'text-ivory/75'}`}>{text}</p>}
            {children}
          </div>
        )}
      </div>
    </header>
  )
}

/** A headline line that rises out of a mask. Group lines inside `data-reveal="lines"`. */
export function Line({ children, className = '', as: Tag = 'span' }) {
  return (
    <Tag className={`block overflow-hidden pb-[0.12em] -mb-[0.08em] ${className}`}>
      <span data-line className="block">{children}</span>
    </Tag>
  )
}

export function Grain() {
  return (
    <svg className="grain h-full w-full" aria-hidden="true">
      <filter id="oe-grain">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#oe-grain)" />
    </svg>
  )
}

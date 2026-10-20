import { useMagnetic } from '../lib/useMagnetic'

export function Arrow({ className = '', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" className={className} aria-hidden="true">
      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  )
}

/** Running head that opens every section: section · centre note · page. */
export function Folio({ title, note, page, tone = 'dark', className = '' }) {
  const color = tone === 'paper' ? 'border-coal/20 text-stone' : 'border-ivory/15 text-mute'
  return (
    <div className={`folio eyebrow ${color} ${className}`}>
      <span>{title}</span>
      {note && <span className="hidden md:inline">{note}</span>}
      <span>{page}</span>
    </div>
  )
}

export function Button({ href, children, variant = 'light', magnetic = false, className = '', arrow = true, ...rest }) {
  const ref = useMagnetic(magnetic)
  const cls = `btn ${variant === 'ink' ? 'btn-ink' : ''} ${className}`
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

/** A headline line that rises out of a mask. Group lines inside `data-reveal="lines"`. */
export function Line({ children, className = '', as: Tag = 'span' }) {
  return (
    <Tag className={`block overflow-hidden pb-[0.16em] -mb-[0.1em] ${className}`}>
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

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { nav, contact } from '../content/site'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { lockScroll } from '../lib/scroll'
import { introDelay } from '../lib/intro'
import { Button } from './ui'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)

  // Transparent over the hero → solid ink; tucks away on scroll down, returns on scroll up.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > window.innerHeight * 0.9)
        last = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { yPercent: -100, opacity: 0, duration: 1.4, ease: 'expo.out', delay: introDelay() + 0.6 })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    lockScroll(open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open
  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-60 transition-[background-color,border-color,transform] duration-700 ease-(--ease-expo) ${
          solid ? 'border-b border-ivory/10 bg-ink/95' : 'border-b border-transparent bg-transparent'
        } ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div
          className={`grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-6 px-gutter transition-[height] duration-700 ease-(--ease-expo) ${
            scrolled ? 'h-16' : 'h-(--header-h)'
          }`}
        >
          <nav aria-label="Primary" className="hidden gap-8 xl:flex">
            {nav.left.map((l) => (
              <a key={l.href} href={l.href} className="text-[14px] font-medium text-ivory/90 transition-colors hover:text-bronze">{l.label}</a>
            ))}
          </nav>
          <a href="#top" className="serif col-start-2 text-[24px] whitespace-nowrap lg:text-[26px]" aria-label="OyeExpress, back to top">
            OyeExpress
          </a>
          <div className="col-start-3 flex items-center justify-end gap-9">
            <nav aria-label="Secondary" className="hidden gap-8 xl:flex">
              {nav.right.map((l) => (
                <a key={l.href} href={l.href} className="text-[14px] font-medium text-ivory/90 transition-colors hover:text-bronze">{l.label}</a>
              ))}
            </nav>
            <Button href="#enquire" variant="outline" size="sm" arrow={false} className="hidden! lg:inline-flex!">Start a project</Button>
            <button
              type="button"
              className="-mr-2 flex min-h-11 items-center gap-3 px-2 text-[14px] font-medium xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <span aria-hidden="true" className="relative block h-[9px] w-[22px]">
                <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
                <span className={`absolute right-0 bottom-0 h-px bg-current transition-all duration-500 ${open ? 'w-full -translate-y-[4px] -rotate-45' : 'w-[14px]'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function MobileMenu({ open, onClose }) {
  const ref = useRef(null)
  const links = [...nav.left, ...nav.right]

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { visibility: 'visible' })
        gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: prefersReducedMotion() ? 0 : 0.9, ease: 'expo.inOut' })
        gsap.fromTo('[data-menu-item]', { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.05, delay: 0.25 })
        gsap.fromTo('[data-menu-fade]', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.6 })
      } else {
        gsap.to(el, { clipPath: 'inset(0 0 100% 0)', duration: prefersReducedMotion() ? 0 : 0.7, ease: 'expo.inOut', onComplete: () => gsap.set(el, { visibility: 'hidden' }) })
      }
    }, ref)
    return () => ctx.kill()
  }, [open])

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className="invisible fixed inset-0 z-50 flex flex-col bg-ink px-gutter pt-[calc(var(--header-h)+40px)] pb-8 xl:hidden"
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      <nav aria-label="Mobile" className="border-t border-ivory/15">
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="flex items-baseline justify-between overflow-hidden border-b border-ivory/15 py-3.5 md:py-5"
          >
            <span data-menu-item className="block text-[clamp(26px,6vw,40px)] leading-[1.2] font-medium tracking-[-0.02em]">{l.label}</span>
            <span data-menu-item className="caption block text-mute">{String(i + 1).padStart(2, '0')}</span>
          </a>
        ))}
      </nav>
      <div data-menu-fade className="mt-auto flex flex-col gap-5 pt-10">
        <div className="flex gap-6 text-[15px] text-ivory/75">
          <a href={contact.instagram} tabIndex={open ? 0 : -1} className="hover:text-ivory">Instagram</a>
          <a href={contact.whatsapp || '#enquire'} onClick={onClose} tabIndex={open ? 0 : -1} className="hover:text-ivory">WhatsApp</a>
          <a href={contact.email || '#enquire'} onClick={onClose} tabIndex={open ? 0 : -1} className="hover:text-ivory">Email</a>
        </div>
        <Button href="#enquire" onClick={onClose} tabIndex={open ? 0 : -1} className="w-full">Start a project</Button>
      </div>
    </div>
  )
}

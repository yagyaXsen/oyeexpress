import { useEffect, useMemo, useRef, useState } from 'react'
import { enquiry } from '../content/site'
import { submitEnquiry } from '../lib/enquiry'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { Folio, Button } from '../components/ui'

const EMPTY = { space: '', scope: [], location: '', budget: '', files: [], link: '', name: '', email: '', whatsapp: '' }
const lower = (s) => s.toLowerCase()
const list = (xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`)

/* XII · A consultation written as one sentence. Each answer fills a blank. */
export default function Enquiry() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(EMPTY)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done
  const panelRef = useRef(null)
  const firstRender = useRef(true)

  const set = (patch) => { setData((d) => ({ ...d, ...(typeof patch === 'function' ? patch(d) : patch) })); setError('') }

  // Each step's panel rises in.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    if (!panelRef.current || prefersReducedMotion()) return
    gsap.fromTo(panelRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' })
  }, [step, status])

  const previews = useMemo(() => data.files.map((f) => (f.type.startsWith('image/') ? URL.createObjectURL(f) : null)), [data.files])
  useEffect(() => () => previews.forEach((u) => u && URL.revokeObjectURL(u)), [previews])

  const validate = (s = step) => {
    if (s === 0 && !data.space) return 'Choose what you’re furnishing.'
    if (s === 1 && !data.scope.length) return 'Choose at least one.'
    if (s === 2 && !data.location.trim()) return 'Tell us the city.'
    if (s === 3 && !data.budget) return 'Choose a range. “Not sure yet” is fine.'
    if (s === 5) {
      if (!data.name.trim()) return 'Please add your name.'
      if (!data.email.trim() && !data.whatsapp.trim()) return 'Add an email or a WhatsApp number.'
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) return 'That email doesn’t look right.'
    }
    return ''
  }

  const next = async () => {
    const msg = validate()
    if (msg) return setError(msg)
    if (step < 5) return setStep(step + 1)
    setStatus('sending')
    const res = await submitEnquiry(data)
    setStatus(res.ok ? 'done' : 'idle')
    if (!res.ok) setError('Something went wrong. Please try again, or message us on WhatsApp.')
  }
  const go = (i) => { if (i <= step || !validate(i - 1)) { setStep(i); setError('') } }
  const pickAndAdvance = (patch) => { set(patch); setTimeout(() => setStep((s) => Math.min(5, s + 1)), 380) }

  const budgetText = data.budget === 'Not sure yet' ? 'to be decided' : data.budget.replace('Under', 'under').replace('Above', 'above')
  const blanks = [
    { value: data.space && lower(data.space), empty: 'space' },
    { value: data.scope.length ? `${list(data.scope.map(lower))} pieces` : '', empty: 'pieces' },
    { value: data.location, empty: 'city' },
    { value: budgetText, empty: 'budget' },
  ]
  const Blank = ({ i }) => {
    const b = blanks[i]
    const active = step === i
    return (
      <button
        type="button"
        onClick={() => go(i)}
        className={`border-b leading-[1.15] transition-colors duration-500 ${
          b.value ? 'border-coal text-coal' : active ? 'border-oxide text-oxide italic' : 'border-coal/35 text-coal/40 italic'
        } ${active && b.value ? 'border-oxide' : ''}`}
      >
        {b.value || b.empty}
      </button>
    )
  }

  const Options = ({ items, selected, onPick, multi }) => (
    <div className="mt-6 flex flex-wrap gap-2.5">
      {items.map((o) => {
        const on = multi ? selected.includes(o) : selected === o
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(o)}
            className={`flex min-h-12 items-center gap-2.5 border px-5 text-[16px] transition-colors duration-300 ${
              on ? 'border-coal bg-coal text-paper' : 'border-coal/30 text-coal hover:border-coal'
            }`}
          >
            <span aria-hidden="true" className={`flex h-4 w-4 items-center justify-center border text-[10px] ${on ? 'border-paper' : 'border-coal/40'} ${multi ? '' : 'rounded-full'}`}>{on ? '✓' : ''}</span>
            {o}
          </button>
        )
      })}
    </div>
  )

  const field = 'w-full rounded-none border-0 border-b border-coal/35 bg-transparent py-3 text-[20px] font-light text-coal outline-none placeholder:text-coal/35 focus:border-oxide md:text-[22px]'

  return (
    <section id="enquire" className="bg-paper px-gutter pt-7 pb-32 text-coal lg:pb-44" aria-labelledby="enquire-title">
      <Folio title="XII — Start your project" note="Takes about two minutes" page="12" tone="paper" />

      <div className="mt-20 grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-x-6 lg:mt-32">
        <div className="md:col-span-5 lg:col-span-4">
          <h2 id="enquire-title" className="serif text-[clamp(46px,5.8vw,86px)] leading-[0.92] tracking-[-0.035em]">Start your project.</h2>
          <p className="mt-8 max-w-[340px] text-[15px] leading-[1.7] text-stone">
            Tell us what you are building, from a single statement piece to a fully furnished villa. Six short questions, about two minutes.
          </p>
          <p className="mt-6 text-[15px] leading-[1.7] text-stone">
            Prefer to talk? <a href="#enquire" className="text-coal underline underline-offset-4 hover:text-oxide">WhatsApp</a> or <a href="#enquire" className="text-coal underline underline-offset-4 hover:text-oxide">email</a> our team.
          </p>
          {status !== 'done' && (
            <ol className="mt-12 hidden md:block" aria-label="Progress">
              {enquiry.steps.map((s, i) => (
                <li key={s.key}>
                  <button type="button" onClick={() => go(i)} className={`flex min-h-9 items-center gap-4 transition-colors duration-500 ${i === step ? 'text-coal' : i < step ? 'text-oxide' : 'text-coal/35'}`} aria-current={i === step ? 'step' : undefined}>
                    <span className="caption w-6 text-left">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px bg-current transition-[width] duration-700 ease-(--ease-expo)" style={{ width: i === step ? 48 : 16 }} />
                    <span className="eyebrow">{s.q.replace('?', '')}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6" aria-live="polite">
          {status === 'done' ? (
            <div ref={panelRef}>
              <span className="caption text-oxide">Received</span>
              <p className="serif mt-7 text-[clamp(44px,5.4vw,80px)] leading-[0.95] tracking-[-0.035em]">Thank you.<br /><i>Foshan awaits.</i></p>
              <p className="mt-8 max-w-[420px] text-[15px] leading-[1.7] text-stone">A sourcing specialist will read your brief and reply within [X] working days.</p>
              <button type="button" onClick={() => { setData(EMPTY); setStep(0); setStatus('idle') }} className="eyebrow link-line mt-10 hover:text-oxide">Start another brief</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); next() }} noValidate>
              <p className="serif text-[clamp(27px,3.3vw,48px)] leading-[1.42] tracking-[-0.015em]">
                I’m furnishing a <Blank i={0} />, looking for <Blank i={1} />, in <Blank i={2} />, with a budget <span className="whitespace-nowrap">of <Blank i={3} />.</span>
              </p>

              <div ref={panelRef} className="mt-14 min-h-[240px] border-t border-coal/20 pt-7">
                <p className="eyebrow text-stone">
                  <span className="caption mr-3 normal-case text-oxide">{String(step + 1).padStart(2, '0')} / 06</span>
                  {enquiry.steps[step].q}
                </p>

                {step === 0 && <Options items={enquiry.spaces} selected={data.space} onPick={(o) => pickAndAdvance({ space: o })} />}
                {step === 1 && (
                  <>
                    <Options items={enquiry.scopes} selected={data.scope} multi onPick={(o) => set((d) => ({ scope: d.scope.includes(o) ? d.scope.filter((x) => x !== o) : [...d.scope, o] }))} />
                    <p className="caption mt-4 text-stone">Choose as many as you like.</p>
                  </>
                )}
                {step === 2 && (
                  <div className="mt-6 max-w-[520px]">
                    <label htmlFor="enq-location" className="caption text-stone">City and country</label>
                    <input id="enq-location" className={field} value={data.location} onChange={(e) => set({ location: e.target.value })} placeholder="Mumbai, India" autoComplete="address-level2" autoFocus />
                  </div>
                )}
                {step === 3 && <Options items={enquiry.budgets} selected={data.budget} onPick={(o) => pickAndAdvance({ budget: o })} />}
                {step === 4 && (
                  <div className="mt-6">
                    <label className="serif relative inline-flex cursor-pointer items-baseline gap-3 border-b border-coal pb-1 text-[clamp(22px,2.4vw,30px)] hover:text-oxide focus-within:outline focus-within:outline-1 focus-within:outline-offset-4 focus-within:outline-oxide">
                      + Attach images, sketches or plans
                      <input type="file" multiple accept="image/*,.pdf" className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => { const added = Array.from(e.target.files || []); set((d) => ({ files: [...d.files, ...added].slice(0, 12) })); e.target.value = '' }} />
                    </label>
                    <p className="caption mt-3 text-stone">{data.files.length ? `${data.files.length} file${data.files.length > 1 ? 's' : ''} attached` : 'JPG, PNG or PDF · up to 12 files · optional'}</p>
                    {data.files.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {data.files.map((f, i) => (
                          <li key={f.name + i} className="group relative h-[72px] w-[72px] overflow-hidden bg-coal/10">
                            {previews[i] ? <img src={previews[i]} alt={f.name} className="h-full w-full object-cover" /> : <span className="caption flex h-full items-center justify-center p-1 text-center text-[9px] text-stone">{f.name.split('.').pop().toUpperCase()}</span>}
                            <button type="button" aria-label={`Remove ${f.name}`} onClick={() => set({ files: data.files.filter((_, j) => j !== i) })} className="caption absolute top-0.5 right-0.5 flex h-6 w-6 items-center justify-center bg-paper/90 text-coal">×</button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-8 max-w-[520px]">
                      <label htmlFor="enq-link" className="caption text-stone">Or paste a link: Pinterest, Instagram, a website</label>
                      <input id="enq-link" type="url" inputMode="url" className={field} value={data.link} onChange={(e) => set({ link: e.target.value })} placeholder="https://" />
                    </div>
                  </div>
                )}
                {step === 5 && (
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div><label htmlFor="enq-name" className="caption text-stone">Name</label><input id="enq-name" className={field} value={data.name} onChange={(e) => set({ name: e.target.value })} autoComplete="name" autoFocus /></div>
                    <div><label htmlFor="enq-email" className="caption text-stone">Email</label><input id="enq-email" type="email" inputMode="email" className={field} value={data.email} onChange={(e) => set({ email: e.target.value })} autoComplete="email" /></div>
                    <div><label htmlFor="enq-wa" className="caption text-stone">WhatsApp</label><input id="enq-wa" type="tel" inputMode="tel" className={field} value={data.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} autoComplete="tel" placeholder="+91" /></div>
                  </div>
                )}

                <p role="alert" className="caption mt-5 min-h-[1.55em] text-oxide">{error}</p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <button type="button" onClick={() => { setStep(Math.max(0, step - 1)); setError('') }} disabled={step === 0} className="eyebrow min-h-11 transition-colors disabled:text-coal/30 enabled:hover:text-oxide">← Back</button>
                {step < 5 ? (
                  <button type="submit" className="eyebrow link-line hover:text-oxide">Continue →</button>
                ) : (
                  <Button variant="ink" onClick={next} disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Start your project'}</Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

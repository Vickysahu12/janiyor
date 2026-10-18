import { useId, useState } from 'react'
import { Link } from 'react-router'
import { site } from '../../config/site'
import { serviceRow } from '../../data/content'
import { subscribe } from '../../services/newsletter'
import { Icon } from '../ui/Icon'

const YEAR = new Date().getFullYear()
const PAYMENTS = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'COD']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Newsletter() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | done
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) return setError('Please enter a valid email.')
    setError('')
    setState('sending')
    await subscribe(email.trim())
    setState('done')
  }

  if (state === 'done') {
    return (
      <p role="status" className="anim-fade-up flex items-center gap-2 rounded-full bg-chalk/10 px-5 py-4 text-[15px] font-medium text-marigold">
        <Icon name="check-circle" size={20} weight="fill" /> You are in. 10% off is waiting in your inbox.
      </p>
    )
  }
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex rounded-full bg-chalk p-1.5 transition-shadow focus-within:shadow-[0_0_0_4px_rgb(244_182_63/0.45)]">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-invalid={Boolean(error)}
          className="h-11 min-w-0 flex-1 bg-transparent px-4 text-[15px] text-ink outline-none placeholder:text-ink-soft"
        />
        <button type="submit" disabled={state === 'sending'} className="btn h-11 px-5 text-[14px]">
          {state === 'sending' ? 'Joining' : 'Join'}
          <Icon name="arrow" size={15} weight="bold" className="btn-arrow" />
        </button>
      </div>
      <p role="alert" className="mt-2 min-h-5 px-4 text-[13px] text-marigold">
        {error}
      </p>
    </form>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 px-2 pb-2 lg:mt-32 lg:px-3 lg:pb-3">
      <ul className="shell grid grid-cols-2 gap-3 pb-10 lg:grid-cols-4">
        {serviceRow.map((s) => (
          <li key={s.title} className="group flex flex-col items-start gap-3 rounded-[22px] bg-mist p-4 transition-colors hover:bg-mist-deep sm:flex-row sm:items-center sm:gap-3.5">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-chalk text-indigo transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-rotate-12 group-hover:scale-110">
              <Icon name={s.icon} size={22} />
            </span>
            <span>
              <span className="block text-[15px] font-semibold">{s.title}</span>
              <span className="block text-[13px] text-ink-soft">{s.body}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="overflow-hidden rounded-[32px] bg-indigo text-chalk">
        <div className="shell grid gap-12 pt-14 pb-10 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <h2 className="display max-w-[14ch] text-[40px] sm:text-[56px]">
              Sunny letters, <span className="text-marigold">10% off</span> the first order.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[15px] text-chalk/75">New colours, restocks and early sale access. One letter a fortnight, never more.</p>
            <div className="mt-6 max-w-[460px]">
              <Newsletter />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {site.footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[13px] font-semibold text-marigold">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="link-line text-[15px] text-chalk/80 transition-colors hover:text-chalk">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="shell flex flex-col gap-5 border-t border-chalk/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-2">
            {site.footer.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="press grid size-11 place-items-center rounded-full bg-chalk/10 transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-marigold hover:text-ink"
                >
                  <Icon name={s.icon} size={19} />
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2" aria-label="Payment methods">
            {PAYMENTS.map((p) => (
              <li key={p} className="rounded-full bg-chalk/10 px-3 py-1 text-[12px] text-chalk/85">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="shell pt-1 pb-6 text-[12px] text-chalk/60">
          © {YEAR} {site.name}. Demo storefront: prices, reviews and orders are sample data.
        </p>

        {/* The sign-off: the name set huge, its descenders cut off by the panel's bottom edge. */}
        <div className="h-[19vw] overflow-hidden lg:h-[14.5vw]" aria-hidden="true">
          <p className="display text-center text-[27vw] leading-[0.82] tracking-[-0.06em] text-chalk/[0.08] select-none lg:text-[20vw]">janiyor</p>
        </div>
      </div>
    </footer>
  )
}

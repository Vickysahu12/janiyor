import { useRef } from 'react'
import { Link } from 'react-router'
import { testimonials } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'

/** Customer notes (sample content) in a swipeable row; each card links to what she bought. */
export function Testimonials() {
  const rail = useRef(null)
  const scroll = (dir) => {
    const el = rail.current
    const card = el?.querySelector('li')
    if (card) el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' })
  }

  return (
    <section className="pt-20 lg:pt-28" aria-labelledby="notes-title">
      <div className="shell flex items-end justify-between gap-4">
        <div>
          <h2 id="notes-title" className="display text-[38px] sm:text-[54px]">
            Customers say
          </h2>
          <p className="mt-2 flex items-center gap-2 text-[15px] text-ink-soft">
            <span className="flex text-marigold" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} name="star" size={16} weight="fill" />
              ))}
            </span>
            4.7 average from 2,900+ reviews
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          {[
            [-1, 'arrow-left', 'Previous'],
            [1, 'arrow', 'Next'],
          ].map(([d, icon, label]) => (
            <button
              key={d}
              type="button"
              onClick={() => scroll(d)}
              aria-label={label}
              className="press grid size-12 place-items-center rounded-full bg-mist transition-colors hover:bg-indigo hover:text-chalk"
            >
              <Icon name={icon} size={18} weight="bold" />
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={rail}
        className="no-scrollbar mx-auto mt-8 flex max-w-[1400px] snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 sm:px-6 lg:scroll-px-10 lg:px-10"
      >
        {testimonials.map((t, i) => {
          const p = getProductSync(t.productId)
          return (
            <li
              key={t.name}
              className="group flex w-[82vw] shrink-0 snap-start flex-col justify-between gap-6 rounded-[26px] bg-mist p-6 transition-[transform,background-color] duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 hover:bg-marigold-soft sm:w-[420px]"
              style={{ rotate: `${[-1, 0.8, -0.6, 1, -0.8][i % 5]}deg` }}
            >
              <div>
                <span className="flex text-marigold" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, k) => (
                    <Icon key={k} name="star" size={17} weight={k < t.rating ? 'fill' : 'regular'} />
                  ))}
                </span>
                <blockquote className="mt-4 text-[18px] leading-snug font-medium">“{t.text}”</blockquote>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[14px]">
                  <span className="block font-bold">{t.name}</span>
                  <span className="text-ink-soft">{t.city}</span>
                </p>
                <Link to={`/product/${p.slug}`} className="flex items-center gap-2.5 rounded-full bg-chalk py-1 pr-3 pl-1 text-[13px] font-semibold transition-colors hover:text-indigo">
                  <Img id={p.images[0]} alt="" sizes="36px" className="size-9 rounded-full" position="50% 20%" />
                  <span className="max-w-[120px] truncate">{p.name}</span>
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

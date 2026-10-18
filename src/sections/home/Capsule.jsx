import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { lookbook } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { useCart } from '../../features/cart/CartContext'
import { useToast } from '../../features/toast/Toast'
import { useReveal } from '../../hooks/useReveal'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

/**
 * Build a capsule: tick the pieces you want, choose a size for each, add them all at once.
 * The running total counts up as pieces go in and out.
 */
export function Capsule() {
  const ref = useReveal()
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const items = useMemo(() => lookbook.productIds.map(getProductSync), [])
  const [picked, setPicked] = useState(() => Object.fromEntries(lookbook.productIds.map((id) => [id, 'M'])))
  const chosen = items.filter((p) => picked[p.id])
  const total = chosen.reduce((s, p) => s + p.price, 0)

  const toggle = (id) => setPicked((prev) => ({ ...prev, [id]: prev[id] ? null : 'M' }))

  const addAll = () => {
    chosen.forEach((p) => add(p.id, picked[p.id]))
    show({
      title: `${chosen.length} ${chosen.length === 1 ? 'piece' : 'pieces'} added to bag`,
      body: chosen.map((p) => `${p.name.split(' ')[0]} ${picked[p.id]}`).join(', '),
      action: { label: 'View bag', onClick: () => setOpen(true) },
    })
  }

  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-labelledby="capsule-title">
      <div className="rounded-[32px] bg-marigold-soft p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="capsule-title" className="display text-[36px] sm:text-[50px]">
              {lookbook.title}
            </h2>
            <p className="mt-3 max-w-[50ch] text-[16px] text-ink-soft">{lookbook.sub}</p>
          </div>
          <div className="flex items-center gap-4 rounded-full bg-chalk p-1.5 pl-5">
            <p className="text-[14px] text-ink-soft">
              {chosen.length} of {items.length}
              <span key={total} className="anim-fade-in ml-3 text-[20px] font-bold text-ink tabular-nums">
                {formatPrice(total)}
              </span>
            </p>
            <Button onClick={addAll} disabled={chosen.length === 0}>
              <Icon name="bag" size={18} />
              Add selected
            </Button>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((p, i) => {
            const size = picked[p.id]
            const on = Boolean(size)
            return (
              <li key={p.id} className={cn('rounded-[24px] bg-chalk p-2.5 transition-[opacity,transform] duration-300', !on && 'opacity-60')}>
                <div className="relative" data-reveal-frame style={{ '--reveal-delay': `${i * 90}ms` }}>
                  <Link to={`/product/${p.slug}`} className="group block overflow-hidden rounded-[18px]">
                    <Img id={p.images[0]} alt={p.name} sizes="(min-width: 1024px) 20vw, 45vw" className="aspect-[4/5]" position="50% 25%" imgClassName="transition-transform duration-1000 group-hover:scale-[1.05]" />
                  </Link>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    aria-label={`Include ${p.name}`}
                    onClick={() => toggle(p.id)}
                    className={cn(
                      'press absolute top-2.5 left-2.5 grid size-9 place-items-center rounded-full transition-[background-color,color,transform] duration-300 ease-[var(--ease-spring)]',
                      on ? 'bg-indigo text-chalk' : 'bg-chalk/90 text-transparent ring-2 ring-ink/20',
                    )}
                  >
                    <Icon name="check" size={17} weight="bold" className={cn('transition-transform duration-300', on ? 'scale-100' : 'scale-50')} />
                  </button>
                </div>
                <div className="px-1.5 pt-3 pb-1">
                  <p className="line-clamp-1 text-[14px] font-semibold">{p.name}</p>
                  <p className="text-[14px] font-bold tabular-nums">{formatPrice(p.price)}</p>
                  <label className={cn('mt-2 flex items-center gap-2 text-[13px] text-ink-soft transition-opacity', !on && 'invisible')}>
                    Size
                    <span className="relative flex-1">
                      <select
                        value={size ?? 'M'}
                        onChange={(e) => setPicked((prev) => ({ ...prev, [p.id]: e.target.value }))}
                        className="h-9 w-full appearance-none rounded-full bg-mist pr-8 pl-3 text-[14px] font-semibold text-ink outline-none focus-visible:ring-2 focus-visible:ring-indigo"
                        tabIndex={on ? 0 : -1}
                      >
                        {SIZES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                      <Icon name="caret-down" size={13} weight="bold" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
                    </span>
                  </label>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

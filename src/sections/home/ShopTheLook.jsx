import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { looks } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { formatPrice } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/**
 * Shop the look: pulsing hotspots sit on the pieces in the photo. Tapping a dot opens a
 * small card that grows out of the dot; hovering a row in the list lights up its dot.
 */
export function ShopTheLook() {
  const reduce = useReducedMotion()
  const [lookId, setLookId] = useState(looks[0].id)
  const [active, setActive] = useState(null) // spot index
  const look = looks.find((l) => l.id === lookId)
  const items = look.spots.map((s) => ({ ...s, product: getProductSync(s.productId) }))

  const pickLook = (id) => {
    setLookId(id)
    setActive(null)
  }

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="look-title">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <h2 id="look-title" className="display text-[38px] sm:text-[54px]">
          Shop the look
        </h2>
        <div role="tablist" aria-label="Looks" className="flex gap-1 rounded-full bg-mist p-1">
          {looks.map((l, i) => {
            const on = l.id === lookId
            return (
              <button
                key={l.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pickLook(l.id)}
                className={cn('relative h-10 rounded-full px-5 text-[14px] font-semibold transition-colors', on ? 'text-chalk' : 'text-ink')}
              >
                {on && <motion.span layoutId="look-pill" className="absolute inset-0 rounded-full bg-indigo" transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.18 }} />}
                <span className="relative">Look {i + 1}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-[28px]" onClick={(e) => e.target === e.currentTarget && setActive(null)}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={look.id} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Img id={look.image} alt={look.title} sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[4/5] sm:aspect-square lg:aspect-[5/4.6]" position="50% 30%" />
            </motion.div>
          </AnimatePresence>

          {items.map((it, i) => {
            const on = active === i
            const right = it.x > 55
            return (
              <div key={`${look.id}-${i}`} className="absolute" style={{ left: `${it.x}%`, top: `${it.y}%` }}>
                <button
                  type="button"
                  onClick={() => setActive(on ? null : i)}
                  onMouseEnter={() => setActive(i)}
                  aria-expanded={on}
                  aria-label={`${it.product.name}, ${formatPrice(it.product.price)}`}
                  className="group relative -translate-x-1/2 -translate-y-1/2"
                >
                  <span className="ping-soft absolute inset-0 rounded-full bg-marigold" aria-hidden="true" />
                  <span className={cn('relative grid size-9 place-items-center rounded-full border-[3px] border-chalk shadow-float transition-[background-color,transform] duration-300', on ? 'scale-110 bg-indigo text-chalk' : 'bg-marigold text-ink group-hover:scale-110')}>
                    <Icon name="plus" size={15} weight="bold" className={cn('transition-transform duration-300', on && 'rotate-45')} />
                  </span>
                </button>
                <AnimatePresence>
                  {on && (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
                      transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
                      style={{ transformOrigin: right ? 'top right' : 'top left' }}
                      className={cn('absolute top-6 z-10 w-[230px] rounded-[20px] bg-chalk p-2.5 shadow-lift', right ? 'right-2' : 'left-2')}
                    >
                      <Link to={`/product/${it.product.slug}`} className="group flex items-center gap-3">
                        <Img id={it.product.images[0]} alt="" sizes="60px" className="h-[70px] w-14 shrink-0 rounded-[12px]" position="50% 25%" />
                        <span className="min-w-0">
                          <span className="line-clamp-2 block text-[14px] leading-snug font-semibold group-hover:text-indigo">{it.product.name}</span>
                          <span className="mt-0.5 block text-[14px] font-bold tabular-nums">{formatPrice(it.product.price)}</span>
                          <span className="mt-1 inline-flex items-center gap-1 text-[12px] font-semibold text-indigo">
                            View <Icon name="arrow" size={12} weight="bold" />
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-6 lg:pt-4">
          <div>
            <p className="display text-[30px] sm:text-[36px]">{look.title}</p>
            <ul className="mt-6 space-y-2.5" onMouseLeave={() => setActive(null)}>
              {items.map((it, i) => (
                <li key={`${look.id}-row-${i}`} onMouseEnter={() => setActive(i)}>
                  <Link
                    to={`/product/${it.product.slug}`}
                    className={cn('group flex items-center gap-4 rounded-[20px] p-2.5 pr-4 transition-colors duration-300', active === i ? 'bg-mist' : 'hover:bg-mist')}
                  >
                    <Img id={it.product.images[0]} alt="" sizes="80px" className="h-24 w-[76px] shrink-0 rounded-[14px]" position="50% 25%" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] font-semibold">{it.product.name}</span>
                      <span className="block text-[13px] text-ink-soft">{it.product.fabric}</span>
                      <span className="mt-1 block text-[15px] font-bold tabular-nums">{formatPrice(it.product.price)}</span>
                    </span>
                    <span className={cn('grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-300', active === i ? '-rotate-45 bg-marigold text-ink' : 'bg-chalk text-indigo')}>
                      <Icon name="arrow" size={16} weight="bold" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex items-center gap-2 text-[14px] text-ink-soft">
            <Icon name="hand" size={18} className="text-indigo" /> Tap the dots on the photo to see each piece.
          </p>
        </div>
      </div>
    </section>
  )
}

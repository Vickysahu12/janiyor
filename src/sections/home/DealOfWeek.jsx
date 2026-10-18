import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { deal } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { imageSet } from '../../data/media'
import { useCart } from '../../features/cart/CartContext'
import { useToast } from '../../features/toast/Toast'
import { flyToCart } from '../../lib/flyToCart'
import { formatPrice, discountOf } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { CopyCode } from '../../components/ui/CopyCode'
import { cn } from '../../lib/cn'

/** The coming Sunday, 23:59:59 local time. */
function endOfWeek(now) {
  const d = new Date(now)
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7))
  d.setHours(23, 59, 59, 0)
  return d.getTime()
}

/** One countdown cell; the number rolls up each time it changes. */
function Unit({ value, label }) {
  const reduce = useReducedMotion()
  const text = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-[18px] bg-chalk/10 sm:h-20 sm:w-20">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={text}
            className="display text-[30px] tabular-nums sm:text-[38px]"
            initial={reduce ? { opacity: 0 } : { y: '70%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: '-70%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[12px] font-semibold text-chalk/70">{label}</span>
    </div>
  )
}

// Deal of the week: the product, a live countdown to Sunday midnight, and add-to-bag right here.
export function DealOfWeek() {
  const product = getProductSync(deal.productId)
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const [now, setNow] = useState(() => Date.now())
  const [size, setSize] = useState(null)
  const [error, setError] = useState(false)
  const photo = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const left = Math.max(0, endOfWeek(now) - now)
  const units = [
    [Math.floor(left / 86400000), 'Days'],
    [Math.floor(left / 3600000) % 24, 'Hours'],
    [Math.floor(left / 60000) % 60, 'Mins'],
    [Math.floor(left / 1000) % 60, 'Secs'],
  ]

  const addToBag = () => {
    if (!size) return setError(true)
    add(product.id, size)
    flyToCart(photo.current, imageSet(product.images[0]).srcSm)
    show({ title: 'Added to bag', body: `${product.name}, size ${size}`, image: product.images[0], action: { label: 'View bag', onClick: () => setOpen(true) } })
  }

  return (
    <section className="px-2 pt-20 lg:px-3 lg:pt-28" aria-labelledby="deal-title">
      <div className="overflow-hidden rounded-[32px] bg-indigo text-chalk">
        <div className="shell grid items-center gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-14">
          <div ref={photo} className="relative mx-auto w-full max-w-[460px]">
            <Link to={`/product/${product.slug}`} className="group block overflow-hidden rounded-[26px]">
              <Img id={product.images[0]} alt={product.name} sizes="460px" className="aspect-[4/5]" position="50% 30%" imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]" />
            </Link>
            <span className="absolute -top-4 -left-3 grid size-24 rotate-[-12deg] place-items-center rounded-full bg-marigold text-center text-ink shadow-float sm:size-28">
              <span>
                <span className="display block text-[30px] sm:text-[36px]">-{discountOf(product)}%</span>
                <span className="block text-[12px] font-bold">this week</span>
              </span>
            </span>
          </div>

          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-chalk/10 px-3.5 py-1.5 text-[14px] font-semibold text-marigold">
              <Icon name="timer" size={17} weight="bold" /> Ends Sunday midnight
            </p>
            <h2 id="deal-title" className="display mt-5 text-[42px] sm:text-[60px]">
              {deal.title}
            </h2>
            <p className="mt-3 max-w-[46ch] text-[16px] text-chalk/75">{deal.body}</p>

            <div className="mt-7 flex gap-2.5 sm:gap-3" role="timer" aria-label={`${units[0][0]} days ${units[1][0]} hours left`}>
              {units.map(([v, l]) => (
                <Unit key={l} value={v} label={l} />
              ))}
            </div>

            <div className="mt-8 rounded-[24px] bg-chalk p-5 text-ink">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link to={`/product/${product.slug}`} className="text-[18px] font-bold hover:text-indigo">
                    {product.name}
                  </Link>
                  <p className="mt-1 flex items-baseline gap-2">
                    <span className="text-[20px] font-bold tabular-nums">{formatPrice(product.price)}</span>
                    <span className="text-[14px] text-ink-soft tabular-nums line-through">{formatPrice(product.compareAt)}</span>
                  </p>
                </div>
                <CopyCode code={deal.code} />
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Size">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={size === s}
                    onClick={() => {
                      setSize(s)
                      setError(false)
                    }}
                    className={cn('press h-10 min-w-12 rounded-full px-3 text-[14px] font-semibold transition-colors', size === s ? 'bg-indigo text-chalk' : 'bg-mist hover:bg-mist-deep')}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p role="alert" className={cn('mt-2 min-h-5 text-[13px] text-danger', error && 'anim-shake')}>
                {error ? 'Pick a size first.' : ''}
              </p>
              <Button onClick={addToBag} size="lg" className="w-full" arrow>
                Add to bag
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

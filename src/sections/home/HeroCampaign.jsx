import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { campaign } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { formatPrice } from '../../lib/format'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const DURATION = 6000
const ease = [0.23, 1, 0.32, 1]

/**
 * Hero banner on cocoa: the line on the left, the photograph on the right, framed so the
 * head always stays in view. Looks change every few seconds (the new photo wipes up from
 * the bottom) until the banner is hovered; the bars below the copy choose a look, and a
 * swipe moves between them on touch screens. A chip names the piece in the photo.
 */
export function HeroCampaign() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const startX = useRef(null)
  const look = campaign.looks[index]
  const product = getProductSync(look.productId)
  const count = campaign.looks.length
  const go = (i) => setIndex((i + count) % count)

  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <section className="px-2 pt-2 lg:px-3" aria-roledescription="carousel" aria-label="New season">
      <div
        className="relative isolate grid overflow-hidden rounded-[32px] bg-indigo text-chalk lg:h-[clamp(560px,calc(100svh-136px),760px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return
          const dx = e.clientX - startX.current
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
          startX.current = null
        }}
      >
        {/* The photograph */}
        <div className="relative aspect-[4/4.6] overflow-hidden sm:aspect-[16/12] lg:order-2 lg:aspect-auto">
          <AnimatePresence initial={false}>
            <motion.img
              key={look.id}
              src={`/media/hero/${look.id}.webp`}
              alt={product.name}
              width={870}
              height={1110}
              fetchPriority={index === 0 ? 'high' : undefined}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: look.focus }}
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0 0 0)', scale: 1.06 }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0 0 0)', scale: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: reduce ? 0.3 : 1, ease: [0.77, 0, 0.175, 1] }}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4, ease } }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
              className="absolute bottom-4 left-4 z-10 sm:bottom-6 sm:left-6"
            >
              <Link to={`/product/${product.slug}`} className="group flex items-center gap-3 rounded-full bg-chalk/90 py-1.5 pr-4 pl-1.5 text-ink shadow-float backdrop-blur-md transition-colors hover:bg-chalk">
                <span className="grid size-10 place-items-center rounded-full bg-indigo text-chalk transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-45">
                  <Icon name="arrow" size={16} weight="bold" />
                </span>
                <span className="text-[13px] leading-tight">
                  <span className="block font-semibold">{product.name}</span>
                  <span className="text-ink-soft tabular-nums">{formatPrice(product.price)}</span>
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The line */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-12 xl:px-20">
          <div className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] text-marigold-soft uppercase">
            <span>{campaign.kicker}</span>
            <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
            <span>{campaign.dates}</span>
          </div>
          <motion.h1
            className="display mt-6 max-w-[14ch] text-[42px] leading-[1.02] sm:text-[58px] lg:text-[66px]"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            {campaign.title}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-[40ch] text-[15.5px] leading-relaxed text-chalk/80"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            {campaign.sub}
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button to={campaign.cta.to} variant="light" size="lg" arrow>
              {campaign.cta.label}
            </Button>
            <span className="text-[11px] font-semibold tracking-[0.18em] text-chalk/70 uppercase">{campaign.footnote}</span>
          </div>

          <div className="mt-10 flex items-center gap-2" role="tablist" aria-label="Choose look">
            {campaign.looks.map((l, i) => {
              const on = i === index
              return (
                <button
                  key={l.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-label={`Look ${i + 1}`}
                  onClick={() => go(i)}
                  className={cn('relative grid h-9 place-items-center transition-[width] duration-500 ease-[var(--ease-out)]', on ? 'w-14' : 'w-6')}
                >
                  <span className={cn('relative block h-1 w-full overflow-hidden rounded-full', on ? 'bg-chalk/30' : 'bg-chalk/40 hover:bg-chalk/80')}>
                    {on && (
                      <span
                        key={`${l.id}-${index}`}
                        className="hero-progress absolute inset-0 rounded-full bg-marigold-soft"
                        data-paused={hovered || hidden}
                        style={{ '--duration': `${DURATION}ms`, transform: reduce ? 'scaleX(1)' : undefined }}
                        onAnimationEnd={() => go(index + 1)}
                      />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

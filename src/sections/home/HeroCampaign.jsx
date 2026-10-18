import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { campaign } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { formatPrice } from '../../lib/format'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const DURATION = 6000
const ease = [0.23, 1, 0.32, 1]

/**
 * Campaign banner. Three layers, back to front: the photo (softly blurred), a giant
 * "30%", and the model cut out of the same photo, so the number sits behind her. The
 * title and small labels sit on top, poster style. On pointer devices each layer drifts
 * at its own speed with the cursor. Looks change every few seconds until hovered.
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

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 90, damping: 18 })
  const sy = useSpring(my, { stiffness: 90, damping: 18 })
  const bgX = useTransform(sx, (v) => v * -14)
  const bgY = useTransform(sy, (v) => v * -10)
  const numX = useTransform(sx, (v) => v * -34)
  const numY = useTransform(sy, (v) => v * -16)
  const subX = useTransform(sx, (v) => v * 18)

  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <section className="px-2 pt-2 lg:px-3" aria-roledescription="carousel" aria-label={campaign.title}>
      <div
        className="relative isolate h-[min(165vw,720px)] overflow-hidden rounded-[32px] bg-indigo-deep text-chalk sm:h-[680px] lg:h-[clamp(580px,calc(100svh-136px),780px)]"
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          mx.set(0)
          my.set(0)
        }}
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return
          const dx = e.clientX - startX.current
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
          startX.current = null
        }}
      >
        {/* 1. The photo, softly out of focus */}
        <motion.div className="absolute -inset-[6%] -z-30" style={{ x: bgX, y: bgY }} aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.img
              key={look.id}
              src={`/media/hero/${look.id}-bg.webp`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-deep/20 via-transparent to-indigo-deep/55" />
        </motion.div>

        {/* 2. The giant number, behind the model */}
        <motion.div className="pointer-events-none absolute inset-x-0 top-[30%] -z-20 flex -translate-y-1/2 justify-center sm:top-[44%]" style={{ x: numX, y: numY }} aria-hidden="true">
          <motion.p
            className="display flex items-start text-[clamp(200px,58vw,300px)] leading-[0.8] tracking-[-0.06em] text-chalk/85 sm:text-[clamp(300px,38vw,560px)]"
            initial={reduce ? false : { opacity: 0, scale: 1.12, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease }}
          >
            {campaign.number}
            <span className="mt-[0.08em] ml-[0.04em] text-[0.32em] tracking-[-0.02em]">%</span>
          </motion.p>
        </motion.div>

        {/* 3. The model, cut out of the photo */}
        <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex h-[86%] items-end justify-center sm:h-full" style={{ x: subX }} aria-hidden="true">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={look.id}
              src={`/media/hero/${look.id}-cut.webp`}
              alt=""
              className="w-auto max-w-none object-contain object-bottom drop-shadow-[0_30px_40px_rgb(24_32_97/0.45)]"
              style={{ height: look.height }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20, transition: { duration: 0.4 } }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
            />
          </AnimatePresence>
        </motion.div>

        {/* 4. Labels and title */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5 text-[12px] font-semibold tracking-[0.12em] uppercase sm:p-8 sm:text-[13px]">
          <span>{campaign.kicker}</span>
          <span className="text-right">{campaign.dates}</span>
        </div>

        <div className="absolute inset-x-0 top-[50%] flex flex-col items-center px-6 text-center sm:top-[56%] lg:top-[58%]">
          <span className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[170%] w-[min(560px,90%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(24_32_97/0.45),transparent)]" aria-hidden="true" />
          <h1 className="display text-[44px] leading-[0.9] [text-shadow:0_6px_30px_rgb(24_32_97/0.55)] sm:text-[64px] lg:text-[76px]">
            {campaign.title}
          </h1>
          <p className="mt-3 max-w-[34ch] text-[14px] text-chalk/90 [text-shadow:0_2px_14px_rgb(24_32_97/0.7)] sm:text-[15px]">{campaign.sub}</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 p-5 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={look.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="hidden lg:block">
              <Link to={`/product/${product.slug}`} className="group flex items-center gap-3 rounded-full bg-chalk/12 py-1.5 pr-4 pl-1.5 backdrop-blur-md transition-colors hover:bg-chalk/20">
                <span className="grid size-10 place-items-center rounded-full bg-chalk text-indigo transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-45">
                  <Icon name="arrow" size={16} weight="bold" />
                </span>
                <span className="text-[13px] leading-tight">
                  <span className="block font-semibold">{product.name}</span>
                  <span className="text-chalk/75 tabular-nums">{formatPrice(product.price)}</span>
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col items-center gap-2">
            <Button to={campaign.cta.to} variant="light" size="lg" arrow>
              {campaign.cta.label}
            </Button>
            <span className="text-[11px] font-semibold tracking-[0.18em] text-chalk/80 uppercase">{campaign.footnote}</span>
          </div>

          <div className="flex items-center gap-2" role="tablist" aria-label="Choose look">
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
                  <span className={cn('relative block h-1 w-full overflow-hidden rounded-full', on ? 'bg-chalk/35' : 'bg-chalk/45 hover:bg-chalk/80')}>
                    {on && (
                      <span
                        key={`${l.id}-${index}`}
                        className="hero-progress absolute inset-0 rounded-full bg-chalk"
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

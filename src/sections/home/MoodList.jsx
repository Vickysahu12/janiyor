import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { occasions } from '../../data/content'
import { products } from '../../data/products'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'

const counts = Object.fromEntries(occasions.map((o) => [o.id, products.filter((p) => p.occasions.includes(o.id)).length]))

/**
 * Shop by mood: a list of big words. On pointer devices a photo of the mood follows the
 * cursor (sprung, so it trails a little) while you hover a row. Phones get a swipe row.
 */
export function MoodList() {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 24 })
  const sy = useSpring(y, { stiffness: 220, damping: 24 })
  const current = occasions.find((o) => o.id === hovered)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="mood-title">
      <h2 id="mood-title" className="display text-[38px] sm:text-[54px]">
        Shop by mood
      </h2>

      {/* Pointer devices: list with a trailing photo */}
      <div className="relative mt-6 hidden lg:block" onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
        <ul>
          {occasions.map((o) => (
            <li key={o.id} onMouseEnter={() => setHovered(o.id)}>
              <Link to={o.to} className="group flex items-center justify-between gap-6 border-b border-line py-6">
                <span className="flex items-baseline gap-5">
                  <span className="display text-[64px] leading-none text-ink transition-[color,transform] duration-500 ease-[var(--ease-out)] group-hover:translate-x-4 group-hover:text-indigo">{o.label}</span>
                  <span className="text-[15px] text-ink-soft">{o.note}</span>
                </span>
                <span className="flex items-center gap-4">
                  <span className="rounded-full bg-mist px-3 py-1 text-[13px] font-semibold tabular-nums">{counts[o.id]} styles</span>
                  <span className="grid size-12 place-items-center rounded-full bg-mist transition-[transform,background-color] duration-500 ease-[var(--ease-spring)] group-hover:-rotate-45 group-hover:bg-marigold">
                    <Icon name="arrow" size={18} weight="bold" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {!reduce && (
          <motion.div className="pointer-events-none absolute top-0 left-0 z-10" style={{ x: sx, y: sy }} aria-hidden="true">
            <AnimatePresence>
              {current && (
                <motion.div
                  key={current.id}
                  className="absolute -top-[150px] left-10 w-[220px] overflow-hidden rounded-[22px] shadow-lift"
                  initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                  transition={{ type: 'spring', duration: 0.45, bounce: 0.25 }}
                >
                  <Img id={current.image} alt="" sizes="220px" className="aspect-[4/5]" position="50% 25%" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Phones and tablets: swipe row */}
      <ul className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:hidden">
        {occasions.map((o) => (
          <li key={o.id} className="w-[62vw] shrink-0 snap-start sm:w-[38vw]">
            <Link to={o.to} className="press relative block overflow-hidden rounded-[22px]">
              <Img id={o.image} alt="" sizes="62vw" className="aspect-[4/5]" position="50% 25%" />
              <span className="absolute inset-0 bg-gradient-to-t from-indigo-deep/75 to-transparent" aria-hidden="true" />
              <span className="absolute inset-x-4 bottom-4 text-chalk">
                <span className="display block text-[30px]">{o.label}</span>
                <span className="text-[13px] text-chalk/80">{counts[o.id]} styles</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

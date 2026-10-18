import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { site } from '../../config/site'
import { Icon } from '../ui/Icon'

const INTERVAL = 4500

// One announcement at a time; each new line rolls up from below. Pauses on hover.
export function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const items = site.announcements

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), INTERVAL)
    return () => clearInterval(id)
  }, [paused, items.length])

  return (
    <div className="bg-indigo text-chalk" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-label="Store announcements">
      <div className="shell flex h-9 items-center justify-between gap-4 text-[13px]">
        <a href={`https://wa.me/${site.phone.replace(/\D/g, '')}`} className="hidden items-center gap-1.5 text-chalk/75 transition-colors hover:text-chalk lg:flex">
          <Icon name="whatsapp" size={15} /> Size help on WhatsApp
        </a>
        <div className="relative h-9 flex-1 overflow-hidden lg:max-w-[460px]">
          <AnimatePresence initial={false}>
            <motion.p
              key={index}
              className="absolute inset-0 flex items-center justify-center gap-2 font-medium"
              initial={reduce ? { opacity: 0 } : { y: '100%' }}
              animate={reduce ? { opacity: 1 } : { y: '0%' }}
              exit={reduce ? { opacity: 0 } : { y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <Icon name="sun" size={15} weight="fill" className="text-marigold" />
              {items[index]}
            </motion.p>
          </AnimatePresence>
        </div>
        <a href="/account" className="hidden text-chalk/75 transition-colors hover:text-chalk lg:block">
          Track order
        </a>
      </div>
    </div>
  )
}

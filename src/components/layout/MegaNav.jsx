import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { megaMenus, navLinks } from '../../config/navigation'
import { Img } from '../ui/Img'
import { Icon } from '../ui/Icon'
import { cn } from '../../lib/cn'

const OPEN_DELAY = 90
const CLOSE_DELAY = 160

/** True when `to` (with its query string) matches the current URL. */
export function useIsActive() {
  const { pathname, search } = useLocation()
  return (to) => {
    const [path, query] = to.split('?')
    if (query) return pathname === path && search.replace('?', '') === query
    return pathname === path && !search
  }
}

function MenuTile({ item, index, onNavigate }) {
  return (
    <li className="anim-fade-up" style={{ '--delay': `${index * 45}ms` }}>
      <Link to={item.to} onClick={onNavigate} className="group block">
        <span className="block overflow-hidden rounded-[18px]">
          <Img id={item.image} alt="" sizes="180px" className="aspect-[4/5] bg-mist" position="50% 25%" imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
        </span>
        <span className="mt-3 flex items-center gap-1.5 text-[15px] font-semibold text-ink">
          {item.label}
          <Icon name="arrow" size={13} weight="bold" className="-translate-x-1 text-indigo opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
        <span className="mt-0.5 block text-[13px] text-ink-soft">{item.desc}</span>
      </Link>
    </li>
  )
}

/**
 * Desktop navigation, inline in the header. A mist pill springs to the hovered item; the
 * dropdown triggers open one floating rounded panel whose tiles slide left / right as she
 * moves between menus. Opens on hover (with intent delay), click or keyboard; closes on
 * leave, Escape, outside click or navigation.
 */
export function MegaNav() {
  const reduce = useReducedMotion()
  const isActive = useIsActive()
  const { pathname, search } = useLocation()
  const [open, setOpen] = useState(null) // menu id
  const [hovered, setHovered] = useState(null) // pill target
  const [dir, setDir] = useState(0)
  const timer = useRef(null)
  const triggers = useRef({})

  const menu = megaMenus.find((m) => m.id === open)

  // Mirror of `open` so timers read the latest value.
  const openRef = useRef(null)
  useEffect(() => {
    openRef.current = open
  }, [open])

  const show = useCallback((id, delay = OPEN_DELAY) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const prev = openRef.current
      const ids = megaMenus.map((m) => m.id)
      setDir(prev && prev !== id ? (ids.indexOf(id) > ids.indexOf(prev) ? 1 : -1) : 0)
      setOpen(id)
    }, delay)
  }, [])
  const hide = useCallback((delay = CLOSE_DELAY) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(null), delay)
  }, [])
  const closeNow = useCallback(() => {
    clearTimeout(timer.current)
    setOpen(null)
  }, [])

  // Close on navigation: reset during render when the URL changes.
  const locKey = pathname + search
  const [seenLoc, setSeenLoc] = useState(locKey)
  if (seenLoc !== locKey) {
    setSeenLoc(locKey)
    setOpen(null)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        triggers.current[open]?.focus()
        closeNow()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeNow])

  useEffect(() => () => clearTimeout(timer.current), [])

  const pill = (id) =>
    hovered === id && (
      <motion.span
        layoutId="nav-pill"
        className="absolute inset-0 -z-10 rounded-full bg-mist"
        transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.18 }}
      />
    )

  return (
    <>
      {/* Dim the page while a menu is open. Portalled so it sits under the sticky header. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-30 bg-indigo-deep/20 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={() => hide(60)}
              onClick={closeNow}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}

      <nav aria-label="Primary" className="hidden lg:block" onMouseLeave={() => { setHovered(null); hide() }}>
        <ul className="flex items-center gap-1">
          {megaMenus.map((m) => {
            const expanded = open === m.id
            return (
              <li key={m.id} onMouseEnter={() => { setHovered(m.id); show(m.id, open ? 0 : OPEN_DELAY) }}>
                <button
                  ref={(el) => (triggers.current[m.id] = el)}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls="mega-panel"
                  onClick={() => (expanded ? closeNow() : show(m.id, 0))}
                  onKeyDown={(e) => e.key === 'ArrowDown' && show(m.id, 0)}
                  className="relative isolate flex h-10 items-center gap-1.5 rounded-full px-4 text-[15px] font-medium text-ink"
                >
                  {pill(m.id)}
                  {m.label}
                  <Icon name="caret-down" size={13} weight="bold" className={cn('transition-transform duration-300 ease-out', expanded && 'rotate-180')} />
                </button>
              </li>
            )
          })}
          {navLinks.map((l) => (
            <li key={l.label} onMouseEnter={() => { setHovered(l.label); if (open) hide(60) }}>
              <Link
                to={l.to}
                aria-current={isActive(l.to) ? 'page' : undefined}
                className={cn('relative isolate flex h-10 items-center gap-1.5 rounded-full px-4 text-[15px] font-medium', l.accent ? 'text-danger' : 'text-ink')}
              >
                {pill(l.label)}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {menu && (
            <motion.div
              id="mega-panel"
              role="region"
              aria-label={`${menu.label} menu`}
              onMouseEnter={() => clearTimeout(timer.current)}
              className="absolute inset-x-0 top-[calc(100%+10px)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', duration: 0.45, bounce: 0.12 }}
              style={{ transformOrigin: 'top center' }}
            >
              <div className="shell">
                <motion.div layout transition={{ type: 'spring', duration: 0.45, bounce: 0.1 }} className="overflow-hidden rounded-[28px] border border-line bg-chalk shadow-lift">
                  <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                    <motion.div
                      key={menu.id}
                      custom={dir}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 36 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -36, transition: { duration: 0.15 } }}
                      transition={{ type: 'spring', duration: 0.42, bounce: 0 }}
                      className="grid grid-cols-[1fr_280px] gap-8 p-6"
                    >
                      <div>
                        <p className="text-[13px] font-semibold text-ink-soft">{menu.columns[0].title}</p>
                        <ul className="mt-4 grid grid-cols-5 gap-4">
                          {menu.columns
                            .flatMap((c) => c.items)
                            .map((item, i) => (
                              <MenuTile key={item.label} item={item} index={i} onNavigate={closeNow} />
                            ))}
                        </ul>
                      </div>
                      <Link to={menu.feature.to} onClick={closeNow} className="group relative block min-h-[320px] overflow-hidden rounded-[22px] bg-indigo">
                        <Img id={menu.feature.image} alt="" sizes="280px" className="absolute! inset-0" position="50% 25%" imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                        <span className="absolute inset-0 bg-gradient-to-t from-indigo-deep/90 via-indigo-deep/10 to-transparent" aria-hidden="true" />
                        <span className="absolute inset-x-5 bottom-5 text-chalk">
                          <span className="display block text-[24px]">{menu.feature.title}</span>
                          <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-marigold px-3.5 py-1.5 text-[13px] font-semibold text-ink">
                            Shop now <Icon name="arrow" size={13} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex items-center justify-between border-t border-line bg-mist/60 px-6 py-3 text-[13px] text-ink-soft">
                    <span className="flex items-center gap-2">
                      <Icon name="truck" size={17} className="text-indigo" /> Free shipping above ₹1,499. Easy 7-day returns.
                    </span>
                    <Link to={menu.to} onClick={closeNow} className="link-under text-[13px] font-semibold text-ink">
                      View all
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

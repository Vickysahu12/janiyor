import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { megaMenus, navLinks } from '../../config/navigation'
import { site } from '../../config/site'
import { useOverlay } from '../../hooks/useOverlay'
import { useSearch } from '../../features/search/SearchOverlay'
import { Img } from '../ui/Img'
import { Icon } from '../ui/Icon'
import { CopyCode } from '../ui/CopyCode'
import { Logo } from './Logo'
import { cn } from '../../lib/cn'

const ease = [0.32, 0.72, 0, 1]

/**
 * Phone menu: a sheet that slides in from the left. A pill toggle switches Shop / Moods
 * (the indigo pill slides between them), each showing rounded photo tiles that stagger in.
 */
export function MobileMenu({ open, onClose }) {
  const reduce = useReducedMotion()
  const focusRef = useOverlay(open, onClose)
  const { openSearch } = useSearch()
  const [tab, setTab] = useState(megaMenus[0].id)
  const menu = megaMenus.find((m) => m.id === tab)
  const items = menu.columns.flatMap((c) => c.items)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu" data-lenis-prevent>
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close menu"
            className="absolute inset-0 h-full w-full cursor-default bg-indigo-deep/40 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 flex w-[min(420px,92%)] flex-col overflow-hidden rounded-r-[28px] bg-chalk shadow-lift"
            initial={reduce ? { opacity: 0 } : { x: '-100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '-100%', transition: { duration: 0.3, ease } }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="flex h-16 items-center justify-between px-4 pt-[env(safe-area-inset-top)]">
              <Logo />
              <button ref={focusRef} type="button" onClick={onClose} aria-label="Close menu" className="press grid size-11 place-items-center rounded-full bg-mist text-ink">
                <Icon name="close" size={20} weight="bold" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  openSearch()
                }}
                className="anim-fade-up flex h-12 w-full items-center gap-3 rounded-full bg-mist px-4 text-left text-[15px] text-ink-soft"
                style={{ '--delay': '150ms' }}
              >
                <Icon name="search" size={19} className="text-ink" />
                Search co-ords, dresses, colours
              </button>

              <div role="tablist" aria-label="Menu sections" className="anim-fade-up mt-5 grid grid-cols-2 rounded-full bg-mist p-1" style={{ '--delay': '200ms' }}>
                {megaMenus.map((m) => {
                  const on = m.id === tab
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setTab(m.id)}
                      className={cn('relative h-10 rounded-full text-[14px] font-semibold transition-colors duration-300', on ? 'text-chalk' : 'text-ink')}
                    >
                      {on && (
                        <motion.span
                          layoutId="mobile-tab"
                          className="absolute inset-0 rounded-full bg-indigo"
                          transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.15 }}
                        />
                      )}
                      <span className="relative">{m.label}</span>
                    </button>
                  )
                })}
              </div>

              <ul key={tab} className="mt-5 grid grid-cols-2 gap-3">
                {items.map((item, i) => (
                  <li key={item.label} className="anim-fade-up" style={{ '--delay': `${i * 45}ms` }}>
                    <Link to={item.to} onClick={onClose} className="press group relative block overflow-hidden rounded-[18px]">
                      <Img id={item.image} alt="" sizes="200px" className="aspect-[4/5]" position="50% 25%" />
                      <span className="absolute inset-0 bg-gradient-to-t from-indigo-deep/80 via-transparent to-transparent" aria-hidden="true" />
                      <span className="absolute inset-x-3 bottom-3 text-chalk">
                        <span className="block text-[15px] leading-tight font-semibold">{item.label}</span>
                        <span className="block text-[12px] text-chalk/80">{item.desc}</span>
                      </span>
                    </Link>
                  </li>
                ))}
                <li className="anim-fade-up" style={{ '--delay': `${items.length * 45}ms` }}>
                  <Link to={menu.to} onClick={onClose} className="press grid aspect-[4/5] place-items-center rounded-[18px] bg-marigold text-center text-ink">
                    <span>
                      <Icon name="arrow-up-right" size={26} weight="bold" className="mx-auto" />
                      <span className="mt-2 block text-[15px] font-semibold">View all</span>
                    </span>
                  </Link>
                </li>
              </ul>

              <ul className="mt-6 space-y-1">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} onClick={onClose} className={cn('press flex h-12 items-center justify-between rounded-[14px] px-4 text-[16px] font-semibold hover:bg-mist', l.accent ? 'text-danger' : 'text-ink')}>
                      {l.label}
                      <Icon name="caret-right" size={16} weight="bold" />
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { icon: 'package', label: 'Orders', to: '/account' },
                  { icon: 'heart', label: 'Wishlist', to: '/wishlist' },
                  { icon: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${site.phone.replace(/\D/g, '')}` },
                ].map((a) => {
                  const cls = 'press flex flex-col items-center gap-1.5 rounded-[16px] bg-mist py-3 text-[12px] font-medium text-ink'
                  return (
                    <li key={a.label}>
                      {a.to ? (
                        <Link to={a.to} onClick={onClose} className={cls}>
                          <Icon name={a.icon} size={22} className="text-indigo" />
                          {a.label}
                        </Link>
                      ) : (
                        <a href={a.href} className={cls}>
                          <Icon name={a.icon} size={22} className="text-indigo" />
                          {a.label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-3 bg-indigo px-4 pt-3.5 pb-[max(14px,env(safe-area-inset-bottom))] text-chalk">
              <span className="text-[14px] font-medium">
                Extra 10% off
                <span className="block text-[12px] font-normal text-chalk/70">Use it at checkout</span>
              </span>
              <CopyCode code="SUNNY10" light />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

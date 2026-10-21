import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { quickChips } from '../../config/navigation'
import { useCart } from '../../features/cart/CartContext'
import { useWishlist } from '../../features/wishlist/WishlistContext'
import { useSearch } from '../../features/search/SearchOverlay'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { MegaNav, useIsActive } from './MegaNav'
import { cn } from '../../lib/cn'

function HeaderIcon({ icon, label, count, bumpKey, onClick, to, className, ...props }) {
  const Tag = to ? Link : 'button'
  return (
    <Tag
      {...(to ? { to } : { type: 'button', onClick })}
      aria-label={count ? `${label}, ${count} items` : label}
      className={cn('group press relative grid size-11 place-items-center rounded-full text-ink transition-colors duration-200 hover:bg-mist', className)}
      {...props}
    >
      <Icon name={icon} size={22} className="transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110" />
      {count > 0 && (
        <span
          key={bumpKey}
          className={cn(
            'absolute top-1 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-marigold px-1 text-[10.5px] font-bold text-ink tabular-nums ring-2 ring-chalk',
            bumpKey ? 'anim-bump' : '',
          )}
        >
          {count}
        </span>
      )}
    </Tag>
  )
}

export function Header() {
  const cart = useCart()
  const wishlist = useWishlist()
  const { openSearch } = useSearch()
  const isActive = useIsActive()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinel = useRef(null)

  // A 1px sentinel above the header tells us when the page has scrolled, without a scroll listener.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    if (sentinel.current) io.observe(sentinel.current)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-px" />
      <header
        className={cn(
          'sticky top-0 z-40 transition-[background-color,box-shadow] duration-300',
          scrolled ? 'bg-chalk/85 shadow-[0_10px_30px_-22px_rgb(74_47_39/0.5)] backdrop-blur-xl' : 'bg-chalk',
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[76px]">
          <div className="flex items-center gap-1">
            <HeaderIcon icon="menu" label="Open menu" onClick={() => setMenuOpen(true)} className="-ml-2.5 lg:hidden" />
            <Logo />
          </div>

          <MegaNav />

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={openSearch}
              className="group mr-1 hidden h-11 w-[200px] items-center gap-2.5 rounded-full bg-mist px-4 text-[14px] text-ink-soft transition-colors hover:bg-mist-deep xl:flex"
            >
              <Icon name="search" size={18} className="text-ink transition-transform duration-300 group-hover:scale-110" />
              Search
              <kbd className="ml-auto rounded-md bg-chalk px-1.5 py-0.5 font-sans text-[11px] text-ink-soft">/</kbd>
            </button>
            <HeaderIcon icon="search" label="Search" onClick={openSearch} className="xl:hidden" />
            <HeaderIcon icon="user" label="My orders" to="/account" className="hidden sm:grid" />
            <HeaderIcon icon="heart" label="Wishlist" to="/wishlist" count={wishlist.count} />
            <HeaderIcon icon="bag" label="Bag" count={cart.count} bumpKey={cart.addedAt} onClick={() => cart.setOpen(true)} className="-mr-2" data-bag-target="" />
          </div>
        </div>

        {/* Phones: swipeable category chips */}
        <nav aria-label="Categories" className="lg:hidden">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
            {quickChips.map((c) => {
              const active = isActive(c.to)
              return (
                <li key={c.label} className="shrink-0">
                  <Link
                    to={c.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'press flex h-9 items-center rounded-full px-4 text-[13px] font-medium transition-colors duration-200',
                      active ? 'bg-indigo text-chalk' : c.accent ? 'bg-marigold text-ink' : 'bg-mist text-ink',
                    )}
                  >
                    {c.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

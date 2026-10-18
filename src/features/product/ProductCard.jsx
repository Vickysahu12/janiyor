import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../cart/CartContext'
import { useToast } from '../toast/Toast'
import { getSiblings } from '../../services/catalog'
import { imageSet } from '../../data/media'
import { flyToCart } from '../../lib/flyToCart'
import { formatPrice, discountOf } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { HeartButton } from '../wishlist/HeartButton'
import { cn } from '../../lib/cn'

/**
 * Product tile. On pointer devices the close crop opens out of a circle in the middle of
 * the photo on hover. The round "+" opens a size row on the photo; picking a size adds it
 * and the photo flies into the bag. Colour siblings show as swatches under the price.
 */
export function ProductCard({ product, sizes = '(min-width: 1024px) 23vw, 50vw', priority, className }) {
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const [picking, setPicking] = useState(false)
  const frame = useRef(null)
  const discount = discountOf(product)
  const href = `/product/${product.slug}`
  const siblings = getSiblings(product)

  const quickAdd = (size) => {
    add(product.id, size)
    setPicking(false)
    flyToCart(frame.current, imageSet(product.images[0]).srcSm)
    show({
      title: 'Added to bag',
      body: `${product.name}, size ${size}`,
      image: product.images[0],
      action: { label: 'View bag', onClick: () => setOpen(true) },
    })
  }

  return (
    <article className={cn('group relative', className)} onMouseLeave={() => setPicking(false)}>
      <div ref={frame} className="relative overflow-hidden rounded-[22px] bg-mist">
        <Link to={href} className="block" aria-label={product.name}>
          <Img
            id={product.images[0]}
            alt={`${product.name} in ${product.color.toLowerCase()}`}
            sizes={sizes}
            priority={priority}
            className="aspect-[4/5]"
            position="50% 25%"
            imgClassName="transition-transform duration-[1200ms] ease-out hover-device:group-hover:scale-[1.05]"
          />
          <Img
            id={product.images[1]}
            alt=""
            sizes={sizes}
            className="absolute! inset-0 [clip-path:circle(0%_at_50%_45%)] transition-[clip-path] duration-700 ease-[var(--ease-out)] hover-device:group-hover:[clip-path:circle(80%_at_50%_45%)]"
            position="50% 25%"
          />
        </Link>

        {(product.badge || discount > 0 || product.isNew) && (
          <span
            className={cn(
              'pointer-events-none absolute top-3 left-3 rounded-full px-2.5 py-1 text-[12px] font-bold',
              discount > 0 ? 'bg-marigold text-ink' : 'bg-indigo text-chalk',
            )}
          >
            {discount > 0 ? `-${discount}%` : product.badge ?? 'New'}
          </span>
        )}

        <HeartButton product={product} className="absolute top-2.5 right-2.5" />

        {/* Size picker: slides up over the photo */}
        <div
          className={cn(
            'absolute inset-x-2.5 bottom-2.5 rounded-[18px] bg-chalk/95 p-2 shadow-float backdrop-blur-md transition-[opacity,transform] duration-300 ease-[var(--ease-out)]',
            picking ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
          )}
          inert={!picking}
        >
          <p className="px-1 pb-1.5 text-[12px] font-semibold text-ink-soft">Pick a size</p>
          <div className="grid grid-cols-6 gap-1">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => quickAdd(s)}
                className="press h-9 rounded-full text-[12px] font-semibold transition-colors hover:bg-indigo hover:text-chalk"
                aria-label={`Add ${product.name}, size ${s}, to bag`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPicking((p) => !p)}
          aria-expanded={picking}
          aria-label={picking ? 'Close sizes' : `Quick add ${product.name}`}
          className={cn(
            'press absolute right-2.5 bottom-2.5 grid size-11 place-items-center rounded-full bg-indigo text-chalk shadow-float transition-[opacity,transform,background-color] duration-300 ease-[var(--ease-spring)] hover:bg-marigold hover:text-ink',
            picking ? 'pointer-events-none scale-75 opacity-0' : 'hover-device:translate-y-2 hover-device:opacity-0 hover-device:group-hover:translate-y-0 hover-device:group-hover:opacity-100 focus-visible:opacity-100',
          )}
        >
          <Icon name="plus" size={20} weight="bold" />
        </button>
      </div>

      <div className="px-1 pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <Link to={href} className="min-w-0">
            <h3 className="line-clamp-1 text-[15px] font-semibold text-ink transition-colors group-hover:text-indigo">{product.name}</h3>
          </Link>
          <span className="flex shrink-0 items-center gap-1 pt-0.5 text-[12px] text-ink-soft">
            <Icon name="star" size={12} weight="fill" className="text-marigold" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-3">
          <p className="flex flex-wrap items-baseline gap-x-2 text-[15px]">
            <span className="font-bold tabular-nums">{formatPrice(product.price)}</span>
            {product.compareAt && <span className="text-[13px] text-ink-soft tabular-nums line-through">{formatPrice(product.compareAt)}</span>}
          </p>
          {siblings.length > 1 && (
            <ul className="flex items-center gap-1" aria-label={`${siblings.length} colours`}>
              {siblings.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/product/${s.slug}`}
                    aria-label={s.color}
                    className={cn(
                      'block size-4 rounded-full ring-offset-2 ring-offset-chalk transition-[box-shadow,transform] duration-200 hover:scale-110',
                      s.id === product.id ? 'ring-[1.5px] ring-ink' : 'ring-1 ring-line-strong',
                    )}
                    style={{ backgroundColor: s.hex }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[4/5] animate-pulse rounded-[22px] bg-mist" />
      <div className="mt-3.5 h-3.5 w-3/4 rounded-full bg-mist" />
      <div className="mt-2 h-3.5 w-1/3 rounded-full bg-mist" />
    </div>
  )
}

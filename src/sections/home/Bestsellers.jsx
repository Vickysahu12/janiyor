import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { collectionTabs } from '../../data/content'
import { queryProducts } from '../../services/catalog'
import { Button } from '../../components/ui/Button'
import { ProductCard } from '../../features/product/ProductCard'
import { cn } from '../../lib/cn'

const viewAllFor = (q) =>
  q.category ? `/shop/${q.category}` : q.price ? `/shop?price=${q.price.join(',')}` : q.bestseller ? '/shop?sort=rating' : '/shop?sort=new'

// Four across, two rows, with pill tabs; an indigo pill springs to the active tab.
export function Bestsellers() {
  const [tab, setTab] = useState(collectionTabs[0].id)
  const reduce = useReducedMotion()
  const active = collectionTabs.find((t) => t.id === tab)
  const products = useMemo(() => queryProducts({ ...active.query, limit: 8 }), [active])

  return (
    <section className="shell pt-20 lg:pt-28" aria-labelledby="best-title">
      <div className="flex flex-col items-center text-center">
        <h2 id="best-title" className="display text-[38px] sm:text-[54px]">
          Our bestsellers
        </h2>
        <div role="tablist" aria-label="Collections" className="no-scrollbar mt-6 flex max-w-full gap-1 overflow-x-auto rounded-full bg-mist p-1">
          {collectionTabs.map((t) => {
            const selected = t.id === tab
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(t.id)}
                className={cn('relative h-10 shrink-0 rounded-full px-5 text-[14px] font-semibold transition-colors duration-200', selected ? 'text-chalk' : 'text-ink hover:text-indigo')}
              >
                {selected && (
                  <motion.span
                    layoutId="best-pill"
                    className="absolute inset-0 rounded-full bg-indigo"
                    transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.45, bounce: 0.18 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
        {products.map((p, i) => (
          <li key={`${tab}-${p.id}`} className="anim-fade-up" style={{ '--delay': `${(i % 4) * 60 + Math.floor(i / 4) * 90}ms` }}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <Button to={viewAllFor(active.query)} variant="outline" arrow>
          View all
        </Button>
      </div>
    </section>
  )
}

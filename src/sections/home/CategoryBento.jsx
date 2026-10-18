import { Link } from 'react-router'
import { categories } from '../../data/content'
import { products } from '../../data/products'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn } from '../../lib/cn'

const counts = Object.fromEntries(categories.map((c) => [c.id, products.filter((p) => p.category === c.id).length]))

// Five categories as a bento: one large tile and four small. The label pill grows an arrow on hover.
export function CategoryBento() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-labelledby="cat-title">
      <SectionHeading id="cat-title" title="Shop by category" link={{ label: 'Shop all', to: '/shop' }} />
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:h-[min(76svh,680px)] lg:grid-cols-4 lg:grid-rows-2">
        {categories.map((c, i) => (
          <li key={c.id} className={cn(i === 0 && 'col-span-2 lg:row-span-2')}>
            <Link to={c.to} className="group relative block h-full overflow-hidden rounded-[24px]" data-reveal-frame style={{ '--reveal-delay': `${i * 80}ms` }}>
              <Img
                id={c.image}
                alt=""
                sizes={i === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                className={cn('h-full', i === 0 ? 'aspect-[4/3] lg:aspect-auto' : 'aspect-[4/5] lg:aspect-auto')}
                position="50% 30%"
                imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-indigo-deep/70 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 sm:inset-x-4 sm:bottom-4">
                <span className="text-chalk">
                  <span className={cn('display block', i === 0 ? 'text-[36px] sm:text-[48px]' : 'text-[20px] leading-[1.05] sm:text-[28px]')}>{c.label}</span>
                  <span className="mt-1 block text-[13px] text-chalk/80">
                    <span className={cn(i > 0 && 'hidden sm:inline')}>{c.note}, </span>
                    {counts[c.id]} styles
                  </span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-chalk text-indigo transition-[transform,background-color] duration-500 ease-[var(--ease-spring)] group-hover:-rotate-45 group-hover:bg-marigold group-hover:text-ink">
                  <Icon name="arrow" size={18} weight="bold" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

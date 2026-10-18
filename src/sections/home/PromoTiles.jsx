import { Link } from 'react-router'
import { promoTiles } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

// Two big banners. On hover the photo leans in and the round arrow turns to point up.
export function PromoTiles() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-label="Featured edits">
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5">
        {promoTiles.map((t, i) => (
          <li key={t.id}>
            <Link to={t.to} className="group relative block overflow-hidden rounded-[28px]" data-reveal-frame style={{ '--reveal-delay': `${i * 120}ms` }}>
              <Img
                id={t.image}
                alt=""
                sizes="(min-width: 640px) 50vw, 100vw"
                className="aspect-[4/5] sm:aspect-[5/6] lg:aspect-[6/5]"
                position={t.focus}
                imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-indigo-deep/75 via-indigo-deep/5 to-transparent" aria-hidden="true" />
              <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-chalk sm:inset-x-8 sm:bottom-8">
                <span>
                  <span className={cn('inline-block rounded-full px-3 py-1 text-[13px] font-semibold', t.tone === 'marigold' ? 'bg-marigold text-ink' : 'bg-chalk text-indigo')}>{t.kicker}</span>
                  <span className="display mt-3 block text-[44px] sm:text-[56px]">{t.title}</span>
                </span>
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-chalk text-indigo transition-[transform,background-color] duration-500 ease-[var(--ease-spring)] group-hover:-rotate-45 group-hover:bg-marigold group-hover:text-ink">
                  <Icon name="arrow" size={22} weight="bold" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

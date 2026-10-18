import { Link } from 'react-router'
import { categories, purpose } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useReveal } from '../hooks/useReveal'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'

const CRAFT = [
  { title: 'We start with cotton', body: 'Mul, slub, linen blends and chanderi. Fabrics that breathe in a Chennai May and still feel good in a Delhi October.', image: 'j20-2' },
  { title: 'Dyed in small batches', body: 'Short runs of each colour mean fewer leftovers, and a wardrobe that does not look like everyone else’s.', image: 'j48-2' },
  { title: 'Cut to move', body: 'Relaxed shapes, deep pockets and elastic where it helps. We test every pattern by actually climbing things in it.', image: 'j08-2' },
]

export function AboutPage() {
  useDocumentTitle('Our Story')
  const ref = useReveal()

  return (
    <div ref={ref}>
      <section className="px-2 pt-2 lg:px-3">
        <div className="overflow-hidden rounded-[32px] bg-indigo text-chalk">
          <div className="shell grid items-center gap-10 py-12 lg:grid-cols-[1fr_1fr] lg:py-16">
            <div>
              <h1 className="display text-[48px] sm:text-[72px]">
                Made for the <span className="swash anim-swash">outdoors</span>
              </h1>
              <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-chalk/80">{purpose.text}</p>
              <Button to="/shop" variant="marigold" size="lg" className="mt-8" arrow>
                Shop the collection
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Img id="j46-1" alt="A woman twirling in an indigo tiered dress at the beach" sizes="(min-width: 1024px) 24vw, 50vw" className="aspect-[4/5] rotate-[-3deg] rounded-[24px]" position="50% 30%" />
              <Img id="j35-1" alt="A woman in a sunflower print dress sitting on rocks" sizes="(min-width: 1024px) 24vw, 50vw" className="mt-12 aspect-[4/5] rotate-[3deg] rounded-[24px]" position="50% 30%" />
            </div>
          </div>
        </div>
      </section>

      <section id="craft" className="shell scroll-mt-32 pt-24 lg:pt-32">
        <h2 className="display text-[38px] sm:text-[54px]">How we make it</h2>
        <ul className="mt-10 space-y-6">
          {CRAFT.map((c, i) => (
            <li key={c.title} className="grid items-center gap-6 rounded-[28px] bg-mist p-4 sm:grid-cols-[260px_1fr] sm:gap-10 sm:p-5">
              <div className="overflow-hidden rounded-[20px]" data-reveal-frame style={{ '--reveal-delay': `${i * 80}ms` }}>
                <Img id={c.image} alt="" sizes="260px" className="aspect-[4/3] sm:aspect-[4/5]" position="50% 40%" />
              </div>
              <div className="pb-2 sm:pr-8">
                <span className="grid size-10 place-items-center rounded-full bg-marigold text-[16px] font-bold">{i + 1}</span>
                <h3 className="display mt-4 text-[30px] sm:text-[38px]">{c.title}</h3>
                <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pt-24 lg:pt-32">
        <h2 className="display text-[34px] sm:text-[44px]">Where to start</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link to={c.to} className="press group inline-flex h-12 items-center gap-2 rounded-full bg-mist pr-1.5 pl-5 text-[15px] font-semibold transition-colors hover:bg-indigo hover:text-chalk">
                {c.label}
                <span className="grid size-9 place-items-center rounded-full bg-chalk text-indigo transition-transform duration-300 group-hover:-rotate-45">
                  <Icon name="arrow" size={15} weight="bold" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

import { offers } from '../../data/content'
import { CopyCode } from '../../components/ui/CopyCode'
import { cn } from '../../lib/cn'

// Three offers as tickets: punched half-circles on both sides, a dashed tear line, a code to copy.
export function OfferTickets() {
  return (
    <section className="shell pt-20 lg:pt-28" aria-label="Offers">
      <ul className="grid gap-4 md:grid-cols-3">
        {offers.map((o, i) => (
          <li
            key={o.code}
            className={cn(
              'group relative flex items-center justify-between gap-4 rounded-[22px] px-6 py-6 transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 hover:-rotate-1',
              i === 1 ? 'bg-indigo text-chalk' : 'bg-mist text-ink',
            )}
            style={{
              WebkitMask: 'radial-gradient(circle 13px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 13px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat',
              mask: 'radial-gradient(circle 13px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 13px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat',
            }}
          >
            <div>
              <p className="display text-[40px]">{o.title}</p>
              <p className={cn('mt-1 text-[14px]', i === 1 ? 'text-chalk/75' : 'text-ink-soft')}>{o.body}</p>
            </div>
            <div className={cn('flex shrink-0 items-center border-l-2 border-dashed pl-4', i === 1 ? 'border-chalk/25' : 'border-ink/15')}>
              <CopyCode code={o.code} light={i === 1} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

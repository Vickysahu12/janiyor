import { Link } from 'react-router'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

/** Section title in bold Bricolage with an optional "see all" pill link beside it. */
export function SectionHeading({ title, sub, link, id, className, align = 'left', light }) {
  const center = align === 'center'
  return (
    <div className={cn('flex flex-col gap-4', center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between', className)}>
      <div>
        <h2 id={id} className={cn('display text-[34px] sm:text-[46px]', light ? 'text-chalk' : 'text-ink')}>
          {title}
        </h2>
        {sub && <p className={cn('mt-3 max-w-[52ch] text-[16px]', light ? 'text-chalk/75' : 'text-ink-soft', center && 'mx-auto')}>{sub}</p>}
      </div>
      {link && (
        <Link
          to={link.to}
          className={cn(
            'group press inline-flex h-10 shrink-0 items-center gap-2 self-start rounded-full pr-1.5 pl-4 text-[14px] font-semibold transition-colors sm:self-auto',
            light ? 'bg-chalk/10 text-chalk hover:bg-chalk/20' : 'bg-mist text-ink hover:bg-mist-deep',
          )}
        >
          {link.label}
          <span className="grid size-7 place-items-center rounded-full bg-indigo text-chalk transition-transform duration-300 group-hover:rotate-[-45deg]">
            <Icon name="arrow" size={14} weight="bold" />
          </span>
        </Link>
      )}
    </div>
  )
}

/** Page title for inner pages. */
export function PageTitle({ title, sub, className, children }) {
  return (
    <div className={cn('pb-6', className)}>
      <h1 className="display text-[40px] text-ink sm:text-[56px]">{title}</h1>
      {sub && <p className="mt-2 text-[15px] text-ink-soft">{sub}</p>}
      {children}
    </div>
  )
}

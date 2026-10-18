import { Link } from 'react-router'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'

// Plain wordmark until the client's logo arrives: lowercase Bricolage with a marigold sun
// for the dot of the i. Swap this component's contents for the logo file later.
export function Logo({ className, light, link = true }) {
  const mark = (
    <span className={cn('display relative inline-flex items-baseline text-[28px] leading-none tracking-[-0.05em] lg:text-[32px]', light ? 'text-chalk' : 'text-indigo', className)}>
      jan
      <span className="relative">
        ı
        <span className="absolute top-[0.02em] left-1/2 size-[0.24em] -translate-x-1/2 rounded-full bg-marigold" aria-hidden="true" />
      </span>
      yor
    </span>
  )
  if (!link) return <span aria-label={site.name}>{mark}</span>
  return (
    <Link to="/" aria-label={`${site.name} home`} className="press inline-block">
      {mark}
    </Link>
  )
}

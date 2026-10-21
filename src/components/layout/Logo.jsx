import { Link } from 'react-router'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'

// The client's logo (public/brand): the dusty-rose J with its sprig beside the "Janniyor"
// wordmark. `light` uses the cream wordmark for dark grounds.
export function Logo({ className, light, link = true }) {
  const mark = (
    <span className={cn('relative inline-flex items-center gap-2', className)}>
      <img src="/brand/mark.png" alt="" width={214} height={403} draggable={false} className="h-10 w-auto lg:h-11" />
      <img src={light ? '/brand/wordmark-light.png' : '/brand/wordmark.png'} alt={site.name} width={902} height={216} draggable={false} className="h-7 w-auto lg:h-8" />
    </span>
  )
  if (!link) return <span aria-label={site.name}>{mark}</span>
  return (
    <Link to="/" aria-label={`${site.name} home`} className="press inline-block">
      {mark}
    </Link>
  )
}

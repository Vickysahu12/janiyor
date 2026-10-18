import { Link } from 'react-router'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

// Each variant sets the resting colours and the colour that rises from the bottom on hover.
const variants = {
  primary: '',
  marigold: '[--btn-bg:var(--color-marigold)] [--btn-fg:var(--color-ink)] [--btn-fill:var(--color-indigo)] [--btn-fill-fg:var(--color-chalk)]',
  light: '[--btn-bg:var(--color-chalk)] [--btn-fg:var(--color-ink)] [--btn-fill:var(--color-marigold)] [--btn-fill-fg:var(--color-ink)]',
  outline:
    '[--btn-bg:transparent] [--btn-fg:var(--color-ink)] [--btn-fill:var(--color-indigo)] [--btn-fill-fg:var(--color-chalk)] shadow-[inset_0_0_0_1.5px_var(--color-ink)]',
  'outline-light':
    '[--btn-bg:transparent] [--btn-fg:var(--color-chalk)] [--btn-fill:var(--color-chalk)] [--btn-fill-fg:var(--color-indigo)] shadow-[inset_0_0_0_1.5px_rgb(251_251_248/0.7)]',
  ghost: '[--btn-bg:var(--color-mist)] [--btn-fg:var(--color-ink)] [--btn-fill:var(--color-mist-deep)] [--btn-fill-fg:var(--color-ink)]',
}

const sizes = {
  sm: 'h-10 px-5 text-[13px]',
  md: 'h-12 px-6 text-[14px]',
  lg: 'h-14 px-8 text-[15px]',
}

/**
 * Pill button. The hover fill rises from the bottom edge and the arrow (when `arrow`)
 * tilts up and right. Renders a router <Link> for `to`, an <a> for `href`, else a <button>.
 */
export function Button({ to, href, variant = 'primary', size = 'md', arrow, className, children, ...props }) {
  const classes = cn('btn', variants[variant], sizes[size], className)
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" size={16} weight="bold" className="btn-arrow" />}
    </>
  )
  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>
  if (href) return <a href={href} className={classes} {...props}>{content}</a>
  return <button type="button" className={classes} {...props}>{content}</button>
}

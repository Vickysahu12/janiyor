import { marquee } from '../../data/content'
import { Icon } from '../../components/ui/Icon'

// The page's one running strip: our promises in large type, paused on hover.
export function Marquee() {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marquee.map((m) => (
        <li key={m} className="flex items-center gap-6 px-6 sm:gap-8 sm:px-8">
          <span className="display text-[26px] whitespace-nowrap sm:text-[34px]">{m}</span>
          <Icon name="sun" size={26} weight="fill" className="text-indigo" />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Why Janniyor" className="marquee mt-4 overflow-hidden bg-marigold py-4 text-ink sm:py-5">
      <div className="marquee-track flex w-max" style={{ '--marquee-duration': '38s' }}>
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}

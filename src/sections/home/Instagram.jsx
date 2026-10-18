import { instagram } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'

// Six squares from the feed. On hover each one tints indigo and the icon springs up.
export function Instagram() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-20 lg:pt-28" aria-labelledby="ig-title">
      <div className="flex flex-col items-center text-center">
        <h2 id="ig-title" className="display text-[38px] sm:text-[54px]">
          Find us on Instagram
        </h2>
        <p className="mt-2 text-[16px] text-ink-soft">Tag {instagram.handle} to be featured.</p>
      </div>
      <ul className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {instagram.images.map((id, i) => (
          <li key={id}>
            <a href={instagram.href} target="_blank" rel="noreferrer" aria-label={`Instagram post ${i + 1}`} className="group relative block overflow-hidden rounded-[20px]" data-reveal-frame style={{ '--reveal-delay': `${i * 70}ms` }}>
              <Img id={id} alt="" sizes="(min-width: 1024px) 16vw, 33vw" className="aspect-square" position="50% 30%" imgClassName="transition-transform duration-1000 ease-out group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-indigo/0 transition-colors duration-300 group-hover:bg-indigo/55">
                <Icon name="instagram" size={30} className="translate-y-3 scale-75 text-chalk opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-spring)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <Button href={instagram.href} target="_blank" rel="noreferrer" variant="outline" arrow>
          Follow {instagram.handle}
        </Button>
      </div>
    </section>
  )
}

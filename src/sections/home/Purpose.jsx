import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { purpose } from '../../data/content'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

/**
 * The brand promise, read as you scroll: each word brightens in turn while the section
 * passes through the viewport. Three plain values sit underneath.
 */
export function Purpose() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const words = purpose.text.split(' ')

  return (
    <section ref={ref} className="shell pt-24 lg:pt-36" aria-label="Our purpose">
      <p className="display mx-auto max-w-[24ch] text-center text-[30px] leading-[1.12] sm:text-[44px] lg:text-[54px]">
        {reduce
          ? purpose.text
          : words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
      </p>

      <ul className="mx-auto mt-14 grid max-w-[1000px] gap-8 sm:grid-cols-3 sm:gap-6">
        {purpose.values.map((v) => (
          <li key={v.title} className="group flex flex-col items-center text-center">
            <span className="grid size-16 place-items-center rounded-full bg-marigold-soft text-indigo transition-[transform,background-color] duration-500 ease-[var(--ease-spring)] group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-marigold">
              <Icon name={v.icon} size={28} weight="duotone" />
            </span>
            <h3 className="mt-4 text-[18px] font-bold">{v.title}</h3>
            <p className="mt-1.5 max-w-[30ch] text-[15px] text-ink-soft">{v.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <Button to={purpose.cta.to} arrow>
          {purpose.cta.label}
        </Button>
      </div>
    </section>
  )
}

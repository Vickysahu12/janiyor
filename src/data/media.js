// Media manifest. Every product photo is 4:5 and lives in public/media/products as
// <id>.webp (800 x 1000) and <id>-sm.webp (400 x 500). `-1` is the full look,
// `-2` a closer crop of the same photo. tones.json holds each photo's average colour,
// shown as a placeholder while the file loads.
import tones from './tones.json'

export const imageSet = (id) => ({
  id,
  src: `/media/products/${id}.webp`,
  srcSm: `/media/products/${id}-sm.webp`,
  tone: tones[id] ?? 'var(--color-mist)',
})

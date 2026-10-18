// Navigation content: the mega-menu panels (desktop), menu tabs (phone) and quick chips.

export const megaMenus = [
  {
    id: 'shop',
    label: 'Shop',
    to: '/shop',
    columns: [
      {
        title: 'Categories',
        items: [
          { label: 'Co-ord Sets', desc: 'Matched, then mixed', image: 'j48-1', to: '/shop/co-ords' },
          { label: 'Shirts & Tops', desc: 'Your new uniform', image: 'j25-1', to: '/shop/tops' },
          { label: 'Dresses', desc: 'Made to twirl', image: 'j46-1', to: '/shop/dresses' },
          { label: 'Kurta Sets', desc: 'Easy festive', image: 'j22-1', to: '/shop/kurta-sets' },
          { label: 'Shrugs & Jackets', desc: 'The third piece', image: 'j34-1', to: '/shop/jackets' },
        ],
      },
    ],
    feature: { image: 'j35-1', title: 'The sunflower dress is back', to: '/product/sunflower-print-dress' },
  },
  {
    id: 'mood',
    label: 'Shop by mood',
    to: '/shop',
    columns: [
      {
        title: 'Moods',
        items: [
          { label: 'Vacation', desc: 'Sea air, light layers', image: 'j17-1', to: '/shop?occasion=vacation' },
          { label: 'Workwear', desc: 'Calm colours, clean cuts', image: 'j16-1', to: '/shop?occasion=workwear' },
          { label: 'Weekend', desc: 'Brunch, then wherever', image: 'j48-1', to: '/shop?occasion=weekend' },
          { label: 'Festive', desc: 'Mirror work and chanderi', image: 'j49-1', to: '/shop?occasion=festive' },
          { label: 'Everyday', desc: 'The ones you live in', image: 'j15-1', to: '/shop?occasion=everyday' },
        ],
      },
    ],
    feature: { image: 'j34-2', title: 'Olive blazer set, this week’s deal', to: '/product/olive-blazer-set' },
  },
]

export const navLinks = [
  { label: 'New in', to: '/shop?sort=new' },
  { label: 'Our story', to: '/about' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]

export const quickChips = [
  { label: 'New in', to: '/shop?sort=new' },
  { label: 'Co-ords', to: '/shop/co-ords' },
  { label: 'Tops', to: '/shop/tops' },
  { label: 'Dresses', to: '/shop/dresses' },
  { label: 'Kurta Sets', to: '/shop/kurta-sets' },
  { label: 'Jackets', to: '/shop/jackets' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]

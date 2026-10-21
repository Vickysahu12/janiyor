// Brand-level settings. Change the name, offers, fees or contact details here, not in components.
export const site = {
  name: 'Janniyor',
  tagline: 'Cotton for sunny days',
  currency: 'INR',
  locale: 'en-IN',
  freeShippingOver: 1499,
  shippingFee: 79,
  codFee: 49,
  giftWrapFee: 79,
  orderPrefix: 'JN',
  instagram: '@janiyor',
  phone: '+91 98765 43210',
  email: 'hello@janniyor.in',

  announcements: [
    'Free shipping on orders above ₹1,499',
    'Extra 10% off sitewide with code SUNNY10',
    'Easy 7-day returns with free pickup',
  ],

  // Coupon codes accepted at bag / checkout (demo).
  coupons: {
    SUNNY10: { type: 'percent', value: 10, label: '10% off sitewide' },
    HELLO15: { type: 'percent', value: 15, label: '15% off your first order', min: 2499 },
    FLAT300: { type: 'flat', value: 300, label: '₹300 off above ₹3,999', min: 3999 },
  },

  footer: {
    blurb: 'Breathable cotton co-ords, shirts, dresses and kurta sets, dyed in small batches.',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'Co-ord Sets', to: '/shop/co-ords' },
          { label: 'Shirts & Tops', to: '/shop/tops' },
          { label: 'Dresses', to: '/shop/dresses' },
          { label: 'Kurta Sets', to: '/shop/kurta-sets' },
          { label: 'Shrugs & Jackets', to: '/shop/jackets' },
          { label: 'Sale', to: '/shop?sale=1' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Track order', to: '/account' },
          { label: 'Size guide', to: '/help#sizing' },
          { label: 'Shipping', to: '/help#shipping' },
          { label: 'Returns', to: '/help#returns' },
          { label: 'Contact', to: '/help#contact' },
        ],
      },
      {
        title: 'Janniyor',
        links: [
          { label: 'Our story', to: '/about' },
          { label: 'How we make it', to: '/about#craft' },
          { label: 'Wishlist', to: '/wishlist' },
          { label: 'Privacy', to: '/help#privacy' },
        ],
      },
    ],
  },
}

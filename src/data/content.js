// Editorial content for the storefront. Kept out of components so the client
// (or a CMS later) can change copy and imagery in one place.
// Image ids refer to public/media/products (jNN-1 full look, jNN-2 close crop).

// Campaign hero: the photo, a giant number behind the model, and the model cut out of the
// photo (public/media/hero/<id>-bg.webp and <id>-cut.webp, made from the client's shots).
export const campaign = {
  kicker: 'Janiyor Summer Week',
  dates: '18 Oct to 26 Oct',
  number: '30',
  title: 'Cotton Week',
  sub: 'Up to 30% off co-ords, shirts and dresses. Breathable, bright and made to move.',
  cta: { label: 'Shop the sale', to: '/shop?sale=1' },
  footnote: 'Online only',
  looks: [
    { id: 'j21', productId: 'j21', height: '74%' }, // close-up: smaller, so the number shows
    { id: 'j17', productId: 'j17', height: '94%' },
    { id: 'j18', productId: 'j18', height: '94%' },
  ],
}

export const hero = {
  title: 'Cotton for sunny, unhurried days',
  sub: 'Co-ords, shirts and dresses in breathable cotton, cut loose and dyed bright.',
  primary: { label: 'Shop new in', to: '/shop?sort=new' },
  secondary: { label: 'Co-ord sets', to: '/shop/co-ords' },
}

// One running strip under the hero.
export const marquee = ['Breathable cotton', 'Free returns in 7 days', 'Cash on delivery', 'Small-batch dyes', 'Sizes XS to XXL', 'Ships in 48 hours']

export const categoryLabels = {
  'co-ords': 'Co-ord Sets',
  tops: 'Shirts & Tops',
  dresses: 'Dresses',
  'kurta-sets': 'Kurta Sets',
  jackets: 'Shrugs & Jackets',
}

export const categorySingular = {
  'co-ords': 'Co-ord Set',
  tops: 'Top',
  dresses: 'Dress',
  'kurta-sets': 'Kurta Set',
  jackets: 'Layer',
}

// Order sets the bento: the first tile is the large one.
export const categories = [
  { id: 'co-ords', label: 'Co-ord Sets', note: 'Matched, then mixed', image: 'j48-1', to: '/shop/co-ords' },
  { id: 'dresses', label: 'Dresses', note: 'Made to twirl', image: 'j46-1', to: '/shop/dresses' },
  { id: 'tops', label: 'Shirts & Tops', note: 'Your new uniform', image: 'j25-1', to: '/shop/tops' },
  { id: 'kurta-sets', label: 'Kurta Sets', note: 'Easy festive', image: 'j22-1', to: '/shop/kurta-sets' },
  { id: 'jackets', label: 'Shrugs & Jackets', note: 'The third piece', image: 'j34-1', to: '/shop/jackets' },
]

// "Mood" is how this brand names occasions. Stored in each product's `occasions`.
export const occasionLabels = {
  everyday: 'Everyday',
  workwear: 'Workwear',
  vacation: 'Vacation',
  festive: 'Festive',
  weekend: 'Weekend',
}

export const occasions = [
  { id: 'vacation', label: 'Vacation', note: 'Sea air, light layers', image: 'j46-1', to: '/shop?occasion=vacation' },
  { id: 'workwear', label: 'Workwear', note: 'Calm colours, clean cuts', image: 'j16-1', to: '/shop?occasion=workwear' },
  { id: 'weekend', label: 'Weekend', note: 'Brunch, then wherever', image: 'j48-1', to: '/shop?occasion=weekend' },
  { id: 'festive', label: 'Festive', note: 'Mirror work and chanderi', image: 'j49-1', to: '/shop?occasion=festive' },
  { id: 'everyday', label: 'Everyday', note: 'The ones you live in', image: 'j15-1', to: '/shop?occasion=everyday' },
]

// Tabs on the bestsellers grid. `query` is passed to queryProducts().
export const collectionTabs = [
  { id: 'best', label: 'Bestsellers', query: { bestseller: true } },
  { id: 'new', label: 'New in', query: { sort: 'new' } },
  { id: 'coords', label: 'Co-ords', query: { category: 'co-ords', sort: 'rating' } },
  { id: 'value', label: 'Under ₹2,000', query: { price: ['u2000'], sort: 'rating' } },
]

export const purpose = {
  text: 'We make clothes for women who would rather be outside. Soft cotton, colours that hold up in the sun, and cuts loose enough to climb a rock in.',
  values: [
    { icon: 'leaf', title: 'Breathable cotton', body: 'Cotton, mul, linen blends and chanderi. Nothing that traps heat.' },
    { icon: 'drop', title: 'Small-batch dyes', body: 'Colours made in short runs, so they stay a little special.' },
    { icon: 'scissors', title: 'Cut to move', body: 'Relaxed fits, real pockets, elastic where it helps.' },
  ],
  cta: { label: 'Our story', to: '/about' },
}

export const promoTiles = [
  { id: 'best', image: 'j28-1', kicker: 'Most loved', title: 'Bestsellers', to: '/shop?sort=rating', focus: '50% 25%', tone: 'marigold' },
  { id: 'new', image: 'j39-1', kicker: 'Just landed', title: 'New in', to: '/shop?sort=new', focus: '50% 30%', tone: 'indigo' },
]

// Deal of the week. Ends on the next Sunday at midnight, computed on the client.
export const deal = {
  productId: 'j34',
  title: 'Deal of the week',
  body: 'The olive blazer set at its lowest price this season. Extra 10% off with the code below.',
  code: 'SUNNY10',
}

// Shop the look: hotspots placed as % of the photo. Each dot opens its product.
export const looks = [
  {
    id: 'olive',
    image: 'j34-1',
    title: 'Blazer, tube top, done',
    spots: [
      { productId: 'j34', x: 22, y: 46 },
      { productId: 'j21', x: 45, y: 36 },
    ],
  },
  {
    id: 'sky',
    image: 'j10-1',
    title: 'Overshirt over everything',
    spots: [
      { productId: 'j10', x: 74, y: 46 },
      { productId: 'j21', x: 36, y: 46 },
      { productId: 'j23', x: 36, y: 80 },
    ],
  },
]

// "Build your capsule": four pieces that work together. One button adds the ticked ones.
export const lookbook = {
  title: 'Build a holiday capsule',
  sub: 'Four pieces, a week of outfits. Tick what you need, pick your sizes, add them in one go.',
  productIds: ['j24', 'j21', 'j10', 'j46'],
}

export const offers = [
  { title: '10% off', body: 'Sitewide, no minimum', code: 'SUNNY10' },
  { title: '15% off', body: 'First order above ₹2,499', code: 'HELLO15' },
  { title: '₹300 off', body: 'Orders above ₹3,999', code: 'FLAT300' },
]

// Sample customer notes (demo content), each linked to the piece she bought.
export const testimonials = [
  { name: 'Aditi Rao', city: 'Bengaluru', rating: 5, productId: 'j46', text: 'Wore the tiered dress all through Goa. It washed well in a hotel sink and still looked new.' },
  { name: 'Meghna Kulkarni', city: 'Pune', rating: 5, productId: 'j16', text: 'The charcoal co-ord is my Monday outfit now. Wide pants, real pockets, no ironing drama.' },
  { name: 'Ishita Bose', city: 'Kolkata', rating: 4, productId: 'j49', text: 'Bought the navy anarkali for Durga Puja. The flare is gorgeous and the cotton kept me cool.' },
  { name: 'Riya Sharma', city: 'Jaipur', rating: 5, productId: 'j48', text: 'Gingham co-ord in yellow. Got stopped twice at the cafe to ask where it was from.' },
  { name: 'Zoya Khan', city: 'Lucknow', rating: 5, productId: 'j28', text: 'Ordered the wine peplum top in M, fit perfectly. The butis are tiny and so pretty.' },
]

// Instagram grid (images link to the brand page).
export const instagram = {
  handle: '@janiyor',
  href: 'https://instagram.com',
  images: ['j08-1', 'j26-1', 'j32-1', 'j36-1', 'j43-1', 'j50-1'],
}

export const serviceRow = [
  { icon: 'truck', title: 'Free shipping', body: 'On orders above ₹1,499' },
  { icon: 'returns', title: '7-day returns', body: 'Free pickup from home' },
  { icon: 'cash', title: 'Cash on delivery', body: 'Across India' },
  { icon: 'chat', title: 'Size help', body: 'WhatsApp us anytime' },
]

// Review pool used to fill product pages (demo).
export const reviewPool = [
  { name: 'Sneha P.', rating: 5, title: 'So comfortable', text: 'The cotton is soft from the first wash. Fit is relaxed without looking baggy.' },
  { name: 'Ananya R.', rating: 5, title: 'Colour is lovely', text: 'Exactly the shade in the photos. Got compliments on the first day.' },
  { name: 'Kritika M.', rating: 4, title: 'Good fit', text: 'Ordered my usual size. Pants were a little long but fine with sneakers.' },
  { name: 'Pooja D.', rating: 5, title: 'Worth it', text: 'Stitching is neat, pockets are deep. Will buy another colour.' },
  { name: 'Tanvi S.', rating: 4, title: 'Nice and breezy', text: 'Perfect for the heat. Slightly sheer in white, so wear a camisole.' },
]

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New in' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export const priceBands = [
  { id: 'u2000', label: 'Under ₹2,000', min: 0, max: 1999 },
  { id: '2000-2500', label: '₹2,000 to ₹2,500', min: 2000, max: 2500 },
  { id: '2500-3000', label: '₹2,500 to ₹3,000', min: 2501, max: 3000 },
  { id: 'o3000', label: 'Above ₹3,000', min: 3001, max: Infinity },
]

export const sizeChart = [
  ['XS', '32', '26', '34'],
  ['S', '34', '28', '36'],
  ['M', '36', '30', '38'],
  ['L', '38', '32', '40'],
  ['XL', '40', '34', '42'],
  ['XXL', '42', '36', '44'],
]

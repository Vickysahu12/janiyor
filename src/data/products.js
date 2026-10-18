// Demo catalogue built from the client's photos (public/media/products/jNN-1 / jNN-2).
// `n` is the source photo number (src/assets/image/ImgNN). Shape mirrors what a
// products API would return, so services/catalog.js can switch to fetch() later.
// Prices, ratings and copy are sample data.

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const CATEGORY = {
  'co-ords': {
    includes: 'Top and bottom',
    care: ['Machine wash cold on gentle, inside out', 'Wash darks separately', 'Dry in shade, iron on medium'],
  },
  tops: {
    includes: 'Top only',
    care: ['Machine wash cold on gentle', 'Do not tumble dry', 'Iron on medium on the reverse'],
  },
  dresses: {
    includes: 'Dress (belt where shown)',
    care: ['Hand wash or gentle machine wash cold', 'Dry flat in shade', 'Iron on medium'],
  },
  'kurta-sets': {
    includes: 'Kurta and pants',
    care: ['Hand wash cold, inside out', 'Dry in shade to keep the colour', 'Steam or iron on medium'],
  },
  jackets: {
    includes: 'Jacket or shrug (styling pieces not included)',
    care: ['Gentle wash cold', 'Hang to dry', 'Iron on medium'],
  },
}

const item = (category) => (p) => ({ category, sizes: SIZES, ...CATEGORY[category], ...p })
const coord = item('co-ords')
const top = item('tops')
const dress = item('dresses')
const kurta = item('kurta-sets')
const jacket = item('jackets')

const raw = [
  coord({ n: 1, name: 'Ink Daisy Shirt Co-ord', fabric: 'Cotton Slub', color: 'Black', hex: '#1f1e22', occasions: ['weekend', 'workwear'], price: 2699, compareAt: 3199, rating: 4.7, reviews: 128, bestseller: true, blurb: 'A relaxed black shirt with hand-embroidered yellow daisies, paired with straight pants. Wear it as a set or split it.' }),
  kurta({ n: 2, name: 'Chalk Kurta & Stole Set', fabric: 'Mul Cotton', color: 'Ivory', hex: '#ede9df', occasions: ['everyday', 'festive'], price: 2899, rating: 4.6, reviews: 74, blurb: 'A soft ivory kurta with tonal embroidery, wide pants and a light stole for the evenings.' }),
  jacket({ n: 3, name: 'Pinstripe Long Shrug', fabric: 'Linen Blend', color: 'Grey', hex: '#a9a6a0', occasions: ['workwear', 'weekend'], price: 1999, rating: 4.4, reviews: 41, blurb: 'A long open shrug in a fine pinstripe. Throw it over any dress or tee.' }),
  kurta({ n: 4, name: 'Rust Easy Kurta Set', fabric: 'Cotton Slub', color: 'Rust', hex: '#9a5a2c', occasions: ['everyday', 'workwear'], price: 2499, rating: 4.6, reviews: 66, blurb: 'A rust kurta with a contrast pick-stitch hem and wide cropped pants.' }),
  jacket({ n: 5, name: 'Night Shirt Jacket Set', fabric: 'Cotton', color: 'Black', hex: '#23232a', occasions: ['weekend', 'vacation'], price: 2999, rating: 4.7, reviews: 52, isNew: true, badge: 'New', blurb: 'A boxy black shirt jacket with white top-stitching and tassel trims, worn with matching pants.' }),
  dress({ n: 6, name: 'Cherry Shift Dress', fabric: 'Cotton', color: 'Red', hex: '#b0242a', occasions: ['vacation', 'weekend'], price: 1899, rating: 4.5, reviews: 88, bestseller: true, blurb: 'A swingy red shift with short sleeves and side pockets. Made for long walks.' }),
  top({ n: 7, name: 'Sandcheck Tunic Top', fabric: 'Cotton', color: 'Beige', hex: '#d8ccbb', occasions: ['workwear', 'everyday'], price: 1499, rating: 4.4, reviews: 39, blurb: 'A loose check tunic with a button front and gathered sleeves.' }),
  coord({ n: 8, name: 'Midnight Bell Sleeve Co-ord', fabric: 'Linen Blend', color: 'Black', hex: '#1b1b20', occasions: ['festive', 'weekend'], price: 3199, rating: 4.8, reviews: 61, blurb: 'Dramatic bell sleeves, a tonal embroidered motif and slim pants. Evening, sorted.' }),
  coord({ n: 9, name: 'Teal Flower Sleeveless Co-ord', fabric: 'Cotton', color: 'Teal', hex: '#4d8f8c', occasions: ['vacation', 'weekend'], price: 2299, rating: 4.6, reviews: 57, family: 'sleeveless', blurb: 'A sleeveless top with appliqué yellow flowers and wide-leg pants in soft teal.' }),
  jacket({ n: 10, name: 'Sky Overshirt', fabric: 'Cotton', color: 'Sky Blue', hex: '#5a95c4', occasions: ['vacation', 'weekend'], price: 1799, compareAt: 2199, rating: 4.5, reviews: 70, blurb: 'A sky blue overshirt with rolled sleeves. Over a tee, over a dress, over a swimsuit.' }),
  kurta({ n: 11, name: 'Coral Garden Kurta Set', fabric: 'Mul Cotton', color: 'Coral', hex: '#d17c64', occasions: ['everyday', 'festive'], price: 2599, rating: 4.7, reviews: 83, family: 'straight-kurta', blurb: 'A coral kurta with a small embroidered bouquet, paired with striped pants.' }),
  top({ n: 12, name: 'Coral Stripe Shirt', fabric: 'Handloom Cotton', color: 'Coral', hex: '#c9605a', occasions: ['workwear', 'everyday'], price: 1599, rating: 4.5, reviews: 46, blurb: 'A handloom stripe shirt with puff cuffs and a contrast placket.' }),
  coord({ n: 13, name: 'Mustard Sleeveless Co-ord', fabric: 'Cotton', color: 'Mustard', hex: '#c99a2e', occasions: ['vacation', 'weekend'], price: 2299, rating: 4.6, reviews: 49, family: 'sleeveless', blurb: 'The sleeveless co-ord in sunny mustard, with a gathered top and easy pants.' }),
  kurta({ n: 14, name: 'Sea Green Long Shirt Set', fabric: 'Cotton Slub', color: 'Sea Green', hex: '#4fa592', occasions: ['everyday', 'vacation'], price: 2499, rating: 4.5, reviews: 35, blurb: 'A long sea green shirt-kurta with a slit hem and pinstripe pants.' }),
  coord({ n: 15, name: 'Brick Red Kurta Co-ord', fabric: 'Cotton', color: 'Red', hex: '#a8443a', occasions: ['everyday', 'workwear'], price: 2399, rating: 4.6, reviews: 72, blurb: 'A brick red kurta top with pocket details and matching straight pants.' }),
  coord({ n: 16, name: 'Charcoal Notch Neck Co-ord', fabric: 'Linen Blend', color: 'Charcoal', hex: '#3e3b3d', occasions: ['workwear'], price: 2799, rating: 4.7, reviews: 64, bestseller: true, blurb: 'A charcoal top with an embroidered notch neck and wide trousers. Office-ready, not office-dull.' }),
  dress({ n: 17, name: 'Peach Shirt Dress', fabric: 'Cotton', color: 'Peach', hex: '#e08a6c', occasions: ['vacation', 'weekend'], price: 2199, rating: 4.6, reviews: 58, family: 'shirt-dress', blurb: 'A breezy shirt dress with a tiered hem and roll-up sleeves.' }),
  dress({ n: 18, name: 'Oat Shirt Dress', fabric: 'Cotton', color: 'Oat', hex: '#e2dacb', occasions: ['vacation', 'workwear'], price: 2199, rating: 4.5, reviews: 44, family: 'shirt-dress', blurb: 'The shirt dress in oat, with side slits and a relaxed fit.' }),
  coord({ n: 19, name: 'Marigold Shirt Co-ord', fabric: 'Cotton Slub', color: 'Mustard', hex: '#d5a42a', occasions: ['weekend', 'festive'], price: 2599, rating: 4.7, reviews: 77, blurb: 'A marigold shirt with a pocket embroidery and wide pants. Sunshine in a set.' }),
  coord({ n: 20, name: 'Denim Blue Peplum Co-ord', fabric: 'Cotton', color: 'Blue', hex: '#6f93b8', occasions: ['weekend', 'vacation'], price: 2699, rating: 4.6, reviews: 51, isNew: true, blurb: 'A pintucked peplum top and cropped pants in washed blue.' }),
  top({ n: 21, name: 'Smocked Tube Top', fabric: 'Cotton', color: 'Ivory', hex: '#ebe5da', occasions: ['vacation', 'weekend'], price: 1299, rating: 4.4, reviews: 33, blurb: 'A stretchy smocked tube top with a ruffle edge. Pairs with everything here.' }),
  kurta({ n: 22, name: 'Peacock Teal Kurta Set', fabric: 'Chanderi', color: 'Teal', hex: '#1f6b72', occasions: ['festive', 'everyday'], price: 3299, rating: 4.8, reviews: 68, blurb: 'A deep teal chanderi kurta with a gathered yoke and matching pants.' }),
  coord({ n: 23, name: 'Cream Tube Top Co-ord', fabric: 'Cotton', color: 'Cream', hex: '#efe6d6', occasions: ['vacation', 'weekend'], price: 2199, rating: 4.5, reviews: 29, blurb: 'A smocked tube top and high-waist trousers in one soft cream.' }),
  coord({ n: 24, name: 'Lilac Shirt & Shorts Set', fabric: 'Linen Blend', color: 'Lilac', hex: '#b9a6d1', occasions: ['vacation', 'weekend'], price: 2399, rating: 4.6, reviews: 47, isNew: true, blurb: 'An oversized lilac shirt with matching shorts. Holiday packing, solved.' }),
  top({ n: 25, name: 'Lemon Pleated Shirt', fabric: 'Cotton', color: 'Yellow', hex: '#ecd25b', occasions: ['workwear', 'everyday'], price: 1699, rating: 4.5, reviews: 38, blurb: 'A lemon shirt with front pleats and three-quarter sleeves.' }),
  top({ n: 26, name: 'Lime Yoke Colourblock Shirt', fabric: 'Cotton', color: 'Ivory', hex: '#e5e3d6', occasions: ['weekend', 'everyday'], price: 1799, rating: 4.6, reviews: 42, blurb: 'An ivory shirt with a lime yoke and collar. Easy, with a twist.' }),
  coord({ n: 27, name: 'Lilac Long Sleeve Co-ord', fabric: 'Linen Blend', color: 'Lilac', hex: '#a995c7', occasions: ['weekend', 'workwear'], price: 2699, rating: 4.6, reviews: 36, blurb: 'A longline lilac shirt with roll-tab sleeves and straight pants.' }),
  top({ n: 28, name: 'Wine Buti Peplum Top', fabric: 'Cotton', color: 'Wine', hex: '#7a1f33', occasions: ['festive', 'everyday'], price: 1599, rating: 4.7, reviews: 91, bestseller: true, blurb: 'A wine peplum top with small white butis and a V neck.' }),
  coord({ n: 29, name: 'Plum Sleeveless Co-ord', fabric: 'Cotton', color: 'Plum', hex: '#6d2440', occasions: ['vacation', 'weekend'], price: 2299, rating: 4.5, reviews: 33, blurb: 'A sleeveless plum top and wide pants. Best with white sneakers.' }),
  coord({ n: 30, name: 'Plum Mirror Peplum Co-ord', fabric: 'Cotton', color: 'Plum', hex: '#6e2242', occasions: ['festive', 'weekend'], price: 2799, compareAt: 3299, rating: 4.7, reviews: 54, blurb: 'A plum peplum top with a mirror-work yoke and pants with embroidered hems.' }),
  kurta({ n: 31, name: 'Pista Bell Sleeve Kurta Set', fabric: 'Chanderi', color: 'Pista', hex: '#c8c69a', occasions: ['festive', 'everyday'], price: 3199, rating: 4.6, reviews: 40, blurb: 'A pista kurta with wide bell sleeves and matching pants.' }),
  coord({ n: 32, name: 'Apricot Kurta Co-ord', fabric: 'Mul Cotton', color: 'Peach', hex: '#e7a07a', occasions: ['everyday', 'festive'], price: 2499, rating: 4.6, reviews: 45, blurb: 'A soft apricot kurta top and pants with a flared hem.' }),
  coord({ n: 33, name: 'Blush Button Co-ord', fabric: 'Cotton', color: 'Pink', hex: '#d39aa0', occasions: ['everyday', 'vacation'], price: 2499, rating: 4.5, reviews: 52, blurb: 'A blush top with a long button placket and relaxed pants.' }),
  jacket({ n: 34, name: 'Olive Blazer Set', fabric: 'Linen Blend', color: 'Olive', hex: '#6e6b33', occasions: ['workwear', 'festive'], price: 3499, compareAt: 3999, rating: 4.8, reviews: 47, badge: 'Bestseller', bestseller: true, blurb: 'An olive blazer with tonal buti embroidery and matching trousers. Wear it with a tube top or a tee.' }),
  dress({ n: 35, name: 'Sunflower Print Dress', fabric: 'Cotton', color: 'Yellow', hex: '#e2b43b', occasions: ['vacation', 'weekend'], price: 2299, rating: 4.7, reviews: 63, blurb: 'A yellow dress with painterly green leaves and a soft flared skirt.' }),
  coord({ n: 36, name: 'Coral Colourblock Co-ord', fabric: 'Cotton', color: 'Coral', hex: '#d55d47', occasions: ['weekend', 'everyday'], price: 2599, rating: 4.6, reviews: 38, family: 'colourblock', blurb: 'An ivory and coral colourblock top with matching coral pants.' }),
  top({ n: 37, name: 'Navy Smocked Peplum Top', fabric: 'Cotton', color: 'Navy', hex: '#1d2a5c', occasions: ['everyday', 'weekend'], price: 1599, rating: 4.6, reviews: 59, blurb: 'A navy peplum top with puff sleeves and a smocked waist.' }),
  coord({ n: 38, name: 'Rose Pink Kurta Co-ord', fabric: 'Cotton Slub', color: 'Pink', hex: '#d2788a', occasions: ['everyday', 'festive'], price: 2499, rating: 4.6, reviews: 48, blurb: 'A rose pink kurta top with a small embroidered motif and straight pants.' }),
  coord({ n: 39, name: 'White Wrap Co-ord', fabric: 'Cotton', color: 'White', hex: '#efefeb', occasions: ['vacation', 'workwear'], price: 2899, rating: 4.7, reviews: 44, isNew: true, blurb: 'A white wrap top with contrast piping and wide pants. Crisp, cool, done.' }),
  kurta({ n: 40, name: 'Plum Yoke Kurta Set', fabric: 'Cotton', color: 'Plum', hex: '#4a1c3c', occasions: ['festive', 'everyday'], price: 2799, rating: 4.6, reviews: 37, blurb: 'A plum kurta with an embroidered yoke, gathered body and straight pants.' }),
  kurta({ n: 41, name: 'Pink Square Neck Kurta Set', fabric: 'Mul Cotton', color: 'Pink', hex: '#d06f8c', occasions: ['everyday', 'workwear'], price: 2599, rating: 4.7, reviews: 69, family: 'straight-kurta', blurb: 'The straight kurta set in pink with a square embroidered neck.' }),
  coord({ n: 42, name: 'Scarlet Mirror Peplum Co-ord', fabric: 'Cotton', color: 'Red', hex: '#b3383b', occasions: ['festive', 'weekend'], price: 2899, rating: 4.7, reviews: 50, blurb: 'A scarlet peplum top with a mirror-work waistband and straight pants.' }),
  kurta({ n: 43, name: 'Sage Slit Kurta Set', fabric: 'Mul Cotton', color: 'Sage', hex: '#a3bba5', occasions: ['everyday', 'workwear'], price: 2599, rating: 4.6, reviews: 53, family: 'straight-kurta', blurb: 'The straight kurta set in sage, with a long side slit and slim pants.' }),
  coord({ n: 44, name: 'Teal & Rust Colourblock Co-ord', fabric: 'Cotton', color: 'Teal', hex: '#5d8c8a', occasions: ['weekend', 'vacation'], price: 2599, rating: 4.5, reviews: 31, family: 'colourblock', blurb: 'The colourblock co-ord in teal and rust, with patch panels on the pants.' }),
  dress({ n: 46, name: 'Indigo Tiered Dress', fabric: 'Cotton', color: 'Blue', hex: '#3c5a94', occasions: ['vacation', 'weekend'], price: 2499, rating: 4.8, reviews: 76, bestseller: true, blurb: 'An indigo tiered midi with a button front. Made for twirling, as you can see.' }),
  coord({ n: 47, name: 'Butter Yellow Kurta Co-ord', fabric: 'Cotton Slub', color: 'Yellow', hex: '#e7cd6b', occasions: ['everyday', 'festive'], price: 2499, rating: 4.6, reviews: 42, blurb: 'A butter yellow kurta top with a tonal embroidered neck and straight pants.' }),
  coord({ n: 48, name: 'Sunny Gingham Co-ord', fabric: 'Cotton', color: 'Yellow', hex: '#e2bd4a', occasions: ['vacation', 'weekend'], price: 2299, compareAt: 2699, rating: 4.6, reviews: 55, blurb: 'A yellow gingham shirt and pants set. Breakfast-in-the-garden energy.' }),
  kurta({ n: 49, name: 'Navy Anarkali Set', fabric: 'Chanderi', color: 'Navy', hex: '#1f2b56', occasions: ['festive'], price: 3799, compareAt: 4499, rating: 4.9, reviews: 64, badge: 'Festive', bestseller: true, blurb: 'A full navy anarkali with gold buti embroidery, pants and a matching dupatta.' }),
  coord({ n: 50, name: 'Washed Denim Kurta Co-ord', fabric: 'Cotton', color: 'Blue', hex: '#4f74a3', occasions: ['everyday', 'weekend'], price: 2599, rating: 4.6, reviews: 47, blurb: 'A denim-blue kurta top with a tonal embroidered pocket and straight pants.' }),
]

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const products = raw.map(({ n, ...p }) => {
  const id = `j${String(n).padStart(2, '0')}`
  return {
    id,
    slug: slugify(p.name),
    images: [`${id}-1`, `${id}-2`],
    ...p,
  }
})

export const getProduct = (id) => products.find((p) => p.id === id)
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

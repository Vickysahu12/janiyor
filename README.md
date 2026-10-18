# Janiyor storefront (demo)

Frontend for Janiyor, a women's cotton wear label: co-ord sets, shirts and tops, dresses, kurta sets, shrugs and jackets.
Vite + React 19 + Tailwind CSS v4 + React Router 7 + motion + Lenis + Phosphor icons.
Everything works in the browser: browse, filter, product page, bag, coupons, checkout, order confirmation and order history.
There is no backend yet; data lives in `src/data` and cart / wishlist / orders are saved in localStorage.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: flickable hero deck, marquee, bestsellers, brand promise, banners, category bento, deal of the week (countdown), shop the look (hotspots), shop by mood, holiday capsule, offers, customer notes, Instagram |
| `/shop`, `/shop/:category` | Listing (co-ords, tops, dresses, kurta-sets, jackets) with filters (fabric, mood, colour, price, sale), sort, search (`?q=`, or press `/`), load more. Filters live in the URL |
| `/product/:slug` | Gallery with magnifier lens, colour siblings, sizes, gift wrap, add to bag, buy now, pincode check, details, reviews, related, recently viewed |
| `/cart` | Bag with quantity, move to wishlist, undo remove, coupons, price breakdown |
| `/checkout` | Address (validated, pincode autofill) then payment (UPI, card, net banking, COD) |
| `/order/:id` | Confirmation |
| `/wishlist`, `/account` | Saved pieces (pick size, move to bag), order history with tracking |
| `/about`, `/help` | Brand story, size guide, FAQs, contact |

Demo coupons: `SUNNY10` (10%), `HELLO15` (15%, min ₹2,499), `FLAT300` (min ₹3,999).

## Structure

```
src/
  app/            Router, root layout (Lenis smooth scroll), providers
  pages/          One file per route
  sections/home/  Home page sections, in page order
  features/       cart, checkout, product, shop (filters), search, wishlist, toast
  components/     layout (header, mega nav, mobile menu, footer, logo) and ui primitives
  services/       catalog.js, orders.js, newsletter.js. Swap these for API calls when the backend exists
  data/           products.js (49 products), content.js (page copy), media.js + tones.json (image manifest)
  config/         site.js (brand, fees, coupons, footer), navigation.js (menus)
  lib/            flyToCart.js (add-to-bag animation), lenis.js, format.js
  styles/         Tailwind entry + design tokens
public/media/products/  jNN-1 (full look) and jNN-2 (close crop), 800x1000 + -sm 400x500, all 4:5
src/assets/image/       Original client photos (not bundled). jNN matches ImgNN
```

## Logo

There is no logo yet. `src/components/layout/Logo.jsx` renders a text wordmark; replace its contents with the logo file when it arrives.

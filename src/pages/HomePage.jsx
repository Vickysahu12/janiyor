import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { HeroCampaign } from '../sections/home/HeroCampaign'
import { Marquee } from '../sections/home/Marquee'
import { Bestsellers } from '../sections/home/Bestsellers'
import { Purpose } from '../sections/home/Purpose'
import { PromoTiles } from '../sections/home/PromoTiles'
import { CategoryBento } from '../sections/home/CategoryBento'
import { DealOfWeek } from '../sections/home/DealOfWeek'
import { ShopTheLook } from '../sections/home/ShopTheLook'
import { MoodList } from '../sections/home/MoodList'
import { Capsule } from '../sections/home/Capsule'
import { OfferTickets } from '../sections/home/OfferTickets'
import { Testimonials } from '../sections/home/Testimonials'

export function HomePage() {
  useDocumentTitle()
  return (
    <>
      <HeroCampaign />
      <Marquee />
      <Bestsellers />
      <Purpose />
      <PromoTiles />
      <CategoryBento />
      <DealOfWeek />
      <ShopTheLook />
      <MoodList />
      <Capsule />
      <OfferTickets />
      <Testimonials />
    </>
  )
}

import { LandingPage } from '@/components/LandingPage'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'

export default function Home() {
  return (
    <MaxWidthWrapper>
      <LandingPage />
      <ProductReel
        query={{ sort: 'desc', limit: 4 }}
        href='/products'
        title='Algunos de nuestros productos'
      ></ProductReel>
    </MaxWidthWrapper>
  )
}

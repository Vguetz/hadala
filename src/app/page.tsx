import { LandingPage } from '@/components/LandingPage'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import Link from 'next/link'

export default function Home() {
  return (
    <MaxWidthWrapper>
      <LandingPage />
      <ProductReel
        query={{ sort: 'desc', limit: 4 }}
        href='/products'
        title='Algunos de nuestros productos'
        subtitle='Explora nuestra selección de productos más populares.'
      ></ProductReel>
    </MaxWidthWrapper>
  )
}

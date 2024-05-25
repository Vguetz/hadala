import { LandingPage } from '@/components/LandingPage'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { randomizeCategory } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
  return (
    <MaxWidthWrapper>
      <LandingPage />
      <ProductReel
        query={{ sort: 'desc', limit: 4, category: randomizeCategory() }}
        href='/products'
        title='Algunos de nuestros productos'
        subtitle='Explora nuestra selección de productos más populares'
      ></ProductReel>
      <ProductReel
        query={{ sort: 'desc', limit: 4, category: 'Mochilas' }}
        href={`products?category=Mochilas&subcategory=`}
        title='¿Te falta algo para el viaje?'
        subtitle='Descubrí nuestras mochilas '
      ></ProductReel>
    </MaxWidthWrapper>
  )
}

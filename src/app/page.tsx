import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import NavBar from '@/components/NavBar'
import ProductReel from '@/components/ProductReel'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'></div>
      <ProductReel
        query={{ sort: 'desc', limit: 4 }}
        href='/products'
        title='Lo nuevo'
      ></ProductReel>
    </MaxWidthWrapper>
  )
}

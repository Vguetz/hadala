'use client'
import ProductReel from '@/components/ProductReel'
import { useSearchParams } from 'next/navigation'

interface PageProps {
  // Props
  params: {
    id: string
  }
}

export const Page = ({ params }: PageProps) => {
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  const id = params.id
  return (
    <>
      <div className='mx-24 p-12'>
        <ProductReel title='Nuestros productos' query={{ sort: 'desc' }} />
      </div>
    </>
  )
}

export default Page

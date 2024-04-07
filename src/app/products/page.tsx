import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { Button, buttonVariants } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import Link from 'next/link'

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort)
  const categorys = parse(searchParams.category)

  let labelString: string | undefined = undefined

  if (categorys) {
    const label = PRODUCT_CATEGORIES.find(
      (category) => category.category === categorys
    )
    labelString = label ? label.category : undefined
  }

  return (
    <MaxWidthWrapper>
      {typeof labelString === 'string' ? (
        <ProductReel
          title={labelString}
          query={{
            category: labelString,
            limit: 40,
            sort: sort === 'desc' || sort === 'asc' ? sort : undefined
          }}
        />
      ) : (
        <>
          <ProductReel
            title='Encontrá lo que buscas en nuestra tienda'
            query={{
              limit: 40,
              sort: sort === 'desc' || sort === 'asc' ? sort : undefined
            }}
          />
        </>
      )}
    </MaxWidthWrapper>
  )
}

export default ProductsPage

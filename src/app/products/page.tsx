import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}
const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)
  const subcategory = parse(searchParams.subcategory)

  let categoryLabel: string | undefined = undefined
  const isSubCatDefined = subcategory && subcategory !== 'undefined'

  if (category) {
    const label = PRODUCT_CATEGORIES.find((cat) => cat.category === category)
    categoryLabel = label ? label.category : undefined
  }

  return (
    <MaxWidthWrapper>
      {/* Product */}
      <ProductReel
        title={
          categoryLabel
            ? categoryLabel + (subcategory ? ` - ${subcategory}` : '')
            : 'Encontrá lo que buscas en nuestra tienda'
        }
        query={{
          category: category || undefined,
          subcategory: isSubCatDefined ? subcategory : undefined,
          limit: 40,
          sort: sort === 'desc' || sort === 'asc' ? sort : undefined
        }}
      />
    </MaxWidthWrapper>
  )
}

export default ProductsPage

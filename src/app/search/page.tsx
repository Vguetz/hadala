'use client'

import { useRouter } from 'next/navigation'

export const Search = () => {
  const location = useRouter()

  return (
    <div>
      <h1 className='font-semibold text-center my-4 text-4xl'>
        Resultados de tu búsqueda:
      </h1>
    </div>
  )
}

export default Search

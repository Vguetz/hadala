'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [searchResults, setSearchResults] = useState<
    { id: string; name: string; images: string[]; price: number }[]
  >([])

  const { data: queryResults, isLoading } = trpc.getSearchBarProducts.useQuery({
    query: searchTerm,
    limit: 40
  })

  useEffect(() => {
    if (queryResults && queryResults.length > 0) {
      setSearchResults(
        queryResults.map((result) => ({
          id: result.id,
          name: result.name,
          images: result.images
            .map(({ image }) => (typeof image === 'string' ? image : image.url))
            .filter(Boolean) as string[],
          price: result.price
        }))
      )
    } else {
      setSearchResults([])
    }
  }, [queryResults])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const checkIfIsFirst = (index: number) => {
    return index === 0 ? 'border-b border-gray-300' : ''
  }

  return (
    <MaxWidthWrapper>
      <div>
        <div className='p-2 text-center flex mx-auto lg:w-72'>
          <Input
            type='text'
            value={searchTerm}
            onChange={handleSearch}
            placeholder='Buscar...'
          />
        </div>
        <h1 className='font-semibold text-center my-4 text-4xl'>
          Resultados de tu búsqueda:
        </h1>

        {searchTerm.length === 0 ? (
          <div className='flex my-auto mx-auto justify-center'>
            <p className='text-lg text-muted-foreground'>
              Escribe algo en el buscador...
            </p>
          </div>
        ) : isLoading ? (
          <div className='flex my-auto mx-auto justify-center'>
            <p className='text-lg text-muted-foreground'>
              Cargando tus productos
            </p>
            <Loader2 className='animate-spin ml-2' />
          </div>
        ) : searchResults.length === 0 ? (
          <div className='flex my-auto mx-auto justify-center'>
            <p className='text-lg text-muted-foreground'>
              No se encontraron resultados para {`"${searchTerm}"`}
            </p>
          </div>
        ) : (
          searchResults.map((result, index) => (
            <div
              key={result.id}
              className={cn(
                checkIfIsFirst(index),
                'flex p-2 border-b border-gray-300'
              )}
            >
              <Link className='flex' href={`/products/${result.id}`}>
                <Image
                  src={result.images[0]}
                  alt={result.name}
                  width={80}
                  height={80}
                  className='w-20 h-20 rounded-lg m-2'
                />
                <p className='my-auto text-center'>{result.name}</p>
              </Link>
              <div className='ml-auto'>
                <p className='text-muted-foreground p-2'>Precio:</p>
                <p className='p-2 mb-auto'>${result.price}</p>
              </div>
            </div>
          ))
        )}
        {searchTerm.length > 0 && (
          <div className='text-center flex justify-center p-4'>
            <p className=' text-muted-foreground ml-4'>
              ¿No encontrás lo que buscas?{' '}
              <Link
                href='/contacto'
                className='text-blue-500 hover:text-blue-700'
              >
                Contáctanos
              </Link>
            </p>
            <span className='mx-4 text-center'></span>
            <div className='flex '>
              <p className='text-muted-foreground ml-4'>
                También puedes ver todos nuestros productos
              </p>
              <Link href='/products'>
                <p className='text-blue-500 ml-2 hover:text-blue-700'>
                  Ver productos
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  )
}

export default Search

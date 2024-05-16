'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Input } from './ui/input'
import { Loader2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from './ui/separator'

const MobileSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<
    { id: string; name: string; images: string[] }[]
  >([])
  const [openSearchResults, setOpenSearchResults] = useState<boolean>(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchResultsRef = useRef<HTMLDivElement>(null)

  const { data: queryResults, isLoading } = trpc.getSearchBarProducts.useQuery({
    query: searchTerm
  })

  useEffect(() => {
    if (queryResults) {
      setSearchResults(
        queryResults.map((result) => ({
          id: result.id,
          name: result.name,
          images: result.images
            .map(({ image }) => (typeof image === 'string' ? image : image.url))
            .filter(Boolean) as string[]
        }))
      )
    } else {
      setSearchResults([])
    }
  }, [queryResults])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setOpenSearchResults(true) // Always open search results when typing
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setOpenSearchResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative  items-center hidden z-40'>
      <div>
        <Input
          ref={inputRef}
          className={cn(
            'w-full px-3 truncate h-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-out sm:text-sm',
            !openSearchResults && 'hidden'
          )}
          type='text'
          placeholder='Busca tu artículo...'
          value={searchTerm}
          onChange={handleSearch}
        />
        {openSearchResults && searchTerm.length > 0 && (
          <div
            ref={searchResultsRef}
            className='absolute bg-white shadow-lg border border-gray-50 p-4 mt-2 max-w-full rounded-md'
          >
            <div className='space-y-4'>
              <div className='text-sm text-gray-700'>
                <p className='underline'>Resultados de la búsqueda</p>
              </div>
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <Loader2 className='animate-spin' />
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div key={result.id} className='mx-auto'>
                    <Link
                      href={`/products/${result.id}`}
                      className=' space-x-2'
                    >
                      <Image
                        src={result.images[0]}
                        alt={result.name}
                        className='rounded-md'
                        width={80}
                        height={80}
                      />
                      <p className='hover:text-blue-500 hover:underline'>
                        {result.name}
                      </p>
                    </Link>
                  </div>
                ))
              ) : (
                <p className='text-sm text-gray-700'>
                  No se encontraron resultados
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileSearch

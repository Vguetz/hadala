'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import Image from 'next/image'
import { query } from 'express'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<
    { id: string; name: string }[]
  >([])
  const [openSearchResults, setOpenSearchResults] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: queryResults, isLoading } = trpc.getSearchBarProducts.useQuery({
    query: searchTerm
  })

  useEffect(() => {
    setSearchResults(queryResults || [])
  }, [queryResults])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpenSearchResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const queryImage = queryResults?.map((result) => result.image?.[0])

  return (
    <div className='p-2 flex transition-all ease-out 0.5 my-auto'>
      <div>
        <Search
          onClick={() => setOpenSearchResults(!openSearchResults)}
          className={cn(
            'cursor-pointer text-muted-foreground hover:text-gray-700 mx-2 items-center my-auto transition-all ease-out 1',
            openSearchResults && 'translate-x-0',
            !openSearchResults && 'translate-x-full'
          )}
        />
      </div>
      <div>
        <Input
          ref={inputRef}
          className={cn(
            'w-full px-3 truncate h-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-out 0.5 sm:text-sm',
            !openSearchResults && 'hidden'
          )}
          type='text'
          placeholder='Busca tu artículo...'
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className='mx-auto flex transition-all ease-out 0.5'>
          {openSearchResults && searchTerm.length > 0 && (
            <div
              className={cn(
                'bg-white shadow-lg border-b border-gray-50 absolute p-2 my-1',
                searchTerm.length > 0 ? 'block max-w-[182px]' : 'hidden'
              )}
            >
              <div className=''>
                <div className='flex flex-col p-2'>
                  <div className='text-sm text-gray-700'>
                    <p className='underline'>Resultados de la búsqueda</p>
                  </div>
                  <div className='flex flex-col'>
                    {/* Mostrar los resultados de búsqueda */}
                    {searchResults.map((result, index) => (
                      <Link href={`/products/${result.id}`} key={index}>
                        <p className='hover:text-blue-500 hover:underline'>
                          {result.name}
                        </p>
                      </Link>
                    ))}
                    {queryResults?.length === 0 && (
                      <p className='text-sm text-gray-700'>
                        No se encontraron resultados
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar

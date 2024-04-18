'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation'
import Link from 'next/link'

interface SearchResultsProps {
  searchTerm: string
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openSearchResults, setOpenSearchResults] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    if (openSearchResults && inputRef.current) {
      inputRef.current.focus()
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenSearchResults(false)
      }
    }

    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [openSearchResults])

  useEffect(() => {
    if (openSearchResults) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openSearchResults])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    handleSearchResults(event.target.value)
  }

  const handleSearchResults = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('query', searchTerm)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
    redirect(`/search/${searchTerm}`)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setOpenSearchResults(false)
    }
  }

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
                    <Link
                      href={`/search/${searchTerm}`}
                      className='flex flex-col'
                    >
                      {searchTerm}
                    </Link>
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

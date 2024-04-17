'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import SearchResults from './SearchResults'

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openSearchResults, setOpenSearchResults] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    // Perform search logic here
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setOpenSearchResults(false)
    }
  }

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
          {openSearchResults && (
            <SearchResults
              searchTerm={searchTerm}
              openSearchResults={openSearchResults}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar

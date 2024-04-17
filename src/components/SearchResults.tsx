'use client'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface SearchResultsProps {
  searchTerm: string
  openSearchResults: boolean
}

const SearchResults = ({
  searchTerm,
  openSearchResults
}: SearchResultsProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  async function handleSearchResults(searchTerm: string) {
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('query', searchTerm)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div
      className={cn(
        'bg-white shadow-lg border-b border-gray-50 absolute p-2 my-1',
        searchTerm.length > 0 ? 'block' : 'hidden'
      )}
    >
      <div className=''>
        {openSearchResults && searchTerm.length > 0 ? (
          <p className='text-slate-700'>{searchTerm}</p>
        ) : null}
      </div>
    </div>
  )
}
export default SearchResults

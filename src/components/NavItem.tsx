'use client'
import { PRODUCT_CATEGORIES } from '@/config'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Category = (typeof PRODUCT_CATEGORIES)[number]

interface NavItemProps {
  category: Category
  handleOpen: () => void
  isOpen: boolean
  isAnyOpen: boolean
}

const NavItem = ({ isAnyOpen, category, handleOpen, isOpen }: NavItemProps) => {
  return (
    <div className='flex '>
      <div className='relative flex items-center'>
        <Button
          variant={isOpen ? 'secondary' : 'ghost'}
          onClick={handleOpen}
          className='gap-1.5'
        >
          <p className='ml-2 text-lg font-light'>{category.category}</p>
          <ChevronDown
            className={cn('h-5 w-5  transition-all text-muted-foreground', {
              '-rotate-180': isOpen
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            'absolute inset-x-0 top-full text-sm text-muted-foreground',
            {
              'animate-in fade-in-10 slide-in-from-top-5': !isAnyOpen
            }
          )}
        >
          <div
            className='absolute inset-0 top-1/2 bg-white shadow'
            aria-hidden='true'
          />
          <div className='relative bg-white'>
            <div className='mx-auto px-8 '>
              <div className='grid grid-cols-4 gap-x-8 gap-y-10 py-16'>
                <div className='col-span-4 col-start-1 grid '>
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className='relative text-base sm:text-sm'
                    >
                      <div className='relative overflow-hidden rounded-lg m-2 max-w-44 bg-gray-100 group-hover:opacity-75'>
                        <p className='p-2 text-center text-base hover:text-lg font-[600] hover:bg-gray-300 transition-all ease-out 0.3 hover:cursor-pointer'>
                          <Link href={item.href}>{item.name}</Link>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default NavItem

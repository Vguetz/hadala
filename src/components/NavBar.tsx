import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'

import { buttonVariants } from './ui/button'
import Cart from './Cart'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import ItemsNav from './ItemsNav'
import SearchBar from './SearchBar'

const Navbar = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <MobileNav />

              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <Icons.logo className='lg:w-48 w-24 lg:mx-auto p-0 lg:items-center transition-all hover:scale-110' />
                </Link>
              </div>

              <div className='hidden md:grid z-50 lg:ml-8 lg:block lg:self-stretch lg:my-auto items-center justify-center'>
                <ItemsNav />
              </div>

              <div className='ml-auto flex items-center'>
                <div className='mr-8 hidden md:flex'>
                  <SearchBar />
                </div>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <div className='ml-4 flow-root lg:ml-6'>
                    <Cart />
                  </div>
                </div>
              </div>
              <div className='lg:hidden'>
                <Cart />
              </div>
              <div className=''></div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar

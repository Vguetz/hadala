import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { Icons } from './Icons'
import NavItems from './NavItems'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'

import Cart from './Cart'
import { useSearchParams } from 'next/navigation'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from './UserAccountNav'

interface NavBarProps {
  // props
}

const NavBar: FC<NavBarProps> = async ({}) => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0'>
      <MaxWidthWrapper>
        <header className='relative bg-white'>
          <div className='border-b border-gray-200 flex items-center pb-2'>
            {/* Enlace de Inicio */}
            <Link
              className='flex ml-6 font-light text-lg transition-all ease-in hover:border-b border-black p-2'
              href='/'
            >
              Inicio
            </Link>

            {/* Componente NavItems */}
            <NavItems />

            {/* Centro del espacio (icono centrado) */}
            <div className='block text-center justify-center ml-auto mr-auto  transition-all ease-in'>
              <Link href='/'>
                <Icons.logo className='h-auto w-48 ml-24 hover:scale-110 transition-all basis-auto ease-out 0.3' />
              </Link>
            </div>
            <div className='ml-auto mr-4  flex items-center'>
              <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                {user ? null : (
                  <Link
                    href='/sign-in'
                    className={buttonVariants({ variant: 'ghost' })}
                  >
                    <p className='text-lg font-light'>Iniciar sesion</p>
                  </Link>
                )}
                {user ? null : (
                  <span
                    className='h-6 w-px bg-gray-200'
                    aria-hidden='true'
                  ></span>
                )}
                {user ? (
                  <UserAccountNav user={user} />
                ) : (
                  <Link
                    href='/sign-up'
                    className={buttonVariants({ variant: 'ghost' })}
                  >
                    <p className='text-lg font-light'>Registrarse</p>
                  </Link>
                )}
                {user ? (
                  <span
                    className='h-6 w-px bg-gray-200'
                    aria-hidden='true'
                  ></span>
                ) : null}
                {user ? null : (
                  <div className='flex lg:ml-6'>
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    ></span>
                  </div>
                )}
                <div className='ml-4 flow-root lg:ml-6'>
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </header>
      </MaxWidthWrapper>
    </div>
  )
}

export default NavBar

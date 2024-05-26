'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NavigationMenu, NavigationMenuList } from './ui/navigation-menu'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion'
import SearchBar from './SearchBar'
import MobileSearch from './MobileSearch'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  if (!isOpen)
    return (
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
      >
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>
    )

  const SubMenuItem = ({
    title,
    className
  }: {
    title: string
    className: string
  }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <div
        className='relative'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={`absolute bottom-0 left-1/2 w-full h-0.5 bg-slate-500 transition-all duration-200 transform -translate-x-1/2 scale-x-0 ${isHovered ? 'scale-x-100' : ''}`}
        ></span>
        {title}
      </div>
    )
  }
  const SubMenu = ({
    title,
    items,
    className
  }: {
    title: string
    items: string[]
    className: string
  }) => {
    return (
      <Accordion type='single' collapsible>
        <AccordionItem value={title}>
          <AccordionTrigger>{title}</AccordionTrigger>

          {items.map((item, index) => (
            <Link
              href={
                item.startsWith('Ver ')
                  ? `/products?category=${title}&subcategory=${' '}`
                  : `/products?category=${title}&subcategory=${item.replace(' ', '+')}`
              }
              key={index}
            >
              <AccordionContent className={className} key={index}>
                <SubMenuItem title={item} className={className} />
              </AccordionContent>
            </Link>
          ))}
        </AccordionItem>
      </Accordion>
    )
  }
  const subLinks = {
    Bandoleras: ['Ver Bandoleras'],
    Billeteras: ['Merlina', 'Titana', 'Ver Todas'],
    Bolsos: ['Benito', 'Liso', 'Alma', 'Blanca', 'Ver Todos'],
    Carteras: ['Chicas', 'Grandes', 'Leica', 'Milay', 'Ver Todas'],
    Materas: ['Ver Materas'],
    Mochilas: ['Canguro', 'Con tapa', 'Venusina', 'Ver Todo'],
    Monederos: ['Ver Monederos'],
    Morrales: ['Ver Morrales'],
    Riñoneras: ['Aine', 'Clarck', 'Clásica', 'Liana', 'Triana', 'Ver Todas'],
    'Phone Bags': ['Ver Phone Bags'] // Updated key to include space
  }

  return (
    <div className='w-full'>
      <div className='relative z-10 lg:hidden'>
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </div>

      <div className='fixed overflow-y-scroll overscroll-y-none transition ease-in delay-100 inset-0 z-40 flex'>
        <div className='w-4/5'>
          <div className='relative flex w-full max-w-sm h-full flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
            <div className='flex px-4 pb-2 pt-5'>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
              >
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-2'>
              <Accordion type='multiple' className='p-2 m-2'>
                <AccordionItem value='mochilas'>
                  <AccordionTrigger className='text-center mx-auto justify-center'>
                    <p className='m-2'>Productos</p>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.entries(subLinks).map(([title, items]) => (
                      <SubMenu
                        className='text-center font-light text-sm text-slate-900'
                        key={title}
                        title={title}
                        items={items}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className='flex ml-16'>
              <MobileSearch />
            </div>
            {/* Iniciar sesion va a estar disponible mas adelante */}
            {/* <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
              <div className='flow-root'>
                  <Link
                    onClick={() => closeOnCurrent('/sign-in')}
                    href='/sign-in'
                    className='-m-2 block p-2 font-medium text-gray-900'
                  >
                    Iniciar Sesión
                  </Link>
                </div>
                <div className='flow-root'>
                  <Link
                    onClick={() => closeOnCurrent('/sign-up')}
                    href='/sign-up'
                    className='-m-2 block p-2 font-medium text-gray-900'
                  >
                    Registrarse
                  </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav

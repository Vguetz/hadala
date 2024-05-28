'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from './ui/navigation-menu'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion'
import Link from 'next/link'
import React, { useState } from 'react'

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
                : `/products?category=${title}&subcategory=${item}`
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

const ItemsNav = () => {
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
    <div>
      <NavigationMenu className='lg:flex grid'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='text-lg font-light'>
              Productos
            </NavigationMenuTrigger>
            <NavigationMenuContent className=' grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              {Object.entries(subLinks).map(([title, items]) => (
                <SubMenu
                  className='text-center font-light text-sm text-slate-900'
                  key={title}
                  title={title}
                  items={items}
                />
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default ItemsNav

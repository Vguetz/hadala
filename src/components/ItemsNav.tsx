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

const SubMenu = ({ title, items }: { title: string; items: string[] }) => {
  const spanClass =
    'absolute bottom-0 left-0 w-full h-0.5 bg-slate-500 transition-all duration-200 transform scale-x-0 group-hover:scale-x-100'

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <span className={spanClass}></span>
        {items.map((item, index) => (
          <AccordionContent key={index}>{item}</AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  )
}

const ItemsNav = () => {
  const subLinks = {
    Mochilas: ['Diseños Únicos', 'Diseños Lisos'],
    Billeteras: ['Diseños Únicos', 'Diseños Lisos'],
    Bolsos: ['Diseños Únicos', 'Diseños Lisos'],
    Monederos: ['Diseños Únicos', 'Diseños Lisos']
  }

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='text-lg font-light'>
              Productos
            </NavigationMenuTrigger>
            <NavigationMenuContent className='flex-col p-6'>
              {Object.entries(subLinks).map(([title, items]) => (
                <SubMenu key={title} title={title} items={items} />
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default ItemsNav

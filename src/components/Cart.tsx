'use client'
import { ShoppingCartIcon, Truck } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet'
import { Separator } from './ui/separator'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
import { useCart } from '@/hooks/use-cart'
import { ScrollArea } from './ui/scroll-area'
import CartItem from './CartItem'
import { useEffect, useState } from 'react'
import { Progress } from './ui/progress'

const Cart = () => {
  const { items } = useCart()
  const itemCount = items.length

  const [cartTotals, setCartTotal] = useState<number>(0)
  const [progressPercentage, setProgressPercentage] = useState<number>(0)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  )

  const cartTotalToNumber = cartTotal

  useEffect(() => {
    setIsMounted(true)

    // Calcular el total del carrito
    const total = items.reduce((acc, { product }) => acc + product.price, 0)
    setCartTotal(total)

    // Calcular el porcentaje de progreso
    const percentage = (total / 3000) * 100
    setProgressPercentage(percentage)
  }, [items])
  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCartIcon
          aria-hidden='true'
          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
        />
        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Carrito ({itemCount})</SheetTitle>
        </SheetHeader>
        {/* Cart Free Shipping (NOT USED YET) */}
        {/* {cartTotal < 3000 ? (
          <>
            <div className='border-gray-700 border p-4 m-4'>
              <h3 className='text-sm font-semibold text-gray-700 flex'>
                <Truck className='flex w-12' />
                Envío gratis en ordenes +$3000
              </h3>
              <Progress
                indicatorColor='bg-blue-500'
                className=' my-2'
                value={progressPercentage}
              />
              <p>
                ¡Te faltan ${3000 - cartTotal} para llegar a el envio GRATIS!
              </p>
            </div>
          </>
        ) : (
          <>
            <div className='border-gray-700 border p-4 m-4'>
              <h3 className='text-sm font-semibold text-gray-700 flex'>
                <Truck className='flex w-12 text-muted-foreground' />
                Envío gratis en ordenes +$3000
              </h3>
              <Progress
                indicatorColor='bg-blue-500'
                className='my-2'
                value={100}
              />
              <p>¡Felicidades! ¡Tu envío es GRATIS!</p>
            </div>
          </>
        )} */}
        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
            </div>
            <div className='space-y-4 pr-6'>
              <Separator />
              <div className='space-y-1.5 text-sm'>
                <div className='flex'>
                  <span className='flex-1'>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                {/* <div className="flex">
                  <span className="flex-1">IVA</span>
                  <span>{formatPrice(cartTotal * 0.21)}</span>
                </div> */}
                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({ className: 'w-full' })}
                  >
                    Ver Carrito
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div
              aria-hidden='true'
              className='relative mb-4 h-60 w-60 text-muted-foreground'
            >
              <Image src='/emptycart.png' fill alt='Carrito vacio' />
            </div>
            <div className='text-xl font-semibold'>Tu carrito está vacío</div>
            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'text-sm text-muted-foreground text-blue-500'
                })}
              >
                Añade elementos a tu carrito para finalizar tu compra.
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart

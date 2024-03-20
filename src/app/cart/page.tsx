'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { initMercadoPago } from '@mercadopago/sdk-react'
import { Loader2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import useEmail from '@/hooks/use-email'

require('dotenv').config()

const Page = () => {
  const { items, removeItem } = useCart()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true)
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  )
  // const [email, setEmail] = useState<string>('')
  const [email, setEmail] = useEmail()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    // Verificar si el email es válido
    setIsValidEmail(/^\S+@\S+\.\S+$/.test(event.target.value.trim()))
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const publicKey = process.env.NEXT_PUBLIC_MERCADO_PK!

  useEffect(() => {
    initMercadoPago(publicKey, {
      locale: 'es-UY'
    })
  })

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='flex items-center align-middle'>
          <h1 className='text-xl mb-2 font-bold text-gray-900 sm:text-4xl'>
            Carrito
          </h1>
        </div>
        <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-16'>
          <div
            className={cn('lg:col-span-7', {
              'rounded-lg border-2 border-dashed border-zinc-200 p-12':
                isMounted && items.length === 0
            })}
          >
            <h2 className='sr-only'>Productos en tu carrito</h2>
            {isMounted && items.length === 0 ? (
              <div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div
                  aria-hidden='true'
                  className='relative mb-4 h-40 w-40 text-muted-foreground'
                >
                  <Image
                    src='/emptycart.png'
                    fill
                    loading='eager'
                    alt='carrito vacio'
                  />
                </div>
                <h3 className='font-semibold text-2xl'>
                  Tu carrito está vacío
                </h3>
                <p className='text-muted-foreground text-center'>
                  ¡Agrega productos para continuar!
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                'divide-y divide-gray-200 border-b border-t border-gray-200':
                  isMounted && items.length > 0
              })}
            >
              {isMounted &&
                items.map(({ product }) => {
                  const category = PRODUCT_CATEGORIES.flatMap(({ featured }) =>
                    featured.map(({ category }) => category)
                  ).find((label) => label === product.category)

                  const { image } = product.images[0]
                  return (
                    <li key={product.id} className='flex py-6 sm:py-10'>
                      <div className='flex-shrink-0'>
                        <div className='relative h-24 w-24'>
                          {typeof image !== 'string' && image.url ? (
                            <Image
                              fill
                              src={image.url}
                              alt='product image'
                              className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                            />
                          ) : null}
                        </div>
                      </div>
                      <div className='ml-4 flex flex-col flex-1 justify-between sm:ml-6'>
                        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                          <div>
                            <div className='flex justify-between'>
                              <h3 className='text-sm'>
                                <Link
                                  href={`/products/${product.id}`}
                                  className='font-medium text-gray-700 hover:text-gray-800'
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <div className='mt-1 flex text-sm'>
                              <p className='text-muted-foreground'>
                                Categoria: {category}
                              </p>
                            </div>
                            <p className='mt-1 text-sm font-medium text-gray-900'>
                              {formatPrice(product.price)}
                            </p>
                          </div>
                          <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                            <div></div>
                            <div className='absolute right-0 top-0'>
                              <Button
                                onClick={() => removeItem(product.id)}
                                variant='ghost'
                                aria-label='Remover producto del carrito'
                              >
                                <X className='h-5 w-5' aria-hidden='true' />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
          <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>
              Resumen del pedido
            </h2>
            <div className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>Subtotal</p>
                <p className='text-sm font-medium text-gray-900'>
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
                  )}
                </p>
              </div>
              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span>Envio:</span>
                </div>
                <div className='text-sm font-medium text-gray-900'>
                  A calcular
                </div>
              </div>
              <div className='flex items-center justify-between border-t border-gray-200'>
                <div className='text-base font-medium flex gap-2  text-gray-900'>
                  Total:{' '}
                  {isMounted || items.length > 0 ? (
                    <div className='flex'>{formatPrice(cartTotal)}</div>
                  ) : (
                    <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
                  )}
                </div>

                <div className='text-base font-medium text-gray-900'>
                  <div className='p-2 m-2 text-center'>
                    <p className='m-2 p-2 text-center'>Tu email</p>
                    <Input
                      id='email'
                      placeholder='Ingresa tu email'
                      value={email}
                      onChange={handleEmailChange}
                      required
                      type='email'
                    />
                    {!isValidEmail && (
                      <p className='text-red-500 text-xs mt-1 animate-pulse'>
                        Por favor, ingresa un email válido.
                      </p>
                    )}
                  </div>

                  {isMounted || items.length > 0 || email != '' ? (
                    <form>
                      <Input
                        value={formatPrice(cartTotal)}
                        name='total'
                        disabled
                        className='justify-end text-end hidden text-lg font-medium text-gray-900 bg-transparent border-none w-full cursor-not-allowed opacity-100'
                      ></Input>
                      <Link
                        href={isValidEmail ? '/checkout' : '#'}
                        className={cn(
                          buttonVariants({
                            variant: 'default',
                            className: 'w-full mt-4'
                          }),
                          'transition-colors duration-300',
                          {
                            'pointer-events-none opacity-50': !isValidEmail
                          }
                        )}
                      >
                        Finalizar Compra
                      </Link>
                    </form>
                  ) : (
                    <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
                  )}
                </div>
              </div>
            </div>
            <div className='mt-6'></div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Page

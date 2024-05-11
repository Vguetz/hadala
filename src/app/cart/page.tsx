'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { Loader2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import useEmail from '@/hooks/use-email'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/Icons'
import usePhone from '@/hooks/use-phone'
import { trpc } from '@/trpc/client'

require('dotenv').config()

interface ClientInfo {
  transferId: string
  email: string
  cartTotal: number
}

const Page = () => {
  const randomIdGenerator = () => {
    const minDigits = 10
    const min = Math.pow(10, minDigits - 1)
    const max = Math.pow(10, minDigits) - 1
    return Math.floor(Math.random() * (max - min + 1) + min).toString()
  }
  const [props, setProps] = useState<ClientInfo>({
    transferId: randomIdGenerator(),
    email: '',
    cartTotal: 0
  })
  useEffect(() => {
    // Retrieve data from localStorage and update props
    const storedProps = {
      transferId: randomIdGenerator(),
      email: localStorage.getItem('email') || '',
      cartTotal: parseFloat(localStorage.getItem('cartTotal') || '0')
    }
    setProps({
      ...storedProps
    })
  }, [])

  const { items, removeItem } = useCart()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [radioGroupValue, setRadioGroupValue] = useState<string>('')

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  )

  const [email, setEmail] = useEmail()
  useEffect(() => {
    let storageEmail
    // Get the value from local storage if it exists
    storageEmail = localStorage.getItem('email') || ''
    setEmail(storageEmail)
  }, [email])
  const [phone, isValidPhone, handlePhoneChange] = usePhone()
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    // Verificar si el email es válido
    setIsValidEmail(/^\S+@\S+\.\S+$/.test(event.target.value.trim()))
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleDireccionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(event.target.value)
  }

  const selectPaymentMethod = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMercadoPago(true)
    const value = event.currentTarget.value
    if (value === 'mercadopago' || value === '') {
      setMercadoPago(true)
      setRadioGroupValue('mercadopago')
    } else if (value === 'transferencia') {
      setMercadoPago(false)
      setRadioGroupValue('transferencia')
    } else {
      setMercadoPago(true)
    }
    return setMercadoPago
  }

  const [mercadoPago, setMercadoPago] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (email != '') {
      localStorage.setItem('email', email)
    }
  }, [email])
  useEffect(() => {
    localStorage.setItem('phone', phone)
    localStorage.setItem('name', name)
    localStorage.setItem('direccion', address)
  }, [name, phone, address])

  const { mutate: transferDataSubmit } = trpc.saveClientInfo.useMutation({
    onSuccess: () => {
      localStorage.setItem('transferData', JSON.stringify(props))
      console.log('Transferencia exitosa')
      window.location.href = `/transferencia/${props.transferId}`
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const onSubmit = () => {
    transferDataSubmit(props)
  }

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
            {isMounted && items.length > 0 ? (
              <div>
                <h2 className='text-2xl'>Detalles de facturación</h2>
                <div className='my-4 h-full justify-start'>
                  <div>
                    <Label>
                      Nombre
                      <Input
                        id='name'
                        type='text'
                        placeholder='Ingresa tu nombre'
                        onChange={handleNameChange}
                        className='w-full p-2 m-2  border-2 border-gray-200 rounded-md'
                        required
                      />
                    </Label>

                    <Label>
                      Email
                      <Input
                        id='email'
                        placeholder='Ingresa tu email'
                        className='truncate w-full p-2 m-2  border-2 border-gray-200 rounded-md'
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
                    </Label>
                    <Label>
                      Teléfono
                      <Input
                        id='phone'
                        placeholder='Ingresa tu telefono'
                        className='w-full p-2 m-2  border-2 border-gray-200 rounded-md'
                        type='tel'
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                      />
                      {!isValidPhone && (
                        <p className='text-red-500 text-xs mt-1 animate-pulse'>
                          Por favor, ingresa un teléfono válido de 9 dígitos.
                        </p>
                      )}
                    </Label>

                    <Label>
                      Dirección
                      <Input
                        id='address'
                        type='text'
                        placeholder='Ingresa tu direccion'
                        onChange={handleDireccionChange}
                        className='w-full p-2 m-2  border-2 border-gray-200 rounded-md'
                        required
                      />
                    </Label>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>
              Resumen del pedido
            </h2>
            <ul
              className={cn({
                'divide-y divide-gray-200 border-b border-t border-gray-200':
                  isMounted && items.length > 0
              })}
            >
              {isMounted &&
                items.map(({ product }) => {
                  const category = PRODUCT_CATEGORIES.map((category) => {
                    if (category.name === product.category) {
                      return category.name
                    }
                  })

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
                                variant='ghost'
                                aria-label='Remover producto del carrito'
                              >
                                <X
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                  onClick={removeItem.bind(this, product.id)}
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
            </ul>
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
                <div className='text-base font-medium flex gap-2 p-4  text-gray-900'>
                  Total:{' '}
                  {isMounted || items.length > 0 ? (
                    <div className='flex'>{formatPrice(cartTotal)}</div>
                  ) : (
                    <Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
                  )}
                </div>

                <div className='text-base font-medium text-gray-900'>
                  <div className='p-2 m-2 text-center'></div>

                  {isMounted || items.length > 0 || email != '' ? (
                    <form>
                      <div className='transition-all ease-out'>
                        <p className='md:flex'>Forma de pago:</p>
                        <div className='mt-2 space-x-4'>
                          <RadioGroup defaultValue=''>
                            <div className='flex items-center space-x-2'>
                              <Icons.mercadoPagoIcon className='h-8 w-8' />
                              <RadioGroupItem
                                value='mercadopago'
                                id='r1'
                                onClick={selectPaymentMethod}
                              />
                              <Label htmlFor='r1'>Mercado Pago</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <Icons.transferenciaIcon className='h-8 w-8' />
                              <RadioGroupItem
                                value='transferencia'
                                onClick={selectPaymentMethod}
                                id='r2'
                              />
                              <Label htmlFor='r2'>Transferencia Bancaria</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      <Input
                        value={formatPrice(cartTotal)}
                        name='total'
                        disabled
                        className='hidden text-lg font-medium px-4 text-gray-900 bg-transparent border-none w-full cursor-not-allowed opacity-100'
                      ></Input>
                      <div>
                        {mercadoPago === true ? (
                          <Link
                            href={'/checkout'}
                            className={cn(
                              buttonVariants({
                                variant: 'default',
                                className: 'w-full mt-4'
                              }),
                              'transition-colors duration-300',
                              {
                                'pointer-events-none opacity-50':
                                  !isValidEmail ||
                                  !isValidPhone ||
                                  !radioGroupValue
                              }
                            )}
                          >
                            Finalizar Compra
                          </Link>
                        ) : (
                          <Button
                            type='button'
                            onClick={onSubmit}
                            className={cn(
                              buttonVariants({
                                variant: 'default',
                                className: 'w-full mt-4'
                              }),
                              'transition-colors duration-300',
                              {
                                'pointer-events-none opacity-50':
                                  !isValidEmail ||
                                  !isValidPhone ||
                                  !radioGroupValue
                              }
                            )}
                          >
                            Realizar Transferencia
                          </Button>
                        )}
                      </div>
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

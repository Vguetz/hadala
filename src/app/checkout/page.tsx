'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/hooks/use-cart'
import useEmail from '@/hooks/use-email'
import { getLocalStorage } from '@/lib/utils'
import { payMercadoPago } from '@/trpc/payment-router'
import { Loader2 } from 'lucide-react'
import { use, useEffect, useState } from 'react'

const Page = () => {
  const randomId = () => Math.random().toString(36).substring(2, 10)

  const { items } = useCart()
  const [itemCount, setItemCount] = useState(items.length)
  if (items.length === 0) setItemCount(1)
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  )

  const itemName = items.map((item) => item.product.name).join(', ')

  const itemId = items.map((item) => item.product.id).join(', ')

  const [email, setEmail] = useEmail()
  useEffect(() => {
    if (items.length === 0) {
      window.location.href = '/'
    }
  }, [items])

  //TODO :  get name , phone and direccion from localStorage
  //get name , phone and direccion from localStorage
  const name = getLocalStorage('name')
  const phone = getLocalStorage('phone')
  const direccion = getLocalStorage('direccion')

  return (
    <form className='flex justify-center items-center'>
      <Loader2 className='h-12 animate-spin flex items-center justify-center w-12 ' />
      <h1 className='font-bold text-muted-foreground text-center justify-center items-center'>
        Espera mientras te redireccionamos a Mercado Pago
      </h1>
      <Input
        type='hidden'
        name='items'
        value={itemId}
        className='hidden items-center text-center max-w-24'
      ></Input>
      <Input
        value={cartTotal}
        name='total'
        disabled
        className='hidden items-center text-center max-w-24'
      ></Input>
      <Input
        type='hidden'
        name='total'
        value={itemName}
        className='hidden items-center text-center max-w-24'
      ></Input>
      <Input
        type='hidden'
        name='total'
        value={itemCount}
        className='hidden items-center text-center max-w-24'
      ></Input>
      <Input
        name='total'
        value={randomId()}
        className=' hidden items-center text-center'
      ></Input>
      <Input
        id='email'
        placeholder='Ingresa tu email'
        hidden
        className='hidden'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input id='name' hidden className='hidden' value={name!} />
      <Input id='phone' hidden className='hidden' value={phone!} />
      <Input id='direccion' hidden className='hidden' value={direccion!} />
      <div className='hidden flex-col gap-2 p-4'>
        <Button
          type='submit'
          //@ts-ignore
          onClick={payMercadoPago(
            cartTotal,
            itemName,
            itemCount,
            email,
            randomId(),
            name!,
            phone!,
            direccion!
          )}
          className='w-full mt-4'
          variant='default'
        >
          Finalizar Compra
        </Button>
      </div>
    </form>
  )
}

export default Page

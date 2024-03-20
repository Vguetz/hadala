import PaymentStatus from '@/components/PaymentStatus'
import { buttonVariants } from '@/components/ui/button'
import { getPayloadClient } from '@/get-payload'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    orderId: string
  }
}

export const Page = async ({ params }: PageProps) => {
  const payload = await getPayloadClient()
  const { orderId } = params

  const { docs: orders } = await payload.find({
    collection: 'Pagos',
    limit: 1,
    where: {
      orderId: {
        equals: orderId
      },
      productoPagado: {
        equals: true
      }
    }
  })

  const [order] = orders
  if (!order) return notFound()

  const orderDetails = [
    { label: 'Producto:', value: order.producto },
    { label: 'Comprador:', value: order.user },
    { label: 'Total:', value: `$${order.dinero}`, isBold: true }
  ]

  return (
    <main className='relative lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
        <Image
          fill
          src='/checkout-thank-you.jpg'
          className='h-full w-full object-cover object-center'
          alt='Gracias por tu compra'
        />
      </div>
      <div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24'>
          <div className='lg:col-start-2'>
            <p className='text-sm font-medium'>Orden completa.</p>
            <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              ¡Gracias por comprar en Hadalá!
            </h1>

            {order.productoPagado ? (
              <p className='mt-2 text-base text-muted-foreground'>
                Tu órden se ha procesado. Desde Hadalá, nos comunicaremos
                contigo para coordinar el envío. Hemos enviado un correo a{' '}
                <span className='font-medium text-gray-900'>
                  {' '}
                  {order.user}{' '}
                </span>
                con los detalles de la compra. Si tienes alguna duda, no dudes
                en contactarnos.
              </p>
            ) : (
              <p className='mt-2 text-base text-muted-foreground'>
                <Loader2 className='animate-spin text-muted-foreground' />
                Tu orden está siendo procesada. Por favor, espera. Si tienes
                alguna duda, no dudes en contactarnos.
              </p>
            )}

            <div className='mt-16 text-sm font-medium'>
              <div className='text-muted-foreground'>Código de tu órden:</div>
              <div className='mt-2 text-gray-900'>{order.orderId}</div>
              <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                {orderDetails.map((detail, index) => (
                  <li key={index}>
                    <span className='flex justify-between py-3'>
                      <span>{detail.label}</span>
                      <span
                        className={
                          detail.isBold ? 'font-bold text-black  ' : ''
                        }
                      >
                        {detail.value!}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <PaymentStatus
                isPaid={order.productoPagado}
                orderEmail={order.user!}
                orderId={order.id}
              />

              <div className='mt-16 border-t border-gray-200 py-6 text-right'>
                <Link
                  href='/products'
                  className='text-sm font-medium text-blue-600 hover:text-blue-500'
                >
                  Continúar comprando &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page

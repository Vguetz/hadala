import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getPayloadClient } from '@/get-payload'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    transferId: string
  }
}

const TransferPage = async ({ params }: PageProps) => {
  const { transferId } = params
  const payload = await getPayloadClient()
  const { docs: orders } = await payload.find({
    collection: 'Transferencias_Hadala',
    limit: 1,
    where: {
      transferId: {
        equals: transferId
      }
    }
  })

  const [order] = orders
  const total = order.cartTotal
  const discount = total * 0.1
  const cartDiscount = total - discount

  if (!order || !orders) return notFound()

  return (
    <>
      <MaxWidthWrapper>
        <div className='border-green-600 border-2  items-center p-2 my-4 mx-auto max-w-lg text-center'>
          <h1 className='text-2xl font-extralight p-12 '>
            Gracias {order.name}. Tu pedido ha sido recibido.
          </h1>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          <div>
            <p className='font-light'>Numero del pedido</p>
            <span className='font-semibold'>{order.transferId}</span>
          </div>
          <div>
            <p className='font-light'>Total del pedido</p>
            <span className='font-semibold'>${cartDiscount}</span>
          </div>
          <div>
            <p className='font-light'>Estado del pedido</p>
            <span className=''>
              {order.isTransfered ? (
                <span className='text-green-600 font-semibold'>Completado</span>
              ) : (
                <span className='text-orange-600 font-semibold'>Pendiente</span>
              )}
            </span>
          </div>
          <div>
            <p className='font-light'>Metodo de Pago</p>
            <span className='font-semibold'>Transferencia Bancaria</span>
          </div>
        </div>
        <div className='my-6'>
          <p className='text-muted-foreground'>
            Es imprescindible enviar el comprobante de pago junto con el número
            de pedido a nuestro WhatsApp{' '}
            <span className='font-semibold'>094 418 546</span> para su
            verificación y posterior envío. El pedido no será enviado si el pago
            no se ha verificado
          </p>
        </div>

        <div className='my-6  '>
          <h1>Detalles Bancarios</h1>
          <ol>
            <li className='font-light'>
              Banco <span className='font-bold'>BROU</span>
            </li>
            <li className='font-light'>Caja de Ahorro en Pesos</li>
            <li className='font-light'>Cuenta N° 11045552600001</li>
            <li className='font-light'>Nombre: Dayhana Rivas</li>
          </ol>
        </div>
        <div>
          <p className='text-muted-foreground'>
            En caso de querer saber el estado de tu pedido, puedes entrar a este
            mismo enlace y ver si el estado a cambiado a {'“Aceptado”'} o
            consultarnos a nuestro Whatsapp
          </p>
          {/* <div className='border'>
            <h2 className='flex items-center text-center justify-center'>
              Tu orden:
            </h2>
            <div className='flex flex-col items-center text-center justify-center gap-2'>
              {order.items.map((item, index) => (
                <p key={index}>
                  ID del producto {index }: {item.item}
                </p>
              ))}
              {order.cartTotal && (
                <p>
                  Total:{' '}
                  <span className='font-semibold'>${order.cartTotal}</span>
                </p>
              )}
            </div>
          </div> */}
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default TransferPage

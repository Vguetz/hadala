import { getPayloadClient } from '@/get-payload'

interface PageProps {
  params: {
    transferId: string
  }
}

const TransferPage = async ({ params }: PageProps) => {
  const { transferId } = params
  const payload = await getPayloadClient()
  const { docs: order } = await payload.find({
    collection: 'Pagos',
    limit: 1,
    where: {
      transferId: {
        equals: transferId
      },
      productoPagado: {
        equals: false
      }
    }
  })

  return (
    <>
      <div className='border-green-600 border-2  items-center p-2 my-4 mx-auto max-w-lg text-center'>
        <h1 className='text-2xl font-extralight p-12 '>
          Gracias. Tu pedido ha sido recibido.
        </h1>
      </div>
    </>
  )
}

export default TransferPage

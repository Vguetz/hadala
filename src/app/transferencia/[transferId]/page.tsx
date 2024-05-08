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

  // if(!orderData) return notFound()

  return (
    <>
      <MaxWidthWrapper>
        <div className='border-green-600 border-2  items-center p-2 my-4 mx-auto max-w-lg text-center'>
          <h1 className='text-2xl font-extralight p-12 '>
            Gracias. Tu pedido ha sido recibido.
          </h1>
        </div>
        <h2>Tu orden numero </h2>
      </MaxWidthWrapper>
    </>
  )
}

export default TransferPage

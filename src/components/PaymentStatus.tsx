'use client'

import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

export const PaymentStatus = ({
  orderEmail,
  orderId,
  isPaid
}: PaymentStatusProps) => {
  const router = useRouter()
  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.productoPagado ? false : 1000)
    }
  )
  useEffect(() => {
    if (data?.productoPagado) {
      router.refresh()
    }
  }, [data?.productoPagado, router])
  return (
    <div className='mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600'>
      <div>
        <p className='font-medium text-gray-900'>Enviar a</p>
        <p>{orderEmail}</p>
      </div>

      <div>
        <p className='font-medium text-gray-900'>
          Estado del pago:
          <p>{isPaid ? 'Pago realizado' : 'Pago pendiente'}</p>
        </p>
      </div>
    </div>
  )
}

export default PaymentStatus

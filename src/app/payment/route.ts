import { getPayloadClient } from '../../get-payload'
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import { redirect } from 'next/dist/server/api-utils'
import { NextRequest } from 'next/server'
import { useRouter } from 'next/navigation'
import { router } from '@/trpc/trpc'

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADO_ATK!
})

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } })
  const secret = request.headers.get('x-signature-id')
  const payment = await new Payment(client).get({ id: body.data.id })

  const pago = {
    id: payment.id,
    amount: payment.transaction_amount,
    items: payment.additional_info?.items
  }
  const items = payment.additional_info?.items?.map((item) => {
    return {
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      description: item.description
    }
  })

  const data = {
    id: pago.id,
    amount: pago.amount
  }

  const payload = await getPayloadClient()
  const result = await payload.create({
    collection: 'Pagos',
    data: {
      productoPagado: true,
      producto: items![0].title,
      orderId: items![0].id,
      user: items![0].description,
      dinero: pago.amount!
    }
  })

  return Response.json({ success: true })
}

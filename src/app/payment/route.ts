import { getPayloadClient } from '../../get-payload'
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import { NextRequest } from 'next/server'

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADO_ATK!
})

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } })
  const secret = request.headers.get('x-signature-id')
  const payment = await new Payment(client).get({ id: body.data.id })

  console.log('payment', payment.additional_info?.payer)
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
      description: item.description!
    }
  })

  const payer = payment.additional_info?.payer

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
      direccion: payer?.address?.street_name!,
      telefono: payer?.phone?.number!,
      nombre: payer?.first_name!,
      orderId: items![0].id,
      email: items![0].description,
      dinero: pago.amount!
    }
  })
  console.log(result)

  return Response.json({ success: true })
}

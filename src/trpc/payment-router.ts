'use server'
import MercadoPagoConfig, { Preference } from 'mercadopago'
import { redirect } from 'next/navigation'

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADO_ATK!
})

export async function payMercadoPago(
  cartTotal: number,
  itemName: string,
  itemCount: number,
  email: string,
  randomId: string
) {
  const preference = await new Preference(client).create({
    body: {
      items: [
        {
          id: randomId,
          title: itemName,
          quantity: 1,
          unit_price: cartTotal,
          description: email,
          currency_id: 'UYU'
        }
      ],
      back_urls: {
        success: `http://localhost:3000/purchase/${randomId}`
      },

      auto_return: 'approved',
      payer: {
        email: email
      }
    }
  })

  redirect(preference.sandbox_init_point!)
}

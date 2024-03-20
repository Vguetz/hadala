'use server'
import MercadoPagoConfig, { Preference } from 'mercadopago'
import { redirect } from 'next/navigation'
import { publicProcedure, router } from './trpc'
import { z } from 'zod'
import { getPayloadClient } from '../get-payload'
import { TRPCError } from '@trpc/server'

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADO_ATK!
})
export const paymentRouter = router({
  pollOrderStatus: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input

      const payload = await getPayloadClient()

      const { docs: orders } = await payload.find({
        collection: 'Pagos',
        where: {
          orderId: {
            equals: orderId
          }
        }
      })

      if (!orders.length) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const [order] = orders

      return { productoPagado: order.productoPagado }
    })
})

export async function payMercadoPago(
  cartTotal: number,
  itemName: string,
  itemId: string,
  itemCount: number,
  email: string,
  randomIdS: string
) {
  const preference = await new Preference(client).create({
    body: {
      items: [
        {
          id: randomIdS,
          title: itemName,
          quantity: 1,
          unit_price: cartTotal,
          description: email,
          currency_id: 'UYU'
        }
      ],
      back_urls: {
        success: `http://localhost:3000/purchase/${randomIdS}`
      },

      auto_return: 'approved',
      payer: {
        email: email
      }
    }
  })

  redirect(preference.sandbox_init_point!)
}

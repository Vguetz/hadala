import { NextApiRequest, NextApiResponse } from 'next'
import mercadopago, { MercadoPagoConfig } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { items } = req.body

    try {
      // Crear la preferencia de pago en Mercado Pago
      const preference = {
        items: items.map(({ product }) => ({
          title: product.name,
          unit_price: product.price,
          quantity: 1
        })),
        external_reference: 'your_external_reference', // Puede ser un identificador único de tu orden
        back_urls: {
          success: 'http://yourdomain.com/success', // URL a la que Mercado Pago redirigirá después de un pago exitoso
          pending: 'http://yourdomain.com/pending', // URL a la que Mercado Pago redirigirá si el pago está pendiente
          failure: 'http://yourdomain.com/failure' // URL a la que Mercado Pago redirigirá después de un pago fallido
        },
        auto_return: 'approved' // Indica que el cliente será redirigido automáticamente después de la aprobación del pago
      }

      const response = await mercadopago.preferences.create(preference)
      const url = response.body.init_point

      res.status(200).json({ url })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al procesar el pago' })
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' })
  }
}

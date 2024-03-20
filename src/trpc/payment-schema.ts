import { z } from 'zod'

// Define un esquema para validar los datos del pago
const PaymentSchema = z.object({
  cardNumber: z.string().min(16).max(16), // Número de tarjeta de crédito
  cardExpiration: z.string().min(4).max(4), // Fecha de vencimiento de la tarjeta (MM/YY)
  cardCVV: z.string().min(3).max(4), // Código de seguridad de la tarjeta (CVV)
  amount: z.number().positive() // Cantidad a pagar
})

export default PaymentSchema

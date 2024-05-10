import { getPayloadClient } from '@/get-payload'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const [address] = body
  console.log(address)

  const payload = await getPayloadClient()
  const result = await payload.create({
    collection: 'Transferencias',
    data: {
      monto: body.monto,
      address: body.address,
      email: body.email,
      name: body.name,
      phone: body.phone,
      transferId: body.transferId
    }
  })

  console.log(result)

  return Response.json({ success: true })
}

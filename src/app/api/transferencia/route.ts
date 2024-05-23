import { getPayloadClient } from '@/get-payload'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const [address] = body
  console.log(address)

  const payload = await getPayloadClient

  return Response.json({ success: true })
}

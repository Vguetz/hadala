import { getPayloadClient } from '@/get-payload'
import { NextRequest } from 'next/server'

interface TransferProps {}

export async function POST(request: NextRequest) {
  const payload = await getPayloadClient()
  const getPropsLocalStorage = localStorage.getItem('props')
  return {
    localStorage: getPropsLocalStorage
  }
}

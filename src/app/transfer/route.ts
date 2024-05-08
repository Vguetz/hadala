import { nanoid } from 'nanoid'
import { NextRequest } from 'next/server'
import { saveTransferCode } from './database' // Assuming you have a function to save the transferCode in the database

export async function GET(request: NextRequest) {
  const transferCode = nanoid(10) // Generate a random transferCode with a length of 10 characters
  await saveTransferCode(transferCode) // Save the transferCode in the database
  return Response.json({ success: true, transferCode })
}

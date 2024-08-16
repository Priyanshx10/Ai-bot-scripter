import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  console.log('Received Synthesia callback:', data)
  // Here you can update your database or take any other action based on the status update
  return NextResponse.json({ received: true })
}
import { NextRequest, NextResponse } from 'next/server'
import { sendMetaPageView } from '@/lib/meta-capi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: { eventId?: string; url?: string; pathname?: string }
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  const result = await sendMetaPageView(req, {
    eventId: body.eventId || crypto.randomUUID(),
    url: body.url || req.headers.get('referer') || 'https://pixelco.com.br',
    pathname: body.pathname || '/',
  })

  return NextResponse.json(result)
}
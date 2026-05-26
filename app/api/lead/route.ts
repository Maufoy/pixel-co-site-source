import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LEADS_DIR = process.env.LEADS_DIR || '/app/briefings-recebidos/leads'
const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE || '5511940374318'
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY || ''

function nowStamp() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    file: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}-${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`,
    human: d.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  }
}

async function sendWhatsApp(message: string) {
  if (!CALLMEBOT_APIKEY) return
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(CALLMEBOT_PHONE)}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}`
  await fetch(url).catch(() => {})
}

export async function POST(req: NextRequest) {
  let body: { nome?: string; email?: string; telefone?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const nome = (body.nome || '').trim()
  const email = (body.email || '').trim()
  const telefone = (body.telefone || '').trim()

  if (!nome || !email) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }

  const stamp = nowStamp()
  const shortId = Math.random().toString(36).slice(2, 8)
  const id = `lead-${stamp.file}-${shortId}`

  const content = `# Lead — Página Express\n\n**Recebido:** ${stamp.human} (BRT)\n**ID:** ${id}\n\n**Nome:** ${nome}\n**E-mail:** ${email}\n**Telefone:** ${telefone || '—'}\n`

  try {
    await mkdir(LEADS_DIR, { recursive: true })
    await writeFile(join(LEADS_DIR, `${id}.md`), content, 'utf8')
  } catch {
    // Non-fatal — still return ok so gate proceeds
  }

  await sendWhatsApp(`*Novo lead — Página Express*\n\n*Nome:* ${nome}\n*E-mail:* ${email}\n*Fone:* ${telefone || '—'}`)

  return NextResponse.json({ ok: true, id })
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'lead-receiver' })
}

import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { sendMetaLeadEvent, sendMetaSubmitApplication } from '@/lib/meta-capi'

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
  await fetch(url).catch(() => { })
}

export async function POST(req: NextRequest) {
  let body: {
    nome?: string; email?: string; telefone?: string; eventId?: string; sourceUrl?: string;
    portfolio_escolhido?: number; nome_pagina?: string;
    utm_source?: string; utm_medium?: string; utm_campaign?: string;
    stage?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const nome = (body.nome || '').trim()
  const email = (body.email || '').trim()
  const telefone = (body.telefone || '').trim()
  const stage = body.stage || 'briefing_complete'

  if (!nome || !email) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }

  const stamp = nowStamp()
  const shortId = Math.random().toString(36).slice(2, 8)
  const id = `lead-${stamp.file}-${shortId}`
  const eventId = (body.eventId || id).trim()

  const content = `# Lead — Página Express\n\n**Recebido:** ${stamp.human} (BRT)\n**ID:** ${id}\n**Estágio:** ${stage === 'lead_captured' ? '📥 Lead capturado (step 5)' : '✅ Briefing completo'}\n\n**Nome:** ${nome}\n**E-mail:** ${email}\n**Telefone:** ${telefone || '—'}\n${body.utm_source ? `**Origem:** ${[body.utm_source, body.utm_medium, body.utm_campaign].filter(Boolean).join(' / ')}\n` : ''}`

  try {
    await mkdir(LEADS_DIR, { recursive: true })
    await writeFile(join(LEADS_DIR, `${id}.md`), content, 'utf8')
  } catch {
    // Non-fatal — still return ok so gate proceeds
  }

  // Só envia WhatsApp no primeiro contato (stage = lead_captured)
  if (stage === 'lead_captured') {
    await sendWhatsApp(`*Novo lead — Página Express*\n\n*Nome:* ${nome}\n*E-mail:* ${email}\n*Fone:* ${telefone || '—'}\n*Etapa:* Captura inicial`)
  }

  // Lead CAPI event
  const meta = await sendMetaLeadEvent(req, {
    eventId: stage === 'lead_captured' ? eventId : `lead-${eventId}`,
    nome,
    email,
    telefone,
    sourceUrl: body.sourceUrl,
  })

  // SubmitApplication CAPI só quando briefing está completo
  let metaSubmit: Record<string, unknown> = { sent: false, reason: 'stage_not_briefing' }
  if (stage === 'briefing_complete') {
    metaSubmit = await sendMetaSubmitApplication(req, {
      eventId: eventId,
      nome,
      email,
      telefone,
      sourceUrl: body.sourceUrl,
      portfolio_escolhido: body.portfolio_escolhido,
      nome_pagina: body.nome_pagina,
    })
  }

  return NextResponse.json({ ok: true, id, eventId, stage, meta, metaSubmit })
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'lead-receiver' })
}

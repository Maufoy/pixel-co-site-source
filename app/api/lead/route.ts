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
  await fetch(url).catch(() => {})
}

// Labels legíveis para as respostas do quiz
const LABELS: Record<string, Record<string, string>> = {
  q1: {
    nao_nunca: 'Nunca tive página profissional',
    linktree: 'Só Linktree/Instagram',
    sim_mas: 'Tenho mas não gosto',
    saiu_do_ar: 'Já tive mas saiu do ar',
  },
  q2: {
    psicologia: 'Psicóloga(o)',
    advocacia: 'Advogada(o)',
    nutricao: 'Nutricionista',
    arquitetura: 'Arquiteto(a) / Designer',
    consultoria: 'Consultor(a) / Coach',
    outro: 'Outra profissão',
  },
  q4: {
    urgente: 'Urgente — quero agora',
    tenho_tempo: 'Tenho tempo — quero caprichar',
    planejando: 'Ainda estou planejando',
    clientes: 'Não consigo atrair clientes',
    tempo: 'Não tenho tempo',
    tentei: 'Tentei e desisti',
    outro_desafio: 'Outro desafio',
  },
  q9: {
    sim_logo: 'Sim, tenho logo',
    sim_simples: 'Logo simples/print',
    nao_logo: 'Ainda não tenho',
  },
  q10: {
    ja_tenho: 'Já tenho domínio',
    preciso: 'Preciso registrar',
    nao_sei: 'Não sei / precisa ajudar',
  },
}

function fmtLabel(key: string, value: string): string {
  return LABELS[key]?.[value] || value || '—'
}

function fmtRespostas(respostas: Record<string, string> | undefined): string {
  if (!respostas || Object.keys(respostas).length === 0) return ''
  const lines: string[] = []
  const order = ['q1', 'q2', 'q4', 'q9', 'q10']
  const titles: Record<string, string> = {
    q1: 'Situação atual',
    q2: 'Profissão',
    q4: 'Prazo desejado',
    q9: 'Logo',
    q10: 'Domínio',
  }
  for (const k of order) {
    const v = respostas[k]
    if (v) {
      lines.push(`- **${titles[k] || k}:** ${fmtLabel(k, v)}`)
    }
  }
  return lines.join('\n')
}

function fmtRespostasWhats(respostas: Record<string, string> | undefined): string {
  if (!respostas || Object.keys(respostas).length === 0) return ''
  const lines: string[] = []
  const order = ['q1', 'q2', 'q4']
  const titles: Record<string, string> = {
    q1: 'Situação',
    q2: 'Profissão',
    q4: 'Prazo',
  }
  for (const k of order) {
    const v = respostas[k]
    if (v) {
      lines.push(`*${titles[k]}:* ${fmtLabel(k, v)}`)
    }
  }
  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  let body: {
    nome?: string; email?: string; telefone?: string; eventId?: string; sourceUrl?: string;
    portfolio_escolhido?: number; nome_pagina?: string;
    utm_source?: string; utm_medium?: string; utm_campaign?: string;
    utm_content?: string; utm_term?: string; fbclid?: string; gclid?: string;
    stage?: string;
    leadId?: string;
    respostas?: Record<string, string>
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
  const respostas = body.respostas

  if (!nome || !email) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }

  const stamp = nowStamp()
  const shortId = Math.random().toString(36).slice(2, 8)
  const isUpdate = !!body.leadId
  const id = isUpdate ? body.leadId! : `lead-${stamp.file}-${shortId}`
  const eventId = (body.eventId || id).trim()

  const respostasMd = fmtRespostas(respostas)

  const content = [
    `# Lead — Página Express`,
    ``,
    `**Recebido:** ${stamp.human} (BRT)`,
    `**ID:** ${id}`,
    `**Estágio:** ${stage === 'lead_captured' ? '📥 Captura (step 5)' : '✅ Briefing completo'}`,
    ``,
    `**Nome:** ${nome}`,
    `**E-mail:** ${email}`,
    `**Telefone:** ${telefone || '—'}`,
    body.utm_source ? `**Origem:** ${[body.utm_source, body.utm_medium, body.utm_campaign, body.utm_content, body.utm_term, body.fbclid, body.gclid].filter(Boolean).join(' / ')}` : '',
    ``,
    respostasMd ? `## Respostas do Quiz\n\n${respostasMd}` : '',
    body.portfolio_escolhido !== undefined && body.portfolio_escolhido !== null
      ? `\n**Portfólio escolhido:** #${body.portfolio_escolhido + 1}`
      : '',
  ].filter(Boolean).join('\n')

  try {
    await mkdir(LEADS_DIR, { recursive: true })
    await writeFile(join(LEADS_DIR, `${id}.md`), content, 'utf8')
  } catch (e) {
    console.error('Failed to write lead file:', e)
  }

  // Só envia WhatsApp no primeiro contato
  if (stage === 'lead_captured') {
    const respostasWpp = fmtRespostasWhats(respostas)
    const msg = [
      `*Novo lead — Página Express*`,
      ``,
      `*Nome:* ${nome}`,
      `*Fone:* ${telefone || '—'}`,
      respostasWpp ? `\n${respostasWpp}` : '',
      `\n🔗 https://pixelco.com.br/leads/`,
    ].filter(Boolean).join('\n')
    await sendWhatsApp(msg)
  }

  // Lead CAPI event — só envia se veio de anúncio
  const meta = await sendMetaLeadEvent(req, {
    eventId: stage === 'lead_captured' ? eventId : `lead-${eventId}`,
    nome,
    email,
    telefone,
    sourceUrl: body.sourceUrl,
    onlyFromAds: true,
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
      onlyFromAds: true,
    })
  }

  return NextResponse.json({ ok: true, id, eventId, stage, meta, metaSubmit })
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'lead-receiver' })
}
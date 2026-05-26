import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BRIEFINGS_DIR = process.env.BRIEFINGS_DIR || '/app/briefings-recebidos'
const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE || '5511940374318'
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY || ''

type Briefing = Record<string, string>

function slugify(s: string) {
  return (s || 'sem-nome')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}

function nowStamp() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    iso: d.toISOString(),
    file: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}-${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`,
    human: d.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  }
}

function answerOrDash(v: unknown) {
  const s = (v ?? '').toString().trim()
  return s || '—'
}

function renderMarkdown(b: Briefing, meta: { id: string; recebido: string }) {
  const Q = (label: string, key: string) => `**${label}:** ${answerOrDash(b[key])}`
  const Qblock = (label: string, key: string) => {
    const v = answerOrDash(b[key])
    if (v === '—') return `**${label}:** —`
    return `**${label}:**\n\n> ${v.split('\n').join('\n> ')}`
  }

  return `# Briefing Página Express

**Cliente:** ${answerOrDash(b.nome_completo)}
**E-mail:** ${answerOrDash(b.lead_email)}
**WhatsApp:** ${answerOrDash(b.lead_telefone)}
**Recebido:** ${meta.recebido}
**ID:** ${meta.id}

---

## Bloco 1 — Negócio

${Q('Nome completo', 'nome_completo')}
${Q('E-mail capturado no lead gate', 'lead_email')}
${Q('WhatsApp capturado no lead gate', 'lead_telefone')}
${Q('Como quer aparecer', 'nome_apresentacao')}
${Q('Profissão / título', 'profissao')}
${Q('Cidade', 'cidade')}
${Q('Atendimento', 'atendimento')}
${Q('Tempo de atuação', 'tempo_atuacao')}
${Q('Site / Instagram / redes', 'links_atuais')}

## Bloco 2 — Cliente ideal

${Qblock('Perfil em 2 frases', 'cliente_perfil')}

${Qblock('Problema nas palavras do cliente', 'cliente_problema')}

${Qblock('O que ele já tentou que não deu certo', 'cliente_tentativas')}

${Qblock('Maior medo / objeção pra fechar', 'cliente_objecao')}

${Qblock('Como descreve o resultado quando dá certo', 'cliente_resultado')}

## Bloco 3 — Oferta

${Qblock('O que vende exatamente', 'oferta_descricao')}

${Qblock('Como funciona (3 passos)', 'oferta_passos')}

${Q('Mostra preço', 'preco_modo')}
${Q('Valor', 'preco_valor')}

${Qblock('Diferencial vs concorrente 50% mais barato', 'diferencial')}

${Q('Garantia', 'garantia')}

## Bloco 4 — Provas

${Qblock('Depoimentos, prints ou frases de clientes', 'provas')}

${Qblock('Números concretos', 'numeros')}

${Qblock('Autoridade (formações, certificações, instituições e aparições)', 'formacoes')}

## Bloco 5 — Voz e estilo

${Qblock('Referências visuais que gosta', 'sites_ama')}
${Qblock('O que quer evitar', 'sites_odeia')}

${Q('Como fala com cliente', 'tratamento')}

${Qblock('Paleta de cor (HEX ou descrição)', 'paleta')}

## Bloco 6 — Ação

${Q('Única coisa que o visitante precisa fazer', 'cta_unica')}
${Q('Destino do clique', 'cta_destino')}
${Qblock('Detalhes do destino (número, campos, URL)', 'cta_detalhes')}

${Q('De onde vem o tráfego', 'origem_trafego')}

## Bloco 7 — Técnico

${Q('Domínio (tem ou registrar)', 'dominio')}
${Q('Logo (vetor disponível?)', 'logo')}
${Q('Fotos profissionais', 'fotos')}
${Q('E-mail @seudominio (plano R$799)', 'email_dominio')}

## Bloco 8 — Última

${Qblock('Algo essencial que faltou perguntar', 'extra')}

---

_Gerado automaticamente pelo briefing form em ${meta.recebido}_
`
}

async function sendWhatsApp(message: string) {
  if (!CALLMEBOT_APIKEY) {
    console.warn('[briefing] CALLMEBOT_APIKEY not set — skipping WhatsApp notification')
    return { sent: false, reason: 'no_apikey' }
  }
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
    CALLMEBOT_PHONE,
  )}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}`
  try {
    const res = await fetch(url, { method: 'GET' })
    const body = await res.text()
    return { sent: res.ok, status: res.status, body: body.slice(0, 200) }
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : String(err) }
  }
}

export async function POST(req: NextRequest) {
  let body: Briefing
  try {
    body = (await req.json()) as Briefing
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const stamp = nowStamp()
  const shortId = Math.random().toString(36).slice(2, 8)
  const slug = slugify(body.nome_completo || body.nome_apresentacao || 'sem-nome')
  const id = `briefing-${stamp.file}-${slug}-${shortId}`
  const filepath = join(BRIEFINGS_DIR, `${id}.md`)

  try {
    await mkdir(BRIEFINGS_DIR, { recursive: true })
    const md = renderMarkdown(body, { id, recebido: `${stamp.human} (BRT)` })
    await writeFile(filepath, md, 'utf8')
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: 'write_failed',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    )
  }

  const summary =
    `*Novo briefing recebido*\n\n` +
    `*Cliente:* ${answerOrDash(body.nome_completo)}\n` +
    `*E-mail:* ${answerOrDash(body.lead_email)}\n` +
    `*WhatsApp:* ${answerOrDash(body.lead_telefone)}\n` +
    `*Profissão:* ${answerOrDash(body.profissao)}\n` +
    `*Cidade:* ${answerOrDash(body.cidade)}\n` +
    `*Redes:* ${answerOrDash(body.links_atuais)}\n\n` +
    `*Arquivo:*\n\`${filepath}\``

  const whats = await sendWhatsApp(summary)

  return NextResponse.json({
    ok: true,
    id,
    filepath,
    whatsapp: whats,
  })
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'briefing-receiver',
    method: 'POST application/json to this endpoint',
  })
}

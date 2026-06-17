import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BRIEFINGS_DIR = process.env.BRIEFINGS_DIR || '/app/briefings-recebidos'
const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE || '5511940374318'
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY || ''

type Briefing = Record<string, string | string[]>

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
  if (Array.isArray(v)) {
    const s = v.map((item) => item.toString().trim()).filter(Boolean).join(', ')
    return s || '—'
  }
  const s = (v ?? '').toString().trim()
  return s || '—'
}

function mapQuizLabel(key: string, value: string): string {
  const labels: Record<string, Record<string, string>> = {
    q1: {
      nao_nunca: 'Não, nunca tive uma página profissional',
      linktree: 'Tenho um Linktree / Instagram só',
      sim_mas: 'Tenho, mas não gosto / está feia',
      saiu_do_ar: 'Já tive mas saiu do ar / nunca finalizei',
    },
    q2: {
      psicologia: 'Psicóloga(o)',
      advocacia: 'Advogada(o)',
      nutricao: 'Nutricionista',
      arquitetura: 'Arquitet(o) / Designer de interiores',
      consultoria: 'Consultora(o) / Coach',
      outro: 'Outra profissão',
    },
    q4: {
      clientes: 'Não consigo atrair clientes novos',
      tempo: 'Não tenho tempo de criar uma página',
      tentei: 'Já tentei fazer e desisti / ficou ruim',
      outro_desafio: 'Outro desafio',
    },
    q7: {
      sim_logo: 'Sim, tenho logo em boa qualidade',
      sim_simples: 'Tenho uma logo simples / print',
      nao_logo: 'Ainda não tenho logo',
    },
    q8: {
      ja_tenho: 'Já tenho domínio',
      preciso: 'Preciso registrar um',
      nao_sei: 'Não sei / ajuda nessa parte',
    },
  };
  return labels[key]?.[value] || value;
}

function renderMarkdown(b: Briefing, meta: { id: string; recebido: string }) {
  // Detecta se é quiz v2 (tem q1, q2) ou briefing antigo (tem nome_completo)
  const isQuiz = 'q1' in b;

  if (isQuiz) {
    return renderQuizPlaybook(b, meta);
  }

  return renderLegacyBriefing(b, meta);
}

function renderQuizPlaybook(b: Briefing, meta: { id: string; recebido: string }) {
  const nome = answerOrDash(b.nome || b.nome_completo || '');
  const tel = answerOrDash(b.telefone || b.lead_telefone || '');
  const email = answerOrDash(b.email || b.lead_email || '');

  // Mapeia respostas
  const situacao = mapQuizLabel('q1', (b.q1 as string) || '');
  const profissao = mapQuizLabel('q2', (b.q2 as string) || '');
  const desafio = mapQuizLabel('q4', (b.q4 as string) || '');
  const logoStatus = mapQuizLabel('q9', (b.q9 as string) || '');
  const dominioStatus = mapQuizLabel('q10', (b.q10 as string) || '');
  const nomePagina = answerOrDash(b.nome_pagina);
  const clientePerfil = answerOrDash(b.cliente_perfil);
  const oferta = answerOrDash(b.oferta);
  const corPref = answerOrDash(b.cor_preferida);
  const extra = answerOrDash(b.extra);
  const portfolioIdx = b.portfolio_escolhido as string | undefined;
  const detalheSituacao = answerOrDash(b.detalhe_situacao);
  const detalheProfissao = answerOrDash(b.detalhe_profissao);
  const detalheDesafio = answerOrDash(b.detalhe_desafio);
  const detalheDominio = answerOrDash(b.detalhe_dominio);

  return `# Briefing de produção — ${nome}
> ${profissao} · Recebido em ${meta.recebido}

---

## 👤 Cliente

| Campo | Valor |
|---|---|
| Nome | ${nome} |
| WhatsApp | ${tel} |
| E-mail | ${email} |
| Como quer aparecer na página | ${nomePagina} |
| Profissão | ${profissao}${detalheProfissao !== '—' ? ` — ${detalheProfissao}` : ''} |

## 📍 Contexto

**Situação atual:** ${situacao}${detalheSituacao !== '—' ? `\n\n**Detalhe:** ${detalheSituacao}` : ''}

**Maior desafio:** ${desafio}${detalheDesafio !== '—' ? `\n\n**Detalhe:** ${detalheDesafio}` : ''}

## 🧠 Cliente ideal

${clientePerfil !== '—' ? `> ${clientePerfil.replace(/\n/g, '\n> ')}` : '—'}

## 💼 Oferta

${oferta !== '—' ? `> ${oferta.replace(/\n/g, '\n> ')}` : '—'}

## 🎨 Direcionais de Design

**Cor / paleta preferida:** ${corPref}

**Logo:** ${logoStatus}

**Domínio:** ${dominioStatus}${detalheDominio !== '—' ? ` (${detalheDominio})` : ''}

${portfolioIdx ? `**Página de referência escolhida:** #${portfolioIdx} no portfolio` : ''}

## 📄 Estrutura sugerida da página

Com base nas respostas do cliente, a página deve conter:

1. **Hero** — Nome profissional + título + CTA principal
2. **Sobre / Contexto** — Conecta com a dor do cliente ideal
3. **Serviço / Oferta** — O que vende, como funciona, preço
4. **Prova social** — Depoimentos, números, autoridade
5. **CTA final** — WhatsApp / formulário

> _Conteúdo detalhado de cada seção deve ser definido na revisão com o cliente._

## 💰 Plano

**Plano LP (R$499)** — hospedagem e domínio por conta do cliente.

## 📝 Observações do briefing

${extra !== '—' ? extra : 'Nenhuma observação adicional.'}

${(b.utm_source as string) ? `---
**Origem:** ${[b.utm_source, b.utm_medium, b.utm_campaign].filter(Boolean).join(' / ')}` : ''}

---

_Playbook gerado automaticamente pelo quiz Página Express em ${meta.recebido}_\n`;
}

function renderLegacyBriefing(b: Briefing, meta: { id: string; recebido: string }) {
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

${Q('Provas disponíveis', 'provas_disponiveis')}

${Qblock('Depoimentos, prints ou frases de clientes', 'provas')}

${Qblock('Números concretos', 'numeros')}

${Qblock('Autoridade (formações, certificações, instituições e aparições)', 'formacoes')}

## Bloco 5 — Voz e estilo

${Q('Caminho visual', 'estilo_visual')}
${Q('Evitar no visual/copy', 'evitar_visual')}

${Q('Como fala com cliente', 'tratamento')}

${Q('Cores', 'paleta')}

${Qblock('Referência visual específica', 'referencia_visual')}

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
  const slug = slugify(answerOrDash(body.nome_completo || body.nome_apresentacao || 'sem-nome'))
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

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  const list = req.nextUrl.searchParams.get('list') === 'true'

  if (list) {
    const { readdir } = await import('fs/promises')
    try {
      const files = await readdir(BRIEFINGS_DIR)
      const briefings = files
        .filter((f) => f.endsWith('.md'))
        .map((f) => ({
          id: f.replace(/\.md$/, ''),
          file: f,
          url: `/api/briefing?id=${encodeURIComponent(f.replace(/\.md$/, ''))}`,
        }))
        .reverse()
      return NextResponse.json({ ok: true, briefings })
    } catch {
      return NextResponse.json({ ok: false, error: 'read_failed' }, { status: 500 })
    }
  }

  if (!id) {
    return NextResponse.json({
      ok: true,
      service: 'briefing-receiver',
      usage: {
        list: 'GET /api/briefing?list=true',
        view: 'GET /api/briefing?id=<briefing-id>',
        submit: 'POST /api/briefing (application/json)',
      },
    })
  }

  const { readFile } = await import('fs/promises')
  try {
    const filepath = join(BRIEFINGS_DIR, `${id}.md`)
    const content = await readFile(filepath, 'utf8')
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `inline; filename="${id}.md"`,
      },
    })
  } catch {
    return NextResponse.json({ ok: false, error: 'briefing_not_found' }, { status: 404 })
  }
}

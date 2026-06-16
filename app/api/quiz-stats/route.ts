import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const STATS_FILE = process.env.STATS_FILE || '/app/quiz-stats.json'
const STATS_DIR = process.env.STATS_DIR || '/app'

interface StatsData {
  total_submissions: number
  questions: Record<string, Record<string, number>>
  last_submission: string
}

function getDefaultStats(): StatsData {
  return {
    total_submissions: 0,
    questions: {},
    last_submission: '',
  }
}

async function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }
}

async function readStats(): Promise<StatsData> {
  try {
    const raw = await readFile(STATS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return getDefaultStats()
  }
}

async function writeStats(stats: StatsData) {
  await ensureDir(STATS_DIR)
  await writeFile(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8')
}

const QUESTION_LABELS: Record<string, string> = {
  q1: 'Já tem página profissional?',
  q2: 'Qual sua profissão?',
  q4: 'Prazo para página pronta',
  q9: 'Tem logo?',
  q10: 'Domínio?',
}

const OPTION_LABELS: Record<string, Record<string, string>> = {
  q1: {
    nao_nunca: 'Não, nunca tive',
    linktree: 'Tenho Linktree/Instagram só',
    sim_mas: 'Tenho mas não gosto',
    saiu_do_ar: 'Já tive mas saiu do ar',
  },
  q2: {
    psicologia: 'Psicóloga(o)',
    advocacia: 'Advogada(o)',
    nutricao: 'Nutricionista',
    arquitetura: 'Arquiteta(o) / Design',
    consultoria: 'Consultora(o) / Coach',
    outro: 'Outra profissão',
  },
  q4: {
    urgente: 'Urgente (3 dias)',
    tenho_tempo: 'Tenho tempo (7-15 dias)',
    planejando: 'Ainda planejando',
  },
  q9: {
    sim_logo: 'Sim, tenho logo',
    sim_simples: 'Sim, mas quero simplificar',
    nao_logo: 'Não tenho logo',
  },
  q10: {
    ja_tenho: 'Já tenho domínio',
    preciso: 'Preciso de um domínio',
    nao_sei: 'Não sei',
  },
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { respostas } = body

    if (!respostas || typeof respostas !== 'object') {
      return NextResponse.json({ error: 'respostas object required' }, { status: 400 })
    }

    const stats = await readStats()
    stats.total_submissions++
    stats.last_submission = new Date().toISOString()

    for (const [q, value] of Object.entries(respostas)) {
      if (!value || typeof value !== 'string') continue
      if (!stats.questions[q]) {
        stats.questions[q] = {}
      }
      const valStr = value as string
      stats.questions[q][valStr] = (stats.questions[q][valStr] || 0) + 1
    }

    await writeStats(stats)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('quiz-stats POST error:', e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const stats = await readStats()
    return NextResponse.json({
      ...stats,
      labels: QUESTION_LABELS,
      option_labels: OPTION_LABELS,
    })
  } catch (e) {
    console.error('quiz-stats GET error:', e)
    return NextResponse.json(getDefaultStats())
  }
}

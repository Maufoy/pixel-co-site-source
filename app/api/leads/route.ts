import { NextRequest, NextResponse } from 'next/server'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LEADS_DIR = process.env.LEADS_DIR || '/app/briefings-recebidos/leads'

interface LeadEntry {
  id: string
  filename: string
  nome: string
  email: string
  telefone: string
  recebido: string
  timestamp: number
  stage: 'lead_captured' | 'briefing_complete'
  origem: string
}

function parseLeadFile(filename: string, content: string): LeadEntry | null {
  const lines = content.split('\n')

  const get = (label: string): string => {
    const line = lines.find(l => l.includes(`**${label}:**`))
    if (!line) return ''
    const val = line.split(`**${label}:**`)[1]?.trim() || ''
    return val
  }

  const nome = get('Nome')
  const email = get('E-mail')
  const telefone = get('Telefone')
  const recebido = get('Recebido')

  const stageRaw = get('Estágio')
  const stage: 'lead_captured' | 'briefing_complete' =
    stageRaw.includes('Briefing completo') ? 'briefing_complete' : 'lead_captured'

  const origem = get('Origem')

  // Parse timestamp from filename: lead-2026-05-31-145733-xxx.md
  // Format: YYYY-MM-DD-HHMMSS
  const match = filename.match(/lead-(\d{4}-\d{2}-\d{2})-(\d{6})/)
  let timestamp = 0
  if (match) {
    const [_, datePart, timePart] = match
    const hh = timePart.slice(0, 2)
    const mm = timePart.slice(2, 4)
    const ss = timePart.slice(4, 6)
    timestamp = new Date(`${datePart}T${hh}:${mm}:${ss}Z`).getTime()
  }

  return {
    id: filename.replace(/\.md$/, ''),
    filename,
    nome: nome || '—',
    email: email || '—',
    telefone: telefone || '—',
    recebido: recebido || '—',
    timestamp: timestamp || 0,
    stage,
    origem: origem || '',
  }
}

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('q')?.toLowerCase() || ''

  try {
    const files = await readdir(LEADS_DIR)
    const mdFiles = files.filter(f => f.endsWith('.md')).sort().reverse()

    const leads: LeadEntry[] = []

    for (const f of mdFiles) {
      try {
        const content = await readFile(join(LEADS_DIR, f), 'utf8')
        const parsed = parseLeadFile(f, content)
        if (parsed) leads.push(parsed)
      } catch {
        // skip unreadable files
      }
    }

    // Filtrar por search term
    let filtered = leads
    if (search) {
      filtered = leads.filter(l =>
        l.nome.toLowerCase().includes(search) ||
        l.email.toLowerCase().includes(search) ||
        l.telefone.includes(search)
      )
    }

    return NextResponse.json({
      ok: true,
      total: filtered.length,
      leads: filtered,
    })
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      leads: [],
    })
  }
}

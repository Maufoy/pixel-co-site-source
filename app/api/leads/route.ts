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
  respostas: Record<string, string>
}

function getLabel(lines: string[], label: string): string {
  const line = lines.find(l => l.includes(`**${label}:**`))
  if (!line) return ''
  return line.split(`**${label}:**`)[1]?.trim() || ''
}

function parseRespostas(lines: string[]): Record<string, string> {
  const res: Record<string, string> = {}
  const section = lines.findIndex(l => l.trim() === '## Respostas do Quiz')
  if (section === -1) return res
  for (let i = section + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('## ') || line.startsWith('---')) break
    // Formato: - **Situação atual:** Nunca tive página profissional
    const match = line.match(/^- \*\*(.+?):\*\*\s(.+)$/)
    if (match) {
      res[match[1]] = match[2]
    }
  }
  return res
}

function parseLeadFile(filename: string, content: string): LeadEntry | null {
  const lines = content.split('\n')

  const nome = getLabel(lines, 'Nome')
  const email = getLabel(lines, 'E-mail')
  const telefone = getLabel(lines, 'Telefone')
  const recebido = getLabel(lines, 'Recebido')

  const stageRaw = getLabel(lines, 'Estágio')
  const stage: 'lead_captured' | 'briefing_complete' =
    stageRaw.includes('Briefing completo') || stageRaw.includes('✅')
      ? 'briefing_complete' : 'lead_captured'

  const origem = getLabel(lines, 'Origem')
  const respostas = parseRespostas(lines)

  // Parse timestamp from filename: lead-2026-05-31-145733-xxx.md
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
    respostas,
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
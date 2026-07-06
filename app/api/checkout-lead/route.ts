import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DATA_DIR = process.env.CHECKOUT_LEADS_DIR || '/app/data/checkout-leads'

interface LeadEntry {
  leadId: string
  nome?: string
  email?: string
  telefone?: string
  status: 'lead' | 'purchased' | 'recovery_sent'
  utms?: Record<string, string>
  capturedAt: string
  purchasedAt?: string
  recoverySentAt?: string
}

async function readDB(): Promise<Record<string, LeadEntry>> {
  try {
    const raw = await readFile(join(DATA_DIR, 'db.json'), 'utf8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

async function writeDB(db: Record<string, LeadEntry>) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(join(DATA_DIR, 'db.json'), JSON.stringify(db, null, 2), 'utf8')
}

// GET /api/checkout-lead/?leadId=xxx
// Returns { converted: boolean, status: string, lead?: LeadEntry }
export async function GET(req: NextRequest) {
  const leadId = req.nextUrl.searchParams.get('leadId')
  if (!leadId) {
    return NextResponse.json({ ok: false, error: 'missing_leadId' }, { status: 400 })
  }

  const db = await readDB()
  const lead = db[leadId]

  if (!lead) {
    return NextResponse.json({ ok: true, converted: false, status: 'not_found' })
  }

  return NextResponse.json({
    ok: true,
    converted: lead.status === 'purchased',
    status: lead.status,
    lead: {
      leadId: lead.leadId,
      nome: lead.nome,
      status: lead.status,
      capturedAt: lead.capturedAt,
    }
  })
}

// POST /api/checkout-lead/
// Body: { leadId, nome?, email?, telefone?, utms?, status? }
export async function POST(req: NextRequest) {
  let body: { leadId?: string; nome?: string; email?: string; telefone?: string; utms?: Record<string, string>; status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const leadId = body.leadId
  if (!leadId) {
    return NextResponse.json({ ok: false, error: 'missing_leadId' }, { status: 400 })
  }

  const db = await readDB()
  const existing = db[leadId]

  db[leadId] = {
    leadId,
    nome: body.nome || existing?.nome,
    email: body.email || existing?.email,
    telefone: body.telefone || existing?.telefone,
    status: (body.status as LeadEntry['status']) || existing?.status || 'lead',
    utms: body.utms || existing?.utms,
    capturedAt: existing?.capturedAt || new Date().toISOString(),
    purchasedAt: existing?.purchasedAt,
    recoverySentAt: existing?.recoverySentAt,
  }

  if (body.status === 'purchased' && !existing?.purchasedAt) {
    db[leadId].purchasedAt = new Date().toISOString()
  }

  await writeDB(db)

  return NextResponse.json({ ok: true, leadId, status: db[leadId].status })
}
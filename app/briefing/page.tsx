import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const BRIEFINGS_DIR = process.env.BRIEFINGS_DIR || '/app/briefings-recebidos'

interface BriefingMeta {
  id: string
  client: string
  email: string
  date: string
}

async function listBriefings(): Promise<BriefingMeta[]> {
  try {
    const files = await readdir(BRIEFINGS_DIR)
    const mdFiles = files.filter((f) => f.endsWith('.md')).reverse()

    const briefings: BriefingMeta[] = []
    for (const file of mdFiles) {
      const content = await readFile(join(BRIEFINGS_DIR, file), 'utf8')
      const id = file.replace(/\.md$/, '')
      const client = content.match(/\*\*Cliente:\*\*\s*(.*?)(?:\n|$)/)?.[1] || '—'
      const email = content.match(/\*\*E-mail:\*\*\s*(.*?)(?:\n|$)/)?.[1] || '—'
      const date = content.match(/\*\*Recebido:\*\*\s*(.*?)(?:\n|$)/)?.[1] || '—'
      briefings.push({ id, client, email, date })
    }
    return briefings
  } catch {
    return []
  }
}

export default async function BriefingListPage() {
  const briefings = await listBriefings()

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Voltar ao início
          </Link>

          <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">
            Briefings Recebidos
          </h1>
          <p className="text-[var(--color-ink-3)]">
            {briefings.length} briefing{briefings.length !== 1 ? 's' : ''} enviado{briefings.length !== 1 ? 's' : ''} via formulário Página Express
          </p>
        </div>

        {/* Briefing list */}
        {briefings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--color-ink-3)] text-lg">Nenhum briefing recebido ainda.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {briefings.map((b) => (
              <Link
                key={b.id}
                href={`/briefing/${b.id}`}
                className="block liquid-glass rounded-xl p-5 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                      {b.client}
                    </h2>
                    <p className="text-sm text-[var(--color-ink-3)] mt-0.5 truncate">
                      {b.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <time className="text-xs text-[var(--color-ink-3)] whitespace-nowrap">
                      {b.date}
                    </time>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[var(--color-ink-3)] group-hover:text-[var(--color-accent)] transition-colors"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
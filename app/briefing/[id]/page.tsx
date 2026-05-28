import { readFile } from 'fs/promises'
import { join } from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { parseMarkdown } from '@/lib/markdown'

export const dynamic = 'force-dynamic'

const BRIEFINGS_DIR = process.env.BRIEFINGS_DIR || '/app/briefings-recebidos'

interface Props {
  params: { id: string }
}

export default async function BriefingPage({ params }: Props) {
  const filePath = join(BRIEFINGS_DIR, `${params.id}.md`)

  let content: string
  try {
    content = await readFile(filePath, 'utf8')
  } catch {
    notFound()
  }

  const html = parseMarkdown(content)

  const dateMatch = content.match(/\*\*Recebido:\*\*\s*(.*?)(?:\n|$)/)
  const clientMatch = content.match(/\*\*Cliente:\*\*\s*(.*?)(?:\n|$)/)
  const emailMatch = content.match(/\*\*E-mail:\*\*\s*(.*?)(?:\n|$)/)

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Back navigation */}
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-4">
        <Link
          href="/briefing"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Todos os briefings
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 pb-20">
        {/* Header card */}
        <div className="liquid-glass rounded-2xl p-8 mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-ink)] mb-2">
            {clientMatch?.[1] || 'Briefing'}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--color-ink-3)]">
            {emailMatch && <span>{emailMatch[1]}</span>}
            {dateMatch && <span>Recebido em {dateMatch[1]}</span>}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="section-label">Briefing Página Express</span>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Export link */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <a
            href={`/api/briefing?id=${params.id}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[var(--color-border)] text-sm text-[var(--color-ink-2)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Baixar como .md
          </a>
        </div>
      </article>
    </div>
  )
}
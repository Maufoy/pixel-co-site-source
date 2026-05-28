/**
 * Lightweight markdown → HTML for briefing viewer.
 * Handles the subset used in generated briefings:
 * headings, bold, italic, lists, blockquotes, links, HR, paragraphs.
 */
export function parseMarkdown(md: string): string {
  let html = md
    // Escape HTML tags first
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-10 border-[var(--color-border)]" />')

  // Headings (## then #, to avoid ## matching as #)
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-8 mb-3 text-[var(--color-accent)]">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-10 mb-4 text-[var(--color-ink)]">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-0 mb-6 text-[var(--color-ink)]">$1</h1>')

  // Blockquotes (multi-line: > text with possible continuation)
  html = html.replace(/^> (.+)$/gm, '<blockquote class="pl-4 border-l-2 border-[var(--color-accent)] text-[var(--color-ink-2)] italic my-3">$1</blockquote>')

  // Bold + italic combined ***
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  // Bold **
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
  // Italic *
  html = html.replace(/\*(.+?)\*/g, '<em class="font-serif italic text-[var(--color-accent)]">$1</em>')

  // Inline code
  html = html.replace(/`(.+?)`/g, '<code class="bg-[var(--color-accent-subtle)] px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')

  // Links [text](url)
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-[var(--color-accent)] underline decoration-1 underline-offset-2 hover:text-[var(--color-accent-hover)]">$1</a>')

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-5 list-disc text-[var(--color-ink-2)]">$1</li>')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, '<ul class="space-y-1 my-3">$1</ul>')

  // Paragraphs: wrap remaining lines that aren't already wrapped
  const lines = html.split('\n')
  const result: string[] = []
  let inBlock = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) {
      if (inBlock) { inBlock = false }
      continue
    }

    // Skip lines already wrapped in block-level HTML
    if (/^<(h[123]|ul|ol|li|blockquote|hr|div|table|p)/.test(line) ||
        /<\/(h[123]|ul|ol|li|blockquote|hr|div|table|p)>$/.test(line)) {
      result.push(lines[i])
      continue
    }

    // Skip blockquote continuation
    if (line.startsWith('<blockquote') || line.startsWith('</blockquote')) {
      result.push(lines[i])
      continue
    }

    // Wrap bare text as <p>
    result.push(`<p class="text-[var(--color-ink-2)] leading-relaxed mb-4">${line}</p>`)
  }

  return result.join('\n')
}
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Gera eventId único pra esse pageview
    const eventId = `pv-${crypto.randomUUID()}`

    // 1. Manda pro dataLayer pra tag do Meta Pixel no GTM usar
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'pageView',
      eventID: eventId,
      pagePath: pathname,
    })

    // 2. Manda pro CAPI (mesmo eventId pra dedup com o browser pixel)
    fetch('/api/track/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId,
        url: window.location.href,
        pathname,
      }),
      keepalive: true,
    }).catch(() => {
      // Silencioso — não crítico pro usuário
    })
  }, [pathname])

  return null
}

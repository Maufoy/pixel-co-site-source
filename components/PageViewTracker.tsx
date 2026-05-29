'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function PageViewTracker() {
  const pathname = usePathname()
  const lastPath = useRef('')

  useEffect(() => {
    // Prevent double-fire from React StrictMode
    if (lastPath.current === pathname) return
    lastPath.current = pathname

    const eventId = crypto.randomUUID()

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
      // Non-critical — silent fail
    })
  }, [pathname])

  return null
}
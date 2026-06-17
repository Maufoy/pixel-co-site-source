import { createHash } from 'crypto'
import type { NextRequest } from 'next/server'

const META_PIXEL_ID = process.env.META_PIXEL_ID || ''
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || ''
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || ''
const META_GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v21.0'

type LeadEventInput = {
  eventId: string
  nome: string
  email: string
  telefone: string
  sourceUrl?: string
}

type PageViewEventInput = {
  eventId: string
  url: string
  pathname?: string
}

type SubmitApplicationInput = LeadEventInput & {
  portfolio_escolhido?: number | string
  nome_pagina?: string
}

type MetaUserData = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  external_id?: string[]
  client_ip_address?: string
  client_user_agent?: string
  fbp?: string
  fbc?: string
}

function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10 || digits.length === 11) return `55${digits}`
  return digits
}

function splitName(nome: string) {
  const parts = nome.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return {
    firstName: parts[0] || '',
    lastName: parts.length > 1 ? parts[parts.length - 1] : '',
  }
}

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim()
  return req.headers.get('x-real-ip') || undefined
}

function getCookie(req: NextRequest, name: string) {
  return req.cookies.get(name)?.value
}

export async function sendMetaLeadEvent(req: NextRequest, input: LeadEventInput) {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
    console.warn('[meta-capi] META_PIXEL_ID or META_ACCESS_TOKEN not set - skipping Lead event')
    return { sent: false, reason: 'missing_config' }
  }

  const email = normalizeEmail(input.email)
  const phone = normalizePhone(input.telefone)
  const { firstName, lastName } = splitName(input.nome)

  const userData: MetaUserData = {
    client_ip_address: getClientIp(req),
    client_user_agent: req.headers.get('user-agent') || undefined,
    fbp: getCookie(req, '_fbp'),
    fbc: getCookie(req, '_fbc'),
  }

  if (email) {
    userData.em = [sha256(email)]
    userData.external_id = [sha256(email)]
  }

  if (phone) userData.ph = [sha256(phone)]
  if (firstName) userData.fn = [sha256(firstName)]
  if (lastName) userData.ln = [sha256(lastName)]

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: 'website',
        event_source_url: input.sourceUrl || req.headers.get('referer') || undefined,
        user_data: userData,
        custom_data: {
          content_name: 'Pagina Express - Lead Gate',
          content_category: 'lead_form',
        },
      },
    ],
  }

  if (META_TEST_EVENT_CODE) payload.test_event_code = META_TEST_EVENT_CODE

  const url = new URL(`https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events`)
  url.searchParams.set('access_token', META_ACCESS_TOKEN)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const result = (await res.json().catch(() => ({}))) as Record<string, unknown>

    if (!res.ok) {
      console.warn('[meta-capi] Lead event rejected', {
        status: res.status,
        result,
      })
      return { sent: false, status: res.status, result }
    }

    return { sent: true, status: res.status, result }
  } catch (err) {
    console.warn('[meta-capi] Lead event failed', err)
    return { sent: false, error: err instanceof Error ? err.message : String(err) }
  }
}

export async function sendMetaPageView(req: NextRequest, input?: PageViewEventInput) {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
    console.warn('[meta-capi] META_PIXEL_ID or META_ACCESS_TOKEN not set — skipping PageView event')
    return { sent: false, reason: 'missing_config' }
  }

  const userData: MetaUserData = {
    client_ip_address: getClientIp(req),
    client_user_agent: req.headers.get('user-agent') || undefined,
    fbp: getCookie(req, '_fbp'),
    fbc: getCookie(req, '_fbc'),
  }

  // Map pathname to structured content data
  const pathname = input?.pathname || '/'
  const isBriefing = pathname.startsWith('/briefing')
  const contentName = isBriefing ? 'Briefing Express' : 'Pagina Express'
  const contentCategory = isBriefing ? 'briefing_form' : 'landing_page'

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        event_id: input?.eventId || crypto.randomUUID(),
        action_source: 'website',
        event_source_url: input?.url || req.headers.get('referer') || 'https://pixelco.com.br',
        user_data: userData,
        custom_data: {
          content_name: contentName,
          content_category: contentCategory,
        },
      },
    ],
  }

  if (META_TEST_EVENT_CODE) payload.test_event_code = META_TEST_EVENT_CODE

  const url = new URL(`https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events`)
  url.searchParams.set('access_token', META_ACCESS_TOKEN)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const result = (await res.json().catch(() => ({}))) as Record<string, unknown>

    if (!res.ok) {
      console.warn('[meta-capi] PageView event rejected', { status: res.status, result })
      return { sent: false, status: res.status, result }
    }

    return { sent: true, status: res.status, result }
  } catch (err) {
    console.warn('[meta-capi] PageView event failed', err)
    return { sent: false, error: err instanceof Error ? err.message : String(err) }
  }
}

/** Generic CAPI event sender — reuse for any event_name */
async function sendMetaCapiEvent(params: {
  req: NextRequest
  input: LeadEventInput
  eventName: string
  customData?: Record<string, unknown>
}) {
  const { req, input, eventName, customData } = params

  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
    console.warn(`[meta-capi] META_PIXEL_ID or META_ACCESS_TOKEN not set — skipping ${eventName} event`)
    return { sent: false, reason: 'missing_config' }
  }

  const email = normalizeEmail(input.email)
  const phone = normalizePhone(input.telefone)
  const { firstName, lastName } = splitName(input.nome)

  const userData: MetaUserData = {
    client_ip_address: getClientIp(req),
    client_user_agent: req.headers.get('user-agent') || undefined,
    fbp: getCookie(req, '_fbp'),
    fbc: getCookie(req, '_fbc'),
  }

  if (email) {
    userData.em = [sha256(email)]
    userData.external_id = [sha256(email)]
  }

  if (phone) userData.ph = [sha256(phone)]
  if (firstName) userData.fn = [sha256(firstName)]
  if (lastName) userData.ln = [sha256(lastName)]

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: 'website',
        event_source_url: input.sourceUrl || req.headers.get('referer') || undefined,
        user_data: userData,
        custom_data: {
          content_name: 'Pagina Express',
          content_category: 'lead_form',
          ...customData,
        },
      },
    ],
  }

  if (META_TEST_EVENT_CODE) payload.test_event_code = META_TEST_EVENT_CODE

  const url = new URL(`https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events`)
  url.searchParams.set('access_token', META_ACCESS_TOKEN)

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const result = (await res.json().catch(() => ({}))) as Record<string, unknown>

    if (!res.ok) {
      console.warn(`[meta-capi] ${eventName} event rejected`, { status: res.status, result })
      return { sent: false, status: res.status, result }
    }

    return { sent: true, status: res.status, result }
  } catch (err) {
    console.warn(`[meta-capi] ${eventName} event failed`, err)
    return { sent: false, error: err instanceof Error ? err.message : String(err) }
  }
}

export async function sendMetaSubmitApplication(req: NextRequest, input: SubmitApplicationInput) {
  return sendMetaCapiEvent({
    req,
    input,
    eventName: 'SubmitApplication',
    customData: {
      portfolio_escolhido: input.portfolio_escolhido,
      nome_pagina: input.nome_pagina,
    },
  })
}

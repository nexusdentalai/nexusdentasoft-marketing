// ═══════════════════════════════════════════════════════════
// POST /api/contact — première route API du repo marketing.
// Envoi mail via Resend. Validation serveur + honeypot anti-spam.
// Variables d'env : RESEND_API_KEY (requis), CONTACT_FROM_EMAIL (domaine
// vérifié Resend), CONTACT_TO_EMAIL (inbox lead).
// ═══════════════════════════════════════════════════════════
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Body = {
  name?: unknown
  email?: unknown
  cabinet?: unknown
  message?: unknown
  website?: unknown   // honeypot — invisible aux humains, piège pour bots
}

function clip(v: unknown, max: number): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  // Honeypot — si rempli (≠ ''), c'est un bot : silent OK (ne pas signaler
  // la détection au spambot, qui retenterait avec un autre payload).
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  // Validation serveur stricte (la validation client n'est qu'UX).
  const name = clip(body.name, 120)
  const email = clip(body.email, 200)
  const cabinet = clip(body.cabinet, 160)
  const message = clip(body.message, 4000)
  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY manquant — route non configurée')
    return NextResponse.json({ error: 'not_configured' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
  const to = process.env.CONTACT_TO_EMAIL || 'contact@nexusdentasoft.com'

  try {
    // text: (pas html:) — évite toute injection HTML depuis les champs user.
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nClinic: ${cabinet || '-'}\n\n${message}`,
    })
    if (error) {
      console.error('[contact] resend error', error)
      return NextResponse.json({ error: 'send_failed' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[contact] resend exception', e)
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }
}

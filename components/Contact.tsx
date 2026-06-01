'use client'
import { useState } from 'react'
import { COMPANY } from '@/lib/company-info'

type T = Record<string, any>

// Google Maps embed — point exact Sukhumvit 13 / Khwaeng Khlong Toei Nuea / Watthana.
// URL générée depuis maps.google.com (sans clé API). Aucun tracking-cookies-Google
// au repos jusqu'à interaction utilisateur (lazy load).
const GMAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.59130450844!2d100.557795!3d13.743176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee5e0980e4d%3A0xf4f589d31e5b9341!2sSoi%20Sukhumvit%2013%2C%20Khwaeng%20Khlong%20Toei%20Nuea%2C%20Watthana%2C%20Krung%20Thep%20Maha%20Nakhon%2010110!5e0!3m2!1sen!2sth!4v1780137563792!5m2!1sen!2sth'

type Status = 'idle' | 'sending' | 'success' | 'error'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact({
  t, locale, signupsOpen, registerUrl,
}: {
  t: T
  locale: string
  signupsOpen: boolean
  registerUrl: string
}) {
  const c = t.contact
  const f = c.form

  // État form contact
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cabinet, setCabinet] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')   // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [errorKey, setErrorKey] = useState<'invalid' | 'send'>('invalid')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return

    // Validation client (UX). La validation serveur reste autoritative.
    if (!name.trim() || !email.trim() || !message.trim() || !EMAIL_RE.test(email)) {
      setErrorKey('invalid')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, cabinet, message, website }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string }
        setErrorKey(data?.error === 'invalid' ? 'invalid' : 'send')
        setStatus('error')
        return
      }
      setStatus('success')
      setName(''); setEmail(''); setCabinet(''); setMessage('')
    } catch {
      setErrorKey('send')
      setStatus('error')
    }
  }

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* sec-head */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-3">
            {c.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-5xl text-w-900 mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {c.title}
          </h1>
          <p className="text-w-700 text-base leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* 2 cols : formulaire (gauche) / infos + carte empilées (droite) */}
        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* === COL GAUCHE : FORMULAIRE === */}
          <div className="bg-surface border border-w-100 rounded-2xl p-7">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl text-w-900 mb-3" style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 400 }}>
                  {f.successTitle}
                </h3>
                <p className="text-sm text-w-700">{f.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot — invisible aux humains, piégeant les bots */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                />

                <div>
                  <label htmlFor="ct-name" className="block text-xs font-semibold uppercase tracking-wider text-w-900 mb-1.5">
                    {f.nameLabel}
                  </label>
                  <input id="ct-name" type="text" required maxLength={120}
                    value={name} onChange={e => setName(e.target.value)}
                    placeholder={f.namePlaceholder} disabled={status === 'sending'}
                    className="w-full border border-w-200 rounded-[10px] px-4 py-2.5 text-sm text-w-900 placeholder:text-w-300 focus:border-gold focus:ring-2 focus:ring-gold-50 outline-none transition-all disabled:bg-w-50" />
                </div>

                <div>
                  <label htmlFor="ct-email" className="block text-xs font-semibold uppercase tracking-wider text-w-900 mb-1.5">
                    {f.emailLabel}
                  </label>
                  <input id="ct-email" type="email" required maxLength={200}
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={f.emailPlaceholder} disabled={status === 'sending'}
                    className="w-full border border-w-200 rounded-[10px] px-4 py-2.5 text-sm text-w-900 placeholder:text-w-300 focus:border-gold focus:ring-2 focus:ring-gold-50 outline-none transition-all disabled:bg-w-50" />
                </div>

                <div>
                  <label htmlFor="ct-cabinet" className="block text-xs font-semibold uppercase tracking-wider text-w-900 mb-1.5">
                    {f.cabinetLabel}
                  </label>
                  <input id="ct-cabinet" type="text" maxLength={160}
                    value={cabinet} onChange={e => setCabinet(e.target.value)}
                    placeholder={f.cabinetPlaceholder} disabled={status === 'sending'}
                    className="w-full border border-w-200 rounded-[10px] px-4 py-2.5 text-sm text-w-900 placeholder:text-w-300 focus:border-gold focus:ring-2 focus:ring-gold-50 outline-none transition-all disabled:bg-w-50" />
                </div>

                <div>
                  <label htmlFor="ct-message" className="block text-xs font-semibold uppercase tracking-wider text-w-900 mb-1.5">
                    {f.messageLabel}
                  </label>
                  <textarea id="ct-message" required rows={5} maxLength={4000}
                    value={message} onChange={e => setMessage(e.target.value)}
                    placeholder={f.messagePlaceholder} disabled={status === 'sending'}
                    className="w-full border border-w-200 rounded-[10px] px-4 py-2.5 text-sm text-w-900 placeholder:text-w-300 focus:border-gold focus:ring-2 focus:ring-gold-50 outline-none transition-all disabled:bg-w-50 resize-none" />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {errorKey === 'invalid' ? f.errorInvalid : f.errorSend}
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  className="w-full px-6 py-3 bg-gold text-w-0 text-sm font-semibold rounded-[10px] hover:bg-gold-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'sending' ? f.sending : f.submit}
                </button>
              </form>
            )}
          </div>

          {/* === COL DROITE : INFOS + CARTE empilées === */}
          <div className="space-y-6">
            <div className="bg-surface border border-w-100 rounded-2xl p-7">
              <dl className="space-y-5">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-w-500 mb-1">{c.companyLabel}</dt>
                  <dd className="text-sm font-semibold text-w-900">{COMPANY.legalName}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-w-500 mb-1">{c.addressLabel}</dt>
                  <dd className="text-sm text-w-700 leading-relaxed">{COMPANY.address}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-w-500 mb-1">{c.emailLabel}</dt>
                  <dd className="text-sm">
                    <a href={`mailto:${t.footer.email}`} className="text-gold-dark hover:underline">
                      {t.footer.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-w-500 mb-1">{c.regLabel}</dt>
                  <dd className="text-xs tabular-nums text-w-500">{COMPANY.registrationNumber}</dd>
                </div>
              </dl>
            </div>

            {/* Google Maps embed N&B → hover repasse en couleur (cohérent maquette) */}
            <div>
              <iframe
                src={GMAPS_EMBED}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="contact-map rounded-xl border border-w-100"
                title={c.mapCaption}
              />
              <p className="text-xs text-w-500 mt-2">{c.mapCaption}</p>
            </div>
          </div>

        </div>

        {/* CTA espresso bas — complémentaire au form contact (waitlist = early access ≠ question) */}
        <div className="mt-16 bg-espresso text-w-0 rounded-2xl px-8 py-10 text-center">
          <h2 className="text-2xl sm:text-3xl mb-3 leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {c.ctaTitle}
          </h2>
          <p className="text-w-300 text-base mb-8 max-w-xl mx-auto">{c.ctaSubtitle}</p>
          {signupsOpen && (
            <a href={registerUrl}
              className="inline-block px-8 py-3 bg-gold text-w-0 font-semibold rounded-[10px] hover:bg-gold-dark transition-colors shadow-sm">
              {c.ctaButton}
            </a>
          )}
        </div>

      </div>

      <style jsx>{`
        .contact-map {
          filter: grayscale(1) contrast(0.95);
          transition: filter 0.5s ease;
        }
        .contact-map:hover { filter: grayscale(0) contrast(1); }
      `}</style>
    </section>
  )
}

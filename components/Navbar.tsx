'use client'
import { useState } from 'react'
import Link from 'next/link'
import RequestAccessModal from './RequestAccessModal'
import { buildRegisterUrl } from '@/lib/register-url'

type T = Record<string, any>
const LOCALES = [
  { code: 'en' },
  { code: 'th' },
  { code: 'vn' },
]

export default function Navbar({ t, locale }: { t: T; locale: string }) {
  const [menu, setMenu] = useState(false)
  const [reqOpen, setReqOpen] = useState(false)
  const signupsOpen = process.env.NEXT_PUBLIC_SIGNUPS_OPEN === 'true'
  const ctaLabel = signupsOpen ? t.nav.cta : t.privateBeta.navCta
  const ctaHref = buildRegisterUrl(locale, { source: 'navbar' })

  function openModal() {
    setMenu(false)
    setReqOpen(true)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-w-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="flex items-center text-lg">
          <span className="text-w-500" style={{ fontWeight: 300 }}>Nexus</span>
          {' '}
          <span className="text-w-900" style={{ fontWeight: 700 }}>Denta</span>
          <span className="text-gold" style={{ fontWeight: 700 }}>Soft</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href={`/${locale}/features`} className="text-sm text-w-700 hover:text-gold-dark">{t.nav.features}</Link>
          <Link href={`/${locale}/pricing`} className="text-sm text-w-700 hover:text-gold-dark">{t.nav.pricing}</Link>
          <Link href={`/${locale}/blog`} className="text-sm text-w-700 hover:text-gold-dark">{t.nav.blog}</Link>
          <Link href={`/${locale}/contact`} className="text-sm text-w-700 hover:text-gold-dark">{t.nav.contact}</Link>
          <div className="flex border border-w-200 rounded-lg overflow-hidden">
            {LOCALES.map(l => (
              <Link key={l.code} href={`/${l.code}`}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${locale === l.code ? 'bg-gold text-w-0' : 'text-w-700 hover:bg-w-50'}`}>
                {l.code.toUpperCase()}
              </Link>
            ))}
          </div>
          <a href="https://app.nexusdentasoft.com/login" className="text-sm text-w-500 hover:text-gold-dark">{t.nav.login}</a>
          {signupsOpen ? (
            <a href={ctaHref} className="px-4 py-2 bg-gold text-w-0 text-sm font-semibold rounded-lg hover:bg-gold-dark shadow-sm">{ctaLabel}</a>
          ) : (
            <button type="button" onClick={openModal} className="px-4 py-2 bg-gold text-w-0 text-sm font-semibold rounded-lg hover:bg-gold-dark shadow-sm">{ctaLabel}</button>
          )}
        </div>
        <button onClick={() => setMenu(!menu)} className="md:hidden p-2 text-w-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menu ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menu && (
        <div className="md:hidden bg-surface border-t border-w-100 px-6 py-4 space-y-3">
          <Link href={`/${locale}/features`} onClick={() => setMenu(false)} className="block text-sm text-w-700">{t.nav.features}</Link>
          <Link href={`/${locale}/pricing`} onClick={() => setMenu(false)} className="block text-sm text-w-700">{t.nav.pricing}</Link>
          <Link href={`/${locale}/blog`} onClick={() => setMenu(false)} className="block text-sm text-w-700">{t.nav.blog}</Link>
          <Link href={`/${locale}/contact`} onClick={() => setMenu(false)} className="block text-sm text-w-700">{t.nav.contact}</Link>
          <div className="flex gap-2">
            {LOCALES.map(l => (
              <Link key={l.code} href={`/${l.code}`} onClick={() => setMenu(false)}
                className={`px-2.5 py-1 rounded text-xs ${locale === l.code ? 'bg-gold text-w-0' : 'text-w-700 bg-w-100'}`}>{l.code.toUpperCase()}</Link>
            ))}
          </div>
          {signupsOpen ? (
            <a href={ctaHref} onClick={() => setMenu(false)} className="block px-4 py-2 bg-gold text-w-0 text-sm font-semibold rounded-lg text-center">{ctaLabel}</a>
          ) : (
            <button type="button" onClick={openModal} className="block w-full px-4 py-2 bg-gold text-w-0 text-sm font-semibold rounded-lg text-center">{ctaLabel}</button>
          )}
        </div>
      )}
      <RequestAccessModal isOpen={reqOpen} onClose={() => setReqOpen(false)} t={t} locale={locale} />
    </nav>
  )
}

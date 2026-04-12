'use client'
import { useState } from 'react'
import Link from 'next/link'

type T = Record<string, Record<string, string>>
const LOCALES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'vn', label: 'Tiếng Việt', flag: '🇻🇳' },
]

export default function Navbar({ t, locale }: { t: T; locale: string }) {
  const [menu, setMenu] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="flex items-center text-lg">
          <span style={{ fontWeight: 300, color: '#7A8699' }}>Nexus</span>
          {' '}
          <span style={{ fontWeight: 700, color: '#1A2740' }}>Denta</span>
          <span style={{ fontWeight: 700, color: '#2e7df7' }}>Soft</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-gray-600 hover:text-[#0f2744]">{t.nav.features}</a>
          <Link href={`/${locale}/blog`} className="text-sm text-gray-600 hover:text-[#0f2744]">{t.nav.blog}</Link>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            {LOCALES.map(l => (
              <Link key={l.code} href={`/${l.code}`}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${locale === l.code ? 'bg-[#2e7df7] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {l.flag} {l.label}
              </Link>
            ))}
          </div>
          <a href="https://app.nexusdentasoft.com/login" className="text-sm text-gray-500 hover:text-[#0f2744]">{t.nav.login}</a>
          <a href={`https://app.nexusdentasoft.com/register`} className="px-4 py-2 bg-[#2e7df7] text-white text-sm font-semibold rounded-lg hover:bg-blue-600 shadow-sm">{t.nav.cta}</a>
        </div>
        <button onClick={() => setMenu(!menu)} className="md:hidden p-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menu ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menu && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <a href="#features" onClick={() => setMenu(false)} className="block text-sm text-gray-600">{t.nav.features}</a>
          <Link href={`/${locale}/blog`} onClick={() => setMenu(false)} className="block text-sm text-gray-600">{t.nav.blog}</Link>
          <div className="flex gap-2">
            {LOCALES.map(l => (
              <Link key={l.code} href={`/${l.code}`} onClick={() => setMenu(false)}
                className={`px-2.5 py-1 rounded text-xs ${locale === l.code ? 'bg-[#2e7df7] text-white' : 'text-gray-500 bg-gray-100'}`}>{l.flag}</Link>
            ))}
          </div>
          <a href={`https://app.nexusdentasoft.com/register`} className="block px-4 py-2 bg-[#2e7df7] text-white text-sm font-semibold rounded-lg text-center">{t.nav.cta}</a>
        </div>
      )}
    </nav>
  )
}

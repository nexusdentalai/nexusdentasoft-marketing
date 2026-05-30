'use client'
import { useEffect, useRef, useState } from 'react'
import HeroRedesign from './HeroRedesign'
import RequestAccessModal from './RequestAccessModal'
import type { Currency } from '@/lib/pricing-config'

type T = Record<string, any>

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, cls: `transition-all duration-[800ms] ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}` }
}

// Lockin cards — icônes placeholders (emojis) jusqu'aux icônes SVG dédiées.
const LOCKIN_CARDS: Array<{ icon: string; titleKey: string; descKey: string }> = [
  { icon: '⊘', titleKey: 'card1Title', descKey: 'card1Desc' },
  { icon: '⚓', titleKey: 'card2Title', descKey: 'card2Desc' },
  { icon: '✦', titleKey: 'card3Title', descKey: 'card3Desc' },
]

export default function HomePage({ t, locale, currency }: { t: T; locale: string; currency: Currency }) {
  const registerUrl = `https://app.nexusdentasoft.com/register`
  const [reqOpen, setReqOpen] = useState(false)
  const signupsOpen = process.env.NEXT_PUBLIC_SIGNUPS_OPEN === 'true'
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal(), r5 = useReveal()

  return (
    <>
      {/* ── HERO (Lot H1) ─────────────────────────── */}
      <HeroRedesign t={t} currency={currency} onWaitlist={() => setReqOpen(true)} />

      {/* ── A. BANDEAU CITATION ATHIPAN ───────────── */}
      {/* ⚠ Citation nominative codée mais NON-PUBLIABLE sans accord écrit (dormant B-SITE-ATHIPAN-ACCORD). */}
      <section ref={r1.ref} className="bg-surface border-y border-w-100 py-10 px-4">
        <div className={`max-w-2xl mx-auto text-center ${r1.cls}`}>
          <p className="italic text-w-900 text-xl sm:text-2xl leading-snug"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            « {t.quote.text} »
          </p>
          <div className="inline-flex items-center gap-3 mt-5">
            <div className="w-9 h-9 rounded-full bg-espresso text-gold font-bold flex items-center justify-center text-sm">
              DA
            </div>
            <div className="text-left">
              <p className="text-w-900 font-bold text-sm">{t.quote.authorName}</p>
              <p className="text-w-700 text-xs">{t.quote.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── B. LE BASCULEMENT (espresso sombre) ────── */}
      <section id="paradigm" ref={r2.ref} className="bg-espresso text-w-0 py-20 px-4">
        <div className={`max-w-5xl mx-auto ${r2.cls}`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold mb-3">
              {t.paradigm.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl mb-4 leading-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
              {t.paradigm.title}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {t.paradigm.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">

            {/* Colonne "Les autres PMS" */}
            <div className="rounded-xl p-6 border"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#8a7d60' }}>
                {t.paradigm.themLabel}
              </h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <span className="mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>—</span>
                    <span>{t.paradigm[`them${i}`]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne "NexusDentaSoft" */}
            <div className="rounded-xl p-6 bg-surface text-w-900">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-gold-dark">
                {t.paradigm.usLabel}
              </h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-gold-dark font-bold mt-0.5">✓</span>
                    <span>{t.paradigm[`us${i}`]}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── C. LE VERROUILLAGE STRATÉGIQUE (clair warm) ─ */}
      <section id="lockin" ref={r3.ref} className="bg-w-25 py-20 px-4">
        <div className={`max-w-5xl mx-auto ${r3.cls}`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-3">
              {t.lockin.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl text-w-900 mb-4 leading-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
              {t.lockin.title}
            </h2>
            <p className="text-w-700 text-base leading-relaxed">
              {t.lockin.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {LOCKIN_CARDS.map((c, i) => (
              <div key={i} className="bg-surface border border-w-100 rounded-2xl p-6"
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-gold-dark text-lg font-bold"
                  style={{ backgroundColor: 'var(--gold-bg)' }}>
                  {c.icon}
                </div>
                <h3 className="text-base font-bold text-w-900 mb-2">{t.lockin[c.titleKey]}</h3>
                <p className="text-sm text-w-700 leading-relaxed">{t.lockin[c.descKey]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA bottom — Lot H3 (à refondre, navy temporaire) ─ */}
      <section className="py-28 px-4 bg-[#0f2744] relative overflow-hidden" ref={r4.ref}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2e7df7]/5 to-transparent pointer-events-none" />
        <div className={`max-w-3xl mx-auto text-center relative z-10 ${r4.cls}`}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {signupsOpen ? t.cta.title : t.privateBeta.ctaBottomTitle}
          </h2>
          <p className="text-base text-white/40 mb-10">
            {signupsOpen ? t.cta.subtitle : t.privateBeta.ctaBottomSubtitle}
          </p>
          {signupsOpen ? (
            <a href={registerUrl}
              className="group relative inline-block px-10 py-4 bg-gradient-to-r from-[#2e7df7] to-[#1a6ee8] text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.03] transition-all duration-300">
              <span className="relative z-10">{t.cta.button}</span>
            </a>
          ) : (
            <button type="button" onClick={() => setReqOpen(true)}
              className="group relative inline-block px-10 py-4 bg-gradient-to-r from-[#2e7df7] to-[#1a6ee8] text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.03] transition-all duration-300">
              <span className="relative z-10">{t.privateBeta.ctaBottomButton}</span>
            </button>
          )}
          {!signupsOpen && (
            <p className="text-xs text-white/30 mt-8 max-w-lg mx-auto leading-relaxed">
              {t.privateBeta.bottomLimitedAccess}
            </p>
          )}
        </div>
      </section>

      {/* ── FOOTER inline — Lot H3 (à consolider vers Footer.tsx, navy temporaire) ─ */}
      <footer className="py-12 px-4 bg-[#060e1a] border-t border-white/[0.04]" ref={r5.ref}>
        <div className={`max-w-5xl mx-auto ${r5.cls}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center text-sm">
              <span style={{ fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>Nexus</span>
              {' '}
              <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Denta</span>
              <span style={{ fontWeight: 700, color: '#2e7df7' }}>Soft</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-white/25">
              <span>&copy; 2026 NexusDentaSoft</span>
              <span>Bangkok, Thailand 🇹🇭</span>
              <a href="mailto:hello@nexusdentasoft.com" className="hover:text-white/50 transition-colors">hello@nexusdentasoft.com</a>
            </div>
          </div>
        </div>
      </footer>

      <RequestAccessModal isOpen={reqOpen} onClose={() => setReqOpen(false)} t={t} locale={locale} />

      {/* Structured data SEO (préservé verbatim — featureList générique cohérent avec positioning copilote) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'NexusDentaSoft',
        applicationCategory: 'MedicalApplication',
        operatingSystem: 'Web',
        url: 'https://www.nexusdentasoft.com',
        description: "The world's first free AI-powered dental PMS for Southeast Asia.",
        featureList: ['Built-in AI Assistant', 'Free Forever', 'Thai Language Support', 'Vietnamese Language Support', 'Appointment Management', 'Patient Records', 'Billing & Payments'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }) }} />
    </>
  )
}

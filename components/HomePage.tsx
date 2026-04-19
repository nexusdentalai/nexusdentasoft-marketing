'use client'
import { useEffect, useRef, useState } from 'react'
import { Calendar, FileText, ClipboardList, CreditCard, Users, Globe } from 'lucide-react'
import HeroRedesign from './HeroRedesign'
import RequestAccessModal from './RequestAccessModal'

type T = Record<string, any>

const FEATURES = [
  { icon: Calendar, k: 'scheduling', emoji: '📅' },
  { icon: FileText, k: 'records', emoji: '📋' },
  { icon: ClipboardList, k: 'plans', emoji: '🦷' },
  { icon: CreditCard, k: 'payments', emoji: '💳' },
  { icon: Users, k: 'roles', emoji: '👥' },
  { icon: Globe, k: 'multilingual', emoji: '🌏' },
]

const STAT_ICONS = ['🆓', '🤖', '📱', '🔐']

const TESTIMONIALS = [
  { ini: 'SP', color: '#2e7df7', name: 'Dr. Somchai P.', loc: 'Bangkok, Thailand' },
  { ini: 'NL', color: '#10b981', name: 'Dr. Nguyen L.', loc: 'Ho Chi Minh, Vietnam' },
  { ini: 'YT', color: '#f59e0b', name: 'Dr. Yamada T.', loc: 'Osaka, Japan' },
]

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

export default function HomePage({ t, locale }: { t: T; locale: string }) {
  const registerUrl = `https://app.nexusdentasoft.com/register`
  const [reqOpen, setReqOpen] = useState(false)
  const signupsOpen = process.env.NEXT_PUBLIC_SIGNUPS_OPEN === 'true'
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal(), r5 = useReveal()

  return (
    <>
      {/* ── HERO (redesigned) ────────────────────── */}
      <HeroRedesign t={t} locale={locale} />

      {/* ── FEATURES ──────────────────────────────── */}
      <section id="features" className="py-24 px-4 bg-[#0b1d33]" ref={r1.ref}>
        <div className={`max-w-5xl mx-auto ${r1.cls}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {t.features.title}
            </h2>
            <p className="text-sm text-white/40 mt-4 max-w-lg mx-auto">{t.features.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.k}
                className="group bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="w-10 h-10 rounded-xl bg-[#2e7df7]/15 flex items-center justify-center mb-4 group-hover:bg-[#2e7df7]/25 transition-colors duration-300">
                  <span className="text-lg">{f.emoji}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{t.features[f.k]}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{t.features[f.k + 'Desc']}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FREE ──────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0f2744] relative" ref={r2.ref}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2e7df7]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className={`max-w-4xl mx-auto relative z-10 ${r2.cls}`}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-14 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {t.whyFree.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(['growing', 'noFees', 'builtForSea'] as const).map((k, i) => (
              <div key={k} className="text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">{['🚀', '🎁', '🌏'][i]}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{t.whyFree[k]}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{t.whyFree[k + 'Desc']}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────── */}
      <section className="py-24 px-4 bg-[#0b1d33]" ref={r3.ref}>
        <div className={`max-w-5xl mx-auto ${r3.cls}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Early practitioners
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((tm, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: tm.color + '30', border: `1px solid ${tm.color}40` }}>
                    {tm.ini}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{tm.name}</p>
                    <p className="text-[10px] text-white/40">{tm.loc}</p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 bg-[#2e7df7]/15 border border-[#2e7df7]/20 text-[#2e7df7] text-[9px] font-bold rounded-full">Beta</span>
                </div>
                <p className="text-xs text-white/30 italic">[Beta testimonial coming soon]</p>
                <div className="text-yellow-400/60 text-sm mt-3">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
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

      {/* ── FOOTER ────────────────────────────────── */}
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

      {/* Structured data */}
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

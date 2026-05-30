'use client'
import { useState } from 'react'
import RequestAccessModal from './RequestAccessModal'

type T = Record<string, any>

type MomentKey = 'moment1' | 'moment2' | 'moment3' | 'moment4' | 'moment5' | 'moment6'

const MOMENTS: Array<{ key: MomentKey; emoji: string }> = [
  { key: 'moment1', emoji: '☀️' },
  { key: 'moment2', emoji: '🦷' },
  { key: 'moment3', emoji: '💬' },
  { key: 'moment4', emoji: '🛡️' },
  { key: 'moment5', emoji: '📦' },
  { key: 'moment6', emoji: '📊' },
]

export default function Features({
  t, locale, signupsOpen, registerUrl,
}: {
  t: T
  locale: string
  signupsOpen: boolean
  registerUrl: string
}) {
  const [reqOpen, setReqOpen] = useState(false)
  const f = t.features

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* === A. HERO === */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-3">
            {f.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-5xl text-w-900 mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {f.title}
          </h1>
          <p className="text-w-700 text-base sm:text-lg leading-relaxed">{f.subtitle}</p>
        </div>

        {/* === B. LES 6 MOMENTS (zigzag desktop, stack mobile) === */}
        <div className="space-y-16 sm:space-y-20 mb-20">
          {MOMENTS.map((m, i) => {
            const momentT = f[m.key]
            const reversed = i % 2 === 1
            return (
              <div key={m.key} className="grid md:grid-cols-2 gap-8 items-center">

                {/* Texte — ordre conditionnel desktop pour zigzag */}
                <div className={reversed ? 'md:order-2' : 'md:order-1'}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold text-w-0 text-sm font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-w-500">
                      {momentT.label} · <span className="tabular-nums">{momentT.time}</span>
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-w-900 mb-3 leading-tight"
                    style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
                    {momentT.title}
                  </h2>
                  <p className="text-w-700 text-base leading-relaxed mb-5">{momentT.desc}</p>
                  <ul className="space-y-2">
                    {[momentT.point1, momentT.point2, momentT.point3].map((p: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-w-700">
                        <span className="text-gold-dark font-bold mt-0.5">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visuel — emoji grand format sur fond warm subtil, alterné */}
                <div className={reversed ? 'md:order-1' : 'md:order-2'}>
                  <div className="bg-surface border border-w-100 rounded-2xl flex items-center justify-center h-56 sm:h-64 moment-visual">
                    <span className="text-7xl sm:text-8xl" style={{ filter: 'saturate(0.85)' }}>{m.emoji}</span>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* === C. DIFFÉRENCIATEUR (fond espresso, comme la home) === */}
        <div className="bg-espresso text-w-0 rounded-2xl px-8 py-14 mb-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            {f.differentiatorEyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl mb-6 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {f.differentiatorTitle}
          </h2>
          <p className="text-w-300 text-base leading-relaxed max-w-3xl mx-auto">
            {f.differentiator}
          </p>
        </div>

        {/* === D. CTA BOTTOM === */}
        <div className="bg-espresso text-w-0 rounded-2xl px-8 py-10 text-center">
          <h2 className="text-2xl sm:text-3xl mb-3 leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {f.ctaTitle}
          </h2>
          <p className="text-w-300 text-base mb-8 max-w-xl mx-auto">{f.ctaSubtitle}</p>
          {signupsOpen ? (
            <a href={registerUrl}
              className="inline-block px-8 py-3 bg-gold text-w-0 font-semibold rounded-[10px] hover:bg-gold-dark transition-colors shadow-sm">
              {f.ctaButton}
            </a>
          ) : (
            <button type="button" onClick={() => setReqOpen(true)}
              className="inline-block px-8 py-3 bg-gold text-w-0 font-semibold rounded-[10px] hover:bg-gold-dark transition-colors shadow-sm">
              {f.ctaButton}
            </button>
          )}
        </div>

      </div>

      <RequestAccessModal isOpen={reqOpen} onClose={() => setReqOpen(false)} t={t} locale={locale} />

      <style jsx>{`
        .moment-visual {
          transition: transform 0.35s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s cubic-bezier(.2,.7,.2,1);
        }
        .moment-visual:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(184, 133, 47, 0.15);
        }
      `}</style>
    </section>
  )
}

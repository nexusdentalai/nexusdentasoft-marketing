'use client'
import type { Currency } from '@/lib/pricing-config'
import { buildRegisterUrl } from '@/lib/register-url'

type T = Record<string, any>

// Mock data interne — contenu démonstratif des 3 cartes PMS. Strings EN par défaut,
// hardcodées (les chiffres/labels servent à montrer le produit, pas à être traduits).
const PLANNING_EVENTS: Array<{ time: string; label: string; tone: 'gold' | 'warm' }> = [
  { time: '09:00', label: 'Scaling · Mrs Suda',       tone: 'gold' },
  { time: '10:30', label: 'Implant · Mr Chai',        tone: 'warm' },
  { time: '13:00', label: 'Check-up · Ms Mai',        tone: 'gold' },
  { time: '15:00', label: 'Whitening · Mr Anan',      tone: 'warm' },
  { time: '16:30', label: 'Ortho follow-up · Niran',  tone: 'gold' },
]
const DASHBOARD_STATS = [
  { label: 'Patients this month',    value: '142' },
  { label: 'Occupancy rate',         value: '87%' },
  { label: 'Appointments this week', value: '38'  },
]
const BAR_HEIGHTS = [40, 60, 50, 95, 70, 55, 45]  // index 3 (pic) = gold

export default function HeroRedesign({
  t, locale, currency,
}: { t: T; locale: string; currency: Currency }) {
  const registerUrl = buildRegisterUrl(locale, { plan: 'free', source: 'hero' })
  const signupsOpen = process.env.NEXT_PUBLIC_SIGNUPS_OPEN === 'true'

  return (
    // data-currency : prop drillée depuis page.tsx (résolution serveur). Pas
    // utilisée visuellement ce tour — préparation Phase 3b pricing.
    <section data-currency={currency} className="bg-w-25 pt-20 pb-20 px-4">
      <div className="max-w-5xl mx-auto text-center hero-fade">

        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-full mb-8"
          style={{ backgroundColor: 'var(--gold-bg)' }}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
            {t.hero.badge}
          </span>
        </div>

        {/* H1 — fragment normal + accent gold italic */}
        <h1 className="text-w-900 text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.1] mb-6 max-w-3xl mx-auto"
          style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
          {t.hero.h1a}{' '}
          <span className="text-gold-dark italic">{t.hero.h1accent}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-w-700 text-base sm:text-lg leading-relaxed mb-10 max-w-[580px] mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {t.hero.subtitle}
        </p>

        {/* Double CTA centré */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {signupsOpen && (
            <a href={registerUrl}
              className="px-7 py-3 bg-gold text-w-0 text-sm font-semibold rounded-[10px] hover:bg-gold-dark transition-colors shadow-sm">
              {t.hero.cta}
            </a>
          )}
          <a href="#features"
            className="px-7 py-3 bg-surface text-w-900 border border-w-200 text-sm font-medium rounded-[10px] hover:border-gold hover:text-gold-dark transition-all">
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* Réassurance 3 items */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-16 text-w-500 text-[13px]">
          {[t.hero.reassure1, t.hero.reassure2, t.hero.reassure3].map((r, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-gold-dark font-bold">✓</span>
              <span>{r}</span>
            </div>
          ))}
        </div>

        {/* 3 CARTES PMS */}
        <div className="grid sm:grid-cols-3 gap-5">

          {/* Carte 1 — Planning */}
          <div className="bg-surface border border-w-100 rounded-2xl p-5 text-left hero-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <span className="text-sm font-semibold text-w-900">{t.hero.cardPlanning}</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-espresso text-w-0">
                {t.hero.aiPill}
              </span>
            </div>
            <div className="space-y-1.5">
              {PLANNING_EVENTS.map((ev, i) => {
                const gold = ev.tone === 'gold'
                return (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <span className="text-w-500 tabular-nums w-10 shrink-0">{ev.time}</span>
                    <div className={`flex-1 px-2 py-1.5 rounded border-l-[3px] text-w-900 ${gold ? 'bg-gold-50 border-gold' : 'bg-w-50 border-w-300'}`}>
                      {ev.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Carte 2 — Comptabilité */}
          <div className="bg-surface border border-w-100 rounded-2xl p-5 text-left hero-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                <span className="text-sm font-semibold text-w-900">{t.hero.cardCompta}</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-espresso text-w-0">
                {t.hero.aiPill}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="rounded-lg p-2.5 bg-w-25">
                <p className="text-[9px] uppercase tracking-wide text-w-500">Collected revenue</p>
                <p className="text-base font-bold tabular-nums text-w-900">฿120,000</p>
              </div>
              <div className="rounded-lg p-2.5 bg-w-25">
                <p className="text-[9px] uppercase tracking-wide text-w-500">Net profit</p>
                <p className="text-base font-bold tabular-nums text-gold-dark">฿44,700</p>
              </div>
            </div>
            <div className="rounded-lg p-2.5 bg-espresso text-w-0 text-[10px] leading-relaxed">
              <span className="text-gold mr-1">✦</span>
              Overhead 62.8 % — within norm. Watch ฿30,000 in receivables.
            </div>
          </div>

          {/* Carte 3 — Tableau de bord */}
          <div className="bg-surface border border-w-100 rounded-2xl p-5 text-left hero-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧠</span>
                <span className="text-sm font-semibold text-w-900">{t.hero.cardDashboard}</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-espresso text-w-0">
                {t.hero.aiPill}
              </span>
            </div>
            <div className="space-y-2 mb-3">
              {DASHBOARD_STATS.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-w-700">{s.label}</span>
                  <span className="font-bold tabular-nums text-w-900">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-1 h-12 pt-2 border-t border-w-100">
              {BAR_HEIGHTS.map((h, i) => (
                <div key={i} className={`flex-1 rounded-t ${i === 3 ? 'bg-gold' : 'bg-w-100'}`}
                  style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .hero-fade { animation: heroFadeIn 0.7s ease-out both; }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-card { transition: transform 0.35s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s cubic-bezier(.2,.7,.2,1); }
        .hero-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 24px 48px rgba(184, 133, 47, 0.18);
        }
      `}</style>
    </section>
  )
}

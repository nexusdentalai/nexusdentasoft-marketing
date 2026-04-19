'use client'
import { useState } from 'react'
import RequestAccessModal from './RequestAccessModal'

type T = Record<string, any>

const STAT_ITEMS = [
  { k: 'free', icon: '🆓' },
  { k: 'multilang', icon: '🌐' },
  { k: 'fdi', icon: '🦷' },
  { k: 'promptpay', icon: '🔐' },
]

const CALENDAR_EVENTS = [
  { top: '12%', h: '18%', bg: '#DBEAFE', border: '#1D4ED8', label: 'Dr. Somchai — Implant', time: '09:00' },
  { top: '34%', h: '14%', bg: '#EFF6FF', border: '#2563EB', label: 'Dr. Malee — Cleaning', time: '10:30' },
  { top: '52%', h: '20%', bg: '#E2E8F0', border: '#334155', label: 'Dr. Wanchai — Ortho', time: '13:00' },
  { top: '76%', h: '16%', bg: '#BFDBFE', border: '#1E40AF', label: 'Dr. Somchai — Crown', time: '15:00' },
]

export default function HeroRedesign({ t, locale }: { t: T; locale: string }) {
  const registerUrl = `https://app.nexusdentasoft.com/register`
  const [reqOpen, setReqOpen] = useState(false)
  const signupsOpen = process.env.NEXT_PUBLIC_SIGNUPS_OPEN === 'true'

  return (
    <section className="bg-[#F5F6F8] pt-20 pb-16 sm:pt-24 sm:pb-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text ────────────────────────── */}
          <div style={{ animation: 'heroFadeIn 0.7s ease-out both' }}>
            {/* Eyebrow */}
            {signupsOpen ? (
              <div className="flex items-center gap-3 mb-6" style={{ animation: 'heroFadeIn 0.6s ease-out 0.05s both' }}>
                <div className="w-5 h-[1px] bg-[#2563EB]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
                  Free Forever · AI-Powered
                </span>
              </div>
            ) : (
              <div className="mb-6" style={{ animation: 'heroFadeIn 0.6s ease-out 0.05s both' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-[1px] bg-[#2563EB]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2563EB]">
                    🔒 {t.privateBeta.badge}
                  </span>
                </div>
                <p className="text-[10px] text-[#7A8699]/70 tracking-wider pl-8 uppercase font-medium">
                  {t.privateBeta.eyebrowFallback}
                </p>
              </div>
            )}

            {/* Headline */}
            <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.15] mb-6 text-[#1A2740]"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, animation: 'heroFadeIn 0.7s ease-out 0.1s both' }}>
              {t.hero.h1}
            </h1>

            {/* Subtitle */}
            <p className="text-[15px] sm:text-base text-[#7A8699] leading-relaxed mb-8 max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, animation: 'heroFadeIn 0.7s ease-out 0.15s both' }}>
              {signupsOpen ? t.hero.subtitle : t.privateBeta.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10" style={{ animation: 'heroFadeIn 0.7s ease-out 0.2s both' }}>
              {signupsOpen ? (
                <a href={registerUrl}
                  className="px-7 py-3 bg-[#2563EB] text-white text-sm font-medium rounded-[10px] hover:bg-[#1B3A6B] transition-colors duration-200 shadow-sm">
                  {t.hero.cta}
                </a>
              ) : (
                <button type="button" onClick={() => setReqOpen(true)}
                  className="px-7 py-3 bg-[#2563EB] text-white text-sm font-medium rounded-[10px] hover:bg-[#1B3A6B] transition-colors duration-200 shadow-sm">
                  {t.privateBeta.ctaPrimary}
                </button>
              )}
              <a href="#features"
                className="px-7 py-3 text-[#7A8699] text-sm font-medium rounded-[10px] border border-[#C8D0DC] hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200 bg-transparent">
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Stats pills */}
            <div className="flex flex-wrap gap-2" style={{ animation: 'heroFadeIn 0.7s ease-out 0.25s both' }}>
              {STAT_ITEMS.map(s => (
                <div key={s.k} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#C8D0DC] rounded-full">
                  <span className="text-xs">{s.icon}</span>
                  <span className="text-[11px] text-[#7A8699] font-medium">{t.stats[s.k]}</span>
                </div>
              ))}
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-3 mt-8" style={{ animation: 'heroFadeIn 0.7s ease-out 0.3s both' }}>
              <div className="flex -space-x-2">
                {['#2563EB', '#1E40AF', '#334155', '#60A5FA'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#F5F6F8] flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ backgroundColor: c }}>
                    {['SP', 'NL', 'MD', 'YT'][i]}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-[#7A8699]">Trusted by clinics across SEA</span>
            </div>
          </div>

          {/* ── RIGHT: App mockup ─────────────────── */}
          <div className="relative" style={{ animation: 'heroSlideUp 0.8s ease-out 0.15s both' }}>
            {/* Main frame */}
            <div className="bg-white rounded-2xl border border-[#DDE3EE] overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(26,39,64,0.08)' }}>
              {/* Title bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#EEF1F6]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD93D]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6BCB77]/60" />
                </div>
                <span className="text-[10px] text-[#B0B8C9] font-mono">app.nexusdentasoft.com</span>
                <div className="w-16" />
              </div>

              {/* Calendar grid */}
              <div className="flex">
                {/* Time column */}
                <div className="w-14 py-3 border-r border-[#EEF1F6] flex-shrink-0">
                  {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(t => (
                    <div key={t} className="h-8 flex items-start justify-end pr-2">
                      <span className="text-[8px] text-[#B0B8C9]">{t}</span>
                    </div>
                  ))}
                </div>

                {/* Events area */}
                <div className="flex-1 relative h-72 sm:h-80">
                  {/* Hour lines */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="absolute left-0 right-0 border-t border-[#F0F2F7]" style={{ top: `${(i / 9) * 100}%` }} />
                  ))}

                  {/* Events */}
                  {CALENDAR_EVENTS.map((ev, i) => (
                    <div key={i}
                      className="absolute left-2 right-2 rounded-lg px-2.5 py-1.5 border-l-[3px] overflow-hidden"
                      style={{
                        top: ev.top, height: ev.h,
                        backgroundColor: ev.bg, borderLeftColor: ev.border,
                        animation: `calEvent 0.5s ease-out ${0.3 + i * 0.1}s both`,
                      }}>
                      <p className="text-[9px] font-semibold text-[#1A2740] truncate">{ev.label}</p>
                      <p className="text-[8px] text-[#7A8699]">{ev.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-3.5 py-2 bg-[#1B3A6B] rounded-xl shadow-lg"
              style={{ animation: 'heroBob 3s ease-in-out infinite' }}>
              <p className="text-[10px] font-semibold text-[#B8D4F0]">🤖 AI Briefing</p>
              <p className="text-[8px] text-[#B8D4F0]/60">Ready in 2 min</p>
            </div>

            {/* Floating badge — bottom left */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 px-3.5 py-2 bg-white border border-[#DDE3EE] rounded-xl shadow-lg"
              style={{ animation: 'heroBob 3s ease-in-out 1.5s infinite' }}>
              <p className="text-[10px] font-semibold text-[#1A2740]">📱 LINE Reminder</p>
              <p className="text-[8px] text-[#7A8699]">Sent · Confirmed ✓</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes calEvent {
          from { opacity: 0; transform: scaleY(0.5); transform-origin: top; }
          to { opacity: 1; transform: scaleY(1); }
        }
        @keyframes heroBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
      <RequestAccessModal isOpen={reqOpen} onClose={() => setReqOpen(false)} t={t} locale={locale} />
    </section>
  )
}

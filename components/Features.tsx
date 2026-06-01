'use client'

type T = Record<string, any>

type MomentKey = 'moment1' | 'moment2' | 'moment3' | 'moment4' | 'moment5' | 'moment6'

const MOMENTS: MomentKey[] = ['moment1', 'moment2', 'moment3', 'moment4', 'moment5', 'moment6']

// ── Mini-mockups HTML/CSS ──────────────────────────────────────────────────
// Style cohérent avec les 3 cartes PMS du Hero (bg-surface border-w-100 rounded-2xl,
// pastille "✦ AI" espresso, accents gold). Aucun emoji.

function MockBriefing() {
  const rows = [
    { who: 'Mrs. Suda · 09:00', tag: 'Allergy',     tone: 'danger' as const },
    { who: 'Mr. Chai · 09:30',  tag: 'Plan -10w',   tone: 'gold'   as const },
    { who: 'Ms. Mai · 10:00',   tag: '',            tone: 'none'   as const },
    { who: 'Mr. Anan · 10:30',  tag: 'New patient', tone: 'gold'   as const },
  ]
  return (
    <div className="bg-surface border border-w-100 rounded-2xl p-5 moment-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-w-900">Morning briefing</div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-espresso text-w-0">✦ AI</span>
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between text-[11px]">
            <span className="text-w-700 tabular-nums">{r.who}</span>
            {r.tag && (
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                r.tone === 'danger' ? 'bg-red-50 text-red-700' : 'bg-gold-50 text-gold-dark'
              }`}>{r.tag}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function MockCharting() {
  const teeth = [18, 17, 16, 15, 14, 13, 12, 11]
  return (
    <div className="bg-surface border border-w-100 rounded-2xl p-5 moment-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-w-900">Voice charting · FDI</div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-espresso text-w-0">✦ AI</span>
      </div>
      <div className="flex gap-1 mb-4">
        {teeth.map(t => (
          <div key={t}
            className={`flex-1 h-9 rounded text-[9px] flex items-center justify-center font-bold tabular-nums ${
              t === 16 ? 'bg-gold text-w-0' : 'bg-w-50 text-w-700'
            }`}>
            {t}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] text-w-700">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 rec-dot" />
        <span>Recording → procedure created on <span className="font-semibold text-gold-dark">#16</span></span>
      </div>
    </div>
  )
}

function MockComms() {
  return (
    <div className="bg-surface border border-w-100 rounded-2xl p-5 moment-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-w-900">LINE · Mr. Chai</div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-espresso text-w-0">✦ AI</span>
      </div>
      <div className="space-y-2">
        <div className="bg-w-50 rounded-lg px-3 py-2 text-[10px] text-w-700 max-w-[80%]">
          Can I reschedule my appointment?
        </div>
        <div className="ml-auto bg-gold-50 border border-gold rounded-lg px-3 py-2 text-[10px] text-w-900 max-w-[80%]">
          <span className="font-semibold text-gold-dark">AI draft:</span> Sure — Thursday 14:00 is open. Confirm?
        </div>
        <div className="flex justify-end pt-1">
          <button type="button" className="bg-gold text-w-0 px-3 py-1 rounded text-[10px] font-semibold">
            Validate
          </button>
        </div>
      </div>
    </div>
  )
}

function MockAudit() {
  const items = [
    'Procedure without diagnosis · #16',
    'Plan abandoned · 10 weeks',
    'Off-scale pricing · Mrs S.',
  ]
  return (
    <div className="bg-surface border border-w-100 rounded-2xl p-5 moment-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-w-900">Daily audit</div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-espresso text-w-0">✦ AI</span>
      </div>
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-gold-dark tabular-nums leading-none">7</div>
        <div className="text-[9px] uppercase tracking-wider text-w-500 mt-1">anomalies detected</div>
      </div>
      <ul className="space-y-1.5 text-[10px] text-w-700">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MockStock() {
  const items = [
    { label: 'Anesthesia 4%',   level: 70, reorder: false },
    { label: 'Composite A2',    level: 22, reorder: true  },
    { label: 'Gloves M',        level: 55, reorder: false },
  ]
  return (
    <div className="bg-surface border border-w-100 rounded-2xl p-5 moment-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-w-900">Stock · auto-reorder</div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-espresso text-w-0">✦ AI</span>
      </div>
      <div className="space-y-3 mb-4">
        {items.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-w-700">{s.label}</span>
              {s.reorder && <span className="text-gold-dark font-semibold">Auto-reorder</span>}
            </div>
            <div className="h-1.5 bg-w-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${s.reorder ? 'bg-gold' : 'bg-w-300'}`}
                style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="text-[9px] text-w-500 italic border-t border-w-100 pt-2">
        Director coach · weekly review on Monday
      </div>
    </div>
  )
}

function MockAccounting() {
  return (
    <div className="bg-surface border border-w-100 rounded-2xl p-5 moment-card">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-w-900">Cash-flow · 3 months</div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-espresso text-w-0">✦ AI</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg p-2 bg-w-25">
          <div className="text-[9px] uppercase tracking-wide text-w-500">Net profit</div>
          <div className="text-base font-bold tabular-nums text-gold-dark">฿44.7k</div>
        </div>
        <div className="rounded-lg p-2 bg-w-25">
          <div className="text-[9px] uppercase tracking-wide text-w-500">Forecast +3m</div>
          <div className="text-base font-bold tabular-nums text-w-900">฿128k</div>
        </div>
      </div>
      <svg viewBox="0 0 200 50" preserveAspectRatio="none" className="w-full h-12">
        <polyline
          fill="none"
          strokeWidth="2"
          points="0,40 30,32 60,35 90,28 120,22 150,18 180,12 200,8"
          style={{ stroke: 'var(--w-300)' }}
        />
        <circle cx="180" cy="12" r="3.5" style={{ fill: 'var(--gold)' }} />
      </svg>
      <div className="text-[9px] text-w-500 text-right -mt-1">forecast peak</div>
    </div>
  )
}

const MOCKUPS = [MockBriefing, MockCharting, MockComms, MockAudit, MockStock, MockAccounting]

export default function Features({
  t, locale, signupsOpen, registerUrl,
}: {
  t: T
  locale: string
  signupsOpen: boolean
  registerUrl: string
}) {
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
        <div className="space-y-20 sm:space-y-24 mb-20">
          {MOMENTS.map((key, i) => {
            const m = f[key]
            const reversed = i % 2 === 1
            const Mockup = MOCKUPS[i]
            const feats = [m.feat1, m.feat2, m.feat3, m.feat4]
            return (
              <div key={key} className="grid md:grid-cols-2 gap-10 items-center">

                {/* Texte */}
                <div className={reversed ? 'md:order-2' : 'md:order-1'}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold text-w-0 text-sm font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-w-500">
                      {m.label} · <span className="tabular-nums">{m.time}</span>
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-w-900 mb-4 leading-tight"
                    style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
                    {m.title}
                  </h2>
                  <p className="text-w-700 text-base leading-relaxed mb-6 italic">{m.context}</p>
                  <ul className="space-y-3 mb-6">
                    {feats.map((ft: { name: string; desc: string }, j: number) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-gold-dark font-bold mt-0.5 shrink-0">✓</span>
                        <div>
                          <p className="text-sm font-semibold text-w-900 mb-0.5">{ft.name}</p>
                          <p className="text-sm text-w-700 leading-relaxed">{ft.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--gold-bg)' }}>
                    <span className="text-gold-dark font-bold text-xs">↗</span>
                    <span className="text-xs font-semibold text-gold-dark">{m.gain}</span>
                  </div>
                </div>

                {/* Mockup HTML/CSS */}
                <div className={reversed ? 'md:order-1' : 'md:order-2'}>
                  <Mockup />
                </div>

              </div>
            )
          })}
        </div>

        {/* === C. DIFFÉRENCIATEUR (fond espresso) === */}
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
          {signupsOpen && (
            <a href={registerUrl}
              className="inline-block px-8 py-3 bg-gold text-w-0 font-semibold rounded-[10px] hover:bg-gold-dark transition-colors shadow-sm">
              {f.ctaButton}
            </a>
          )}
        </div>

      </div>

      <style jsx>{`
        .moment-card {
          transition: transform 0.35s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s cubic-bezier(.2,.7,.2,1);
        }
        .moment-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(184, 133, 47, 0.18);
        }
        .rec-dot { animation: recPulse 1.4s ease-in-out infinite; }
        @keyframes recPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.55; transform: scale(0.82); }
        }
      `}</style>
    </section>
  )
}

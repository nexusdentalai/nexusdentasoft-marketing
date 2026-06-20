'use client'
import { useState, useEffect } from 'react'
import type { Currency, PlanId } from '@/lib/pricing-config'
import { formatPrice, formatRegularPrice, hasFounderDiscount, PRICES } from '@/lib/pricing-config'
import { buildRegisterUrl } from '@/lib/register-url'

// Base de l'app (API compteur founder). NEXT_PUBLIC_ → dispo client ; fallback prod.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.nexusdentasoft.com'

// État du compteur fondateur :
//   undefined = en cours de chargement ; null = fetch ÉCHOUÉ ; number = places restantes.
// soldOut (number === 0) → bascule prix NORMAL (plus de barré/lancement, bandeau masqué).
// failed (null) → on GARDE barré+lancement, on masque seulement le chiffre du compteur.
type Seats = number | null | undefined

type T = Record<string, any>

// Ordre VISUEL voulu : Découverte | Premium (centre, featured) | Starter.
// PlanId est en revanche typé selon pricing-config (source unique).
const PLANS: Array<{ id: PlanId; featured?: boolean }> = [
  { id: 'free' },
  { id: 'premium', featured: true },
  { id: 'starter' },
]

type Feature = { text: string; included?: boolean }

export default function Pricing({
  t, locale, currency,
}: {
  t: T
  locale: string
  currency: Currency
}) {
  const signupsOpen = process.env.NEXT_PUBLIC_SIGNUPS_OPEN === 'true'

  // P9-2 : compteur fondateur, lu CÔTÉ CLIENT (valeur dynamique, jamais figée au build).
  const [seats, setSeats] = useState<Seats>(undefined)
  useEffect(() => {
    let cancelled = false
    const ac = new AbortController()
    const timer = setTimeout(() => ac.abort(), 4000)   // timeout dur → fail-safe
    fetch(`${APP_URL}/api/founder/seats`, { signal: ac.signal })
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (cancelled) return
        const n = (d as { seats_remaining?: unknown } | null)?.seats_remaining
        setSeats(typeof n === 'number' ? n : null)   // non-number / null → échec (null)
      })
      .catch(() => { if (!cancelled) setSeats(null) })   // réseau/timeout → échec (null)
      .finally(() => clearTimeout(timer))
    return () => { cancelled = true; ac.abort(); clearTimeout(timer) }
  }, [])

  // soldOut = compteur résolu à 0 → offre fondateur épuisée : prix NORMAL en principal,
  // bandeau masqué. founderActive (tout sauf 0, y compris loading/échec) → barré+lancement.
  const soldOut = seats === 0
  const founderActive = !soldOut
  const seatsKnown = typeof seats === 'number' && seats > 0   // chiffre fiable à afficher

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* sec-head */}
        <div className="text-center max-w-2xl mx-auto mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-3">
            {t.pricing.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-5xl text-w-900 mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {t.pricing.title}
          </h1>
          <p className="text-w-700 text-base leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* note devise détectée */}
        <p className="text-center text-xs text-w-500 mb-6">
          🌐 {t.pricing.currencyNote} <span className="font-semibold text-w-900">{currency}</span>
        </p>

        {/* P9-2 : bandeau fondateur global (gold sur gold-50). Masqué si soldOut.
            Compteur affiché SEULEMENT si chiffre fiable (seatsKnown) — sinon (chargement
            ou échec fetch) on garde le bandeau avec la garantie, sans chiffre figé/trompeur. */}
        {founderActive && (
          <div className="max-w-2xl mx-auto mb-10 rounded-2xl border border-gold/40 bg-gold-50 px-5 py-4 text-center">
            <p className="text-sm font-semibold text-gold-dark">
              {seatsKnown
                ? t.pricing.founderBanner.replace('{n}', String(seats))
                : t.pricing.launchPriceLabel}
            </p>
            <p className="mt-1 text-xs text-w-700 leading-relaxed">{t.pricing.lifetimeGuarantee}</p>
          </div>
        )}

        {/* grille 3 cartes — Premium au centre, featured */}
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map(plan => {
            const planT = t.pricing[plan.id]
            const isFeatured = !!plan.featured
            const isFree = PRICES[plan.id][currency] === 0
            // soldOut → prix NORMAL en principal (offre fondateur épuisée). Sinon → prix
            // lancement, avec le prix normal BARRÉ au-dessus si une remise fondateur existe.
            const priceLabel = isFree
              ? t.pricing.freePrice
              : soldOut
                ? formatRegularPrice(plan.id, currency)
                : formatPrice(plan.id, currency)
            const showStrike = !isFree && founderActive && hasFounderDiscount(plan.id, currency)

            const cardClass = isFeatured
              ? 'relative bg-surface border-2 border-gold rounded-2xl p-7 flex flex-col plan-card plan-featured'
              : 'relative bg-surface border border-w-100 rounded-2xl p-7 flex flex-col plan-card'

            const ctaClass = isFeatured
              ? 'block w-full text-center px-5 py-3 bg-gold text-w-0 font-semibold rounded-[10px] hover:bg-gold-dark transition-colors'
              : 'block w-full text-center px-5 py-3 bg-surface border border-gold text-gold-dark font-semibold rounded-[10px] hover:bg-gold-50 transition-colors'

            const planUrl = buildRegisterUrl(locale, { plan: plan.id, source: 'pricing' })
            const ctaContent = signupsOpen && (
              <a href={planUrl} className={ctaClass}>{planT.cta}</a>
            )

            return (
              <div key={plan.id} className={cardClass}>
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-w-0 text-[10px] font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                    {t.pricing.mostChosen}
                  </span>
                )}
                <h3 className="text-lg font-bold text-w-900 mb-1">{planT.name}</h3>
                <p className="text-sm text-w-700 mb-5">{planT.desc}</p>
                {/* Prix normal BARRÉ (au-dessus) si offre fondateur active + remise existante. */}
                {showStrike && (
                  <p className="text-sm text-w-500 mb-0.5">
                    <span className="line-through tabular-nums">{formatRegularPrice(plan.id, currency)}</span>
                    <span className="ml-1">{t.pricing.regularPriceLabel}</span>
                  </p>
                )}
                <div className="mb-5 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-w-900 tabular-nums">{priceLabel}</span>
                  {!isFree && <span className="text-sm text-w-500">{t.pricing.perMonth}</span>}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {(planT.features as Feature[]).map((feat, i) => {
                    const excluded = feat.included === false
                    return (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        {excluded ? (
                          <span className="text-w-300 font-bold mt-0.5">✕</span>
                        ) : (
                          <span className="text-gold-dark font-bold mt-0.5">✓</span>
                        )}
                        <span className={excluded ? 'text-w-500' : 'text-w-700'}>{feat.text}</span>
                      </li>
                    )
                  })}
                </ul>
                {ctaContent}
              </div>
            )
          })}
        </div>

        {/* footnote */}
        <p className="text-center text-xs text-w-500 mt-10 leading-relaxed max-w-2xl mx-auto">
          {t.pricing.footnote}
        </p>

      </div>

      <style jsx>{`
        .plan-card {
          transition: transform 0.35s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s cubic-bezier(.2,.7,.2,1);
        }
        .plan-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(184, 133, 47, 0.18);
        }
        .plan-featured { box-shadow: 0 10px 30px rgba(184, 133, 47, 0.12); }
        .plan-featured:hover { box-shadow: 0 28px 56px rgba(184, 133, 47, 0.24); }
      `}</style>
    </section>
  )
}

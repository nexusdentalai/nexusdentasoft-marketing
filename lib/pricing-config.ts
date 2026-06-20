// =============================================================================
// Pricing — SOURCE UNIQUE des prix + mapping pays → devise (Règle 11 PMS).
// Aucune logique pays/devise/prix ne doit vivre ailleurs que dans ce fichier.
// =============================================================================

export type Currency = 'THB' | 'VND' | 'USD'
export type PlanId = 'free' | 'starter' | 'premium'

// Prix mensuels par plan et par devise. Valeurs brutes (non formatées).
// VND : pas de décimales d'usage ; les paliers psychologiques diffèrent par marché.
// PRIX LANCEMENT (founder) — ce que paient les 100 premiers. INCHANGÉ.
export const PRICES: Record<PlanId, Record<Currency, number>> = {
  free:    { THB: 0,    VND: 0,       USD: 0  },
  starter: { THB: 1299, VND: 900000,  USD: 35 },
  premium: { THB: 2290, VND: 1800000, USD: 70 },
}

// PRIX NORMAUX (barrés) — affichés rayés au-dessus du prix lancement (P9-2). free = 0
// (pas de barré). Source UNIQUE comme PRICES (aucun prix hardcodé ailleurs, Règle 11).
export const REGULAR_PRICES: Record<PlanId, Record<Currency, number>> = {
  free:    { THB: 0,    VND: 0,       USD: 0  },
  starter: { THB: 2000, VND: 1500000, USD: 50 },
  premium: { THB: 3500, VND: 2700000, USD: 92 },
}

// Mapping ISO-3166 alpha-2 → devise. Tout pays non listé bascule sur USD.
export const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
  TH: 'THB',
  VN: 'VND',
}

export function resolveCurrency(country: string | null | undefined): Currency {
  if (!country) return 'USD'
  return COUNTRY_TO_CURRENCY[country.toUpperCase()] ?? 'USD'
}

// Helper DRY pour Server Components : encapsule la détection pays (Next 14.2
// `headers()` sync) + l'override DEV `NX_FAKE_COUNTRY`. Utilisé par toutes les
// pages qui ont besoin de la devise (home, pricing, etc.).
export function resolveCurrencyFromHeaders(h: Headers): Currency {
  const raw = process.env.NX_FAKE_COUNTRY ?? h.get('x-vercel-ip-country') ?? null
  return resolveCurrency(raw)
}

// DV-1 : la LOCALE de la page PRIME sur la géo-IP. Une page /vn affiche toujours
// VND, /th toujours THB — quel que soit le pays détecté. 'en' (et toute autre
// locale) conserve la logique pays-IP (resolveCurrencyFromHeaders : NX_FAKE_COUNTRY
// ?? x-vercel-ip-country, fallback USD). Corrige le bug « /vn depuis Bangkok = THB ».
export function resolveCurrencyForLocale(locale: string, h: Headers): Currency {
  if (locale === 'vn') return 'VND'
  if (locale === 'th') return 'THB'
  return resolveCurrencyFromHeaders(h)
}

// Format d'affichage par devise. `position` = avant/après le nombre, `locale` = séparateurs.
// THB : ฿1,290 (symbole avant, séparateur virgule)
// VND : 900.000₫ (symbole après, séparateur point — convention vi-VN)
// USD : $35 (symbole avant)
export const CURRENCY_FORMAT: Record<Currency, { symbol: string; position: 'before' | 'after'; locale: string }> = {
  THB: { symbol: '฿', position: 'before', locale: 'en-US'  },
  VND: { symbol: '₫', position: 'after',  locale: 'vi-VN'  },
  USD: { symbol: '$', position: 'before', locale: 'en-US'  },
}

function formatValue(value: number, currency: Currency): string {
  const fmt = CURRENCY_FORMAT[currency]
  const number = value.toLocaleString(fmt.locale)
  return fmt.position === 'before' ? `${fmt.symbol}${number}` : `${number}${fmt.symbol}`
}

// Prix LANCEMENT (founder) formaté — inchangé (PRICES).
export function formatPrice(plan: PlanId, currency: Currency): string {
  return formatValue(PRICES[plan][currency], currency)
}

// Prix NORMAL (barré) formaté — REGULAR_PRICES.
export function formatRegularPrice(plan: PlanId, currency: Currency): string {
  return formatValue(REGULAR_PRICES[plan][currency], currency)
}

// Y a-t-il une remise fondateur à afficher (prix normal barré) pour ce plan+devise ?
// Vrai uniquement si le plan est payant ET le prix normal > prix lancement.
export function hasFounderDiscount(plan: PlanId, currency: Currency): boolean {
  return PRICES[plan][currency] > 0 && REGULAR_PRICES[plan][currency] > PRICES[plan][currency]
}

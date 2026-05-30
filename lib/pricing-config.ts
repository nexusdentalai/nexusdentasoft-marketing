// =============================================================================
// Pricing — SOURCE UNIQUE des prix + mapping pays → devise (Règle 11 PMS).
// Aucune logique pays/devise/prix ne doit vivre ailleurs que dans ce fichier.
// =============================================================================

export type Currency = 'THB' | 'VND' | 'USD'
export type PlanId = 'free' | 'starter' | 'premium'

// Prix mensuels par plan et par devise. Valeurs brutes (non formatées).
// VND : pas de décimales d'usage ; les paliers psychologiques diffèrent par marché.
export const PRICES: Record<PlanId, Record<Currency, number>> = {
  free:    { THB: 0,    VND: 0,       USD: 0  },
  starter: { THB: 1290, VND: 900000,  USD: 35 },
  premium: { THB: 2490, VND: 1800000, USD: 70 },
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

// Format d'affichage par devise. `position` = avant/après le nombre, `locale` = séparateurs.
// THB : ฿1,290 (symbole avant, séparateur virgule)
// VND : 900.000₫ (symbole après, séparateur point — convention vi-VN)
// USD : $35 (symbole avant)
export const CURRENCY_FORMAT: Record<Currency, { symbol: string; position: 'before' | 'after'; locale: string }> = {
  THB: { symbol: '฿', position: 'before', locale: 'en-US'  },
  VND: { symbol: '₫', position: 'after',  locale: 'vi-VN'  },
  USD: { symbol: '$', position: 'before', locale: 'en-US'  },
}

export function formatPrice(plan: PlanId, currency: Currency): string {
  const value = PRICES[plan][currency]
  const fmt = CURRENCY_FORMAT[currency]
  const number = value.toLocaleString(fmt.locale)
  return fmt.position === 'before' ? `${fmt.symbol}${number}` : `${number}${fmt.symbol}`
}

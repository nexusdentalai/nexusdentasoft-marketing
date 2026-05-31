// =============================================================================
// Register URL helper — source UNIQUE pour les CTA marketing → PMS (Règle 11).
// Propage la locale visiteur + plan optionnel + source analytics au PMS register.
// Côté PMS, register/confirmation/page.tsx lit déjà `?lang=` + cookie NEXT_LOCALE.
// =============================================================================
import type { Locale } from './i18n'
import type { PlanId } from './pricing-config'

const REGISTER_BASE = 'https://app.nexusdentasoft.com/register'

export type RegisterSource =
  | 'hero'
  | 'navbar'
  | 'home-cta'
  | 'pricing'
  | 'features'
  | 'contact'
  | 'blog'

export function buildRegisterUrl(
  locale: Locale | string,
  opts?: { plan?: PlanId; source?: RegisterSource },
): string {
  const params = new URLSearchParams()
  params.set('lang', locale)
  if (opts?.plan) params.set('plan', opts.plan)
  if (opts?.source) params.set('source', opts.source)
  return `${REGISTER_BASE}?${params.toString()}`
}

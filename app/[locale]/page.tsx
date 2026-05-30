import { headers } from 'next/headers'
import { getT } from '@/lib/i18n'
import { resolveCurrency } from '@/lib/pricing-config'
import HomePage from '@/components/HomePage'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = getT(params.locale)
  return {
    title: `NexusDentaSoft — ${t.hero.h1}`,
    description: t.hero.subtitle,
    alternates: { canonical: `https://nexusdentasoft.com/${params.locale}`, languages: { en: '/en', th: '/th', vi: '/vn' } },
    openGraph: { title: `NexusDentaSoft — ${t.hero.h1}`, description: t.hero.subtitle, type: 'website' },
  }
}

export default function Page({ params }: { params: { locale: string } }) {
  const t = getT(params.locale)

  // Détection pays serveur (Next 14.2 : headers() sync). NX_FAKE_COUNTRY = override
  // DEV (header x-vercel-ip-country absent en local). Toute la logique pays/devise
  // est centralisée dans lib/pricing-config.ts (Règle 11 source unique).
  const rawCountry = process.env.NX_FAKE_COUNTRY ?? headers().get('x-vercel-ip-country') ?? null
  const currency = resolveCurrency(rawCountry)
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[pricing] country=${rawCountry ?? '(none)'} → currency=${currency}`)
  }
  // TODO Phase 3b : <Pricing currency={currency} t={t} locale={params.locale} />
  // sera greffé dans HomePage entre <WhyFree /> et <Testimonials />. La prop
  // currency est résolue ici (Server Component) et drillée vers le composant.

  return (
    <>
      <Navbar t={t} locale={params.locale} />
      <main><HomePage t={t} locale={params.locale} /></main>
    </>
  )
}

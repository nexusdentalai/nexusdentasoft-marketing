import { headers } from 'next/headers'
import { getT } from '@/lib/i18n'
import { resolveCurrencyForLocale } from '@/lib/pricing-config'
import Pricing from '@/components/Pricing'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = getT(params.locale)
  return {
    title: t.pricing.metaTitle,
    description: t.pricing.metaDescription,
    alternates: {
      canonical: `https://nexusdentasoft.com/${params.locale}/pricing`,
      languages: { en: '/en/pricing', th: '/th/pricing', vi: '/vn/pricing' },
    },
    openGraph: {
      title: t.pricing.metaTitle,
      description: t.pricing.metaDescription,
      type: 'website',
    },
  }
}

export default function PricingPage({ params }: { params: { locale: string } }) {
  const t = getT(params.locale)
  // DV-1 : la locale de la page prime (vn→VND, th→THB) ; en→pays-IP.
  const currency = resolveCurrencyForLocale(params.locale, headers())
  // registerUrl désormais construit par-plan dans <Pricing> via buildRegisterUrl
  // (helper Lot B-1 : lang + plan + source propagés).

  return (
    <>
      <Navbar t={t} locale={params.locale} />
      <main className="bg-w-25 min-h-screen pt-20">
        <Pricing t={t} locale={params.locale} currency={currency} />
      </main>
      <Footer t={t} locale={params.locale} />
    </>
  )
}

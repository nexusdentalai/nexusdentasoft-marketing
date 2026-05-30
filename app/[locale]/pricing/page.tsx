import { headers } from 'next/headers'
import { getT } from '@/lib/i18n'
import { resolveCurrencyFromHeaders } from '@/lib/pricing-config'
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
  const currency = resolveCurrencyFromHeaders(headers())
  // TODO dormant B-CENTRALIZE-REGISTER-URL — registerUrl hardcodé déjà dans Hero,
  // HomePage, Navbar et blog/[slug]. Centraliser dans un lot de refactor dédié.
  const registerUrl = 'https://app.nexusdentasoft.com/register'

  return (
    <>
      <Navbar t={t} locale={params.locale} />
      <main className="bg-w-25 min-h-screen pt-20">
        <Pricing t={t} locale={params.locale} currency={currency} registerUrl={registerUrl} />
      </main>
      <Footer t={t} locale={params.locale} />
    </>
  )
}

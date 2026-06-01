import { getT } from '@/lib/i18n'
import { buildRegisterUrl } from '@/lib/register-url'
import Features from '@/components/Features'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = getT(params.locale)
  return {
    title: t.features.metaTitle,
    description: t.features.metaDescription,
    alternates: {
      canonical: `https://nexusdentasoft.com/${params.locale}/features`,
      languages: { en: '/en/features', th: '/th/features', vi: '/vn/features' },
    },
    openGraph: {
      title: t.features.metaTitle,
      description: t.features.metaDescription,
      type: 'website',
    },
  }
}

export default function FeaturesPage({ params }: { params: { locale: string } }) {
  const t = getT(params.locale)
  const signupsOpen = process.env.NEXT_PUBLIC_SIGNUPS_OPEN === 'true'
  const registerUrl = buildRegisterUrl(params.locale, { plan: 'free', source: 'features' })

  return (
    <>
      <Navbar t={t} locale={params.locale} />
      <main className="bg-w-25 min-h-screen pt-20">
        <Features t={t} locale={params.locale} signupsOpen={signupsOpen} registerUrl={registerUrl} />
      </main>
      <Footer t={t} locale={params.locale} />
    </>
  )
}

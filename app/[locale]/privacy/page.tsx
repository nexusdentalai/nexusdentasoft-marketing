import { getT } from '@/lib/i18n'
import Privacy from '@/components/Privacy'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = getT(params.locale)
  return {
    title: t.privacy.metaTitle,
    description: t.privacy.metaDescription,
    alternates: {
      canonical: `https://nexusdentasoft.com/${params.locale}/privacy`,
      languages: { en: '/en/privacy', th: '/th/privacy', vi: '/vn/privacy' },
    },
    openGraph: { title: t.privacy.metaTitle, description: t.privacy.metaDescription, type: 'website' },
  }
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const t = getT(params.locale)
  return (
    <>
      <Navbar t={t} locale={params.locale} />
      <main className="bg-w-25 min-h-screen pt-20">
        <Privacy t={t} locale={params.locale} />
      </main>
      <Footer t={t} locale={params.locale} />
    </>
  )
}

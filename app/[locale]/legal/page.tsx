import { getT } from '@/lib/i18n'
import Legal from '@/components/Legal'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = getT(params.locale)
  return {
    title: t.legal.metaTitle,
    description: t.legal.metaDescription,
    alternates: {
      canonical: `https://nexusdentasoft.com/${params.locale}/legal`,
      languages: { en: '/en/legal', th: '/th/legal', vi: '/vn/legal' },
    },
    openGraph: { title: t.legal.metaTitle, description: t.legal.metaDescription, type: 'website' },
  }
}

export default function LegalPage({ params }: { params: { locale: string } }) {
  const t = getT(params.locale)
  return (
    <>
      <Navbar t={t} locale={params.locale} />
      <main className="bg-w-25 min-h-screen pt-20">
        <Legal t={t} locale={params.locale} />
      </main>
      <Footer t={t} locale={params.locale} />
    </>
  )
}

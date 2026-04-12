import { getT } from '@/lib/i18n'
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
  return (
    <>
      <Navbar t={t} locale={params.locale} />
      <main><HomePage t={t} locale={params.locale} /></main>
    </>
  )
}

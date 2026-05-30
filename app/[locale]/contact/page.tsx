import { getT } from '@/lib/i18n'
import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = getT(params.locale)
  return {
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
    alternates: {
      canonical: `https://nexusdentasoft.com/${params.locale}/contact`,
      languages: { en: '/en/contact', th: '/th/contact', vi: '/vn/contact' },
    },
    openGraph: {
      title: t.contact.metaTitle,
      description: t.contact.metaDescription,
      type: 'website',
    },
  }
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const t = getT(params.locale)
  const signupsOpen = process.env.NEXT_PUBLIC_SIGNUPS_OPEN === 'true'
  // TODO dormant B-CENTRALIZE-REGISTER-URL — 7e hardcoding ; lot refactor centralisation prévu.
  const registerUrl = 'https://app.nexusdentasoft.com/register'

  return (
    <>
      <Navbar t={t} locale={params.locale} />
      <main className="bg-w-25 min-h-screen pt-20">
        <Contact t={t} locale={params.locale} signupsOpen={signupsOpen} registerUrl={registerUrl} />
      </main>
      <Footer t={t} locale={params.locale} />
    </>
  )
}

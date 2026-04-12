import type { Metadata } from 'next'
import { locales } from '@/lib/i18n'
import GeoRedirect from '@/components/GeoRedirect'
import '../globals.css'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export const metadata: Metadata = {
  title: 'NexusDentaSoft – Free AI-Powered Dental PMS for Southeast Asia',
  description: "The world's first free dental practice management software with built-in AI assistant, designed for Southeast Asia. Supports Thai and Vietnamese language. Manage appointments, patients, billing and more with AI assistance.",
  keywords: 'free dental PMS, dental practice management software free, dental software Southeast Asia, dental software Thailand, dental software Vietnam, AI dental software, AI-powered dental PMS, dental software with AI assistant, free dental software with AI, premier logiciel dentaire IA Asie, โปรแกรมคลินิกทันตกรรม, phần mềm quản lý phòng khám nha khoa',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.nexusdentasoft.com',
    languages: {
      en: 'https://www.nexusdentasoft.com/en',
      th: 'https://www.nexusdentasoft.com/th',
      vi: 'https://www.nexusdentasoft.com/vn',
      fr: 'https://www.nexusdentasoft.com/en',
    },
  },
  openGraph: {
    title: 'NexusDentaSoft – Free AI-Powered Dental PMS for Southeast Asia',
    description: "The world's first free dental practice management software with built-in AI assistant, designed for Southeast Asia.",
    type: 'website',
    url: 'https://www.nexusdentasoft.com',
    siteName: 'NexusDentaSoft',
  },
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={params.locale}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <GeoRedirect currentLocale={params.locale} />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'NexusDentaSoft',
          applicationCategory: 'MedicalApplication',
          operatingSystem: 'Web',
          url: 'https://www.nexusdentasoft.com',
          description: "The world's first free AI-powered dental PMS for Southeast Asia. Built-in AI assistant, Thai and Vietnamese language support, appointments, patients, billing and more.",
          featureList: ['Built-in AI Assistant', 'Free Forever', 'Thai Language Support', 'Vietnamese Language Support', 'Southeast Asia Focused', 'Appointment Management', 'Patient Records', 'Billing & Payments'],
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }) }} />
      </body>
    </html>
  )
}

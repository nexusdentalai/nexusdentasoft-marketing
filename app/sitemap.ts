import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.nexusdentasoft.com'
  const locales = ['en', 'th', 'vn']
  const today = new Date().toISOString().slice(0, 10)

  const pages: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    pages.push({
      url: `${base}/${locale}`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 1.0,
    })
    pages.push({
      url: `${base}/${locale}/features`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    })
    pages.push({
      url: `${base}/${locale}/pricing`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    })
    pages.push({
      url: `${base}/${locale}/blog`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    pages.push({
      url: `${base}/${locale}/contact`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
    pages.push({
      url: `${base}/${locale}/legal`,
      lastModified: today,
      changeFrequency: 'yearly',
      priority: 0.3,
    })
    pages.push({
      url: `${base}/${locale}/privacy`,
      lastModified: today,
      changeFrequency: 'yearly',
      priority: 0.3,
    })
    for (const slug of ['best-free-dental-pms-thailand-2025', 'manage-dental-clinic-southeast-asia', 'free-vs-paid-dental-software']) {
      pages.push({
        url: `${base}/${locale}/blog/${slug}`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return pages
}

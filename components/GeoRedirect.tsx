'use client'
import { useEffect } from 'react'

export default function GeoRedirect({ currentLocale }: { currentLocale: string }) {
  useEffect(() => {
    const visited = localStorage.getItem('locale-set')
    if (visited) return

    fetch('https://ipinfo.io/json')
      .then(r => r.json())
      .then(data => {
        const country = data.country
        const locale = country === 'TH' ? 'th' : country === 'VN' ? 'vn' : 'en'
        localStorage.setItem('locale-set', locale)
        if (locale !== currentLocale) {
          window.location.href = `/${locale}`
        }
      })
      .catch(() => {})
  }, [currentLocale])

  return null
}

import Link from 'next/link'

type T = Record<string, Record<string, string>>

export default function Footer({ t, locale }: { t: T; locale: string }) {
  return (
    <footer className="bg-[#0f2744] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center text-lg mb-2">
              <span style={{ fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>Nexus</span>
              {' '}
              <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Denta</span>
              <span style={{ fontWeight: 700, color: '#2e7df7' }}>Soft</span>
            </div>
            <p className="text-sm text-white/40">{t.footer.tagline}</p>
          </div>
          <div className="space-y-2">
            <a href="#features" className="block text-sm text-white/50 hover:text-white/80">{t.footer.features}</a>
            <Link href={`/${locale}/blog`} className="block text-sm text-white/50 hover:text-white/80">{t.footer.blog}</Link>
            <a href="mailto:hello@nexusdentasoft.com" className="block text-sm text-white/50 hover:text-white/80">{t.footer.contact}</a>
          </div>
          <div className="flex items-end">
            <p className="text-xs text-white/30">{t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

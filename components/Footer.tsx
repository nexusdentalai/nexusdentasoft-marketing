import Link from 'next/link'

type T = Record<string, Record<string, string>>

export default function Footer({ t, locale }: { t: T; locale: string }) {
  return (
    <footer className="bg-[#1c1b1a] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center text-lg mb-2">
              <span style={{ fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>Nexus</span>
              {' '}
              <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Denta</span>
              <span style={{ fontWeight: 700, color: '#b8852f' }}>Soft</span>
            </div>
            <p className="text-sm text-white/40">{t.footer.tagline}</p>
            <p className="text-xs text-white/30 mt-1">{t.footer.location}</p>
          </div>
          <div className="space-y-2">
            <Link href={`/${locale}/features`} className="block text-sm text-white/50 hover:text-white/80">{t.footer.features}</Link>
            <Link href={`/${locale}/blog`} className="block text-sm text-white/50 hover:text-white/80">{t.footer.blog}</Link>
            <Link href={`/${locale}/contact`} className="block text-sm text-white/50 hover:text-white/80">{t.footer.contact}</Link>
            <a href={`mailto:${t.footer.email}`} className="block text-sm text-white/50 hover:text-white/80">{t.footer.email}</a>
          </div>
          <div className="flex items-end">
            <p className="text-xs text-white/30">{t.footer.copyright}</p>
          </div>
        </div>
        {/* Row legal (discrète, sous la grille — pas dans une colonne, pour préserver le 3-col responsive) */}
        <div className="mt-8 pt-4 border-t border-white/[0.05] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-white/40">
          <Link href={`/${locale}/legal`} className="hover:text-white/70">{t.footer.legal}</Link>
          <span aria-hidden="true">·</span>
          <Link href={`/${locale}/privacy`} className="hover:text-white/70">{t.footer.privacy}</Link>
        </div>
      </div>
    </footer>
  )
}

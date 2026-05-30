import Link from 'next/link'

type T = Record<string, Record<string, string>>

export default function Footer({ t, locale }: { t: T; locale: string }) {
  return (
    <footer className="bg-[#1c1b1a] py-14 px-4">
      <div className="max-w-6xl mx-auto">

        {/* 3 colonnes thématiques (responsive : stack mobile) */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center text-lg mb-3">
              <span style={{ fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>Nexus</span>
              {' '}
              <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Denta</span>
              <span style={{ fontWeight: 700, color: '#b8852f' }}>Soft</span>
            </div>
            <p className="text-sm text-white/40">{t.footer.tagline}</p>
            <p className="text-xs text-white/30 mt-1">{t.footer.location}</p>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">
              {t.footer.productHeading}
            </h3>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/features`} className="text-sm text-white/50 hover:text-white/80">{t.footer.features}</Link></li>
              <li><Link href={`/${locale}/pricing`} className="text-sm text-white/50 hover:text-white/80">{t.footer.pricing}</Link></li>
              <li><Link href={`/${locale}/blog`} className="text-sm text-white/50 hover:text-white/80">{t.footer.blog}</Link></li>
            </ul>
          </div>

          {/* Col 3 — Get in touch */}
          <div>
            <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">
              {t.footer.contactHeading}
            </h3>
            <ul className="space-y-2">
              <li><Link href={`/${locale}/contact`} className="text-sm text-white/50 hover:text-white/80">{t.footer.contact}</Link></li>
              <li><a href={`mailto:${t.footer.email}`} className="text-sm text-white/50 hover:text-white/80">{t.footer.email}</a></li>
            </ul>
          </div>

        </div>

        {/* Legal bar — copyright (gauche) + Legal · Privacy (droite). flex-wrap pour stack mobile. */}
        <div className="mt-10 pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          <p className="text-[11px] text-white/40">{t.footer.copyright}</p>
          <div className="flex items-center gap-x-3 text-[11px] text-white/40">
            <Link href={`/${locale}/legal`} className="hover:text-white/70">{t.footer.legal}</Link>
            <span aria-hidden="true">·</span>
            <Link href={`/${locale}/privacy`} className="hover:text-white/70">{t.footer.privacy}</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

'use client'
import { useState } from 'react'
import RequestAccessModal from './RequestAccessModal'

type T = Record<string, any>

// Données société RÉELLES (hardcoded — pas i18n car identique 3 langues, sauf labels).
const COMPANY = {
  legalName: 'Smilesoft Systems (Thailand) Co., Ltd.',
  address: 'Khlong Toei Nuea, Watthana, Bangkok 10110, Thailand',
  registrationNumber: '0845567009324',
}

// Carte OSM bbox + marqueur quartier Watthana / Sukhumvit (approximation).
// Format bbox = lng_min,lat_min,lng_max,lat_max (longitude PUIS latitude — convention OSM).
const OSM_BBOX = '100.545,13.728,100.577,13.748'
const OSM_MARKER = '13.738,100.561'  // marker format = lat,lng (inversé vs bbox)

export default function Contact({
  t, locale, signupsOpen, registerUrl,
}: {
  t: T
  locale: string
  signupsOpen: boolean
  registerUrl: string
}) {
  const [reqOpen, setReqOpen] = useState(false)
  const c = t.contact

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* sec-head */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-dark mb-3">
            {c.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-5xl text-w-900 mb-4 leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {c.title}
          </h1>
          <p className="text-w-700 text-base leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* 2 colonnes : infos société / carte OSM */}
        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* Infos société (carte) */}
          <div className="bg-surface border border-w-100 rounded-2xl p-7">
            <dl className="space-y-5">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-w-500 mb-1">{c.companyLabel}</dt>
                <dd className="text-sm font-semibold text-w-900">{COMPANY.legalName}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-w-500 mb-1">{c.addressLabel}</dt>
                <dd className="text-sm text-w-700 leading-relaxed">{COMPANY.address}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-w-500 mb-1">{c.emailLabel}</dt>
                <dd className="text-sm">
                  <a href={`mailto:${t.footer.email}`} className="text-gold-dark hover:underline">
                    {t.footer.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-w-500 mb-1">{c.regLabel}</dt>
                <dd className="text-xs tabular-nums text-w-500">{COMPANY.registrationNumber}</dd>
              </div>
            </dl>
          </div>

          {/* Carte OSM N&B (hover repasse en couleur) — attribution VISIBLE sous la carte */}
          <div>
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${OSM_BBOX}&layer=mapnik&marker=${OSM_MARKER}`}
              width="100%"
              height="340"
              className="contact-map rounded-xl border border-w-100"
              loading="lazy"
              title={c.mapCaption}
            />
            <p className="text-xs text-w-500 mt-2">
              © <a href="https://www.openstreetmap.org/copyright" className="underline hover:text-gold-dark" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors · {c.mapCaption}
            </p>
          </div>

        </div>

        {/* CTA espresso bas */}
        <div className="mt-16 bg-espresso text-w-0 rounded-2xl px-8 py-10 text-center">
          <h2 className="text-2xl sm:text-3xl mb-3 leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {c.ctaTitle}
          </h2>
          <p className="text-w-300 text-base mb-8 max-w-xl mx-auto">{c.ctaSubtitle}</p>
          {signupsOpen ? (
            <a href={registerUrl}
              className="inline-block px-8 py-3 bg-gold text-w-0 font-semibold rounded-[10px] hover:bg-gold-dark transition-colors shadow-sm">
              {c.ctaButton}
            </a>
          ) : (
            <button type="button" onClick={() => setReqOpen(true)}
              className="inline-block px-8 py-3 bg-gold text-w-0 font-semibold rounded-[10px] hover:bg-gold-dark transition-colors shadow-sm">
              {c.ctaButton}
            </button>
          )}
        </div>

      </div>

      <RequestAccessModal isOpen={reqOpen} onClose={() => setReqOpen(false)} t={t} locale={locale} />

      <style jsx>{`
        .contact-map {
          filter: grayscale(1) contrast(0.95);
          transition: filter 0.5s ease;
        }
        .contact-map:hover { filter: grayscale(0) contrast(1); }
      `}</style>
    </section>
  )
}

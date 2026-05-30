// TODO LÉGAL : contenu rédigé comme point de départ conforme — DOIT être validé
// par un avocat local TH/VN avant clients payants (dormant avocat).
import Link from 'next/link'

type T = Record<string, any>

export default function Legal({ t, locale }: { t: T; locale: string }) {
  const l = t.legal

  return (
    <article className="py-20 px-4">
      <div className="max-w-2xl mx-auto">

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl text-w-900 mb-3 leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {l.title}
          </h1>
          <p className="text-xs text-w-500">{l.lastUpdated}</p>
        </header>

        <div className="space-y-10 text-w-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-w-900 mb-3"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}>
              {l.editorTitle}
            </h2>
            <p className="text-sm">{l.editorBody}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-w-900 mb-3"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}>
              {l.directorTitle}
            </h2>
            <p className="text-sm">{l.directorBody}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-w-900 mb-3"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}>
              {l.contactTitle}
            </h2>
            <p className="text-sm">
              <a href={`mailto:${l.contactBody}`} className="text-gold-dark hover:underline">{l.contactBody}</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-w-900 mb-3"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}>
              {l.hostingTitle}
            </h2>
            <p className="text-sm">{l.hostingBody}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-w-900 mb-3"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}>
              {l.ipTitle}
            </h2>
            <p className="text-sm">{l.ipBody}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-w-900 mb-3"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}>
              {l.dataRefTitle}
            </h2>
            <p className="text-sm">
              {l.dataRefBody}{' '}
              <Link href={`/${locale}/privacy`} className="text-gold-dark hover:underline">{l.dataRefLink}</Link>.
            </p>
          </section>

        </div>
      </div>
    </article>
  )
}

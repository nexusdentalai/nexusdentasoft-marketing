// TODO LÉGAL : contenu rédigé comme point de départ conforme — DOIT être validé
// par un avocat local TH/VN avant clients payants (dormant avocat).

type T = Record<string, any>

type Section = { titleKey: string; bodyKey: string }

const SECTIONS: Section[] = [
  { titleKey: 'controllerTitle',     bodyKey: 'controllerBody' },
  { titleKey: 'dataCollectedTitle',  bodyKey: 'dataCollectedBody' },
  { titleKey: 'purposesTitle',       bodyKey: 'purposesBody' },
  { titleKey: 'legalBasisTitle',     bodyKey: 'legalBasisBody' },
  { titleKey: 'retentionTitle',      bodyKey: 'retentionBody' },
  { titleKey: 'processorsTitle',     bodyKey: 'processorsBody' },
  { titleKey: 'rightsTitle',         bodyKey: 'rightsBody' },
  { titleKey: 'cookiesTitle',        bodyKey: 'cookiesBody' },
  { titleKey: 'dpoTitle',            bodyKey: 'dpoBody' },
]

export default function Privacy({ t }: { t: T; locale: string }) {
  const p = t.privacy

  return (
    <article className="py-20 px-4">
      <div className="max-w-2xl mx-auto">

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl text-w-900 mb-3 leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300 }}>
            {p.title}
          </h1>
          <p className="text-xs text-w-500">{p.lastUpdated}</p>
        </header>

        <p className="text-sm text-w-700 leading-relaxed mb-10 italic">{p.intro}</p>

        <div className="space-y-10 text-w-700 leading-relaxed">
          {SECTIONS.map((s, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-w-900 mb-3"
                style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}>
                {p[s.titleKey]}
              </h2>
              <p className="text-sm">{p[s.bodyKey]}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

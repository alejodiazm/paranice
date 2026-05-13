import { ExternalLink } from 'lucide-react'

const sources = [
  { label: 'Paranice oficial', href: 'https://paranice.co' },
  { label: 'NIST Zero Trust SP 800-207', href: 'https://csrc.nist.gov/pubs/sp/800/207/final' },
  { label: 'NIST CSF 2.0', href: 'https://www.nist.gov/cyberframework' },
  { label: 'IBM Cost of Data Breach 2025', href: 'https://newsroom.ibm.com' },
  { label: 'Verizon DBIR 2025', href: 'https://www.verizon.com/about/news/2025-data-breach-investigations-report' },
  { label: 'McKinsey State of AI 2025', href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' },
  { label: 'NIST AI RMF', href: 'https://www.nist.gov/itl/ai-risk-management-framework' },
]

export function Footer() {
  return (
    <footer className="bg-pn-deep px-6 py-16 text-white/70 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <img
              src="https://whynot-bkt.s3.amazonaws.com/wp-content/uploads/2025/03/PARANICE-HORIZONTAL-MORADO.png"
              alt="Paranice"
              className="mb-3 h-8 w-auto brightness-0 invert"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Plan ejecutivo IT 2026 — construido como entregable formal para el proceso de selección Analista Sr / Coordinador IT de Paranice · Why Not.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-700 uppercase tracking-wider text-white/40">Fuentes y referencias</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {sources.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white"
                >
                  <ExternalLink size={11} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-xs text-white/30">
          Activos visuales de uso público de Paranice y Why Not · Documento de trabajo conceptual · Mayo 2026
        </div>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'
import { risks } from '../../data/content'

type RiskKey = keyof typeof risks
const riskKeys = Object.keys(risks) as RiskKey[]

const severityConfig = {
  Crítico: { color: 'bg-rose-100 text-rose-700 border-rose-200', dot: 'bg-rose-500', icon: AlertTriangle },
  Alto: { color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500', icon: AlertCircle },
  Medio: { color: 'bg-sky-100 text-sky-700 border-sky-200', dot: 'bg-sky-400', icon: Info },
}

export function Riesgos() {
  const [selected, setSelected] = useState<RiskKey>('offboarding')
  const risk = risks[selected]
  const cfg = severityConfig[risk.severity]
  const Icon = cfg.icon

  return (
    <section id="riesgos" className="section-base bg-white">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Matriz de riesgos"
          title="Los riesgos que priorizamos desde el día uno — con dueño y acción definida."
          subtitle="No esperamos al día 30 para actuar. Cada riesgo tiene un dueño, un impacto cuantificado y una respuesta en marcha."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Risk list */}
          <RevealSection direction="left">
            <div className="space-y-3">
              {riskKeys.map((key, i) => {
                const r = risks[key]
                const c = severityConfig[r.severity]
                return (
                  <motion.button
                    key={key}
                    onClick={() => setSelected(key)}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`group flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all ${
                      selected === key
                        ? 'border-pn-purple bg-pn-pale shadow-md shadow-pn-purple/10'
                        : 'border-transparent bg-pn-pale/50 hover:border-pn-lavender hover:bg-pn-pale'
                    }`}
                  >
                    <div className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${c.dot}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-700 text-pn-deep">{r.title}</p>
                      <p className="text-xs text-pn-violet">{r.owner}</p>
                    </div>
                    <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-700 ${c.color}`}>
                      {r.severity}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </RevealSection>

          {/* Risk detail */}
          <RevealSection delay={0.15} direction="right" className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-pn-lavender/40 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className={`rounded-xl border p-3 ${cfg.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className={`mb-1 inline-block rounded-full border px-2.5 py-0.5 text-xs font-700 ${cfg.color}`}>
                      {risk.severity}
                    </span>
                    <h3 className="font-display text-lg font-700 text-pn-deep">{risk.title}</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-pn-pale p-4">
                    <p className="mb-1 text-xs font-700 uppercase tracking-wide text-pn-purple">Impacto</p>
                    <p className="text-sm leading-relaxed text-pn-deep">{risk.impact}</p>
                  </div>

                  <div className="rounded-xl bg-pn-mint p-4">
                    <p className="mb-1 text-xs font-700 uppercase tracking-wide text-emerald-700">Acción en curso</p>
                    <p className="text-sm leading-relaxed text-pn-deep">{risk.action}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-pn-violet">
                    <span className="font-700">Dueño:</span>
                    <span className="rounded-full bg-pn-pale px-3 py-1 font-600">{risk.owner}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

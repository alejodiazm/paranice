import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Check, X, ShieldAlert } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'
import { aiPilots } from '../../data/content'

const riskColor: Record<string, string> = {
  Bajo: 'text-emerald-600 bg-pn-mint',
  Medio: 'text-amber-600 bg-pn-gold-bg',
}

export function IA() {
  const [active, setActive] = useState<Record<string, boolean>>(
    () => Object.fromEntries(aiPilots.map((p) => [p.id, p.active]))
  )

  const activeCount = Object.values(active).filter(Boolean).length

  return (
    <section id="ia" className="section-base bg-pn-pale">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="IA responsable"
          title="IA como acelerador controlado — no como protagonista del plan."
          subtitle="La IA entra con política, datos clasificados y revisión humana obligatoria. Primero los pilotos de bajo riesgo; los agentes críticos, después."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Panel left */}
          <RevealSection direction="left">
            <div className="flex h-full flex-col rounded-2xl border border-pn-lavender/40 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-pn-pale p-3">
                  <Brain size={22} className="text-pn-purple" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-700 text-pn-deep">Laboratorio controlado</h3>
                  <p className="text-xs text-pn-violet">Pilotos activos: <strong className="text-pn-purple">{activeCount}/{aiPilots.length}</strong></p>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-pn-violet">
                Pilotos de bajo riesgo que aumentan productividad sin cargar contratos, precios, credenciales, datos de SAP ni información personal en herramientas no aprobadas.
              </p>

              {/* Gauge */}
              <div className="mb-5 flex items-center gap-4">
                <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#EDE8F6" strokeWidth="8" />
                  <motion.circle
                    cx="40" cy="40" r="32"
                    fill="none"
                    strokeWidth="8"
                    stroke="#4B2E83"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 32}
                    animate={{ strokeDashoffset: (1 - activeCount / aiPilots.length) * (2 * Math.PI * 32) }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: '40px 40px', transform: 'rotate(-90deg)' }}
                  />
                  <text x="40" y="44" textAnchor="middle" style={{ fontSize: 18, fontWeight: 800, fill: '#4B2E83', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {activeCount}/{aiPilots.length}
                  </text>
                </svg>
                <p className="text-sm text-pn-violet">
                  Activamos los pilotos gradualmente conforme la política de IA queda aprobada y los controles de datos están en su lugar.
                </p>
              </div>

              {/* Golden rule */}
              <div className="mt-auto rounded-2xl border-2 border-amber-200 bg-pn-gold-bg p-4">
                <div className="mb-2 flex items-center gap-2">
                  <ShieldAlert size={15} className="text-amber-600" />
                  <p className="text-xs font-700 text-amber-700">Regla de oro</p>
                </div>
                <p className="text-xs leading-relaxed text-amber-800">
                  Nunca: datos de SAP, credenciales, contratos, precios, información comercial sensible, archivos restringidos ni datos personales en herramientas no aprobadas.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Toggle grid */}
          <RevealSection delay={0.15} direction="right">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {aiPilots.map((pilot, i) => {
                const on = active[pilot.id]
                return (
                  <motion.button
                    key={pilot.id}
                    onClick={() => setActive((prev) => ({ ...prev, [pilot.id]: !prev[pilot.id] }))}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`rounded-2xl border-2 p-5 text-left transition-all ${
                      on
                        ? 'border-pn-purple bg-white shadow-md shadow-pn-purple/10'
                        : 'border-pn-lavender/40 bg-pn-pale/60 opacity-70'
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <motion.div
                        animate={{ backgroundColor: on ? '#4B2E83' : '#C8BAE5' }}
                        className="rounded-full p-1.5"
                      >
                        {on
                          ? <Check size={13} className="text-white" />
                          : <X size={13} className="text-white" />
                        }
                      </motion.div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-600 ${riskColor[pilot.risk] ?? 'bg-pn-pale text-pn-violet'}`}>
                        Riesgo {pilot.risk}
                      </span>
                    </div>
                    <p className="mb-1 text-sm font-700 text-pn-deep">{pilot.label}</p>
                    <p className="text-xs leading-relaxed text-pn-violet">{pilot.desc}</p>
                  </motion.button>
                )
              })}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

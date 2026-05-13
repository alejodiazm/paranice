import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TimerReset, RotateCcw, CheckCircle2, Circle, Users, Laptop, Scale } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'
import { offboardingSteps } from '../../data/content'

const risks = [
  'Gmail activo: envía correos como la empresa',
  'Drive con piezas de marca y archivos internos',
  'Slack: ve conversaciones privadas de equipo',
  'Adobe CC: genera piezas no autorizadas',
  'MacBook corporativa: acceso offline a datos',
  'Celular: apps y OTPs corporativos activos',
]

const areas = [
  { icon: Users, label: 'RRHH', desc: 'Notifica la salida y su criticidad', color: 'bg-pn-gold-bg border-amber-200 text-amber-700' },
  { icon: Laptop, label: 'IT', desc: 'Ejecuta todos los controles técnicos', color: 'bg-pn-pale border-pn-lavender text-pn-purple' },
  { icon: CheckCircle2, label: 'Finanzas', desc: 'Cierra activos y valida licencias', color: 'bg-pn-mint border-emerald-200 text-emerald-700' },
  { icon: Scale, label: 'Legal', desc: 'Interviene si hay riesgo legal', color: 'bg-pn-coral border-rose-200 text-rose-700' },
]

export function Offboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const progress = ((currentStep + 1) / offboardingSteps.length) * 100

  return (
    <section className="section-base bg-pn-pale">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Protocolo de offboarding"
          title="El caso del comercial: cada minuto sin actuar es un riesgo activo."
          subtitle="Un excolaborador que renunció ayer sigue con acceso completo. Este protocolo cierra la ventana de exposición en menos de una hora."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Risks */}
          <RevealSection direction="left">
            <div className="rounded-2xl border-2 border-rose-200 bg-pn-coral p-6 h-full">
              <h3 className="mb-4 font-display text-base font-700 text-rose-800">Riesgos activos ahora</h3>
              <ul className="space-y-2.5">
                {risks.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-rose-700">
                    <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>

          {/* Drill */}
          <RevealSection delay={0.1} className="lg:col-span-2">
            <div className="rounded-2xl border border-pn-lavender/40 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-base font-700 text-pn-deep">Protocolo de ejecución</h3>
                <button
                  onClick={() => setCurrentStep(0)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-600 text-pn-violet transition-colors hover:bg-pn-pale"
                >
                  <RotateCcw size={12} />
                  Reiniciar
                </button>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="mb-1.5 flex justify-between text-xs font-600 text-pn-violet">
                  <span>Paso {currentStep + 1} de {offboardingSteps.length}</span>
                  <span className="text-pn-purple">SLA objetivo: &lt;1 hora</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-pn-pale">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-pn-violet to-pn-purple"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {offboardingSteps.map((step, i) => {
                  const done = i <= currentStep
                  return (
                    <motion.button
                      key={step.label}
                      onClick={() => setCurrentStep(i)}
                      whileHover={{ x: 2 }}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                        done
                          ? 'bg-pn-pale'
                          : 'opacity-50 hover:opacity-70'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {done ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0 rounded-full bg-pn-purple p-0.5"
                          >
                            <CheckCircle2 size={16} className="text-white" />
                          </motion.div>
                        ) : (
                          <motion.div key="circle" className="flex-shrink-0">
                            <Circle size={18} className="text-pn-lavender" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-600 ${done ? 'text-pn-deep' : 'text-pn-violet'}`}>{step.label}</p>
                      </div>
                      <span className="flex-shrink-0 rounded-full bg-pn-lavender/30 px-2 py-0.5 text-xs font-600 text-pn-violet">
                        {step.owner}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* SLA badge */}
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-pn-deep p-4">
                <TimerReset size={20} className="shrink-0 text-pn-lavender" />
                <div>
                  <p className="text-xs font-700 text-white">SLA para salidas sensibles</p>
                  <p className="font-display text-2xl font-800 text-pn-lavender">&lt; 1 hora</p>
                </div>
                <p className="ml-auto text-xs text-white/40">Gmail · Slack · Drive · Adobe · SAP · MacBook · Celular</p>
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Areas */}
        <RevealSection delay={0.3} className="mt-6">
          <div className="card-base p-6">
            <p className="mb-4 text-sm font-700 text-pn-deep">Áreas que participan y cómo se estructura el proceso</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {areas.map((area) => (
                <div key={area.label} className={`rounded-2xl border p-4 ${area.color}`}>
                  <area.icon size={16} className="mb-2" />
                  <p className="font-display text-sm font-700">{area.label}</p>
                  <p className="mt-1 text-xs opacity-80">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

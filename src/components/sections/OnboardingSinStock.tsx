import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, RotateCcw, ShoppingCart, ArrowRight } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'

const steps = [
  {
    num: '01',
    icon: CheckCircle2,
    title: 'Evaluar criticidad',
    desc: '¿El rol impacta ventas, operación o finanzas? La criticidad determina la urgencia y el modo de respuesta. Sin esto no hay excepción justificada.',
    owner: 'IT + RRHH',
    color: 'border-pn-lavender bg-white',
    numColor: 'text-pn-purple',
  },
  {
    num: '02',
    icon: RotateCcw,
    title: 'Buscar recuperable',
    desc: 'Revisamos equipos devueltos pendientes de MDM, reparaciones activas en bodega y préstamos temporales del inventario IT.',
    owner: 'IT',
    color: 'border-pn-lavender bg-white',
    numColor: 'text-pn-purple',
  },
  {
    num: '03',
    icon: AlertTriangle,
    title: 'Excepción controlada',
    desc: 'BYOD solo vía web con MFA obligatorio, sin sync local de Drive, sin apps instaladas, y con fecha límite de vigencia documentada.',
    owner: 'IT + Liderazgo',
    color: 'border-amber-200 bg-pn-gold-bg',
    numColor: 'text-amber-600',
    highlight: true,
  },
  {
    num: '04',
    icon: ShoppingCart,
    title: 'Compra express',
    desc: 'Registro formal del riesgo aceptado, aprobación de Finanzas y cierre de la excepción cuando llega el equipo con MDM configurado.',
    owner: 'IT + Finanzas',
    color: 'border-pn-lavender bg-white',
    numColor: 'text-pn-purple',
  },
]

export function OnboardingSinStock() {
  return (
    <section className="section-base bg-pn-pale">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Onboarding sin stock disponible"
          title="Si entra alguien mañana y no hay equipo — tenemos el protocolo."
          subtitle="La ausencia de stock no bloquea el negocio ni crea un hoyo de seguridad. Ejecutamos el protocolo en 4 pasos, con dueño visible en cada uno."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <RevealSection key={step.num} delay={i * 0.1} className="flex">
              <div className="relative flex w-full flex-col">
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(75,46,131,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className={`flex h-full flex-col rounded-2xl border-2 p-6 transition-shadow ${step.color} ${step.highlight ? 'shadow-md shadow-amber-200/60' : ''}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`font-display text-4xl font-900 opacity-20 ${step.numColor}`}>{step.num}</span>
                    <div className={`rounded-xl p-2 ${step.highlight ? 'bg-amber-100' : 'bg-pn-pale'}`}>
                      <step.icon size={18} className={step.highlight ? 'text-amber-600' : 'text-pn-purple'} />
                    </div>
                  </div>

                  <h3 className="mb-2 font-display text-base font-700 text-pn-deep">{step.title}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-pn-violet">{step.desc}</p>

                  <div className={`rounded-lg px-3 py-1.5 text-center text-xs font-700 ${
                    step.highlight ? 'bg-amber-100 text-amber-700' : 'bg-pn-pale text-pn-purple'
                  }`}>
                    {step.owner}
                  </div>
                </motion.div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 lg:flex">
                    <ArrowRight size={16} className="text-pn-lavender" />
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={0.45} className="mt-6">
          <div className="rounded-2xl bg-pn-deep p-5 text-center">
            <p className="font-display text-base font-700 text-white">
              Principio irrenunciable: toda excepción tiene{' '}
              <span className="text-pn-lavender">dueño visible</span> ·{' '}
              <span className="text-pn-lavender">fecha límite</span> ·{' '}
              <span className="text-pn-lavender">control de datos</span>
            </p>
            <p className="mt-1 text-sm text-white/50">
              Sin estas tres condiciones, no existe la excepción. Punto.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

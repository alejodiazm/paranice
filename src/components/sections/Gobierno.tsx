import { motion } from 'framer-motion'
import { Users, Workflow, CloudCog, CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'

const nodes = [
  {
    icon: Users,
    title: 'RRHH supervisa',
    items: ['Ingresos y salidas del personal', 'Aprobación de roles y eventos laborales', 'Escalamiento humano y disciplinario', 'Supervisión del cargo IT'],
    color: 'border-l-4 border-l-pn-gold bg-pn-gold-bg',
    iconColor: 'text-amber-600',
  },
  {
    icon: Workflow,
    title: 'Modelo operativo',
    items: ['PMP para dirección y riesgos', 'Kanban para flujo de solicitudes', 'ITIL lite para soporte e incidentes', 'NIST CSF para seguridad base'],
    color: 'border-2 border-pn-purple bg-pn-pale',
    iconColor: 'text-pn-purple',
    featured: true,
  },
  {
    icon: CloudCog,
    title: 'IT ejecuta',
    items: ['Activos, accesos y licencias', 'Dispositivos, MDM y proveedores', 'Seguridad, evidencias y controles', 'Dashboard y KPIs semanales'],
    color: 'border-l-4 border-l-pn-violet bg-white',
    iconColor: 'text-pn-violet',
  },
]

const pills = ['Dueño visible', 'SLA medible', 'Mínimo privilegio', 'Evidencia', 'Mejora continua', 'Sin fricción']

export function Gobierno() {
  return (
    <section id="gobierno" className="section-base bg-white">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Modelo de gobierno"
          title="RRHH no pierde supervisión — gana un brazo técnico que responde con evidencia."
          subtitle="Separamos evento laboral de ejecución técnica. RRHH sigue siendo la autoridad sobre las personas; IT asume la operación técnica con trazabilidad."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {nodes.map((node, i) => (
            <RevealSection key={node.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(75,46,131,0.10)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`rounded-2xl p-6 shadow-sm transition-shadow ${node.color} ${node.featured ? 'scale-[1.02]' : ''}`}
              >
                <div className={`mb-4 inline-flex rounded-xl bg-white/60 p-3 ${node.iconColor}`}>
                  <node.icon size={22} />
                </div>
                <h3 className="mb-3 font-display text-lg font-700 text-pn-deep">{node.title}</h3>
                <ul className="space-y-2">
                  {node.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-pn-violet">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-pn-purple" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={0.4} className="mt-8">
          <div className="rounded-2xl bg-pn-pale p-6 text-center">
            <p className="mb-4 text-sm font-600 text-pn-violet">Principios de gobierno que guían cada decisión</p>
            <div className="flex flex-wrap justify-center gap-2">
              {pills.map((p) => (
                <span key={p} className="pill bg-white text-pn-purple shadow-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

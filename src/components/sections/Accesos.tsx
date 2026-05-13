import { motion } from 'framer-motion'
import { Fingerprint, KeyRound, ShieldCheck, UserCheck, LockKeyhole } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'

const apps = [
  { name: 'Slack', angle: 0 },
  { name: 'SAP', angle: 72 },
  { name: 'Adobe CC', angle: 144 },
  { name: 'ClickUp', angle: 216 },
  { name: 'Drive', angle: 288 },
]

const controls = [
  {
    icon: LockKeyhole,
    title: 'MFA obligatorio',
    desc: 'Google Workspace, Slack, SAP, Adobe y ClickUp. 100% de cuentas admin y áreas críticas (Finanzas, RRHH) en el día 30.',
    color: 'bg-white/10 hover:bg-white/20',
  },
  {
    icon: UserCheck,
    title: 'Roles y mínimo privilegio',
    desc: 'Matriz de accesos por rol y área. Cada persona tiene exactamente lo que necesita para su trabajo, nada más.',
    color: 'bg-white/10 hover:bg-white/20',
  },
  {
    icon: ShieldCheck,
    title: 'SSO / SCIM',
    desc: 'Google Workspace como IdP central. SCIM para provisioning automático donde el licenciamiento lo permite. Recertificación trimestral.',
    color: 'bg-white/10 hover:bg-white/20',
  },
]

export function Accesos() {
  const radius = 105

  return (
    <section id="accesos" className="section-base bg-pn-purple">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Seguridad de accesos"
          title="La seguridad sigue identidad, rol, dispositivo y contexto — no la red."
          inverse
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Identity map */}
          <RevealSection direction="left">
            <div className="flex justify-center">
              <div className="relative" style={{ width: 280, height: 280 }}>
                {/* Center */}
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-center">
                  <Fingerprint size={24} className="mb-1 text-white" />
                  <span className="text-[10px] font-700 leading-tight text-white">Google<br />Workspace</span>
                </div>

                {/* SVG lines */}
                <svg className="absolute inset-0" viewBox="0 0 280 280">
                  {apps.map((app) => {
                    const rad = (app.angle * Math.PI) / 180
                    const x2 = 140 + (radius - 26) * Math.cos(rad)
                    const y2 = 140 + (radius - 26) * Math.sin(rad)
                    return (
                      <motion.line
                        key={app.name}
                        x1="140" y1="140" x2={x2} y2={y2}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    )
                  })}
                </svg>

                {/* App chips */}
                {apps.map((app) => {
                  const rad = (app.angle * Math.PI) / 180
                  const x = 140 + radius * Math.cos(rad)
                  const y = 140 + radius * Math.sin(rad)
                  return (
                    <motion.div
                      key={app.name}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + apps.indexOf(app) * 0.08 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-1.5 backdrop-blur-sm border border-white/20 cursor-default"
                      style={{ left: x - 36, top: y - 18 }}
                    >
                      <KeyRound size={12} className="text-pn-lavender" />
                      <span className="text-xs font-700 text-white">{app.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </RevealSection>

          {/* Control cards */}
          <RevealSection delay={0.2} direction="right">
            <div className="space-y-4">
              {controls.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                  className={`rounded-2xl border border-white/20 p-5 transition-colors ${c.color}`}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="rounded-lg bg-white/20 p-2">
                      <c.icon size={16} className="text-white" />
                    </div>
                    <h3 className="font-display text-base font-700 text-white">{c.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}

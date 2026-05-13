import { motion } from 'framer-motion'
import { Shield, Network, ArrowRight, CheckCircle2, XCircle, Lightbulb } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'

const comparison = [
  {
    aspect: 'Qué conecta',
    vpn: 'A la red completa de la empresa',
    zt: 'Al recurso exacto que necesitas',
  },
  {
    aspect: 'Confianza',
    vpn: 'Implícita dentro del túnel',
    zt: 'Verifica usuario + dispositivo + contexto',
  },
  {
    aspect: 'Revocación',
    vpn: 'Todo o nada; granularidad limitada',
    zt: 'Granular, por recurso y en tiempo real',
  },
  {
    aspect: 'Superficie de ataque',
    vpn: 'Mayor si no está segmentada',
    zt: 'Mínima por diseño',
  },
  {
    aspect: 'Ideal para SAP',
    vpn: '✓ Útil como puente de transición',
    zt: '✓ Meta final con piloto en día 45',
  },
]

const timeline = [
  { label: 'Hoy', desc: 'VPN evaluar o mantener para recursos internos y SAP', color: 'bg-pn-pale border-pn-lavender' },
  { label: 'Día 30', desc: 'Diagnóstico de arquitectura real, SAP y recursos internos', color: 'bg-pn-pale border-pn-lavender' },
  { label: 'Día 45', desc: 'Piloto Zero Trust con IT, Finanzas y usuarios SAP', color: 'bg-pn-purple/10 border-pn-purple/30' },
  { label: 'Día 90', desc: 'Zero Trust en producción — VPN como excepción controlada', color: 'bg-pn-mint border-emerald-300' },
]

export function VPNZeroTrust() {
  return (
    <section className="section-base bg-white">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="VPN vs Zero Trust"
          title="La VPN es la escalera. Zero Trust es el destino."
          subtitle="No descartamos la VPN de un día para otro — la usamos como puente mientras construimos la arquitectura de confianza cero que Paranice necesita a largo plazo."
        />

        {/* Comparison cards */}
        <RevealSection>
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {/* VPN card */}
            <div className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-slate-200 p-3">
                  <Network size={22} className="text-slate-600" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-700 text-slate-700">VPN Tradicional</h3>
                  <span className="text-xs font-600 text-slate-400">Transición controlada</span>
                </div>
              </div>
              <ul className="space-y-2">
                {['Conecta al túnel de red completo', 'Confianza implícita dentro del perímetro', 'Difícil revocar acceso granular', 'Útil para recursos on-premise y SAP hoy'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    {i < 3
                      ? <XCircle size={14} className="mt-0.5 shrink-0 text-slate-400" />
                      : <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                    }
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Zero Trust card */}
            <div className="rounded-2xl border-2 border-pn-lavender bg-pn-pale p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-pn-purple/10 p-3">
                  <Shield size={22} className="text-pn-purple" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-700 text-pn-deep">Zero Trust</h3>
                  <span className="text-xs font-700 text-pn-purple">Meta para Paranice</span>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  'Conecta al recurso exacto que necesitas',
                  'Verifica usuario + dispositivo + contexto',
                  'Revocación granular y en tiempo real',
                  'Cloudflare Zero Trust o Tailscale según arquitectura y SAP',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-pn-violet">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-pn-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealSection>

        {/* Comparison table */}
        <RevealSection delay={0.15}>
          <div className="mb-8 overflow-hidden rounded-2xl border border-pn-lavender/40 shadow-sm">
            <div className="grid grid-cols-3 gap-0 bg-pn-deep px-6 py-3 text-xs font-700 uppercase tracking-wide text-white/60">
              <span>Aspecto</span>
              <span>VPN</span>
              <span className="text-pn-lavender">Zero Trust ✓</span>
            </div>
            {comparison.map((row, i) => (
              <div key={row.aspect} className={`grid grid-cols-3 gap-0 px-6 py-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-pn-pale/40'}`}>
                <span className="font-600 text-pn-deep">{row.aspect}</span>
                <span className="text-slate-500">{row.vpn}</span>
                <span className="font-600 text-pn-purple">{row.zt}</span>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Timeline */}
        <RevealSection delay={0.25}>
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-amber-200 bg-pn-gold-bg p-5">
            <Lightbulb size={18} className="shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              <strong>Decisión real:</strong> evaluamos Cloudflare Zero Trust y Tailscale según la arquitectura actual de SAP, los recursos internos, el presupuesto aprobado y la experiencia de usuario del equipo. No elegimos por marca sin diagnóstico.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {timeline.map((step, i) => (
              <div key={step.label} className="flex flex-col items-start gap-1">
                <div className={`w-full rounded-xl border p-4 ${step.color}`}>
                  <p className="mb-1 font-display text-sm font-800 text-pn-deep">{step.label}</p>
                  <p className="text-xs leading-relaxed text-pn-violet">{step.desc}</p>
                </div>
                {i < timeline.length - 1 && (
                  <div className="hidden md:flex w-full justify-end pr-1 text-pn-lavender">
                  </div>
                )}
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PackageCheck, Apple, Monitor, AlertCircle } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'
import { AnimatedNumber } from '../ui/AnimatedNumber'

const lifecycle = [
  { label: 'Compra', highlight: false },
  { label: 'Recepción', highlight: false },
  { label: 'MDM & Config', highlight: true },
  { label: 'Asignación', highlight: false },
  { label: 'Soporte', highlight: false },
  { label: 'Devolución', highlight: false },
  { label: 'Baja', highlight: false },
]

export function Stock() {
  const [deviceCount, setDeviceCount] = useState(79)
  const [stockRatio, setStockRatio] = useState(10)

  const apple = Math.round(deviceCount * 0.8)
  const windows = deviceCount - apple
  const stockTarget = Math.ceil((deviceCount * stockRatio) / 100)
  const reorder = Math.ceil(stockTarget / 2)
  const appleStock = Math.max(1, Math.round(stockTarget * 0.75))
  const winStock = Math.max(1, stockTarget - appleStock)
  const meterW = Math.min(96, Math.max(18, 18 + ((stockRatio - 5) / 13) * 78))

  return (
    <section id="activos" className="section-base bg-white">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Control de activos"
          title="El stock de seguridad no es inventario muerto — es continuidad operativa."
          subtitle="Calculamos el stock mínimo necesario para que Paranice nunca quede sin cobertura ante ingresos, fallas o reposiciones urgentes."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Calculator */}
          <RevealSection className="lg:col-span-2" direction="left">
            <div className="card-base h-full p-6">
              <div className="mb-5 flex items-center gap-2">
                <PackageCheck size={20} className="text-pn-purple" />
                <h3 className="font-display text-base font-700 text-pn-deep">Calculadora de stock</h3>
              </div>

              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-600 text-pn-violet">
                  Dispositivos actuales
                </label>
                <input
                  type="number"
                  min={1} max={500}
                  value={deviceCount}
                  onChange={(e) => setDeviceCount(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-xl border border-pn-lavender/60 bg-pn-pale px-4 py-2.5 text-sm font-600 text-pn-deep focus:border-pn-purple focus:outline-none focus:ring-2 focus:ring-pn-purple/20"
                />
              </div>

              <div>
                <div className="mb-1.5 flex justify-between">
                  <label className="text-sm font-600 text-pn-violet">Stock de seguridad</label>
                  <span className="text-sm font-700 text-pn-purple">{stockRatio}% del parque</span>
                </div>
                <input
                  type="range"
                  min={5} max={18} value={stockRatio}
                  onChange={(e) => setStockRatio(Number(e.target.value))}
                  className="w-full accent-pn-purple"
                />
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-pn-pale">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-pn-violet to-pn-purple"
                    animate={{ width: `${meterW}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-pn-pale p-4 text-sm text-pn-violet">
                <PackageCheck size={14} className="mb-1.5 text-pn-purple" />
                Mezcla sugerida: <strong className="text-pn-purple">{appleStock} Apple</strong> + <strong className="text-pn-purple">{winStock} Windows</strong>
                , ajustable por ingresos, fallas y tiempos de compra locales.
              </div>
            </div>
          </RevealSection>

          {/* KPIs */}
          <RevealSection className="lg:col-span-3" delay={0.1}>
            <div className="grid h-full grid-cols-2 gap-4">
              {[
                { icon: Apple, label: 'Apple estimados', value: apple, color: 'bg-pn-pale text-pn-purple' },
                { icon: Monitor, label: 'Windows estimados', value: windows, color: 'bg-pn-pale text-pn-purple' },
                { icon: PackageCheck, label: 'Stock objetivo', value: stockTarget, color: 'bg-pn-mint text-emerald-700' },
                { icon: AlertCircle, label: 'Punto de reposición', value: reorder, color: 'bg-pn-coral text-rose-700' },
              ].map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`kpi-card ${kpi.color} rounded-2xl shadow-sm`}
                >
                  <kpi.icon size={18} className="opacity-60" />
                  <strong className="font-display text-4xl font-800">
                    <AnimatedNumber value={kpi.value} />
                  </strong>
                  <span className="text-xs font-600 opacity-70">{kpi.label}</span>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        </div>

        {/* Lifecycle */}
        <RevealSection delay={0.25} className="mt-8">
          <div className="card-base p-6">
            <p className="mb-5 text-sm font-600 text-pn-violet">Ciclo de vida del dispositivo — el paso MDM es obligatorio antes de asignar</p>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-2">
              {lifecycle.map((step, i) => (
                <div key={step.label} className="flex items-center gap-1">
                  <div className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-center text-xs font-700 ${
                    step.highlight
                      ? 'bg-pn-purple text-white shadow-lg shadow-pn-purple/30'
                      : 'bg-pn-pale text-pn-deep'
                  }`}>
                    {step.label}
                  </div>
                  {i < lifecycle.length - 1 && (
                    <div className="flex-shrink-0 text-pn-lavender">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

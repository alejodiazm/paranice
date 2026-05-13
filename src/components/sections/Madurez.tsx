import { useState } from 'react'
import { motion } from 'framer-motion'
import * as Slider from '@radix-ui/react-slider'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'

const controls = [
  { key: 'inventory', label: 'Inventario y activos', initial: 25 },
  { key: 'identity', label: 'Identidad y accesos', initial: 30 },
  { key: 'mdm', label: 'MDM y endpoints', initial: 20 },
  { key: 'offboarding', label: 'Offboarding y evidencia', initial: 35 },
]

function getStage(score: number): { title: string; desc: string; color: string; ring: string } {
  if (score < 35) return {
    title: 'Base reactiva',
    desc: 'La prioridad es inventario, MFA, ownership claro y salida segura antes de automatizar cualquier cosa.',
    color: 'text-rose-600',
    ring: 'from-rose-400 to-rose-600',
  }
  if (score < 65) return {
    title: 'Control en construcción',
    desc: 'Ya hay trazabilidad inicial. Conviene acelerar MDM, matriz de accesos y medición de SLAs.',
    color: 'text-amber-600',
    ring: 'from-amber-400 to-amber-500',
  }
  if (score < 85) return {
    title: 'Operación gobernada',
    desc: 'La función IT puede escalar automatización, auditorías y continuidad con poco ruido operativo.',
    color: 'text-pn-purple',
    ring: 'from-pn-violet to-pn-purple',
  }
  return {
    title: 'IT estratégico',
    desc: 'La base sólida permite pilotos de productividad, analítica e IA responsable con controles claros.',
    color: 'text-emerald-600',
    ring: 'from-emerald-400 to-emerald-600',
  }
}

export function Madurez() {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(controls.map((c) => [c.key, c.initial]))
  )

  const score = Math.round(Object.values(values).reduce((s, v) => s + v, 0) / controls.length)
  const stage = getStage(score)
  const circumference = 2 * Math.PI * 52

  return (
    <section className="section-base bg-pn-pale">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Simulador de madurez IT"
          title="La conversación cambia cuando el estado IT se puede medir."
          subtitle="Ajusta los sliders para simular el estado actual. Cada dimensión impacta directamente la etapa de madurez."
        />

        <RevealSection>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Dial */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-pn-lavender/40 bg-white p-8 shadow-sm">
              <svg viewBox="0 0 120 120" className="mb-4 w-44">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#EDE8F6" strokeWidth="10" />
                <motion.circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  stroke="url(#ringGrad)"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{ transformOrigin: '60px 60px', transform: 'rotate(-90deg)' }}
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7B5EA7" />
                    <stop offset="100%" stopColor="#4B2E83" />
                  </linearGradient>
                </defs>
                <text x="60" y="55" textAnchor="middle" className="font-display" style={{ fontSize: 26, fontWeight: 800, fill: '#1E1356', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {score}
                </text>
                <text x="60" y="72" textAnchor="middle" style={{ fontSize: 10, fill: '#7B5EA7', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
                  madurez
                </text>
              </svg>

              <motion.h3
                key={stage.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-2 font-display text-2xl font-800 ${stage.color}`}
              >
                {stage.title}
              </motion.h3>
              <motion.p
                key={stage.desc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center text-sm leading-relaxed text-pn-violet"
              >
                {stage.desc}
              </motion.p>
            </div>

            {/* Sliders */}
            <div className="flex flex-col justify-center gap-6 rounded-2xl border border-pn-lavender/40 bg-white p-8 shadow-sm">
              {controls.map((c) => (
                <div key={c.key}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-600 text-pn-deep">{c.label}</span>
                    <span className="text-sm font-700 text-pn-purple">{values[c.key]}%</span>
                  </div>
                  <Slider.Root
                    value={[values[c.key]]}
                    min={0} max={100} step={1}
                    onValueChange={([v]) => setValues((prev) => ({ ...prev, [c.key]: v }))}
                    className="relative flex h-5 touch-none select-none items-center"
                  >
                    <Slider.Track className="relative h-2 grow rounded-full bg-pn-pale">
                      <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-pn-violet to-pn-purple" />
                    </Slider.Track>
                    <Slider.Thumb className="block h-5 w-5 rounded-full bg-white shadow-md ring-2 ring-pn-purple/30 transition-shadow hover:shadow-lg hover:ring-pn-purple focus:outline-none" />
                  </Slider.Root>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

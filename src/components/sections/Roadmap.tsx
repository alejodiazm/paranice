import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import { CheckCircle2, Calendar, Zap } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { RevealSection } from '../ui/RevealSection'
import { roadmap } from '../../data/content'

type PhaseKey = keyof typeof roadmap

const badgeColors: Record<string, string> = {
  mint: 'bg-pn-mint text-emerald-700 border-emerald-200',
  lavender: 'bg-pn-pale text-pn-purple border-pn-lavender',
}

export function Roadmap() {
  const [active, setActive] = useState<PhaseKey>(30)

  const phase = roadmap[active]
  const cfg = badgeColors[phase.badgeColor]

  return (
    <section id="roadmap" className="section-base bg-white">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Roadmap ejecutivo"
          title="Control primero, implementación después, escalamiento cuando la base ya respira."
          subtitle="El plan avanza en tres oleadas calculadas. No corremos antes de tener visibilidad."
        />

        <Tabs.Root
          value={String(active)}
          onValueChange={(v) => setActive(Number(v) as PhaseKey)}
        >
          {/* Tab list */}
          <RevealSection className="mb-6">
            <Tabs.List className="relative flex gap-2 rounded-2xl bg-pn-pale p-1.5">
              {(Object.keys(roadmap) as unknown as PhaseKey[]).map((key) => {
                const p = roadmap[key]
                const isActive = active === key
                return (
                  <Tabs.Trigger
                    key={key}
                    value={String(key)}
                    className="relative flex-1 rounded-xl px-4 py-2.5 text-sm font-700 transition-colors focus:outline-none"
                    style={{ color: isActive ? '#4B2E83' : '#7B5EA7' }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tab-bg"
                        className="absolute inset-0 rounded-xl bg-white shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex flex-col items-center gap-0.5">
                      <span className="hidden md:block">{p.label}</span>
                      <span className="md:hidden text-xs">{key} días</span>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-700 ${badgeColors[p.badgeColor]}`}>
                        {p.badge}
                      </span>
                    </span>
                  </Tabs.Trigger>
                )
              })}
            </Tabs.List>
          </RevealSection>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tabs.Content value={String(active)} forceMount className="grid gap-5 md:grid-cols-3">
                {/* Phase info */}
                <div className="md:col-span-2">
                  <div className="card-base h-full p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-700 ${cfg}`}>
                        <Zap size={11} />
                        {phase.badge}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-pn-violet">
                        <Calendar size={11} />
                        Meta: {phase.date}
                      </span>
                    </div>

                    <h3 className="mb-2 font-display text-2xl font-800 text-pn-deep">{phase.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-pn-violet">{phase.intent}</p>

                    <ul className="space-y-2">
                      {phase.moves.map((move) => (
                        <li key={move} className="flex items-start gap-2 text-sm text-pn-deep">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-pn-purple" />
                          {move}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex flex-col gap-3">
                  {phase.metrics.map((m) => (
                    <div key={m} className="rounded-2xl bg-pn-pale p-4">
                      <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-pn-lavender/40">
                        <motion.div
                          className="h-full rounded-full bg-pn-purple"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                      <p className="text-sm font-600 text-pn-deep">{m}</p>
                    </div>
                  ))}

                  <div className="rounded-2xl bg-pn-deep p-4 text-center mt-auto">
                    <p className="text-xs font-600 text-white/50 mb-1">Meta para</p>
                    <p className="font-display text-sm font-700 text-pn-lavender">{phase.date}</p>
                  </div>
                </div>
              </Tabs.Content>
            </motion.div>
          </AnimatePresence>
        </Tabs.Root>
      </div>
    </section>
  )
}

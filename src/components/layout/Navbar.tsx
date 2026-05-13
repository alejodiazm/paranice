import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { id: 'gobierno', label: 'Gobierno' },
  { id: 'activos', label: 'Activos' },
  { id: 'accesos', label: 'Accesos' },
  { id: 'riesgos', label: 'Riesgos' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'ia', label: 'IA' },
]

export function Navbar() {
  const progress = useScrollProgress()
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id))
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-[9999] h-[3px] bg-gradient-to-r from-pn-purple via-pn-violet to-pn-lavender"
        style={{ width: `${progress}%` }}
      />

      <header className="fixed left-0 right-0 top-[3px] z-50 flex items-center justify-between border-b border-pn-lavender/30 bg-white/80 px-6 py-3 backdrop-blur-md md:px-12">
        <a href="#inicio" className="flex items-center gap-2.5">
          <img
            src="https://whynot-bkt.s3.amazonaws.com/wp-content/uploads/2025/03/PARANICE-HORIZONTAL-MORADO.png"
            alt="Paranice"
            className="h-7 w-auto"
          />
          <span className="hidden rounded-full bg-pn-pale px-3 py-1 text-xs font-700 text-pn-purple sm:block">
            Plan IT 2026
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="relative hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'relative rounded-lg px-4 py-2 text-sm font-600 transition-colors',
                active === item.id ? 'text-pn-purple' : 'text-pn-violet hover:text-pn-purple'
              )}
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-pn-pale"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-pn-purple transition-colors hover:bg-pn-pale md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-[56px] z-40 border-b border-pn-lavender/30 bg-white/95 px-6 py-4 backdrop-blur-md md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'flex items-center rounded-xl px-4 py-3 text-sm font-600 transition-colors',
                  active === item.id
                    ? 'bg-pn-pale text-pn-purple'
                    : 'text-pn-deep hover:bg-pn-pale/50 hover:text-pn-purple'
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { motion } from 'framer-motion'
import { Download, ArrowRight, ShieldCheck, Boxes, Clock, Lock } from 'lucide-react'
import { AnimatedNumber } from '../ui/AnimatedNumber'

const words = ['Construimos', 'el plan IT', 'que Paranice', 'necesita', 'para escalar.']

const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 5 + 2,
  delay: Math.random() * 4,
  duration: 5 + Math.random() * 6,
}))

const kpis = [
  { icon: Clock, label: 'días del plan', value: 90, suffix: '', color: 'bg-pn-pale text-pn-purple' },
  { icon: Boxes, label: 'dispositivos base', value: 79, suffix: '', color: 'bg-pn-pale text-pn-purple' },
  { icon: Clock, label: 'SLA salida sensible', value: 1, prefix: '<', suffix: 'h', color: 'bg-pn-mint text-emerald-700' },
  { icon: ShieldCheck, label: 'meta de cifrado', value: 95, suffix: '%', color: 'bg-pn-pale text-pn-purple' },
]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 md:px-12 lg:flex-row lg:gap-16 lg:px-20 xl:px-28"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_#EDE8F6_0%,_#FAF7FF_55%,_#C8BAE5_100%)]" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-pn-purple/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-8, 8, -8], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Copy */}
      <div className="relative z-10 flex-1 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-pn-lavender bg-white/70 px-4 py-2 text-xs font-700 text-pn-purple backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-pn-purple animate-pulse-slow" />
          Plan Ejecutivo IT · En ejecución desde mayo 2026
        </motion.div>

        <h1 className="mb-6 font-display text-5xl font-800 leading-[1.1] tracking-tight text-pn-deep md:text-6xl lg:text-[4rem]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8 max-w-lg text-lg leading-relaxed text-pn-violet"
        >
          Gobierno, seguridad y continuidad bajo supervisión de RRHH — con metodología PMP, agilidad operativa y un carril de IA responsable como valor agregado desde el día uno.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-wrap gap-3"
        >
          <a href="#gobierno" className="btn-primary">
            <ArrowRight size={16} />
            Ver el plan
          </a>
          <a href="/artifacts/Paranice_Plan_Ejecutivo_IT.pptx" className="btn-ghost">
            <Download size={16} />
            Descargar deck
          </a>
        </motion.div>
      </div>

      {/* KPI cards + product images */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-12 flex-shrink-0 lg:mt-0"
      >
        {/* Product images floating */}
        <div className="relative mb-6 flex justify-center gap-4">
          {[
            'https://whynot-bkt.s3.amazonaws.com/wp-content/uploads/2025/08/PN_Granola_Pistacho_Carrito_v1-512x512.png',
            'https://whynot-bkt.s3.amazonaws.com/wp-content/uploads/2024/08/PN_Pistacho_Carrito-512x512.png',
            'https://whynot-bkt.s3.amazonaws.com/wp-content/uploads/2022/06/PN_Banana_Carrito_v1-1-512x512.png',
          ].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt=""
              className="h-20 w-20 object-contain drop-shadow-lg md:h-24 md:w-24"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}
        </div>

        {/* KPIs grid */}
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
              className={`kpi-card ${kpi.color} min-w-[140px] rounded-2xl shadow-sm`}
            >
              <kpi.icon size={18} className="opacity-60" />
              <strong className="font-display text-3xl font-800">
                <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
              </strong>
              <span className="text-xs font-600 opacity-70">{kpi.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-pn-lavender p-1"
        >
          <div className="h-2 w-1 rounded-full bg-pn-purple" />
        </motion.div>
      </motion.div>
    </section>
  )
}

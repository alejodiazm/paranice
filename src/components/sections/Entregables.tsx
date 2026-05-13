import { motion } from 'framer-motion'
import { FileText, Presentation, Sparkles, Download } from 'lucide-react'
import { RevealSection } from '../ui/RevealSection'

const docs = [
  {
    icon: FileText,
    title: 'Documento ejecutivo formal',
    desc: '15 secciones — resumen ejecutivo, diagnóstico, modelo operativo, riesgos, roadmap, presupuesto por escenarios y fuentes.',
    format: 'Word (.docx)',
    href: '/artifacts/Plan_Ejecutivo_IT_Paranice.docx',
    primary: true,
  },
  {
    icon: Presentation,
    title: 'Presentación ejecutiva',
    desc: '15 slides diseñados para presentar a liderazgo — cobertura completa de todas las preguntas del reto técnico.',
    format: 'PowerPoint (.pptx)',
    href: '/artifacts/Paranice_Plan_Ejecutivo_IT.pptx',
    primary: false,
  },
]

export function Entregables() {
  return (
    <section className="section-base bg-pn-purple">
      <div className="mx-auto max-w-4xl text-center">
        <RevealSection>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-700 text-white">
            <Sparkles size={12} />
            Entregables listos para descargar
          </div>
          <h2 className="mt-4 font-display text-3xl font-800 text-white md:text-4xl">
            Una propuesta que se puede leer,<br className="hidden md:block" /> presentar y defender.
          </h2>
          <p className="mt-4 text-base text-white/60">
            Esta web es la capa interactiva. Los documentos son el soporte ejecutivo formal para enviar o llevar a cualquier reunión.
          </p>
        </RevealSection>

        <RevealSection delay={0.15} className="mt-10 grid gap-4 md:grid-cols-2">
          {docs.map((doc, i) => (
            <motion.a
              key={doc.title}
              href={doc.href}
              target={doc.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              whileHover={{ y: -4, boxShadow: '0 24px 48px rgba(0,0,0,0.3)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ transitionDelay: `${i * 0.1}s` }}
              className={`group flex flex-col rounded-2xl p-6 text-left transition-shadow ${
                doc.primary
                  ? 'bg-white text-pn-deep'
                  : 'border-2 border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15'
              }`}
            >
              <div className={`mb-4 inline-flex rounded-xl p-3 ${doc.primary ? 'bg-pn-pale' : 'bg-white/20'}`}>
                <doc.icon size={22} className={doc.primary ? 'text-pn-purple' : 'text-white'} />
              </div>
              <h3 className={`mb-2 font-display text-base font-700 ${doc.primary ? 'text-pn-deep' : 'text-white'}`}>
                {doc.title}
              </h3>
              <p className={`mb-4 flex-1 text-sm leading-relaxed ${doc.primary ? 'text-pn-violet' : 'text-white/70'}`}>
                {doc.desc}
              </p>
              <div className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${doc.primary ? 'bg-pn-pale' : 'bg-white/10'}`}>
                <span className={`text-xs font-700 ${doc.primary ? 'text-pn-purple' : 'text-white/80'}`}>{doc.format}</span>
                <Download size={14} className={`transition-transform group-hover:translate-y-0.5 ${doc.primary ? 'text-pn-purple' : 'text-white/80'}`} />
              </div>
            </motion.a>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}

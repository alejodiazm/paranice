import { cn } from '../../lib/utils'
import { RevealSection } from './RevealSection'

interface SectionHeaderProps {
  kicker: string
  title: string
  subtitle?: string
  centered?: boolean
  inverse?: boolean
  className?: string
}

export function SectionHeader({ kicker, title, subtitle, centered = false, inverse = false, className }: SectionHeaderProps) {
  return (
    <RevealSection className={cn('mb-12', centered && 'text-center', className)}>
      <span className={cn(
        'section-kicker mb-4 inline-flex',
        inverse && 'border-white/20 bg-white/10 text-white'
      )}>
        {kicker}
      </span>
      <h2 className={cn(
        'font-display text-3xl font-800 leading-tight text-balance md:text-4xl lg:text-[2.6rem]',
        inverse ? 'text-white' : 'text-pn-deep',
        centered && 'mx-auto max-w-2xl'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-lg leading-relaxed',
          inverse ? 'text-white/70' : 'text-pn-violet',
          centered && 'mx-auto max-w-xl'
        )}>
          {subtitle}
        </p>
      )}
    </RevealSection>
  )
}

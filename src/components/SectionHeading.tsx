import { FadeUp } from './RevealText'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  titleClassName = '',
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={`${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <FadeUp>
          <span className="text-[#1DBF73] text-xs font-sans font-medium tracking-[0.2em] uppercase mb-4 block">
            {eyebrow}
          </span>
        </FadeUp>
      )}
      <FadeUp delay={0.1}>
        <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] leading-tight mb-4 ${titleClassName}`}>
          {title}
        </h2>
      </FadeUp>
      {subtitle && (
        <FadeUp delay={0.2}>
          <p className="text-[#A1A1A1] font-sans text-lg md:text-xl max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </FadeUp>
      )}
    </div>
  )
}

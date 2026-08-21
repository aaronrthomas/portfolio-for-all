import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '../data/experience'

const typeStyles: Record<string, string> = {
  leadership: '#1DBF73',
  internship: '#6366f1',
  freelance: '#f59e0b',
  'full-time': '#3b82f6',
}

const typeLabels: Record<string, string> = {
  leadership: 'Leadership',
  internship: 'Internship',
  freelance: 'Freelance',
  'full-time': 'Full-time',
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 md:py-40 bg-[#111111] relative"
      aria-label="Experience"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-16 lg:gap-24">
          {/* Left: Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-[#1DBF73]" />
              <span className="font-sans text-[10px] font-medium tracking-[0.25em] text-[#1DBF73] uppercase">Experience</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold text-[#F5F5F5] leading-[1.1] tracking-[-0.02em]"
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Where I've
                <br />
                <span className="italic font-medium text-[#A1A1A1]">grown.</span>
              </motion.h2>
            </div>

            <motion.p
              className="mt-6 font-sans text-[#A1A1A1] text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Roles, internships and community work that have shaped how I think about design and technology.
            </motion.p>
          </div>

          {/* Right: Timeline */}
          <div className="flex flex-col gap-0">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                className="relative pl-8 pb-12 border-l border-[rgba(255,255,255,0.08)] last:border-l-transparent group"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#0A0A0A]"
                  style={{ backgroundColor: typeStyles[item.type] }}
                  aria-hidden="true"
                />

                {/* Content card */}
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 group-hover:border-[rgba(255,255,255,0.12)] transition-colors duration-300">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="font-sans text-[9px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                      style={{
                        color: typeStyles[item.type],
                        backgroundColor: `${typeStyles[item.type]}15`,
                      }}
                    >
                      {typeLabels[item.type]}
                    </span>
                    <span className="font-sans text-xs text-[#A1A1A1]">{item.period}</span>
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-bold text-[#F5F5F5] mb-1">
                    {item.role}
                  </h3>
                  <p
                    className="font-sans text-sm font-medium mb-4"
                    style={{ color: typeStyles[item.type] }}
                  >
                    {item.organisation}
                  </p>

                  <p className="font-sans text-sm text-[#A1A1A1] leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Focus items */}
                  <ul className="flex flex-col gap-2" aria-label="Key responsibilities">
                    {item.focus.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span
                          className="w-1 h-1 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: typeStyles[item.type] }}
                          aria-hidden="true"
                        />
                        <span className="font-sans text-xs text-[#A1A1A1] leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

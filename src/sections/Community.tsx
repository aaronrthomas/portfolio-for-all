import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { communityItems } from '../data/community'

export default function Community() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="community"
      ref={ref}
      className="py-24 md:py-40 bg-[#0A0A0A] overflow-hidden"
      aria-label="Community and leadership"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-[#1DBF73]" />
              <span className="font-sans text-[10px] font-medium tracking-[0.25em] text-[#1DBF73] uppercase">Community</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2.2rem,5.5vw,5rem)] font-bold text-[#F5F5F5] leading-[1.1] tracking-[-0.02em] max-w-lg"
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Beyond
                <br />
                the Screen.
              </motion.h2>
            </div>
          </div>

          <motion.p
            className="font-sans text-[#A1A1A1] text-base md:text-lg max-w-xs leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            I build communities, not just interfaces.
          </motion.p>
        </div>

        {/* Community grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(255,255,255,0.05)]">
          {communityItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="bg-[#0A0A0A] p-8 group hover:bg-[#111111] transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-sans text-xs text-[#A1A1A1] tracking-wider">{item.year}</span>
                <span className="font-sans text-xs text-[#1DBF73] tracking-wider">{item.subtitle}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-[#F5F5F5] mb-3 group-hover:text-[#1DBF73] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="font-sans text-sm text-[#A1A1A1] leading-relaxed mb-5">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-[9px] tracking-wider uppercase text-[#A1A1A1] border border-[rgba(255,255,255,0.08)] px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="font-display text-2xl md:text-4xl text-[#F5F5F5] italic font-medium">
            "Build things. Teach others. Repeat."
          </p>
        </motion.div>
      </div>
    </section>
  )
}

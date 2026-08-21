import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Real, opinionated takes — not generic design wisdom
const opinions = [
  {
    take: 'Dark mode isn\'t just aesthetic.',
    detail: 'It forces you to think harder about contrast, hierarchy, and what actually matters on the screen. Light mode forgives lazy design.',
  },
  {
    take: '"Minimal" is usually just unfinished.',
    detail: 'There\'s a difference between restraint and laziness. Most "minimal" designs are missing decisions, not making them.',
  },
  {
    take: 'If users need a tutorial, the design failed.',
    detail: 'Documentation exists for complexity you couldn\'t eliminate. Every tooltip is a small admission of defeat.',
  },
  {
    take: 'Accessibility is just good design.',
    detail: 'Not a compliance checklist. When something works for everyone, it usually works better for everyone. Full stop.',
  },
  {
    take: 'Most animations are apologies.',
    detail: 'Motion should earn its place. If you\'re animating because it looks impressive — it probably doesn\'t.',
  },
  {
    take: 'Spacing is the most underrated skill.',
    detail: 'You can feel it immediately when spacing is wrong. Most people can\'t explain why. I can\'t stop noticing.',
  },
]

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section
      id="philosophy"
      ref={ref}
      className="py-24 md:py-40 bg-[#0A0A0A] relative overflow-hidden"
      aria-label="Design opinions"
    >
      {/* Large decorative character */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[20rem] font-bold text-white opacity-[0.02] select-none leading-none translate-x-1/4 pointer-events-none"
        aria-hidden="true"
      >
        "
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.p
          className="font-sans text-[#555] text-sm mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          things I actually believe —
        </motion.p>

        {/* Manifesto — personal and direct */}
        <div className="mb-16 md:mb-20">
          <div className="philosophy-line">
            <motion.p
              className="font-display text-[clamp(2rem,6vw,6rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#F5F5F5]"
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Unpopular opinions
            </motion.p>
          </div>
          <div className="philosophy-line">
            <motion.p
              className="font-display text-[clamp(2rem,6vw,6rem)] italic font-medium leading-[1.15] tracking-[-0.02em] text-[#A1A1A1]"
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              about design.
            </motion.p>
          </div>
        </div>

        {/* Opinions — staggered, not a perfect grid */}
        <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.05)]">
          {opinions.map((opinion, i) => (
            <motion.div
              key={opinion.take}
              className="group py-7 md:py-9 flex flex-col md:flex-row md:items-start gap-4 md:gap-16 hover:bg-[rgba(255,255,255,0.01)] transition-colors duration-300 -mx-4 px-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            >
              {/* Index number — small, not dominant */}
              <span className="font-sans text-[10px] text-[#555] tracking-[0.2em] uppercase mt-1 flex-shrink-0 w-6 md:w-10">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Take */}
              <div className="flex-1">
                <p className="font-display text-xl md:text-2xl font-bold text-[#F5F5F5] mb-3 group-hover:text-[#1DBF73] transition-colors duration-300">
                  {opinion.take}
                </p>
                <p className="font-sans text-sm text-[#555] leading-relaxed group-hover:text-[#A1A1A1] transition-colors duration-300 max-w-xl">
                  {opinion.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing note */}
        <motion.p
          className="font-sans text-xs text-[#555] mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          I'm probably wrong about some of this. That's fine. Opinions are how you learn.
        </motion.p>
      </div>
    </section>
  )
}

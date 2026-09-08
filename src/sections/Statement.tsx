import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'

export default function Statement() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const sp = { stiffness: 55, damping: 20, mass: 0.6 }
  const sectionY  = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), sp)
  const accentX   = useSpring(useTransform(scrollYProgress, [0, 1], [-20, 20]), sp)

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 overflow-hidden bg-[#0A0A0A]"
      aria-label="Statement section"
    >
      {/* Drifting accent orb */}
      <motion.div
        className="absolute right-[-10%] top-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          x: accentX,
          background: 'radial-gradient(circle, rgba(29,191,115,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <span className="font-sans text-[#555] text-sm">an honest opinion —</span>
        </motion.div>

        {/* Large statement */}
        <motion.div style={{ y: sectionY }}>
          {[
            { text: 'Most digital products', italic: false, delay: 0 },
            { text: 'are built for portfolios,', italic: true, delay: 0.07 },
            { text: 'not for people.', italic: false, delay: 0.14 },
          ].map(({ text, italic, delay }) => (
            <div key={text} className="overflow-hidden">
              <motion.h2
                className={`font-display text-[clamp(2.4rem,6.5vw,6rem)] font-bold leading-[1.1] tracking-[-0.02em] ${
                  italic ? 'italic font-medium text-[#A1A1A1]' : 'text-[#F5F5F5]'
                }`}
                initial={{ y: '110%' }}
                animate={isInView ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
              >
                {text}
              </motion.h2>
            </div>
          ))}
        </motion.div>

        {/* Supporting copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-14 max-w-xl ml-auto"
        >
          <p className="font-sans text-[#A1A1A1] text-lg md:text-xl leading-relaxed">
            I want to build things people actually come back to.
            Not because they have to — because it felt good to use.
            That's the bar I hold myself to.
          </p>
          <p className="font-sans text-sm text-[#555] mt-5 leading-relaxed">
            (Yes, I know this is a portfolio. The irony isn't lost on me.)
          </p>
        </motion.div>
      </div>
    </section>
  )
}


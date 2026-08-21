import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function Statement() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 overflow-hidden bg-[#0A0A0A]"
      aria-label="Statement section"
    >



      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow — more human annotation style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <span className="font-sans text-[#555] text-sm">an honest opinion —</span>
        </motion.div>

        {/* Large statement — one real opinion, not an intersection */}
        <motion.div style={{ y }}>
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[clamp(2.4rem,6.5vw,6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#F5F5F5]"
              initial={{ y: '110%' }}
              animate={isInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Most digital products
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[clamp(2.4rem,6.5vw,6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#F5F5F5]"
              initial={{ y: '110%' }}
              animate={isInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.9, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              are built for{' '}
              <span className="italic font-medium text-[#A1A1A1]">portfolios,</span>
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[clamp(2.4rem,6.5vw,6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#F5F5F5]"
              initial={{ y: '110%' }}
              animate={isInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              not for{' '}
              <span className="italic font-medium text-[#A1A1A1]">people.</span>
            </motion.p>
          </div>
        </motion.div>

        {/* Supporting — personal reaction, not a service description */}
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

          {/* Small personal note — not a list of buzzwords */}
          <p className="font-sans text-sm text-[#555] mt-5 leading-relaxed">
            (Yes, I know this is a portfolio. The irony isn't lost on me.)
          </p>
        </motion.div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'

const socialLinks = [
  {
    label: 'LinkedIn ↗',
    href: 'https://linkedin.com',
    description: 'Professional profile',
  },
  {
    label: 'GitHub ↗',
    href: 'https://github.com',
    description: 'Code & projects',
  },
  {
    label: 'Instagram ↗',
    href: 'https://instagram.com',
    description: 'Creative work',
  },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const sp = { stiffness: 55, damping: 20, mass: 0.6 }
  const headingY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), sp)
  const ctaY     = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), sp)

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-40 bg-[#111111] relative overflow-hidden"
      aria-label="Contact Aaron"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1DBF73] opacity-[0.04] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-[#1DBF73]" />
            <span className="font-sans text-[10px] font-medium tracking-[0.25em] text-[#1DBF73] uppercase">Let's Talk</span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h2
              className="font-display text-[clamp(2.5rem,7vw,7rem)] font-bold text-[#F5F5F5] leading-[1.0] tracking-[-0.02em]"
              style={{ y: headingY }}
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Have an idea
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="font-display text-[clamp(2.5rem,7vw,7rem)] font-bold italic font-medium text-[#A1A1A1] leading-[1.0] tracking-[-0.02em]"
              style={{ y: headingY }}
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              worth building?
            </motion.h2>
          </div>

          <motion.p
            className="font-sans text-[#A1A1A1] text-lg md:text-xl leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Let's turn it into something people actually want to use.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            style={{ y: ctaY }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a
              href="mailto:[YOUR EMAIL]"
              className="group inline-flex items-center gap-2.5 bg-[#1DBF73] text-[#0A0A0A] font-sans font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#17a862] transition-all duration-300"
              data-cursor="hover"
              aria-label="Start a conversation via email"
            >
              Start a Conversation ↗
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="font-sans text-xs text-[#A1A1A1] tracking-wider uppercase mb-2">Email</p>
            <a
              href="mailto:[YOUR EMAIL]"
              className="font-sans text-[#F5F5F5] text-lg md:text-xl hover:text-[#1DBF73] transition-colors duration-300"
              data-cursor="hover"
            >
              [YOUR EMAIL] {/* ← Replace with your actual email */}
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex flex-col gap-0 border-t border-[rgba(255,255,255,0.06)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-5 border-b border-[rgba(255,255,255,0.06)] group hover:border-[rgba(29,191,115,0.3)] transition-colors duration-300"
                data-cursor="open"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-sans font-medium text-[#F5F5F5] text-base group-hover:text-[#1DBF73] transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="font-sans text-xs text-[#A1A1A1] hidden sm:block">
                    {link.description}
                  </span>
                </div>
                <motion.div
                  className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center group-hover:border-[#1DBF73] group-hover:bg-[rgba(29,191,115,0.1)] transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#A1A1A1] group-hover:text-[#1DBF73] transition-colors">
                    <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}


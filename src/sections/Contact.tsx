import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform } from 'framer-motion'

const socialLinks = [
  {
    label: 'LinkedIn ↗',
    href: 'https://linkedin.com/in/aaronrthomas',
    description: 'Professional profile',
  },
  {
    label: 'GitHub ↗',
    href: 'https://github.com/aaronrthomas',
    description: 'Code & projects',
  },
  {
    label: 'Graphic Design ↗',
    href: 'https://aaron-gd-portfolio.vercel.app/',
    description: 'Creative work',
  },
]

const WHATSAPP_NUMBER = '+917034670789' // country code + number, no +
const EMAIL = 'aaronrthomas88@gmail.com'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [modalOpen, setModalOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const sp = { stiffness: 55, damping: 20, mass: 0.6 }
  const headingY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), sp)
  const ctaY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), sp)

  return (
    <>
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

          {/* Outer wrapper carries scroll parallax — inner overflow-hidden clips entrance slide */}
          <motion.div style={{ y: headingY }}>
            <div className="overflow-hidden mb-2">
              <motion.h2
                className="font-display text-[clamp(2.5rem,7vw,7rem)] font-bold text-[#F5F5F5] leading-[1.0] tracking-[-0.02em]"
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
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                worth building?
              </motion.h2>
            </div>
          </motion.div>

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
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center gap-2.5 bg-[#1DBF73] text-[#0A0A0A] font-sans font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#17a862] transition-all duration-300 cursor-pointer"
              data-cursor="hover"
              aria-label="Open contact options"
            >
              Start a Conversation ↗
            </button>
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
              href="mailto:aaronrthomas88@gmail.com"
              className="font-sans text-[#F5F5F5] text-lg md:text-xl hover:text-[#1DBF73] transition-colors duration-300"
              data-cursor="hover"
            >
              aaronrthomas88@gmail.com
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
                    <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

    </section>

      {/* ── Contact Modal — rendered via portal into document.body to escape ScrollFade's CSS transform ── */}
      {createPortal(
        <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              aria-hidden="true"
            />

            {/* Centered modal */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Contact options"
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            >
              <div className="w-full max-w-sm pointer-events-auto">
                <div className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-3xl p-6 shadow-2xl">

                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="font-sans font-semibold text-[#F5F5F5] text-lg leading-tight">Reach out</p>
                      <p className="font-sans text-xs text-[#A1A1A1] mt-1">Choose how you'd like to connect</p>
                    </div>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.12)] transition-colors"
                      aria-label="Close"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 1l10 10M11 1L1 11" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Options */}
                  <div className="flex flex-col gap-3">
                    {/* WhatsApp */}
                    <motion.a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(37,211,102,0.08)] border border-[rgba(37,211,102,0.15)] hover:bg-[rgba(37,211,102,0.14)] hover:border-[rgba(37,211,102,0.35)] transition-all duration-200 group"
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* WhatsApp icon */}
                      <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                        <svg width="22" height="22" viewBox="0 0 32 32" fill="white">
                          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.52.67 4.883 1.84 6.927L2 30l7.29-1.808A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.55 11.55 0 01-5.894-1.617l-.422-.252-4.33 1.075 1.1-4.217-.276-.434A11.555 11.555 0 014.4 16C4.4 9.592 9.592 4.4 16 4.4S27.6 9.592 27.6 16 22.408 27.6 16 27.6zm6.34-8.66c-.347-.174-2.054-1.013-2.374-1.13-.32-.116-.552-.174-.784.174-.232.347-.9 1.13-1.104 1.362-.203.232-.406.26-.753.087-.347-.174-1.465-.54-2.79-1.72-1.031-.92-1.727-2.056-1.93-2.403-.203-.347-.022-.534.152-.707.157-.155.347-.405.52-.608.174-.202.232-.347.348-.578.116-.232.058-.434-.029-.608-.087-.174-.784-1.89-1.074-2.588-.283-.68-.57-.588-.784-.598l-.667-.012c-.232 0-.608.087-.926.434-.319.347-1.217 1.19-1.217 2.9s1.246 3.364 1.42 3.596c.174.232 2.452 3.742 5.942 5.248.83.359 1.48.572 1.985.733.834.265 1.593.228 2.193.138.669-.1 2.054-.84 2.344-1.652.29-.812.29-1.508.203-1.652-.086-.145-.318-.232-.665-.405z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-semibold text-[#F5F5F5] text-sm group-hover:text-[#25D366] transition-colors">WhatsApp</p>
                        <p className="font-sans text-xs text-[#A1A1A1] mt-0.5">Quick message or call</p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#A1A1A1] group-hover:text-[#25D366] transition-colors flex-shrink-0">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                      href={`mailto:${EMAIL}`}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(29,191,115,0.08)] border border-[rgba(29,191,115,0.15)] hover:bg-[rgba(29,191,115,0.14)] hover:border-[rgba(29,191,115,0.35)] transition-all duration-200 group"
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Email icon */}
                      <div className="w-11 h-11 rounded-xl bg-[#1DBF73] flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="4" width="20" height="16" rx="3" stroke="white" strokeWidth="1.8" />
                          <path d="M2 8l10 7 10-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-semibold text-[#F5F5F5] text-sm group-hover:text-[#1DBF73] transition-colors">Email</p>
                        <p className="font-sans text-xs text-[#A1A1A1] mt-0.5 truncate">{EMAIL}</p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#A1A1A1] group-hover:text-[#1DBF73] transition-colors flex-shrink-0">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}


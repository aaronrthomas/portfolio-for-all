import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const disciplines = [
  { label: 'UI/UX Design', detail: 'Figma, obsessing over spacing' },
  { label: 'Frontend Dev', detail: 'React, TypeScript, making it real' },
  { label: 'Graphic Design', detail: 'Type, layout, visual identity' },
  { label: 'Branding', detail: 'Making things feel intentional' },
  { label: 'Creative Technology', detail: '3D, motion, generative stuff' },
  { label: 'AI-assisted work', detail: 'Using tools that actually help' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-40 bg-[#111111] relative overflow-hidden"
      aria-label="About Aaron"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left column */}
          <div>
            <motion.p
              className="font-sans text-[#555] text-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              about me —
            </motion.p>

            <div className="overflow-hidden mb-6">
              <motion.h2
                className="font-display text-[clamp(2rem,5vw,4rem)] font-bold text-[#F5F5F5] leading-[1.1] tracking-[-0.02em]"
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                A designer who codes.
                <br />
                <span className="italic font-medium text-[#A1A1A1]">A developer who cares</span>
                <br />
                about design.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="space-y-5"
            >
              <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">
                I'm Aaron — studying CS in Kerala. I started in design: mockups in Figma,
                posters in Illustrator, too much time choosing fonts. Then I got frustrated
                that I couldn't build what I designed. So I learned to code.
              </p>
              <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">
                Now I design and build. Sometimes the same day. I spend too much time on
                spacing and not enough on sleep. I think most UIs are too noisy. I believe
                the best interfaces are the ones you don't think about.
              </p>
              <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">
                I'm still figuring a lot of this out. But I'm doing it in public — through
                projects, experiments, and the occasional thing that actually works.
              </p>
            </motion.div>

            {/* "Currently" personal block — feels alive, not static */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 p-5 border border-[rgba(255,255,255,0.06)] rounded-xl bg-[rgba(255,255,255,0.02)] space-y-2"
            >
              <p className="font-sans text-[10px] text-[#555] tracking-[0.2em] uppercase mb-3">right now</p>
              {/* TODO: update these with real current details */}
              <p className="font-sans text-sm text-[#A1A1A1]">📍 Kerala, India</p>
              <p className="font-sans text-sm text-[#A1A1A1]">🎓 CS & Engineering — final years</p>
              <p className="font-sans text-sm text-[#A1A1A1]">🛠 Building this portfolio (yes, still tweaking it)</p>
              <p className="font-sans text-sm text-[#A1A1A1]">📖 {/* TODO: Add current book */} Something worth reading</p>
              <div className="flex items-center gap-2 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1DBF73] animate-pulse" />
                <span className="font-sans text-xs text-[#1DBF73]">open to freelance & selected projects</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8"
            >
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 bg-[#1DBF73] text-[#0A0A0A] font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#17a862] transition-colors duration-300"
                data-cursor="hover"
              >
                Let's work together
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right column: disciplines */}
          <div>
            <motion.p
              className="font-sans text-[#555] text-sm mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              things I work on —
            </motion.p>

            <div className="flex flex-col">
              {disciplines.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between py-4 border-b border-[rgba(255,255,255,0.06)] hover:border-[rgba(29,191,115,0.3)] transition-colors duration-300 cursor-default"
                >
                  <span className="font-sans font-medium text-[#F5F5F5] text-base group-hover:text-[#1DBF73] transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="font-sans text-xs text-[#555] tracking-wide hidden sm:block group-hover:text-[#A1A1A1] transition-colors duration-300">
                    {item.detail}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

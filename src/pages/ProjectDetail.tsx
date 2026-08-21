import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../data/projects'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-[#0A0A0A] overflow-y-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-[210] flex items-center gap-2 font-sans text-sm text-[#A1A1A1] hover:text-[#F5F5F5] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] px-4 py-2 rounded-full transition-all duration-300 bg-[rgba(10,10,10,0.9)] backdrop-blur-md"
          aria-label="Close case study"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Close
        </button>

        {/* Hero area */}
        <div
          className="w-full min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end relative overflow-hidden"
          style={{ backgroundColor: project.bgColor }}
        >
          {/* Abstract visual */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div
              className="w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
              style={{ backgroundColor: project.accentColor }}
            />
            <div
              className="absolute w-[200px] h-[200px] rounded-full opacity-30 blur-[40px]"
              style={{ backgroundColor: project.accentColor, top: '15%', right: '20%' }}
            />
          </div>
          {/* Oversized project number */}
          <div
            className="absolute inset-0 flex items-center justify-center font-display font-bold text-[15rem] md:text-[20rem] opacity-[0.06] select-none text-white leading-none pointer-events-none"
            aria-hidden="true"
          >
            {project.number}
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-12 pt-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span
                className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase mb-4 block"
                style={{ color: project.accentColor }}
              >
                {project.category}
              </span>
              <h1 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-bold text-[#F5F5F5] leading-[1.0] tracking-[-0.02em] mb-4">
                {project.title}
              </h1>
              <p className="font-sans text-[#A1A1A1] text-lg max-w-lg leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-16 lg:gap-24">
            {/* Main content */}
            <div className="flex flex-col gap-12">
              {project.overview && (
                <CaseSection title="Overview" accentColor={project.accentColor}>
                  <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">{project.overview}</p>
                </CaseSection>
              )}

              {project.problem && (
                <CaseSection title="The Problem" accentColor={project.accentColor}>
                  <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">{project.problem}</p>
                </CaseSection>
              )}

              {project.objective && (
                <CaseSection title="Objective" accentColor={project.accentColor}>
                  <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">{project.objective}</p>
                </CaseSection>
              )}

              {project.process && project.process.length > 0 && (
                <CaseSection title="Process" accentColor={project.accentColor}>
                  <ol className="flex flex-col gap-3" aria-label="Design process steps">
                    {project.process.map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span
                          className="font-sans text-[10px] font-medium tracking-wider mt-1 shrink-0 w-6"
                          style={{ color: project.accentColor }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans text-[#A1A1A1] text-sm leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CaseSection>
              )}

              {project.outcome && (
                <CaseSection title="Outcome" accentColor={project.accentColor}>
                  <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">{project.outcome}</p>
                </CaseSection>
              )}

              {/* Visual placeholder */}
              <CaseSection title="Visuals" accentColor={project.accentColor}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: project.bgColor }}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(ellipse at ${n % 2 === 0 ? '70%' : '30%'} 50%, ${project.accentColor} 0%, transparent 70%)`,
                        }}
                        aria-hidden="true"
                      />
                      <span className="relative font-sans text-xs text-[#A1A1A1] tracking-widest uppercase">
                        Screen {n} — Placeholder
                      </span>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-[10px] text-[#A1A1A1] tracking-wider mt-3">
                  ↑ Replace these placeholders with actual project screens/mockups
                </p>
              </CaseSection>
            </div>

            {/* Sidebar */}
            <div className="lg:self-start lg:sticky lg:top-24 flex flex-col gap-6">
              <div className="border border-[rgba(255,255,255,0.06)] rounded-xl p-6 bg-[rgba(255,255,255,0.02)]">
                <h3 className="font-sans text-xs text-[#A1A1A1] tracking-[0.2em] uppercase mb-5">Project Details</h3>

                <div className="flex flex-col gap-5">
                  <DetailRow label="Year" value={project.year} />
                  <DetailRow label="Category" value={project.category} />
                  {project.tools && (
                    <div>
                      <p className="font-sans text-[10px] text-[#A1A1A1] tracking-wider uppercase mb-2">Tools</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="font-sans text-xs text-[#F5F5F5] border border-[rgba(255,255,255,0.1)] px-3 py-1 rounded-full"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="border rounded-xl p-6"
                style={{ borderColor: `${project.accentColor}30`, backgroundColor: `${project.accentColor}08` }}
              >
                <p className="font-sans text-xs text-[#A1A1A1] tracking-wider mb-3">
                  Want to see more details for this project?
                </p>
                <a
                  href="#contact"
                  onClick={() => onClose()}
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium transition-colors"
                  style={{ color: project.accentColor }}
                >
                  Get in touch ↗
                </a>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="mt-20 pt-10 border-t border-[rgba(255,255,255,0.06)]">
            <button
              onClick={onClose}
              className="group inline-flex items-center gap-2 font-sans text-sm text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:-translate-x-1 transition-transform">
                <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to all work
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function CaseSection({ title, children, accentColor }: { title: string; children: React.ReactNode; accentColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-4 h-px" style={{ backgroundColor: accentColor }} aria-hidden="true" />
        <h2 className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase" style={{ color: accentColor }}>
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-sans text-[10px] text-[#A1A1A1] tracking-wider uppercase mb-1">{label}</p>
      <p className="font-sans text-sm text-[#F5F5F5]">{value}</p>
    </div>
  )
}

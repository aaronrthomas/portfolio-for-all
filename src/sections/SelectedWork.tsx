import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  onClick: (project: Project) => void
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' }}
      animate={isInView ? { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' } : {}}
      transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="project-card group border-t border-[rgba(255,255,255,0.08)] pt-6 pb-10 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      data-cursor="view"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
      aria-label={`View ${project.title} case study`}
    >
      {/* ── TOP META ROW ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[11px] text-[#3a3a3a] tracking-[0.25em]">
            {project.number}
          </span>
          <span className="w-px h-3 bg-[rgba(255,255,255,0.1)]" />
          <span className="font-sans text-[11px] text-[#555] tracking-[0.2em]">
            {project.year}
          </span>
        </div>
        <span
          className="font-sans text-[10px] tracking-[0.22em] uppercase font-medium"
          style={{ color: project.accentColor }}
        >
          {project.category}
        </span>
      </div>

      {/* ── IMAGE BLOCK (full-width, 16:9) ── */}
      <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
        <motion.div
          className="w-full h-full project-card-image flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: project.bgColor }}
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.coverImage ? (
            /* Real cover image */
            <img
              src={project.coverImage}
              alt={`${project.title} cover`}
              className="absolute inset-0 w-full h-full object-cover object-center"
              draggable={false}
            />
          ) : (
            /* Abstract visual fallback */
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div
                className="w-48 h-48 md:w-72 md:h-72 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: project.accentColor }}
              />
              <div
                className="absolute w-24 h-24 md:w-36 md:h-36 rounded-full opacity-35"
                style={{ backgroundColor: project.accentColor, top: '18%', right: '22%' }}
              />
              <div
                className="absolute w-10 h-10 md:w-16 md:h-16 border-2 rounded-full opacity-25"
                style={{ borderColor: project.accentColor, bottom: '22%', left: '18%' }}
              />
              {/* Project number watermark */}
              <div className="relative z-10 font-display text-[6rem] md:text-[10rem] font-bold opacity-[0.06] select-none text-white leading-none">
                {project.number}
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase px-5 py-2.5 rounded-full border backdrop-blur-sm"
                  style={{ color: project.accentColor, borderColor: project.accentColor, backgroundColor: 'rgba(0,0,0,0.4)' }}
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.88, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  View Case Study
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── BOTTOM ROW: Title left · Description + CTA right ── */}
      <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12">
        {/* Title */}
        <motion.h3
          className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F5F5] leading-tight tracking-[-0.01em] shrink-0"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {project.title}
        </motion.h3>

        {/* Description + CTA */}
        <div className="flex flex-col gap-4 md:max-w-sm lg:max-w-md">
          <p className="font-sans text-[#6a6a6a] text-sm md:text-base leading-relaxed">
            {project.description}
          </p>
          <motion.div
            className="flex items-center gap-2 font-sans text-sm font-medium w-fit"
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.35 }}
            style={{ color: project.accentColor }}
          >
            <span>View Project</span>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

interface SelectedWorkProps {
  onProjectClick: (project: Project) => void
}

export default function SelectedWork({ onProjectClick }: SelectedWorkProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start end', 'end start'],
  })
  const sp = { stiffness: 55, damping: 20, mass: 0.6 }
  const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -50]), sp)

  return (
    <section id="work" className="py-24 md:py-40 bg-[#0A0A0A]" aria-label="Selected work">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-[#1DBF73]" />
              <span className="font-sans text-[10px] font-medium tracking-[0.25em] text-[#1DBF73] uppercase">
                Selected Work
              </span>
            </motion.div>

            <motion.div style={{ y: titleY }}>
              <div className="overflow-hidden">
                <motion.h2
                  className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-[#F5F5F5] leading-[1.0] tracking-[-0.02em]"
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: '0%' } : {}}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Selected Work
                </motion.h2>
              </div>
            </motion.div>
          </div>

          <motion.p
            className="font-sans text-[#A1A1A1] text-base md:text-lg max-w-xs md:text-right leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A selection of things I've designed, built and experimented with.
          </motion.p>
        </div>

        {/* Projects list */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={onProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

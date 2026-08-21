import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="project-card group border-t border-[rgba(255,255,255,0.08)] pt-6 pb-8 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      data-cursor="view"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
      aria-label={`View ${project.title} case study`}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
        {/* Left: Number + Meta */}
        <div className="lg:w-[180px] shrink-0 flex flex-col justify-between">
          <div>
            <span className="font-sans text-[11px] text-[#A1A1A1] tracking-[0.2em] mb-3 block">
              {project.number}
            </span>
            <motion.div
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F5F5F5] leading-tight">
                {project.title}
              </h3>
            </motion.div>
          </div>
          <div className="mt-4 lg:mt-auto">
            <span className="font-sans text-xs text-[#A1A1A1] tracking-widest">
              {project.year}
            </span>
          </div>
        </div>

        {/* Center: Visual */}
        <div className="lg:flex-1 lg:mx-10 overflow-hidden rounded-lg h-48 sm:h-56 md:h-64 lg:h-48">
          <div
            className="w-full h-full project-card-image flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: project.bgColor }}
          >
            {/* Abstract visual */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div
                className="w-32 h-32 md:w-48 md:h-48 rounded-full opacity-20 blur-2xl"
                style={{ backgroundColor: project.accentColor }}
              />
              <div
                className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full opacity-40"
                style={{ backgroundColor: project.accentColor, top: '20%', right: '25%' }}
              />
              <div
                className="absolute w-8 h-8 md:w-12 md:h-12 border-2 rounded-full opacity-30"
                style={{ borderColor: project.accentColor, bottom: '25%', left: '20%' }}
              />
            </div>

            {/* Project number overlay */}
            <div className="relative z-10 font-display text-[5rem] md:text-[8rem] font-bold opacity-[0.07] select-none text-white leading-none">
              {project.number}
            </div>

            {/* Hover overlay */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full border"
                    style={{ color: project.accentColor, borderColor: project.accentColor }}
                  >
                    View Case Study
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Description + Category + Arrow */}
        <div className="lg:w-[280px] shrink-0 flex flex-col justify-between">
          <div>
            <span
              className="font-sans text-[10px] tracking-[0.18em] uppercase mb-4 block"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>
            <p className="font-sans text-[#A1A1A1] text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          <motion.div
            className="mt-6 flex items-center gap-2 font-sans text-sm font-medium"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: project.accentColor }}
          >
            <span>View Project</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="work" className="py-24 md:py-40 bg-[#0A0A0A]" aria-label="Selected work">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
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

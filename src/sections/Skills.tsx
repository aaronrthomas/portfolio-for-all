import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories, tools } from '../data/skills'

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [activeCategory, setActiveCategory] = useState('design')
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  const activeSkills = skillCategories.find(c => c.id === activeCategory)?.skills ?? []

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 md:py-40 bg-[#0A0A0A]"
      aria-label="Skills and capabilities"
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
              <span className="font-sans text-[10px] font-medium tracking-[0.25em] text-[#1DBF73] uppercase">Capabilities</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-[#F5F5F5] leading-[1.0] tracking-[-0.02em]"
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                What I Do
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-sans text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#1DBF73] text-[#0A0A0A] border-[#1DBF73]'
                  : 'border-[rgba(255,255,255,0.1)] text-[#A1A1A1] hover:border-[rgba(255,255,255,0.25)] hover:text-[#F5F5F5]'
              }`}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.title}
            </button>
          ))}
        </motion.div>

        {/* Skill chips — animated horizontal scroll feel */}
        <motion.div
          key={activeCategory}
          className="flex flex-wrap gap-3 mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeSkills.map((skill, i) => (
            <motion.span
              key={skill}
              className="font-sans text-sm md:text-base font-medium text-[#F5F5F5] border border-[rgba(255,255,255,0.1)] px-5 py-3 rounded-full hover:border-[#1DBF73] hover:text-[#1DBF73] transition-all duration-300 cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Tools section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-8 h-px bg-[rgba(255,255,255,0.2)]" />
            <span className="font-sans text-[10px] font-medium tracking-[0.25em] text-[#A1A1A1] uppercase">Tools I Work With</span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-[rgba(255,255,255,0.05)]">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                className="relative bg-[#0A0A0A] p-6 group cursor-default"
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
              >
                <span className="font-sans font-medium text-[#A1A1A1] text-sm group-hover:text-[#F5F5F5] transition-colors duration-300 block mb-1">
                  {tool.name}
                </span>
                <span className="font-sans text-[10px] text-[#A1A1A1] tracking-wide opacity-0 group-hover:opacity-70 transition-opacity duration-300 leading-snug">
                  {tool.description}
                </span>
                <span
                  className="absolute top-3 right-3 font-sans text-[9px] tracking-wider text-[#A1A1A1] opacity-0 group-hover:opacity-50 transition-opacity"
                  aria-hidden="true"
                >
                  {tool.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

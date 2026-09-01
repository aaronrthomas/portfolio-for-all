import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { playgroundItems } from '../data/community'

const bgGradients: Record<string, string> = {
  p1: 'radial-gradient(ellipse at 30% 50%, #4f46e5 0%, #1a1a2e 60%)',
  p2: 'radial-gradient(ellipse at 70% 30%, #7c3aed 0%, #1e1a2e 60%)',
  p3: 'radial-gradient(ellipse at 50% 60%, #059669 0%, #0d1f17 60%)',
  p4: 'radial-gradient(ellipse at 40% 40%, #d97706 0%, #2d1a0e 60%)',
  p5: 'radial-gradient(ellipse at 60% 60%, #dc2626 0%, #2d0a0a 60%)',
  p6: 'radial-gradient(ellipse at 30% 70%, #2563eb 0%, #0a1a2d 60%)',
  p7: 'radial-gradient(ellipse at 50% 30%, #ca8a04 0%, #1a1a0d 60%)',
  p8: 'radial-gradient(ellipse at 60% 40%, #9333ea 0%, #1a0d2e 60%)',
}

export default function Playground() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const sp = { stiffness: 55, damping: 20, mass: 0.6 }
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), sp)

  return (
    <section
      id="playground"
      ref={ref}
      className="py-24 md:py-40 bg-[#111111] relative"
      aria-label="Creative playground"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-[#1DBF73]" />
            <span className="font-sans text-[10px] font-medium tracking-[0.25em] text-[#1DBF73] uppercase">Playground</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-[#F5F5F5] leading-[1.0] tracking-[-0.02em]"
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Playground
            </motion.h2>
          </div>

          <motion.p
            className="mt-4 font-sans text-[#A1A1A1] text-base md:text-lg max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Things that don't fit a case study. Experiments, renders, type work, and whatever comes next.
          </motion.p>
        </div>

        {/* Masonry-style grid */}
        <motion.div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3" style={{ y: gridY }}>
          {playgroundItems.map((item, i) => {
            const isHovered = hoveredId === item.id
            const isTall = i % 3 === 0

            return (
              <motion.div
                key={item.id}
                className="relative overflow-hidden rounded-lg break-inside-avoid cursor-default"
                style={{
                  height: isTall ? 280 : 200,
                  background: bgGradients[item.id] || `radial-gradient(ellipse, ${item.accentColor} 0%, ${item.bgColor} 70%)`,
                }}
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.06 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor="explore"
              >
                {/* Abstract visual element */}
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <div
                    className="w-20 h-20 rounded-full opacity-30 blur-xl"
                    style={{ backgroundColor: item.accentColor }}
                  />
                </div>

                {/* Hover metadata overlay */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-[rgba(0,0,0,0.7)] flex flex-col justify-end p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p
                          className="font-sans text-[9px] tracking-wider uppercase mb-1"
                          style={{ color: item.accentColor }}
                        >
                          {item.category}
                        </p>
                        <p className="font-sans font-medium text-sm text-[#F5F5F5] leading-tight mb-1">
                          {item.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="font-sans text-[10px] text-[#A1A1A1]">{item.tool}</p>
                          <p className="font-sans text-[10px] text-[#A1A1A1]">{item.year}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Always-visible title snippet (non-hovered) */}
                {!isHovered && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
                    <p className="font-sans text-xs font-medium text-[rgba(255,255,255,0.7)] truncate">
                      {item.title}
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Note */}
        <motion.p
          className="mt-12 text-center font-sans text-xs text-[#A1A1A1] tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          More experiments happening all the time
        </motion.p>
      </div>
    </section>
  )
}


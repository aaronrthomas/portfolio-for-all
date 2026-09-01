import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Wraps any section so it:
 *   – fades IN  as it enters the viewport from below   (0 → 1)
 *   – stays fully visible while it fills the screen
 *   – fades OUT as it exits the viewport upward        (1 → 0)
 *
 * Spring config matches the rest of the site's scroll animations.
 */
export default function ScrollFade({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // Progress goes from 0 (section bottom touches viewport bottom)
    // to 1 (section top exits viewport top)
    offset: ['start end', 'end start'],
  })

  // Keyframes:  enter → visible  →  exit
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.78, 1],
    [0,    1,    1,  0]
  )

  // Spring for inertial smoothing
  const opacity = useSpring(rawOpacity, { stiffness: 55, damping: 20, mass: 0.7 })

  // Subtle upward drift on exit (matches the feel of the hero exit)
  const rawY = useTransform(scrollYProgress, [0.75, 1], ['0%', '-6%'])
  const y    = useSpring(rawY, { stiffness: 55, damping: 20, mass: 0.7 })

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, willChange: 'opacity, transform' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'view' | 'open' | 'drag' | 'explore'

const cursorLabels: Record<CursorState, string> = {
  default: '',
  hover: '',
  view: 'VIEW',
  open: 'OPEN',
  drag: 'DRAG',
  explore: 'EXPLORE',
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState<CursorState>('default')
  const cursorRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.body.classList.add('custom-cursor-active')

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    // Detect interactive elements
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.dataset.cursor) {
        setState(target.dataset.cursor as CursorState)
      } else if (target.closest('[data-cursor]')) {
        const el = target.closest('[data-cursor]') as HTMLElement
        setState(el.dataset.cursor as CursorState)
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setState('hover')
      }
    }

    const handleHoverEnd = () => setState('default')

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [mouseX, mouseY, visible])

  const isExpanded = state !== 'default'
  const hasLabel = state !== 'default' && state !== 'hover'

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{
        opacity: visible ? 1 : 0,
        width: isExpanded ? (hasLabel ? 80 : 40) : 12,
        height: isExpanded ? (hasLabel ? 80 : 40) : 12,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div
        className="w-full h-full rounded-full bg-white flex items-center justify-center"
      >
        {hasLabel && (
          <motion.span
            className="text-[9px] font-sans font-semibold tracking-widest text-black uppercase"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {cursorLabels[state]}
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

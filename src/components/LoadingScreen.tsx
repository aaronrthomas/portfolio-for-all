import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

// Letters of the name to animate individually
const NAME_CHARS = 'AARON'.split('')
const TAGLINE = 'Designer × Developer × Creator'

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'exit'>('loading')

  // Drive the progress counter
  useEffect(() => {
    // Accelerating progress: slow → fast → slow at end
    const intervals = [
      { target: 30, duration: 400 },
      { target: 65, duration: 300 },
      { target: 85, duration: 250 },
      { target: 100, duration: 350 },
    ]

    let current = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const runSegment = (index: number) => {
      if (index >= intervals.length) return
      const { target, duration } = intervals[index]
      const steps = target - current
      const stepDuration = duration / steps

      let step = 0
      const tick = () => {
        step++
        current++
        setProgress(current)
        if (step < steps) {
          timeoutId = setTimeout(tick, stepDuration)
        } else {
          // Short pause then next segment
          timeoutId = setTimeout(() => runSegment(index + 1), 80)
        }
      }
      timeoutId = setTimeout(tick, stepDuration)
    }

    // Brief pause before starting
    timeoutId = setTimeout(() => runSegment(0), 300)

    return () => clearTimeout(timeoutId)
  }, [])

  // When progress hits 100, move to reveal phase then exit
  useEffect(() => {
    if (progress === 100) {
      const revealTimer = setTimeout(() => setPhase('reveal'), 200)
      const exitTimer = setTimeout(() => setPhase('exit'), 1200)
      const completeTimer = setTimeout(() => onComplete(), 2000)
      return () => {
        clearTimeout(revealTimer)
        clearTimeout(exitTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [progress, onComplete])

  const isExiting = phase === 'exit'

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="loader"
          className="loader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Sliding exit curtain */}
          <motion.div
            className="loader-curtain"
            initial={{ scaleY: 0 }}
            animate={isExiting ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: '0%' }}
          />

          {/* Grain overlay */}
          <div className="grain-overlay" aria-hidden="true" />

          {/* Content */}
          <div className="loader-content">

            {/* Animated name */}
            <div className="loader-name" aria-label="Aaron">
              {NAME_CHARS.map((char, i) => (
                <div key={i} className="loader-char-wrapper">
                  <motion.span
                    className="loader-char"
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      delay: 0.1 + i * 0.07,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div className="loader-tagline-wrapper">
              <motion.p
                className="loader-tagline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {TAGLINE}
              </motion.p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="loader-footer">
            {/* Progress number */}
            <motion.span
              className="loader-counter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {String(progress).padStart(2, '0')}
              <span className="loader-counter-pct">%</span>
            </motion.span>

            {/* Progress bar track */}
            <div className="loader-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <motion.div
                className="loader-bar-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                style={{ originX: '0%' }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
            </div>

            {/* Label */}
            <motion.span
              className="loader-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Portfolio
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

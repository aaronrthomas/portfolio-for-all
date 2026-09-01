import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/* ─────────────────────────────────────────────
   3-D FLOATING PARTICLE
───────────────────────────────────────────── */
function Particle({
  x, y, size, opacity, delay, color,
}: {
  x: string; y: string; size: number
  opacity: number; delay: number; color: string
}) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: color,
        boxShadow: `0 0 ${size * 4}px ${color}`,
        filter: 'blur(0.5px)',
      }}
      animate={{
        y: ['0%', '-18px', '6px', '0%'],
        opacity: [opacity * 0.5, opacity, opacity * 0.6, opacity * 0.5],
        scale: [1, 1.15, 0.95, 1],
      }}
      transition={{
        duration: 5 + delay * 1.3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    />
  )
}

/* ─────────────────────────────────────────────
   3-D TILTABLE GLASS CARD
───────────────────────────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 22 })
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 22 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const sGlowX = useSpring(glowX, { stiffness: 120, damping: 20 })
  const sGlowY = useSpring(glowY, { stiffness: 120, damping: 20 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width   // 0-1
    const py = (e.clientY - rect.top) / rect.height   // 0-1
    rotX.set((0.5 - py) * 18)
    rotY.set((px - 0.5) * 24)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  const handleLeave = () => {
    rotX.set(0); rotY.set(0)
    glowX.set(50); glowY.set(50)
  }

  const bgGlow = useTransform(
    [sGlowX, sGlowY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(29,191,115,0.13) 0%, rgba(10,10,10,0.0) 60%)`
  )

  return (
    <motion.div
      ref={cardRef}
      className="hero-glass-card cursor-default"
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformPerspective: 800,
        background: bgGlow as any,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.025 }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 28 } }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // ── Scroll-linked exit ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Smooth spring config for scroll-driven values
  const scrollSpring = { stiffness: 60, damping: 20, mass: 0.6 }

  const rawScrollScale   = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const rawScrollOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const rawContentY      = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const rawContentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollScale       = useSpring(rawScrollScale,    scrollSpring)
  const scrollOpacity     = useSpring(rawScrollOpacity,  scrollSpring)
  const contentY          = useSpring(rawContentY as any, scrollSpring)
  const contentOpacity    = useSpring(rawContentOpacity, scrollSpring)

  // Normalised mouse position [0 → 1]
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // ── Scene tilt (whole hero panel rotates in 3-D) ──
  const rawTiltX = useTransform(mouseY, [0, 1], [7, -7])
  const rawTiltY = useTransform(mouseX, [0, 1], [-9, 9])
  const tiltX = useSpring(rawTiltX, { stiffness: 28, damping: 22 })
  const tiltY = useSpring(rawTiltY, { stiffness: 28, damping: 22 })

  // ── Background parallax (deepest, moves most) ──
  const rawBgX = useTransform(mouseX, [0, 1], [-32, 32])
  const rawBgY = useTransform(mouseY, [0, 1], [-16, 16])
  const bgX = useSpring(rawBgX, { stiffness: 20, damping: 22 })
  const bgY = useSpring(rawBgY, { stiffness: 20, damping: 22 })

  // ── Mid-layer parallax (crows / slash) ──
  const rawMidX = useTransform(mouseX, [0, 1], [-14, 14])
  const rawMidY = useTransform(mouseY, [0, 1], [-7, 7])
  const midX = useSpring(rawMidX, { stiffness: 32, damping: 22 })
  const midY = useSpring(rawMidY, { stiffness: 32, damping: 22 })

  // ── Foreground parallax (card / title, moves least) ──
  const rawFgX = useTransform(mouseX, [0, 1], [-6, 6])
  const rawFgY = useTransform(mouseY, [0, 1], [-3, 3])
  const fgX = useSpring(rawFgX, { stiffness: 45, damping: 22 })
  const fgY = useSpring(rawFgY, { stiffness: 45, damping: 22 })

  // ── Dynamic spotlight that follows mouse ──
  const rawSpotLeft = useTransform(mouseX, [0, 1], ['10%', '85%'])
  const rawSpotTop  = useTransform(mouseY, [0, 1], ['10%', '85%'])
  const spotLeft = useSpring(rawSpotLeft as any, { stiffness: 50, damping: 26 })
  const spotTop  = useSpring(rawSpotTop  as any, { stiffness: 50, damping: 26 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // ── Depth-sorted particles ──
  const particles = [
    { x: '8%',  y: '28%', size: 3,   opacity: 0.55, delay: 0,   color: 'rgba(29,191,115,0.7)' },
    { x: '20%', y: '72%', size: 2,   opacity: 0.35, delay: 1.1, color: 'rgba(255,255,255,0.6)' },
    { x: '42%', y: '18%', size: 2.5, opacity: 0.40, delay: 2.2, color: 'rgba(255,255,255,0.5)' },
    { x: '66%', y: '80%', size: 1.5, opacity: 0.30, delay: 0.6, color: 'rgba(29,191,115,0.5)' },
    { x: '78%', y: '24%', size: 3.5, opacity: 0.45, delay: 1.7, color: 'rgba(255,255,255,0.4)' },
    { x: '88%', y: '60%', size: 2,   opacity: 0.30, delay: 0.3, color: 'rgba(29,191,115,0.6)' },
    { x: '55%', y: '90%', size: 2.5, opacity: 0.35, delay: 1.4, color: 'rgba(255,255,255,0.5)' },
    { x: '33%', y: '45%', size: 1.5, opacity: 0.25, delay: 2.8, color: 'rgba(255,255,255,0.4)' },
  ]

  // ── Crows ──
  const crows = [
    { top: '11%', right: '32%', delay: 0.2, sz: 0.70 },
    { top: '8%',  right: '23%', delay: 0.5, sz: 1.00 },
    { top: '16%', right: '18%', delay: 0.8, sz: 0.85 },
    { top: '7%',  right: '13%', delay: 0.3, sz: 0.60 },
    { top: '21%', right: '9%',  delay: 1.0, sz: 0.75 },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0c0c0c]"
      style={{ perspective: '1100px', perspectiveOrigin: '50% 50%' }}
      aria-label="Hero section"
    >

      {/* ══════════════════════════════════════
          3-D TILTING SCENE
      ══════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: tiltX, rotateY: tiltY, scale: scrollScale, opacity: scrollOpacity }}
        initial={{ rotateX: -22, rotateY: 28, scale: 0.86, opacity: 0 }}
        animate={{ rotateX: 0,   rotateY: 0,  scale: 1,    opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* ── DEPTH LAYER 0 — Background image ── */}
        <motion.div
          className="absolute inset-0 scale-125"
          style={{ x: bgX, y: bgY }}
          aria-hidden="true"
        >
          <img
            src="/hero-warrior.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
          {/* Colour grading */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(120deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.65) 100%)' }}
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, transparent 40%, rgba(0,0,0,0.9) 100%)' }}
          />
          {/* Subtle teal colour wash */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(0,60,40,0.18) 0%, transparent 65%)' }}
          />
        </motion.div>

        {/* ── DEPTH LAYER 1 — Diagonal light slash ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none hero-slash"
          style={{ x: midX, y: midY }}
          aria-hidden="true"
        />

        {/* ── DEPTH LAYER 1 — Mouse spotlight ── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: 700,
            height: 700,
            left: spotLeft,
            top: spotTop,
            x: '-50%',
            y: '-50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.045) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
          aria-hidden="true"
        />

        {/* ── DEPTH LAYER 1 — Floating particles ── */}
        {particles.map((p, i) => <Particle key={i} {...p} />)}

        {/* ── DEPTH LAYER 2 — Crows (mid) ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ x: midX, y: midY }}
          aria-hidden="true"
        >
          {crows.map((c, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: c.top, right: c.right }}
              initial={{ opacity: 0, y: -14 }}
              animate={{
                opacity: [0, 0.7, 0.5, 0.7],
                y: [0, -10, 2, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: c.delay + 1.6 },
                y: { duration: 4.5 + i * 0.4, delay: c.delay + 1.6, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <svg width={28 * c.sz} height={16 * c.sz} viewBox="0 0 28 16" fill="none">
                <path
                  d="M14 8 C10 4 4 2 0 4 C4 4 7 6 9 8 C6 7 3 8 1 10 C5 9 9 9 11 10 C12 11 13 12 14 12 C15 12 16 11 17 10 C19 9 23 9 27 10 C25 8 22 7 19 8 C21 6 24 4 28 4 C24 2 18 4 14 8Z"
                  fill="rgba(255,255,255,0.55)"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>

        {/* ── DEPTH LAYER 3 — Grain ── */}
        <div className="grain-overlay" style={{ opacity: 0.055 }} aria-hidden="true" />

      </motion.div>
      {/* ══ end of 3-D tilting scene ══ */}


      {/* ══════════════════════════════════════
          CONTENT (above scene, keeps readability)
      ══════════════════════════════════════ */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col"
        style={{ perspective: '900px', y: contentY, opacity: contentOpacity }}
      >

        {/* Nav spacer */}
        <div className="h-20" />

        {/* Main grid */}
        <div className="flex-1 flex items-center w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* ── LEFT — glass card stack (closest layer) ── */}
            <motion.div
              className="flex flex-col gap-6"
              style={{ x: fgX, y: fgY }}
              initial={{ opacity: 0, x: -60, rotateY: -12 }}
              animate={{ opacity: 1, x: 0,   rotateY: 0 }}
              transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* Tiltable glass card */}
              <TiltCard>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DBF73] animate-pulse" />
                  <span className="text-[10px] tracking-[0.22em] text-[#1DBF73] uppercase font-sans font-semibold">
                    Available for work
                  </span>
                </div>
                <p className="font-sans text-[#d4d4d4] text-sm md:text-[0.95rem] leading-relaxed">
                  Are you ready to see code and design<br />
                  done by the same hand — with the<br />
                  precision of a craftsman?
                </p>
              </TiltCard>

              {/* CTAs */}
              <motion.div
                className="flex items-center gap-3 flex-wrap"
                initial={{ opacity: 0, y: 20, rotateX: 8 }}
                animate={{ opacity: 1, y: 0,  rotateX: 0 }}
                transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  id="hero-cta-work"
                  onClick={() => scrollTo('work')}
                  className="hero-cta-primary group"
                  data-cursor="view"
                >
                  See Work
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  id="hero-cta-contact"
                  onClick={() => scrollTo('contact')}
                  className="hero-cta-secondary"
                  data-cursor="hover"
                >
                  Say hello
                </button>
              </motion.div>

              {/* Availability chips */}
              <motion.div
                className="flex flex-col gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                <span className="text-[9px] tracking-[0.22em] text-[#555] uppercase font-sans">Currently available</span>
                <div className="flex items-center gap-2">
                  {['Freelance', 'Full-time', 'Collaboration'].map((label, i) => (
                    <motion.div
                      key={label}
                      className="flex items-center border border-[rgba(255,255,255,0.12)] rounded px-2.5 py-1 bg-[rgba(0,0,0,0.45)]"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 + i * 0.08 }}
                      whileHover={{ borderColor: 'rgba(29,191,115,0.4)', scale: 1.05 }}
                    >
                      <span className="text-[9px] font-sans text-[#888] tracking-wide">{label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT — giant ghost title (deeper layer) ── */}
            <motion.div
              className="flex flex-col justify-end items-end"
              style={{ x: midX, y: midY }}
            >
              <div className="overflow-hidden">
                <motion.h1
                  className="hero-giant-title"
                  initial={{ y: '115%', rotateX: -14, opacity: 0 }}
                  animate={{ y: '0%',   rotateX: 0,   opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  aria-label="Aaron"
                >
                  AARON
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  className="hero-giant-subtitle"
                  initial={{ y: '115%', rotateX: -14, opacity: 0 }}
                  animate={{ y: '0%',   rotateX: 0,   opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  THOMAS
                </motion.p>
              </div>

              {/* Role tag */}
              <motion.div
                className="flex items-center gap-3 mt-4"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 1.1 }}
              >
                <div className="w-8 h-px bg-[rgba(255,255,255,0.18)]" />
                <span className="text-[10px] tracking-[0.3em] text-[#888] uppercase font-sans">
                  Designer · Developer · Student
                </span>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-8 flex items-end justify-between"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.0 }}
        >
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { label: 'Twitter',  href: '#', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              { label: 'LinkedIn', href: '#', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
              { label: 'GitHub',   href: '#', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
            ].map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="hero-social-icon group"
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                  className="opacity-50 group-hover:opacity-100 transition-opacity">
                  <path d={icon} />
                </svg>
              </motion.a>
            ))}
          </div>

          {/* Animated scroll cue */}
          <button
            onClick={() => scrollTo('work')}
            className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#555] uppercase font-sans hover:text-[#1DBF73] transition-colors duration-300"
            aria-label="Next section"
          >
            Scroll
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              »
            </motion.span>
          </button>
        </motion.div>
      </motion.div>

      {/* ── VERTICAL LABEL (fixed to right edge) ── */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.3 }}
        aria-hidden="true"
      >
        <span
          className="text-[8px] tracking-[0.3em] text-[#3a3a3a] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          PORTFOLIO · 2025
        </span>
        <motion.div
          className="w-px bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.18)] to-transparent"
          style={{ height: 80 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, delay: 2.5 }}
        />
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #0c0c0c)' }}
        aria-hidden="true"
      />
    </section>
  )
}


import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Hero() {

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const layer1X = useTransform(springX, [-1, 1], [-12, 12])
  const layer1Y = useTransform(springY, [-1, 1], [-8, 8])
  const layer2X = useTransform(springX, [-1, 1], [-20, 20])
  const layer2Y = useTransform(springY, [-1, 1], [-14, 14])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0A0A]"
      aria-label="Hero section"
    >
      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Parallax green orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute"
          style={{ x: layer2X, y: layer2Y, top: '10%', right: '8%' }}
        >
          <div className="w-[560px] h-[560px] rounded-full bg-[#1DBF73] opacity-[0.055] blur-[130px]" />
        </motion.div>
      </div>

      {/* Secondary blue accent orb */}
      <div
        className="absolute pointer-events-none bottom-[5%] left-[-8%] w-[400px] h-[400px] rounded-full bg-[#2563eb] opacity-[0.03] blur-[110px]"
        aria-hidden="true"
      />

      {/* Ghost watermark name */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ x: layer1X, y: layer1Y }}
        aria-hidden="true"
      >
        <span
          className="font-display font-bold leading-none tracking-[-0.04em]"
          style={{
            fontSize: 'clamp(7rem, 20vw, 22rem)',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            color: 'transparent',
          }}
        >
          AARON
        </span>
      </motion.div>

      {/* Main content grid */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-28 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-8 items-start">

          {/* LEFT — headline block */}
          <div className="flex flex-col">

            {/* Availability tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#1DBF73] animate-pulse" aria-hidden="true" />
              <span className="font-sans text-[11px] tracking-[0.22em] text-[#A1A1A1] uppercase">
                Available for work — Kerala, India
              </span>
            </motion.div>

            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mb-6 self-start"
            >
              <div className="inline-flex items-center gap-2 border border-[rgba(255,255,255,0.1)] rounded-full px-4 py-1.5 bg-[rgba(255,255,255,0.03)]">
                <span className="font-sans text-[10px] text-[#555] tracking-widest uppercase">CS student</span>
                <span className="w-px h-3 bg-[rgba(255,255,255,0.12)]" />
                <span className="font-sans text-[10px] text-[#1DBF73] tracking-widest uppercase font-semibold">Designer & Developer</span>
              </div>
            </motion.div>

            {/* Staggered headline lines */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                className="font-display font-bold leading-[0.93] tracking-[-0.03em] text-[#F5F5F5]"
                style={{ fontSize: 'clamp(3rem, 8.5vw, 8rem)' }}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Most devs
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.p
                className="font-display font-bold leading-[0.93] tracking-[-0.03em] text-[#A1A1A1] italic"
                style={{ fontSize: 'clamp(3rem, 8.5vw, 8rem)' }}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                skip design.
              </motion.p>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.p
                className="font-display font-bold leading-[0.93] tracking-[-0.03em] text-[#F5F5F5]"
                style={{ fontSize: 'clamp(3rem, 8.5vw, 8rem)' }}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.74, ease: [0.22, 1, 0.36, 1] }}
              >
                Most designers
              </motion.p>
            </div>
            {/* Last line — no overflow-hidden since flex-wrap can create 2nd line that'd be clipped */}
            <motion.div
              className="font-display font-bold leading-[0.93] tracking-[-0.03em] flex items-baseline gap-3 flex-wrap"
              style={{ fontSize: 'clamp(3rem, 8.5vw, 8rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.86, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="italic text-[#A1A1A1]">skip code.</span>
              <span className="hero-both-wrap text-[#F5F5F5]">
                I don't.
                <svg
                  className="hero-underline"
                  viewBox="0 0 80 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7 C15 3, 35 9, 55 5 C65 2, 74 6, 78 4"
                    stroke="#1DBF73"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.div>

            {/* Description + CTAs */}
            <motion.div
              className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-sans text-[#555] text-sm md:text-base leading-relaxed max-w-xs">
                I got tired of designing things I couldn't build — so I learned both.
              </p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => scrollTo('work')}
                  className="group inline-flex items-center gap-2 bg-[#F5F5F5] text-[#0A0A0A] font-sans font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-[#1DBF73] transition-all duration-300"
                  data-cursor="view"
                >
                  See work
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="group inline-flex items-center gap-2 border border-[rgba(255,255,255,0.12)] text-[#F5F5F5] font-sans font-medium text-sm px-6 py-3.5 rounded-full hover:border-[#1DBF73] hover:text-[#1DBF73] transition-all duration-300"
                  data-cursor="hover"
                >
                  Say hello
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — editorial sidebar */}
          <motion.aside
            className="hidden md:flex flex-col gap-8 items-end text-right w-[180px] flex-shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Stats"
          >
            {/* Rotated year label */}
            <span
              className="font-sans text-[9px] tracking-[0.3em] text-[#333] uppercase self-center"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              PORTFOLIO · 2025
            </span>

            {/* Stat cards */}
            {[
              { num: '3+', label: 'Years building' },
              { num: '12+', label: 'Projects shipped' },
              { num: '∞', label: 'Things to learn' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="group flex flex-col items-end gap-0.5 cursor-default"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + i * 0.12 }}
              >
                <span className="font-display font-bold text-[2.2rem] text-[#F5F5F5] leading-none group-hover:text-[#1DBF73] transition-colors duration-300">
                  {stat.num}
                </span>
                <span className="font-sans text-[10px] text-[#555] tracking-[0.1em] uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}

            {/* Thin vertical rule */}
            <motion.div
              className="w-px self-center bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.07)] to-transparent"
              style={{ height: 64 }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            />

            {/* Currently */}
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-sans text-[9px] tracking-[0.2em] text-[#444] uppercase mb-1">Currently</span>
              <span className="font-sans text-[11px] text-[#555]">🎓 CS @ Kerala</span>
              <span className="font-sans text-[11px] text-[#555]">🛠 building this</span>
              <span className="font-sans text-[11px] text-[#555]">🎧 good music</span>
            </div>
          </motion.aside>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
        aria-hidden="true"
      />
    </section>
  )
}


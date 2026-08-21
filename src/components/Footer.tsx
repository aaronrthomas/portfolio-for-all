import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const footerLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Playground', href: '#playground' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const [time, setTime] = useState('')
  const [easterEgg, setEasterEgg] = useState(false)

  // Live clock (Easter egg: status indicator)
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.06)]" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Main footer row */}
        <div className="py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Brand */}
          <div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="font-sans font-semibold text-sm tracking-[0.15em] text-[#F5F5F5] uppercase hover:text-[#1DBF73] transition-colors duration-300 block mb-1"
            >
              Aaron R Thomas
            </a>
            <p className="font-sans text-xs text-[#A1A1A1] tracking-wider">
              Designer × Developer × Creative Technologist
            </p>
          </div>

          {/* Center: Links */}
          <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="font-sans text-sm text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Status + Time */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1DBF73] animate-pulse" aria-hidden="true" />
              <span className="font-sans text-xs text-[#A1A1A1]">Available for work</span>
            </div>
            {time && (
              <span
                className="font-sans text-xs text-[#A1A1A1] tabular-nums"
                title="Current time in Kerala, India"
                aria-label={`Current local time: ${time} IST`}
              >
                {time} IST
              </span>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="py-6 border-t border-[rgba(255,255,255,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-[#A1A1A1]">
            © 2026 Aaron R Thomas
          </p>

          {/* Easter egg button — "Built with curiosity" */}
          <button
            className="font-sans text-xs text-[#A1A1A1] hover:text-[#1DBF73] transition-colors duration-300 cursor-default group relative"
            onClick={() => setEasterEgg(!easterEgg)}
            aria-label="Easter egg"
          >
            <span className="group-hover:opacity-0 transition-opacity duration-300">
              Built with curiosity.
            </span>
            <motion.span
              className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#1DBF73] whitespace-nowrap"
              animate={{ opacity: easterEgg ? 1 : undefined }}
            >
              {easterEgg ? '✦ You found it.' : '✦ And a lot of coffee.'}
            </motion.span>
          </button>
        </div>
      </div>
    </footer>
  )
}

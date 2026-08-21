import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        animate={{
          paddingTop: scrolled ? '1rem' : '1.75rem',
          paddingBottom: scrolled ? '1rem' : '1.75rem',
          backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          borderBottomColor: scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0)',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-sans font-semibold text-sm tracking-[0.15em] text-[#F5F5F5] uppercase hover:text-[#1DBF73] transition-colors duration-300"
            data-cursor="hover"
          >
            Aaron R Thomas
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="font-sans text-sm text-[#A1A1A1] hover:text-[#F5F5F5] tracking-wide transition-colors duration-300 relative group"
                data-cursor="hover"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#1DBF73] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="hidden md:inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#F5F5F5] border border-[rgba(255,255,255,0.15)] px-5 py-2.5 rounded-full hover:border-[#1DBF73] hover:text-[#1DBF73] transition-all duration-300"
              data-cursor="hover"
            >
              Let's Talk
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="rotate-0">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] w-7 h-7 items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block w-6 h-px bg-[#F5F5F5]"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-px bg-[#F5F5F5]"
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-px bg-[#F5F5F5]"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-1 flex flex-col justify-center px-8 pt-24 pb-12">
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                      className="font-display text-5xl sm:text-6xl font-medium text-[#F5F5F5] hover:text-[#1DBF73] transition-colors duration-300 block py-2 leading-none"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
                  className="inline-flex items-center gap-2 font-sans text-base font-medium text-[#1DBF73] border border-[#1DBF73] px-6 py-3 rounded-full"
                >
                  Let's Talk
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>
            </div>

            <div className="px-8 pb-8">
              <p className="font-sans text-xs text-[#A1A1A1] tracking-wider">
                AARON R THOMAS — DESIGNER × DEVELOPER
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

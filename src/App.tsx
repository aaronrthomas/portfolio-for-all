import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

import Hero from './sections/Hero'
import Statement from './sections/Statement'
import SelectedWork from './sections/SelectedWork'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Community from './sections/Community'
import Playground from './sections/Playground'
import Philosophy from './sections/Philosophy'
import Contact from './sections/Contact'

import ProjectDetail from './pages/ProjectDetail'
import type { Project } from './data/projects'

// Quick-nav sections for keyboard shortcut easter egg
const quickNavSections = [
  { key: 'w', label: 'Work', id: 'work' },
  { key: 'a', label: 'About', id: 'about' },
  { key: 's', label: 'Skills', id: 'skills' },
  { key: 'e', label: 'Experience', id: 'experience' },
  { key: 'c', label: 'Contact', id: 'contact' },
]

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [quickNavOpen, setQuickNavOpen] = useState(false)

  // Keyboard shortcut: Cmd/Ctrl+K opens quick nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setQuickNavOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setQuickNavOpen(false)
      }
      // Quick nav section keys when open
      if (quickNavOpen) {
        const match = quickNavSections.find((s) => s.key === e.key.toLowerCase())
        if (match) {
          const el = document.getElementById(match.id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          setQuickNavOpen(false)
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [quickNavOpen])

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project)
  }, [])

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null)
  }, [])

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <Statement />
        <SelectedWork onProjectClick={handleProjectClick} />
        <About />
        <Skills />
        <Experience />
        <Community />
        <Playground />
        <Philosophy />
        <Contact />
      </main>

      <Footer />

      {/* Project detail overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            key={selectedProject.id}
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}
      </AnimatePresence>

      {/* Quick Nav Easter Egg — Cmd/Ctrl + K */}
      <AnimatePresence>
        {quickNavOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[300] bg-[rgba(0,0,0,0.6)] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickNavOpen(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[301] w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95, y: '-48%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: '-48%' }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Quick navigation"
            >
              <div className="bg-[#171717] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden shadow-2xl mx-4">
                <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
                  <p className="font-sans text-[10px] text-[#A1A1A1] tracking-[0.2em] uppercase">
                    Quick Navigation — Press a key to jump
                  </p>
                </div>
                <div className="py-2">
                  {quickNavSections.map((section) => (
                    <button
                      key={section.id}
                      className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-200 text-left group"
                      onClick={() => {
                        const el = document.getElementById(section.id)
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                        setQuickNavOpen(false)
                      }}
                    >
                      <span className="font-sans text-[10px] font-mono text-[#1DBF73] border border-[#1DBF73] px-1.5 py-0.5 rounded w-6 text-center">
                        {section.key.toUpperCase()}
                      </span>
                      <span className="font-sans text-sm text-[#F5F5F5] group-hover:text-[#1DBF73] transition-colors">
                        {section.label}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-[rgba(255,255,255,0.06)]">
                  <p className="font-sans text-[10px] text-[#A1A1A1]">
                    Press <kbd className="font-mono bg-[rgba(255,255,255,0.06)] px-1 py-0.5 rounded text-[10px]">ESC</kbd> to close
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'

// ── Shared sub-components ────────────────────────────────────────────────────

function CaseSection({
  title,
  children,
  accentColor,
}: {
  title: string
  children: React.ReactNode
  accentColor: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-4 h-px" style={{ backgroundColor: accentColor }} aria-hidden="true" />
        <h2
          className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-sans text-[10px] text-[#A1A1A1] tracking-wider uppercase mb-1">{label}</p>
      <p className="font-sans text-sm text-[#F5F5F5]">{value}</p>
    </div>
  )
}

// ── ProjectBody — shared between modal (ProjectDetail) and full page ──────────

export function ProjectBody({
  project,
  onClose,
  isPage = false,
}: {
  project: ReturnType<typeof projects[0]['slug'] extends string ? () => (typeof projects)[0] : never> extends never
    ? (typeof projects)[0]
    : (typeof projects)[0]
  onClose: () => void
  isPage?: boolean
}) {
  const BASE_URL = 'https://aaronrthomas.vercel.app'

  // Breadcrumb structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${BASE_URL}/#work` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${BASE_URL}/work/${project.slug}` },
    ],
  }

  // CreativeWork structured data
  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.seoTitle ?? project.title,
    url: `${BASE_URL}/work/${project.slug}`,
    description: project.metaDescription ?? project.description,
    author: { '@type': 'Person', name: 'Aaron R Thomas' },
    dateCreated: project.year,
    keywords: [project.primaryKeyword, ...(project.secondaryKeywords ?? [])].join(', '),
    image: project.coverImage ? `${BASE_URL}${project.coverImage}` : undefined,
  }

  return (
    <>
      {/* ── Per-page SEO meta (only injected when rendered as a standalone route) ── */}
      {isPage && (
        <Helmet>
          <title>{project.seoTitle ?? `${project.title} | Aaron R Thomas`}</title>
          <meta name="description" content={project.metaDescription ?? project.description} />
          <link rel="canonical" href={`${BASE_URL}/work/${project.slug}`} />
          <meta property="og:title" content={project.seoTitle ?? project.title} />
          <meta property="og:description" content={project.metaDescription ?? project.description} />
          <meta property="og:url" content={`${BASE_URL}/work/${project.slug}`} />
          {project.coverImage && (
            <meta property="og:image" content={`${BASE_URL}${project.coverImage}`} />
          )}
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={project.seoTitle ?? project.title} />
          <meta name="twitter:description" content={project.metaDescription ?? project.description} />
          {project.coverImage && (
            <meta name="twitter:image" content={`${BASE_URL}${project.coverImage}`} />
          )}
          <script type="application/ld+json">{JSON.stringify([breadcrumbSchema, creativeWorkSchema])}</script>
        </Helmet>
      )}

      {/* ── Hero area ── */}
      <div
        className="w-full min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end relative overflow-hidden"
        style={{ backgroundColor: project.bgColor }}
      >
        {project.coverImage ? (
          <>
            <img
              src={project.coverImage}
              alt={`${project.title} — cover image`}
              className="absolute inset-0 w-full h-full object-cover object-center"
              draggable={false}
              loading={isPage ? 'eager' : 'lazy'}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)' }}
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div
                className="w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
                style={{ backgroundColor: project.accentColor }}
              />
              <div
                className="absolute w-[200px] h-[200px] rounded-full opacity-30 blur-[40px]"
                style={{ backgroundColor: project.accentColor, top: '15%', right: '20%' }}
              />
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center font-display font-bold text-[15rem] md:text-[20rem] opacity-[0.06] select-none text-white leading-none pointer-events-none"
              aria-hidden="true"
            >
              {project.number}
            </div>
          </>
        )}

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-12 pt-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {/* Breadcrumb nav — visible only on full page route */}
            {isPage && (
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 font-sans text-xs text-[#555]">
                  <li>
                    <a href="/" className="hover:text-[#A1A1A1] transition-colors">Home</a>
                  </li>
                  <li aria-hidden="true">→</li>
                  <li>
                    <a href="/#work" className="hover:text-[#A1A1A1] transition-colors">Work</a>
                  </li>
                  <li aria-hidden="true">→</li>
                  <li aria-current="page" className="text-[#A1A1A1]">{project.title}</li>
                </ol>
              </nav>
            )}
            <span
              className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase mb-4 block"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>
            <h1 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-bold text-[#F5F5F5] leading-[1.0] tracking-[-0.02em] mb-4">
              {project.title}
            </h1>
            <p className="font-sans text-[#A1A1A1] text-lg max-w-lg leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Case study content ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-16 lg:gap-24">
          {/* Main content */}
          <div className="flex flex-col gap-12">
            {project.overview && (
              <CaseSection title="Overview" accentColor={project.accentColor}>
                <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">{project.overview}</p>
              </CaseSection>
            )}

            {project.problem && (
              <CaseSection title="The Problem" accentColor={project.accentColor}>
                <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">{project.problem}</p>
              </CaseSection>
            )}

            {project.objective && (
              <CaseSection title="Objective" accentColor={project.accentColor}>
                <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">{project.objective}</p>
              </CaseSection>
            )}

            {project.process && project.process.length > 0 && (
              <CaseSection title="Process" accentColor={project.accentColor}>
                <ol className="flex flex-col gap-3" aria-label="Design process steps">
                  {project.process.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className="font-sans text-[10px] font-medium tracking-wider mt-1 shrink-0 w-6"
                        style={{ color: project.accentColor }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-[#A1A1A1] text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </CaseSection>
            )}

            {project.outcome && (
              <CaseSection title="Outcome" accentColor={project.accentColor}>
                <p className="font-sans text-[#A1A1A1] text-base md:text-lg leading-relaxed">{project.outcome}</p>
              </CaseSection>
            )}

            {/* Visuals */}
            <CaseSection title="Visuals" accentColor={project.accentColor}>
              {project.screenshots && project.screenshots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((src, i) => (
                    <div key={i} className="w-full overflow-hidden rounded-xl">
                      <img
                        src={src}
                        alt={`${project.title} — screen ${i + 1} of ${project.screenshots!.length}`}
                        className="w-full h-auto object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              ) : project.coverImage ? (
                <div className="w-full overflow-hidden rounded-xl">
                  <img
                    src={project.coverImage}
                    alt={`${project.title} — project overview`}
                    className="w-full h-auto object-cover object-center"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: project.bgColor }}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(ellipse at ${n % 2 === 0 ? '70%' : '30%'} 50%, ${project.accentColor} 0%, transparent 70%)`,
                        }}
                        aria-hidden="true"
                      />
                      <span className="relative font-sans text-xs text-[#A1A1A1] tracking-widest uppercase">
                        Screen {n}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CaseSection>
          </div>

          {/* Sidebar */}
          <aside className="lg:self-start lg:sticky lg:top-24 flex flex-col gap-6">
            <div className="border border-[rgba(255,255,255,0.06)] rounded-xl p-6 bg-[rgba(255,255,255,0.02)]">
              <h3 className="font-sans text-xs text-[#A1A1A1] tracking-[0.2em] uppercase mb-5">Project Details</h3>
              <div className="flex flex-col gap-5">
                <DetailRow label="Year" value={project.year} />
                <DetailRow label="Category" value={project.category} />
                {project.tools && (
                  <div>
                    <p className="font-sans text-[10px] text-[#A1A1A1] tracking-wider uppercase mb-2">Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-sans text-xs text-[#F5F5F5] border border-[rgba(255,255,255,0.1)] px-3 py-1 rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className="border rounded-xl p-6"
              style={{ borderColor: `${project.accentColor}30`, backgroundColor: `${project.accentColor}08` }}
            >
              <p className="font-sans text-xs text-[#A1A1A1] tracking-wider mb-3">
                Want to work together on something like this?
              </p>
              <a
                href={isPage ? '/#contact' : '#contact'}
                onClick={isPage ? undefined : () => onClose()}
                className="inline-flex items-center gap-2 font-sans text-sm font-medium transition-colors"
                style={{ color: project.accentColor }}
              >
                Get in touch ↗
              </a>
            </div>

            {/* Related work links */}
            <div className="border border-[rgba(255,255,255,0.06)] rounded-xl p-6 bg-[rgba(255,255,255,0.02)]">
              <p className="font-sans text-[10px] text-[#A1A1A1] tracking-[0.2em] uppercase mb-4">More Work</p>
              <div className="flex flex-col gap-3">
                {projects
                  .filter((p) => p.slug !== project.slug)
                  .slice(0, 3)
                  .map((p) => (
                    <a
                      key={p.slug}
                      href={`/work/${p.slug}`}
                      className="font-sans text-sm text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors flex items-center gap-2 group"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                        style={{ backgroundColor: p.accentColor }}
                      />
                      {p.title}
                    </a>
                  ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Back / CTA */}
        <div className="mt-20 pt-10 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between flex-wrap gap-4">
          {isPage ? (
            <a
              href="/"
              className="group inline-flex items-center gap-2 font-sans text-sm text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:-translate-x-1 transition-transform">
                <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to portfolio
            </a>
          ) : (
            <button
              onClick={onClose}
              className="group inline-flex items-center gap-2 font-sans text-sm text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:-translate-x-1 transition-transform">
                <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to all work
            </button>
          )}

          <a
            href={isPage ? '/#contact' : '#contact'}
            onClick={isPage ? undefined : () => onClose()}
            className="inline-flex items-center gap-2 bg-[#1DBF73] text-[#0A0A0A] font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#17a862] transition-colors duration-300"
          >
            Start a project ↗
          </a>
        </div>
      </div>
    </>
  )
}

// ── ProjectDetail — modal overlay version (used by homepage) ─────────────────

interface ProjectDetailProps {
  project: (typeof projects)[0]
  onClose: () => void
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-[#0A0A0A] overflow-y-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-[210] flex items-center gap-2 font-sans text-sm text-[#A1A1A1] hover:text-[#F5F5F5] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] px-4 py-2 rounded-full transition-all duration-300 bg-[rgba(10,10,10,0.9)] backdrop-blur-md"
          aria-label="Close case study"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Close
        </button>

        <ProjectBody project={project} onClose={onClose} isPage={false} />
      </motion.div>
    </AnimatePresence>
  )
}

// ── ProjectPage — full-page routed version (used by /work/:slug) ─────────────

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    // Scroll to top on route entry
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Helmet>
          <title>Project Not Found | Aaron R Thomas</title>
        </Helmet>
        <div className="text-center">
          <p className="font-display text-6xl font-bold text-[#1DBF73] mb-4">404</p>
          <p className="font-sans text-[#A1A1A1] mb-8">This project doesn't exist (yet).</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-[#1DBF73] text-[#0A0A0A] font-sans font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#17a862] transition-colors"
          >
            ← Back to portfolio
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Minimal top nav for route context */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.9)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="/"
            className="font-display font-bold text-[#F5F5F5] hover:text-[#1DBF73] transition-colors text-lg tracking-tight"
          >
            Aaron R Thomas
          </a>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-sans text-sm text-[#A1A1A1] hover:text-[#F5F5F5] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] px-4 py-2 rounded-full transition-all duration-300"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        </div>
      </nav>

      {/* Content — offset for fixed nav */}
      <div className="pt-16">
        <ProjectBody project={project} onClose={() => navigate('/')} isPage={true} />
      </div>
    </div>
  )
}

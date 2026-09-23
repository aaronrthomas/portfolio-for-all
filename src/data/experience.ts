export interface ExperienceItem {
  id: string
  role: string
  organisation: string
  period: string
  type: 'full-time' | 'internship' | 'leadership' | 'freelance' | 'development'
  focus: string[]
  description: string
}

export const experience: ExperienceItem[] = [
  {
    id: 'uiux-ig-lead',
    role: 'Campus co - Lead',
    organisation: 'μLearn — St. Thomas Institute',
    period: '2024 — Present',
    type: 'leadership',
    description: 'Leading the community at the campus level — creating a space where students learn design thinking, build real skills, and grow together.',
    focus: [
      'Building and growing the community on campus',
      'Student mentoring and skill development',
      'Running workshops and  challenges',
      'Creating learning initiatives and structured programmes',
      'Organising campus events and competitions',
    ],
  },
  {
    id: 'uiux-intern',
    role: 'UI/UX Intern',
    organisation: 'μLearn Foundation',
    period: '2024 — Present',
    type: 'internship',
    description: 'Worked within the μLearn Foundation team contributing to UI/UX, design systems and community-focused digital initiatives.',
    focus: [
      'UI/UX design for foundation platforms and programmes',
      'Contributing to design systems and visual workflows',
      'Supporting student and community initiative design',
      'Creative direction for digital campaigns',
      'Collaborative design work within a distributed team',
    ],
  },
  {
    id: 'web-dev-lead-aicgr',
    role: 'Web Development Lead',
    organisation: 'AI + Compassion Global Relay',
    period: 'Sep 2025 — Present',
    type: 'development',
    description: 'Leading web development efforts for AI + Compassion Global Relay, building and maintaining digital platforms that support the organisation\'s global mission.',
    focus: [
      'Leading frontend and web development initiatives',
      'Designing and building organisation websites and platforms',
      'Collaborating with cross-functional teams on digital strategy',
      'Ensuring accessible and performant web experiences',
      'Mentoring team members on web development best practices',
    ],
  },
  {
    id: 'graphic-design-intern-nasa',
    role: 'Graphic Design Intern',
    organisation: 'NASA Space Apps Challenge',
    period: 'Sep 2026 — Present',
    type: 'internship',
    description: 'Contributing as a graphic design intern for the NASA Space Apps Challenge, creating visual assets and design materials for one of the world\'s largest hackathons.',
    focus: [
      'Designing promotional and event materials',
      'Creating visual assets for digital and print campaigns',
      'Supporting brand consistency across challenge communications',
      'Collaborating with the global Space Apps team',
      'Producing graphics for social media and outreach',
    ],
  },
  {
    id: 'freelance-creative',
    role: 'Freelance Creative , Design Work & Development',
    organisation: 'Independent',
    period: '2023 — Present',
    type: 'freelance',
    description: 'Project-based creative work spanning UI/UX design, web design, branding, social media and digital experiences for various collaborators.',
    focus: [
      'Website design and frontend development',
      'Brand identity and visual systems',
      'Social media design and creative campaigns',
      'Poster design and print collateral',
      'UI/UX design for digital products',
    ],
  },
]

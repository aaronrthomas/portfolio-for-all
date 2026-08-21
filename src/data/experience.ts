export interface ExperienceItem {
  id: string
  role: string
  organisation: string
  period: string
  type: 'full-time' | 'internship' | 'leadership' | 'freelance'
  focus: string[]
  description: string
}

export const experience: ExperienceItem[] = [
  {
    id: 'uiux-ig-lead',
    role: 'UI/UX Interest Group Lead',
    organisation: 'μLearn — St. Thomas Institute',
    period: '2024 — Present',
    type: 'leadership',
    description: 'Leading the UI/UX community at the campus level — creating a space where students learn design thinking, build real skills, and grow together.',
    focus: [
      'Building and growing the UI/UX community on campus',
      'Student mentoring and design skill development',
      'Running workshops and design challenges',
      'Creating learning initiatives and structured programmes',
      'Organising campus design events and competitions',
    ],
  },
  {
    id: 'uiux-intern',
    role: 'UI/UX Intern',
    organisation: 'μLearn Foundation',
    period: '2024',
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
    id: 'freelance-creative',
    role: 'Freelance Creative & Design Work',
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

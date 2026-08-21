export interface CommunityItem {
  id: string
  title: string
  subtitle: string
  year: string
  description: string
  tags: string[]
}

export const communityItems: CommunityItem[] = [
  {
    id: 'uiux-ig',
    title: 'UI/UX Interest Group',
    subtitle: 'Community Lead',
    year: '2024',
    description: 'Founded and lead the UI/UX Interest Group at campus level — creating a space for students to learn design, collaborate and grow.',
    tags: ['Community', 'Design', 'Leadership'],
  },
  {
    id: 'first-pr-cup',
    title: 'First PR Cup',
    subtitle: 'Organiser',
    year: '2024',
    description: 'Organised a campus-level event celebrating students making their first open-source contribution — demystifying GitHub and collaborative development.',
    tags: ['Open Source', 'Events', 'Tech'],
  },
  {
    id: 'student-upskilling',
    title: 'Student Upskilling League',
    subtitle: 'Participant & Contributor',
    year: '2024',
    description: 'Active contributor to the μLearn student upskilling ecosystem — completing and facilitating skill challenges across design and development.',
    tags: ['Education', 'Skills', 'Community'],
  },
  {
    id: 'design-workshops',
    title: 'Design Workshops',
    subtitle: 'Facilitator',
    year: '2023–2024',
    description: 'Ran hands-on design workshops covering Figma basics, UI principles, and design thinking for students new to the field.',
    tags: ['Workshop', 'Mentoring', 'Design'],
  },
  {
    id: 'tech-community',
    title: 'Tech Community Activities',
    subtitle: 'Active Member',
    year: '2023–2024',
    description: 'Regular participant in campus and regional tech community events — hackathons, design challenges and knowledge-sharing sessions.',
    tags: ['Tech', 'Hackathon', 'Community'],
  },
  {
    id: 'creative-campaigns',
    title: 'Creative Campaigns',
    subtitle: 'Designer',
    year: '2023–2024',
    description: 'Designed visual campaigns for college events, tech fests and community initiatives — combining graphic design with event communication.',
    tags: ['Design', 'Campaigns', 'Events'],
  },
]

export interface PlaygroundItem {
  id: string
  title: string
  category: string
  year: string
  tool: string
  bgColor: string
  accentColor: string
}

export const playgroundItems: PlaygroundItem[] = [
  { id: 'p1', title: 'Abstract Form Study', category: '3D · Render', year: '2024', tool: 'Blender', bgColor: '#1a1a2e', accentColor: '#6366f1' },
  { id: 'p2', title: 'Type Experiment I', category: 'Typography', year: '2024', tool: 'Figma', bgColor: '#1e1a2e', accentColor: '#8b5cf6' },
  { id: 'p3', title: 'Generative Poster', category: 'AI · Visual', year: '2024', tool: 'AI tools', bgColor: '#0d1f17', accentColor: '#1DBF73' },
  { id: 'p4', title: 'Motion Loop 01', category: 'Motion', year: '2023', tool: 'Framer Motion', bgColor: '#2d1a0e', accentColor: '#f59e0b' },
  { id: 'p5', title: 'Brand System Sketch', category: 'Branding', year: '2024', tool: 'Figma', bgColor: '#2d0a0a', accentColor: '#ef4444' },
  { id: 'p6', title: 'Liquid Material', category: '3D · Animation', year: '2024', tool: 'Blender', bgColor: '#0a1a2d', accentColor: '#3b82f6' },
  { id: 'p7', title: 'Interface Fragment', category: 'Experimental UI', year: '2023', tool: 'Figma', bgColor: '#1a1a0d', accentColor: '#eab308' },
  { id: 'p8', title: 'Spatial Composition', category: '3D · Render', year: '2024', tool: 'Spline', bgColor: '#1a0d2e', accentColor: '#a855f7' },
]

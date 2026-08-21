export interface SkillCategory {
  id: string
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'design',
    title: 'Design',
    skills: [
      'UI/UX Design',
      'Interaction Design',
      'Prototyping',
      'Design Systems',
      'Visual Design',
      'Branding',
      'Graphic Design',
      'Typography',
    ],
  },
  {
    id: 'development',
    title: 'Development',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Vite',
      'Git / GitHub',
    ],
  },
  {
    id: 'creative-tech',
    title: 'Creative Technology',
    skills: [
      'Figma',
      'Blender',
      'Framer Motion',
      'Spline',
      'AI-assisted design',
      'Generative workflows',
      'Motion Design',
      '3D Visualisation',
    ],
  },
  {
    id: 'other',
    title: 'Other',
    skills: [
      'Product thinking',
      'Creative direction',
      'Community building',
      'Event design',
      'Visual communication',
      'Workshop facilitation',
      'Design mentoring',
    ],
  },
]

export interface Tool {
  name: string
  category: string
  description: string
  icon?: string
}

export const tools: Tool[] = [
  { name: 'Figma', category: 'Design', description: 'UI/UX design, prototyping and design systems' },
  { name: 'React', category: 'Development', description: 'Component-based frontend development' },
  { name: 'Next.js', category: 'Development', description: 'Full-stack React framework for production' },
  { name: 'Tailwind', category: 'Development', description: 'Utility-first CSS for rapid UI development' },
  { name: 'GitHub', category: 'Development', description: 'Version control and collaborative development' },
  { name: 'Blender', category: 'Creative', description: '3D modelling, rendering and animation' },
  { name: 'Spline', category: 'Creative', description: 'Interactive 3D experiences for the web' },
  { name: 'Framer', category: 'Creative', description: 'Motion and interactive web experiences' },
  { name: 'Affinity', category: 'Design', description: 'Graphic design and photo editing suite' },
  { name: 'Notion', category: 'Productivity', description: 'Documentation, planning and project management' },
  { name: 'FigJam', category: 'Design', description: 'Collaborative whiteboarding and ideation' },
  { name: 'VS Code', category: 'Development', description: 'Primary code editor with a custom setup' },
]

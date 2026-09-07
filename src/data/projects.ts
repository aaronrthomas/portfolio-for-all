export interface Project {
  id: string
  number: string
  title: string
  category: string
  tags: string[]
  description: string
  year: string
  accentColor: string
  bgColor: string
  slug: string
  coverImage?: string
  screenshots?: string[]
  // Case study sections
  overview?: string
  problem?: string
  objective?: string
  process?: string[]
  tools?: string[]
  outcome?: string
}

export const projects: Project[] = [
  {
    id: '01',
    number: '01',
    slug: 'canteen-app',
    coverImage: '/canteen.png',
    screenshots: ['/canteen-1.png', '/canteen-2.png', '/canteen-3.png', '/canteen-4.png'],
    title: 'Canteen App',
    category: 'UI/UX · Product Design',
    tags: ['UI/UX', 'Product Design', 'Mobile'],
    description: 'A student-focused digital canteen experience designed to simplify ordering and reduce waiting time.',
    year: '2024',
    accentColor: '#1DBF73',
    bgColor: '#0d2d1e',
    overview: 'A mobile-first ordering platform designed to transform the college canteen experience — reducing queues, improving order accuracy and giving students more time.',
    problem: 'College canteens create daily friction: long queues, miscommunicated orders, cash-only payments and no visibility into wait times. Students lose significant time every day.',
    objective: 'Design a simple, fast ordering flow that works for students on the move — with digital payments, real-time status and a menu that\'s easy to navigate.',
    process: [
      'User interviews with 20+ students to map pain points',
      'Competitive analysis of food delivery apps',
      'Information architecture and user flow mapping',
      'Low-fidelity wireframes → mid-fidelity testing → high-fidelity design',
      'Prototype testing and iteration',
    ],
    tools: ['Figma', 'FigJam', 'Protopie'],
    outcome: 'A complete design system and interactive prototype covering ordering, payment, real-time tracking and canteen-side management.',
  },
  {
    id: '02',
    number: '02',
    slug: 'crowd-management',
    coverImage: '/crowd.png',
    screenshots: ['/crowd-1.png', '/crowd-2.png', '/crowd-3.png', '/crowd-4.png'],
    title: 'Crowd Management',
    category: 'UX · Product Design · Development',
    tags: ['UX', 'Product Design', 'Development'],
    description: 'A digital solution exploring how technology can improve crowd flow and event management.',
    year: '2024',
    accentColor: '#6366f1',
    bgColor: '#12102e',
    overview: 'An exploration of how digital tools — sensor data, heatmaps and real-time dashboards — can make large-scale events safer and more manageable.',
    problem: 'Event organisers lack real-time visibility into crowd density, entry bottlenecks and emergency egress paths, leading to dangerous situations.',
    objective: 'Design a monitoring and management interface that gives event staff actionable insights without cognitive overload.',
    process: [
      'Research into crowd safety incidents and existing solutions',
      'Stakeholder mapping: event managers, security, attendees',
      'Dashboard architecture and data visualisation design',
      'Prototype of monitoring interface and alert system',
    ],
    tools: ['Figma', 'FigJam', 'React', 'Tailwind CSS'],
    outcome: 'A dashboard prototype and design system for real-time crowd monitoring with alert flows and historical data views.',
  },
  {
    id: '03',
    number: '03',
    slug: 'emotional-intelligence',
    coverImage: '/emotional.png',
    screenshots: ['/emo-1.png', '/emo-2.png', '/emo-3.png', '/emo-4.png'],
    title: 'Emotional Intelligence',
    category: 'UI/UX · Research',
    tags: ['UI/UX', 'Research', 'Product'],
    description: 'A research-led design exploration into how digital interfaces can be more emotionally aware and human-centred.',
    year: '2024',
    accentColor: '#f59e0b',
    bgColor: '#2d1a00',
    overview: 'An investigation into emotional design principles — exploring how interfaces can respond to user emotional states and reduce cognitive and emotional friction.',
    problem: 'Most digital products are designed for task efficiency but ignore the emotional state of the user, leading to frustration and disengagement.',
    objective: 'Research emotional design patterns and prototype interface concepts that adapt tone, pacing and visual language to user context.',
    process: [
      'Literature review of emotional design and affective computing',
      'User research on emotional pain points in digital products',
      'Concept development for adaptive interface elements',
      'Prototype of emotionally-aware onboarding flow',
    ],
    tools: ['Figma', 'Notion', 'FigJam'],
    outcome: 'A research report and concept prototype exploring emotional design patterns for future digital product work.',
  },
  {
    id: '04',
    number: '04',
    slug: 'electronic-repair',
    coverImage: '/ec.png',
    screenshots: ['/ec-1.png', '/ec-2.png', '/ec-3.png', '/ec-4.png'],
    title: 'Electronic Repair',
    category: 'Product Design · Development',
    tags: ['Product Design', 'Development', 'Service Design'],
    description: 'A service design and digital platform connecting users with trusted local electronics repair technicians.',
    year: '2023',
    accentColor: '#ef4444',
    bgColor: '#2d0a0a',
    overview: 'A platform that makes finding, booking and tracking electronics repairs simple — bringing trust and transparency to an informal market.',
    problem: 'Finding reliable electronics repair is difficult. Users face distrust, opaque pricing, no tracking and inconsistent quality.',
    objective: 'Design and build a platform that connects users with vetted technicians, shows transparent pricing and tracks repair progress.',
    process: [
      'Service design mapping of the repair journey',
      'User interviews with customers and technicians',
      'Information architecture and booking flow design',
      'Visual design and front-end prototype',
    ],
    tools: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    outcome: 'A fully designed and partially built web platform with booking flows, technician profiles and repair status tracking.',
  },
  {
    id: '05',
    number: '05',
    slug: 'inspiration-station',
    coverImage: '/insp.png',
    screenshots: ['/insp-1.png', '/insp-2.png'],
    title: 'Inspiration Station',
    category: 'Web Design · Development',
    tags: ['Web Design', 'Development', 'Creative'],
    description: 'A curated creative inspiration platform built to surface design, art and culture references for creators.',
    year: '2023',
    accentColor: '#8b5cf6',
    bgColor: '#1a0d2e',
    overview: 'A web platform designed and built to help designers and creators discover curated visual references, mood boards and creative prompts.',
    problem: 'Creative professionals spend too much time hunting for inspiration across scattered platforms with poor curation and no organisation.',
    objective: 'Build a fast, beautiful web experience that surfaces curated creative content with smart categorisation and saving features.',
    process: [
      'Competitive analysis of inspiration platforms',
      'Content architecture and tagging system design',
      'Visual design — editorial, dark, image-forward',
      'Frontend development with dynamic content loading',
    ],
    tools: ['Figma', 'React', 'Tailwind CSS', 'Vite'],
    outcome: 'A working web application with curated content categories, card-based browsing and collection saving functionality.',
  },
  {
    id: '06',
    number: '06',
    slug: 'creative-experiments',
    coverImage: '/ce.png',
    screenshots: ['/ce-1.png', '/ce-2.png', '/ce-3.png', '/ce.png'],
    title: 'Creative Experiments',
    category: 'Creative Technology',
    tags: ['Creative Technology', 'Experiments', '3D', 'Motion'],
    description: 'An ongoing collection of visual experiments spanning 3D renders, motion design, type explorations and AI-assisted creativity.',
    year: '2023–2024',
    accentColor: '#1DBF73',
    bgColor: '#0d2d1e',
    overview: 'A living collection of creative experiments — not client work, not case studies. Just exploration. 3D, motion, type, AI, and whatever comes next.',
    problem: 'Not everything needs a problem. Some work exists purely to experiment, learn and push visual boundaries.',
    objective: 'Maintain an active creative practice outside of structured projects — keeping skills sharp and intuition alive.',
    process: [
      'Weekly visual experiments in Blender, Figma and code',
      'AI-assisted generative visual explorations',
      'Typography and poster design experiments',
      'Motion and interaction prototypes',
    ],
    tools: ['Blender', 'Figma', 'Spline', 'Framer Motion', 'AI tools'],
    outcome: 'An evolving archive of creative work that informs all client and project work.',
  },
]

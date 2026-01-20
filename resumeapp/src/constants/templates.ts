export const resumeTemplates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with subtle colors',
    thumbnail: '/templates/modern.png',
    color: '#3B82F6',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume format with a professional look',
    thumbnail: '/templates/classic.png',
    color: '#1F2937',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern with creative touches and visual elements',
    thumbnail: '/templates/creative.png',
    color: '#EC4899',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Minimalist design focusing on content',
    thumbnail: '/templates/minimal.png',
    color: '#6B7280',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate professional resume template',
    thumbnail: '/templates/professional.png',
    color: '#0891B2',
  },
];

export const defaultResume = {
  title: 'My Resume',
  template: 'modern',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    professionalSummary: '',
    profileImage: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

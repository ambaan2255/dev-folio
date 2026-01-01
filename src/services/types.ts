export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;
  images: string[];
  category: 'Fullstack' | 'Frontend' | 'Backend' | 'AI';
  status: 'Completed' | 'In Progress' | 'Concept';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Database' | 'CDN' | 'PaaS' | 'DevOps' | 'AI' | 'Language';
}

export interface DeveloperInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  photoUrl: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  telegram: string;
  whatsapp: string;
  location: string;
}

export interface WebInfo {
  siteName: string;
  logoUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  grade: string;
  description: string;
  institutionImage: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  description: string;
  companyImage: string;
  location: string;
}

import { Skill } from './types';

export const SKILLS: Skill[] = [
  // Frontend
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "JavaScript", level: 75, category: "Frontend" },
  { name: "React / Next.js", level: 67, category: "Frontend" },
  { name: "HTML", level: 85, category: "Frontend" },
  { name: "CSS", level: 60, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Framer Motion", level: 40, category: "Frontend" },
  
  // Backend
  { name: "Python", level: 56, category: "Backend" },
  { name: "Node.js", level: 96, category: "Backend" },
  
  // Database
  { name: "MySQL", level: 40, category: "Database" },
  { name: "PostgreSQL", level: 62, category: "Database" },
  { name: "MongoDB", level: 98, category: "Database" },
  { name: "RedisDB", level: 45, category: "Database" },
  
  // CDN & Storage
  { name: "AWS / R2", level: 80, category: "CDN" },
  { name: "Cloudflare CDN", level: 85, category: "CDN" },
  { name: "Cloudflare R2", level: 70, category: "CDN" },
  { name: "Cloudflare Stream", level: 60, category: "CDN" },
  { name: "Cloudflare Images", level: 65, category: "CDN" },
  { name: "Vercel Blob", level: 90, category: "CDN" },
  
  // PaaS & Hosting
  { name: "Heroku", level: 95, category: "PaaS" },
  { name: "Render", level: 90, category: "PaaS" },
  { name: "Koyeb", level: 70, category: "PaaS" },
  { name: "Railway", level: 65, category: "PaaS" },
  { name: "Replit", level: 60, category: "PaaS" },
  { name: "Vercel", level: 90, category: "PaaS" },
  { name: "Cloudflare Pages", level: 80, category: "PaaS" },
  { name: "Cloudflare Workers", level: 75, category: "PaaS" },
  { name: "GitHub Pages", level: 85, category: "PaaS" },
  
  // DevOps & Infrastructure
  { name: "VPS", level: 85, category: "DevOps" },
  { name: "GitHub", level: 90, category: "DevOps" },
  { name: "GitHub Actions", level: 75, category: "DevOps" },
  { name: "GitHub Packages", level: 65, category: "DevOps" },
  { name: "Google Cloud", level: 55, category: "DevOps" },
  { name: "AWS", level: 40, category: "DevOps" },
  { name: "Docker", level: 65, category: "DevOps" },
  { name: "Cloudflare Zero Trust", level: 70, category: "DevOps" },
  { name: "Cloudflare DNS", level: 80, category: "DevOps" },
  { name: "Cloudflare Tunnel", level: 65, category: "DevOps" },
  { name: "Cloudflare WAF", level: 75, category: "DevOps" },
  { name: "Cloudflare DDoS Protection", level: 80, category: "DevOps" },
  { name: "Cloudflare Turnstile", level: 60, category: "DevOps" },
  
  // AI & APIs
  { name: "Gemini API", level: 72, category: "AI" },
  { name: "DeepSeek", level: 95, category: "AI" },
  { name: "Claude AI", level: 45, category: "AI" },
  { name: "Grok AI", level: 50, category: "AI" },
  { name: "OpenAI/ChatGPT API", level: 90, category: "AI" },
  { name: "Lovable", level: 95, category: "AI" },
  { name: "Bolt", level: 65, category: "AI" },
  { name: "Dazle", level: 85, category: "AI" },
  { name: "Replit AI", level: 70, category: "AI" },
  { name: "Google AI Studio", level: 60, category: "AI" },
  { name: "Cloudflare AI", level: 70, category: "AI" },
  { name: "Cloudflare Workers AI", level: 65, category: "AI" },
];

export interface Skill {
  name: string;
  level: number; // Proficiency level (e.g., 1-100 or 1-5)
  category: 'Language' | 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Cloud' | 'Tool';
}

export const skillsData: Skill[] = [
  // Languages
  { name: 'JavaScript', level: 95, category: 'Language' },
  { name: 'TypeScript', level: 90, category: 'Language' },
  { name: 'Python', level: 85, category: 'Language' },

  // Frontend
  { name: 'React.js', level: 95, category: 'Frontend' },
  { name: 'Next.js', level: 90, category: 'Frontend' },
  { name: 'HTML', level: 95, category: 'Frontend' },
  { name: 'CSS', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 85, category: 'Frontend' },
  { name: 'Material-UI', level: 80, category: 'Frontend' },

  // Backend
  { name: 'Node.js', level: 95, category: 'Backend' },
  { name: 'Express.js', level: 90, category: 'Backend' },
  { name: 'REST APIs', level: 90, category: 'Backend' },

  // Databases
  { name: 'PostgreSQL', level: 80, category: 'Database' },
  { name: 'MongoDB', level: 85, category: 'Database' },
  { name: 'MySQL', level: 80, category: 'Database' },

  // DevOps
  { name: 'Docker', level: 90, category: 'DevOps' },
  { name: 'Kubernetes', level: 85, category: 'DevOps' },
  { name: 'GitHub Actions', level: 90, category: 'DevOps' },
  { name: 'NGINX', level: 75, category: 'DevOps' },
  { name: 'AWS EKS', level: 85, category: 'DevOps' },
  { name: 'CI/CD', level: 95, category: 'DevOps' },

  // Cloud
  { name: 'AWS (EKS, EC2, S3)', level: 90, category: 'Cloud' },
  { name: 'GCP', level: 70, category: 'Cloud' },
  
  // Tools
  { name: 'Prisma', level: 80, category: 'Tool' },
  { name: 'Git', level: 95, category: 'Tool' },
  { name: 'ESLint', level: 85, category: 'Tool' },
  { name: 'Husky', level: 80, category: 'Tool' },
];

export interface SkillBar {
  name: string;
  level: number;
  category: string;
}

export interface RadarSkill {
  category: string;
  level: number;
}

export const skillBars: SkillBar[] = [
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Frontend" },
  { name: "React", level: 88, category: "Frontend" },
  { name: "Node.js", level: 82, category: "Backend" },
  { name: "Python", level: 80, category: "Backend" },
  { name: "Docker", level: 75, category: "DevOps" },
  { name: "AWS", level: 70, category: "Cloud" },
  { name: "SQL", level: 85, category: "Database" },
];

export const radarSkills: RadarSkill[] = [
  { category: "Frontend", level: 88 },
  { category: "Backend", level: 82 },
  { category: "DevOps", level: 75 },
  { category: "Cloud", level: 70 },
  { category: "Database", level: 85 },
  { category: "Mobile", level: 65 },
]; 
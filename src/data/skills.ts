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
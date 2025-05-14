'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

interface Skill {
  name: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

const allSkills: Skill[] = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'Docker', level: 70 },
  { name: 'Kubernetes', level: 65 },
  { name: 'AWS', level: 70 },
  { name: 'MongoDB', level: 75 },
  { name: 'PostgreSQL', level: 70 },
  { name: 'GraphQL', level: 65 },
];

const allProjects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js and Tailwind CSS',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    tags: ['React', 'Firebase', 'Material-UI', 'Redux'],
  },
  {
    title: 'Weather Dashboard',
    description: 'A weather dashboard with location-based forecasts and historical data',
    tags: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation API'],
  },
];

const allExperiences: Experience[] = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    period: '2022 - Present',
    description: 'Leading the development of enterprise-level applications using React, Node.js, and cloud technologies.',
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Innovations',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple web applications using React, TypeScript, and Node.js.',
  },
  {
    title: 'Frontend Developer',
    company: 'Web Creations',
    period: '2018 - 2020',
    description: 'Built responsive and interactive user interfaces using React and modern CSS frameworks.',
  },
];

export default function ResumeBuilder() {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<Experience[]>([]);
  const [theme, setTheme] = useState<'modern' | 'classic'>('modern');

  const toggleSkill = (skill: Skill) => {
    setSelectedSkills((prev) =>
      prev.find((s) => s.name === skill.name)
        ? prev.filter((s) => s.name !== skill.name)
        : [...prev, skill]
    );
  };

  const toggleProject = (project: Project) => {
    setSelectedProjects((prev) =>
      prev.find((p) => p.title === project.title)
        ? prev.filter((p) => p.title !== project.title)
        : [...prev, project]
    );
  };

  const toggleExperience = (experience: Experience) => {
    setSelectedExperiences((prev) =>
      prev.find((e) => e.title === experience.title)
        ? prev.filter((e) => e.title !== experience.title)
        : [...prev, experience]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Resume Builder</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Theme</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setTheme('modern')}
              className={`px-4 py-2 rounded ${
                theme === 'modern'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Modern
            </button>
            <button
              onClick={() => setTheme('classic')}
              className={`px-4 py-2 rounded ${
                theme === 'classic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Classic
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allSkills.map((skill) => (
              <button
                key={skill.name}
                onClick={() => toggleSkill(skill)}
                className={`p-3 rounded text-left ${
                  selectedSkills.find((s) => s.name === skill.name)
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="font-medium">{skill.name}</div>
                <div className="text-sm text-gray-600">Level: {skill.level}%</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Projects</h3>
          <div className="space-y-4">
            {allProjects.map((project) => (
              <button
                key={project.title}
                onClick={() => toggleProject(project)}
                className={`w-full p-4 rounded text-left ${
                  selectedProjects.find((p) => p.title === project.title)
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="font-medium">{project.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {project.description}
                </div>
                <div className="text-sm text-blue-600 mt-2">
                  {project.tags.join(' • ')}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Experience</h3>
          <div className="space-y-4">
            {allExperiences.map((experience) => (
              <button
                key={experience.title}
                onClick={() => toggleExperience(experience)}
                className={`w-full p-4 rounded text-left ${
                  selectedExperiences.find((e) => e.title === experience.title)
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="font-medium">{experience.title}</div>
                <div className="text-sm text-blue-600">{experience.company}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {experience.period}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {experience.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <PDFDownloadLink
            document={
              <ResumePDF
                skills={selectedSkills}
                projects={selectedProjects}
                experiences={selectedExperiences}
                theme={theme}
              />
            }
            fileName="resume.pdf"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {({ loading }) =>
              loading ? 'Generating PDF...' : 'Download Resume'
            }
          </PDFDownloadLink>
        </div>
      </motion.div>
    </div>
  );
} 
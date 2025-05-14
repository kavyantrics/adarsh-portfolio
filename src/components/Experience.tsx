'use client';

import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import experienceData from '@/data/experience.json';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  date: string;
  responsibilities: string[];
}

const ExperienceCard = ({ item }: { item: ExperienceItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: item.id * 0.1 }}
    className="mb-8 p-6 bg-[#27272a] rounded-lg shadow-neon border border-accent font-mono"
  >
    <div className="flex items-start mb-4">
      <Briefcase className="w-6 h-6 mr-4 mt-1 text-accent flex-shrink-0" />
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-100">{item.title}</h3>
        <p className="text-md text-gray-300 font-medium">{item.company} - <span className="text-sm text-gray-400">{item.location}</span></p>
        <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
      </div>
    </div>
    <ul className="list-disc list-inside space-y-2 text-gray-400 pl-2">
      {item.responsibilities.map((resp, index) => (
        <li key={index} className="text-sm">{resp}</li>
      ))}
    </ul>
  </motion.div>
);

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-16 text-center text-gray-100">
          Professional <span className="text-accent">Experience</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          {experienceData.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
} 
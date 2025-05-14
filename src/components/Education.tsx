'use client';

import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import educationData from '@/data/education.json';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  date: string;
}

const EducationCard = ({ item }: { item: EducationItem }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: item.id * 0.15 }}
    className="mb-6 p-5 bg-[#27272a] rounded-lg shadow-neon-md border border-accent/30 hover:shadow-neon-lg hover:border-accent/50 transition-all duration-300 font-mono"
  >
    <div className="flex items-start mb-2">
      <GraduationCap className="w-6 h-6 mr-3 text-accent flex-shrink-0 mt-1" />
      <div>
        <h3 className="text-lg font-semibold text-gray-100">{item.degree}</h3>
        <p className="text-sm text-gray-300">{item.institution}</p>
        <p className="text-xs text-accent/80 mt-1">{item.date}</p>
      </div>
    </div>
  </motion.div>
);

export default function Education() {
  return (
    <section id="education" className="bg-[#18181b] font-mono py-16 sm:py-20 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center uppercase tracking-wider">
          <span className="text-accent">Education</span> <span className="text-gray-300">& Learning</span>
        </h2>
        <div className="max-w-2xl mx-auto">
          {educationData.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
} 
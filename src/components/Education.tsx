'use client';

import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import educationData from '@/data/education.json';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  date: string;
  description?: string;
}

const EducationCard = ({ item }: { item: EducationItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: item.id * 0.1 }}
    className="p-4 bg-[#1f1f23] rounded-lg border border-gray-700/50 hover:border-accent/40 transition-all duration-300 hover:shadow-neon-sm group"
  >
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
        <GraduationCap className="w-4 h-4 text-accent" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-100 mb-1 group-hover:text-accent transition-colors duration-300">
          {item.degree}
        </h3>
        <p className="text-sm font-medium text-accent mb-1">
          {item.institution}
        </p>
        <p className="text-xs text-gray-500 bg-accent/5 px-2 py-1 rounded-md inline-block">
          {item.date}
        </p>
        {item.description && (
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </div>
  </motion.div>
);

export default function Education() {
  return (
    <div className="h-full font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4 text-gray-100">
          <span className="text-accent">Education</span> & Learning
        </h2>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          My academic journey and continuous learning path in technology and engineering.
        </p>
      </motion.div>
      
      <div className="space-y-4">
        {educationData.map((item) => (
          <EducationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
} 
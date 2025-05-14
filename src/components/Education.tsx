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
    className="mb-6 p-5 bg-card rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex items-center mb-2">
      <GraduationCap className="w-5 h-5 mr-2 text-primary" />
      <div>
        <h3 className="text-lg font-semibold font-heading text-foreground">{item.degree}</h3>
        <p className="text-sm text-secondary">{item.institution}</p>
        <p className="text-xs text-foreground/60">{item.date}</p>
      </div>
    </div>
  </motion.div>
);

export default function Education() {
  return (
    <section id="education" className="py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center">
          <span className="text-primary">Education</span> & Learning
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
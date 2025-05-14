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
    className="mb-8 p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center mb-3">
      <Briefcase className="w-6 h-6 mr-3 text-primary" />
      <div>
        <h3 className="text-xl font-bold font-heading text-foreground">{item.title}</h3>
        <p className="text-md text-secondary font-medium">{item.company} - <span className="text-sm text-foreground/70">{item.location}</span></p>
        <p className="text-sm text-foreground/60">{item.date}</p>
      </div>
    </div>
    <ul className="list-disc list-inside space-y-2 text-foreground/80 pl-2">
      {item.responsibilities.map((resp, index) => (
        <li key={index}>{resp}</li>
      ))}
    </ul>
  </motion.div>
);

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 md:px-8 lg:px-16 bg-background/50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
          Professional <span className="text-primary">Experience</span>
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
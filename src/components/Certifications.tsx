'use client';

import { Award } from 'lucide-react';
import { motion } from 'framer-motion';
import certificationsData from '@/data/certifications.json';

interface CertificationItem {
  id: number;
  name: string;
  issuer: string;
  status: string;
}

const CertificationCard = ({ item }: { item: CertificationItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: item.id * 0.05 }}
    className="p-6 bg-[#27272a] rounded-lg border border-accent/50 shadow-neon-sm hover:border-accent hover:shadow-neon-md transition-all duration-300 font-mono h-full flex flex-col justify-center"
  >
    <div className="flex items-center">
      <Award className="w-8 h-8 mr-4 text-accent flex-shrink-0" />
      <div>
        <h4 className="text-md font-semibold text-gray-100 leading-tight">{item.name}</h4>
        <p className="text-xs text-accent/80 mt-0.5">{item.issuer} - <span className="text-gray-500">({item.status})</span></p>
      </div>
    </div>
  </motion.div>
);

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 md:px-8 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-16 text-center text-accent">
          Certifications & Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificationsData.map((item) => (
            <CertificationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
} 
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
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: item.id * 0.1 }}
    className="p-4 bg-card rounded shadow hover:shadow-md transition-shadow duration-300"
  >
    <div className="flex items-center">
      <Award className="w-4 h-4 mr-2 text-primary" />
      <div>
        <h4 className="text-md font-semibold text-foreground">{item.name}</h4>
        <p className="text-xs text-secondary">{item.issuer} - <span className="text-foreground/60">({item.status})</span></p>
      </div>
    </div>
  </motion.div>
);

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 px-4 md:px-8 lg:px-16 bg-background/50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center">
          <span className="text-primary">Certifications</span> & Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {certificationsData.map((item) => (
            <CertificationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
} 
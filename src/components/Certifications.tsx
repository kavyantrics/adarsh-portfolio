'use client';

import { Award, CheckCircle, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import certificationsData from '@/data/certifications.json';

interface CertificationItem {
  id: number;
  name: string;
  issuer: string;
  status: string;
  date?: string;
  description?: string;
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'in progress':
      return <Clock className="w-4 h-4 text-yellow-400" />;
    case 'planned':
      return <Target className="w-4 h-4 text-blue-400" />;
    default:
      return <Award className="w-4 h-4 text-accent" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-500/10 border-green-500/30 text-green-400';
    case 'in progress':
      return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    case 'planned':
      return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    default:
      return 'bg-accent/10 border-accent/30 text-accent';
  }
};

const getStatusText = (status: string) => {
  return status; // Return the original status text as is
};

const CertificationCard = ({ item }: { item: CertificationItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: item.id * 0.1 }}
    className="p-4 bg-[#1f1f23] rounded-lg border border-gray-700/50 hover:border-accent/40 transition-all duration-300 hover:shadow-neon-sm group"
  >
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
        <Award className="w-4 h-4 text-accent" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-100 mb-1 group-hover:text-accent transition-colors duration-300">
          {item.name}
        </h3>
        <p className="text-sm font-medium text-accent mb-2">
          {item.issuer}
        </p>
        
        <div className="flex items-center gap-2 mb-2">
          {getStatusIcon(item.status)}
          <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getStatusColor(item.status)}`}>
            {getStatusText(item.status)}
          </span>
        </div>
        
        {item.date && (
          <p className="text-xs text-gray-400 mb-1">
            {item.date}
          </p>
        )}
        
        {item.description && (
          <p className="text-xs text-gray-400 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </div>
  </motion.div>
);

export default function Certifications() {
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
          <span className="text-accent">Certifications</span> & Achievements
        </h2>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Professional certifications and achievements that validate my expertise and continuous learning.
        </p>
      </motion.div>
      
      <div className="space-y-4">
        {certificationsData.map((item) => (
          <CertificationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
} 
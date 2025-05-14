'use client';

import { Download } from 'lucide-react';
import { MotionDiv } from '@/components/MotionComponents';

export default function DownloadResume() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider mb-6 text-accent">Download My Resume</h2>
        <p className="text-lg text-gray-400 mb-8">
          Get a copy of my detailed resume to learn more about my experience and skills.
        </p>
        <a
          href="/resume.pdf" // Assuming resume.pdf is in the public folder
          download
          className="inline-flex items-center gap-3 px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-colors text-base shadow-md hover:shadow-neon-sm focus:outline-none focus:ring-4 focus:ring-accent/50 border-2 border-white"
        >
          <Download className="w-5 h-5" />
          Download Resume
        </a>
      </MotionDiv>
    </section>
  );
} 
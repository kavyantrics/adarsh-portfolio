'use client';

import { Briefcase, Calendar, MapPin, Star } from 'lucide-react';
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

const ExperienceCard = ({ item, isLeft, color }: { item: ExperienceItem; isLeft: boolean; color: string }) => (
  <motion.div
    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: item.id * 0.2 }}
    className={`relative ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}
  >
    {/* Content Block */}
    <div className={`bg-[#27272a] rounded-xl border border-accent/20 p-4 shadow-neon hover:shadow-neon-lg transition-all duration-300 hover:border-accent/40 group h-full`}>
      {/* Colored Line at Top */}
      <div className={`w-full h-1 rounded-full mb-2 ${color}`}></div>
      
      {/* Header */}
      <div className="flex items-start gap-2 mb-2">
        <div className="flex-shrink-0 w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
          <Briefcase className="w-3.5 h-3.5 text-accent" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-100 mb-1 group-hover:text-accent transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-sm font-semibold text-accent mb-1">
            {item.company}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin size={11} className="text-accent" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={11} className="text-accent" />
              <span>{item.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsibilities */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
          <Star size={11} className="text-accent" />
          Key Achievements
        </h4>
        <ul className="space-y-1">
          {item.responsibilities.map((resp, index) => (
            <li key={index} className="flex items-start gap-1.5 text-xs text-gray-400 leading-relaxed">
              <span className="flex-shrink-0 w-1 h-1 bg-accent rounded-full mt-1"></span>
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

export default function Experience() {
  // Define timeline colors for each experience
  const timelineColors = [
    'bg-gradient-to-b from-orange-500 to-orange-600', // First experience
    'bg-gradient-to-b from-red-500 to-red-600',       // Second experience
    'bg-gradient-to-b from-green-500 to-green-600',   // Third experience
    'bg-gradient-to-b from-blue-500 to-blue-600',     // Fourth experience
  ];

  return (
    <section id="experience" className="py-8 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4 text-gray-100">
            Professional <span className="text-accent">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            My journey through various roles, companies, and technologies that have shaped my expertise.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Central Timeline Line with Color Segments */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full">
            {experienceData.map((item, index) => {
              const segmentHeight = 100 / experienceData.length;
              const topPosition = (index * segmentHeight);
              const color = timelineColors[index % timelineColors.length];
              
              return (
                <div
                  key={item.id}
                  className={`absolute w-full ${color}`}
                  style={{
                    top: `${topPosition}%`,
                    height: `${segmentHeight}%`,
                  }}
                />
              );
            })}
          </div>

          {/* Timeline Nodes */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-full">
            {experienceData.map((item, index) => {
              const nodePosition = (index * (100 / (experienceData.length - 1))) + (100 / (experienceData.length - 1) / 2);
              const color = timelineColors[index % timelineColors.length];
              
              return (
                <div
                  key={item.id}
                  className={`absolute w-4 h-4 rounded-full border-4 border-[#18181b] z-10 transform -translate-x-1/2 ${color.replace('bg-gradient-to-b', 'bg')}`}
                  style={{ top: `${nodePosition}%` }}
                >
                  <div className="w-full h-full rounded-full animate-pulse opacity-80"></div>
                </div>
              );
            })}
          </div>

          {/* Experience Cards */}
          <div className="space-y-6 lg:space-y-8">
            {experienceData.map((item, index) => (
              <div key={item.id} className="relative">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-center ${index % 2 === 0 ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'}`}>
                  {index % 2 === 0 ? (
                    <>
                      <ExperienceCard item={item} isLeft={true} color={timelineColors[index % timelineColors.length]} />
                      <div className="hidden lg:block"></div> {/* Empty right column */}
                    </>
                  ) : (
                    <>
                      <div className="hidden lg:block"></div> {/* Empty left column */}
                      <ExperienceCard item={item} isLeft={false} color={timelineColors[index % timelineColors.length]} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
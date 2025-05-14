'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
};

const ProjectCard = ({ title, description, tags, imageUrl, demoUrl, githubUrl }: ProjectCardProps) => {
  return (
    <motion.div 
      className="group bg-[#27272a] border border-accent rounded-lg overflow-hidden shadow-neon flex flex-col h-full font-mono"
      whileHover={{ y: -8, scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-auto">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-accent text-accent rounded-md hover:bg-accent hover:text-[#18181b] transition-colors font-semibold"
            >
              <Github size={16} /> GitHub
            </a>
          )}
          {demoUrl && (
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-accent text-accent rounded-md hover:bg-accent hover:text-[#18181b] transition-colors font-semibold"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

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
      className="bg-background border border-primary/20 rounded-lg overflow-hidden shadow-lg"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative h-48 w-full">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold font-heading mb-2 text-foreground">{title}</h3>
        <p className="text-foreground/70 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              GitHub
            </a>
          )}
          {demoUrl && (
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
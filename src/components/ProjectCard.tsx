'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Code, Shield, FileText } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type ProjectCardProps = {
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  demoUrl?: string
  githubUrl?: string
}

// Function to get appropriate icon based on project title
const getProjectIcon = (title: string) => {
  if (title.toLowerCase().includes('vulnerability') || title.toLowerCase().includes('security')) {
    return <Shield className="w-8 h-8 text-accent" />
  } else if (title.toLowerCase().includes('cloud') || title.toLowerCase().includes('aws')) {
    return <Code className="w-8 h-8 text-accent" />
  } else if (title.toLowerCase().includes('pdf') || title.toLowerCase().includes('collaboration')) {
    return <FileText className="w-8 h-8 text-accent" />
  }
  return <Code className="w-8 h-8 text-accent" />
}

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  imageUrl, 
  demoUrl, 
  githubUrl,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <motion.div 
      className="group bg-[#27272a] border border-accent/20 rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 font-mono shadow-neon hover:shadow-neon-lg hover:border-accent/40"
      whileHover={{ 
        y: -8, 
        scale: 1.02,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      {/* Project Image */}
      <div className="relative h-48 w-full bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/10">
            <div className="w-20 h-20 bg-accent/30 rounded-2xl flex items-center justify-center border-2 border-accent/40">
              {getProjectIcon(title)}
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#27272a] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Action Buttons Overlay */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {githubUrl && (
            <motion.a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] text-gray-300 border border-accent/30 rounded-lg font-semibold text-xs hover:bg-accent/20 hover:border-accent/50 hover:text-accent transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={12} />
              Code
            </motion.a>
          )}
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Title with Arrow */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-100 group-hover:text-accent transition-colors pr-4">
            {title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 text-xs bg-accent/10 text-accent rounded-md font-medium border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Active Project</span>
          </div>
          
          <div className="flex gap-2">
            {demoUrl && (
              <motion.a 
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-accent/50 text-accent rounded-lg font-medium hover:bg-accent hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={12} />
                Live Demo
              </motion.a>
            )}
            {githubUrl && (
              <motion.a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-accent hover:text-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={12} />
                View Code
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
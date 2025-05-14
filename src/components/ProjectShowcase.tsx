'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard3D from './ProjectCard3D'

type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  imageUrl: string
  demoUrl?: string
  githubUrl?: string
  modelPath?: string
}

type ProjectShowcaseProps = {
  projects: Project[]
}

const ProjectShowcase = ({ projects }: ProjectShowcaseProps) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [activeFilter, setActiveFilter] = useState<string>('All')
  
  // Extract all unique tags from projects
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(project => project.tags)))]
  
  // Filter projects when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => 
        project.tags.includes(activeFilter)
      ))
    }
  }, [activeFilter, projects])
  
  return (
    <div className="container mx-auto">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {allTags.map((tag) => (
          <motion.button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === tag ? 'bg-primary text-white' : 'bg-primary/10 text-foreground hover:bg-primary/20'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </div>
      
      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard3D 
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              modelPath={project.modelPath}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-foreground/70">No projects found with the selected filter.</p>
        </motion.div>
      )}
    </div>
  )
}

export default ProjectShowcase
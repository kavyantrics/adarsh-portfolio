'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { Github, Filter } from 'lucide-react'

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

type ProjectsProps = {
  projects: Project[]
}

const Projects = ({ projects }: ProjectsProps) => {
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
    <section id="projects" className="py-16 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4 text-gray-100">
          <span className="text-accent">Featured</span> Projects
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          Here are some of my recent projects that showcase my skills and experience. Each project is carefully crafted with attention to detail and best practices.
        </p>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Filter className="w-4 h-4 text-accent" />
          <span className="text-sm text-gray-400 font-medium">Filter by technology:</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 ease-in-out 
                          ${activeFilter === tag 
                            ? 'bg-accent text-[#18181b] border-accent shadow-neon-sm' 
                            : 'bg-transparent text-gray-300 border-gray-600 hover:text-accent hover:border-accent hover:shadow-neon-sm'}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-accent" />
          </div>
          <p className="text-gray-500 text-lg mb-2">No projects found matching that filter.</p>
          <p className="text-gray-600 text-sm">Try selecting a different technology or view all projects.</p>
        </motion.div>
      )}

      {/* View All Projects Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <a
          href="https://github.com/kavyantrics"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-gray-600 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-neon-sm focus:outline-none focus:ring-4 focus:ring-accent/50"
        >
          View All Projects on GitHub
          <Github size={18} />
        </a>
      </motion.div>
    </section>
  )
}

export default Projects
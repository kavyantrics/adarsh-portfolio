'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard3D from './ProjectCard3D'
import { Github } from 'lucide-react'

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
    <section id="projects" className="container mx-auto py-12 font-mono">

       <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold uppercase tracking-wider mb-12 md:mb-16 text-center">
            <span className="text-accent">Featured</span> <span className="text-gray-100">Projects</span>
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
            Each project is carefully crafted with attention to detail and best practices.
          </p>
        </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {allTags.map((tag) => (
          <motion.button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-5 py-2.5 rounded-md text-sm font-semibold border transition-all duration-200 ease-in-out 
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
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageUrl={project.imageUrl}
              modelPath={project.modelPath}
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
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No projects found matching that filter.</p>
        </motion.div>
      )}

      {/* View All Projects Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 sm:mt-20 text-center"
      >
        <a
          href="https://github.com/kavyantrics"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-[#18181b] rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-neon-sm focus:outline-none focus:ring-4 focus:ring-accent/50"
        >
          View All Projects
          <Github size={18} className="ml-2.5" />
        </a>
      </motion.div>
    </section>
  )
}

export default Projects
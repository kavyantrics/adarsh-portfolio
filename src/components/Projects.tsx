'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js, TypeScript, and Stripe integration.',
    image: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    github: 'https://github.com/kavyantrics/ecommerce',
    demo: 'https://ecommerce.adarsh.dev',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    image: '/projects/taskmanager.jpg',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/kavyantrics/taskmanager',
    demo: 'https://tasks.adarsh.dev',
  },
  {
    title: 'AI Image Generator',
    description: 'An AI-powered image generation tool using OpenAI&apos;s DALL-E API.',
    image: '/projects/aigenerator.jpg',
    tags: ['React', 'OpenAI', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/kavyantrics/ai-generator',
    demo: 'https://ai.adarsh.dev',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 md:px-8 lg:px-16 bg-background/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            <span className="text-secondary">Featured</span> Projects
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
            Each project is carefully crafted with attention to detail and best practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-foreground/80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-secondary/10 text-secondary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-secondary/80 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-secondary/80 transition-colors"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/kavyantrics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-secondary text-secondary hover:bg-secondary/10 rounded-full font-medium transition-colors"
          >
            View All Projects
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 
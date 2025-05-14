'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'Docker', level: 85 },
  { name: 'Kubernetes', level: 80 },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-8 lg:px-16 bg-background/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            <span className="text-secondary">About</span> Me
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            A passionate full-stack developer with expertise in building modern web applications
            and microservices architecture. I love solving complex problems and creating
            intuitive user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-secondary/20">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-secondary" />
                <h4 className="font-bold mb-2">Senior Developer</h4>
                <p className="text-foreground/80">Leading development of enterprise applications</p>
                <p className="text-sm text-foreground/60">2021 - Present</p>
              </div>
              <div className="relative pl-8 border-l-2 border-secondary/20">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-secondary" />
                <h4 className="font-bold mb-2">Full Stack Developer</h4>
                <p className="text-foreground/80">Built and maintained multiple web applications</p>
                <p className="text-sm text-foreground/60">2019 - 2021</p>
              </div>
              <div className="relative pl-8 border-l-2 border-secondary/20">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-secondary" />
                <h4 className="font-bold mb-2">Software Engineer</h4>
                <p className="text-foreground/80">Started my journey in software development</p>
                <p className="text-sm text-foreground/60">2017 - 2019</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Skills</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-foreground/60">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-secondary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-secondary text-secondary hover:bg-secondary/10 rounded-full font-medium transition-colors"
          >
            Download Resume
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 
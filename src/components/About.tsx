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
    <section id="about" className="py-20 px-4 md:px-8 lg:px-16 bg-[#18181b] font-mono">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6 text-accent">
            About Me
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            A passionate full-stack developer with expertise in building modern web applications
            and microservices architecture. I love solving complex problems and creating
            intuitive user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-100 uppercase tracking-wide text-center lg:text-left">My Journey</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-accent/30 rounded-full hidden md:block"></div>
              {[
                {
                  title: "Senior Developer",
                  description: "Leading development of enterprise applications",
                  date: "2021 - Present"
                },
                {
                  title: "Full Stack Developer",
                  description: "Built and maintained multiple web applications",
                  date: "2019 - 2021"
                },
                {
                  title: "Software Engineer",
                  description: "Started my journey in software development",
                  date: "2017 - 2019"
                }
              ].map((item, index) => (
                <div key={index} className="relative pl-10 md:pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-neon-sm">
                    <div className="w-3 h-3 bg-[#18181b] rounded-full"></div>
                  </div>
                  <h4 className="font-semibold text-lg mb-1 text-accent">{item.title}</h4>
                  <p className="text-gray-400 text-sm mb-1">{item.description}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-100 uppercase tracking-wide text-center lg:text-left">Skills</h3>
            <div className="space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-medium text-gray-300 text-sm">{skill.name}</span>
                    <span className="text-accent font-semibold text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-accent/20 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-accent to-green-400 rounded-full shadow-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-gray-600 rounded-full font-semibold transition-colors text-base shadow-neon-sm hover:shadow-neon-md"
          >
            Let&apos;s Connect
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 
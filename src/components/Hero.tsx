'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Terminal from './Terminal'; // Import Terminal

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-[#18181b] text-gray-100 px-6 sm:px-8 py-20 md:py-24 border-b border-accent/20 font-mono">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1" // Adjusted for 2-col layout
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-gray-100">Hi, I&apos;m </span>
              <span className="text-accent animate-pulse">Adarsh Kumar</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-gray-300">
              <TypeAnimation
                sequence={[
                  'Full Stack & DevOps Engineer',
                  2000,
                  'Cloud Solutions Architect',
                  2000,
                  'JavaScript Enthusiast',
                  2000,
                  'Tech Innovator & Problem Solver',
                  2000,
                ]}
                wrapper="span"
                speed={45}
                className="text-accent/90" // Original TypeAnimation had this, seems good
                repeat={Infinity}
              />
            </h2>
            <p className="text-base sm:text-lg mb-10 text-gray-400 max-w-xl leading-relaxed">
              A seasoned Full Stack & DevOps Engineer with 3+ years, crafting high-performance software and resilient infrastructure. I&apos;ve reduced deployment times by <span className="text-accent font-semibold">60%</span>, achieved <span className="text-accent font-semibold">99.99%</span> system uptime, and spearheaded scalable feature rollouts for <span className="text-accent font-semibold">25,000+</span> users. My toolkit includes React.js, Node.js, Python, AWS, Docker, Kubernetes, and full CI/CD automation.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-start">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-accent text-accent px-10 py-4 font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-accent hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-accent/50 shadow-lg hover:shadow-neon-md hover:border-accent/80"
              >
                View My Work
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-accent text-accent px-10 py-4 font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-accent hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-accent/50 shadow-lg hover:shadow-neon-md hover:border-accent/80"
              >
                Download Resume
              </motion.a>
            </div>
            
            {/* Secondary Action - Contact */}
            <div className="mt-6">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium text-sm border-b border-accent/30 hover:border-accent/60 pb-1"
              >
                <span>Get in touch</span>
                <span className="text-xs">→</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            className="lg:col-span-1 hidden lg:flex justify-center items-center p-4" // Adjusted for 2-col layout
          >
            <div className="w-full max-w-lg xl:max-w-xl"> {/* Container for Terminal */}
              <Terminal />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
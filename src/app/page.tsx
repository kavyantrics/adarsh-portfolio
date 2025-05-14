import { Suspense } from 'react';
// import dynamic from 'next/dynamic'; // No longer needed here
import Navbar from '../components/Navbar';
import Terminal from '../components/Terminal';
import ProjectShowcase from '../components/ProjectShowcase';
import Skills from '../components/Skills';
import Dashboard from '../components/Dashboard';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
// import Testimonials from '@/components/Testimonials';
import GitHubActivity from '@/components/GitHubActivity';
import { getPinnedRepos, getRecentCommits, getContributions } from '@/lib/github';
import Contact from '@/components/Contact';
import KubernetesPlayground from '@/components/KubernetesPlayground';
// import VoiceAssistant from '@/components/VoiceAssistant';
import QABot from '@/components/QABot';
// import GamifiedExperience from '@/components/GamifiedExperience';
// import { GamificationProvider } from '@/contexts/GamificationContext';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import { Download } from 'lucide-react';
import { MotionDiv } from '@/components/MotionComponents'; // Import from client component
import projectsData from '../data/projects.json'; // Added back projectsData import
// import { motion } from 'framer-motion';

export default async function Home() {
  const [repos, commits, contributions] = await Promise.all([
    getPinnedRepos(),
    getRecentCommits(),
    getContributions(),
  ]);

  return (
    // <GamificationProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        {/* <VoiceAssistant /> */}
        <QABot />
        {/* <GamifiedExperience /> */}
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 md:px-8 lg:px-16 min-h-screen flex flex-col justify-center">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <MotionDiv 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold font-heading mb-6"
              >
                <span className="text-foreground">Hi, I&apos;m </span>
                <span className="text-accent">Adarsh Kumar</span>
              </MotionDiv>
              <MotionDiv 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl md:text-3xl font-heading mb-6 text-secondary"
              >
                Full Stack Engineer | DevOps Engineer
              </MotionDiv>
              <MotionDiv 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg mb-8 text-foreground/80 max-w-lg"
              >
                Full Stack & DevOps Engineer with 3+ years of experience delivering high-performance software and infrastructure. Reduced deployment time by 60%, improved system uptime to 99.99%, and led scalable feature rollouts impacting 25,000+ users. Proficient in React.js, Node.js, AWS, Docker, Kubernetes, and CI/CD automation.
              </MotionDiv>
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a 
                  href="#projects" 
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-colors"
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 border border-secondary text-secondary hover:bg-secondary/10 rounded-full font-medium transition-colors"
                >
                  Contact Me
                </a>
              </MotionDiv>
            </div>
            
            <div className="flex justify-center">
              <Terminal />
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <Skills />
        
        {/* Experience Section */}
        <Experience />
        
        {/* Projects Showcase Section */}
        <section id="projects" className="py-20 px-4 md:px-8 lg:px-16 bg-background/50">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
            <span className="text-secondary">Featured</span> Projects
          </h2>
          
          <Suspense fallback={<div className="text-center">Loading projects...</div>}>
            <ProjectShowcase projects={projectsData} />
          </Suspense>
          
          {/* <div className="mt-12 text-center">
            <a 
              href="#" 
              className="px-6 py-3 border border-accent text-accent hover:bg-accent/10 rounded-full font-medium transition-colors"
            >
              View All Projects
            </a>
          </div> */}
        </section>
        
        {/* Architecture Diagram Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
              <span className="text-secondary">System</span> Architecture Showcase
            </h2>
            <p className="text-center text-foreground/80 max-w-2xl mx-auto mb-12">
              Interactive visualization of a sample microservices architecture I&apos;ve worked with.
              Click on services to learn more about their roles and interactions.
            </p>
            <ArchitectureDiagram />
          </div>
        </section>
        
        {/* DevOps Dashboard Section */}
        <Dashboard />
        
        {/* GitHub Activity Section */}
        <GitHubActivity
          initialRepos={repos}
          initialCommits={commits}
          initialContributions={contributions}
        />
        
        {/* <Testimonials /> */}
        
        {/* Education Section */}
        <Education />
        
        {/* Certifications Section */}
        <Certifications />
        
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
              <span className="text-secondary">Docker & Kubernetes</span> Playground
            </h2>
            <p className="text-center text-foreground/80 max-w-2xl mx-auto mb-12">
              Interactive visualization of container orchestration and deployment workflows.
              Explore how containers are managed and scaled in a Kubernetes environment.
            </p>
            <KubernetesPlayground />
          </div>
        </section>
        
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-background/50">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold font-heading mb-6 text-foreground">Download My Resume</h2>
            <p className="text-lg text-foreground/80 mb-8">
              Get a copy of my detailed resume to learn more about my experience and skills.
            </p>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold transition-colors text-lg shadow-md hover:shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </MotionDiv>
        </section>
        
        <Contact />
      </div>
    // </GamificationProvider>
  );
}

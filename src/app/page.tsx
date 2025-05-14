import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Terminal from '../components/Terminal';
import ProjectShowcase from '../components/ProjectShowcase';
import Skills from '../components/Skills';
import Dashboard from '../components/Dashboard';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import Testimonials from '@/components/Testimonials';
import GitHubActivity from '@/components/GitHubActivity';
import { getPinnedRepos, getRecentCommits, getContributions } from '@/lib/github';
import Contact from '@/components/Contact';
import KubernetesPlayground from '@/components/KubernetesPlayground';
import ResumeBuilder from '@/components/ResumeBuilder';
// import VoiceAssistant from '@/components/VoiceAssistant';
import QABot from '@/components/QABot';
// import GamifiedExperience from '@/components/GamifiedExperience';
// import { GamificationProvider } from '@/contexts/GamificationContext';

// Import dummy data
import projectsData from '../data/projects.json';

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
              <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                <span className="text-foreground">Hi, I&apos;m </span>
                <span className="text-accent">Adarsh</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-heading mb-6 text-secondary">
                Full Stack Developer & Designer
              </h2>
              <p className="text-lg mb-8 text-foreground/80 max-w-lg">
                I build exceptional digital experiences with modern technologies.
                Specializing in creating interactive, high-performance web applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#projects" 
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-colors"
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 border border-secondary text-secondary hover:bg-secondary/10 rounded-full font-medium transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Terminal />
            </div>
          </div>
        </section>
        
        {/* 3D Projects Showcase Section */}
        <section id="projects" className="py-20 px-4 md:px-8 lg:px-16 bg-background/50">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
            <span className="text-secondary">Interactive</span> Projects
          </h2>
          
          <Suspense fallback={<div className="text-center">Loading projects...</div>}>
            <ProjectShowcase projects={projectsData} />
          </Suspense>
          
          <div className="mt-12 text-center">
            <a 
              href="#" 
              className="px-6 py-3 border border-accent text-accent hover:bg-accent/10 rounded-full font-medium transition-colors"
            >
              View All Projects
            </a>
          </div>
        </section>
        
        {/* Skills Section */}
        <Skills />
        
        {/* Architecture Diagram Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-background/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
              <span className="text-secondary">Microservices</span> Architecture
            </h2>
            <p className="text-center text-foreground/80 max-w-2xl mx-auto mb-12">
              Interactive visualization of the microservices architecture I&apos;ve built and worked with.
              Click on any service to learn more about its tech stack and implementation details.
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
        
        <Testimonials />
        
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-background/50">
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
        
        <ResumeBuilder />
        
        <Contact />
      </div>
    // </GamificationProvider>
  );
}

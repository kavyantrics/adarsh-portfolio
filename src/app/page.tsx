import { Suspense } from 'react';
// import dynamic from 'next/dynamic'; // No longer needed here
import Navbar from '../components/Navbar';
import Hero from '../components/Hero'; // Import Hero component
// import Terminal from '../components/Terminal'; // Terminal is now inside Hero
import Projects from '../components/Projects';
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
import DownloadResume from '@/components/DownloadResume'; // Import DownloadResume component
// import { Download } from 'lucide-react'; // No longer needed here
// import { MotionDiv } from '@/components/MotionComponents'; // No longer needed here
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
      <div className="min-h-screen text-gray-300"> {/* Adjusted text-foreground based on layout.tsx changes */}
        <Navbar />
        {/* <VoiceAssistant /> */}
        <QABot />
        {/* <GamifiedExperience /> */}
        
        <Hero /> {/* Render Hero component */}
        
        {/* Skills Section */}
        <Skills />
        
        {/* Experience Section */}
        <Experience />
        
        {/* Projects Showcase Section */}
     
          <Suspense fallback={<div className="text-center text-gray-400">Loading projects...</div>}>
            <Projects projects={projectsData} />
          </Suspense>
          
        
        {/* Architecture Diagram Section */}
        
          <ArchitectureDiagram />
          
        
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
        
       
        <KubernetesPlayground />
          
        
        <DownloadResume /> {/* Render DownloadResume component */}
        
        <Contact />
      </div>
    // </GamificationProvider>
  );
}

import { Suspense } from 'react';
// import dynamic from 'next/dynamic'; // No longer needed here
import Navbar from '../components/Navbar';
import Hero from '../components/Hero'; // Import Hero component
// import Terminal from '../components/Terminal'; // Terminal is now inside Hero
import Projects from '../components/Projects';
import SkillTree from '../components/SkillTree'; // Import new SkillTree component
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
import PerformanceMetrics from '@/components/PerformanceMetrics'; // Import new PerformanceMetrics component
import AnalyticsDashboard from '@/components/AnalyticsDashboard'; // Import new AnalyticsDashboard component
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
      <div className="min-h-screen text-text transition-colors duration-300"> {/* Updated to use theme-aware colors */}
        <Navbar />
        <PerformanceMetrics /> {/* Add performance metrics */}
        {/* <VoiceAssistant /> */}
        <QABot />
        {/* <GamifiedExperience /> */}
        
        {/* Hero Section */}
        <Hero /> {/* Render Hero component */}
        
        {/* Experience Section */}
        <Experience />
        
        {/* Interactive Skill Tree Section */}
        <SkillTree />
        
        {/* Projects Showcase Section */}
     
          <Suspense fallback={<div className="text-center text-text-secondary">Loading projects...</div>}> {/* Updated to use theme-aware colors */}
            <Projects projects={projectsData} />
          </Suspense>
          
        
        {/* Architecture Diagram Section */}
        
          <ArchitectureDiagram />
          
        
        {/* DevOps Dashboard Section */}
        <Dashboard />
        
        {/* Analytics Dashboard Section */}
        <AnalyticsDashboard />
        
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

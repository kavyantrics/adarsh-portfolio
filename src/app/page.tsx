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
import PerformanceMetrics from '@/components/PerformanceMetrics'; // Import new PerformanceMetrics component
import AnalyticsDashboard from '@/components/AnalyticsDashboard'; // Import new AnalyticsDashboard component
// import { Download } from 'lucide-react'; // No longer needed here
// import { MotionDiv } from '@/components/MotionComponents'; // No longer needed here
import projectsData from '../data/projects.json'; // Added back projectsData import
// import { motion } from 'framer-motion';

/**
 * OPTIMIZED PORTFOLIO LAYOUT - Enhanced User Experience
 * 
 * Content Order Strategy:
 * 1. Hero (Introduction) - First impression & personal branding
 * 2. Performance Metrics - Quick credibility boost & technical proof
 * 3. Projects (Portfolio) - Showcase work immediately (highest priority)
 * 4. Experience - Professional background & career progression
 * 5. Skills - Technical capabilities & expertise areas
 * 6. Architecture - Technical depth & system design skills
 * 7. DevOps Dashboard - Infrastructure & automation expertise
 * 8. Kubernetes Playground - Interactive infrastructure demo
 * 9. GitHub Activity - Code contributions & open source work
 * 10. Education & Certifications - Academic & professional credentials (side-by-side)
 * 11. Analytics - Performance insights & metrics
 * 12. AI Assistant - Secondary feature for engagement
 * 13. Contact - Final engagement & conversion point
 * 
 * Benefits:
 * - Faster value proposition (work shown immediately)
 * - Logical information flow (intro → work → background → skills)
 * - Better engagement (interactive elements strategically placed)
 * - Immediate resume access (no scrolling required)
 * - Clearer call-to-actions (resume in hero, contact at end)
 * - Balanced layout (education & certifications side-by-side)
 * - Reduced cognitive load (related sections grouped together)
 */

export default async function Home() {
  // Fetch GitHub data for portfolio integration
  const [repos, commits, contributions] = await Promise.all([
    getPinnedRepos(),
    getRecentCommits(),
    getContributions(),
  ]);

  return (
    // <GamificationProvider>
      <div className="min-h-screen text-text transition-colors duration-300"> {/* Updated to use theme-aware colors */}
        <Navbar />
        
        {/* 1. Hero Section - First impression & introduction */}
        <Hero />
        
        {/* 2. Performance Metrics - Quick credibility boost */}
        <PerformanceMetrics />
        
        {/* 3. Projects Showcase - Show work immediately (most important) */}
        <Suspense fallback={<div className="text-center text-text-secondary">Loading projects...</div>}>
          <Projects projects={projectsData} />
        </Suspense>
        
        {/* 4. Experience Section - Professional background */}
        <Experience />
        
        {/* 5. Interactive Skill Tree - Technical capabilities */}
        <SkillTree />
        
        {/* 6. Architecture Diagram - Technical depth */}
        <ArchitectureDiagram />
        
        {/* 7. DevOps Dashboard - DevOps expertise */}
        <Dashboard />
        
        {/* 8. Kubernetes Playground - Interactive infrastructure demo */}
        <KubernetesPlayground />
        
        {/* 9. GitHub Activity - Code activity proof */}
        <GitHubActivity
          initialRepos={repos}
          initialCommits={commits}
          initialContributions={contributions}
        />
        
        {/* 10. Education & Certifications - Academic & Professional credentials */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#18181b]">
          <div className="container mx-auto">
            <div className="bg-[#27272a] rounded-2xl border border-accent/20 shadow-neon-lg p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <Education />
                <Certifications />
              </div>
            </div>
          </div>
        </section>
        
        {/* 11. Analytics Dashboard - Performance insights */}
        <AnalyticsDashboard />
        
        {/* 13. QABot - AI assistance (less critical, moved lower) */}
        <QABot />
        
        {/* 15. Contact - Final engagement */}
        <Contact />
      </div>
    // </GamificationProvider>
  );
}

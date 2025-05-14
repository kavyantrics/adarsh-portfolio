'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Target, Lock, Unlock } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
  icon: 'trophy' | 'star' | 'zap' | 'target';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: 'first-visit',
    title: 'First Visit',
    description: 'Visit the portfolio for the first time',
    xp: 50,
    icon: 'star',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'skill-master',
    title: 'Skill Master',
    description: 'Unlock all skills',
    xp: 200,
    icon: 'trophy',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'project-explorer',
    title: 'Project Explorer',
    description: 'View all project details',
    xp: 150,
    icon: 'zap',
    unlocked: false,
    progress: 0,
    maxProgress: 4,
  },
  {
    id: 'interaction-pro',
    title: 'Interaction Pro',
    description: 'Interact with all interactive elements',
    xp: 100,
    icon: 'target',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Connect on all social platforms',
    xp: 100,
    icon: 'star',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
  },
  {
    id: 'resume-builder',
    title: 'Resume Builder',
    description: 'Create and download a resume',
    xp: 150,
    icon: 'trophy',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'voice-commander',
    title: 'Voice Commander',
    description: 'Use voice commands successfully',
    xp: 100,
    icon: 'zap',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'kubernetes-master',
    title: 'Kubernetes Master',
    description: 'Interact with all Kubernetes components',
    xp: 200,
    icon: 'target',
    unlocked: false,
    progress: 0,
    maxProgress: 4,
  },
  {
    id: 'code-reviewer',
    title: 'Code Reviewer',
    description: 'View all GitHub repositories',
    xp: 150,
    icon: 'star',
    unlocked: false,
    progress: 0,
    maxProgress: 6,
  },
  {
    id: 'testimonial-collector',
    title: 'Testimonial Collector',
    description: 'Read all testimonials',
    xp: 100,
    icon: 'trophy',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
  },
];

const skills: Skill[] = [
  { id: 'react', name: 'React', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'typescript', name: 'TypeScript', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'node', name: 'Node.js', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'python', name: 'Python', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'docker', name: 'Docker', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'kubernetes', name: 'Kubernetes', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'aws', name: 'AWS', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'mongodb', name: 'MongoDB', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'postgresql', name: 'PostgreSQL', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'graphql', name: 'GraphQL', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'nextjs', name: 'Next.js', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'tailwind', name: 'Tailwind CSS', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'framer', name: 'Framer Motion', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'threejs', name: 'Three.js', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'git', name: 'Git', level: 1, xp: 0, maxXp: 100, unlocked: false },
  { id: 'ci-cd', name: 'CI/CD', level: 1, xp: 0, maxXp: 100, unlocked: false },
];

export default function GamifiedExperience() {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [userSkills, setUserSkills] = useState<Skill[]>(skills);
  const [totalXp, setTotalXp] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ title: '', xp: 0 });

  const addXp = useCallback((amount: number) => {
    setTotalXp((prev) => prev + amount);
  }, []);

  const showAchievementNotification = useCallback((title: string, xp: number) => {
    setNotification({ title, xp });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  const updateAchievement = useCallback((id: string, progress: number) => {
    setUserAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id === id) {
          const newProgress = achievement.progress + progress;
          const unlocked = newProgress >= achievement.maxProgress;
          if (unlocked && !achievement.unlocked) {
            addXp(achievement.xp);
            showAchievementNotification(achievement.title, achievement.xp);
          }
          return {
            ...achievement,
            progress: newProgress,
            unlocked,
          };
        }
        return achievement;
      })
    );
  }, [addXp, showAchievementNotification]);

  const updateSkill = useCallback((id: string, xp: number) => {
    setUserSkills((prev) =>
      prev.map((skill) => {
        if (skill.id === id) {
          const newXp = skill.xp + xp;
          const newLevel = Math.floor(newXp / skill.maxXp) + 1;
          const unlocked = newLevel > 1;
          if (unlocked && !skill.unlocked) {
            showAchievementNotification(`${skill.name} Unlocked!`, 50);
          }
          return {
            ...skill,
            xp: newXp,
            level: newLevel,
            unlocked,
          };
        }
        return skill;
      })
    );
  }, [showAchievementNotification]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      updateAchievement('first-visit', 1);
    }

    const handleProjectView = () => {
      updateAchievement('project-explorer', 1);
      updateSkill('react', 10);
      updateSkill('nextjs', 10);
      addXp(20);
    };

    const handleGitHubView = () => {
      updateAchievement('code-reviewer', 1);
      updateSkill('git', 10);
      addXp(15);
    };

    const handleKubernetesInteraction = () => {
      updateAchievement('kubernetes-master', 1);
      updateSkill('kubernetes', 15);
      updateSkill('docker', 10);
      addXp(25);
    };

    const handleVoiceCommand = () => {
      updateAchievement('voice-commander', 1);
      addXp(10);
    };

    const handleResumeDownload = () => {
      updateAchievement('resume-builder', 1);
      addXp(50);
    };

    const handleTestimonialView = () => {
      updateAchievement('testimonial-collector', 1);
      addXp(10);
    };

    document.addEventListener('project-view', handleProjectView);
    document.addEventListener('github-view', handleGitHubView);
    document.addEventListener('kubernetes-interaction', handleKubernetesInteraction);
    document.addEventListener('voice-command', handleVoiceCommand);
    document.addEventListener('resume-download', handleResumeDownload);
    document.addEventListener('testimonial-view', handleTestimonialView);

    return () => {
      document.removeEventListener('project-view', handleProjectView);
      document.removeEventListener('github-view', handleGitHubView);
      document.removeEventListener('kubernetes-interaction', handleKubernetesInteraction);
      document.removeEventListener('voice-command', handleVoiceCommand);
      document.removeEventListener('resume-download', handleResumeDownload);
      document.removeEventListener('testimonial-view', handleTestimonialView);
    };
  }, [updateAchievement, updateSkill, addXp]);

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'trophy':
        return <Trophy className="w-6 h-6 text-accent" />;
      case 'star':
        return <Star className="w-6 h-6 text-accent" />;
      case 'zap':
        return <Zap className="w-6 h-6 text-accent" />;
      case 'target':
        return <Target className="w-6 h-6 text-accent" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#18181b] font-mono text-gray-300">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-accent uppercase tracking-wider">
          Your Progress
        </h2>

        <div className="text-center mb-12">
          <p className="text-2xl">
            Total XP: <span className="text-accent font-bold">{totalXp}</span>
          </p>
          {/* You could add an overall progress bar here if desired */}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-semibold mb-8 text-center text-gray-100 uppercase tracking-wide">Achievements</h3>
            <div className="space-y-6">
              {userAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-lg border ${achievement.unlocked ? 'border-accent shadow-neon bg-[#27272a]' : 'border-gray-700 bg-[#222225]'} `}
                >
                  <div className="flex items-center mb-3">
                    <div className={`mr-4 p-2 rounded-full ${achievement.unlocked ? 'bg-accent/10' : 'bg-gray-700/30'}`}>
                      {getIcon(achievement.icon)}
                    </div>
                    <div>
                      <h4 className={`text-xl font-semibold ${achievement.unlocked ? 'text-accent' : 'text-gray-400'}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    <div className="ml-auto text-right">
                      {achievement.unlocked ? (
                        <Unlock className="w-5 h-5 text-accent" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-600" />
                      )}
                      <p className={`text-sm font-bold ${achievement.unlocked ? 'text-accent' : 'text-gray-600'}`}>
                        {achievement.xp} XP
                      </p>
                    </div>
                  </div>
                  {!achievement.unlocked && achievement.maxProgress > 1 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-accent h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="text-xs text-right text-gray-500 mt-1">
                        {achievement.progress}/{achievement.maxProgress}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-semibold mb-8 text-center text-gray-100 uppercase tracking-wide">Skills</h3>
            <div className="space-y-6">
              {userSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-lg border ${skill.unlocked ? 'border-accent shadow-neon bg-[#27272a]' : 'border-gray-700 bg-[#222225]'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className={`text-xl font-semibold ${skill.unlocked ? 'text-accent' : 'text-gray-400'}`}>
                      {skill.name}
                    </h4>
                    <span className={`text-sm font-bold ${skill.unlocked ? 'text-accent' : 'text-gray-500'}`}>
                      Lvl {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <motion.div
                      className="bg-accent h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.xp / skill.maxXp) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>XP: {skill.xp} / {skill.maxXp}</span>
                    {skill.unlocked ? (
                        <span className="text-accent">Unlocked!</span>
                      ) : (
                        <span>Locked</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              className="fixed bottom-10 right-10 bg-[#27272a] border border-accent shadow-neon p-6 rounded-lg text-center z-50"
            >
              <div className="flex items-center mb-2">
                <Trophy className="w-6 h-6 text-accent mr-3" />
                <h5 className="text-lg font-semibold text-accent">{notification.title}</h5>
              </div>
              <p className="text-gray-300">You earned <span className="font-bold text-accent">{notification.xp} XP</span>!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 
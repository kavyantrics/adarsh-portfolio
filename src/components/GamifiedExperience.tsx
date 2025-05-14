'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Check for first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      updateAchievement('first-visit', 1);
    }

    // Add event listeners for interactive elements
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

    // Add event listeners
    document.addEventListener('project-view', handleProjectView);
    document.addEventListener('github-view', handleGitHubView);
    document.addEventListener('kubernetes-interaction', handleKubernetesInteraction);
    document.addEventListener('voice-command', handleVoiceCommand);
    document.addEventListener('resume-download', handleResumeDownload);
    document.addEventListener('testimonial-view', handleTestimonialView);

    return () => {
      // Cleanup event listeners
      document.removeEventListener('project-view', handleProjectView);
      document.removeEventListener('github-view', handleGitHubView);
      document.removeEventListener('kubernetes-interaction', handleKubernetesInteraction);
      document.removeEventListener('voice-command', handleVoiceCommand);
      document.removeEventListener('resume-download', handleResumeDownload);
      document.removeEventListener('testimonial-view', handleTestimonialView);
    };
  }, []);

  const updateAchievement = (id: string, progress: number) => {
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
  };

  const updateSkill = (id: string, xp: number) => {
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
  };

  const addXp = (amount: number) => {
    setTotalXp((prev) => prev + amount);
  };

  const showAchievementNotification = (title: string, xp: number) => {
    setNotification({ title, xp });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'trophy':
        return <Trophy className="w-6 h-6" />;
      case 'star':
        return <Star className="w-6 h-6" />;
      case 'zap':
        return <Zap className="w-6 h-6" />;
      case 'target':
        return <Target className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Total XP: {totalXp}</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalXp % 1000) / 10}%` }}
              className="bg-blue-500 h-2 rounded-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Skills</h4>
          <div className="grid grid-cols-2 gap-2">
            {userSkills.map((skill) => (
              <motion.div
                key={skill.id}
                whileHover={{ scale: 1.05 }}
                className={`p-2 rounded ${
                  skill.unlocked
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  {skill.unlocked ? (
                    <Unlock className="w-4 h-4 text-blue-500" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(skill.xp % skill.maxXp) / skill.maxXp * 100}%` }}
                    className="bg-blue-500 h-1 rounded-full"
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Level {skill.level}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Achievements</h4>
          <div className="space-y-2">
            {userAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.02 }}
                className={`p-2 rounded flex items-center gap-2 ${
                  achievement.unlocked
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                {getIcon(achievement.icon)}
                <div className="flex-1">
                  <div className="text-sm font-medium">{achievement.title}</div>
                  <div className="text-xs text-gray-500">
                    {achievement.progress}/{achievement.maxProgress}
                  </div>
                </div>
                <div className="text-xs font-medium text-blue-500">
                  +{achievement.xp} XP
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            <div className="font-medium">{notification.title}</div>
            <div className="text-sm">+{notification.xp} XP</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
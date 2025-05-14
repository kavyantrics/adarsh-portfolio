'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface GamificationContextType {
  updateAchievement: (id: string, progress: number) => void;
  updateSkill: (id: string, xp: number) => void;
  addXp: (amount: number) => void;
  showAchievementNotification: (title: string, xp: number) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ title: '', xp: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalXp, setTotalXp] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [achievements, setAchievements] = useState<Record<string, { progress: number; unlocked: boolean }>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [skills, setSkills] = useState<Record<string, { xp: number; level: number }>>({});

  const updateAchievement = (id: string, progress: number) => {
    setAchievements((prev) => {
      const current = prev[id] || { progress: 0, unlocked: false };
      const newProgress = current.progress + progress;
      const unlocked = !current.unlocked && newProgress >= 1; // Assuming maxProgress is 1 for simplicity
      
      if (unlocked) {
        showAchievementNotification(`Achievement Unlocked: ${id}`, 50);
      }
      
      return {
        ...prev,
        [id]: { progress: newProgress, unlocked },
      };
    });
  };

  const updateSkill = (id: string, xp: number) => {
    setSkills((prev) => {
      const current = prev[id] || { xp: 0, level: 1 };
      const newXp = current.xp + xp;
      const newLevel = Math.floor(newXp / 100) + 1; // Level up every 100 XP
      
      if (newLevel > current.level) {
        showAchievementNotification(`Level Up: ${id}`, 25);
      }
      
      return {
        ...prev,
        [id]: { xp: newXp, level: newLevel },
      };
    });
  };

  const addXp = (amount: number) => {
    setTotalXp((prev) => prev + amount);
  };

  const showAchievementNotification = (title: string, xp: number) => {
    setNotification({ title, xp });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <GamificationContext.Provider
      value={{
        updateAchievement,
        updateSkill,
        addXp,
        showAchievementNotification,
      }}
    >
      {children}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <div className="font-medium">{notification.title}</div>
          <div className="text-sm">+{notification.xp} XP</div>
        </div>
      )}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
} 
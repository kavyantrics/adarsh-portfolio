'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-8 left-8 p-3 rounded-full bg-[#27272a] border border-accent/30 text-accent hover:text-accent/100 hover:bg-accent/10 transition-all duration-300 shadow-md hover:shadow-neon-sm focus:outline-none focus:ring-2 focus:ring-accent/50 ring-offset-2 ring-offset-[#18181b] z-[999]"
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6"
      >
        {theme === 'dark' ? (
          <Sun className="w-full h-full" />
        ) : (
          <Moon className="w-full h-full" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 
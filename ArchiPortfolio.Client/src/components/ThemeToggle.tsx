import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={toggleDarkMode}
      className={`fixed top-8 right-8 z-50 p-3 rounded-full transition-all duration-300 backdrop-blur-md border ${darkMode
          ? 'bg-zinc-900/50 border-zinc-700 text-zinc-100 hover:bg-zinc-800'
          : 'bg-white/50 border-zinc-200 text-zinc-900 hover:bg-zinc-100'
        }`}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;
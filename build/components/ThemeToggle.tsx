import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
  isTransparent?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme, isTransparent = false }) => {
  const baseClasses = "p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-primary-500";
  
  if (isTransparent) {
    return (
      <button
        onClick={toggleTheme}
        className={`${baseClasses} bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`${baseClasses} ${
        isDark 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-700' 
          : 'bg-primary-50 text-primary-600 hover:bg-primary-100 border border-primary-100'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
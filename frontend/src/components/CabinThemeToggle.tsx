/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Compass } from 'lucide-react';
import { useAppStore } from '../store';

export default function CabinThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });
  
  const { setCursorHovered } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div 
      onMouseEnter={() => setCursorHovered(true)}
      onMouseLeave={() => setCursorHovered(false)}
      onClick={toggleTheme}
      className="flex items-center space-x-2 bg-white dark:bg-[#1C1C19] border-2 border-black dark:border-[#E2FF00] p-1.5 cursor-pointer rounded-none select-none neo-shadow-sm hover:scale-105 active:scale-95 transition-all text-black dark:text-white"
      id="cabin-theme-toggle"
      title="Toggle Interactive Luxury Cabin Atmosphere"
    >
      {/* Small selector pill */}
      <div className="flex items-center space-x-1 font-mono text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 select-none shrink-0">
        <Compass className="w-3 h-3 text-[#E23E26] animate-spin-[20s] spin-slow shrink-0" />
        <span className="hidden leading-none xs:inline">CABIN:</span>
        <span className="text-[#E23E26] dark:text-[#E2FF00] font-black leading-none">{theme === 'light' ? 'DAY' : 'NIGHT'}</span>
      </div>

      <div className="relative w-12 h-6 bg-gray-200 dark:bg-black border border-black dark:border-[#E2FF00] flex items-center p-0.5">
        {/* Sliding Indicator */}
        <motion.div
          animate={{ x: theme === 'light' ? 0 : 22 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-4 h-4 bg-[#E23E26] dark:bg-[#E2FF00] border border-black dark:border-black flex items-center justify-center shrink-0"
        >
          {theme === 'light' ? (
            <Sun className="w-2.5 h-2.5 text-white" />
          ) : (
            <Moon className="w-2.5 h-2.5 text-black" />
          )}
        </motion.div>
      </div>
    </div>
  );
}

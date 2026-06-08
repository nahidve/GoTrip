/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Compass, MessageSquare, Award, Info, Ship, MapPin } from 'lucide-react';
import { useAppStore } from '../store';

export default function FloatingDock() {
  const { activePage, setActivePage, setCursorHovered } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = [
    { label: 'HOME', pageId: 'home', icon: Home },
    { label: 'STAYS', pageId: 'stays', icon: MapPin },
    { label: 'AMALFI', pageId: 'amalfi', icon: Ship },
    { label: 'DELIVERIES', pageId: 'dashboard', icon: Award },
    { label: 'CONCIERGE', pageId: 'support', icon: MessageSquare },
    { label: 'VANGUARD', pageId: 'about', icon: Info }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[40] pointer-events-auto"
        id="gotrip-floating-dock"
      >
        <div className="bg-[#111111]/95 dark:bg-[#111111]/95 text-white border-2 border-[#E2FF00] p-2 pr-4 pl-4 flex items-center space-x-3 md:space-x-4 shadow-[4px_4px_0px_0px_#E2FF00] rounded-none select-none backdrop-blur-md">
          
          <div className="flex items-center space-x-2 border-r-2 border-dashed border-[#E2FF00]/40 pr-3 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E23E26] animate-ping" />
            <span className="font-mono text-[8px] tracking-widest text-[#E2FF00] font-black uppercase">LIVE CO:</span>
          </div>

          {items.map((item) => {
            const IconComp = item.icon;
            const isSelected = activePage === item.pageId;

            return (
              <button
                key={item.pageId}
                onClick={() => {
                  setActivePage(item.pageId as any);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className={`relative px-3.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all outline-none border focus:border-[#E2FF00] hover:scale-105 active:scale-95 ${
                  isSelected 
                    ? 'bg-[#E2FF00] text-black border-[#E2FF00]' 
                    : 'bg-transparent text-gray-300 border-transparent hover:text-white'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E23E26]' : 'text-gray-400 group-hover:text-white'}`} />
                <span className="hidden leading-none sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

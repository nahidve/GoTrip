/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LOAD_WORDS = [
  "COORIDNATING FLIGHT TRANSFERS...",
  "ACTIVATING ELITE CONCIERGE...",
  "UNLOCKING RESTRICTED SANCTUARIES...",
  "OPTIMIZING ITINERARY COORDINATES...",
  "PREPARING YOUR AZURE CABIN..."
];

const DEST_PREVIEWS = [
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=200&auto=format&fit=crop", // Amalfi
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=200&auto=format&fit=crop", // Paris
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=200&auto=format&fit=crop"  // Kyoto
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Word cycler
    const wordInterval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % LOAD_WORDS.length);
    }, 450);

    // Speed counter
    const pctInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(pctInterval);
          clearInterval(wordInterval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for fade exit
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);

    return () => {
      clearInterval(wordInterval);
      clearInterval(pctInterval);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="gotrip-global-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] bg-[#0A0A0A] text-[#FDFBF7] flex flex-col justify-between p-8 md:p-16 select-none"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center w-full font-mono text-[9px] tracking-widest text-[#E2FF00]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#E23E26] animate-pulse" />
            <span>SYSTEM LINK: SECURED ACTIVE</span>
          </div>
          <div>ESTABLISHED CO: 2026</div>
        </div>

        {/* Center Loading Segment */}
        <div className="text-center space-y-8 max-w-2xl mx-auto flex flex-col items-center">
          {/* Progressive logo text reveal */}
          <div className="flex items-center space-x-1 mb-8 overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[#E23E26] font-syne font-black text-6xl italic tracking-tighter uppercase inline-block"
            >
              Go
            </motion.span>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="text-white font-display font-black text-6xl tracking-tight uppercase inline-block"
            >
              Trip
            </motion.span>
          </div>

          {/* Luxury imagery fade revelations */}
          <div className="flex gap-4 items-center justify-center my-6">
            {DEST_PREVIEWS.map((src, i) => (
              <motion.div
                key={i}
                initial={{ filter: "blur(20px)", scale: 0.7, opacity: 0 }}
                animate={{ 
                  filter: percent > (i * 30 + 10) ? "blur(0px)" : "blur(10px)", 
                  scale: percent > (i * 30 + 10) ? 1.05 : 0.85,
                  opacity: percent > (i * 30 + 10) ? 0.9 : 0.2
                }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 md:w-20 md:h-20 border-2 border-[#E2FF00]/40 overflow-hidden"
              >
                <img src={src} alt="Travel preview" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>

          <div className="space-y-2 w-full text-center">
            {/* Smooth animated words */}
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[9px] tracking-widest text-gray-400 uppercase font-black min-h-[16px]"
              >
                {LOAD_WORDS[wordIdx]}
              </motion.p>
            </AnimatePresence>

            {/* Custom high precision progress layout */}
            <div className="h-[3px] bg-white/10 w-64 mx-auto relative overflow-hidden border border-white/5 mt-4">
              <motion.div 
                className="h-full bg-[#E2FF00]"
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom telemetry indicators */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full font-mono text-[10px] text-gray-500 uppercase">
          <div className="flex items-center space-x-1.5 font-black text-[#E2FF00]">
            <span>{Math.min(percent, 100)}%</span>
            <span className="text-gray-600">|</span>
            <span className="text-[9px] text-[#00F0FF] tracking-wider animate-pulse font-bold">BYPASSING PUBLIC TOURIST FLIGHTS</span>
          </div>
          <div className="mt-2 md:mt-0 leading-none">
            CONNECTED CONCIERGE STATION • 2026
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

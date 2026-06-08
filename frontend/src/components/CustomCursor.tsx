/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [customLabel, setCustomLabel] = useState<string | null>(null);
  const cursorHovered = useAppStore((state) => state.cursorHovered);

  useEffect(() => {
    // Disable customized cursor on touchscreen devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Scan hovered element for data-cursor context
      const target = e.target as HTMLElement;
      if (target) {
        const closestInteractive = target.closest('[data-cursor]');
        if (closestInteractive) {
          const label = closestInteractive.getAttribute('data-cursor');
          setCustomLabel(label);
        } else {
          setCustomLabel(null);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let animFrame: number;
    const updateTrailByLerp = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Delayed tracking (elastic factor)
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16,
        };
      });
      animFrame = requestAnimationFrame(updateTrailByLerp);
    };

    animFrame = requestAnimationFrame(updateTrailByLerp);
    return () => cancelAnimationFrame(animFrame);
  }, [position]);

  if (!isVisible) return null;

  const isExpanded = cursorHovered || !!customLabel;

  return (
    <>
      {/* Outer Cursor - delayed tracking with glow, custom labels */}
      <div
        className="custom-cursor-outer flex items-center justify-center transition-all"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: isExpanded ? '72px' : '36px',
          height: isExpanded ? '72px' : '36px',
          backgroundColor: isExpanded ? 'rgba(226, 255, 0, 0.15)' : 'transparent',
          borderColor: isExpanded ? '#E2FF00' : '#111111',
          borderWidth: isExpanded ? '2px' : '2px',
          boxShadow: isExpanded ? '0 0 15px rgba(226, 255, 0, 0.4)' : 'none',
          transform: `translate(-50%, -50%) scale(${isExpanded ? 1.15 : 1})`,
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s, border-color 0.25s, box-shadow 0.25s',
          mixBlendMode: 'difference'
        }}
      >
        <AnimatePresence>
          {customLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[8.5px] font-black tracking-widest text-[#E2FF00] dark:text-[#E2FF00] uppercase text-center select-none"
            >
              {customLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Inner Cursor - immediate tracking */}
      <div
        className="custom-cursor-inner"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isExpanded ? 1.8 : 1})`,
          backgroundColor: isExpanded ? '#00F0FF' : '#E23E26',
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.15s'
        }}
      >
        <span className="sr-only">Cursor</span>
      </div>
    </>
  );
}

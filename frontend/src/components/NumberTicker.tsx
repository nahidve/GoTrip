/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';

interface NumberTickerProps {
  value: number;
  suffix?: string;
  duration?: number; // duration in ms
}

export default function NumberTicker({ value, suffix = '', duration = 1500 }: NumberTickerProps) {
  const [current, setCurrent] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easedProgress = progress * (2 - progress);
      const currentVal = Math.floor(easedProgress * end);
      
      setCurrent(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrent(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, value, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

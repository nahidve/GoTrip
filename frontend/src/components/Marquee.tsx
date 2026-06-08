/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const RUNWAY_PARTNERS = [
  "ELITE AIRWAYS",
  "AZURE HOTEL COLLECTION",
  "VANGUARD INTL YACHTS",
  "RIVA BOATS ATTACHÉ",
  "CELESTIAL JET CHARTERS",
  "MONOLITH ARCHITECTURE RESORTS",
  "CONCA DEL SOGNO BEACH CLUB",
  "AERADIO ESCAPES",
  "SANTORINI STEALTH SUITES"
];

export default function Marquee() {
  // Duplicate list to achieve seamless infinite looping
  const partnersDouble = [...RUNWAY_PARTNERS, ...RUNWAY_PARTNERS, ...RUNWAY_PARTNERS];

  return (
    <div className="w-full bg-[#111111] dark:bg-[#0A0A09] text-[#E2FF00] border-y-2 border-black dark:border-[#E2FF00] py-4 overflow-hidden flex items-center select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center space-x-12">
        {partnersDouble.map((partner, idx) => (
          <div key={idx} className="inline-flex items-center space-x-4 font-mono text-[10px] md:text-xs font-black tracking-widest uppercase">
            <span>{partner}</span>
            <span className="text-[#E23E26] text-sm">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

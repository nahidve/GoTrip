/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAppStore } from '../store';
import { ARCHITECTS, VANGUARD_TIMELINE, IMAGES } from '../data';
import { Compass, Users, History, Anchor } from 'lucide-react';

export default function About() {
  const { setActivePage, setCursorHovered } = useAppStore();

  return (
    <div className="bg-[#FDFBF7] text-[#111111] overflow-x-hidden min-h-screen font-sans">
      
      {/* 1. HERO PHILOSOPHY HEADER */}
      <section 
        className="relative h-[55vh] w-full bg-cover bg-center flex flex-col justify-end p-8 md:p-16 border-b-4 border-black"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${IMAGES.aboutHero})` }}
      >
        <div className="max-w-4xl space-y-3 z-10">
          <span className="bg-[#00F0FF] text-black font-mono font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black inline-block">
            THE VANGUARD
          </span>
          <h1 className="text-white font-syne font-black text-4xl md:text-7xl leading-none uppercase tracking-tight">
            MASTER ARCHITECTS <br />OF THE UNKNOWN
          </h1>
          <p className="text-gray-200 font-display text-xs md:text-sm max-w-xl font-medium leading-relaxed">
            GoTrip is an elite travel designer collective composed of architectural historians, aviation operators, and local explorers. We don't book trips; we compile realities.
          </p>
        </div>
      </section>

      {/* 2. THREE PILLARS / PRINCIPLES COMPOSITION */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-300">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-[#FF5A00]/10 border border-[#FF5A00] flex items-center justify-center text-[#FF5A00]">
            <Compass className="w-6 h-6 stroke-2" />
          </div>
          <h3 className="font-syne font-black text-xl uppercase tracking-wide">AUTHENTIC GEOMETRIES</h3>
          <p className="text-gray-500 font-display text-xs leading-relaxed">
            We prioritize structures designed with absolute environmental loyalty. From Brutalist mountain concrete blocks to Sorrento lemon cliff terraces—we demand visual rigor.
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-12 h-12 bg-[#E2FF00]/30 border border-black flex items-center justify-center text-black">
            <Anchor className="w-6 h-6 stroke-2" />
          </div>
          <h3 className="font-syne font-black text-xl uppercase tracking-wide">FLIGHT & FLOW SEAMLESSNESS</h3>
          <p className="text-gray-500 font-display text-xs leading-relaxed">
            No lines, no security queues, no commercial interruptions. GoTrip passengers transition instantly from private hangars to customized mahogany speedboats in minutes.
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-12 h-12 bg-[#00F0FF]/25 border border-black flex items-center justify-center text-black">
            <Users className="w-6 h-6 stroke-2" />
          </div>
          <h3 className="font-syne font-black text-xl uppercase tracking-wide">ELITE INTEGRATIONS</h3>
          <p className="text-gray-500 font-display text-xs leading-relaxed">
            Julian and our digital CRM tracking attachés provide a 1:1 human-to-human feedback loop that makes the absolute impossible achievable within hours.
          </p>
        </div>
      </section>

      {/* 3. TIMELINE EVENTS SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#FFF0E8] border-b-2 border-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-[#E23E26]" />
            <h2 className="font-syne font-black text-3xl md:text-5xl uppercase tracking-wider">HISTORICAL Milestones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VANGUARD_TIMELINE.map((evt) => (
              <div key={evt.id} className="bg-white border-2 border-black p-6 neo-shadow">
                <span className="bg-[#E2FF00] text-black font-mono font-black text-xs px-2.5 py-1 border border-black inline-block mb-4 select-none">
                  YEAR {evt.year}
                </span>
                <h3 className="font-syne font-black text-lg uppercase tracking-wide mb-2">
                  {evt.title}
                </h3>
                <p className="text-gray-500 font-display text-xs leading-relaxed">
                  {evt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE DESIGN CURATOR HEADS */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="font-syne font-black text-4xl md:text-6xl tracking-tight leading-none mb-16 uppercase">
          The Design <br />Curator Heads.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARCHITECTS.map((prof) => (
            <div 
              key={prof.name} 
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="border-2 border-black bg-white neo-shadow group"
            >
              <div className="h-72 overflow-hidden border-b-2 border-black">
                <img src={prof.image} alt={prof.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-3">
                <p className="font-mono text-[#E23E26] text-[10px] font-black uppercase tracking-widest">{prof.title}</p>
                <h4 className="font-syne font-black text-xl text-black uppercase tracking-wide">{prof.name}</h4>
                <p className="text-gray-500 font-display text-xs leading-relaxed">
                  Responsible for coordinating structural authenticity, sustainable footprint integrations, and exclusive VIP concierge assets at GoTrip core.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAppStore } from '../store';
import { EXPERIENCES_AMALFI, AMALFI_ICONS, IMAGES, DESTINATIONS } from '../data';
import { Star, Map, Calendar, Compass, ArrowUpRight, Check, AlertCircle } from 'lucide-react';

export default function Amalfi() {
  const { setActivePage, setCursorHovered, selectedExperience, setSelectedExperience, setBookingDetails } = useAppStore();
  const destData = DESTINATIONS[0]; // Amalfi dest data

  const handleSelectDate = (exp: any) => {
    setSelectedExperience(exp);
    setBookingDetails({
      destinationId: 'amalfi',
      experienceId: exp.id,
      subtotal: exp.price + 3400, // 4 nights + experience
      tax: Math.round((exp.price + 3400) * 0.12),
      total: Math.round((exp.price + 3400) * 1.12),
    });
    setActivePage('itinerary'); // Redirect to Itinerary view
  };

  return (
    <div className="bg-[#FDFBF7] text-[#111111] overflow-x-hidden min-h-screen font-sans">
      {/* 1. HERO BANNER */}
      <section 
        className="relative h-[70vh] w-full bg-cover bg-center flex flex-col justify-end p-8 md:p-16 border-b-4 border-black"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${IMAGES.amalfiCoastHero})` }}
      >
        <div className="max-w-4xl space-y-4">
          <span className="bg-[#E2FF00] text-black font-display font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black inline-block">
            EXCLUSIVE DESTINATION
          </span>
          <h1 className="text-white font-syne font-black text-5xl md:text-8xl tracking-tight uppercase leading-none">
            {destData.name}
          </h1>
          <p className="text-gray-200 font-display text-sm md:text-base max-w-xl leading-relaxed">
            {destData.tagline}
          </p>
        </div>

        {/* Floating Inquire Button inside Hero */}
        <div className="absolute right-8 md:right-16 bottom-8 md:bottom-16">
          <button
            onClick={() => setActivePage('itinerary')}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            data-cursor="INQUIRE ✈️"
            className="neo-btn bg-[#E23E26] hover:bg-black text-white font-mono font-black text-xs md:text-sm uppercase tracking-widest px-6 py-3 flex items-center space-x-2 cursor-pointer"
          >
            <span>INQUIRE NOW</span>
            <ArrowUpRight className="w-4 h-4 text-[#E2FF00]" />
          </button>
        </div>
      </section>

      {/* 2. EDITORIAL COMPOSITION */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Editorial Text Column */}
        <div className="lg:col-span-7 space-y-6">
          <span className="bg-[#00F0FF] text-black font-mono font-black text-[10px] uppercase tracking-wider px-2.5 py-1 border border-black inline-block">
            EDITORIAL
          </span>
          <h2 className="font-editorial text-4xl md:text-5.5xl font-bold tracking-tight text-[#111111] leading-none">
            A Symphony of <br />
            <span className="italic font-normal">Lemon Trees</span> & <br />
            Salt Air.
          </h2>
          <p className="text-gray-500 font-display text-sm leading-relaxed max-w-lg">
            The Amalfi Coast is not just a destination; it's a sensory assault of the most refined kind. Since the days of the Roman Empire, this 50-kilometer stretch of coastline has captivated the world's most discerning travelers. 
          </p>
          <p className="text-gray-400 font-display text-xs leading-relaxed max-w-lg">
            From the terraced lemon groves of Sorrento to the high-fashion boutiques of Capri, every corner reveals a new layer of Italian luxury. Here, time slows down to the pace of a vintage Riva speedboat gliding across the Gulf of Salerno.
          </p>
        </div>

        {/* Editorial Image with black shadow frame */}
        <div className="lg:col-span-5 relative">
          <div 
            className="border-3 border-black neo-shadow-lg relative bg-white overflow-hidden p-3 group"
            data-cursor="ESTATE 🍋"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
          >
            <img 
              src={IMAGES.amalfiLemons} 
              alt="Amalfi Lemons" 
              className="w-full h-96 object-cover border-2 border-black" 
            />
            {/* Stamp badge */}
            <div className="bg-[#FDFBF7] border-2 border-black p-3 absolute bottom-6 left-6 max-w-xs font-mono select-none">
              <p className="text-xs font-black tracking-widest">EST. 1954</p>
              <p className="text-[10px] text-gray-500 font-bold">The Golden Era of Travel</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MUST-SEE ICONS CONTAINER */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#FFF0E8] border-y-2 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-syne font-black text-3xl md:text-5xl uppercase tracking-wider">The Must-See Icons</h2>
            <p className="text-gray-500 font-display text-xs mt-1">Hand-picked landmarks for the elite traveler.</p>
          </div>
          <button 
            onClick={() => setActivePage('stays')}
            className="flex items-center space-x-1.5 text-xs font-mono font-black text-black hover:text-[#E23E26] underline decoration-2 underline-offset-4 mt-3 md:mt-0"
          >
            <Map className="w-4 h-4 text-[#E23E26]" />
            <span>View Interactive Map 🗺️</span>
          </button>
        </div>

        {/* Custom icon Grid structure */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Positano Left tall card */}
          <div 
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${AMALFI_ICONS[0].image})` }}
            className="lg:col-span-6 bg-cover bg-center h-[520px] border-2 border-black neo-shadow p-6 flex flex-col justify-end text-white relative group cursor-pointer"
            onClick={() => setActivePage('hotel')}
          >
            <div className="bg-[#FDFBF7] border-2 border-black p-3 inline-block self-start text-black select-none neo-shadow-sm">
              <p className="font-mono text-[9px] uppercase tracking-widest font-black text-gray-400">VERTICAL CITY</p>
              <p className="font-syne font-black text-base">Positano</p>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            {/* Ravello top panel */}
            <div 
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${AMALFI_ICONS[1].image})` }}
              className="h-64 bg-cover bg-center border-2 border-black neo-shadow p-6 flex flex-col justify-end text-white cursor-pointer"
              onClick={() => setActivePage('stays')}
            >
              <div className="bg-[#FDFBF7] border-2 border-black p-3 inline-block self-start text-black select-none neo-shadow-sm">
                <p className="font-mono text-[9px] uppercase tracking-widest font-black text-gray-400">HILLTOP GARDEN</p>
                <p className="font-syne font-black text-base">Ravello</p>
              </div>
            </div>

            {/* Bottom smaller panels split */}
            <div className="grid grid-cols-2 gap-8">
              {/* Duomo */}
              <div 
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${AMALFI_ICONS[2].image})` }}
                className="h-48 bg-cover bg-center border-2 border-black neo-shadow p-4 flex flex-col justify-end text-white cursor-pointer"
                onClick={() => setActivePage('hotel')}
              >
                <span className="bg-black/75 text-white font-mono text-[9px] font-black px-2 py-0.5 border self-start uppercase">Duomo di Amalfi</span>
              </div>
              {/* Furore */}
              <div 
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${AMALFI_ICONS[3].image})` }}
                className="h-48 bg-cover bg-center border-2 border-black neo-shadow p-4 flex flex-col justify-end text-white cursor-pointer"
                onClick={() => setActivePage('stays')}
              >
                <span className="bg-black/75 text-white font-mono text-[9px] font-black px-2 py-0.5 border self-start uppercase">Furore Inlet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE ELITE COLLECTION */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="font-syne font-black text-4xl md:text-6xl tracking-tight leading-none mb-16 uppercase">
          The Elite <br />Collection.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIENCES_AMALFI.map((exp) => (
            <div key={exp.id} className="border-2 border-black bg-white neo-shadow flex flex-col justify-between">
              <div>
                <img src={exp.image} alt={exp.title} className="w-full h-56 object-cover border-b-2 border-black" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-syne font-black text-lg text-black uppercase tracking-wide">{exp.title}</h3>
                    <span className="bg-[#E23E26] text-white font-mono text-xs font-black px-2 py-1 border border-black">${exp.price.toLocaleString()}</span>
                  </div>
                  <p className="text-gray-500 font-display text-xs leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleSelectDate(exp)}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="w-full py-2.5 bg-white hover:bg-black hover:text-white border-2 border-black font-mono text-xs font-black leading-none tracking-widest uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
                >
                  SELECT DATE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BLACK BOTTOM REGION: INSIDER INTEL & REVIEWS */}
      <section className="bg-black text-[#FDFBF7] py-20 px-6 md:px-12 lg:px-24 border-t-4 border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Insider Intel */}
          <div className="space-y-8">
            <h3 className="text-[#E2FF00] font-syne font-black text-3.5xl uppercase tracking-wider">Insider Intel.</h3>
            
            <div className="space-y-6">
              <div className="border-l-3 border-[#E2FF00] pl-4 space-y-1">
                <p className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">🗓️ BEST TIME TO VISIT</p>
                <p className="text-sm font-semibold font-display">Late May to early September. Avoid August if you prefer fewer crowds.</p>
              </div>

              <div className="border-l-3 border-[#00F0FF] pl-4 space-y-1">
                <p className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">🚖 GETTING AROUND</p>
                <p className="text-sm font-semibold font-display">Hire a private driver. The SS163 is world-famous but notoriously difficult to navigate.</p>
              </div>

              <div className="border-l-3 border-[#FF0066] pl-4 space-y-1">
                <p className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">🛍️ SHOPPING</p>
                <p className="text-sm font-semibold font-display">Don't leave without bespoke handmade leather sandals from Positano, crafted directly to your feet.</p>
              </div>
            </div>
          </div>

          {/* Right: Elite Voices Review Card */}
          <div className="space-y-8 lg:pl-8">
            <h3 className="text-[#E2FF00] font-syne font-black text-3.5xl uppercase tracking-wider">Elite Voices.</h3>

            <div className="bg-white text-[#111111] p-8 border-2 border-[#E2FF00] relative neo-shadow">
              <span className="text-[#E23E26] font-display text-8xl absolute top-4 right-4 leading-none opacity-10">99</span>
              
              {/* Star rating icons */}
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[#FF5A00] text-[#FF5A00]" />
                ))}
              </div>

              <p className="font-display italic text-xs leading-relaxed text-gray-600 mb-6 relative z-10">
                "GoTrip managed every detail of our Amalfi escape. From the luxury helicopter transfers to our private villa in Ravello, the service was flawless. Truly the gold standard of luxury travel."
              </p>

              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 border border-black bg-[#E2FF00] flex items-center justify-center font-mono font-black text-xs">
                  MV
                </div>
                <div>
                  <p className="font-syne font-bold text-xs uppercase text-black">Marcus V.</p>
                  <p className="font-mono text-[9px] text-gray-400 font-semibold uppercase">ELITE CLUB MEMBER</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

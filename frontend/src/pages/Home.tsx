/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { DESTINATIONS, BLOG_ARTICLES, IMAGES, DISPATCH_CARDS } from '../data';
import { ArrowLeft, ArrowRight, ArrowUpRight, Plane, ShieldCheck, Mail, Sparkles, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import NumberTicker from '../components/NumberTicker';
import Marquee from '../components/Marquee';

export default function Home() {
  const { setActivePage, setCursorHovered, triggerSearch, setSearchQuery, setSelectedDate } = useAppStore();
  const [lclQuery, setLclQuery] = useState('');
  const [lclDate, setLclDate] = useState('2026-10-12');
  const [slideIndex, setSlideIndex] = useState(0);

  // States for dynamic premium elements
  const morphWords = ["WAITING.", "EXPLORING.", "UNTOUCHED.", "YOUR CABIN.", "ESCAPE."];
  const [morphIndex, setMorphIndex] = useState(0);

  const searchPlaceholders = [
    "Where to, explorer? (Amalfi, Paris, Alps...)",
    "Search private jets to coordinates...",
    "Securing exclusive suite access...",
    "Query yachts & skippers..."
  ];
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  useEffect(() => {
    const morphInterval = setInterval(() => {
      setMorphIndex((prev) => (prev + 1) % morphWords.length);
    }, 2800);

    const plInterval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3300);

    return () => {
      clearInterval(morphInterval);
      clearInterval(plInterval);
    };
  }, []);

  // Filter curated ones (Paris, Kyoto, Whitsunday)
  const curatedDestinations = DESTINATIONS.filter(d => d.id !== 'amalfi');

  const handleCurationClick = (id: string) => {
    if (id === 'paris') {
      setActivePage('hotel'); // Render hotel details
    } else {
      setActivePage('amalfi'); // Render amalfi coast
    }
  };

  const handleSearchExplore = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(lclQuery);
    setSearchQuery(lclQuery);
    setSelectedDate(lclDate);
    setActivePage('stays');
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % curatedDestinations.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + curatedDestinations.length) % curatedDestinations.length);
  };

  return (
    <div className="bg-[#FDFBF7] text-[#111111] overflow-x-hidden min-h-screen">
      {/* 1. HERO SECTION */}
      <section 
        className="relative h-[85vh] w-full flex flex-col justify-between p-6 md:p-12 border-b-4 border-black overflow-hidden"
      >
        {/* Immersive Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover brightness-75 dark:brightness-50"
        >
          <source src="https://www.pexels.com/download/video/10540776/" type="video/mp4" />
        </video>
        {/* Darkened Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        {/* Top Floating Badge */}
        <div className="self-center mt-6 z-10 text-center">
          <span className="bg-[#E2FF00] text-black font-mono font-black text-xs uppercase px-3 py-1.5 border-2 border-black neo-shadow-sm inline-block tracking-wider uppercase">
            LUXURY AWAITS
          </span>
          <h1 className="text-white font-syne font-extrabold text-4xl md:text-7xl lg:text-8xl tracking-tight leading-none uppercase mt-3 min-h-[140px] md:min-h-[200px]">
            THE WORLD IS <br />
            <span className="relative inline-block overflow-hidden h-[50px] md:h-[90px] lg:h-[110px] w-full text-[#E2FF00]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={morphIndex}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 font-black italic select-none"
                >
                  {morphWords[morphIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Floating cards and bottom search panel */}
        <div className="w-full max-w-5xl mx-auto z-10 space-y-6">
          {/* Overlapping Thumbnails with borders */}
          <div className="hidden md:flex justify-start space-x-6">
            <div 
              onClick={() => handleCurationClick('paris')}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              data-cursor="PARIS 🏨"
              className="bg-[#FDFBF7] border-2 border-black p-2 neo-shadow cursor-pointer hover:translate-y-[-4px] transition-transform w-[160px] select-none"
            >
              <img src={IMAGES.malibuThumbing} alt="Malibu" className="w-full h-20 object-cover border border-black mb-1.5" />
              <p className="font-mono text-[9px] text-gray-500 font-bold uppercase tracking-wider">MALIBU RETREAT</p>
            </div>
            <div 
              onClick={() => setActivePage('amalfi')}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              data-cursor="YACHT ⚓"
              className="bg-[#FDFBF7] border-2 border-black p-2 neo-shadow cursor-pointer hover:translate-y-[-4px] transition-transform w-[160px] select-none"
            >
              <img src={IMAGES.santoriniThumbing} alt="Santorini" className="w-full h-20 object-cover border border-black mb-1.5" />
              <p className="font-mono text-[9px] text-gray-500 font-bold uppercase tracking-wider">SANTORINI NIGHTS</p>
            </div>
          </div>

          {/* Search bar widget */}
          <form 
            onSubmit={handleSearchExplore}
            className="bg-[#FDFBF7] border-3 border-black p-4 md:p-6 neo-shadow grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
          >
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">SEARCH DESTINATION</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder={searchPlaceholders[placeholderIdx]}
                  value={lclQuery}
                  onChange={(e) => setLclQuery(e.target.value)}
                  className="w-full border-2 border-black px-3 py-2 pl-9 text-xs font-mono font-semibold uppercase focus:bg-[#E2FF00] focus:outline-none transition-all duration-300 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">DATES</label>
              <input
                type="date"
                value={lclDate}
                onChange={(e) => setLclDate(e.target.value)}
                className="w-full border-2 border-black px-3 py-2 text-xs font-mono font-semibold uppercase focus:bg-[#E2FF00] focus:outline-none whitespace-nowrap"
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              data-cursor="GO ✈️"
              className="w-full bg-[#FF5A00] hover:bg-black text-white py-2.5 border-2 border-black font-mono font-black tracking-widest text-sm uppercase transition-all shadow-[2px_2px_0px_0px_#111111] hover:scale-[1.01] active:translate-y-0.5"
            >
              EXPLORE
            </button>
          </form>
        </div>
      </section>

      {/* 2. CURATION SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-b-2 border-dashed border-gray-300">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-black font-syne font-black text-4xl md:text-6xl tracking-tight uppercase leading-none mb-4">
              CURATION
            </h2>
            <p className="text-gray-500 font-display text-sm md:text-base max-w-xl leading-relaxed">
              Hand-selected sanctuaries for the modern nomad who demands both edge and elegance. We bypass the tourist tracks to deliver authentic sensory design.
            </p>
          </div>
          <div className="flex space-x-3 mt-6 md:mt-0">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 border-2 border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-[#E2FF00] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 border-2 border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-[#E2FF00] transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Curated destination list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {curatedDestinations.map((dest, idx) => (
            <div 
              key={dest.id}
              onClick={() => handleCurationClick(dest.id)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="border-2 border-black bg-white group cursor-pointer hover:scale-[1.01] transition-transform neo-shadow"
            >
              <div className="relative h-64 overflow-hidden border-b-2 border-black">
                <img 
                  src={dest.heroImage} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className={`absolute top-4 right-4 ${
                  dest.essentialTag === 'ESSENTIAL' ? 'bg-[#E23E26]' : 'bg-[#00F0FF]'
                } text-white font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider border border-black`}>
                  {dest.essentialTag}
                </span>
              </div>
              <div className="p-6">
                <p className="text-gray-400 font-mono text-xs uppercase tracking-widest font-black mb-1">{dest.country}</p>
                <h3 className="font-syne font-black text-xl mb-3 tracking-wide">{dest.name}</h3>
                <p className="text-gray-500 font-display text-xs leading-relaxed mb-6">
                  {dest.tagline}
                </p>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between font-mono text-xs font-bold text-[#E23E26] group-hover:underline">
                  <span>VIEW DETAILS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INFINITE RUNWAY PARTNER MARQUEE */}
      <Marquee />

      {/* 3. BEYOND TRAVEL SECTION */}
      <section className="bg-[#FFEFE8] py-20 px-6 md:px-12 lg:px-24 border-y-4 border-black">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="font-syne font-black text-4xl md:text-6xl text-black tracking-tight leading-none uppercase">
            BEYOND <span className="text-[#E23E26] italic font-black">TRAVEL</span>
          </h2>
        </div>

        {/* Bento grid configuration  */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Private Jet (Left Wide block) */}
          <div 
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${IMAGES.privateJet})` }}
            className="lg:col-span-8 bg-cover bg-center h-80 border-2 border-black neo-shadow-lg p-6 flex flex-col justify-between text-white"
          >
            <div>
              <span className="bg-[#E2FF00] text-black font-mono font-black text-[9px] px-2.5 py-1 border border-black uppercase tracking-wider inline-block">FAST TRACK</span>
              <h3 className="font-syne font-black text-2xl lg:text-3xl uppercase tracking-wider mt-3">PRIVATE JET</h3>
              <p className="text-gray-200 text-xs font-display max-w-sm mt-1.5 leading-relaxed">
                Skip the lines. Our custom fleet of long-range heavy jets is ready to deploy globally at a moment's notice. Exclusive hangar pick-ups.
              </p>
            </div>
            <button 
              onClick={() => setActivePage('dashboard')}
              className="self-start px-5 py-2 bg-white text-black border border-black hover:bg-[#E2FF00] font-mono text-xs font-bold uppercase transition-colors"
            >
              INQUIRE
            </button>
          </div>

          {/* Yacht Charters (Right tall block) */}
          <div 
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${IMAGES.yachtCharter})` }}
            className="lg:col-span-4 bg-cover bg-center h-80 border-2 border-black neo-shadow-lg p-6 flex flex-col justify-between text-white"
          >
            <div>
              <h3 className="font-syne font-black text-2.5xl uppercase tracking-wider">YACHT CHARTERS</h3>
              <p className="text-gray-200 text-xs font-display mt-2 leading-relaxed">
                The ocean is your playground. Command the Mediterranean waves with our custom double-deckers.
              </p>
            </div>
            <button 
              onClick={() => setActivePage('amalfi')}
              className="self-start px-5 py-2 border-2 border-white text-white hover:bg-white hover:text-black font-mono text-xs font-black uppercase transition-all"
            >
              EXPLORE FLEET
            </button>
          </div>

          {/* Hidden Islands (Left small block) */}
          <div 
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${IMAGES.hiddenIslands})` }}
            className="lg:col-span-4 bg-cover bg-center h-80 border-2 border-black neo-shadow-lg p-6 flex flex-col justify-between text-white"
          >
            <div>
              <h3 className="font-syne font-black text-2.5xl uppercase tracking-wider">HIDDEN ISLANDS</h3>
              <p className="text-gray-200 text-xs font-display mt-2 leading-relaxed">
                Secluded coordinates that don't display on commercial maps. Absolute privacy and pristine preservation.
              </p>
            </div>
            <button 
              onClick={() => setActivePage('stays')}
              className="self-start px-5 py-2 bg-[#00F0FF] text-black border border-black font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
            >
              DISCOVER
            </button>
          </div>

          {/* Elite Concierge (Right wide text block) */}
          <div className="lg:col-span-8 bg-[#FDFBF7] border-2 border-black neo-shadow-lg p-8 flex flex-col justify-between text-[#111111]">
            <div>
              <h3 className="font-syne font-black text-3.5xl lg:text-4.5xl uppercase tracking-tighter leading-none mb-3">ELITE CONCIERGE</h3>
              <p className="text-gray-600 text-xs md:text-sm font-display leading-relaxed mb-4 max-w-xl">
                24/7 access to the mathematically impossible. From immediate private jet redirections, closed museum bookings, to absolute luxury island lockdowns – we engineer the details of your sanctuary.
              </p>
            </div>
            <button 
              onClick={() => setActivePage('support')}
              className="self-start px-6 py-2.5 bg-black text-[#E2FF00] hover:bg-[#E23E26] hover:text-white border-2 border-black font-mono text-xs font-black uppercase tracking-widest transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              JOIN THE CLUB
            </button>
          </div>
        </div>
      </section>

      {/* 4. STATISTICS BANNER WITH INTEGRATED NUMBER TICKERS */}
      <section className="bg-black dark:bg-[#0A0A09] text-[#E2FF00] border-b-4 border-black py-12 px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center select-none">
        <div>
          <p className="font-syne font-black text-4xl md:text-5xl lg:text-6xl text-[#E2FF00]">
            <NumberTicker value={150} />
          </p>
          <p className="font-mono text-[9px] text-gray-400 font-bold tracking-widest uppercase mt-2">DESTINATIONS</p>
        </div>
        <div>
          <p className="font-syne font-black text-4xl md:text-5xl lg:text-6xl text-[#E2FF00]">
            <NumberTicker value={50} suffix="K+" />
          </p>
          <p className="font-mono text-[9px] text-gray-400 font-bold tracking-widest uppercase mt-2">HAPPY TRAVELERS</p>
        </div>
        <div>
          <p className="font-syne font-black text-4xl md:text-5xl lg:text-6xl text-[#E2FF00]">
            <NumberTicker value={12} />
          </p>
          <p className="font-mono text-[9px] text-gray-400 font-bold tracking-widest uppercase mt-2">YEARS OF LUXURY</p>
        </div>
        <div>
          <p className="font-syne font-black text-4xl md:text-5xl lg:text-6xl text-[#E2FF00]">
            <NumberTicker value={800} />
          </p>
          <p className="font-mono text-[9px] text-gray-400 font-bold tracking-widest uppercase mt-2">PRIVATE JETS</p>
        </div>
      </section>

      {/* IMMERSIVE CINEMATIC VIDEO TEXT HERO */}
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden border-b-4 border-black select-none flex items-center justify-center">
        {/* Infinite Looping Ocean Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover brightness-50 dark:brightness-[0.3]"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-view-of-waves-rocking-on-the-shoreline-40742-large.mp4" type="video/mp4" />
          <div className="absolute inset-0 bg-[#00F0FF]/25 mix-blend-color-burn" />
        </video>

        {/* Dynamic backdrop shade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

        {/* Large Typography masking styling */}
        <div className="relative z-10 text-center max-w-5xl px-6 space-y-6">
          <span className="bg-[#E2FF00] text-black font-mono font-black text-xs px-3.5 py-1.5 border-2 border-black tracking-widest inline-block uppercase animate-pulse">
            CINEMATIC EXPLORATION
          </span>
          <h2 className="text-white font-syne font-black text-4xl md:text-7xl lg:text-8xl leading-none uppercase tracking-tighter">
            COMMAND THE CABIN. <br />
            <span className="text-transparent font-black bg-clip-text bg-gradient-to-r from-[#E2FF00] via-[#00F0FF] to-[#FF0066] italic">
              RULE THE SHORELINE.
            </span>
          </h2>
          <p className="text-gray-300 font-display text-xs md:text-sm max-w-xl mx-auto leading-relaxed uppercase tracking-wider font-semibold">
            We architect non-standard sensory routes across the blue wilderness. Tailored coordinates, private yachts, stealth resorts, premium aviation attachments.
          </p>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-b-2 border-dashed border-gray-300">
        <h2 className="text-center font-syne font-black text-3xl md:text-5xl text-black tracking-tight leading-none uppercase mb-16">
          THE <span className="text-[#E23E26] font-black italic">ELITE</span> VOICE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border-2 border-black p-8 neo-shadow relative">
            <span className="text-[#E23E26] font-display text-7xl font-bold absolute top-2 left-4 opacity-25">"</span>
            <p className="text-gray-600 font-display text-xs leading-relaxed italic mb-8 relative z-10 pt-4">
              GoTrip redefined what luxury travel means to me. Their attention to detail on our private island getaway was surgical. No request was too big.
            </p>
            <div className="flex items-center space-x-3 border-t border-gray-100 pt-4">
              <img src={IMAGES.architect1} alt="Marcus" className="w-10 h-10 border border-black rounded-full object-cover" />
              <div>
                <p className="font-syne font-bold text-xs uppercase text-black">MARCUS RHEIN</p>
                <p className="font-mono text-[9px] text-gray-400 font-semibold uppercase">TECH FOUNDER, BERLIN</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-2 border-black p-8 neo-shadow relative">
            <span className="text-[#E23E26] font-display text-7xl font-bold absolute top-2 left-4 opacity-25">"</span>
            <p className="text-gray-600 font-display text-xs leading-relaxed italic mb-8 relative z-10 pt-4">
              My concierge service is genuinely world-class. They managed to book a private dinner inside the Louvre with only three days' notice. Absolute wizardry.
            </p>
            <div className="flex items-center space-x-3 border-t border-gray-100 pt-4">
              <img src={IMAGES.architect2} alt="Elena" className="w-10 h-10 border border-black rounded-full object-cover" />
              <div>
                <p className="font-syne font-bold text-xs uppercase text-black">ELENA V.</p>
                <p className="font-mono text-[9px] text-gray-400 font-semibold uppercase">CREATIVE DIRECTOR, NYC</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border-2 border-black p-8 neo-shadow relative">
            <span className="text-[#E23E26] font-display text-7xl font-bold absolute top-2 left-4 opacity-25">"</span>
            <p className="text-gray-600 font-display text-xs leading-relaxed italic mb-8 relative z-10 pt-4">
              Sustainability meets absolute excellence. Each flight and resort felt carbon-neutralized, yet never felt compromised. Best booking platform on earth.
            </p>
            <div className="flex items-center space-x-3 border-t border-gray-100 pt-4">
              <img src={IMAGES.architect4} alt="Samuel" className="w-10 h-10 border border-black rounded-full object-cover" />
              <div>
                <p className="font-syne font-bold text-xs uppercase text-black">SAMUEL CHEN</p>
                <p className="font-mono text-[9px] text-gray-400 font-semibold uppercase">ESG CONSULTANT, SINGAPORE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE DISPATCH (JOURNAL SUB-PREVIEW) */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#FFF5E9] border-b-2 border-black">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Main article */}
          <div className="lg:w-7/12 bg-white border-2 border-black neo-shadow">
            <img src={IMAGES.dispatchHero} alt="Diver" className="w-full h-80 object-cover border-b-2 border-black" />
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className="bg-black text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wider border">ADVENTURE</span>
                <span className="text-gray-400 font-mono text-[10px] uppercase font-bold">OCTOBER 12, 2026</span>
              </div>
              <h3 className="font-syne font-extrabold text-2.5xl leading-tight mb-4 uppercase tracking-wider">
                DESCENT INTO THE ABYSS: PRIVATE CAVE DIVING IN BELIZE
              </h3>
              <p className="text-gray-500 font-display text-xs leading-relaxed mb-6">
                Explore the world's most exclusive underwater cave systems with our custom scuba guides. A journey for the few who dare to witness the unseen.
              </p>
              <button 
                onClick={() => setActivePage('dispatch')}
                className="px-5 py-2.5 bg-[#E23E26] hover:bg-black text-white border-2 border-black font-mono text-xs font-black tracking-widest uppercase transition-colors"
              >
                READ ARTICLE
              </button>
            </div>
          </div>

          {/* Side Articles */}
          <div className="lg:w-5/12 flex flex-col justify-between space-y-6">
            {DISPATCH_CARDS.map((card) => (
              <div 
                key={card.id}
                onClick={() => setActivePage('dispatch')}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="bg-white border-2 border-black p-4 flex gap-4 hover:translate-y-[-2px] transition-transform cursor-pointer neo-shadow"
              >
                <img src={card.image} alt={card.title} className="w-24 h-24 object-cover border border-black flex-shrink-0" />
                <div className="flex flex-col justify-center">
                  <span className="text-[#E23E26] font-mono text-[9px] font-black uppercase tracking-widest">{card.category}</span>
                  <h4 className="font-syne font-black text-sm uppercase tracking-wide mt-1 leading-tight">{card.title}</h4>
                  <p className="text-gray-400 text-[11px] font-display mt-1 leading-normal line-clamp-2">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STAY DANGEROUS NEWSLETTER */}
      <section className="bg-[#E2FF00] border-b-4 border-black py-20 px-6 md:px-12 text-center text-black">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="bg-[#E23E26] text-white font-mono font-black text-xs uppercase px-3 py-1 border border-black inline-block tracking-wider">STAY DANGEROUS</span>
          <h2 className="font-syne font-black text-4xl md:text-6xl tracking-tighter leading-none uppercase">
            STAY <span className="font-black italic text-stroke">DANGEROUS</span>
          </h2>
          <p className="text-black font-display font-medium text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Join our inner circle for priority access to new fleet arrivals, destination launches, and member-only events. No spam, just substance.
          </p>

          <form className="flex flex-col md:flex-row justify-center max-w-lg mx-auto gap-3 pt-4">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              required
              className="flex-grow border-2 border-black bg-white px-4 py-2.5 text-xs font-mono font-bold uppercase placeholder-gray-500 focus:outline-none"
            />
            <button
              type="button"
              className="px-6 py-2.5 bg-black text-[#E2FF00] font-mono font-black tracking-widest text-xs uppercase border-2 border-black hover:bg-[#E23E26] hover:text-white transition-colors"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

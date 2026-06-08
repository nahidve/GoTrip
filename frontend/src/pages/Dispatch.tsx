/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppStore } from '../store';
import { BLOG_ARTICLES, IMAGES, DISPATCH_CARDS } from '../data';
import { BookOpen, Award, ArrowUpRight, ArrowLeft } from 'lucide-react';

export default function Dispatch() {
  const { setActivePage, setCursorHovered } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'ADVENTURE' | 'LIFESTYLE' | 'ARCHITECTURE'>('ALL');
  const [readingArticle, setReadingArticle] = useState<any | null>(null);

  const categories: ('ALL' | 'ADVENTURE' | 'LIFESTYLE' | 'ARCHITECTURE')[] = [
    'ALL', 'ADVENTURE', 'LIFESTYLE', 'ARCHITECTURE'
  ];

  const filteredArticles = activeCategory === 'ALL'
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter((a) => a.category === activeCategory);

  const handleReadFull = (article: any) => {
    setReadingArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (readingArticle) {
    return (
      <div className="bg-[#FDFBF7] text-[#111111] min-h-screen py-16 px-6 md:px-12 lg:px-24 font-sans">
        <div className="max-w-3xl mx-auto space-y-8">
          <button 
            onClick={() => setReadingArticle(null)}
            className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-black focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO JOURNAL</span>
          </button>

          <div className="relative h-96 overflow-hidden border-2 border-black">
            <img src={readingArticle.image} alt={readingArticle.title} className="w-full h-full object-cover" />
            <span className="absolute top-4 right-4 bg-black text-white font-mono text-[9px] px-2.5 py-1 border border-white">
              {readingArticle.category}
            </span>
          </div>

          <div className="space-y-4 border-b pb-6">
            <div className="flex items-center space-x-3 text-xs font-mono text-gray-400 font-bold uppercase">
              <span>BY {readingArticle.author}</span>
              <span>•</span>
              <span>{readingArticle.date}</span>
            </div>
            <h1 className="font-syne font-black text-3.5xl lg:text-5xl uppercase tracking-tighter text-black leading-none">
              {readingArticle.title}
            </h1>
          </div>

          <p className="text-gray-700 font-display text-sm leading-relaxed first-letter:text-5xl first-letter:font-editorial first-letter:float-left first-letter:mr-3 first-letter:font-bold">
            {readingArticle.description}
          </p>

          <p className="text-gray-500 font-display text-sm leading-relaxed">
            As luxury travel continues to evolve from material acquisition toward authentic intellectual immersion, GoTrip is uniquely positioned to steer the next vanguard of explorations. This is not about the places you go, but the profound designs you interact with.
          </p>

          <div className="bg-[#FFEFE8] border border-black p-6 flex items-center space-x-6">
            <img src={IMAGES.architect1} alt="Curator" className="w-14 h-14 rounded-full border border-black object-cover" />
            <div className="space-y-1">
              <p className="font-mono text-[9px] text-[#E23E26] font-bold">CURATOR NOTE</p>
              <p className="text-xs font-display text-gray-600">
                "Our editorial staff traverses six continents annually to confirm architectural relevance prior to inclusions in our catalog. This is GoTrip's oath to you."
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] text-[#111111] overflow-x-hidden min-h-screen font-sans">
      
      {/* 1. HERO COVER HEADER */}
      <section className="bg-black text-[#FDFBF7] py-20 px-6 md:px-12 lg:px-24 border-b-4 border-black text-center relative select-none">
        <div className="max-w-4xl mx-auto space-y-4">
          <BookOpen className="w-10 h-10 text-[#E2FF00] mx-auto" />
          <h1 className="font-syne font-black text-4xl md:text-7xl leading-none uppercase tracking-tight">
            THE DISPATCH <span className="text-[#E23E26] italic font-black">JOURNAL</span>
          </h1>
          <p className="text-gray-400 font-display text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Intellectual dispatches on experimental architecture, design theory, pristine sailing expeditions, and global gastronomy curators.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY TABS AND MULTI-COLUMN ARTICLE GOTO */}
      <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto space-y-12">
        
        {/* Horizontal tabs */}
        <div className="flex flex-wrap gap-2.5 border-b-2 border-black pb-4 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 border-2 border-black font-mono text-[10px] font-black tracking-widest uppercase cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#E2FF00] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Giant Main Spotlights Split grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main big list column */}
          <div className="lg:col-span-8 space-y-12">
            {filteredArticles.map((art) => (
              <div key={art.id} className="border-3 border-black bg-white neo-shadow flex flex-col md:flex-row overflow-hidden">
                <img src={art.image} alt={art.title} className="w-full md:w-72 h-64 object-cover border-b-2 md:border-b-0 md:border-r-2 border-black flex-shrink-0" />
                
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center space-x-3 mb-2 font-mono text-[9px] font-black text-gray-400">
                      <span className="text-[#E23E26]">{art.category}</span>
                      <span>•</span>
                      <span>{art.date}</span>
                    </div>
                    <h3 className="font-syne font-black text-xl text-black uppercase tracking-wide leading-tight mt-1">
                      {art.title}
                    </h3>
                    <p className="text-gray-500 font-display text-xs leading-relaxed mt-3 line-clamp-3">
                      {art.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleReadFull(art)}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    className="self-start mt-6 text-[10px] font-mono font-black border-2 border-black bg-white hover:bg-black hover:text-white px-4 py-2 transition-colors uppercase cursor-pointer"
                  >
                    READ FULL ARTICLE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right curated columns sidebar */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Curator selection notes */}
            <div className="border-2 border-black p-6 bg-[#FFEFE8] space-y-6">
              <h4 className="font-mono text-xs font-black uppercase text-[#E23E26] tracking-widest">CURATOR NOTES</h4>
              <div className="space-y-4">
                {DISPATCH_CARDS.slice(0, 2).map((dc) => (
                  <div key={dc.id} className="flex gap-4 border-b border-black/5 pb-4 last:border-0 last:pb-0 select-none">
                    <img src={dc.image} alt={dc.title} className="w-16 h-16 object-cover border border-black flex-shrink-0" />
                    <div>
                      <p className="text-[#E23E26] font-mono text-[8px] font-black uppercase tracking-widest">{dc.category}</p>
                      <h5 className="font-syne font-bold text-xs uppercase text-black line-clamp-1">{dc.title}</h5>
                      <p className="text-gray-400 text-[10px] line-clamp-2 leading-tight mt-0.5">{dc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Dangerous Subscription banner inside sidebar */}
            <div className="border-3 border-black p-6 bg-[#E2FF00] space-y-4">
              <span className="bg-[#E23E26] text-white font-mono text-[9px] font-black px-2 py-0.5 border border-black uppercase select-none">STANCE ON INBOX</span>
              <h4 className="font-syne font-black text-2xl uppercase tracking-tighter leading-none">STAY DANGEROUS</h4>
              <p className="text-xs text-gray-700 leading-relaxed font-display">
                Subscribe to our premium catalog. No newsletters, just seasonal coordination packets.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="YOUR CORRESPONDENCE EMAIL"
                  className="w-full bg-white border-2 border-black px-3 py-2 text-xs font-mono uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-[#E2FF00] hover:bg-[#E23E26] hover:text-white border-2 border-black text-xs font-mono font-black py-2.5 uppercase tracking-widest transition-colors cursor-pointer"
                >
                  DISPATCH CORRESPONDENCE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

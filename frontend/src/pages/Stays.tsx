/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAppStore } from '../store';
import { MAP_STAYS } from '../data';
import { Home, Calendar as CalendarIcon, Heart, Star, Settings, ChevronLeft, ChevronRight, MapPin, ZoomIn, ZoomOut, Check } from 'lucide-react';

export default function Stays() {
  const { setActivePage, setCursorHovered, filteredDestinations, triggerSearch, setBookingDetails } = useAppStore();
  const [activeTab, setActiveTab] = useState<'pool' | 'spa' | 'michelin' | 'arctic'>('pool');
  const [selectedStayId, setSelectedStayId] = useState('villa-royale');
  
  // Custom styled calendar state
  const calendarDays = [
    { day: 26, premium: false }, { day: 27, premium: false }, { day: 28, premium: false }, { day: 29, premium: false }, { day: 30, premium: false },
    { day: 1, premium: false }, { day: 2, premium: false }, { day: 3, premium: false }, { day: 4, premium: false }, { day: 5, premium: false },
    { day: 6, premium: true }, { day: 7, premium: true }, { day: 8, premium: true }, { day: 9, premium: false }, { day: 10, premium: false },
    { day: 11, premium: false }, { day: 12, premium: false }, { day: 13, premium: false }, { day: 14, premium: false }, { day: 15, premium: false }, { day: 16, premium: false }
  ];

  const handleSelectStay = (stay: any) => {
    setSelectedStayId(stay.id);
    setBookingDetails({
      destinationId: 'amalfi', // Default mock dest
      checkIn: '2026-10-24',
      checkOut: '2026-10-28',
      guests: 2,
    });
    setActivePage('hotel'); // Route to Hotel detail view
  };

  return (
    <div className="bg-[#FDFBF7] text-[#111111] min-h-screen flex flex-col border-b-2 border-black font-sans">
      <div className="flex flex-1 flex-col lg:flex-row">
        
        {/* Rail sidebar on extreme left (vertical menu icons) */}
        <aside className="w-full lg:w-16 bg-white border-b-2 lg:border-b-0 lg:border-r-2 border-black flex lg:flex-col items-center justify-between lg:justify-start py-2 lg:py-8 lg:space-y-8 px-4 lg:px-0">
          <button onClick={() => setActivePage('home')} className="p-2 border-2 border-black bg-[#00F0FF] hover:bg-black hover:text-[#E2FF00] transition-colors neo-shadow-sm cursor-pointer">
            <Home className="w-5 h-5 text-black" />
          </button>
          <button onClick={() => setActivePage('stays')} className="p-2 border-2 border-black bg-[#E2FF00] hover:bg-black hover:text-white transition-colors neo-shadow-sm cursor-pointer">
            <CalendarIcon className="w-5 h-5" />
          </button>
          <button onClick={() => setActivePage('dashboard')} className="p-2 hover:bg-[#E2FF00] border border-transparent hover:border-black transition-all cursor-pointer">
            <Heart className="w-5 h-5" />
          </button>
          <button onClick={() => setActivePage('dispatch')} className="p-2 hover:bg-[#E2FF00] border border-transparent hover:border-black transition-all cursor-pointer">
            <Star className="w-5 h-5" />
          </button>
          <button onClick={() => setActivePage('support')} className="p-2 hover:bg-[#E2FF00] border border-transparent hover:border-black transition-all cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
        </aside>

        {/* Outer list panel block */}
        <div className="w-full lg:w-5/12 bg-[#FDFBF7] p-6 lg:p-8 overflow-y-auto max-h-[85vh] space-y-6">
          <div className="space-y-1">
            <h1 className="font-syne font-normal text-4xl lg:text-5.5.xl leading-none text-black">
              discover <br />
              <span className="font-syne font-black uppercase text-[#E23E26]">excellence</span>
            </h1>
            <p className="text-gray-500 font-display text-xs">
              Luxury stays curated for the world's most discerning travelers.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 pb-4">
            {[
              { id: 'pool', label: '🏊 Pool' },
              { id: 'spa', label: '✨ Spa' },
              { id: 'michelin', label: '🍴 Michelin Star' },
              { id: 'arctic', label: '❄️ Arctic Views' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 border-2 border-black font-mono text-xs font-black tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#00F0FF] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Luxury listings */}
          <div className="space-y-6">
            {MAP_STAYS.map((stay) => {
              const isSelected = selectedStayId === stay.id;
              return (
                <div
                  key={stay.id}
                  onClick={() => setSelectedStayId(stay.id)}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className={`border-2 border-black p-4 bg-white neo-shadow flex gap-5 cursor-pointer hover:border-[#E23E26] transition-all ${
                    isSelected ? 'ring-2 ring-[#E2FF00]' : ''
                  }`}
                >
                  <div className="relative w-36 h-28 flex-shrink-0 overflow-hidden border border-black">
                    <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
                    <span className="absolute top-1.5 left-1.5 bg-[#00F0FF]/90 text-black text-[9px] font-mono font-bold px-1.5 py-0.5 border border-black">
                      {stay.tag}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="bg-[#E2FF00] text-black text-[8px] font-mono font-black border border-black px-1.5 py-0.5 uppercase">
                          {stay.location}
                        </span>
                        <div className="flex items-center text-xs text-[#FF5A00] font-bold">
                          <Star className="w-3 h-3 fill-current mr-0.5" />
                          <span>{stay.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-syne font-black text-sm uppercase mt-1 leading-tight">{stay.name}</h4>
                      <p className="text-gray-400 text-[10px] font-display mt-1 leading-tight line-clamp-2">{stay.description}</p>
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div>
                        <p className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-none">STARTS AT</p>
                        <p className="font-mono text-sm font-black text-black">
                          ${stay.price.toLocaleString()}<span className="text-[10px] text-gray-500 font-bold">/night</span>
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStay(stay);
                        }}
                        className="bg-black hover:bg-[#E23E26] text-white font-mono text-[9px] font-black tracking-widest px-3.5 py-2 border-2 border-black uppercase cursor-pointer"
                      >
                        DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive map layout */}
        <div className="w-full lg:w-7/12 border-t-2 lg:border-t-0 lg:border-l-2 border-black relative bg-[#E1DFD6] h-[35vh] lg:h-auto min-h-[500px]">
          {/* Vector Map Canvas mock container */}
          <div className="absolute inset-0 bg-[#E8E6DD] bg-[radial-gradient(#C6C3B9_1px,transparent_1px)] [background-size:16px_16px] flex flex-col justify-between p-6">
            
            {/* Map Top Action Rail */}
            <div className="flex justify-between items-center z-10 w-full">
              <span className="bg-[#FDFBF7] border-2 border-black px-3 py-1 font-mono text-xs uppercase font-bold tracking-wider rounded-none flex items-center select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <MapPin className="w-4 h-4 text-[#E23E26] mr-1.5" />
                GPS SAT LIVE TRACKING ON
              </span>
              <div className="flex space-x-2">
                <button className="p-2 border-2 border-black bg-white hover:bg-[#E2FF00] cursor-pointer">
                  <ZoomIn className="w-4 h-4 text-black" />
                </button>
                <button className="p-2 border-2 border-black bg-white hover:bg-[#E2FF00] cursor-pointer">
                  <ZoomOut className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            {/* Bubble Pins placements */}
            <div className="relative flex-grow">
              {MAP_STAYS.map((stay) => {
                const isSelected = selectedStayId === stay.id;
                return (
                  <button
                    key={stay.id}
                    onClick={() => setSelectedStayId(stay.id)}
                    className="absolute border-2 border-black px-4 py-2 font-mono text-xs font-black select-none transition-all hover:scale-105 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    style={{
                      left: `${stay.coordinates.x}%`,
                      top: `${stay.coordinates.y}%`,
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: isSelected ? '#E23E26' : '#111111',
                      color: isSelected ? '#E2FF00' : '#FDFBF7',
                    }}
                  >
                    ${stay.price.toLocaleString()}
                  </button>
                );
              })}
            </div>

            {/* Calendar Selector Box Floating Bottom-Right on Map */}
            <div className="absolute right-6 bottom-6 w-64 bg-white border-3 border-black p-4 neo-shadow z-20 font-sans">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs font-black text-black">SEPTEMBER 2024</span>
                <div className="flex space-x-1">
                  <button className="p-1 border border-black text-black font-extrabold hover:bg-gray-100">
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <button className="p-1 border border-black text-black font-extrabold hover:bg-gray-100">
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Days header list */}
              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-gray-400 font-extrabold tracking-wider border-b pb-1 mb-1.5 select-none">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>

              {/* Grid block */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono select-none">
                {calendarDays.map((d, index) => (
                  <div
                    key={index}
                    className={`p-1 font-bold ${
                      d.premium
                        ? 'bg-[#E2FF00]/40 text-black border border-[#E2FF00]'
                        : d.day === 6 || d.day === 7 || d.day === 8
                        ? 'bg-[#00F0FF]/30 text-black border border-[#00F0FF]'
                        : 'text-gray-500'
                    }`}
                  >
                    {d.day}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 mt-3 flex items-center justify-between text-[10px] font-mono leading-none">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-[#E2FF00]/40 border border-[#E2FF00]" />
                  <span className="text-gray-600 font-semibold uppercase">Premium Availability</span>
                </div>
                <button 
                  onClick={() => setActivePage('checkout')}
                  className="font-black text-[#E23E26] underline uppercase hover:text-black cursor-pointer"
                >
                  Update Dates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

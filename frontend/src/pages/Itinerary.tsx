/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAppStore } from '../store';
import { ITINERARY_STEPS, IMAGES } from '../data';
import { Calendar, User, Check, Plus, Minus, ArrowRight } from 'lucide-react';

export default function Itinerary() {
  const { setActivePage, setCursorHovered, currentBooking, setBookingDetails } = useAppStore();
  const [guestsCount, setGuestsCount] = useState(2);
  const [prefDate, setPrefDate] = useState('2026-10-12');

  const inclusions = [
    "Private Jet Charter Transfers",
    "5-Star Suite (Sea View Guaranteed)",
    "24/7 Dedicated Concierge",
    "All Michelin-Starred Dining"
  ];

  const handleSecureSeat = () => {
    // 12500 per person
    const subtotal = 12500 * guestsCount;
    const tax = Math.round(subtotal * 0.12);
    const total = subtotal + tax;

    setBookingDetails({
      destinationId: 'amalfi',
      guests: guestsCount,
      checkIn: prefDate,
      subtotal,
      tax,
      total
    });

    setActivePage('checkout'); // Redirect to Checkout screen
  };

  const incrementGuests = () => {
    setGuestsCount(prev => prev + 1);
  };

  const decrementGuests = () => {
    if (guestsCount > 1) {
      setGuestsCount(prev => prev - 1);
    }
  };

  return (
    <div className="bg-[#FDFBF7] text-[#111111] overflow-x-hidden min-h-screen">
      {/* 1. HERO HEADER */}
      <section 
        className="relative h-[55vh] w-full bg-cover bg-center flex flex-col justify-end p-8 md:p-16 border-b-4 border-black"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${IMAGES.itineraryHero})` }}
      >
        <div className="max-w-4xl space-y-3 z-10">
          <span className="bg-[#FF0066] text-white font-mono font-black text-xs uppercase tracking-widest px-3.5 py-1 border border-black inline-block">
            ULTRA-LUXE ESCAPE
          </span>
          <h1 className="text-white font-syne font-black text-4xl md:text-7xl leading-none uppercase tracking-tight">
            THE AMALFI <br />COAST ODYSSEY
          </h1>
          <p className="text-gray-200 font-display text-xs md:text-sm max-w-xl font-medium leading-relaxed">
            7 Days of uncompromising luxury. Private yacht transfers, Michelin-starred cliffside dining, and exclusive access to the hidden grottoes of Positano.
          </p>
        </div>
      </section>

      {/* 2. ITINERARY & BOOKINGS AREA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left column: Steps Timeline */}
        <div className="lg:col-span-7 space-y-12">
          <h2 className="font-syne font-black text-4xl uppercase tracking-tighter border-b-3 border-black pb-4">
            THE ITINERARY
          </h2>

          <div className="space-y-12 relative border-l-2 border-black pl-8 ml-4">
            {ITINERARY_STEPS.map((step) => (
              <div key={step.step} className="relative space-y-4">
                {/* Number Circle attached to line */}
                <div className="absolute -left-[45px] top-0 bg-[#FF0066] text-white font-mono font-black text-xs w-8 h-8 rounded-full flex items-center justify-center border-2 border-black">
                  {step.step}
                </div>

                <div className="space-y-4">
                  <h3 className="font-syne font-black text-xl uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 font-display text-xs leading-relaxed">
                    {step.description}
                  </p>
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-64 object-cover border-2 border-black neo-shadow" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Forms and Inclusions */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Total investment details */}
          <div className="bg-white border-3 border-black neo-shadow p-6 space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">TOTAL INVESTMENT</p>
              <div className="flex items-baseline space-x-1.5 mt-1">
                <span className="font-syne font-black text-3.5xl">$12,500</span>
                <span className="font-mono text-xs text-gray-500 font-bold">/ person</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase font-black tracking-widest text-[#FF0066]">ELITE INCLUSIONS</h4>
              <ul className="space-y-2.5">
                {inclusions.map((inc) => (
                  <li key={inc} className="flex items-center space-x-2 text-xs font-semibold font-display">
                    <div className="bg-[#FF0066]/10 p-1 border border-[#FF0066] text-[#FF0066]">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Secure seat booking form card */}
          <div className="bg-[#111111] text-[#FDFBF7] border-3 border-black neo-shadow-lg p-6 space-y-6">
            <h3 className="font-syne font-black text-xl uppercase text-white tracking-wide">
              SECURE YOUR SEAT
            </h3>

            {/* Preferred date selector */}
            <div className="space-y-2">
              <label className="block font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                PREFERRED DATE
              </label>
              <input
                type="date"
                value={prefDate}
                onChange={(e) => setPrefDate(e.target.value)}
                className="w-full bg-white text-black border-2 border-black px-3 py-2 text-xs font-mono font-bold uppercase focus:bg-[#E2FF00] focus:outline-none"
              />
            </div>

            {/* Traveler count stepper */}
            <div className="space-y-2">
              <label className="block font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                TRAVELERS
              </label>
              <div className="flex items-center justify-between border-2 border-black bg-white text-black p-1">
                <button
                  onClick={decrementGuests}
                  className="w-8 h-8 rounded-full border border-black hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <Minus className="w-4 h-4 text-black font-bold" />
                </button>
                <span className="font-mono font-black text-sm">{guestsCount}</span>
                <button
                  onClick={incrementGuests}
                  className="w-8 h-8 rounded-full border border-black hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-black font-bold" />
                </button>
              </div>
            </div>

            {/* Big booking CTA */}
            <button
              onClick={handleSecureSeat}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="w-full bg-[#FF0066] hover:bg-white hover:text-black py-3.5 border-2 border-black font-mono font-black tracking-widest text-xs uppercase transition-colors"
            >
              SECURE MY SEAT
            </button>
            <p className="text-center font-mono text-[9px] text-gray-400 font-bold">Limited to 8 Guests per journey.</p>
          </div>
        </div>
      </section>

      {/* 3. GALLERY SECTION GRID */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#FFF0E8] border-t-2 border-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="font-syne font-black text-4xl uppercase tracking-tighter">
            GALLERY
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border-2 border-black neo-shadow overflow-hidden bg-white">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" alt="Gallery 1" className="w-full h-64 object-cover" />
            </div>
            <div className="border-2 border-black neo-shadow overflow-hidden bg-white">
              <img src="https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=400&q=80" alt="Gallery 2" className="w-full h-64 object-cover" />
            </div>
            <div className="border-2 border-black neo-shadow overflow-hidden bg-white">
              <img src="https://images.unsplash.com/photo-1595113316349-9df4eb240176?auto=format&fit=crop&w=400&q=80" alt="Gallery 3" className="w-full h-64 object-cover" />
            </div>
            <div className="border-2 border-black neo-shadow overflow-hidden bg-white">
              <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80" alt="Gallery 4" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

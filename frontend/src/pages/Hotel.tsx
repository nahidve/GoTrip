/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAppStore } from '../store';
import { HOTEL_SUITES, IMAGES, AMENITIES } from '../data';
import { Sparkles, Waves, Dumbbell, UtensilsCrossed, Calendar, User, Check, ShieldAlert } from 'lucide-react';

export default function Hotel() {
  const { setActivePage, setCursorHovered, selectedSuite, setSelectedSuite, currentBooking, setBookingDetails } = useAppStore();
  const [lclGuests, setLclGuests] = useState('2 Guests, 0 Children');
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const amenitiesIcons: any = {
    Waves: Waves,
    Sparkles: Sparkles,
    UtensilsCrossed: UtensilsCrossed,
    Dumbbell: Dumbbell
  };

  const handleSelectSuite = (suite: any) => {
    setSelectedSuite(suite);
    // Calculated details
    const nights = 4;
    const subtotal = suite.price * nights;
    const tax = Math.round(subtotal * 0.12);
    const total = subtotal + tax;

    setBookingDetails({
      destinationId: 'amalfi',
      suiteId: suite.id,
      subtotal,
      tax,
      total
    });
  };

  const handleConfirmReservation = () => {
    setActivePage('checkout'); // Redirect to Checkout billing
  };

  return (
    <div className="bg-[#FDFBF7] text-[#111111] min-h-screen font-sans">
      {/* 1. BRAND HERO IMAGE */}
      <section 
        className="relative h-[65vh] w-full bg-cover bg-center flex flex-col justify-end p-8 md:p-16 border-b-4 border-black"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${IMAGES.monolithResort})` }}
      >
        <div className="max-w-4xl space-y-3 z-10">
          <span className="bg-[#E2FF00] text-black font-mono font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-black inline-block">
            LUXURY COLLECTION
          </span>
          <h1 className="text-white font-syne font-black text-5xl md:text-8xl leading-none uppercase tracking-tight">
            AZURE MONOLITH <br />RESORT
          </h1>
        </div>

        {/* Carousel indicator lines at bottom right */}
        <div className="absolute right-8 md:right-16 bottom-8 md:bottom-16 flex space-x-2 select-none">
          <div className="w-12 h-1 bg-[#E2FF00]" />
          <div className="w-12 h-1 bg-white/40" />
          <div className="w-12 h-1 bg-white/40" />
        </div>
      </section>

      {/* 2. SIGNATURE AMENITIES CONTAINER */}
      <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto space-y-8">
        <div>
          <span className="bg-[#00F0FF] text-black text-sm px-2.5 py-1 border border-black font-semibold uppercase mr-3"></span>
          <h2 className="font-syne font-black text-2.5xl md:text-3.5xl uppercase tracking-wide inline-block mt-1">
            Signature Amenities
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES.map((amn) => {
            const IconComponent = amenitiesIcons[amn.icon];
            return (
              <div key={amn.id} className="border-2 border-black p-5 bg-white neo-shadow flex flex-col items-start space-y-4">
                <div className="p-3 bg-[#0F0F0F]/5 border border-black text-[#E23E26]">
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase font-black tracking-wider text-black">{amn.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold font-mono mt-1 uppercase">PREMIUM INCLUDED</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <hr className="border-t border-gray-300 max-w-7xl mx-auto" />

      {/* 3. SUITES SELECTOR & FORM TOTALS */}
      <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left side: Suites details */}
        <div className="lg:col-span-7 space-y-12">
          <h2 className="font-syne font-black text-4xl uppercase tracking-tighter">
            Select Your Suite
          </h2>

          <div className="space-y-12">
            {HOTEL_SUITES.map((suite) => {
              const isSelected = selectedSuite?.id === suite.id;
              return (
                <div 
                  key={suite.id}
                  onClick={() => handleSelectSuite(suite)}
                  className={`border-3 border-black bg-white neo-shadow flex flex-col md:flex-row overflow-hidden hover:border-[#E23E26] cursor-pointer transition-all ${
                    isSelected ? 'ring-3 ring-[#00F0FF]' : ''
                  }`}
                >
                  <img src={suite.image} alt={suite.name} className="w-full md:w-56 h-auto object-cover border-b-2 md:border-b-0 md:border-r-2 border-black" />
                  
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-syne font-black text-lg text-black uppercase tracking-wide">{suite.name}</h3>
                        <span className={`text-white font-mono text-[9px] font-black px-2.5 py-1 border border-black ${
                          suite.tagColor === 'red' ? 'bg-[#E23E26]' : 'bg-[#00F0FF] text-black'
                        }`}>
                          {suite.tag}
                        </span>
                      </div>
                      <p className="text-gray-500 font-display text-xs leading-relaxed mt-2.5 mb-4">
                        {suite.description}
                      </p>
                      {/* Bullet attributes */}
                      <ul className="space-y-1 font-mono text-[10px] text-gray-600 font-bold mb-4">
                        {suite.amenities.map((a) => (
                          <li key={a} className="flex items-center space-x-1.5 uppercase">
                            <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[9px] text-[#222222] font-black uppercase tracking-widest">${suite.price.toLocaleString()} / night</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectSuite(suite);
                        }}
                        className={`font-mono text-[10px] font-black tracking-widest px-4 py-2 border-2 border-black uppercase cursor-pointer ${
                          isSelected ? 'bg-[#00F0FF] text-black' : 'bg-white hover:bg-black hover:text-white'
                        }`}
                      >
                        {isSelected ? 'SELECTED Suite' : 'RESERVE'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Summary Reservation Card Form */}
        <div className="lg:col-span-5 bg-white border-3 border-black p-6 md:p-8 neo-shadow-lg self-start space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="font-syne font-black text-2xl uppercase tracking-wide">
              Booking Details
            </h3>
            <p className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Guaranteed Best Rate</p>
          </div>

          {/* Checkout dates grids */}
          <div className="grid grid-cols-2 gap-4 border-2 border-black bg-white select-none">
            <div className="p-3 border-r-2 border-black">
              <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest">ARRIVE</span>
              <p className="font-mono text-sm font-black text-black uppercase mt-1">Oct 24, 2026</p>
            </div>
            <div className="p-3">
              <span className="font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest">DEPART</span>
              <p className="font-mono text-sm font-black text-black uppercase mt-1">Oct 28, 2026</p>
            </div>
          </div>

          {/* GUESTS DROPDOWN */}
          <div className="space-y-1 relative">
            <label className="block font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest">GUESTS</label>
            <button
              onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
              className="w-full flex items-center justify-between border-2 border-black bg-white px-3 py-2 text-xs font-mono font-bold uppercase cursor-pointer text-left focus:outline-none"
            >
              <span>{lclGuests}</span>
              <span className="text-gray-400">▼</span>
            </button>
            {showGuestsDropdown && (
              <div className="absolute top-full left-0 right-0 border-2 border-black bg-white text-xs font-mono font-bold uppercase z-30 divide-y divide-gray-100 select-none">
                {['1 Adult, 0 Children', '2 Adults, 0 Children', '2 Adults, 1 Child', '3 Adults, 0 Children'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setLclGuests(option);
                      setShowGuestsDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2.5 hover:bg-[#E2FF00] transition-colors cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Line separator */}
          <hr className="border-t border-gray-100" />

          {/* Expense pricing summary panel */}
          <div className="bg-[#FFF5F1] border-2 border-black p-4 space-y-3 font-mono text-xs select-none">
            <div className="flex justify-between font-medium">
              <span>Subtotal (4 Nights)</span>
              <span className="font-bold">${currentBooking.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-500">
              <span>Luxury Tax (12%)</span>
              <span className="font-bold">${currentBooking.tax.toLocaleString()}</span>
            </div>
            <div className="border-t border-black/10 pt-2.5 flex justify-between font-black text-sm text-[#E23E26]">
              <span>TOTAL</span>
              <span>${currentBooking.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Reservation core confirmation */}
          <button
            onClick={handleConfirmReservation}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            className="w-full py-4 bg-[#FF5A00] hover:bg-black text-white font-mono font-black tracking-widest text-xs uppercase border-2 border-black transition-colors"
          >
            CONFIRM RESERVATION
          </button>
          <div className="flex items-center justify-center space-x-1.5 text-[9px] font-mono font-semibold text-gray-400">
            <ShieldAlert className="w-3.5 h-3.5 text-[#E23E26]" />
            <span className="uppercase">Free cancellation until 48h before arrival</span>
          </div>
        </div>
      </section>
    </div>
  );
}

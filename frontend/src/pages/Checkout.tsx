/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppStore } from '../store';
import { IMAGES } from '../data';
import { CreditCard, Wallet, Smartphone, ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { setActivePage, setCursorHovered, currentBooking, confirmBooking } = useAppStore();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'crypto'>('card');
  const [cardName, setCardName] = useState('ALEXANDER VOGUE');
  const [cardNumber, setCardNumber] = useState('4242  4242  4242  4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('242');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic values or exact image fallback values
  const displaySubtotal = currentBooking.subtotal;
  const displayTax = currentBooking.tax;
  const displayTotal = currentBooking.total;

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confirmBooking();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center font-sans">
        <div className="max-w-md w-full border-3 border-black bg-white p-8 neo-shadow-lg text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-[#E2FF00]/20 border-2 border-black flex items-center justify-center text-[#E23E26]">
            <CheckCircle2 className="w-10 h-10 stroke-2" />
          </div>
          <div className="space-y-2">
            <span className="bg-[#E2FF00] text-black font-mono text-[9px] font-black tracking-widest px-2.5 py-1 border border-black uppercase">BOOKING CONFIRMED</span>
            <h2 className="font-syne font-black text-2.5xl uppercase text-black pt-2">YOUR JOURNEY AWAITS</h2>
            <p className="text-xs text-gray-500 font-display leading-relaxed">
              Congratulations! Your elite travel suite and bespoke itinerary are officially secured. Welcome to the GoTrip inner circle. Detailed credentials have been dispatched to your email.
            </p>
          </div>

          <div className="bg-gray-50 border border-black p-4 text-left space-y-2 select-none">
            <p className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">TRANSACTION REFERENCE</p>
            <p className="font-mono text-xs font-black text-black">REF-77192-X90</p>
            <p className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">ESTIMATED POINTS EARNED</p>
            <p className="font-mono text-xs font-black text-[#E23E26]">+{Math.round(displayTotal / 10).toLocaleString()} PTS</p>
          </div>

          <button
            onClick={() => setActivePage('dashboard')}
            className="w-full bg-[#111111] hover:bg-[#E23E26] text-white py-3 border-2 border-black font-mono text-xs font-black tracking-widest uppercase transition-colors uppercase cursor-pointer"
          >
            VIEW DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] text-[#111111] min-h-screen font-sans">
      
      {/* 1. PROGRESS BAR STRIP */}
      <section className="bg-white border-b-2 border-black py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex select-none">
          <div className="flex-1 text-center font-mono text-[10px] font-black uppercase tracking-wider text-gray-400 py-2 border-r border-gray-100 uppercase">
            01 / SELECTION
          </div>
          <div className="flex-2 text-center font-mono text-xs font-black uppercase tracking-widest bg-[#E23E26] text-white py-2 border-x-2 border-black px-4 uppercase">
            02 / PAYMENT METHOD ACTIVE
          </div>
          <div className="flex-1 text-center font-mono text-[10px] font-black uppercase tracking-wider text-gray-400 py-2 uppercase">
            03 / CONFIRMATION
          </div>
        </div>
      </section>

      {/* 2. CHECKOUT FIELDS VIEW */}
      <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Checkout input fields */}
        <div className="lg:col-span-7 bg-white border-3 border-black p-6 md:p-8 neo-shadow space-y-8">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-4">
            <ShieldCheck className="w-5 h-5 text-[#E23E26]" />
            <h2 className="font-syne font-black text-xl uppercase tracking-wide">SECURE PAYMENT</h2>
          </div>

          {/* Selector Tabs: Card, Wallet, Crypto */}
          <div className="grid grid-cols-3 gap-3 select-none">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border-2 border-black flex flex-col items-center space-y-2 bg-white text-black font-mono text-[10px] font-black uppercase cursor-pointer ${
                paymentMethod === 'card' ? 'bg-[#00F0FF]/25 ring-2 ring-[#00F0FF]' : 'hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-5 h-5 text-black" />
              <span>CARD</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('wallet')}
              className={`p-4 border-2 border-black flex flex-col items-center space-y-2 bg-white text-black font-mono text-[10px] font-black uppercase cursor-pointer ${
                paymentMethod === 'wallet' ? 'bg-[#00F0FF]/25 ring-2 ring-[#00F0FF]' : 'hover:bg-gray-50'
              }`}
            >
              <Wallet className="w-5 h-5 text-black" />
              <span>WALLET</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('crypto')}
              className={`p-4 border-2 border-black flex flex-col items-center space-y-2 bg-white text-black font-mono text-[10px] font-black uppercase cursor-pointer ${
                paymentMethod === 'crypto' ? 'bg-[#00F0FF]/25 ring-2 ring-[#00F0FF]' : 'hover:bg-gray-50'
              }`}
            >
              <Smartphone className="w-5 h-5 text-black" />
              <span>CRYPTO</span>
            </button>
          </div>

          {/* Core Checkout Forms */}
          <form onSubmit={handlePaySubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest">CARDHOLDER NAME</label>
              <input
                type="text"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="w-full border-2 border-black px-4 py-2.5 text-xs font-mono font-bold uppercase focus:outline-none focus:bg-[#E2FF00]"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest">CARD NUMBER</label>
              <input
                type="text"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border-2 border-black px-4 py-2.5 text-xs font-mono font-bold uppercase focus:outline-none focus:bg-[#E2FF00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest">EXPIRY DATE</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full border-2 border-black px-4 py-2.5 text-xs font-mono font-bold uppercase focus:outline-none focus:bg-[#E2FF00]"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest">CVV</label>
                <input
                  type="text"
                  required
                  placeholder="***"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="w-full border-2 border-black px-4 py-2.5 text-xs font-mono font-bold uppercase focus:outline-none focus:bg-[#E2FF00]"
                />
              </div>
            </div>

            {/* Pay Button Core action */}
            <button
              type="submit"
              disabled={isProcessing}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="w-full bg-[#E23E26] hover:bg-black text-white py-4 border-2 border-black font-mono font-black tracking-widest text-xs lg:text-sm uppercase transition-colors cursor-pointer select-none"
            >
              {isProcessing ? 'PROCESSING TRANSACTION...' : `CONFIRM & PAY $${displayTotal.toLocaleString()}.00`}
            </button>
          </form>
        </div>

        {/* Right Column: Pricing package summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-black p-6 neo-shadow space-y-6">
            <div className="h-60 bg-cover bg-center border border-black relative" style={{ backgroundImage: `url(${IMAGES.securePaymentBanner})` }}>
              <span className="absolute top-4 right-4 bg-[#E2FF00] text-black font-mono font-black text-[9px] px-2 py-0.5 border border-black select-none tracking-widest">
                LUXURY TIER
              </span>
            </div>

            <div className="space-y-2 select-none">
              <p className="font-mono text-[9px] text-[#E23E26] font-black uppercase tracking-widest">PRIVATE RETREAT</p>
              <h3 className="font-syne font-black text-xl text-black uppercase tracking-wide leading-none">AMALFI COAST EXPEDITION</h3>
              <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-3 mt-3 font-mono text-[10px]">
                <div>
                  <p className="text-gray-400 font-bold uppercase">CHECK-IN</p>
                  <p className="font-black text-black">OCT 12, 2026</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase">GUESTS</p>
                  <p className="font-black text-black">2 ADULTS</p>
                </div>
              </div>
            </div>

            <hr className="border-t border-dashed border-gray-300" />

            {/* Calculations breakdown to resemble screenshots exactly */}
            <div className="space-y-3 font-mono text-xs select-none">
              <div className="flex justify-between text-gray-500">
                <span>4 Nights @ $850</span>
                <span className="font-bold">${displaySubtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Private Concierge Fee</span>
                <span className="font-bold">$550.00</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>VIP Airport Transfer</span>
                <span className="font-bold">$340.00</span>
              </div>
              <div className="border-t-2 border-black border-dashed pt-3 flex justify-between font-black text-sm text-[#E23E26]">
                <span>TOTAL</span>
                <span>${(displayTotal + 550 + 340).toLocaleString()}.00</span>
              </div>
            </div>
          </div>

          {/* Safe insurance box */}
          <div className="bg-[#FFEFE8] border border-black p-4 select-none flex space-x-3 items-start">
            <ShieldCheck className="w-6 h-6 text-[#E23E26] flex-shrink-0 mt-0.5" />
            <div className="font-mono text-[9px] leading-tight font-semibold text-gray-600">
              <span className="font-black text-black block mb-1">YOUR BOOKING IS LOCKED BY GOTRIP ELITE PROTECTION.</span>
              FREE CANCELLATION UP TO 40 HOURS PRIOR TO ACCORD ARRIVAL TO DESTINATION AREA.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

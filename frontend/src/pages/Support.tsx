/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { useAppStore } from '../store';
import { HelpCircle, PhoneCall, Radio, Send, ShieldAlert, Check } from 'lucide-react';

export default function Support() {
  const { setCursorHovered } = useAppStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    {
      q: "How do I book a private jet integration with my resort?",
      a: "Private jet coordination is managed exclusively by your designated desk attaché (e.g., Julian). Simply submit your flight details or coordinate coordinates inside the advisor module on your dashboard, and certified aircraft drafts will be compiled in 2 hours."
    },
    {
      q: "What is the GoTrip Elite Insurance coverage policy?",
      a: "All bookings include comprehensive cancellation, medical offset, and luggage delivery protection. Cancellation is entirely free with 100% refund up to 48 hours prior to arrival."
    },
    {
      q: "Can I settle payments with cryptocurrency?",
      a: "Yes. Our checkout terminal supports secure Web3 wallet bindings for direct USDT, USDC, BTC, and ETH settlements relative to absolute real-time spot rates."
    },
    {
      q: "Is there an elite membership threshold?",
      a: "Yes. GoTrip's Elite Status tier is capped at precisely 1,000 global members to guarantee 24/7 designated speedboats, private chefs, and helicopter crew readiness."
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
    }, 3000);
  };

  return (
    <div className="bg-[#FDFBF7] text-[#111111] overflow-x-hidden min-h-screen font-sans">
      {/* 1. HERO CONCIERGE DESK HEADER */}
      <section className="bg-[#FFEFE8] border-b-4 border-black py-20 px-6 md:px-12 text-center text-black">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-[#E23E26] text-white font-mono font-black text-xs uppercase px-3 py-1 border border-black inline-block tracking-wider">
            24/7 HELPDESK
          </span>
          <h1 className="font-syne font-black text-4xl md:text-6xl tracking-tighter leading-none uppercase">
            THE CONCIERGE <br />
            <span className="font-black italic text-[#E23E26]">HELPDESK</span>
          </h1>
          <p className="text-gray-600 font-display font-medium text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Welcome to our elite dispatch desk. From flight alterations to custom yacht dockings, our operators stand ready to execute.
          </p>
        </div>
      </section>

      {/* 2. FAQS & EMERGENCY BOX SPLIT GRID */}
      <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: FAQ list accordions */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="font-syne font-black text-3.5xl uppercase text-black tracking-tight border-b-3 border-black pb-4">
            FREQUENT QUERIES
          </h2>

          <div className="space-y-4 select-none">
            {faqs.map((f, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-2 border-black bg-white neo-shadow">
                  {/* Question header */}
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 font-syne font-black text-base uppercase tracking-wide flex justify-between items-center bg-white hover:bg-[#E2FF00]/15 cursor-pointer focus:outline-none"
                  >
                    <span>{f.q}</span>
                    <span className="text-xl">{isOpen ? '−' : '+'}</span>
                  </button>

                  {/* Answer slide */}
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-gray-100 text-xs font-display text-gray-500 leading-relaxed bg-[#FDFBF7]">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Direct emergency operators desk */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Emergency coordinates cards */}
          <div className="bg-[#111111] text-white border-3 border-black p-6 md:p-8 neo-shadow-lg space-y-6">
            <div className="flex items-center space-x-3 text-red-500 font-mono text-xs font-black select-none border-b border-gray-800 pb-4">
              <Radio className="w-5 h-5 text-[#E23E26] animate-pulse" />
              <span className="uppercase text-[#E2FF00]">24/7 DOCKING & FLIGHT COORDINATOR LINE</span>
            </div>

            <div className="space-y-4 font-mono text-xs select-none">
              <div className="flex justify-between border-b border-gray-800 pb-2.5">
                <span className="text-gray-400">🚨 ZÜRICH HQ DESK</span>
                <span className="font-black hover:text-[#E2FF00]">+41 44 221 1133</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2.5">
                <span className="text-gray-400">🚨 LONDON FLIGHT HELPDESK</span>
                <span className="font-black hover:text-[#E2FF00]">+44 20 7946 0958</span>
              </div>
              <div className="flex justify-between pb-2.5">
                <span className="text-gray-400">🚨 BERLIN DOCKING DESK</span>
                <span className="font-black hover:text-[#E2FF00]">+49 30 119 2200</span>
              </div>
            </div>
          </div>

          {/* Direct ticket formulation */}
          <div className="bg-white border-3 border-black p-6 md:p-8 neo-shadow-sm space-y-6">
            <h3 className="font-syne font-black text-xl text-black uppercase tracking-wide">
              DISPATCH AN EMERGENCY DESK SIGNAL
            </h3>

            {ticketSubmitted ? (
              <div className="bg-[#00F0FF]/15 border border-black p-5 text-center text-xs font-mono font-bold uppercase space-y-2 select-none">
                <Check className="w-6 h-6 text-[#E23E26] mx-auto" />
                <p>SIGNAL DISPATCHED SUCCESSFULLY</p>
                <p className="text-[10px] text-gray-500">Julian has prioritize queue.</p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest">SIGNAL SUBJECT</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Riva yacht schedule adjustment"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full border-2 border-black px-3.5 py-2 text-xs font-mono font-bold uppercase focus:outline-none focus:bg-[#E2FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[8px] text-gray-400 font-bold uppercase tracking-widest">SIGNAL CONTENT DETAILED</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Explain your precise request coordinate..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full border-2 border-black px-3.5 py-2 text-xs font-mono font-bold uppercase focus:outline-none focus:bg-[#E2FF00]"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="w-full bg-black text-[#E2FF00] hover:bg-[#E23E26] hover:text-white border-2 border-black py-2.5 font-mono text-xs font-black uppercase tracking-widest cursor-pointer"
                >
                  DISPATCH SIGNAL
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

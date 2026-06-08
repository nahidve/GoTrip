/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppStore } from '../store';
import { IMAGES } from '../data';
import { Award, Calendar, Heart, Shield, MessageSquare, Send, CheckCircle2, Ticket } from 'lucide-react';

const MEMBERSHIP_BENEFITS = [
  { title: "PRIVATE JET SECURED ACCESS", description: "Priority access to standard long-range aircraft." },
  { title: "24/7 JULIAN CONCIERGE ATTACHÉ", description: "Direct dedicated human operator dispatch support." },
  { title: "GUARANTEED RESORT SEA UPGRADES", description: "Automatic upgrade keys on all luxury suites." },
  { title: "EXCLUSIVE OUT-OF-CATALOG COORDINATES", description: "Unpublished coordinates and restricted island pickups." }
];

export default function Dashboard() {
  const { setActivePage, setCursorHovered, user, pastBookings } = useAppStore();
  const [activeTab, setActiveTab ] = useState<'journeys' | 'benefits'>('journeys');
  
  // julian chat interaction states
  const [messages, setMessages] = useState([
    { sender: 'julian', text: "Welcome back, Alexander V. I am Julian, your elite travel concierge advisor. Your upcoming Amalfi Coast Odyssey itinerary is fully optimized. Would you like me to reserve a private beach club spot in Positano for October 13?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMsgs);
    setUserInput('');
    setIsTyping(true);

    // AI Concierge responses simulations to feel incredibly realistic and responsive
    setTimeout(() => {
      let reply = "Affirmative. I will immediately synchronize this request with your dedicated local Amalfi skipper coordinates. I'm finalizing your priority yacht dockings.";
      if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
        reply = `Hello Alexander, I am Julian, your 24/7 designated GoTrip attaché. How may I customize your luxury flight transfers or beach access points today?`;
      } else if (userInput.toLowerCase().includes('beach') || userInput.toLowerCase().includes('club')) {
        reply = `Securing the VIP front row sun loungers at Conca del Sogno on October 13 has been added to your profile ledger. Your priority reservation number is dispatch-active.`;
      } else if (userInput.toLowerCase().includes('jet') || userInput.toLowerCase().includes('flight')) {
        reply = `Acknowledged. I am coordinating with our Berlin charter team to guarantee absolute cabin customization for flight GT-881. Exquisite vintage refreshments are queued.`;
      }

      setMessages((prev) => [...prev, { sender: 'julian', text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-[#FDFBF7] text-[#111111] overflow-x-hidden min-h-screen font-sans">
      
      {/* 1. HERO PROFILE STATUS BOARD */}
      <section className="bg-black text-[#FDFBF7] py-16 px-6 md:px-12 lg:px-24 border-b-4 border-black relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <span className="bg-[#E2FF00] text-black font-mono font-black text-[10px] uppercase tracking-widest px-3 py-1 border border-black inline-block">
              {user.tier} STATUS ACTIVE
            </span>
            <h1 className="font-syne font-black text-3xl md:text-5.5xl leading-none uppercase">
              WELCOME BACK, <br />
              <span className="text-[#E2FF00] italic font-black">{user.name}</span>
            </h1>
            <p className="text-gray-400 font-mono text-[9px] tracking-widest uppercase font-bold">VIP ID: GT-8821-X</p>
          </div>

          <div className="bg-[#111111] border-2 border-[#E2FF00] p-6 neo-shadow text-right select-none md:self-end">
            <p className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">ELITE ACCOUNT BALANCE</p>
            <p className="font-syne font-black text-3.5xl text-[#E2FF00]">{user.points.toLocaleString()} PTS</p>
            <p className="font-mono text-[9px] text-[#00F0FF] font-semibold uppercase mt-1">15,800 PTS AWAY FROM BLACK TIER status</p>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC CONTENT SPLIT GRID */}
      <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Stats & Journeys */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Dashboard internal tabs */}
          <div className="flex border-b-3 border-black select-none">
            <button
              onClick={() => setActiveTab('journeys')}
              className={`flex-1 py-3 text-center font-mono text-xs font-black uppercase tracking-wider cursor-pointer border-t-3 border-x-3 border-transparent ${
                activeTab === 'journeys' ? 'bg-[#E2FF00] text-black border-black border-b-[3px] border-b-white z-10' : 'text-gray-400 hover:text-black'
              }`}
            >
              UPCOMING JOURNEYS
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`flex-1 py-3 text-center font-mono text-xs font-black uppercase tracking-wider cursor-pointer border-t-3 border-x-3 border-transparent ${
                activeTab === 'benefits' ? 'bg-[#E2FF00] text-black border-black border-b-[3px] border-b-white z-10' : 'text-gray-400 hover:text-black'
              }`}
            >
              MEMBER BENEFITS
            </button>
          </div>

          {activeTab === 'journeys' ? (
            <div className="space-y-8">
              {/* Upcoming Journey Spotlight */}
              <div className="bg-white border-3 border-black p-6 neo-shadow space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <span className="bg-[#E23E26] text-white font-mono text-[9px] font-black px-2 py-0.5 border uppercase">AMALFI ACTIVE ODYSSEY</span>
                    <h3 className="font-syne font-black text-xl uppercase mt-1 leading-none">Amalfi Coast Odyssey</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[8px] text-gray-400 font-bold uppercase leading-none">DAYS TO LAUNCH</p>
                    <p className="font-mono text-xl font-black text-black">126 Days</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <img src={IMAGES.concierge} alt="Amalfi Spotlight" className="w-full md:w-44 h-28 object-cover border border-black" />
                  <div className="flex flex-col justify-between font-mono text-xs">
                    <div className="space-y-1.5 uppercase select-none font-bold text-gray-500">
                      <p>🚀 Private Hangar: Berlin Schönefeld</p>
                      <p>🏨 Resort stay: Azure Monolith Suite 4B</p>
                      <p>⚓ Private Riva Boat Skipper Confirmed</p>
                    </div>
                    <button 
                      onClick={() => setActivePage('itinerary')}
                      className="self-start text-[10px] font-black tracking-widest text-[#E23E26] underline uppercase hover:text-black focus:outline-none cursor-pointer mt-4"
                    >
                      DOWNLOAD DIGITAL ITINERARY BOARD ✈️
                    </button>
                  </div>
                </div>
              </div>

              {/* Elite History */}
              <div className="space-y-4">
                <h3 className="font-syne font-black text-xl uppercase text-black tracking-wide">YOUR ELITE History</h3>
                
                <div className="space-y-4">
                  {pastBookings.map((bk) => (
                    <div key={bk.id} className="border-2 border-black bg-white p-4 flex justify-between items-center neo-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="bg-black text-[#E2FF00] font-mono font-black text-xs p-3.5 border border-black leading-none uppercase">
                          VIP
                        </div>
                        <div>
                          <p className="font-mono text-[9px] text-[#E23E26] font-extrabold uppercase leading-none">{bk.id}</p>
                          <h4 className="font-syne font-black text-sm uppercase tracking-wide mt-1.5">
                            {bk.destinationId === 'kyoto' ? 'Kyoto Zen Gardens' : 'Santorini Sunset Nights'}
                          </h4>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end">
                        <span className="bg-[#E2FF00] text-black border border-black font-mono text-[8px] font-black px-2 py-0.5 uppercase tracking-wider mb-1">
                          {bk.status}
                        </span>
                        <p className="font-mono text-xs font-black text-black">${bk.total.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Member Benefits content list */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEMBERSHIP_BENEFITS.map((ben) => (
                <div key={ben.title} className="border-2 border-black p-5 bg-white neo-shadow flex space-x-4 items-start">
                  <div className="p-3.5 bg-[#FF0066]/10 border border-[#FF0066] text-[#FF0066] mt-0.5">
                    <Shield className="w-5 h-5 font-bold" />
                  </div>
                  <div>
                    <h4 className="font-syne font-black text-sm uppercase tracking-wide">{ben.title}</h4>
                    <p className="text-gray-500 font-display text-[11px] leading-relaxed mt-1">{ben.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Julian AI Companion chatbot */}
        <div className="lg:col-span-5 bg-white border-3 border-black neo-shadow-lg p-6 flex flex-col h-[600px] justify-between">
          <div>
            {/* Companion profile node */}
            <div className="flex items-center space-x-4 border-b border-black/10 pb-4 mb-4 select-none">
              <div className="relative">
                <img src={IMAGES.architect1} alt="Julian Concierge" className="w-12 h-12 border-2 border-black rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#E2FF00] border-2 border-black rounded-full" />
              </div>
              <div>
                <p className="font-mono text-[9px] text-[#E23E26] font-bold uppercase tracking-widest leading-none">YOUR DESIGNATED DESK ATTACHÉ</p>
                <h3 className="font-syne font-black text-md uppercase text-black mt-1">JULIAN ROTH</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase font-mono">STAFF CONCIERGE SPECIALIST</p>
              </div>
            </div>

            {/* Chat list block with scrolling */}
            <div className="space-y-4 h-[340px] overflow-y-auto pr-2 select-none">
              {messages.map((msg, index) => {
                const isJulian = msg.sender === 'julian';
                return (
                  <div 
                    key={index} 
                    className={`flex ${isJulian ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] border shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] p-3 text-xs leading-relaxed font-display ${
                      isJulian 
                        ? 'bg-[#E1DFD6]/20 border-black text-[#111111]' 
                        : 'bg-[#FF5A00] border-black text-white'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#E1DFD6]/20 border border-black p-3 text-xs font-mono font-semibold text-gray-500 rounded-none animate-pulse">
                    Julian is coordinating with flight crew...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form input messaging dispatcher */}
          <form onSubmit={handleSendMessage} className="flex gap-2.5 pt-4 border-t border-black/10">
            <input
              type="text"
              placeholder="Query beach slots, jet charters, suite status..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow border-2 border-black bg-[#FDFBF7] px-3.5 py-2.5 text-xs font-mono font-bold uppercase focus:outline-none focus:bg-[#E2FF00]"
            />
            <button
              type="submit"
              className="p-3 bg-black hover:bg-[#E23E26] text-white border-2 border-black transition-colors flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#E2FF00]" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

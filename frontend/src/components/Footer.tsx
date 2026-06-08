/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAppStore } from '../store';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { setActivePage, setCursorHovered } = useAppStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#FDFBF7] border-t-4 border-black pt-16 pb-12 px-6 md:px-12 lg:px-24 w-full font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand block */}
        <div className="space-y-6">
          <div 
            onClick={() => { setActivePage('home'); scrollToTop(); }}
            className="flex items-center space-x-1 cursor-pointer select-none"
          >
            <span className="text-[#E23E26] font-syne font-black text-3xl italic tracking-tighter uppercase">Go</span>
            <span className="text-white font-display font-black text-3xl tracking-tight uppercase">Trip</span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm font-display leading-relaxed">
            The final word in luxury travel. We curate master-crafted architectural sanctuaries and bespoke explorations that challenge the status quo.
          </p>
          <div className="flex space-x-3">
            {['FB', 'IG', 'LI', 'TW'].map((social) => (
              <button
                key={social}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="w-10 h-10 border border-gray-700 hover:border-white flex items-center justify-center font-mono text-xs font-bold transition-all hover:bg-white hover:text-black hover:scale-105"
              >
                {social}
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="space-y-4">
          <h4 className="text-[#E2FF00] font-mono text-xs uppercase tracking-widest font-black">COMPANY</h4>
          <ul className="space-y-2.5 text-sm text-gray-400 font-display">
            <li>
              <button 
                onClick={() => { setActivePage('about'); scrollToTop(); }}
                className="hover:text-[#E2FF00] font-semibold flex items-center group cursor-pointer"
              >
                About Us <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActivePage('dispatch'); scrollToTop(); }}
                className="hover:text-[#E2FF00] font-semibold flex items-center group cursor-pointer"
              >
                Bespoke Journal <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActivePage('support'); scrollToTop(); }}
                className="hover:text-[#E2FF00] font-semibold flex items-center group cursor-pointer"
              >
                Careers <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActivePage('itinerary'); scrollToTop(); }}
                className="hover:text-[#E2FF00] font-semibold flex items-center group cursor-pointer"
              >
                Press Kit <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: EXPLORE Services */}
        <div className="space-y-4">
          <h4 className="text-[#E2FF00] font-mono text-xs uppercase tracking-widest font-black">EXPLORE</h4>
          <ul className="space-y-2.5 text-sm text-gray-400 font-display">
            <li>
              <button 
                onClick={() => { setActivePage('stays'); scrollToTop(); }}
                className="hover:text-[#E2FF00] font-semibold cursor-pointer"
              >
                Luxury Destinations
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActivePage('dashboard'); scrollToTop(); }}
                className="hover:text-[#E2FF00] font-semibold cursor-pointer"
              >
                Private Jets
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActivePage('amalfi'); scrollToTop(); }}
                className="hover:text-[#E2FF00] font-semibold cursor-pointer"
              >
                Yacht Rentals
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActivePage('support'); scrollToTop(); }}
                className="hover:text-[#E2FF00] font-semibold cursor-pointer"
              >
                Elite Club
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: CONTACT info */}
        <div className="space-y-4">
          <h4 className="text-[#E2FF00] font-mono text-xs uppercase tracking-widest font-black">CONTACT</h4>
          <div className="space-y-3 text-sm text-gray-400 font-display">
            <p className="leading-relaxed">
              HQ: Unter den Linden 21,<br />
              10117 Berlin, Germany
            </p>
            <p>Phone: +49 30 123 4567</p>
            <p className="hover:text-white transition-all">
              Email: concierge@gotrip.luxury
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
        <p>© 2026 GOTRIP LUXURY TRAVEL. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#E2FF00] uppercase">Privacy Policy</a>
          <a href="#" className="hover:text-[#E2FF00] uppercase">Terms of Service</a>
          <a href="#" className="hover:text-[#E2FF00] uppercase">Sustainability</a>
        </div>
        <p className="tracking-widest uppercase text-[10px] bg-[#222222] text-[#E2FF00] px-2 py-0.5 border border-[#E2FF00]">
          ISO 9001 CERTIFIED • ASTA MEMBER
        </p>
      </div>
    </footer>
  );
}

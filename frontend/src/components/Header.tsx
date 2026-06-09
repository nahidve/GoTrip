/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppStore } from "../store";
import { Search, Compass, ShieldAlert, Award } from "lucide-react";
import CabinThemeToggle from "./CabinThemeToggle";

export default function Header() {
  const { activePage, setActivePage, setCursorHovered, triggerSearch } =
    useAppStore();
  const [localSearch, setLocalSearch] = useState("");

  const navItems: { label: string; pageId: any }[] = [
    { label: "Destinations", pageId: "amalfi" },
    { label: "Experiences", pageId: "itinerary" },
    { label: "Private Jet", pageId: "dashboard" },
    { label: "Concierge", pageId: "support" },
    { label: "The Dispatch", pageId: "dispatch" },
    { label: "The Vanguard", pageId: "about" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(localSearch);
    setActivePage("stays");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7] border-b-2 border-black px-4 md:px-8 py-3 w-full flex items-center justify-between">
      {/* Brand Logo */}
      <div
        onClick={() => setActivePage("home")}
        onMouseEnter={() => setCursorHovered(true)}
        onMouseLeave={() => setCursorHovered(false)}
        className="flex items-center space-x-0.5 cursor-pointer select-none"
      >
        <span className="text-[#E23E26] font-syne font-extrabold text-3xl italic tracking-tighter uppercase">
          Go
        </span>
        <span className="text-black font-display font-extrabold text-3xl tracking-tight uppercase">
          Trip
        </span>
      </div>

      {/* Navigation middle links */}
      <nav className="hidden lg:flex items-center space-x-8 font-display text-sm font-semibold text-[#111111]">
        {navItems.map((item) => {
          const isActive =
            activePage === item.pageId ||
            (item.pageId === "amalfi" && activePage === "hotel");
          return (
            <button
              key={item.label}
              onClick={() => setActivePage(item.pageId)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className={`relative cursor-pointer uppercase transition-all duration-200 tracking-wider hover:text-[#E23E26] ${
                isActive
                  ? "text-[#E23E26] font-extrabold underline decoration-2 underline-offset-4"
                  : "text-[#222222]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right side search and Book button */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Search bar inside header resembling the screenshots */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative hidden md:flex items-center"
        >
          <input
            type="text"
            placeholder="Search destination..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="border-2 border-black bg-white px-3 py-1.5 pr-8 uppercase text-xs font-mono font-semibold tracking-wider w-44 focus:w-56 transition-all focus:outline-none focus:bg-[#E2FF00]"
          />
          <button
            type="submit"
            className="absolute right-2 text-black cursor-pointer hover:text-[#E23E26]"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        <CabinThemeToggle />

        <button
          onClick={() => setActivePage("admin")}
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="flex items-center space-x-1.5 border-2 border-black px-3 py-1.5 text-black dark:text-white dark:border-white font-mono text-[9px] font-black tracking-widest uppercase cursor-pointer hover:bg-[#E2FF00] hover:text-black hover:border-black active:scale-95 transition-all outline-none"
          title="Secure Campaign Dispatch Operator Terminal"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E23E26] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E23E26]"></span>
          </span>
          <span>CONTROL</span>
        </button>

        <button
          onClick={() => setActivePage("stays")}
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="neo-btn bg-[#E23E26] text-white text-xs md:text-sm font-mono font-black tracking-widest uppercase px-4 py-2 hover:bg-black uppercase cursor-pointer"
        >
          BOOK NOW
        </button>
      </div>
    </header>
  );
}

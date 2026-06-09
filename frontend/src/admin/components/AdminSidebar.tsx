/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useAppStore } from "../../store";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Send,
  Activity,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export type AdminTab =
  | "dashboard"
  | "articles"
  | "content"
  | "queue"
  | "activity";

interface AdminSidebarProps {
  currentTab: AdminTab;
  setTab: (tab: AdminTab) => void;
}

export default function AdminSidebar({
  currentTab,
  setTab,
}: AdminSidebarProps) {
  const { setActivePage, setCursorHovered } = useAppStore();

  const menuItems = [
    {
      id: "dashboard" as AdminTab,
      label: "DASHBOARD CONTROL",
      icon: LayoutDashboard,
      desc: "Global statistics & active telemetry",
    },
    {
      id: "articles" as AdminTab,
      label: "RSS DECODER",
      icon: FileText,
      desc: "Decoded high-end articles",
    },
    {
      id: "content" as AdminTab,
      label: "AI AGENT FACTORY",
      icon: Sparkles,
      desc: "Approval ready campaign outputs",
    },
    {
      id: "queue" as AdminTab,
      label: "DISPATCH QUEUE",
      icon: Send,
      desc: "Multi-platform release tracks",
    },
    {
      id: "activity" as AdminTab,
      label: "SYSTEM ACTIVITY",
      icon: Activity,
      desc: "Realtime telemetry history logs",
    },
  ];

  return (
    <aside className="w-full lg:w-72 bg-black text-white border-b-4 lg:border-b-0 lg:border-r-4 border-black p-6 flex flex-col justify-between select-none shrink-0 min-h-screen">
      <div className="space-y-10">
        {/* Core Dispatch Title */}
        <div className="space-y-3 pb-6 border-b-2 border-dashed border-gray-800">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#E2FF00]" />
            <span className="bg-[#E2FF00] text-black font-mono font-black text-[9px] px-2 py-0.5 border uppercase leading-none">
              ADMIN CONTROL
            </span>
          </div>
          <h2 className="font-syne font-black text-xl tracking-tight uppercase leading-none">
            VANGUARD <span className="text-[#E2FF00] italic">PLANE</span>
          </h2>
          <p className="font-mono text-[9px] text-gray-400 font-bold tracking-widest uppercase">
            STATION CO: 2026.9
          </p>
        </div>

        {/* Console Menu Items */}
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className={`w-full text-left p-3.5 border-2 transition-all flex items-start space-x-3.5 cursor-pointer rounded-none group ${
                  isSelected
                    ? "bg-[#E2FF00] text-black border-[#E2FF00] shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] translate-y-[-2px] translate-x-[-2px]"
                    : "bg-transparent text-gray-300 border-transparent hover:border-gray-800 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mt-0.5 shrink-0 ${isSelected ? "text-[#E23E26]" : "text-gray-400 group-hover:text-white"}`}
                />
                <div className="space-y-1">
                  <p className="font-mono text-[10px] font-black uppercase tracking-wider leading-none">
                    {item.label}
                  </p>
                  <p
                    className={`font-display text-[9px] leading-relaxed ${isSelected ? "text-gray-700" : "text-gray-500"}`}
                  >
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Exit Operator Console button */}
      <div className="pt-6 border-t-2 border-dashed border-gray-800 mt-10 lg:mt-0">
        <button
          onClick={() => setActivePage("home")}
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="w-full bg-[#E23E26] hover:bg-white hover:text-black hover:border-[#E23E26] text-white py-3 border-2 border-black font-mono font-black text-[10px] tracking-widest uppercase transition-all shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[3px_3px_0px_0px_rgba(226,62,38,0.5)] flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>EXIT OPERATOR SYSTEM</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

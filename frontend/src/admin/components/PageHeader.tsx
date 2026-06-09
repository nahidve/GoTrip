/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { RefreshCw } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  onRefresh,
  isRefreshing = false,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-3 border-black pb-8 mb-10 select-none">
      <div className="space-y-2">
        <span className="bg-[#E23E26] text-white font-mono text-[9px] font-black px-2.5 py-1 border border-black uppercase tracking-widest inline-block">
          VANGUARD DISPATCH STATION
        </span>
        <h1 className="font-syne font-black text-3xl md:text-5xl uppercase text-black dark:text-white leading-none">
          {title}
        </h1>
        <p className="text-gray-500 font-mono text-[10px] uppercase font-bold tracking-wider leading-relaxed">
          {subtitle}
        </p>
      </div>

      {onRefresh && (
        <button
          onClick={onRefresh}
          className="neo-btn flex items-center space-x-2 bg-white dark:bg-black px-4 py-2 border-2 border-black font-mono text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-black"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#E23E26]" : ""}`}
          />
          <span>REFRESH STATION</span>
        </button>
      )}
    </div>
  );
}

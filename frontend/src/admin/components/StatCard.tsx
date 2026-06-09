/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  bgColor = "bg-white",
  borderColor = "border-black",
  textColor = "text-black",
  onClick,
  isActive = false,
}: StatCardProps) {
  const hoverClasses = onClick
    ? "cursor-pointer hover:-translate-y-1 hover:translate-x-[-2px] transition-transform active:translate-y-0 active:translate-x-0"
    : "";

  const activeClasses = isActive ? "bg-[#E2FF00] text-black border-4" : bgColor;

  return (
    <div
      onClick={onClick}
      className={`border-3 border-black p-5 neo-shadow flex flex-col justify-between h-32 select-none ${activeClasses} ${borderColor} ${textColor} ${hoverClasses}`}
    >
      <div className="flex justify-between items-start w-full">
        <span className="font-mono text-[9px] font-black uppercase tracking-widest">
          {title}
        </span>
        <Icon
          className={`w-4 h-4 ${isActive ? "text-[#E23E26]" : "text-gray-400 dark:text-gray-300"}`}
        />
      </div>
      <div className="mt-4">
        <span className="font-syne font-black text-3xl md:text-4xl leading-none uppercase tracking-tight">
          {value}
        </span>
      </div>
    </div>
  );
}

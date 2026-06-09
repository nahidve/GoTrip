/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass } from "lucide-react";

interface EmptyStateProps {
  message: string;
  description: string;
}

export default function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="border-3 border-dashed border-gray-400 p-12 text-center flex flex-col items-center justify-center space-y-4 bg-white/50 select-none">
      <Compass className="w-10 h-10 text-gray-400 animate-spin-[60s] spin-slow" />
      <div className="space-y-1">
        <h4 className="font-syne font-black text-md text-black dark:text-white uppercase tracking-wide">
          {message}
        </h4>
        <p className="font-display text-xs text-gray-500 max-w-sm mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}

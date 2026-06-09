/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface StatusBadgeProps {
  status:
    | "pending"
    | "approved"
    | "rejected"
    | "awaiting_approval"
    | "DRAFT"
    | "PENDING"
    | "PUBLISHED"
    | "FAILED"
    | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let bg = "bg-gray-100 text-gray-800";
  let border = "border-gray-400";
  let label = status.toUpperCase();

  switch (status) {
    case "pending":
    case "PENDING":
      bg = "bg-[#FFEFE8] text-[#FF5A00]";
      border = "border-[#FF5A00]";
      break;
    case "approved":
    case "PUBLISHED":
      bg = "bg-[#E2FF00]/25 text-black dark:text-[#E2FF00]";
      border = "border-black dark:border-[#E2FF00]";
      break;
    case "rejected":
    case "FAILED":
      bg = "bg-[#FFE8E8] text-[#E23E26]";
      border = "border-[#E23E26]";
      break;
    case "awaiting_approval":
      bg = "bg-[#00F0FF]/15 text-[#008694] dark:text-[#00F0FF]";
      border = "border-[#008694] dark:border-[#00F0FF]";
      label = "AWAITING APPROVAL";
      break;
    case "DRAFT":
      bg = "bg-[#E1DFD6] text-[#111111]";
      border = "border-[#111111]";
      break;
  }

  return (
    <span
      className={`font-mono text-[8px] font-black tracking-widest px-2.5 py-1 border uppercase select-none rounded-none inline-block ${bg} ${border}`}
    >
      {label}
    </span>
  );
}

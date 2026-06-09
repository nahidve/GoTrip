/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface DataTableProps {
  headers: string[];
  children: React.ReactNode;
}

export default function DataTable({ headers, children }: DataTableProps) {
  return (
    <div className="w-full bg-white dark:bg-black border-3 border-black neo-shadow overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="bg-[#111111] text-[#E2FF00] border-b-3 border-black select-none">
            {headers.map((header) => (
              <th
                key={header}
                className="p-4 font-mono text-[9px] font-black uppercase tracking-widest border-r border-dashed border-gray-700 last:border-r-0"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-black">{children}</tbody>
      </table>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import EmptyState from "../components/EmptyState";
import { useAppStore } from "../../store";
import { Terminal, CheckCircle2, Send, Cpu } from "lucide-react";

export default function ActivityPage() {
  const { activity, loading, error, refresh } = useDashboard();
  const { setCursorHovered } = useAppStore();
  const [filter, setFilter] = useState<
    "all" | "system" | "approval" | "publishing"
  >("all");

  const filteredLogs = activity.filter((log) => {
    if (filter === "all") return true;
    return log.type === filter;
  });

  const getLogIcon = (type: string) => {
    switch (type) {
      case "system":
        return Terminal;
      case "approval":
        return CheckCircle2;
      case "publishing":
        return Send;
      default:
        return Cpu;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case "system":
        return "text-[#FF5A00] bg-[#FFEFE8] border-[#FF5A00]";
      case "approval":
        return "text-black bg-[#E2FF00]/25 border-black dark:border-[#E2FF00] dark:text-[#E2FF00]";
      case "publishing":
        return "text-[#008694] bg-[#00F0FF]/15 border-[#00F0FF] dark:text-[#00F0FF]";
      default:
        return "text-gray-500 bg-gray-50 border-gray-400";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="SYSTEM ACTIVITY"
        subtitle="Review security, scraper runs, operator overrides, and active platform broadcasts"
        onRefresh={refresh}
        isRefreshing={loading}
      />

      {/* Filter Tabs */}
      <div className="flex border-b-3 border-black bg-white dark:bg-black select-none max-w-md">
        {(["all", "system", "approval", "publishing"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            className={`flex-1 py-2.5 text-center font-mono text-[9px] font-black uppercase tracking-wider cursor-pointer border-t-3 border-x-3 border-transparent transition-all ${
              filter === t
                ? "bg-[#E2FF00] text-black border-black border-b-[3px] border-b-white z-10"
                : "text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-[#E2FF00]"
            }`}
          >
            {t === "all" ? "VIEW ALL" : t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono text-xs text-gray-500 select-none animate-pulse">
          CONNECTING CORE CONTROL PLANE STREAM DATA...
        </div>
      ) : filteredLogs.length === 0 ? (
        <EmptyState
          message={`NO LOGS RECORDED FOR TRACK: ${filter.toUpperCase()}`}
          description="The active system thread is healthy. All past tasks fully catalogued."
        />
      ) : (
        <DataTable
          headers={[
            "Log Type",
            "Action Message",
            "Detailed Telemetry",
            "Timestamp",
          ]}
        >
          {filteredLogs.map((log) => {
            const LogIcon = getLogIcon(log.type);
            const colorClass = getLogColor(log.type);

            return (
              <tr
                key={log.id}
                className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors border-r-2 border-dashed border-gray-400"
              >
                {/* Type Badge */}
                <td className="p-4 select-none">
                  <div
                    className={`p-1.5 px-3 border font-mono text-[8px] font-black uppercase tracking-widest flex items-center space-x-1.5 w-max select-none ${colorClass}`}
                  >
                    <LogIcon className="w-3 h-3" />
                    <span>{log.type}</span>
                  </div>
                </td>

                {/* Message */}
                <td className="p-4 font-mono text-[10px] font-bold text-black dark:text-white uppercase tracking-normal select-all">
                  {log.message}
                </td>

                {/* Detailed Telemetry details */}
                <td className="p-4 font-display text-xs text-gray-500 select-all max-w-sm">
                  {log.details || "No metadata packet attached."}
                </td>

                {/* Timestamp */}
                <td className="p-4 font-mono text-[10px] font-bold text-gray-400 select-none">
                  {log.createdAt}
                </td>
              </tr>
            );
          })}
        </DataTable>
      )}
    </div>
  );
}

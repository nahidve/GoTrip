/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useArticles } from "../hooks/useArticles";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import { useAppStore } from "../../store";
import { Check, X, Compass, ExternalLink } from "lucide-react";

export default function ArticlesPage() {
  const { articles, loading, error, approveArticle, rejectArticle, refresh } =
    useArticles();
  const { setCursorHovered } = useAppStore();
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const filteredArticles = articles.filter((art) => {
    if (filter === "all") return true;
    return art.status === filter;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="RSS DECODER"
        subtitle="Manage decoded high-end travel logs, blogs, and RSS publications"
        onRefresh={refresh}
        isRefreshing={loading}
      />

      {/* Filter Tabs */}
      <div className="flex border-b-3 border-black bg-white dark:bg-black select-none max-w-lg">
        {(["all", "pending", "approved", "rejected"] as const).map((t) => (
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
          TUNING CO-ORDINATES AND ENCODING...
        </div>
      ) : filteredArticles.length === 0 ? (
        <EmptyState
          message={`NO ${filter.toUpperCase()} ARTICLES FOUND`}
          description="The RSS scraper has fully cleared this feed state or requires customized target filters."
        />
      ) : (
        <DataTable
          headers={[
            "Title & Source",
            "City",
            "Decoded Date",
            "State",
            "Decisions",
          ]}
        >
          {filteredArticles.map((art) => (
            <tr
              key={art.id}
              className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors border-r-2 border-dashed border-gray-400"
            >
              {/* Title & Source */}
              <td className="p-4 space-y-1.5 select-none max-w-sm md:max-w-md">
                <div className="flex items-start space-x-2.5">
                  <span className="bg-[#111111] dark:bg-black text-[#E2FF00] font-mono text-[8px] font-extrabold px-1.5 py-0.5 border border-black uppercase text-center self-start leading-none shrink-0">
                    {art.score}% MATCH
                  </span>
                  <h4 className="font-syne font-black text-xs md:text-sm text-black dark:text-white uppercase tracking-normal leading-tight">
                    {art.title}
                  </h4>
                </div>
                {art.sourceUrl && (
                  <a
                    href={art.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    className="text-gray-400 hover:text-[#E23E26] font-mono text-[9px] lowercase flex items-center space-x-1 w-fit select-none"
                  >
                    <span>{art.sourceUrl}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </td>

              {/* City */}
              <td className="p-4 font-mono text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest select-none">
                {art.city}
              </td>

              {/* Published Date */}
              <td className="p-4 font-mono text-[10px] font-bold text-gray-500 uppercase select-none">
                {art.publishedDate}
              </td>

              {/* Status */}
              <td className="p-4 select-none">
                <StatusBadge status={art.status} />
              </td>

              {/* Actions */}
              <td className="p-4 select-none">
                {art.status === "pending" ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveArticle(art.id)}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      title="Approve article for AI Generation"
                      className="p-1 px-2.5 bg-[#E2FF00] hover:bg-black hover:text-white text-black border-2 border-black font-mono text-[9px] font-black uppercase transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <Check className="w-3 h-3 text-[#E23E26]" />
                      <span>APPROVE</span>
                    </button>
                    <button
                      onClick={() => rejectArticle(art.id)}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      title="Decline article from campaign cycles"
                      className="p-1 px-2.5 bg-white hover:bg-[#E23E26] hover:text-white text-black border-2 border-black font-mono text-[9px] font-black uppercase transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <X className="w-3 h-3 text-red-600 group-hover:text-white" />
                      <span>REJECT</span>
                    </button>
                  </div>
                ) : (
                  <span className="font-mono text-[9px] text-gray-400 uppercase italic">
                    DECIDED • {art.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}

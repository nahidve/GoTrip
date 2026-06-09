/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { usePublishing } from "../hooks/usePublishing";
import { PublishingStatus, PublishingJob } from "../types/publishing";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import { useAppStore } from "../../store";
import {
  Send,
  RotateCcw,
  Eye,
  Play,
  Sparkles,
  FileText,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  X,
  HelpCircle,
} from "lucide-react";

export default function PublishingPage() {
  const { jobs, loading, error, queueJob, retryJob, refresh } = usePublishing();
  const { setCursorHovered } = useAppStore();
  const [activeTab, setActiveTab] = useState<PublishingStatus>("DRAFT");

  // Modal preview overlay state
  const [previewJob, setPreviewJob] = useState<PublishingJob | null>(null);

  const filteredJobs = jobs.filter((job) => job.status === activeTab);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "BLOG":
        return FileText;
      case "LINKEDIN":
        return Linkedin;
      case "INSTAGRAM":
        return Instagram;
      case "NEWSLETTER":
        return Mail;
      default:
        return HelpCircle;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in relative z-20">
      <PageHeader
        title="PUBLISHING QUEUE"
        subtitle="Dispatch marketing campaigns, monitor social channel APIs, and recover failed jobs"
        onRefresh={refresh}
        isRefreshing={loading}
      />

      {/* Tabs list (DRAFT, PENDING, PUBLISHED, FAILED) */}
      <div className="flex border-b-3 border-black bg-white dark:bg-black select-none max-w-lg">
        {(["DRAFT", "PENDING", "PUBLISHED", "FAILED"] as const).map((tab) => {
          const tabCount = jobs.filter((j) => j.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className={`flex-1 py-3 text-center font-mono text-[9px] font-black uppercase tracking-wider cursor-pointer border-t-3 border-x-3 border-transparent transition-all flex flex-col items-center justify-center space-y-1 ${
                activeTab === tab
                  ? "bg-[#E2FF00] text-black border-black border-b-[3px] border-b-white z-10"
                  : "text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-[#E2FF00]"
              }`}
            >
              <span>{tab}</span>
              <span className="font-syne font-black text-xs leading-none">
                ({tabCount})
              </span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center py-20 font-mono text-xs text-gray-400 select-none animate-pulse">
          TUNING OUTBOUND DISPATCH TELEMETRY...
        </div>
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          message={`NO ${activeTab} DISPATCH JOBS IN DATABASE`}
          description={`Approved content campaigns spawn automated platform releases. Currently, no active campaigns populate this ${activeTab} track.`}
        />
      ) : (
        <DataTable
          headers={[
            "Platform / Campaign",
            "Release Status",
            "Retries",
            "Created At",
            "Dispatched At",
            "Last Error / Path",
            "Operator Actions",
          ]}
        >
          {filteredJobs.map((job) => {
            const PlatIcon = getPlatformIcon(job.platform);

            return (
              <tr
                key={job.id}
                className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
              >
                {/* Platform & Title */}
                <td className="p-4 select-none">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 border border-black bg-[#FFEFE8] shrink-0 text-black">
                      <PlatIcon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] font-black tracking-widest text-[#E23E26] block">
                        ID: {job.id}
                      </span>
                      <h4 className="font-syne font-black text-xs uppercase text-black dark:text-white leading-tight">
                        {job.articleTitle}
                      </h4>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="p-4 select-none">
                  <StatusBadge status={job.status} />
                </td>

                {/* Attempts */}
                <td className="p-4 font-mono text-[10px] font-bold text-gray-500 text-center select-none">
                  {job.attempts}
                </td>

                {/* Created At */}
                <td className="p-4 font-mono text-[9px] text-[#222] dark:text-gray-400 select-none">
                  {job.createdAt}
                </td>

                {/* Published At */}
                <td className="p-4 font-mono text-[9px] text-gray-500 select-none">
                  {job.publishedAt || "Awaiting Release"}
                </td>

                {/* Last Error or Preview URL */}
                <td className="p-4 max-w-xs select-all">
                  {job.status === "FAILED" && job.lastError ? (
                    <span className="font-mono text-[8.5px] text-[#E23E26] uppercase font-black tracking-normal leading-tight break-all block">
                      {job.lastError}
                    </span>
                  ) : job.status === "PUBLISHED" && job.previewUrl ? (
                    <a
                      href={job.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      className="font-mono text-[9px] text-[#00F0FF] hover:underline flex items-center space-x-1 uppercase font-black"
                    >
                      <span>{job.platform} LIVE LINK</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  ) : (
                    <span className="font-mono text-[9px] text-gray-400 select-none">
                      NO EXPORTS FILED
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="p-4 select-none">
                  {job.status === "DRAFT" && (
                    <button
                      onClick={() => queueJob(job.id)}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      title="Dispatch copy draft to active API queue"
                      className="py-1 px-3 bg-[#E2FF00] hover:bg-black hover:text-white text-black border-2 border-black font-mono text-[9px] font-black uppercase transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <Play className="w-3 h-3 text-[#E23E26]" />
                      <span>QUEUE</span>
                    </button>
                  )}

                  {job.status === "FAILED" && (
                    <button
                      onClick={() => retryJob(job.id)}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      title="Force channel api retry"
                      className="py-1 px-3 bg-[#FFEFE8] text-black hover:bg-[#E23E26] hover:text-white border-2 border-black font-mono text-[9px] font-black uppercase transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3 h-3 text-[#FF5A00] group-hover:text-white" />
                      <span>RETRY</span>
                    </button>
                  )}

                  {job.status === "PUBLISHED" && (
                    <button
                      onClick={() => setPreviewJob(job)}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      title="View campaign draft metrics"
                      className="py-1 px-3 bg-white hover:bg-[#E2FF00] hover:text-black text-black border-2 border-black font-mono text-[9px] font-black uppercase transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3 text-[#00F0FF]" />
                      <span>VIEW</span>
                    </button>
                  )}

                  {job.status === "PENDING" && (
                    <span className="font-mono text-[9px] text-gray-400 italic animate-pulse">
                      PROCESSING RELEASE...
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </DataTable>
      )}

      {/* Expanded Copy Previsualizer Modal dialog */}
      {previewJob && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-xl bg-white border-4 border-black p-6 neo-shadow-lg select-none space-y-4">
            <button
              onClick={() => setPreviewJob(null)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="absolute right-4 top-4 p-1 hover:bg-[#E23E26] hover:text-white border border-black cursor-pointer bg-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="font-mono text-[9px] font-black uppercase text-[#E23E26] tracking-widest block">
                PLATFORM COPY ATTACHMENT • {previewJob.platform}
              </span>
              <h3 className="font-syne font-black text-lg uppercase leading-tight pr-8">
                {previewJob.articleTitle}
              </h3>
            </div>

            <div className="border border-gray-200 p-4 bg-[#DFDFD8]/20 min-h-[140px] max-h-[220px] overflow-y-auto select-all">
              <p className="font-mono text-[10px] uppercase font-bold text-gray-400 mb-2">
                RAW PAYLOAD OUTBOUND:
              </p>
              <pre className="font-mono text-[10.5px] leading-relaxed whitespace-pre-wrap text-black select-all">
                {previewJob.bodyPreview}
              </pre>
            </div>

            <div className="flex justify-between items-center bg-gray-50 border border-gray-300 p-2.5 px-3">
              <span className="font-mono text-[8px] uppercase text-gray-500 font-bold">
                RELEASE STATUS: SUCCESS 200
              </span>
              <a
                href={previewJob.previewUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="font-mono text-[9px] font-black uppercase tracking-widest text-[#E23E26] underline flex items-center space-x-1"
              >
                <span>VISIT LIVE BROADCAST</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

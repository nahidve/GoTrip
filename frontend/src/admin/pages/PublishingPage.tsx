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
  RotateCcw,
  Eye,
  Play,
  FileText,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  HelpCircle,
  X,
} from "lucide-react";

export default function PublishingPage() {
  const { jobs, loading, queueJob, retryJob, refresh } = usePublishing();
  const { setCursorHovered } = useAppStore();

  const [activeTab, setActiveTab] = useState<PublishingStatus>("DRAFT");

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

  const tabs: PublishingStatus[] = [
    "DRAFT",
    "PENDING",
    "IN_PROGRESS",
    "PUBLISHED",
    "FAILED",
  ];

  return (
    <div className="space-y-8 animate-fade-in relative z-20">
      <PageHeader
        title="PUBLISHING QUEUE"
        subtitle="Dispatch marketing campaigns and monitor publishing pipeline"
        onRefresh={refresh}
        isRefreshing={loading}
      />

      {/* Tabs */}
      <div className="flex border-b-3 border-black bg-white dark:bg-black select-none max-w-lg">
        {tabs.map((tab) => {
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
              <span className="font-syne font-black text-xs">({tabCount})</span>
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-20 font-mono text-xs text-gray-400 animate-pulse">
          TUNING OUTBOUND DISPATCH TELEMETRY...
        </div>
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          message={`NO ${activeTab} JOBS FOUND`}
          description="Publishing jobs appear once generated content is approved."
        />
      ) : (
        <DataTable
          headers={[
            "Platform / Campaign",
            "Status",
            "Attempts",
            "Created",
            "Published",
            "Errors",
            "Actions",
          ]}
        >
          {filteredJobs.map((job) => {
            const Icon = getPlatformIcon(job.platform);

            return (
              <tr key={job.id} className="hover:bg-black/5">
                {/* Platform */}
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 border border-black bg-[#FFEFE8]">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="font-mono text-[8px] text-[#E23E26]">
                        ID: {job.id}
                      </div>
                      <div className="font-syne font-black text-xs uppercase">
                        {job.articleTitle}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="p-4">
                  <StatusBadge status={job.status} />
                </td>

                {/* Attempts */}
                <td className="p-4 font-mono text-xs text-center">
                  {job.attempts}
                </td>

                {/* Created */}
                <td className="p-4 font-mono text-[10px]">{job.createdAt}</td>

                {/* Published */}
                <td className="p-4 font-mono text-[10px]">
                  {job.publishedAt || "—"}
                </td>

                {/* Errors */}
                <td className="p-4 max-w-xs">
                  {job.status === "FAILED" && job.lastError ? (
                    <span className="text-red-600 font-mono text-[10px] break-all">
                      {job.lastError}
                    </span>
                  ) : (
                    <span className="text-gray-400 font-mono text-[10px]">
                      —
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="p-4">
                  {job.status === "DRAFT" && (
                    <button
                      onClick={() => queueJob(job.id)}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      className="px-3 py-1 border bg-yellow-300 font-mono text-[9px]"
                    >
                      QUEUE
                    </button>
                  )}

                  {job.status === "FAILED" && (
                    <button
                      onClick={() => retryJob(job.id)}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      className="px-3 py-1 border bg-red-200 font-mono text-[9px]"
                    >
                      RETRY
                    </button>
                  )}

                  {job.status === "PUBLISHED" && (
                    <button
                      onClick={() => setPreviewJob(job)}
                      className="px-3 py-1 border font-mono text-[9px]"
                    >
                      VIEW
                    </button>
                  )}

                  {job.status === "PENDING" && (
                    <span className="font-mono text-[9px] text-gray-400 animate-pulse">
                      PROCESSING
                    </span>
                  )}

                  {job.status === "IN_PROGRESS" && (
                    <span className="font-mono text-[9px] text-blue-500 animate-pulse">
                      DISPATCHING
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </DataTable>
      )}

      {/* Modal */}
      {previewJob && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-6 w-full max-w-xl relative">
            <button
              onClick={() => setPreviewJob(null)}
              className="absolute top-3 right-3 border px-2"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-syne font-black text-lg uppercase mb-2">
              {previewJob.articleTitle}
            </h3>

            <div className="border p-4 bg-gray-50 text-xs font-mono whitespace-pre-wrap max-h-[300px] overflow-auto">
              {previewJob.bodyPreview}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

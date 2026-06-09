import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import { AdminTab } from "../components/AdminSidebar";
import StatCard from "../components/StatCard";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Sparkles,
  Send,
  Eye,
  ShieldAlert,
  Cpu,
  AlertTriangle,
  Terminal,
  ChevronRight,
} from "lucide-react";

interface AdminDashboardProps {
  setTab: (tab: AdminTab) => void;
}

export default function AdminDashboard({ setTab }: AdminDashboardProps) {
  const { stats, activity, loading, error, refresh } = useDashboard();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 select-none">
        <Cpu className="w-8 h-8 text-[#E23E26] animate-spin" />
        <p className="font-mono text-[9px] font-black uppercase tracking-widest text-[#E23E26]">
          SYNCHRONIZING OPERATOR GRID TELEMETRY...
        </p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-8 border-3 border-black text-center max-w-lg mx-auto bg-white neo-shadow my-12 space-y-4">
        <AlertTriangle className="w-10 h-10 text-[#E23E26] mx-auto animate-bounce" />
        <h3 className="font-syne font-black text-lg uppercase">
          ERROR SECURING TELEMETRY
        </h3>
        <p className="font-display text-xs text-gray-500">
          {error || "Connection timed out."}
        </p>
        <button
          onClick={refresh}
          className="neo-btn px-4 py-2 border-2 border-black bg-[#E2FF00] font-mono text-[9px] font-black uppercase leading-none"
        >
          FORCE RESYNC
        </button>
      </div>
    );
  }

  // Segment activity logs for the visual dashboard feed widget
  const systemActivity = activity
    .filter((a) => a.type === "system")
    .slice(0, 3);
  const approvalActivity = activity
    .filter((a) => a.type === "approval")
    .slice(0, 3);
  const publishingActivity = activity
    .filter((a) => a.type === "publishing")
    .slice(0, 3);

  return (
    <div className="space-y-10 animate-fade-in">
      <PageHeader
        title="CONTROL PLANE"
        subtitle="Global campaign stats & real-time background task monitoring"
        onRefresh={refresh}
        isRefreshing={loading}
      />

      {/* 1. MOCK STATS DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Article group */}
        <StatCard
          title="PENDING ARTICLES"
          value={stats.pendingArticles}
          icon={FileText}
          onClick={() => setTab("articles")}
        />
        <StatCard
          title="APPROVED ARTICLES"
          value={stats.approvedArticles}
          icon={CheckCircle2}
          onClick={() => setTab("articles")}
        />
        <StatCard
          title="REJECTED ARTICLES"
          value={stats.rejectedArticles}
          icon={XCircle}
          onClick={() => setTab("articles")}
        />

        {/* Content group */}
        <StatCard
          title="AWAITING APPROVAL CONTENT"
          value={stats.awaitingApprovalContent}
          icon={Sparkles}
          onClick={() => setTab("content")}
          bgColor="bg-[#FFEFE8]"
        />
        <StatCard
          title="APPROVED CONTENT"
          value={stats.approvedContent}
          icon={ShieldCheck}
          onClick={() => setTab("content")}
        />
        <StatCard
          title="DRAFT PUBLISHING JOBS"
          value={stats.draftPublishingJobs}
          icon={Send}
          onClick={() => setTab("queue")}
        />

        {/* Queue group */}
        <StatCard
          title="PENDING PUBLISHING JOBS"
          value={stats.pendingPublishingJobs}
          icon={Cpu}
          onClick={() => setTab("queue")}
          bgColor="bg-[#FFEFE8]"
        />
        <StatCard
          title="PUBLISHED JOBS"
          value={stats.publishedJobs}
          icon={Eye}
          onClick={() => setTab("queue")}
        />
        <StatCard
          title="FAILED PUBLISHING JOBS"
          value={stats.failedPublishingJobs}
          icon={ShieldAlert}
          onClick={() => setTab("queue")}
          textColor="text-[#E23E26]"
          borderColor="border-[#E23E26]"
        />
      </div>

      {/* 2. ACTIVITY CHANNELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Activity */}
        <div className="border-3 border-black p-6 bg-white dark:bg-black neo-shadow space-y-6">
          <div className="flex items-center justify-between border-b-2 border-black pb-3 select-none">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-[#FF5A00]" />
              <h3 className="font-syne font-black text-xs uppercase tracking-wider text-black dark:text-white">
                SYSTEM ACTIVITY
              </h3>
            </div>
            <span className="bg-[#FF5A00] text-white font-mono text-[8px] font-black px-1.5 py-0.5 border">
              ACTIVE
            </span>
          </div>

          <div className="space-y-4">
            {systemActivity.map((log) => (
              <div
                key={log.id}
                className="font-mono text-[10px] space-y-1 select-none"
              >
                <span className="text-gray-400 font-bold block">
                  {log.createdAt}
                </span>
                <p className="text-black dark:text-white uppercase leading-tight font-black">
                  {log.message}
                </p>
                {log.details && (
                  <p className="text-gray-500 font-display text-[10px] lowercase">
                    {log.details}
                  </p>
                )}
                <div className="h-[1px] bg-gray-200 mt-2" />
              </div>
            ))}
          </div>
          <button
            onClick={() => setTab("activity")}
            className="w-full text-center font-mono text-[9px] font-black tracking-widest text-[#E23E26] underline uppercase hover:text-black cursor-pointer inline-flex items-center justify-center space-x-1"
          >
            <span>VIEW COMPLETE LOGS</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Approvals Feed */}
        <div className="border-3 border-black p-6 bg-white dark:bg-black neo-shadow space-y-6">
          <div className="flex items-center justify-between border-b-2 border-black pb-3 select-none">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#E2FF00]" />
              <h3 className="font-syne font-black text-xs uppercase tracking-wider text-black dark:text-white">
                OPERATOR APPROVALS
              </h3>
            </div>
            <span className="bg-[#E2FF00] text-black border border-black font-mono text-[8px] font-black px-1.5 py-0.5">
              VERIFIED
            </span>
          </div>

          <div className="space-y-4">
            {approvalActivity.length > 0 ? (
              approvalActivity.map((log) => (
                <div
                  key={log.id}
                  className="font-mono text-[10px] space-y-1 select-none"
                >
                  <span className="text-gray-400 font-bold block">
                    {log.createdAt}
                  </span>
                  <p className="text-black dark:text-white uppercase leading-tight font-black">
                    {log.message}
                  </p>
                  {log.details && (
                    <p className="text-gray-500 font-display text-[10px] lowercase">
                      {log.details}
                    </p>
                  )}
                  <div className="h-[1px] bg-gray-200 mt-2" />
                </div>
              ))
            ) : (
              <p className="text-gray-500 font-mono text-[10px] text-center py-6 select-none">
                NO CONFIRMED OPERATOR INTERACTIVE SESSIONS
              </p>
            )}
          </div>
          <button
            onClick={() => setTab("activity")}
            className="w-full text-center font-mono text-[9px] font-black tracking-widest text-[#E23E26] underline uppercase hover:text-black cursor-pointer inline-flex items-center justify-center space-x-1"
          >
            <span>VIEW COMPLETE LOGS</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Publishing Events */}
        <div className="border-3 border-black p-6 bg-white dark:bg-black neo-shadow space-y-6">
          <div className="flex items-center justify-between border-b-2 border-black pb-3 select-none">
            <div className="flex items-center space-x-2">
              <Send className="w-4 h-4 text-[#00F0FF]" />
              <h3 className="font-syne font-black text-xs uppercase tracking-wider text-black dark:text-white">
                PUBLISHING STATUS
              </h3>
            </div>
            <span className="bg-[#00F0FF] text-black font-mono text-[8px] font-black px-1.5 py-0.5 border">
              OUTBOUND
            </span>
          </div>

          <div className="space-y-4">
            {publishingActivity.length > 0 ? (
              publishingActivity.map((log) => (
                <div
                  key={log.id}
                  className="font-mono text-[10px] space-y-1 select-none"
                >
                  <span className="text-gray-400 font-bold block">
                    {log.createdAt}
                  </span>
                  <p className="text-black dark:text-white uppercase leading-tight font-black">
                    {log.message}
                  </p>
                  {log.details && (
                    <p className="text-gray-500 font-display text-[10px] lowercase">
                      {log.details}
                    </p>
                  )}
                  <div className="h-[1px] bg-gray-200 mt-2" />
                </div>
              ))
            ) : (
              <p className="text-gray-500 font-mono text-[10px] text-center py-6 select-none">
                NO ACTIVE DISPATCH RUNS DETECTED
              </p>
            )}
          </div>
          <button
            onClick={() => setTab("activity")}
            className="w-full text-center font-mono text-[9px] font-black tracking-widest text-[#E23E26] underline uppercase hover:text-black cursor-pointer inline-flex items-center justify-center space-x-1"
          >
            <span>VIEW COMPLETE LOGS</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple absolute check interface helper definition for store types.ts file check
interface ShieldCheckProps {
  className?: string;
}
const ShieldCheck = ({ className }: ShieldCheckProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

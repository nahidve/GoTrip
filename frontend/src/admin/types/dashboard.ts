/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DashboardStats {
  pendingArticles: number;
  approvedArticles: number;
  rejectedArticles: number;
  awaitingApprovalContent: number;
  approvedContent: number;
  draftPublishingJobs: number;
  pendingPublishingJobs: number;
  publishedJobs: number;
  failedPublishingJobs: number;
}

export interface ActivityLog {
  id: string;
  type: "system" | "approval" | "publishing";
  message: string;
  createdAt: string;
  details?: string;
}

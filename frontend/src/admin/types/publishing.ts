/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PublishingStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "FAILED";

export interface PublishingJob {
  id: string;
  contentId: string;
  articleTitle: string;
  platform: "BLOG" | "LINKEDIN" | "INSTAGRAM" | "NEWSLETTER";
  status: PublishingStatus;
  attempts: number;
  createdAt: string;
  publishedAt?: string;
  lastError?: string;
  previewUrl?: string;
  bodyPreview: string;
}

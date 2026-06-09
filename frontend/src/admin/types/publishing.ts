export type PublishingStatus =
  | "DRAFT"
  | "PENDING"
  | "IN_PROGRESS"
  | "PUBLISHED"
  | "FAILED";

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

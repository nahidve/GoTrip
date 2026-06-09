import { apiFetch } from "./client";
import { PublishingJob, PublishingStatus } from "../types/publishing";

function mapJob(job: any): PublishingJob {
  return {
    id: String(job.id),

    contentId: String(job.generatedContentId),

    articleTitle: job.articleTitle,

    platform: job.platform,

    status: job.status,

    attempts: job.attempts ?? 0,

    createdAt: job.createdAt,
    publishedAt: job.publishedAt,

    lastError: job.lastError ?? undefined,

    previewUrl: "",

    bodyPreview: job.bodyPreview ?? "",
  };
}

export const publishingApi = {
  getJobs: async (status?: PublishingStatus): Promise<PublishingJob[]> => {
    const data = await apiFetch("/publishing");

    const jobs = data.map(mapJob);

    return status ? jobs.filter((j) => j.status === status) : jobs;
  },

  queueJob: async (id: string): Promise<boolean> => {
    await apiFetch(`/publishing/queue/${id}`, {
      method: "PATCH",
    });

    return true;
  },

  retryJob: async (id: string): Promise<boolean> => {
    await apiFetch(`/publishing/retry/${id}`, {
      method: "POST",
    });

    return true;
  },
};

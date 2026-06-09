import db from "../../../../db/database.js";
import { createBulkPublishingJobs } from "../repositories/publishingRepository.js";

export async function createJobsFromContent(contentId, platforms) {
  const jobs = platforms.map((p) => ({
    generatedContentId: contentId,
    platform: p,
    status: "DRAFT",
  }));

  return await createBulkPublishingJobs(jobs);
}

export async function retryJob(id) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE publishing_jobs
      SET status = 'PENDING',
          lastError = NULL
      WHERE id = ? AND status = 'FAILED'
      `,
      [id],
      function (err) {
        if (err) return reject(err);

        resolve({
          reset: this.changes > 0,
        });
      }
    );
  });
}
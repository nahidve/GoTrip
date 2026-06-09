import {
  claimPendingJob,
  markPublished,
  markFailed,
  resetJobToPending
} from "../repositories/publishingRepository.js";

const MAX_ATTEMPTS = 3;
const WORKERS = 3;

/**
 * Simulated platform publisher.
 * Replace later with LinkedIn / Instagram / Blog APIs.
 */
async function publishToPlatform(job) {
  console.log(`[PUBLISH] platform=${job.platform} jobId=${job.id}`);

  // simulate network delay
  await new Promise((r) => setTimeout(r, 300));

  // simulate random failure
  if (Math.random() < 0.2) {
    throw new Error("Simulated platform failure");
  }

  return true;
}

/**
 * Main entrypoint called by scheduler
 */
export async function runPublishingAgent() {
  await Promise.all(
    Array.from({ length: WORKERS }).map(() => workerLoop())
  );
}

/**
 * Worker loop:
 * - continuously claims jobs atomically
 * - processes them safely
 */
async function workerLoop() {
  while (true) {
    const job = await claimPendingJob();

    // no more jobs available
    if (!job) break;

    try {
      // retry guard
      if ((job.attempts || 0) > MAX_ATTEMPTS) {
        await markFailed(job.id, new Error("Max retry attempts exceeded"));
        continue;
      }

      await publishToPlatform(job);

      await markPublished(job.id);
    } catch (err) {
      console.error(
        `[PUBLISH ERROR] job=${job.id} platform=${job.platform}`,
        err.message
      );

      // final failure
      if ((job.attempts || 0) >= MAX_ATTEMPTS) {
        await markFailed(job.id, err);
        continue;
      }

      // retry strategy: revert to PENDING
      await resetJobToPending(job.id, err.message);
    }
  }
}

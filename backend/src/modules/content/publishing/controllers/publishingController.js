import {
  getAllJobs,
  getPendingJobs,
  getJobById,
  getFailedJobs,
} from "../repositories/publishingRepository.js";

import { retryJob } from "../services/publishingService.js";

import { runPublishingAgent } from "../agents/publishingAgent.js";

/* -------------------- READ -------------------- */

export async function getQueue(req, res) {
  const jobs = await getAllJobs();
  res.json(jobs);
}

export async function getPending(req, res) {
  const jobs = await getPendingJobs();
  res.json(jobs);
}

export async function getFailed(req, res) {
  const jobs = await getFailedJobs();
  res.json(jobs);
}

export async function getJob(req, res) {
  const { id } = req.params;
  const job = await getJobById(id);
  res.json(job);
}

/* -------------------- ACTIONS -------------------- */

export async function approveJob(req, res) {
  await runPublishingAgent();
  res.json({ success: true });
}

export async function rejectJob(req, res) {
  res.json({ success: true, status: "REJECTED" });
}

export async function runJob(req, res) {
  const { id } = req.params;

  await runPublishingAgent();

  res.json({
    success: true,
    message: `Triggered publishing run (job ${id})`,
  });
}

/* -------------------- RETRY -------------------- */

export async function retryFailedJob(req, res) {
  const { id } = req.params;

  const result = await retryJob(id);

  res.json({
    success: true,
    ...result,
  });
}
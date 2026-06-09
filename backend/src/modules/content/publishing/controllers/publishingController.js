import { getAllJobs, getPendingJobs, getJobById, getFailedJobs, getJobsByStatus } from "../repositories/publishingRepository.js";
import { retryJob } from "../services/publishingService.js";
import { queueJob } from "../repositories/publishingRepository.js";
import { runPublishingAgent } from "../agents/publishingAgent.js";

/* -------------------- READ -------------------- */

export async function getQueue(req, res) {
  const { status } = req.query;
  if (status) {
    const jobs = await getJobsByStatus(
      status.toUpperCase()
    );
    return res.json(jobs);
  }
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
  const { id } = req.params;
  await queueJob(id);
  res.json({ success: true, status: "PENDING" });
}

export async function rejectJob(req, res) {
  res.json({ success: true, status: "REJECTED" });
}

export async function runJob(req, res) {
  const { id } = req.params;
  await runPublishingAgent();
  res.json({ success: true, message: `Triggered publishing run (job ${id})` });
}

/* -------------------- RETRY -------------------- */

export async function retryFailedJob(req, res) {
  const { id } = req.params;
  const result = await retryJob(id);
  res.json({ success: true, ...result });
}

export async function queuePublishingJob(req, res) {
  const { id } = req.params;
  await queueJob(id);
  res.json({ success: true, status: "PENDING" });
}

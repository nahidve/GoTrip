import express from "express";
import {getQueue, getPending, getFailed, getJob, approveJob, rejectJob, runJob, retryFailedJob, queuePublishingJob } from "../controllers/publishingController.js";

const router = express.Router();

router.get("/", getQueue);
router.get("/pending", getPending);
router.get("/failed", getFailed);
router.get("/:id", getJob);

router.patch("/approve/:id", approveJob);
router.patch("/reject/:id", rejectJob);
router.patch("/queue/:id", queuePublishingJob);

router.post("/run/:id", runJob);
router.post("/retry/:id", retryFailedJob);

export default router;
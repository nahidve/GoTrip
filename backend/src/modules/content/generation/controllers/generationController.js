import { generateForArticle }
from "../services/generationService.js";

import {
  getGeneratedContentByStatus,
  updateGeneratedContentStatus,
} from "../repositories/contentRepository.js";

import { createJobsFromContent } from "../../publishing/services/publishingService.js";

export async function generateContentForArticle(
  req,
  res
) {
  try {
    const { articleId } = req.params;

    const result =
      await generateForArticle(
        articleId
      );

    res.json(result);
  } catch (error) {
    console.error("GENERATION ERROR:", error);
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
}

export async function getAwaitingApproval(
  req,
  res
) {
  const content =
    await getGeneratedContentByStatus(
      "AWAITING_APPROVAL"
    );

  res.json(content);
}

export async function approveGeneratedContent(req, res) {
  const { id } = req.params;

  await updateGeneratedContentStatus(id, "APPROVED");

  // Step 3 integration: create publishing jobs
  await createJobsFromContent(id, [
    "LINKEDIN",
    "INSTAGRAM",
    "NEWSLETTER",
    "FACEBOOK",
    "BLOG",
  ]);

  res.json({
    success: true,
    status: "APPROVED",
    publishingJobsCreated: true,
  });
}

export async function rejectGeneratedContent(
  req,
  res
) {
  const { id } = req.params;

  await updateGeneratedContentStatus(
    id,
    "REJECTED"
  );

  res.json({
    success: true,
    status: "REJECTED",
  });
}
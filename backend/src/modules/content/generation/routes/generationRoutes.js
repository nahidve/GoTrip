import express from "express";

import {
  generateContentForArticle,
  getAwaitingApproval,
  approveGeneratedContent,
  rejectGeneratedContent,
} from "../controllers/generationController.js";

const router = express.Router();

router.get(
  "/awaiting-approval",
  getAwaitingApproval
);

router.patch(
  "/approve/:id",
  approveGeneratedContent
);

router.patch(
  "/reject/:id",
  rejectGeneratedContent
);

router.post(
  "/:articleId",
  generateContentForArticle
);

export default router;
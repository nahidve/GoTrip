import { collectFeeds }
from "../services/rssService.js";

import { getAllArticles }
from "../repositories/articleRepository.js";

import {
  updateArticleStatus,
  getArticlesByStatus,
} from "../repositories/articleRepository.js";

import { createActivityLog }
from "../../dashboard/repositories/activityRepository.js";

export async function getFeeds(req, res) {
  const result = await collectFeeds();

  res.json(result);
}

export async function getStoredArticles(
  req,
  res
) {
  const articles =
    await getAllArticles();

  res.json(articles);
}

export async function approveArticle(
  req,
  res
) {
  const { id } = req.params;

  await updateArticleStatus(
    id,
    "APPROVED"
  );
  console.log("APPROVAL LOG START");
  await createActivityLog({
  type: "ARTICLE_APPROVED",
  entityId: id,
  entityType: "ARTICLE",
  message: "Article approved",
  createdAt: new Date().toISOString(),
});

res.json({
    success: true,
    status: "APPROVED",
  });
}

export async function rejectArticle(
  req,
  res
) {
  const { id } = req.params;

  await updateArticleStatus(
    id,
    "REJECTED"
  );
await createActivityLog({
  type: "ARTICLE_REJECTED",
  entityId: id,
  entityType: "ARTICLE",
  message: "Article rejected",
  createdAt: new Date().toISOString(),
});
  res.json({
    success: true,
    status: "REJECTED",
  });

  
}

export async function getPendingArticles(
  req,
  res
) {
  const articles =
    await getArticlesByStatus(
      "PENDING"
    );

  res.json(articles);
}
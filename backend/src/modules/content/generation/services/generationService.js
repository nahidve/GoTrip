import { getArticleById }
from "../../rss/repositories/articleRepository.js";

import { generateContent }
from "./contentGenerator.js";

import { createGeneratedContent, getGeneratedContentByArticleId }
from "../repositories/contentRepository.js";

import { createActivityLog }
from "../../dashboard/repositories/activityRepository.js";

export async function generateForArticle(
  articleId
) {
  const article =
    await getArticleById(articleId);
  if (!article) {
    throw new Error(
      "Article not found"
    );
  }

  const existing =
  await getGeneratedContentByArticleId(
    articleId
  );
  if (existing) {
    return existing;
  }

  const generated =
    await generateContent(article);

  await createGeneratedContent({
    articleId,

    blog: generated.blog,
    linkedin: generated.linkedin,
    instagram: generated.instagram,
    newsletter: generated.newsletter,
    status: "AWAITING_APPROVAL",
    createdAt: new Date().toISOString(),
  });

  await createActivityLog({
  type: "CONTENT_GENERATED",
  entityId: articleId,
  entityType: "CONTENT",
  message: `Generated content for article ${articleId}`,
  createdAt: new Date().toISOString(),
});

  return generated;
}
import {
  getArticlesByStatus,
} from "../../rss/repositories/articleRepository.js";

import {
  getGeneratedContentByArticleId,
} from "../repositories/contentRepository.js";

import {
  generateForArticle,
} from "../services/generationService.js";

export async function runAutoGenerationAgent() {
  console.log(
    "Running Auto Generation Agent..."
  );

  const approvedArticles =
    await getArticlesByStatus(
      "APPROVED"
    );

  let generatedCount = 0;

  for (const article of approvedArticles) {
    const existing =
      await getGeneratedContentByArticleId(
        article.id
      );

    if (existing) {
      continue;
    }

    await generateForArticle(
      article.id
    );

    generatedCount++;
  }

  console.log(
    `Generated ${generatedCount} new content items`
  );
}
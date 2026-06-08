import { RSS_FEEDS } from "../feeds/sources.js";
import { fetchFeed } from "./rssParser.js";
import { createActivityLog } from "../../dashboard/repositories/activityRepository.js";

import {
  getArticleById,
  createArticle,
} from "../repositories/articleRepository.js";

export async function collectFeeds() {
  let newCount = 0;

  for (const feed of RSS_FEEDS) {
    const items = await fetchFeed(feed.url);

    for (const item of items) {
      const exists = await getArticleById(item.id);

      if (exists) continue;

      await createArticle({
        ...item,
        city: feed.city,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      });

      await createActivityLog({
  type: "ARTICLE_COLLECTED",
  entityId: item.id,
  entityType: "ARTICLE",
  message: `Collected article: ${item.title}`,
  createdAt: new Date().toISOString(),
});

      newCount++;
    }
  }

  return {
    message: "RSS collection completed",
    newCount,
  };
}
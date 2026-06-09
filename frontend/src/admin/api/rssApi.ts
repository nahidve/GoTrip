import { apiFetch } from "./client";
import { Article } from "../types/article";

function mapArticle(article: any): Article {
  return {
    id: article.id,
    title: article.title,
    city: article.city,
    publishedDate: article.publishedAt,
    sourceUrl: article.link,
    score: 100,
    status: article.status.toLowerCase(),
  };
}

export const rssApi = {
  getArticles: async (): Promise<Article[]> => {
    const data = await apiFetch("/rss/articles");
    return data.map(mapArticle);
  },

  getPendingArticles: async (): Promise<Article[]> => {
    const data = await apiFetch("/rss/pending");
    return data.map(mapArticle);
  },

  approveArticle: async (id: string): Promise<boolean> => {
    await apiFetch(`/rss/approve/${id}`, {
      method: "PATCH",
    });
    return true;
  },

  rejectArticle: async (id: string): Promise<boolean> => {
    await apiFetch(`/rss/reject/${id}`, {
      method: "PATCH",
    });
    return true;
  },
};

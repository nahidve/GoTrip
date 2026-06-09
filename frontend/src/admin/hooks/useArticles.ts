/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { rssApi } from "../api/rssApi";
import { Article } from "../types/article";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await rssApi.getArticles();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch incoming articles feed.");
    } finally {
      setLoading(false);
    }
  }, []);

  const approveArticle = async (id: string) => {
    try {
      await rssApi.approveArticle(id);
      await loadArticles(); // reload to reflect the status change
    } catch (err) {
      setError("Failed to dispatch article approval.");
    }
  };

  const rejectArticle = async (id: string) => {
    try {
      await rssApi.rejectArticle(id);
      await loadArticles();
    } catch (err) {
      setError("Failed to dispatch article rejection.");
    }
  };

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return {
    articles,
    loading,
    error,
    approveArticle,
    rejectArticle,
    refresh: loadArticles,
  };
}

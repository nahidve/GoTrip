/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { generationApi } from "../api/generationApi";
import { GeneratedContent } from "../types/generatedContent";

export function useGeneratedContent() {
  const [contentList, setContentList] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const data = await generationApi.getAllContent();
      setContentList(data);
      setError(null);
    } catch (err) {
      setError("Failed to load awaiting approval templates.");
    } finally {
      setLoading(false);
    }
  }, []);

  const approveContent = async (id: string) => {
    try {
      await generationApi.approveContent(id);
      await loadContent();
    } catch (err) {
      setError("Failed to approve generated content.");
    }
  };

  const rejectContent = async (id: string) => {
    try {
      await generationApi.rejectContent(id);
      await loadContent();
    } catch (err) {
      setError("Failed to reject generated content.");
    }
  };

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return {
    contentList,
    loading,
    error,
    approveContent,
    rejectContent,
    refresh: loadContent,
  };
}

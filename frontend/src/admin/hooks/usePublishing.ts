/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { publishingApi } from "../api/publishingApi";
import { PublishingJob, PublishingStatus } from "../types/publishing";

export function usePublishing() {
  const [jobs, setJobs] = useState<PublishingJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = useCallback(async (status?: PublishingStatus) => {
    setLoading(true);
    try {
      const data = await publishingApi.getJobs(status);
      setJobs(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch current publishing jobs queue.");
    } finally {
      setLoading(false);
    }
  }, []);

  const queueJob = async (id: string) => {
    try {
      await publishingApi.queueJob(id);
      await loadJobs();
    } catch (err) {
      setError("Failed to queue publishing target.");
    }
  };

  const retryJob = async (id: string) => {
    try {
      await publishingApi.retryJob(id);
      await loadJobs();
    } catch (err) {
      setError("Failed to retry publishing task.");
    }
  };

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return {
    jobs,
    loading,
    error,
    queueJob,
    retryJob,
    refresh: () => loadJobs(),
  };
}

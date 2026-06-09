/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { dashboardApi } from "../api/dashboardApi";
import { DashboardStats, ActivityLog } from "../types/dashboard";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsData, activityData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getActivity(),
      ]);
      setStats(statsData);
      setActivity(activityData);
      setError(null);
    } catch (err) {
      setError("Failed to synchronize operator dashboard telemetry.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    activity,
    loading,
    error,
    refresh: fetchDashboardData,
  };
}

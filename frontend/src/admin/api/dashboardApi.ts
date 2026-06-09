/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { db } from "./mockDb";
import { DashboardStats, ActivityLog } from "../types/dashboard";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    // Simulate slight network latency to let loaders animate beautifully
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db.getStats());
      }, 100);
    });
  },

  getActivity: async (): Promise<ActivityLog[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db.getActivityLogs());
      }, 100);
    });
  },
};

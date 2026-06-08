import {
  getDashboardStats,
} from "../repositories/dashboardRepository.js";

import {
  getRecentActivity,
} from "../repositories/activityRepository.js";

export async function getStats(req, res) {
  const stats =
    await getDashboardStats();

  res.json(stats);
}

export async function getActivity(
  req,
  res
) {
  const activity =
    await getRecentActivity();

  res.json(activity);
}
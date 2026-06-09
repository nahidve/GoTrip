import { apiFetch } from "./client";

export async function getDashboardStats() {
  return apiFetch("/dashboard/stats");
}

export async function getDashboardActivity() {
  return apiFetch("/dashboard/activity");
}

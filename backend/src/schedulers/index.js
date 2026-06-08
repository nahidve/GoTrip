import { startRSSScheduler } from "../modules/content/rss/schedulers/rssScheduler.js";
import { startGenerationScheduler } from "../modules/content/generation/schedulers/generationScheduler.js";

export function startSchedulers() {
  startRSSScheduler();
  startGenerationScheduler();
}
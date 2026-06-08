import { startRSSScheduler } from "../modules/content/rss/schedulers/rssScheduler.js";
import { startGenerationScheduler } from "../modules/content/generation/schedulers/generationScheduler.js";
import { startPublishingScheduler } from "../modules/content/publishing/schedulers/publishingScheduler.js";

export function startSchedulers() {
  startRSSScheduler();
  startGenerationScheduler();
  startPublishingScheduler();
}
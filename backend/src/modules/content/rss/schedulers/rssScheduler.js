import cron from "node-cron";
import { collectFeeds } from "../services/rssService.js";

export function startRSSScheduler() {
  cron.schedule("*/5 * * * *", async () => {
    try {
      console.log("Running RSS collection...");

      const result = await collectFeeds();

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
}
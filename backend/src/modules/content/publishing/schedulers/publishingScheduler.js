import cron from "node-cron";
import { runPublishingAgent } from "../agents/publishingAgent.js";

export function startPublishingScheduler() {
  cron.schedule("*/5 * * * *", async () => {
    await runPublishingAgent();
  });
}
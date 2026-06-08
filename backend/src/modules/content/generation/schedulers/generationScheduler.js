import cron from "node-cron";
import { runAutoGenerationAgent } from "../agents/autoGenerationAgent.js";

export function startGenerationScheduler() {
  cron.schedule("* * * * *", async () => {
    try {
      await runAutoGenerationAgent();
    } catch (error) {
      console.error(error);
    }
  });
}
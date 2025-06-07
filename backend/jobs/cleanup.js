import cron from "node-cron";
import { configDotenv } from "dotenv";
configDotenv();

cron.schedule(process.env.CRON_TIME, async () => {
  try {
    const now = new Date();
    // No cleanup tasks needed anymore
    console.log("Cleanup job completed successfully.");
  } catch (error) {
    console.error("Error in Cleanup Job:", error);
  }
});

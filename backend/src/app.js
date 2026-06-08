import dotenv from "dotenv";
dotenv.config();

import "./db/database.js";
import express from "express";
import cors from "cors";

import rssRoutes from "./modules/content/rss/routes/rssRoutes.js";
import generationRoutes from "./modules/content/generation/routes/generationRoutes.js";
import dashboardRoutes from "./modules/content/dashboard/routes/dashboardRoutes.js";
import publishingRoutes from "./modules/content/publishing/routes/publishingRoutes.js";
import { startSchedulers } from "./schedulers/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rss", rssRoutes);
app.use("/api/generation", generationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/publishing", publishingRoutes);

startSchedulers();

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
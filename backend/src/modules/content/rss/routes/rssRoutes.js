import express from "express";
import {getFeeds,getStoredArticles,approveArticle,rejectArticle,getPendingArticles} from "../controllers/rssController.js";

const router = express.Router();

router.get("/", getFeeds);
router.get("/articles", getStoredArticles);
router.get("/pending",getPendingArticles);
router.patch("/approve/:id",approveArticle);
router.patch("/reject/:id",rejectArticle);

export default router;
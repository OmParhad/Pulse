import { Router } from "express";
import { feeds } from "../feeds";
import { fetchFeed } from "../services/rss";
import { rankTrending } from "../services/trending";
import { getArticles } from "../services/feedmanager";

const router = Router();

router.get("/", async (_, res) => {

  try {

const articles = getArticles();
const ranked = rankTrending(articles);

    res.json({
      total: ranked.length,
      articles: ranked.slice(0, 20)
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Unable to generate trending feed"
    });

  }

});

export default router;
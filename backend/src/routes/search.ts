import { Router } from "express";
import { feeds } from "../feeds";
import { fetchFeed } from "../services/rss";
import {
  searchArticles,
  SearchArticle
} from "../services/search";
import { getArticles } from "../services/feedmanager";

const router = Router();

router.get("/", async (req, res) => {

  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({
      error: "Search query is required"
    });
  }

  try {

const articles = getArticles();
const merged = articles.flat();

    const results = searchArticles(
      merged as SearchArticle[],
      query
    );

   res.json({

    query,

    total: results.length,

    searchTime: Date.now(),

    articles: results

});
  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Search failed"
    });

  }

});

export default router;
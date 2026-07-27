import { Router } from "express";
import { feeds } from "../feeds";
import { getArticles } from "../services/feedmanager";

const router = Router();

router.get("/", (_, res) => {

    const articles = getArticles();

    const categories = new Set(
        articles.map(a => a.category)
    );

    const sources = new Set(
        articles.map(a => a.source)
    );

    res.json({

        articles: articles.length,

        feeds: feeds.length,

        categories: categories.size,

        sources: sources.size,

        uptime: process.uptime()

    });

});

export default router;
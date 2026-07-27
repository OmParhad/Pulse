import { Router } from "express";
import { feeds } from "../feeds";
import { fetchFeed } from "../services/rss";

const router = Router();

/* Fetch ALL feeds */

router.get("/all", async (_, res) => {

    try {

        const results = await Promise.all(

            feeds.filter((feed) => feed.enabled).map(async (feed) => {

                const articles = await fetchFeed(feed.url);

                return {
                    source: feed.name,
                    category: feed.category,
                    articles
                };

            })

        );

        const merged = results.flatMap(feed =>

            feed.articles.map((article: any) => ({
                ...article,
                source: feed.source,
                category: feed.category
            }))

        );

        merged.sort((a, b) => {

            return (
                new Date(b.pubDate).getTime() -
                new Date(a.pubDate).getTime()
            );

        });

        res.json({

            totalFeeds: results.length,

            totalArticles: merged.length,

            articles: merged

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Unable to fetch feeds"
        });

    }

});



/* Fetch feed by source */

router.get("/:source", async (req, res) => {

    const source = req.params.source;

    const feed = feeds.find((f) => f.id === source);

    if (!feed) {
        return res.status(404).json({
            error: "Feed not found"
        });
    }

   try {
    const articles = await fetchFeed(feed.url);

    console.log(
        `✅ ${feed.name} -> ${articles.length} articles`
    );

    return {
        source: feed.name,
        category: feed.category,
        articles
    };

} catch (err) {

    console.log(`❌ ${feed.name} FAILED`);

    return {
        source: feed.name,
        category: feed.category,
        articles: []
    };

}

});

export default router;